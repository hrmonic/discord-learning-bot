/**
 * Scheduled job: post a random notion to the discussions channel.
 */

import type { Client } from 'discord.js';
import { sendNotionToChannel } from '../services/notionsService.js';

export function startNotionJob(client: Client<true>, channelId: string): void {
  const channel = client.channels.cache.get(channelId);
  if (!channel?.isTextBased() || channel.isDMBased()) {
    console.warn('[NotionJob] Channel not found or not text-based:', channelId);
    return;
  }

  sendNotionToChannel(channel as import('discord.js').TextChannel).catch((err) => {
    console.error('[NotionJob] Error sending notion:', err);
  });
}
