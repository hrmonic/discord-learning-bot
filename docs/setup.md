# Configuration du bot – Tout intégré à Discord (aucune app externe)

L’objectif est de **tout faire dans Discord** : pas d’application externe, pas de site web à héberger. Le bot tourne sur votre machine ou un serveur, et toute l’interaction se fait **dans le client Discord** (salon #discussions, commandes slash, rôles).

---

## 0. Où mettre le dossier et comment le lancer

### Où placer le projet ?

Tu peux mettre **tout le dossier du bot** n’importe où, par exemple :

- Sur ton PC : `C:\Users\TonNom\bot-discord` ou `D:\projets\bot-discord`
- Sur un serveur (VPS, Raspberry Pi, etc.) si tu veux que le bot reste en ligne 24h/24

**Important** : garde **toute la structure** du projet (dossiers `src/`, `lib/`, `data/`, `docs/`, etc.). Ne supprime pas de fichiers ni de dossiers.

### Étapes pour que ça marche sur Discord

1. **Ouvrir un terminal** dans le dossier du bot (ex. `cd C:\Users\TonNom\bot-discord` ou clic droit → « Ouvrir dans le terminal »).

2. **Installer les dépendances** (une seule fois) :
   ```bash
   npm install
   ```

3. **Créer le fichier `.env`** à la racine du projet :
   - Copier `.env.example` et le renommer en `.env`
   - Ouvrir `.env` et remplir :
     - `DISCORD_TOKEN` = le token du bot (Developer Portal → Bot → Reset Token)
     - `DISCUSSIONS_CHANNEL_ID` = l’ID du salon #discussions (clic droit sur le salon → Copier l’identifiant)
     - `WINNER_ROLE_ID` = l’ID du rôle à donner aux gagnants (Paramètres serveur → Rôles → Copier l’identifiant)

4. **Compiler et lancer le bot** :
   ```bash
   npm run build
   npm start
   ```

5. **Garder le terminal ouvert** : tant que `npm start` tourne, le bot est connecté à Discord. Si tu fermes le terminal, le bot se déconnecte.

### Résumé des fichiers/dossiers utiles

| Emplacement | Rôle |
|-------------|------|
| **Racine du projet** | `.env` (tes secrets, à ne pas partager), `package.json`, `data/`, `src/`, `lib/` |
| `data/` | `notions.json`, `questions.json`, `scores.json` — ne pas supprimer |
| `.env` | À créer à partir de `.env.example` et à remplir avec le token et les IDs |

Une fois `npm start` lancé, le bot apparaît **en ligne** sur ton serveur Discord et tu peux utiliser `/challenge` et `/classement` dans #discussions.

---

## 1. Créer le bot sur le Discord Developer Portal

Le bot est une **application Discord** que vous créez sur le portail officiel. Aucun autre service n’est nécessaire.

### 1.1 Accéder au portail

1. Aller sur **[Discord Developer Portal](https://discord.com/developers/applications)**.
2. Se connecter avec son compte Discord.

### 1.2 Créer l’application (le bot)

1. Cliquer sur **« New Application »**.
2. Donner un nom (ex. `Révision RNCP`).
3. Accepter les conditions et valider.

### 1.3 Créer et configurer le bot

1. Dans le menu de gauche, ouvrir **« Bot »**.
2. Cliquer sur **« Add Bot »**.
3. **Token** : cliquer sur **« Reset Token »** puis **« Copy »** — à coller dans `.env` en `DISCORD_TOKEN`. Ne jamais le partager ni le commiter.
4. **Message Content Intent** : activer le toggle **« Message Content Intent »** (obligatoire pour que le bot lise les réponses des utilisateurs aux challenges).
5. Sauvegarder.

### 1.4 Inviter le bot sur le serveur (OAuth2)

1. Menu de gauche → **« OAuth2 »** → **« URL Generator »**.
2. **Scopes** : cocher **`bot`**.
3. **Bot Permissions** : cocher au minimum :
   - **Send Messages**
   - **Embed Links**
   - **Read Message History**
   - **Use Slash Commands**
   - **Manage Roles** (pour attribuer le rôle aux gagnants)
4. Copier l’**URL générée** en bas de page.
5. Ouvrir cette URL dans le navigateur, choisir le serveur de la promotion, puis **Autoriser**.

Le bot apparaît alors sur le serveur (offline tant que le script Node n’est pas lancé).

---

## 2. Récupérer les IDs nécessaires

Tout se configure avec des **IDs** (salon, rôle). Mode développeur Discord :

1. **Paramètres utilisateur** (engrenage) → **« Paramètres de l’application »** → **« Avancés »**.
2. Activer **« Mode développeur »**.

Ensuite :

- **ID du salon #discussions** : clic droit sur le salon → **« Copier l’identifiant du canal »** → à mettre dans `.env` en `DISCUSSIONS_CHANNEL_ID`.
- **ID du rôle gagnant** : **Paramètres du serveur** → **Rôles** → clic droit sur le rôle (ex. « Champion Quiz ») → **« Copier l’identifiant du rôle »** → à mettre en `WINNER_ROLE_ID`.

---

## 3. Créer le rôle « Champion Quiz » (ou équivalent)

1. **Paramètres du serveur** → **Rôles** → **« Créer un rôle »**.
2. Nommer le rôle (ex. `Champion Quiz` ou `Maître RNCP`).
3. Sauvegarder.
4. Copier l’ID du rôle comme indiqué ci-dessus.

Optionnel : dans **Paramètres du serveur** → **Emojis**, vous pouvez restreindre certains emojis à ce rôle pour l’effet « déblocage d’emojis ».

---

## 4. Résumé : tout reste dans Discord

| Élément              | Où ça se passe                          |
|----------------------|------------------------------------------|
| Création du bot      | Discord Developer Portal (site officiel) |
| Invitation du bot    | Lien OAuth2 → choix du serveur           |
| Notions & challenges | Envoyés dans #discussions                |
| Réponses des users   | Messages dans #discussions               |
| Récompenses          | Rôle Discord + classement via `/classement` |

Aucune application externe, aucun site à héberger : le bot tourne en Node.js et communique uniquement avec l’API Discord.

---

## 5. Faire tourner le bot 24h/24 (optionnel)

- **Sur ton PC** : tant que le terminal avec `npm start` est ouvert et que le PC ne s’éteint pas, le bot reste en ligne.
- **Sur un serveur** (VPS, Raspberry Pi, etc.) : tu copies tout le dossier sur le serveur, tu fais `npm install`, tu crées `.env`, puis `npm run build` et `npm start`. Tu peux utiliser **PM2** (`npm install -g pm2` puis `pm2 start dist/src/index.js --name bot-rncp`) pour que le bot redémarre automatiquement en cas de crash.
