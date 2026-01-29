/**
 * Tests unitaires pour la normalisation des réponses (challenge).
 */

import { normalizeAnswer, answersMatch } from '../lib/normalizeAnswer';

describe('normalizeAnswer', () => {
  it('trimme les espaces', () => {
    expect(normalizeAnswer('  for  ')).toBe('for');
  });

  it('met en minuscules', () => {
    expect(normalizeAnswer('FOR')).toBe('for');
    expect(normalizeAnswer('Main')).toBe('main');
  });

  it('supprime les accents', () => {
    expect(normalizeAnswer('élément')).toBe('element');
    expect(normalizeAnswer('Réponse')).toBe('reponse');
  });

  it('combine trim, casse et accents', () => {
    expect(normalizeAnswer('  LEFt JOIN  ')).toBe('left join');
  });
});

describe('answersMatch', () => {
  it('retourne true si réponses identiques après normalisation', () => {
    expect(answersMatch('for', 'for')).toBe(true);
    expect(answersMatch('FOR', 'for')).toBe(true);
    expect(answersMatch('  main  ', 'Main')).toBe(true);
    expect(answersMatch('LEFT JOIN', 'left join')).toBe(true);
  });

  it('retourne false si réponses différentes', () => {
    expect(answersMatch('for', 'main')).toBe(false);
    expect(answersMatch('left join', 'inner join')).toBe(false);
  });
});
