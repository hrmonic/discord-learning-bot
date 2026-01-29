/**
 * Tests unitaires pour la validation des entrées (réponse challenge).
 */

import { isValidAnswerInput, MAX_ANSWER_LENGTH } from '../src/lib/validation';

describe('isValidAnswerInput', () => {
  it('accepte une chaîne non vide et raisonnable', () => {
    expect(isValidAnswerInput('for')).toBe(true);
    expect(isValidAnswerInput('left join')).toBe(true);
  });

  it('rejette une chaîne vide ou que des espaces', () => {
    expect(isValidAnswerInput('')).toBe(false);
    expect(isValidAnswerInput('   ')).toBe(false);
  });

  it('rejette une chaîne trop longue', () => {
    const long = 'a'.repeat(MAX_ANSWER_LENGTH + 1);
    expect(isValidAnswerInput(long)).toBe(false);
  });

  it('accepte exactement MAX_ANSWER_LENGTH caractères', () => {
    const max = 'a'.repeat(MAX_ANSWER_LENGTH);
    expect(isValidAnswerInput(max)).toBe(true);
  });

  it('rejette un type non string', () => {
    expect(isValidAnswerInput(null as unknown as string)).toBe(false);
    expect(isValidAnswerInput(undefined as unknown as string)).toBe(false);
  });
});
