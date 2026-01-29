# Référentiel qualité – Données (questions & notions)

Ce document définit le contrôle qualité du contenu du bot : **questions/réponses** ([data/questions.json](../data/questions.json)) et **base notions** ([data/notions.json](../data/notions.json)). Il s’appuie sur [system.md](../system.md) et les rôles experts dans `/agents/`. Aucun script ne modifie le contenu ; la qualité est assurée par critères + revue humaine/agent.

---

## 1. Agents utilisés

Les rôles à **lire et activer** pour la revue qualité (dans `/agents/`) :

| Priorité | Rôle | Dossier | Rôle dans la chaîne qualité |
|----------|------|---------|-----------------------------|
| 1 | **Clarity Coach** | qualite-tests-validation | Formulation des questions et réponses, suppression des ambiguïtés, explications claires. |
| 2 | **Critical Thinking Analyst** | strategie-structuration | Unicité et logique de la réponse, questions non biaisées, cadre de pensée. |
| 3 | **Knowledge Librarian** | qualite-tests-validation | Structure des notions, taxonomie, cohérence, pas de doublons ni incohérences. |
| 4 | **Test Writer & Fixer** | narrative-audio-writting-contents | Rigueur des critères, cas limites (variantes de réponses), maintenabilité du jeu de données. |
| 5 | **Conversion Optimizer** | qualite-tests-validation | Clarté des formulations pour l’utilisateur (réduction de la friction, propositions compréhensibles). |

**Règle (system.md)** : présenter cette liste pour confirmation avant exécution, puis n’utiliser que ces rôles pour la revue.

---

## 2. Grille de critères – Questions (questions.json)

À appliquer pour chaque question (alignement Clarity Coach + Critical Thinking + Test Writer).

| Critère | Exigence |
|---------|----------|
| **Formulation** | Phrase claire, sans jargon inutile, une seule interprétation possible. |
| **Réponse attendue** | Une seule réponse correcte (ou variantes documentées et gérées par `normalizeAnswer` / alias). |
| **Explications** | Courtes, utiles, sans faute, en français. |
| **Cohérence** | `theme` et `difficulte` en accord avec la question ; pas de doublon sémantique. |
| **Technique** | Pas d’espaces superflus ni de casse problématique ; `reponse` compatible avec [lib/normalizeAnswer.ts](../lib/normalizeAnswer.ts) (minuscules, trim, NFD, suppression des diacritiques). |

---

## 3. Grille de critères – Notions (notions.json)

À appliquer pour chaque notion (alignement Knowledge Librarian + Clarity Coach).

| Critère | Exigence |
|---------|----------|
| **Titre** | Précis, sans redondance avec le contenu. |
| **Contenu** | Structuré, factuellement correct, aligné avec le programme (blocs frontend/backend/transversal). |
| **Tags** | Pertinents, cohérents avec le titre et le contenu, pas de doublons inutiles. |
| **Bloc** | Valeur valide : `frontend` \| `backend` \| `transversal` ([types/index.ts](../types/index.ts)). |
| **Cohérence globale** | Pas de contradiction entre notions, pas de notion orpheline par rapport au reste de la base. |

---

## 4. Processus de revue

### 4.1 Notions (20 entrées) — revue ligne par ligne

- **Pas de script** : relecture manuelle de chaque notion.
- **Pour chaque entrée** : appliquer la grille (titre, contenu, tags, bloc, cohérence).
- **Appel aux agents** : pour chaque notion (ou par petit lot de 3–5), demander à l’orchestrateur (avec rôles activés) une revue du type indiqué en section 5.
- **Corrections** : appliquer les corrections proposées directement dans `data/notions.json` après validation.

### 4.2 Questions (1000 entrées) — revue par lots

- **Pas de script de modification automatique du contenu** : la qualité est assurée par critères + revue humaine/agent.
- **Découpage** : par thème (HTML, CSS, JavaScript, SQL, API, etc.) ou par tranches de 50–100 questions.
- **Pour chaque lot** : l’orchestrateur (Clarity Coach, Critical Thinking Analyst, Test Writer & Fixer, Conversion Optimizer si utile) produit un **rapport de relecture** : questions ambiguës, réponses multiples possibles, explications à améliorer, incohérences theme/difficulte.
- **Corrections** : appliquer les corrections dans `data/questions.json` en s’appuyant sur le rapport (reformulation, unification des réponses, ajout d’explications).

---

## 5. Exemples de briefs pour invoquer les agents

- **Notions (Knowledge Librarian + Clarity Coach)**  
  « En tant que Knowledge Librarian et Clarity Coach, vérifie la notion nX : titre, contenu, tags, bloc. Signale toute ambiguïté, redondance ou erreur factuelle. Propose des corrections si besoin. »

- **Questions – clarté (Clarity Coach)**  
  « En tant que Clarity Coach, vérifie les questions du lot suivant : formulation sans ambiguïté, une seule interprétation possible, explications claires et utiles. Liste les entrées à corriger avec une proposition de reformulation. »

- **Questions – logique (Critical Thinking Analyst)**  
  « En tant que Critical Thinking Analyst, vérifie que chaque question admet une seule réponse correcte (ou des variantes explicites). Signale les questions biaisées ou à plusieurs réponses possibles. »

- **Questions – rigueur (Test Writer & Fixer)**  
  « En tant que Test Writer & Fixer, vérifie la cohérence theme/difficulte et la compatibilité des champs `reponse` avec la logique de comparaison (normalizeAnswer). Signale les cas limites (espaces, accents, variantes). »

- **Questions – UX (Conversion Optimizer)**  
  « En tant que Conversion Optimizer, vérifie que les formulations réduisent la friction pour l’utilisateur : questions compréhensibles au premier coup d’œil, réponses et propositions claires. »

---

## 6. Points d’attention

- **Aucun script** ne modifie le contenu de `questions.json` ou `notions.json` : le cœur du projet reste piloté par des décisions humaines + avis des agents.
- **normalizeAnswer** : toute nouvelle variante de réponse (alias) doit rester compatible avec la logique actuelle (minuscules, NFD, suppression des diacritiques).
- **Types** : respecter [types/index.ts](../types/index.ts) (Bloc, Difficulte, structure Question/Notion) lors des corrections.

---

## 7. Résumé des corrections appliquées (revue initiale)

### Notions (notions.json)

- **n1** : « Maquetter = » → « Maquetter : » (clarté de la définition).
- **n2** : « Améliore le SEO » → « Cela améliore le SEO » (sujet explicite).
- **n19** : tag « méthodo » → « méthodologie » (cohérence des libellés).

### Questions (questions.json)

- **q43** (et doublons) : question « Quel attribut de <link>… » → « Quelle valeur de l'attribut rel de <link> indique une feuille CSS ? » (alignement question / réponse « stylesheet »).
- **q47 / q48** (et doublons) : explications « option » → « options » ; « option value=… » → « <option value=…> » (orthographe et balise complète).
- **footer** : explications « footer contient infos » → « footer contient les infos » (grammaire).
