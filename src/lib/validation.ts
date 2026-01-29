/**
 * Validation des entrées (longueur, format) pour limiter les abus et les erreurs.
 */

/** Longueur max d'une réponse utilisateur pour un challenge (éviter spam / DoS). */
export const MAX_ANSWER_LENGTH = 500;

export function isValidAnswerInput(content: string): boolean {
  return typeof content === 'string' && content.trim().length > 0 && content.length <= MAX_ANSWER_LENGTH;
}
