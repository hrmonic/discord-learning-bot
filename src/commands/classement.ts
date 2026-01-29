/**
 * Slash command: /classement – show leaderboard (top 10).
 */

import type { ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getLeaderboard } from '../services/leaderboardService.js';
import { EmbedColors, FOOTER_BRAND, Copy } from '../config/embeds.js';

export const data = new SlashCommandBuilder()
  .setName('classement')
  .setDescription('Affiche le classement des gagnants des challenges');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const entries = await getLeaderboard(10);
  const guild = interaction.guild;

  const lines = entries.length
    ? await Promise.all(
        entries.map(async (e, i) => {
          const rank = i + 1;
          const medal = rank === 1 ? '\u{1F947}' : rank === 2 ? '\u{1F948}' : rank === 3 ? '\u{1F949}' : `**${rank}.**`;
          let name = e.userId;
          if (guild) {
            try {
              const member = await guild.members.fetch(e.userId).catch(() => null);
              if (member?.user) name = member.user.username;
            } catch {
              // keep userId
            }
          }
          const plural = e.victories > 1 ? 's' : '';
          return `${medal} **${name}** — ${e.victories} victoire${plural}`;
        })
      )
    : [Copy.LEADERBOARD_EMPTY];

  const embed = new EmbedBuilder()
    .setColor(EmbedColors.LEADERBOARD)
    .setTitle(Copy.LEADERBOARD_TITLE)
    .setDescription(lines.join('\n'))
    .setFooter({ text: `${FOOTER_BRAND} • ${Copy.LEADERBOARD_FOOTER}` })
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
