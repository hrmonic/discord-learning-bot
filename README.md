# Bot Discord R&eacute;vision RNCP

<div align="center">

[![version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](package.json)
[![license](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=for-the-badge&logo=node.js&logoColor=white)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript&logoColor=white)](package.json)
[![Discord.js](https://img.shields.io/badge/discord.js-14.14-5865F2?style=for-the-badge&logo=discord)](package.json)

**Bot Discord pour la r&eacute;vision du Titre RNCP D&eacute;veloppeur Web &amp; Web Mobile** : notions automatiques, challenges quiz et classement dans le salon #discussions. Premier qui r&eacute;pond gagne (r&ocirc;le + classement). Tout se passe dans Discord, sans application externe &mdash; Node.js, TypeScript, slash commands, embeds et cron.

</div>

---

## En bref

- **Commandes slash** : `/challenge` et `/classement` dans le serveur
- **Notions automatiques** : envoi p&eacute;riodique de blocs RNCP (front-end, back-end, transversal) dans #discussions
- **Challenges quiz** : lancement manuel ou via cron ; le premier &agrave; r&eacute;pondre correctement gagne un r&ocirc;le et des points
- **Classement** : top 10 des gagnants avec nombre de victoires

---

## Navigation

- [D&eacute;marrage rapide](#d?marrage-rapide)
- [Documentation](#documentation)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Licence](#licence)

---

## D&eacute;marrage rapide

### Pr&eacute;requis

- **Node.js** 18 ou sup&eacute;rieur
- Un **compte Discord** et un serveur o&ugrave; vous avez les droits d'administrateur
- Un **bot** cr&eacute;&eacute; sur le [Discord Developer Portal](https://discord.com/developers/applications) (voir [docs/setup.md](docs/setup.md))

### Installation

```bash
npm install
cp .env.example .env
# Editer .env : DISCORD_TOKEN, DISCUSSIONS_CHANNEL_ID, WINNER_ROLE_ID
npm run build
npm start
```

---

## Architecture

Sch&eacute;ma des flux et des composants du bot :

```mermaid
flowchart TB
  subgraph entry [Entree]
    Index[index.ts]
  end
  subgraph config [Config]
    Env[env.ts]
    Embeds[embeds.ts]
  end
  subgraph commands [Commandes slash]
    Challenge["/challenge"]
    Classement["/classement"]
  end
  subgraph services [Services]
    Notions[notionsService]
    ChallengeSvc[challengeService]
    Leaderboard[leaderboardService]
  end
  subgraph data [Donnees]
    NotionsJSON[notions.json]
    QuestionsJSON[questions.json]
    ScoresJSON[scores.json]
  end
  subgraph jobs [Taches planifiees]
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

| Dossier | R&ocirc;le |
|--------|------|
| `src/` | Point d'entr&eacute;e, commandes, services, jobs, config |
| `src/config/` | Configuration centralis&eacute;e (env, embeds) |
| `src/commands/` | Commandes slash `/challenge`, `/classement` |
| `src/services/` | Logique m&eacute;tier : notions, challenge, leaderboard |
| `src/jobs/` | T&acirc;ches planifi&eacute;es (node-cron) |
| `lib/` | Utilitaires : normalisation, lecture/&eacute;criture JSON |
| `types/` | Types TypeScript (Notion, Question, Scores) |
| `data/` | Fichiers JSON (notions, questions, scores) |

D&eacute;tails : [docs/architecture.md](docs/architecture.md).

---

## Configuration

Remplir le fichier `.env` &agrave; la racine (&agrave; partir de `.env.example`) :

| Variable | Description |
|----------|-------------|
| `DISCORD_TOKEN` | Token du bot (Developer Portal &rarr; Bot &rarr; Reset Token) |
| `DISCUSSIONS_CHANNEL_ID` | ID du salon #discussions (clic droit sur le salon &rarr; Copier l'identifiant) |
| `WINNER_ROLE_ID` | ID du r&ocirc;le &agrave; donner aux gagnants (Param&egrave;tres serveur &rarr; R&ocirc;les &rarr; Copier l'identifiant) |

Configuration d&eacute;taill&eacute;e (cron, options) : [docs/setup.md](docs/setup.md).

---

## Commandes

| Commande | Description |
|----------|-------------|
| `/challenge` | Lance un challenge quiz dans le salon actuel. Le premier &agrave; r&eacute;pondre correctement gagne (r&ocirc;le + classement). |
| `/classement` | Affiche le classement des gagnants (top 10) avec le nombre de victoires. |

Comportement d&eacute;taill&eacute; : [docs/commands.md](docs/commands.md).

---

## Donn&eacute;es

| Fichier | R&ocirc;le |
|---------|------|
| `data/notions.json` | Notions &agrave; poster (blocs RNCP front-end, back-end, transversal) |
| `data/questions.json` | Questions des challenges |
| `data/scores.json` | Classement (g&eacute;n&eacute;r&eacute; automatiquement) |

---

## Qualit&eacute;

- **Tests** : `npm test` (normalisation des r&eacute;ponses, validation des entr&eacute;es)
- **Build** : `npm run build` (TypeScript)
- **Lint** : `npm run lint`
- **Config** : validation des variables d'environnement au d&eacute;marrage ; aucun secret logg&eacute;

---

## Documentation

| Document | Contenu |
|----------|---------|
| [docs/setup.md](docs/setup.md) | Cr&eacute;ation du bot, IDs, configuration compl&egrave;te |
| [docs/commands.md](docs/commands.md) | Commandes et comportement |
| [docs/architecture.md](docs/architecture.md) | Architecture, flux, s&eacute;curit&eacute; |

---

## Licence

MIT &mdash; voir [package.json](package.json) et [LICENSE](LICENSE).

---

<details>
<summary>&Agrave; propos du syst&egrave;me multi-agents (Cursor)</summary>

Ce d&eacute;p&ocirc;t peut &ecirc;tre utilis&eacute; avec un syst&egrave;me d'orchestration multi-agents (fichier de configuration + r&ocirc;les par domaine). Les r&ocirc;les sont organis&eacute;s par cat&eacute;gories fonctionnelles et sont charg&eacute;s dynamiquement pour les t&acirc;ches de d&eacute;veloppement, documentation et d&eacute;ploiement. Le focus principal reste le bot Discord d&eacute;crit ci-dessus.
</details>
