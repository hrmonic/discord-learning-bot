/**
 * Bot Discord Révision RNCP – entry point.
 * All interaction happens inside Discord (no external app).
 */

import 'dotenv/config';
import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  Events,
  type TextChannel,
} from 'discord.js';
import cron from 'node-cron';
import { commands, getCommand } from './commands/index.js';
import { Copy } from './config/embeds.js';
import { loadConfig } from './config/env.js';
import { handleChallengeWin } from './lib/challengeWinHandler.js';

const config = loadConfig();
const {
  token,
  discussionsChannelId,
  notionCron,
  challengeCron,
  challengeTimeoutMs,
  hasDiscussionsChannel,
} = config;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, async (c) => {
  console.log(`Bot connected as ${c.user.tag}`);

  // Register slash commands (global or guild)
  const rest = new REST().setToken(token);
  const body = commands.map((cmd) => cmd.data.toJSON());
  try {
    const appId = c.user.id;
    await rest.put(Routes.applicationCommands(appId), { body });
    console.log('Slash commands registered.');
  } catch (err) {
    console.error('Failed to register slash commands:', err instanceof Error ? err.message : String(err));
  }

  // Cron: notions (uniquement si canal configuré)
  if (hasDiscussionsChannel && notionCron) {
    cron.schedule(notionCron, () => {
      const channel = c.channels.cache.get(discussionsChannelId) as TextChannel | undefined;
      if (channel?.isTextBased() && !channel.isDMBased()) {
        import('./jobs/notionJob.js').then(({ startNotionJob }) => startNotionJob(c, discussionsChannelId));
      }
    });
    console.log('Notion cron scheduled:', notionCron);
  } else if (!hasDiscussionsChannel) {
    console.warn('DISCUSSIONS_CHANNEL_ID missing or invalid: cron notions disabled.');
  }

  // Cron: challenges (optionnel)
  if (hasDiscussionsChannel && challengeCron) {
    cron.schedule(challengeCron, () => {
      const channel = c.channels.cache.get(discussionsChannelId) as TextChannel | undefined;
      if (channel?.isTextBased() && !channel.isDMBased()) {
        import('./jobs/challengeJob.js').then(({ startChallengeJob }) =>
          startChallengeJob(c, discussionsChannelId, challengeTimeoutMs)
        );
      }
    });
    console.log('Challenge cron scheduled:', challengeCron);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = getCommand(interaction.commandName);
  if (!cmd) return;
  try {
    await cmd.execute(interaction, config);
  } catch (err) {
    console.error('Command error:', err instanceof Error ? err.message : String(err));
    const reply = { content: Copy.CMD_ERROR, ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply).catch(() => {});
    } else {
      await interaction.reply(reply).catch(() => {});
    }
  }
});

client.on(Events.MessageCreate, async (message) => {
  await handleChallengeWin(message, config);
});

client.login(token).catch((err) => {
  console.error('Login failed:', err instanceof Error ? err.message : 'Unknown error');
  process.exit(1);
});
