/**
 * Slash command: /classement – show leaderboard (top 10).
 */

import type { ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getLeaderboard } from '../services/leaderboardService.js';
import { EmbedColors, FOOTER_BRAND, Copy } from '../config/embeds.js';
import type { BotConfig } from '../config/env.js';

export const data = new SlashCommandBuilder()
  .setName('classement')
  .setDescription('Affiche le classement des gagnants des challenges');

export async function execute(
  interaction: ChatInputCommandInteraction,
  _config: BotConfig
): Promise<void> {
  const entries = await getLeaderboard(10);
  const guild = interaction.guild;

  const lines = entries.length
    ? await Promise.all(
        entries.map(async (e, i) => {
          const rank = i + 1;
          // Emojis de médaille pour les 3 premiers, numéro pour les autres
          const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `**${rank}.**`;
          
          // Distinction visuelle pour le champion (#1)
          const crown = rank === 1 ? '👑 ' : '';
          
          // Badge pour les scores élevés (10+ victoires)
          const starBadge = e.victories >= 10 ? ' ⭐' : '';
          
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
          // Format uniforme : médaille/numéro + couronne (si #1) + nom + séparateur + score + badge (si 10+)
          return `${medal} ${crown}**${name}** • **${e.victories} victoire${plural}**${starBadge}`;
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
