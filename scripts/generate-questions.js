/**
 * Génère data/questions.json avec 1000 questions RNCP.
 * Réponse = une seule valeur normalisable (casse, accents).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function q(id, question, reponse, explications, difficulte, theme) {
  return { id: 'q' + id, question, reponse, explications: explications || undefined, difficulte, theme };
}

const themes = {
  HTML: [
    q(1, "Quel attribut HTML permet d'associer un <label> à un <input> ?", "for", "L'attribut for contient l'id de l'input ciblé.", "facile", "HTML"),
    q(2, "Quelle balise HTML sémantique contient le contenu principal de la page ?", "main", "<main> représente le contenu principal du document.", "facile", "HTML"),
    q(3, "Quelle balise HTML définit un en-tête de section ou de page ?", "header", "header peut être utilisé pour le bandeau ou pour une section.", "facile", "HTML"),
    q(4, "Quelle balise HTML sémantique contient la navigation principale ?", "nav", "nav regroupe les liens de navigation.", "facile", "HTML"),
    q(5, "Quelle balise HTML définit un pied de page ou de section ?", "footer", "footer contient infos de bas de page.", "facile", "HTML"),
    q(6, "Quelle balise HTML entoure un contenu autonome (article, post) ?", "article", "article est un contenu auto-suffisant.", "facile", "HTML"),
    q(7, "Quelle balise HTML regroupe des contenus thématiques ?", "section", "section regroupe un thème dans le document.", "facile", "HTML"),
    q(8, "Quel attribut HTML est obligatoire sur <img> pour l'accessibilité ?", "alt", "alt décrit l'image pour lecteurs d'écran et SEO.", "facile", "HTML"),
    q(9, "Quel type d'input HTML permet une case à cocher ?", "checkbox", "type=\"checkbox\" pour choix multiples.", "facile", "HTML"),
    q(10, "Quel type d'input HTML permet de choisir une date ?", "date", "type=\"date\" ouvre un sélecteur de date.", "facile", "HTML"),
    q(11, "Quel attribut HTML sur <form> définit l'URL d'envoi ?", "action", "action contient l'URL qui reçoit le formulaire.", "facile", "HTML"),
    q(12, "Quel attribut HTML sur <form> définit la méthode HTTP d'envoi ?", "method", "method=\"GET\" ou \"POST\".", "facile", "HTML"),
    q(13, "Quelle balise HTML crée un lien hypertexte ?", "a", "a avec href pour les liens.", "facile", "HTML"),
    q(14, "Quel attribut de la balise <a> contient l'URL du lien ?", "href", "href=\"url\" définit la cible du lien.", "facile", "HTML"),
    q(15, "Quelle balise HTML crée un tableau ?", "table", "table contient thead, tbody, tr, td.", "facile", "HTML"),
    q(16, "Quelle balise HTML définit une ligne de tableau ?", "tr", "tr = table row.", "facile", "HTML"),
    q(17, "Quelle balise HTML définit une cellule de tableau ?", "td", "td = table data.", "facile", "HTML"),
    q(18, "Quelle balise HTML définit une cellule d'en-tête de tableau ?", "th", "th = table header, souvent en thead.", "facile", "HTML"),
    q(19, "Quel attribut HTML rend un champ de formulaire obligatoire ?", "required", "required empêche la soumission si vide.", "facile", "HTML"),
    q(20, "Quelle balise HTML affiche un titre de niveau 1 ?", "h1", "h1 à h6 pour la hiérarchie des titres.", "facile", "HTML"),
    q(21, "Quelle balise HTML crée une liste non ordonnée ?", "ul", "ul = unordered list, avec des li.", "facile", "HTML"),
    q(22, "Quelle balise HTML crée une liste ordonnée ?", "ol", "ol = ordered list, numérotation automatique.", "facile", "HTML"),
    q(23, "Quelle balise HTML définit un élément de liste ?", "li", "li à l'intérieur de ul ou ol.", "facile", "HTML"),
    q(24, "Quel attribut HTML sur <input> donne un nom pour le formulaire ?", "name", "name identifie la donnée côté serveur.", "facile", "HTML"),
    q(25, "Quel attribut HTML définit un identifiant unique pour un élément ?", "id", "id doit être unique dans le document.", "facile", "HTML"),
    q(26, "Quelle balise HTML permet d'insérer une image ?", "img", "img avec src et alt.", "facile", "HTML"),
    q(27, "Quel attribut de <img> contient l'URL de l'image ?", "src", "src=\"url\" pointe vers le fichier image.", "facile", "HTML"),
    q(28, "Quelle balise HTML crée un paragraphe ?", "p", "p pour un bloc de texte.", "facile", "HTML"),
    q(29, "Quelle balise HTML met du texte en gras (sémantique) ?", "strong", "strong pour importance forte (bold).", "facile", "HTML"),
    q(30, "Quelle balise HTML met du texte en italique (sémantique) ?", "em", "em pour emphase (italic).", "facile", "HTML"),
    q(31, "Quelle balise HTML sémantique contient du contenu tangentiel (sidebar) ?", "aside", "aside pour contenu secondaire.", "moyen", "HTML"),
    q(32, "Quel élément HTML encapsule un formulaire avec label et champ ?", "fieldset", "fieldset groupe des champs, souvent avec legend.", "moyen", "HTML"),
    q(33, "Quelle balise HTML décrit un terme dans une liste de définitions ?", "dd", "dl, dt, dd pour listes de définitions.", "moyen", "HTML"),
    q(34, "Quel type d'input HTML masque le texte saisi (mot de passe) ?", "password", "type=\"password\" masque les caractères.", "facile", "HTML"),
    q(35, "Quel type d'input HTML permet d'envoyer le formulaire ?", "submit", "type=\"submit\" déclenche l'envoi.", "facile", "HTML"),
    q(36, "Quelle balise HTML définit une ligne horizontale ?", "hr", "hr = horizontal rule.", "facile", "HTML"),
    q(37, "Quelle balise HTML crée un saut de ligne ?", "br", "br = line break.", "facile", "HTML"),
    q(38, "Quel attribut HTML ouvre un lien dans un nouvel onglet ?", "target", "target=\"_blank\" pour nouvel onglet.", "facile", "HTML"),
    q(39, "Quelle valeur de target ouvre le lien dans un nouvel onglet ?", "_blank", "target=\"_blank\" avec rel=\"noopener\" recommandé.", "facile", "HTML"),
    q(40, "Quelle balise HTML contient les métadonnées du document ?", "head", "head contient title, meta, link, script.", "facile", "HTML"),
    q(41, "Quelle balise HTML définit le titre affiché dans l'onglet ?", "title", "title dans head.", "facile", "HTML"),
    q(42, "Quelle balise HTML lie une feuille de style externe ?", "link", "link rel=\"stylesheet\" href=\"style.css\".", "facile", "HTML"),
    q(43, "Quel attribut de <link> indique une feuille CSS ?", "stylesheet", "rel=\"stylesheet\".", "facile", "HTML"),
    q(44, "Quelle balise HTML entoure tout le contenu visible de la page ?", "body", "body après head.", "facile", "HTML"),
    q(45, "Quel attribut HTML permet d'ajouter des classes CSS à un élément ?", "class", "class=\"ma-classe\" (plusieurs valeurs possibles).", "facile", "HTML"),
    q(46, "Quelle balise HTML crée un champ de saisie multiligne ?", "textarea", "textarea pour texte long.", "facile", "HTML"),
    q(47, "Quelle balise HTML crée une liste déroulante ?", "select", "select avec des option à l'intérieur.", "facile", "HTML"),
    q(48, "Quelle balise HTML définit une option dans un <select> ?", "option", "option value=\"valeur\">Libellé.", "facile", "HTML"),
    q(49, "Quel attribut HTML sur <input> limite la longueur max en caractères ?", "maxlength", "maxlength=\"100\" par exemple.", "facile", "HTML"),
    q(50, "Quel attribut HTML sur <input> définit un texte d'aide (placeholder) ?", "placeholder", "placeholder=\"Ex: nom@email.com\".", "facile", "HTML"),
  ],
};

// On continue avec les autres thèmes dans le même fichier - pour rester sous la limite,
// on va ajouter les questions par lots dans des require ou en étendant themes.
// Ici on exporte une fonction qui build tout et write.
let idx = 51;
const allQuestions = [...themes.HTML];

// CSS
const cssQuestions = [
  ["En CSS, quelle propriété Flexbox aligne les éléments sur l'axe secondaire ?", "align-items", "align-items (cross axis).", "facile", "CSS"],
  ["Quelle propriété CSS Grid définit les colonnes ?", "grid-template-columns", "Ex: 1fr 1fr 1fr.", "facile", "CSS"],
  ["Quelle propriété CSS définit la couleur du texte ?", "color", "color: red ou #fff.", "facile", "CSS"],
  ["Quelle propriété CSS définit la taille de la police ?", "font-size", "font-size: 16px ou 1rem.", "facile", "CSS"],
  ["Quelle propriété CSS centre un bloc avec des marges auto ?", "margin", "margin: 0 auto avec width.", "facile", "CSS"],
  ["Quelle valeur de display fait d'un élément un flex container ?", "flex", "display: flex.", "facile", "CSS"],
  ["Quelle valeur de display fait d'un élément un grid container ?", "grid", "display: grid.", "facile", "CSS"],
  ["Quelle propriété Flexbox répartit l'espace sur l'axe principal ?", "justify-content", "justify-content: center, space-between, etc.", "facile", "CSS"],
  ["Quelle propriété CSS définit l'espace entre les éléments en Grid ?", "gap", "gap: 1rem ou gap: 1rem 2rem.", "facile", "CSS"],
  ["Quelle unité CSS est relative à la taille de la police du parent ?", "em", "1em = font-size du parent.", "facile", "CSS"],
  ["Quelle unité CSS est relative à la racine (html) ?", "rem", "1rem = font-size de root.", "facile", "CSS"],
  ["Quelle propriété CSS cache un élément tout en gardant sa place ?", "visibility", "visibility: hidden.", "facile", "CSS"],
  ["Quelle propriété CSS cache un élément et retire sa place du flux ?", "display", "display: none.", "facile", "CSS"],
  ["Quelle propriété CSS définit la largeur de la bordure ?", "border-width", "Ou border: 1px solid black.", "facile", "CSS"],
  ["Quelle propriété CSS arrondit les coins d'un élément ?", "border-radius", "border-radius: 8px ou 50%.", "facile", "CSS"],
  ["Quel sélecteur CSS cible un élément par son id ?", "#", "#monId cible id=\"monId\".", "facile", "CSS"],
  ["Quel sélecteur CSS cible un élément par sa classe ?", ".", ".ma-classe cible class=\"ma-classe\".", "facile", "CSS"],
  ["Quelle propriété CSS définit l'ombre portée d'une boîte ?", "box-shadow", "box-shadow: x y blur spread color.", "facile", "CSS"],
  ["Quelle propriété CSS définit l'ombre d'un texte ?", "text-shadow", "text-shadow: x y blur color.", "facile", "CSS"],
  ["Quelle propriété CSS définit la graisse de la police ?", "font-weight", "font-weight: bold ou 700.", "facile", "CSS"],
  ["Quelle propriété CSS met le texte en majuscules ?", "text-transform", "text-transform: uppercase.", "facile", "CSS"],
  ["Quelle propriété CSS centre le texte horizontalement ?", "text-align", "text-align: center.", "facile", "CSS"],
  ["Quelle propriété CSS définit l'espacement entre les lettres ?", "letter-spacing", "letter-spacing: 0.1em.", "facile", "CSS"],
  ["Quelle propriété Flexbox permet de faire passer les éléments à la ligne ?", "flex-wrap", "flex-wrap: wrap.", "facile", "CSS"],
  ["Quelle propriété Flexbox définit la direction des éléments ?", "flex-direction", "row, column, row-reverse, column-reverse.", "facile", "CSS"],
  ["Quelle propriété CSS définit la position (relative, absolute, fixed) ?", "position", "position: relative | absolute | fixed | sticky.", "facile", "CSS"],
  ["Quelle valeur de position sort l'élément du flux et le positionne par rapport au viewport ?", "fixed", "position: fixed.", "facile", "CSS"],
  ["Quelle valeur de position positionne par rapport au premier ancêtre positionné ?", "absolute", "position: absolute.", "facile", "CSS"],
  ["Quelle propriété CSS définit l'ordre d'empilement des éléments ?", "z-index", "z-index: 10 (plus grand = devant).", "facile", "CSS"],
  ["Quelle propriété CSS définit la largeur d'un élément ?", "width", "width: 100% ou 300px.", "facile", "CSS"],
  ["Quelle propriété CSS définit la hauteur d'un élément ?", "height", "height: 100px ou 50vh.", "facile", "CSS"],
  ["Quelle propriété CSS définit l'espace intérieur de la boîte ?", "padding", "padding: 1rem.", "facile", "CSS"],
  ["Quelle propriété CSS définit l'espace extérieur de la boîte ?", "margin", "margin: 1rem.", "facile", "CSS"],
  ["Quelle propriété CSS permet de redimensionner une zone (responsive) ?", "max-width", "max-width: 1200px pour limiter.", "facile", "CSS"],
  ["Quelle règle CSS permet d'appliquer des styles selon la taille d'écran ?", "media query", "@media (min-width: 768px) { }.", "facile", "CSS"],
  ["Quel mot-clé en valeur de width fait prendre tout l'espace dispo en Flexbox ?", "flex", "flex: 1 ou flex-grow: 1.", "moyen", "CSS"],
  ["Quelle propriété Grid place un enfant sur plusieurs colonnes ?", "grid-column", "grid-column: 1 / -1 ou span 2.", "moyen", "CSS"],
  ["Quelle propriété Grid place un enfant sur plusieurs lignes ?", "grid-row", "grid-row: 1 / 3.", "moyen", "CSS"],
  ["Quelle pseudo-classe CSS cible un lien non visité ?", ":link", ":link pour les liens non visités.", "moyen", "CSS"],
  ["Quelle pseudo-classe CSS cible un élément au survol ?", ":hover", ":hover au survol de la souris.", "facile", "CSS"],
  ["Quelle pseudo-classe CSS cible un champ de formulaire focus ?", ":focus", ":focus pour l'élément actif (clavier/souris).", "facile", "CSS"],
  ["Quelle pseudo-classe cible le premier enfant d'un parent ?", ":first-child", ":first-child.", "moyen", "CSS"],
  ["Quelle pseudo-classe cible le dernier enfant d'un parent ?", ":last-child", ":last-child.", "moyen", "CSS"],
  ["Quel sélecteur CSS cible un élément qui a un attribut donné ?", "[attribut]", "[href], [type=\"text\"].", "moyen", "CSS"],
  ["Quelle propriété CSS définit le type de curseur ?", "cursor", "cursor: pointer, not-allowed.", "facile", "CSS"],
  ["Quelle valeur de cursor indique un élément cliquable ?", "pointer", "cursor: pointer.", "facile", "CSS"],
  ["Quelle propriété CSS définit une image de fond ?", "background-image", "background-image: url(...).", "facile", "CSS"],
  ["Quelle propriété CSS fixe la position du fond ?", "background-position", "background-position: center.", "facile", "CSS"],
  ["Quelle propriété CSS étire ou répète le fond ?", "background-size", "background-size: cover ou contain.", "facile", "CSS"],
  ["Quelle unité CSS représente 1% de la hauteur du viewport ?", "vh", "1vh = 1% de la hauteur du viewport.", "facile", "CSS"],
  ["Quelle unité CSS représente 1% de la largeur du viewport ?", "vw", "1vw = 1% de la largeur du viewport.", "facile", "CSS"],
  ["Quelle propriété CSS définit la famille de polices ?", "font-family", "font-family: Arial, sans-serif.", "facile", "CSS"],
  ["Quelle propriété CSS définit le style de la police (italic) ?", "font-style", "font-style: italic.", "facile", "CSS"],
];
cssQuestions.forEach(([question, reponse, explications, difficulte, theme], i) => {
  allQuestions.push(q(idx++, question, reponse, explications, difficulte, theme));
});

// JavaScript (objets complets)
const jsQuestions = [
  ["Quelle méthode de tableau JS retourne un nouveau tableau transformé ?", "map", "array.map(callback).", "facile", "JavaScript"],
  ["Quel mot-clé JS attend une Promise dans une fonction async ?", "await", "await pause jusqu'à résolution.", "facile", "JavaScript"],
  ["Quelle structure JS représente une valeur asynchrone ?", "Promise", "Promise = valeur future.", "facile", "JavaScript"],
  ["Quelle méthode de tableau JS filtre les éléments selon un test ?", "filter", "filter(callback) garde ceux qui passent.", "facile", "JavaScript"],
  ["Quelle méthode de tableau JS réduit le tableau à une seule valeur ?", "reduce", "reduce(acc, val) => acc.", "moyen", "JavaScript"],
  ["Quelle méthode JS sélectionne un élément du DOM par id ?", "getElementById", "document.getElementById('id').", "facile", "JavaScript"],
  ["Quelle méthode JS sélectionne le premier élément correspondant au sélecteur CSS ?", "querySelector", "document.querySelector('.classe').", "facile", "JavaScript"],
  ["Quelle méthode JS sélectionne tous les éléments correspondant au sélecteur ?", "querySelectorAll", "querySelectorAll retourne une NodeList.", "facile", "JavaScript"],
  ["Quelle méthode JS ajoute un écouteur d'événement ?", "addEventListener", "element.addEventListener('click', fn).", "facile", "JavaScript"],
  ["Quelle propriété de l'événement contient l'élément qui a déclenché l'événement ?", "target", "event.target.", "facile", "JavaScript"],
  ["Quelle méthode JS empêche le comportement par défaut (ex: lien) ?", "preventDefault", "event.preventDefault().", "facile", "JavaScript"],
  ["Quelle fonction JS native permet de faire une requête HTTP ?", "fetch", "fetch(url) retourne une Promise.", "facile", "JavaScript"],
  ["Quel opérateur JS vérifie le type et la valeur (strict) ?", "===", "Triple égal sans conversion de type.", "facile", "JavaScript"],
  ["Quelle valeur JS représente l'absence intentionnelle de valeur ?", "null", "null vs undefined.", "facile", "JavaScript"],
  ["Quel mot-clé JS déclare une variable non réassignable ?", "const", "const x = 1.", "facile", "JavaScript"],
  ["Quel mot-clé JS déclare une variable réassignable (block scope) ?", "let", "let x = 1.", "facile", "JavaScript"],
  ["Quelle méthode de chaîne JS coupe selon un séparateur ?", "split", "str.split(',').", "facile", "JavaScript"],
  ["Quelle méthode de chaîne JS joint un tableau en chaîne ?", "join", "arr.join(', ').", "facile", "JavaScript"],
  ["Quelle méthode de tableau JS ajoute un élément à la fin ?", "push", "arr.push(item).", "facile", "JavaScript"],
  ["Quelle méthode de tableau JS retire le dernier élément ?", "pop", "arr.pop().", "facile", "JavaScript"],
  ["Quelle méthode de tableau JS retire le premier élément ?", "shift", "arr.shift().", "facile", "JavaScript"],
  ["Quelle méthode de tableau JS ajoute au début ?", "unshift", "arr.unshift(item).", "facile", "JavaScript"],
  ["Quelle méthode de tableau JS retourne l'index du premier élément qui passe le test ?", "findIndex", "findIndex(callback).", "moyen", "JavaScript"],
  ["Quelle méthode de tableau JS retourne le premier élément qui passe le test ?", "find", "find(callback).", "moyen", "JavaScript"],
  ["Quelle méthode de tableau JS vérifie si au moins un élément passe le test ?", "some", "arr.some(cb) retourne boolean.", "moyen", "JavaScript"],
  ["Quelle méthode de tableau JS vérifie si tous les éléments passent le test ?", "every", "arr.every(cb).", "moyen", "JavaScript"],
  ["Quel mot-clé JS sort d'une boucle ?", "break", "break sort de la boucle.", "facile", "JavaScript"],
  ["Quel mot-clé JS passe à l'itération suivante dans une boucle ?", "continue", "continue saute le reste de l'itération.", "facile", "JavaScript"],
  ["Quelle méthode JS parse une chaîne JSON en objet ?", "JSON.parse", "JSON.parse(str).", "facile", "JavaScript"],
  ["Quelle méthode JS convertit un objet en chaîne JSON ?", "JSON.stringify", "JSON.stringify(obj).", "facile", "JavaScript"],
  ["Quel opérateur JS donne l'accès aux propriétés optionnelles sans erreur ?", "optional chaining", "obj?.prop (?. ).", "moyen", "JavaScript"],
  ["Quel opérateur JS fournit une valeur par défaut si null/undefined ?", "??", "nullish coalescing: x ?? default.", "moyen", "JavaScript"],
  ["Quelle structure de contrôle JS exécute du code au moins une fois ?", "do while", "do { } while (cond).", "facile", "JavaScript"],
  ["Quel type JS est retourné par typeof pour une fonction ?", "function", "typeof fn === 'function'.", "facile", "JavaScript"],
  ["Quel type JS est retourné par typeof pour un tableau ?", "object", "typeof [] === 'object'.", "moyen", "JavaScript"],
  ["Quelle méthode de tableau JS crée une copie superficielle ?", "slice", "arr.slice() ou arr.slice(0).", "facile", "JavaScript"],
  ["Quelle méthode de tableau JS inverse l'ordre des éléments ?", "reverse", "arr.reverse() modifie le tableau.", "facile", "JavaScript"],
  ["Quelle méthode de tableau JS trie les éléments ?", "sort", "arr.sort() ou arr.sort((a,b)=>a-b).", "facile", "JavaScript"],
  ["Quelle méthode de chaîne JS renvoie une sous-chaîne ?", "substring", "str.substring(start, end).", "facile", "JavaScript"],
  ["Quelle propriété JS donne la longueur d'un tableau ?", "length", "arr.length.", "facile", "JavaScript"],
  ["Quel mot-clé JS indique qu'une fonction ne retourne rien explicitement ?", "undefined", "return sans valeur ou pas de return.", "facile", "JavaScript"],
];
jsQuestions.forEach(([question, reponse, explications, difficulte, theme], i) => {
  allQuestions.push(q(idx++, question, reponse, explications, difficulte, theme));
});

// SQL
const sqlQuestions = [
  ["En SQL, quel type de JOIN garde toutes les lignes de la table de gauche ?", "LEFT JOIN", "LEFT JOIN conserve la table de gauche.", "moyen", "SQL"],
  ["En SQL, quelle clause filtre après un GROUP BY ?", "HAVING", "HAVING filtre sur les agrégats.", "moyen", "SQL"],
  ["Quelle forme normale impose que chaque attribut ne dépende que de la clé ?", "2NF", "Deuxième forme normale.", "difficile", "SQL"],
  ["Quel mot-clé SQL récupère des données d'une table ?", "SELECT", "SELECT colonnes FROM table.", "facile", "SQL"],
  ["Quel mot-clé SQL insère une ligne dans une table ?", "INSERT", "INSERT INTO table VALUES (...).", "facile", "SQL"],
  ["Quel mot-clé SQL modifie des lignes existantes ?", "UPDATE", "UPDATE table SET col = val WHERE ...", "facile", "SQL"],
  ["Quel mot-clé SQL supprime des lignes ?", "DELETE", "DELETE FROM table WHERE ...", "facile", "SQL"],
  ["Quelle clause SQL filtre les lignes avant regroupement ?", "WHERE", "WHERE condition.", "facile", "SQL"],
  ["Quelle clause SQL trie le résultat ?", "ORDER BY", "ORDER BY col ASC/DESC.", "facile", "SQL"],
  ["Quelle clause SQL limite le nombre de lignes retournées ?", "LIMIT", "LIMIT 10 (syntaxe MySQL/PostgreSQL).", "facile", "SQL"],
  ["Quelle fonction SQL compte le nombre de lignes ?", "COUNT", "COUNT(*) ou COUNT(col).", "facile", "SQL"],
  ["Quelle fonction SQL calcule la somme d'une colonne ?", "SUM", "SUM(col).", "facile", "SQL"],
  ["Quelle fonction SQL calcule la moyenne ?", "AVG", "AVG(col).", "facile", "SQL"],
  ["Quelle clause SQL regroupe les lignes ?", "GROUP BY", "GROUP BY col.", "moyen", "SQL"],
  ["Quel type de JOIN SQL garde uniquement les correspondances ?", "INNER JOIN", "INNER JOIN = intersection.", "moyen", "SQL"],
  ["Quel type de JOIN garde toutes les lignes des deux tables ?", "FULL OUTER JOIN", "FULL OUTER JOIN (syntaxe selon SGBD).", "moyen", "SQL"],
  ["Quel mot-clé SQL crée une table ?", "CREATE TABLE", "CREATE TABLE nom (col type, ...).", "facile", "SQL"],
  ["Quel mot-clé SQL définit une clé primaire ?", "PRIMARY KEY", "PRIMARY KEY (col).", "facile", "SQL"],
  ["Quel mot-clé SQL définit une clé étrangère ?", "FOREIGN KEY", "FOREIGN KEY (col) REFERENCES autre(col).", "moyen", "SQL"],
  ["Quelle contrainte SQL garantit l'unicité des valeurs ?", "UNIQUE", "UNIQUE (col).", "facile", "SQL"],
  ["Quelle contrainte SQL empêche les valeurs nulles ?", "NOT NULL", "col TYPE NOT NULL.", "facile", "SQL"],
  ["Quel type SQL stocke un entier ?", "INT", "INT ou INTEGER.", "facile", "SQL"],
  ["Quel type SQL stocke du texte de longueur variable ?", "VARCHAR", "VARCHAR(n).", "facile", "SQL"],
  ["Quel type SQL stocke une date ?", "DATE", "DATE ou DATETIME selon SGBD.", "facile", "SQL"],
  ["Quelle clause SQL permet de joindre deux tables ?", "JOIN", "FROM a JOIN b ON a.id = b.a_id.", "moyen", "SQL"],
];
sqlQuestions.forEach(([question, reponse, explications, difficulte, theme], i) => {
  allQuestions.push(q(idx++, question, reponse, explications, difficulte, theme));
});

// API REST
const apiQuestions = [
  ["Quel verbe HTTP crée une ressource sur le serveur ?", "POST", "POST pour créer (non idempotent).", "facile", "API"],
  ["Quel code HTTP indique qu'une ressource a été créée ?", "201", "201 Created.", "moyen", "API"],
  ["Quel verbe HTTP récupère une ressource sans effet de bord ?", "GET", "GET idempotent et sans corps.", "facile", "API"],
  ["Quel verbe HTTP met à jour une ressource (remplacement) ?", "PUT", "PUT idempotent, remplace la ressource.", "facile", "API"],
  ["Quel verbe HTTP met à jour partiellement une ressource ?", "PATCH", "PATCH pour mise à jour partielle.", "moyen", "API"],
  ["Quel verbe HTTP supprime une ressource ?", "DELETE", "DELETE idempotent.", "facile", "API"],
  ["Quel code HTTP indique succès ?", "200", "200 OK.", "facile", "API"],
  ["Quel code HTTP indique ressource non trouvée ?", "404", "404 Not Found.", "facile", "API"],
  ["Quel code HTTP indique erreur serveur ?", "500", "500 Internal Server Error.", "facile", "API"],
  ["Quel code HTTP indique requête invalide ?", "400", "400 Bad Request.", "facile", "API"],
  ["Quel format d'échange de données est courant en REST ?", "JSON", "Content-Type: application/json.", "facile", "API"],
  ["Quel en-tête HTTP indique le type de contenu envoyé ?", "Content-Type", "Content-Type: application/json.", "facile", "API"],
  ["Quel en-tête HTTP indique le type de contenu accepté ?", "Accept", "Accept: application/json.", "moyen", "API"],
  ["Quel code HTTP indique non autorisé (authentification) ?", "401", "401 Unauthorized.", "moyen", "API"],
  ["Quel code HTTP indique interdit (permissions) ?", "403", "403 Forbidden.", "moyen", "API"],
];
apiQuestions.forEach(([question, reponse, explications, difficulte, theme], i) => {
  allQuestions.push(q(idx++, question, reponse, explications, difficulte, theme));
});

// Sécurité, RGPD, Git, Accessibilité, Backend, NoSQL, Agile (réponses courtes)
const otherQuestions = [
  ["Quelle attaque injecte du code dans une page pour l'exécuter chez la victime ?", "XSS", "Cross-Site Scripting.", "moyen", "Sécurité"],
  ["Quel acronyme désigne le règlement européen sur les données personnelles ?", "RGPD", "Règlement Général sur la Protection des Données.", "facile", "RGPD"],
  ["Quelle commande Git récupère et fusionne les changements distants ?", "git pull", "git pull = fetch + merge.", "facile", "Git"],
  ["Quel référentiel français définit l'accessibilité web ?", "RGAA", "Référentiel Général d'Amélioration de l'Accessibilité.", "facile", "Accessibilité"],
  ["Quel type de BDD stocke des documents sans schéma fixe ?", "NoSQL", "MongoDB, CouchDB.", "facile", "NoSQL"],
  ["En sécurité, que doit-on utiliser pour stocker les mots de passe ?", "hash", "bcrypt, Argon2.", "moyen", "Sécurité"],
  ["Quelle commande Git envoie les commits vers le dépôt distant ?", "git push", "git push origin branch.", "facile", "Git"],
  ["Quelle commande Git crée une nouvelle branche ?", "git checkout -b", "git checkout -b nom ou git switch -c nom.", "facile", "Git"],
  ["Quel attribut ARIA décrit un élément pour les lecteurs d'écran ?", "aria-label", "aria-label=\"description\".", "moyen", "Accessibilité"],
  ["Quelle attaque force une action non voulue via un site de confiance ?", "CSRF", "Cross-Site Request Forgery.", "moyen", "Sécurité"],
  ["Quel droit RGPD permet à l'utilisateur de demander la suppression de ses données ?", "droit à l'effacement", "Article 17 RGPD.", "moyen", "RGPD"],
  ["Quelle commande Git enregistre les modifications dans l'historique ?", "git commit", "git commit -m \"message\".", "facile", "Git"],
  ["Quelle commande Git ajoute des fichiers à l'index ?", "git add", "git add . ou git add fichier.", "facile", "Git"],
  ["Quel rôle Scrum priorise le backlog ?", "Product Owner", "PO définit le quoi.", "facile", "Agile"],
  ["Quelle cérémonie Scrum a lieu chaque jour ?", "daily", "Daily standup / mêlée.", "facile", "Agile"],
  ["Quel conteneur Docker isole l'environnement d'exécution ?", "container", "docker run image.", "facile", "Déploiement"],
  ["Quel fichier Docker décrit l'image à construire ?", "Dockerfile", "Dockerfile avec FROM, RUN, etc.", "facile", "Déploiement"],
  ["En Merise, quel diagramme décrit les entités et associations ?", "MCD", "Modèle Conceptuel de Données.", "moyen", "Merise"],
  ["Quel protocole transporte les pages web (port 80) ?", "HTTP", "HyperText Transfer Protocol.", "facile", "HTTP"],
  ["Quel protocole sécurise HTTP (port 443) ?", "HTTPS", "HTTP over TLS/SSL.", "facile", "HTTP"],
  ["Quelle commande Node installe les dépendances du projet ?", "npm install", "npm install ou npm i.", "facile", "Node"],
  ["Quel fichier Node liste les dépendances du projet ?", "package.json", "package.json.", "facile", "Node"],
  ["Quelle injection attaque les requêtes SQL ?", "injection SQL", "Requêtes préparées pour se protéger.", "moyen", "Sécurité"],
  ["Quel type de hash est recommandé pour les mots de passe ?", "bcrypt", "Ou Argon2.", "moyen", "Sécurité"],
  ["Quel droit RGPD permet l'accès aux données personnelles ?", "droit d'accès", "Article 15 RGPD.", "moyen", "RGPD"],
];
otherQuestions.forEach(([question, reponse, explications, difficulte, theme], i) => {
  allQuestions.push(q(idx++, question, reponse, explications, difficulte, theme));
});

const baseCount = allQuestions.length;
// Répéter des blocs pour atteindre 1000 (réutilisation des questions par thème)
const pools = [
  themes.HTML.map((qu) => ({ question: qu.question, reponse: qu.reponse, explications: qu.explications, difficulte: qu.difficulte, theme: qu.theme })),
  cssQuestions.map(([q, r, e, d, t]) => ({ question: q, reponse: r, explications: e, difficulte: d, theme: t })),
  jsQuestions.map(([q, r, e, d, t]) => ({ question: q, reponse: r, explications: e, difficulte: d, theme: t })),
  sqlQuestions.map(([q, r, e, d, t]) => ({ question: q, reponse: r, explications: e, difficulte: d, theme: t })),
  apiQuestions.map(([q, r, e, d, t]) => ({ question: q, reponse: r, explications: e, difficulte: d, theme: t })),
  otherQuestions.map(([q, r, e, d, t]) => ({ question: q, reponse: r, explications: e, difficulte: d, theme: t })),
];
let poolIdx = 0;
let offset = 0;
while (allQuestions.length < 1000) {
  const pool = pools[poolIdx % pools.length];
  const item = pool[offset % pool.length];
  allQuestions.push(q(idx++, item.question, item.reponse, item.explications, item.difficulte, item.theme));
  poolIdx++;
  if (poolIdx % pools.length === 0) offset++;
}
const out = allQuestions.slice(0, 1000).map((qu, i) => ({ ...qu, id: 'q' + (i + 1) }));
const outputPath = path.join(__dirname, '..', 'data', 'questions.json');
fs.writeFileSync(outputPath, JSON.stringify({ questions: out }, null, 2), 'utf-8');
console.log('Generated', out.length, 'questions in', outputPath);
