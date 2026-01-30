/**
 * Unit tests for leaderboardService: addVictory, getLeaderboard.
 * readScores and writeScores are mocked.
 */

import { readScores, writeScores } from '../lib/readJson';
import { addVictory, getLeaderboard } from '../src/services/leaderboardService';

jest.mock('../lib/readJson', () => ({
  readScores: jest.fn(),
  writeScores: jest.fn(),
}));

const mockReadScores = readScores as jest.MockedFunction<typeof readScores>;
const mockWriteScores = writeScores as jest.MockedFunction<typeof writeScores>;

beforeEach(() => {
  mockReadScores.mockReset();
  mockWriteScores.mockReset();
  mockWriteScores.mockResolvedValue(undefined);
});

describe('addVictory', () => {
  it('adds first victory for new user and persists', async () => {
    mockReadScores.mockResolvedValue({ scores: {}, history: [] });

    const result = await addVictory('user1', 'question1');

    expect(result.victories).toBe(1);
    expect(result.lastWinAt).toBeDefined();
    expect(mockWriteScores).toHaveBeenCalledTimes(1);
    const [written] = mockWriteScores.mock.calls[0];
    expect(written.scores.user1).toEqual({ victories: 1, lastWinAt: result.lastWinAt });
    expect(written.history).toHaveLength(1);
    expect(written.history[0].winnerId).toBe('user1');
    expect(written.history[0].questionId).toBe('question1');
  });

  it('increments victories for existing user', async () => {
    mockReadScores.mockResolvedValue({
      scores: { user1: { victories: 2, lastWinAt: '2024-01-01T00:00:00.000Z' } },
      history: [],
    });

    const result = await addVictory('user1', 'question2');

    expect(result.victories).toBe(3);
    expect(mockWriteScores).toHaveBeenCalledTimes(1);
    const [written] = mockWriteScores.mock.calls[0];
    expect(written.scores.user1.victories).toBe(3);
    expect(written.history).toHaveLength(1);
  });
});

describe('getLeaderboard', () => {
  it('returns entries sorted by victories descending and limited', async () => {
    mockReadScores.mockResolvedValue({
      scores: {
        u1: { victories: 1 },
        u2: { victories: 5 },
        u3: { victories: 3 },
      },
      history: [],
    });

    const result = await getLeaderboard(2);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ userId: 'u2', victories: 5, lastWinAt: undefined });
    expect(result[1]).toEqual({ userId: 'u3', victories: 3, lastWinAt: undefined });
  });

  it('returns empty array when no scores', async () => {
    mockReadScores.mockResolvedValue({ scores: {}, history: [] });

    const result = await getLeaderboard(10);

    expect(result).toEqual([]);
  });

  it('defaults limit to 10', async () => {
    const many = Object.fromEntries(
      Array.from({ length: 15 }, (_, i) => [`u${i}`, { victories: 15 - i }])
    );
    mockReadScores.mockResolvedValue({ scores: many, history: [] });

    const result = await getLeaderboard();

    expect(result).toHaveLength(10);
  });
});
