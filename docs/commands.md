# Commandes du bot

Toutes les commandes sont des **commandes slash** utilisables dans le serveur Discord.

| Commande | Description |
|----------|-------------|
| `/challenge` | Lance un challenge quiz dans le salon actuel. Le premier à répondre correctement gagne (rôle + classement). |
| `/classement` | Affiche le classement des gagnants (top 10) avec le nombre de victoires. |

## Comportement

- **Notions** : envoyées automatiquement dans le salon #discussions selon le cron `NOTION_CRON` (ex. une fois par jour à 9h).
- **Challenges** : peuvent être lancés automatiquement via `CHALLENGE_CRON` ou manuellement avec `/challenge` dans le salon où vous voulez le quiz.
- **Réponses** : les utilisateurs répondent en envoyant un **message normal** dans le salon (pas une commande). La comparaison est insensible à la casse et aux accents.
