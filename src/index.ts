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
  EmbedBuilder,
  type TextChannel,
} from 'discord.js';
import cron from 'node-cron';
import { commands, getCommand } from './commands/index.js';
import {
  getActiveChallenge,
  clearActiveChallenge,
  checkAnswer,
} from './services/challengeService.js';
import { addVictory, giveWinnerRole } from './services/leaderboardService.js';
import { EmbedColors, Copy, FOOTER_BRAND } from './config/embeds.js';
import { loadConfig } from './config/env.js';
import { isValidAnswerInput } from './lib/validation.js';

const config = loadConfig();
const {
  token,
  discussionsChannelId,
  winnerRoleId,
  notionCron,
  challengeCron,
  challengeTimeoutMs,
  hasDiscussionsChannel,
  hasWinnerRole,
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
    await cmd.execute(interaction);
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
  if (message.author.bot) return;
  const active = getActiveChallenge();
  if (!active || active.channelId !== message.channel.id) return;

  const content = message.content.trim();
  if (!isValidAnswerInput(content)) return;

  if (!checkAnswer(content)) return;

  const questionId = active.question.id;
  const explications = active.question.explications
    ? Copy.VICTORY_HINT(active.question.explications)
    : '';
  clearActiveChallenge();

  const userId = message.author.id;
  let member = message.guild?.members.cache.get(userId) ?? null;
  if (message.guild && !member) {
    member = await message.guild.members.fetch(userId).catch(() => null);
  }

  try {
    await addVictory(userId, questionId);
    if (hasWinnerRole && member) {
      await giveWinnerRole(member, winnerRoleId);
    }
  } catch (err) {
    console.error('Winner flow error:', err instanceof Error ? err.message : String(err));
    await message.reply({ content: Copy.CMD_ERROR }).catch(() => {});
    return;
  }

  const victoryText = `${Copy.VICTORY_PREFIX(message.author.username)} ${Copy.VICTORY_ANSWER(active.question.reponse)}${explications}`;
  const embed = new EmbedBuilder()
    .setColor(EmbedColors.VICTORY)
    .setTitle('Victoire')
    .setDescription(victoryText)
    .setFooter({ text: FOOTER_BRAND })
    .setTimestamp();
  await message.reply({ embeds: [embed] }).catch((err) => {
    console.error('Victory reply error:', err instanceof Error ? err.message : String(err));
  });
});

client.login(token).catch((err) => {
  console.error('Login failed:', err instanceof Error ? err.message : 'Unknown error');
  process.exit(1);
});
