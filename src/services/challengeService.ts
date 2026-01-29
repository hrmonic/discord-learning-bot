/**
 * Service: run a challenge (one question, first correct answer wins).
 * State: active challenge (question, channelId, timeout handle).
 */

import type { TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { readQuestions } from '../../lib/readJson.js';
import { answersMatch } from '../../lib/normalizeAnswer.js';
import type { Question } from '../../types/index.js';
import { EmbedColors, FOOTER_BRAND, Copy } from '../config/embeds.js';

let activeChallenge: {
  question: Question;
  channelId: string;
  messageId: string | null;
  timeoutId: ReturnType<typeof setTimeout>;
} | null = null;

export function getActiveChallenge(): typeof activeChallenge {
  return activeChallenge;
}

export function isChallengeActiveInChannel(channelId: string): boolean {
  return activeChallenge?.channelId === channelId;
}

export function clearActiveChallenge(): void {
  if (activeChallenge?.timeoutId) clearTimeout(activeChallenge.timeoutId);
  activeChallenge = null;
}

export function getExpectedAnswer(): string | null {
  return activeChallenge?.question.reponse ?? null;
}

export function checkAnswer(content: string): boolean {
  const q = activeChallenge?.question;
  return q ? answersMatch(content, q.reponse) : false;
}

export async function pickRandomQuestion(): Promise<Question | null> {
  const data = await readQuestions();
  if (!data.questions?.length) return null;
  const index = Math.floor(Math.random() * data.questions.length);
  return data.questions[index] ?? null;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function sendChallengeToChannel(
  channel: TextChannel,
  onTimeout: () => Promise<void>,
  timeoutMs: number
): Promise<Question | null> {
  if (activeChallenge?.channelId === channel.id) return null;

  const question = await pickRandomQuestion();
  if (!question) return null;

  const timeoutMin = Math.round(timeoutMs / 60000);

  const embed = new EmbedBuilder()
    .setColor(EmbedColors.CHALLENGE)
    .setTitle(Copy.CHALLENGE_TITLE)
    .setDescription(`${question.question}\n\n${Copy.CHALLENGE_INSTRUCTION(timeoutMin)}`)
    .addFields(
      { name: 'Thème', value: question.theme, inline: true },
      { name: 'Difficulté', value: capitalizeFirst(question.difficulte), inline: true }
    )
    .setFooter({ text: FOOTER_BRAND })
    .setTimestamp();

  const timeoutId = setTimeout(() => {
    clearActiveChallenge();
    onTimeout();
  }, timeoutMs);

  activeChallenge = {
    question,
    channelId: channel.id,
    messageId: null,
    timeoutId,
  };

  const sent = await channel.send({ embeds: [embed] });
  activeChallenge.messageId = sent.id;

  return question;
}

export function getQuestionForReply(): Question | null {
  return activeChallenge?.question ?? null;
}
