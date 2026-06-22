# Mazaly

Média communautaire francophone israélien. Marque mère pensée pour évoluer (Mazaly Event, Mazaly Digital).

- **Cible** : la communauté francophone vivant en Israël
- **Langue** : 100% français
- **Modèle** : gratuit + publicité

## Stack

- Next.js 14 (App Router) + TypeScript
- Supabase (PostgreSQL, Auth, Storage)
- Tailwind CSS
- TipTap (éditeur de texte riche)
- Déploiement Vercel

## Mise en route

```bash
npm install
cp .env.example .env.local
npm run dev
```

Renseigner dans `.env.local` :

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Installation automatique (recommandé)

Un script crée le projet Supabase, applique le SQL, configure le Storage, crée le
compte admin et écrit `.env.local` — en une commande.

1. Crée un compte sur https://supabase.com (le script ne peut pas créer le compte).
2. Génère un **Personal Access Token** : https://supabase.com/dashboard/account/tokens
3. Lance :

```bash
SUPABASE_ACCESS_TOKEN=sbp_xxx \
ADMIN_EMAIL=toi@exemple.com \
ADMIN_PASSWORD=ton-mot-de-passe \
node supabase/setup.mjs
```

Variables optionnelles : `SUPABASE_ORG_ID` (si plusieurs organisations),
`SUPABASE_REGION` (défaut `eu-central-1`), `SUPABASE_PROJECT_NAME` (défaut `mazaly`),
`SUPABASE_PROJECT_REF` (pour réutiliser un projet déjà créé sans le recréer).

> Le token donne accès à tout ton compte : ne le partage pas et révoque-le après usage.

## Base de données (méthode manuelle)

Alternative au script : dans le SQL Editor de Supabase, exécuter dans l'ordre :

1. `supabase/schema.sql` — tables, RLS, fonctions, trigger profil, catégories par défaut
2. `supabase/storage.sql` — buckets `articles`, `adresses`, `publicites` + policies

(ou en un seul copier-coller : `supabase/setup.sql`)

## Comptes

Aucune inscription publique. Les comptes sont créés manuellement depuis le dashboard
Supabase (Authentication → Users). Un profil `lecteur` est créé automatiquement à
l'inscription ; passez le rôle à `redacteur` ou `admin` depuis `/admin/utilisateurs`
(ou directement en base).

| Rôle | Accès |
| --- | --- |
| `lecteur` | site public |
| `redacteur` | dashboard `/admin` (contenus) |
| `admin` | dashboard complet + gestion des utilisateurs |

## Structure

```
app/
  (public)/        pages publiques (accueil, news, blog, bonnes-adresses, à-propos)
  admin/           dashboard protégé
  api/             newsletter, compteur de vues
  login/           connexion
components/         UI publique + admin
lib/
  supabase/        clients browser/server, middleware, requêtes, auth
  utils/           slug, formatage dates
supabase/          schema.sql, storage.sql
```

## Pages

- `/` accueil (une, news, blog, adresses, pub, newsletter)
- `/news`, `/news/[slug]`
- `/blog`, `/blog/[slug]`
- `/bonnes-adresses`, `/bonnes-adresses/[slug]`
- `/a-propos`
- `/admin` et sous-pages (articles, adresses, catégories, tags, publicités, newsletter, utilisateurs)
