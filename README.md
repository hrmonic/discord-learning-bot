# Cursor Multi-Agent System + Bot Discord R�vision RNCP

## Bot Discord (r�vision Titre RNCP D�veloppeur Web & Web Mobile)

Bot **int�gr� � Discord** (aucune application externe) : notions de r�vision et challenges quiz dans le salon #discussions. Premier qui r�pond gagne (r�le + classement).

### Pr�requis

- Node.js 18+
- Un bot cr�� sur le [Discord Developer Portal](https://discord.com/developers/applications) (voir [docs/setup.md](docs/setup.md))

### Installation

```bash
npm install
cp .env.example .env
# �diter .env : DISCORD_TOKEN, DISCUSSIONS_CHANNEL_ID, WINNER_ROLE_ID
npm run build
npm start
```

### Commandes

- `/challenge` ? Lance un challenge dans le salon
- `/classement` ? Affiche le top 10 des gagnants

### Donn�es

- `data/notions.json` ? Notions � poster (blocs RNCP front-end, back-end, transversal)
- `data/questions.json` ? Questions des challenges
- `data/scores.json` ? Classement (g�n�r� automatiquement)

Documentation d�taill�e : [docs/setup.md](docs/setup.md) (cr�ation du bot, IDs), [docs/commands.md](docs/commands.md), [docs/architecture.md](docs/architecture.md) (architecture, flux, s�curit�).

### Qualit�

- **Tests** : `npm test` (normalisation des r�ponses, validation des entr�es).
- **Build** : `npm run build` (TypeScript).
- **Config** : validation des variables d?environnement au d�marrage ; aucun secret logg�.

---

## Cursor Multi-Agent System

This folder contains:

- `system.md`: the orchestrating master prompt for Cursor. This file handles orchestration, role selection, and confirms which roles will be used before executing any task.
- `agents/`: folder with all role-specific agent files, organized by functional categories:
  - `build-engineering/`
  - `croissance-positionnement/`
  - `data-metrics/`
  - `legal-compliance/`
  - `narrative-audio-writing-contents/`
  - `operations-executions/`
  - `produit-design/`
  - `qualite-tests-validation/`
  - `social-networks/`
  - `strategie-structuration/`
- `README.md`: info System

## Usage

1. Cursor will automatically read `system.md` at runtime.
2. Cursor dynamically selects and activates only the relevant roles from `/agents/` for any task.
3. Before executing a task, Cursor **confirms in the chat which roles it will use**, ensuring transparency and precision.
4. All outputs are unified, coherent, and production-ready.
5. Do not edit `system.md` directly unless updating orchestration rules, best practices, or adding new global behavior.

## Notes

- Each agent role in `/agents/` contains mission, mindset, inputs, outputs, constraints, and goals.
- Folder structure reflects functional areas to maintain clarity, maintainability, and scalability.
- You can add or remove agent files without breaking orchestration�`system.md` will adapt dynamically.
