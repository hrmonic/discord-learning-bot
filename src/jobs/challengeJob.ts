/**
 * Scheduled job: start a challenge in the discussions channel.
 */

import type { Client } from 'discord.js';
import {
  sendChallengeToChannel,
  clearActiveChallenge,
} from '../services/challengeService.js';

const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000;

export function startChallengeJob(
  client: Client<true>,
  channelId: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): void {
  const channel = client.channels.cache.get(channelId);
  if (!channel?.isTextBased() || channel.isDMBased()) {
    console.warn('[ChallengeJob] Channel not found or not text-based:', channelId);
    return;
  }

  const textChannel = channel as import('discord.js').TextChannel;

  const onTimeout = async () => {
    const { Copy } = await import('../config/embeds.js');
    await textChannel.send(Copy.CHALLENGE_TIMEOUT);
  };

  sendChallengeToChannel(textChannel, onTimeout, timeoutMs).catch((err) => {
    console.error('[ChallengeJob] Error starting challenge:', err);
  });
}
