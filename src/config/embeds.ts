/**
 * Configuration centralisée des embeds et messages du bot.
 * Aligné qualité (clarté, cohérence) et contenu (ton, CTA, narrative).
 */

/** Couleurs des embeds (décimal) – cohérence visuelle. */
export const EmbedColors = {
  /** Notions de révision – calme, lecture. */
  NOTION: 0x5865f2,
  /** Challenge en cours – urgence, action. */
  CHALLENGE: 0xed4245,
  /** Classement – mérite, récompense. */
  LEADERBOARD: 0xfee75c,
  /** Victoire – succès. */
  VICTORY: 0x57f287,
  /** Erreur – neutre. */
  ERROR: 0x99aab5,
} as const;

/** Pied de page commun – identité RNCP. */
export const FOOTER_BRAND = 'Titre RNCP Développeur Web & Web Mobile • Révision';

/** Messages courts, sans ambiguïté (Clarity Coach). */
export const Copy = {
  /** Notion : titre de l’embed. */
  NOTION_TITLE: '📚 Notion du jour',
  /** Challenge : titre de l’embed. */
  CHALLENGE_TITLE: '🏆 Challenge – Premier qui répond gagne',
  /** Challenge : instruction courte pour le corps. */
  CHALLENGE_INSTRUCTION: (timeoutMin: number) =>
    `Réponds dans ce salon avec la bonne réponse. Timeout : **${timeoutMin} min**.`,
  /** Classement : titre. */
  LEADERBOARD_TITLE: '🏆 Classement – Champions RNCP',
  /** Classement : vide. */
  LEADERBOARD_EMPTY:
    'Aucun score pour le moment. Lance un challenge avec `/challenge` et sois le premier à répondre pour apparaître ici.',
  /** Classement : footer CTA. */
  LEADERBOARD_FOOTER: 'Gagne des challenges pour monter au classement et débloquer le rôle.',
  /** Timeout challenge. */
  CHALLENGE_TIMEOUT:
    "⏱️ Personne n'a trouvé cette fois. Révise les notions et réessaie au prochain challenge !",
  /** Victoire : préfixe. */
  VICTORY_PREFIX: (username: string) => `🎉 **${username}** a gagné !`,
  /** Victoire : bonne réponse. */
  VICTORY_ANSWER: (answer: string) => `Bonne réponse : **${answer}**.`,
  /** Victoire : explication. */
  VICTORY_HINT: (text: string) => `\n\n💡 ${text}`,
  /** Commande : challenge lancé (ephemeral). */
  CMD_CHALLENGE_LAUNCHED: (theme: string) =>
    `Challenge lancé. Thème : **${theme}**. Réponds dans le salon avec la bonne réponse.`,
  /** Commande : erreur générique. */
  CMD_ERROR: 'Une erreur est survenue. Réessaie ou contacte un administrateur.',
  /** Commande : mauvais contexte (pas un salon texte). */
  CMD_WRONG_CHANNEL: 'Cette commande doit être utilisée dans un salon de discussion.',
  /** Commande : challenge déjà en cours. */
  CMD_CHALLENGE_ACTIVE: 'Un challenge est déjà en cours dans ce salon. Attends la fin ou le timeout.',
  /** Commande : aucune question. */
  CMD_NO_QUESTION: 'Aucune question disponible. Vérifie le fichier des questions.',
} as const;
