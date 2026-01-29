/**
 * Service: load a random notion and send it to a Discord channel.
 */

import type { TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { readNotions } from '../../lib/readJson.js';
import type { Notion } from '../../types/index.js';
import { EmbedColors, FOOTER_BRAND, Copy } from '../config/embeds.js';

const BLOC_LABELS: Record<string, string> = {
  frontend: 'Bloc 1 – Front-end',
  backend: 'Bloc 2 – Back-end',
  transversal: 'Transversal',
};

export async function getRandomNotion(): Promise<Notion | null> {
  const data = await readNotions();
  if (!data.notions?.length) return null;
  const index = Math.floor(Math.random() * data.notions.length);
  return data.notions[index] ?? null;
}

export async function sendNotionToChannel(channel: TextChannel): Promise<boolean> {
  const notion = await getRandomNotion();
  if (!notion) return false;

  const blocLabel = BLOC_LABELS[notion.bloc] ?? notion.bloc;
  const tagsLine = notion.tags?.length ? notion.tags.join(' • ') : blocLabel;

  const embed = new EmbedBuilder()
    .setColor(EmbedColors.NOTION)
    .setTitle(Copy.NOTION_TITLE)
    .setDescription(`**${notion.titre}**\n\n${notion.contenu}`)
    .addFields({ name: 'Bloc', value: blocLabel, inline: true })
    .setFooter({ text: `${FOOTER_BRAND} • ${tagsLine}` })
    .setTimestamp();

  await channel.send({ embeds: [embed] });
  return true;
}
