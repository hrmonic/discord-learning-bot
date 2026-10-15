<p align="center"><img src="docs/assets/project-hero.svg" alt="Discord Learning Bot — bot Discord de révision avec notions programmées, quiz et classement" width="100%"></p>

<h1 align="center">Discord Learning Bot</h1>

<p align="center"><strong>Un bot Discord TypeScript qui transforme les révisions du titre RNCP Développeur Web et Web Mobile en notions programmées et défis communautaires.</strong></p>

<p align="center"><a href="README.md">Read in English</a> · <a href="#overview">Présentation</a> · <a href="#features">Fonctionnalités</a> · <a href="#architecture">Architecture</a> · <a href="#start">Démarrer</a> · <a href="#quality">Qualité</a> · <a href="#faq">FAQ</a> · <a href="#license">Licence</a></p>

<p align="center"><a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-475569"></a> <img alt="Stack" src="https://img.shields.io/badge/stack-Node.js%20%2F%20TypeScript-475569"></p>

<a id="overview"></a>
## Présentation

Discord Learning Bot a été créé pour faciliter les révisions collectives du titre RNCP Développeur Web et Web Mobile. Il diffuse des notions techniques dans un salon Discord, organise des quiz et affiche un classement, sans nécessiter d'interface web complémentaire.

**Public concerné :** Groupes de formation, communautés d'apprentissage, formateurs et administrateurs de serveurs Discord.

**Exemple :** une tâche planifiée publie une notion dans le salon de discussion. Un membre lance /challenge ; la première bonne réponse attribue un point et éventuellement un rôle Discord.

<a id="features"></a>
## Fonctionnalités

| Fonction | Description |
| --- | --- |
| **Notions programmées** | Diffusion périodique de contenus de révision RNCP. |
| **Quiz interactifs** | Défis lancés par commande slash ou tâche planifiée. |
| **Classement** | Suivi des gagnants et consultation des scores. |
| **Gestion des rôles** | Attribution d'un rôle configurable au vainqueur. |
| **Données structurées** | Notions, questions et scores stockés au format JSON. |
| **Expérience native Discord** | Commandes slash et messages avec discord.js. |

<a id="architecture"></a>
## Architecture technique

Le dépôt repose sur TypeScript, Discord.js 14, node-cron, des services spécialisés et des fichiers JSON. Les fonctionnalités se trouvent dans src/, les utilitaires dans lib/, les types dans types/ et les données de révision dans data/. Aucune base de données serveur ni interface web n'est requise.

**Commandes :** /challenge pour lancer un quiz et /classement pour consulter les résultats. Le calendrier et les identifiants sont configurés par variables d'environnement. Un processus Node.js doit rester actif et connecté à l'API Discord.

<a id="start"></a>
## Installation et lancement

**Prérequis :** Node.js 18+, une application bot Discord et des permissions adaptées sur le serveur. Copier .env.example en .env et renseigner les valeurs privées sans jamais committer le token.

```bash
git clone https://github.com/hrmonic/discord-learning-bot.git
cd discord-learning-bot
npm ci
cp .env.example .env
# Configurer DISCORD_TOKEN, DISCUSSIONS_CHANNEL_ID, WINNER_ROLE_ID
npm run build
npm start
```

Sous Windows, copier .env.example manuellement si cp n'est pas disponible. Les étapes de configuration Discord sont détaillées dans docs/setup.md. Le bot doit rester lancé pour fonctionner.

<a id="quality"></a>
## Qualité, sécurité et limites

Le dépôt contient des tests Jest portant notamment sur la normalisation des réponses, la lecture des JSON, la validation et le classement. Des scripts TypeScript et ESLint sont présents. Aucune CI GitHub automatisée n'a été identifiée dans l'état actuel du dépôt.

### Limites et précautions

- Ne jamais publier les tokens et identifiants privés du bot.
- Le stockage des scores en JSON nécessite des précautions pour les sauvegardes et les accès concurrents.
- Le bot est hors ligne lorsque son processus Node.js s'arrête.
- Le catalogue de révision est initialement centré sur la formation RNCP concernée.

### Améliorations possibles

- Ajouter une CI minimale pour les tests et le build.
- Rendre les thématiques de révision plus extensibles.
- Documenter le déploiement et la sauvegarde des scores.

### Documentation complémentaire

- [Installation complète](docs/setup.md)
- [Commandes](docs/commands.md)
- [Architecture](docs/architecture.md)

<a id="faq"></a>
## Questions fréquentes

### Faut-il une application web ?

Non. Les interactions ont lieu dans Discord, mais un serveur ou ordinateur doit exécuter le bot.

### Les quiz peuvent-ils être programmés ?

Oui. Le dépôt comporte des jobs node-cron.

### Où sont stockés les scores ?

Dans des fichiers JSON présents dans data/.

### À quel public s'adresse le contenu ?

Le contenu initial vise la révision du titre RNCP Développeur Web et Web Mobile.

<a id="license"></a>
## Licence et auteur

Projet distribué sous **[licence MIT](LICENSE)**.

**Auteur :** [Réda Touzani (@hrmonic)](https://github.com/hrmonic).

---

*Une application d'automatisation pédagogique alliant collaboration, programmation de tâches et développement TypeScript.*
