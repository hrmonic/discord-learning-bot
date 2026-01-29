/**
 * Types for RNCP revision bot – notions, questions, scores.
 */

export type Bloc = 'frontend' | 'backend' | 'transversal';

export interface Notion {
  id: string;
  titre: string;
  bloc: Bloc;
  contenu: string;
  tags: string[];
}

export interface NotionsData {
  notions: Notion[];
}

export type Difficulte = 'facile' | 'moyen' | 'difficile';

export interface Question {
  id: string;
  question: string;
  reponse: string;
  explications?: string;
  difficulte: Difficulte;
  theme: string;
}

export interface QuestionsData {
  questions: Question[];
}

export interface UserScore {
  victories: number;
  lastWinAt?: string;
}

export interface ScoresData {
  scores: Record<string, UserScore>;
  history: Array<{ questionId: string; winnerId: string; at: string }>;
}
