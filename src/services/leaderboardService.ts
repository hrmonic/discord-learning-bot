/**
 * Service: scores persistence and leaderboard. Assigns winner role.
 */

import type { GuildMember } from 'discord.js';
import { readScores, writeScores } from '../../lib/readJson.js';
import type { UserScore } from '../../types/index.js';

export async function addVictory(userId: string, questionId: string): Promise<UserScore> {
  const data = await readScores();
  const scores = data.scores ?? {};
  const history = data.history ?? [];
  const existing = scores[userId] ?? { victories: 0 };
  const updated: UserScore = {
    victories: existing.victories + 1,
    lastWinAt: new Date().toISOString(),
  };
  scores[userId] = updated;
  history.push({ questionId, winnerId: userId, at: updated.lastWinAt! });
  await writeScores({ scores, history });
  return updated;
}

export async function getLeaderboard(limit = 10): Promise<Array<{ userId: string; victories: number; lastWinAt?: string }>> {
  const data = await readScores();
  const entries = Object.entries(data.scores)
    .map(([userId, s]) => ({ userId, victories: s.victories, lastWinAt: s.lastWinAt }))
    .sort((a, b) => b.victories - a.victories)
    .slice(0, limit);
  return entries;
}

export async function giveWinnerRole(member: GuildMember, roleId: string): Promise<boolean> {
  try {
    const role = member.guild.roles.cache.get(roleId);
    if (!role) return false;
    if (member.roles.cache.has(roleId)) return true;
    await member.roles.add(roleId);
    return true;
  } catch {
    return false;
  }
}
