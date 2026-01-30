/**
 * Unit tests for readJson: normalizeScores, readScores, writeScores.
 */

import { readFile, writeFile } from 'fs/promises';
import { normalizeScores, readScores, writeScores } from '../lib/readJson';

jest.mock('fs/promises');

const mockReadFile = readFile as jest.MockedFunction<typeof readFile>;
const mockWriteFile = writeFile as jest.MockedFunction<typeof writeFile>;

describe('normalizeScores', () => {
  it('returns empty scores for null or non-object', () => {
    expect(normalizeScores(null)).toEqual({ scores: {}, history: [] });
    expect(normalizeScores(undefined)).toEqual({ scores: {}, history: [] });
    expect(normalizeScores('string')).toEqual({ scores: {}, history: [] });
    expect(normalizeScores(42)).toEqual({ scores: {}, history: [] });
  });

  it('returns empty scores for empty object', () => {
    expect(normalizeScores({})).toEqual({ scores: {}, history: [] });
  });

  it('normalizes valid scores object', () => {
    const input = {
      scores: {
        user1: { victories: 3, lastWinAt: '2024-01-15T10:00:00.000Z' },
        user2: { victories: 1 },
      },
      history: [
        { questionId: 'q1', winnerId: 'user1', at: '2024-01-15T10:00:00.000Z' },
      ],
    };
    const result = normalizeScores(input);
    expect(result.scores).toEqual({
      user1: { victories: 3, lastWinAt: '2024-01-15T10:00:00.000Z' },
      user2: { victories: 1, lastWinAt: undefined },
    });
    expect(result.history).toHaveLength(1);
    expect(result.history[0]).toEqual({ questionId: 'q1', winnerId: 'user1', at: '2024-01-15T10:00:00.000Z' });
  });

  it('ignores invalid score entries (array scores, non-object values)', () => {
    const input = { scores: [], history: [] };
    expect(normalizeScores(input)).toEqual({ scores: {}, history: [] });

    const input2 = { scores: { u1: null }, history: [] };
    expect(normalizeScores(input2).scores).toEqual({});
  });

  it('clamps invalid victories to 0 and ignores invalid lastWinAt', () => {
    const input = {
      scores: {
        u1: { victories: -1, lastWinAt: 123 },
        u2: { victories: 2.5, lastWinAt: 'valid' },
      },
      history: [],
    };
    const result = normalizeScores(input);
    expect(result.scores.u1).toEqual({ victories: 0, lastWinAt: undefined });
    expect(result.scores.u2).toEqual({ victories: 0, lastWinAt: 'valid' });
  });

  it('filters invalid history entries', () => {
    const input = {
      scores: {},
      history: [
        { questionId: 'q1', winnerId: 'u1', at: '2024-01-01' },
        { questionId: 1, winnerId: 'u2', at: '2024-01-02' },
        null,
        { questionId: 'q3', winnerId: 'u3' },
      ],
    };
    const result = normalizeScores(input);
    expect(result.history).toHaveLength(1);
    expect(result.history[0]).toEqual({ questionId: 'q1', winnerId: 'u1', at: '2024-01-01' });
  });
});

describe('readScores', () => {
  beforeEach(() => {
    mockReadFile.mockReset();
  });

  it('returns normalized scores when file has valid JSON', async () => {
    mockReadFile.mockResolvedValue(
      JSON.stringify({ scores: { u1: { victories: 2 } }, history: [] })
    );
    const result = await readScores();
    expect(result.scores).toEqual({ u1: { victories: 2, lastWinAt: undefined } });
    expect(result.history).toEqual([]);
  });

  it('returns empty scores when file read fails', async () => {
    mockReadFile.mockRejectedValue(new Error('ENOENT'));
    const result = await readScores();
    expect(result).toEqual({ scores: {}, history: [] });
  });

  it('returns empty scores when JSON is invalid', async () => {
    mockReadFile.mockResolvedValue('not json');
    const result = await readScores();
    expect(result).toEqual({ scores: {}, history: [] });
  });
});

describe('writeScores', () => {
  beforeEach(() => {
    mockWriteFile.mockReset();
    mockWriteFile.mockResolvedValue(undefined);
  });

  it('writes normalized JSON to file', async () => {
    await writeScores({
      scores: { u1: { victories: 1, lastWinAt: '2024-01-01' } },
      history: [{ questionId: 'q1', winnerId: 'u1', at: '2024-01-01' }],
    });
    expect(mockWriteFile).toHaveBeenCalledTimes(1);
    const [, content] = mockWriteFile.mock.calls[0];
    const written = JSON.parse(content as string);
    expect(written.scores).toEqual({ u1: { victories: 1, lastWinAt: '2024-01-01' } });
    expect(written.history).toHaveLength(1);
  });
});
