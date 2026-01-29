/**
 * Read and parse JSON data files from data/ directory.
 * Validates shape for scores to fail gracefully on corrupted data.
 */

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import type { NotionsData } from '../types/index.js';
import type { QuestionsData } from '../types/index.js';
import type { ScoresData, UserScore } from '../types/index.js';

const DATA_DIR = join(process.cwd(), 'data');

const EMPTY_SCORES: ScoresData = { scores: {}, history: [] };

function normalizeScores(data: unknown): ScoresData {
  if (data == null || typeof data !== 'object') return EMPTY_SCORES;
  const o = data as Record<string, unknown>;
  const scores: Record<string, UserScore> = {};
  if (o.scores != null && typeof o.scores === 'object' && !Array.isArray(o.scores)) {
    for (const [k, v] of Object.entries(o.scores)) {
      if (typeof k === 'string' && v != null && typeof v === 'object' && 'victories' in v) {
        const s = v as { victories: unknown; lastWinAt?: unknown };
        const victories = typeof s.victories === 'number' && Number.isInteger(s.victories) && s.victories >= 0 ? s.victories : 0;
        scores[k] = { victories, lastWinAt: typeof s.lastWinAt === 'string' ? s.lastWinAt : undefined };
      }
    }
  }
  type HistoryEntry = { questionId: string; winnerId: string; at: string };
  const rawHistory = Array.isArray(o.history) ? o.history : [];
  const history: HistoryEntry[] = rawHistory.filter(
    (h: unknown): h is HistoryEntry =>
      h != null &&
      typeof h === 'object' &&
      'questionId' in h &&
      'winnerId' in h &&
      'at' in h &&
      typeof (h as HistoryEntry).questionId === 'string' &&
      typeof (h as HistoryEntry).winnerId === 'string' &&
      typeof (h as HistoryEntry).at === 'string'
  );
  return { scores, history };
}

export async function readNotions(): Promise<NotionsData> {
  const filePath = join(DATA_DIR, 'notions.json');
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw) as NotionsData;
}

export async function readQuestions(): Promise<QuestionsData> {
  const filePath = join(DATA_DIR, 'questions.json');
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw) as QuestionsData;
}

export async function readScores(): Promise<ScoresData> {
  const filePath = join(DATA_DIR, 'scores.json');
  try {
    const raw = await readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw) as unknown;
    return normalizeScores(parsed);
  } catch {
    return EMPTY_SCORES;
  }
}

export async function writeScores(data: ScoresData): Promise<void> {
  const filePath = join(DATA_DIR, 'scores.json');
  const normalized = normalizeScores(data);
  await writeFile(filePath, JSON.stringify(normalized, null, 2), 'utf-8');
}
