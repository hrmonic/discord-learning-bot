# Bot Discord ? R�vision RNCP

Bot Discord pour la **r�vision du Titre RNCP D�veloppeur Web & Web Mobile** : notions automatiques, challenges quiz et classement dans le salon #discussions. Premier qui r�pond gagne (r�le + classement). Tout se passe dans Discord, sans application externe.

---

## Fonctionnalit�s

- **Commandes slash** : `/challenge` et `/classement` dans le serveur
- **Notions automatiques** : envoi p�riodique de blocs RNCP (front-end, back-end, transversal) dans #discussions
- **Challenges quiz** : lancement manuel ou via cron ; le premier � r�pondre correctement gagne un r�le et des points
- **Classement** : top 10 des gagnants avec nombre de victoires

---

## Pr�requis

- **Node.js** 18 ou sup�rieur
- Un **compte Discord** et un serveur o� vous avez les droits d?administrateur
- Un **bot** cr�� sur le [Discord Developer Portal](https://discord.com/developers/applications) (voir [docs/setup.md](docs/setup.md) pour la cr�ation du bot et les permissions)

---

## Installation

```bash
npm install
cp .env.example .env
# �diter .env : DISCORD_TOKEN, DISCUSSIONS_CHANNEL_ID, WINNER_ROLE_ID
npm run build
npm start
```

---

## Configuration

Remplir le fichier `.env` � la racine (� partir de `.env.example`) :

| Variable | Description |
|----------|-------------|
| `DISCORD_TOKEN` | Token du bot (Developer Portal ? Bot ? Reset Token) |
| `DISCUSSIONS_CHANNEL_ID` | ID du salon #discussions (clic droit sur le salon ? Copier l?identifiant) |
| `WINNER_ROLE_ID` | ID du r�le � donner aux gagnants (Param�tres serveur ? R�les ? Copier l?identifiant) |

Configuration d�taill�e (cron, options) : [docs/setup.md](docs/setup.md).

---

## Commandes

| Commande | Description |
|----------|-------------|
| `/challenge` | Lance un challenge quiz dans le salon actuel. Le premier � r�pondre correctement gagne (r�le + classement). |
| `/classement` | Affiche le classement des gagnants (top 10) avec le nombre de victoires. |

Voir [docs/commands.md](docs/commands.md) pour le comportement d�taill�.

---

## Donn�es

| Fichier | R�le |
|---------|------|
| `data/notions.json` | Notions � poster (blocs RNCP front-end, back-end, transversal) |
| `data/questions.json` | Questions des challenges |
| `data/scores.json` | Classement (g�n�r� automatiquement) |

---

## Qualit�

- **Tests** : `npm test` (normalisation des r�ponses, validation des entr�es)
- **Build** : `npm run build` (TypeScript)
- **Config** : validation des variables d?environnement au d�marrage ; aucun secret logg�

---

## Documentation

- [docs/setup.md](docs/setup.md) ? Cr�ation du bot, IDs, configuration compl�te
- [docs/commands.md](docs/commands.md) ? Commandes et comportement
- [docs/architecture.md](docs/architecture.md) ? Architecture, flux, s�curit�

---

## Licence

MIT (voir [package.json](package.json)).

---

<details>
<summary>� propos du syst�me multi-agents (Cursor)</summary>

Ce d�p�t peut �tre utilis� avec un syst�me d?orchestration multi-agents (fichier de configuration + r�les par domaine). Les r�les sont organis�s par cat�gories fonctionnelles et sont charg�s dynamiquement pour les t�ches de d�veloppement, documentation et d�ploiement. Le focus principal reste le bot Discord d�crit ci-dessus.
</details>
