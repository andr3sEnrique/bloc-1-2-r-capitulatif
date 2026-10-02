# RNCP 7 · Simulateur de jury

SPA de révision pour le titre RNCP niveau 7 **« Expert en sécurité des développements informatiques »** — Blocs 1 et 2.

- **Critères & sujets** : critères officiels C1 → C11, ce que le jury attend, erreurs qui pénalisent, format de l’épreuve (découpage des 4 h, trame des 20 min) et sujets blancs (CHU de Val-de-Loire, OuiOuiGo).
- **Simulateur de jury** : 185 flashcards (fondamental → expert), banque officielle, pièges, relances du jury ; filtres par bloc, difficulté, critère, progression ; recherche ; ordre aléatoire ; raccourcis clavier.
- **Oral blanc** : tirage de 5/8/12 questions à difficulté croissante, chrono de 10 min, bilan sur 20.
- **Glossaire** : acronymes à maîtriser.

La progression est enregistrée dans le navigateur (`localStorage`).

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4. Aucune dépendance serveur : site statique.

## Données

Tout le contenu est dans `src/data/` :

| Fichier | Contenu |
| --- | --- |
| `blocks.ts` | Blocs, contexte d’examen, critères C1–C11, sujets blancs et livrables |
| `questions/bloc1.ts` | Questions du Bloc 1 (cas CHU) |
| `questions/bloc2.ts` | Questions du Bloc 2 (cas OuiOuiGo) |
| `questions/general.ts` | Culture générale et questions pièges |
| `glossary.ts` | Glossaire |
| `types.ts` | Schéma des données |

Ajouter une question = ajouter un objet `Question` dans le fichier du bon périmètre (`id` unique).

## Lancer en local

```bash
npm install
npm run dev
```

## Recréer le projet de zéro

```bash
npm create vite@latest app -- --template react-ts
cd app
npm install
npm install -D tailwindcss @tailwindcss/vite
```

Puis ajouter `tailwindcss()` dans `vite.config.ts` et `@import 'tailwindcss';` dans `src/index.css`.

## Déployer sur Vercel (gratuit)

### Option A — via GitHub (recommandé)

1. Créer un dépôt GitHub et pousser le projet :
   ```bash
   git init
   git add .
   git commit -m "Simulateur RNCP 7"
   git branch -M main
   git remote add origin https://github.com/andr3sEnrique/bloc-1-2-r-capitulatif.git
   git push -u origin main
   ```
2. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt.
3. Preset détecté automatiquement : **Vite** (build `npm run build`, sortie `dist`). Cliquer sur **Deploy**.

Chaque `git push` sur `main` redéploie automatiquement.

### Option B — en ligne de commande

```bash
npx vercel
npx vercel --prod
```

Le routage utilise le hash (`#/jury`) : aucune règle de réécriture n’est nécessaire.
