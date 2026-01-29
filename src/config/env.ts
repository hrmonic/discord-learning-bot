/**
 * Configuration et validation des variables d'environnement.
 * Aucun secret n'est exposé en log ou en erreur.
 */

const DISCORD_SNOWFLAKE_REGEX = /^\d{17,19}$/;

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (value == null || value === '') return fallback;
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/**
 * Vérifie qu'une chaîne ressemble à un ID Discord (snowflake).
 */
export function isDiscordSnowflake(id: string | undefined): boolean {
  return typeof id === 'string' && DISCORD_SNOWFLAKE_REGEX.test(id.trim());
}

export interface BotConfig {
  token: string;
  discussionsChannelId: string;
  winnerRoleId: string;
  notionCron: string;
  challengeCron: string;
  challengeTimeoutMs: number;
  hasDiscussionsChannel: boolean;
  hasWinnerRole: boolean;
}

/**
 * Charge et valide la config. Lance process.exit(1) si le token est manquant.
 * Ne log jamais le token.
 */
export function loadConfig(): BotConfig {
  const token = process.env.DISCORD_TOKEN?.trim();
  if (!token) {
    console.error('Missing DISCORD_TOKEN in .env');
    process.exit(1);
  }

  const discussionsChannelId = (process.env.DISCUSSIONS_CHANNEL_ID ?? '').trim();
  const winnerRoleId = (process.env.WINNER_ROLE_ID ?? '').trim();
  const notionCron = (process.env.NOTION_CRON ?? '0 9 * * *').trim();
  const challengeCron = (process.env.CHALLENGE_CRON ?? '').trim();
  const challengeTimeoutMs = parsePositiveInt(process.env.CHALLENGE_TIMEOUT_MS, 300_000);

  return {
    token,
    discussionsChannelId,
    winnerRoleId,
    notionCron,
    challengeCron,
    challengeTimeoutMs,
    hasDiscussionsChannel: isDiscordSnowflake(discussionsChannelId),
    hasWinnerRole: isDiscordSnowflake(winnerRoleId),
  };
}
