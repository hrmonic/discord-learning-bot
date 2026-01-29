# Architecture du bot – Révision RNCP

## Vue d’ensemble

Le bot Discord Révision RNCP est une application Node.js (TypeScript) qui tourne en continu et interagit uniquement avec l’API Discord. Aucune application externe n’est utilisée.

```mermaid
flowchart TB
  subgraph entry [Entrée]
    Index[index.ts]
  end
  subgraph config [Config]
    Env[env.ts]
    Embeds[embeds.ts]
  end
  subgraph commands [Commandes slash]
    Challenge[/challenge]
    Classement[/classement]
  end
  subgraph services [Services]
    Notions[notionsService]
    ChallengeSvc[challengeService]
    Leaderboard[leaderboardService]
  end
  subgraph data [Données]
    NotionsJSON[notions.json]
    QuestionsJSON[questions.json]
    ScoresJSON[scores.json]
  end
  subgraph jobs [Tâches planifiées]
    NotionJob[notionJob]
    ChallengeJob[challengeJob]
  end
  Index --> Env
  Index --> Embeds
  Index --> commands
  Index --> services
  Challenge --> ChallengeSvc
  Classement --> Leaderboard
  NotionJob --> Notions
  ChallengeJob --> ChallengeSvc
  Notions --> NotionsJSON
  ChallengeSvc --> QuestionsJSON
  Leaderboard --> ScoresJSON
```

## Rôles des dossiers

| Dossier | Rôle |
|--------|------|
| `src/` | Point d’entrée, commandes, services, jobs, config. |
| `src/config/` | Configuration centralisée : `env.ts` (variables d’environnement, validation), `embeds.ts` (couleurs, textes). |
| `src/commands/` | Commandes slash : `/challenge`, `/classement`. |
| `src/services/` | Logique métier : notions, challenge, leaderboard. |
| `src/jobs/` | Tâches planifiées (node-cron) : envoi de notions, lancement de challenges. |
| `src/lib/` | Helpers (validation des entrées). |
| `lib/` | Utilitaires partagés : normalisation des réponses, lecture/écriture JSON. |
| `types/` | Types TypeScript (Notion, Question, Scores). |
| `data/` | Fichiers JSON (notions, questions, scores). |

## Flux principaux

1. **Notion du jour** : cron déclenche `notionJob` → `notionsService` charge une notion aléatoire → envoi d’un embed dans le salon configuré.
2. **Challenge** : commande `/challenge` ou cron → `challengeService` envoie une question en embed → les messages du salon sont écoutés → première réponse correcte (après normalisation) déclenche victoire → mise à jour des scores et attribution du rôle.
3. **Classement** : `/classement` → `leaderboardService` lit `scores.json` → envoi d’un embed Top 10.

## Sécurité et robustesse

- **Secrets** : le token Discord n’est jamais loggé ; la config est chargée via `loadConfig()`.
- **Entrées** : longueur max des réponses challenge (500 caractères) ; IDs Discord validés (snowflake).
- **Données** : `readScores` / `writeScores` normalisent la structure pour tolérer un JSON corrompu.
- **Erreurs** : les erreurs sont loguées sans détails sensibles ; l’utilisateur reçoit un message générique.

## Tests

- `tests/normalizeAnswer.test.ts` : normalisation des réponses (trim, casse, accents) et `answersMatch`.
- `tests/validation.test.ts` : validation des entrées (longueur, chaîne vide).

Commande : `npm test`.
