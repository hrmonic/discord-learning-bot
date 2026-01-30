/**
 * Slash command: /challenge – start a quiz manually.
 */

import type { ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';
import {
  sendChallengeToChannel,
  isChallengeActiveInChannel,
} from '../services/challengeService.js';
import { Copy } from '../config/embeds.js';
import type { BotConfig } from '../config/env.js';

export const data = new SlashCommandBuilder()
  .setName('challenge')
  .setDescription('Lance un challenge quiz dans ce salon (premier qui répond gagne)');

export async function execute(
  interaction: ChatInputCommandInteraction,
  config: BotConfig
): Promise<void> {
  const channel = interaction.channel;
  if (!channel?.isTextBased() || channel.isDMBased()) {
    await interaction.reply({ content: Copy.CMD_WRONG_CHANNEL, ephemeral: true });
    return;
  }

  if (isChallengeActiveInChannel(channel.id)) {
    await interaction.reply({ content: Copy.CMD_CHALLENGE_ACTIVE, ephemeral: true });
    return;
  }

  const timeoutMs = config.challengeTimeoutMs;

  const onTimeout = async () => {
    const { Copy: C } = await import('../config/embeds.js');
    await channel.send(C.CHALLENGE_TIMEOUT);
  };

  await interaction.deferReply({ ephemeral: true });

  const question = await sendChallengeToChannel(
    channel as import('discord.js').TextChannel,
    onTimeout,
    timeoutMs
  );

  if (!question) {
    await interaction.editReply({ content: Copy.CMD_NO_QUESTION });
    return;
  }

  await interaction.editReply({ content: Copy.CMD_CHALLENGE_LAUNCHED(question.theme) });
}
