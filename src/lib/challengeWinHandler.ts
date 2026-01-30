/**
 * Handles a message that may be a correct challenge answer: validates, updates scores,
 * assigns winner role, and replies with victory embed.
 */

import type { Message } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import {
  getActiveChallenge,
  clearActiveChallenge,
  checkAnswer,
} from '../services/challengeService.js';
import { addVictory, giveWinnerRole } from '../services/leaderboardService.js';
import { EmbedColors, Copy, FOOTER_BRAND } from '../config/embeds.js';
import type { BotConfig } from '../config/env.js';
import { isValidAnswerInput } from './validation.js';

/**
 * If the message is a valid correct answer to the active challenge in this channel,
 * clears the challenge, records the victory, optionally gives the winner role,
 * and replies with the victory embed. Otherwise does nothing.
 */
export async function handleChallengeWin(message: Message, config: BotConfig): Promise<void> {
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

  const { hasWinnerRole: hasRole, winnerRoleId } = config;
  try {
    await addVictory(userId, questionId);
    if (hasRole && member) {
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
    .setTitle(Copy.VICTORY_TITLE)
    .setDescription(victoryText)
    .setFooter({ text: FOOTER_BRAND })
    .setTimestamp();
  await message.reply({ embeds: [embed] }).catch((err) => {
    console.error('Victory reply error:', err instanceof Error ? err.message : String(err));
  });
}
