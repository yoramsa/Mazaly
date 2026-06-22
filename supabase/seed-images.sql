-- ============================================================
--  Mazaly — Rattache les visuels de couverture au contenu
--  À lancer APRÈS seed-content.sql, dans Supabase → SQL Editor
--  (les images sont servies par le site : /images/<slug>.jpg)
--  Réexécutable sans risque.
-- ============================================================

-- ---------- Articles de blog ----------
update articles
set image_cover = '/images/' || slug || '.jpg'
where slug in (
  'faire-son-alyah-grandes-etapes',
  'comprendre-kupat-holim-sante-israel',
  'apprendre-hebreu-systeme-oulpanim',
  'ouvrir-compte-banque-israel'
);

-- ---------- Bonnes adresses ----------
update adresses
set image = '/images/' || slug || '.jpg'
where slug in (
  'marche-mahane-yehuda',
  'marche-du-carmel-tel-aviv',
  'sarona-market-tel-aviv',
  'place-independance-netanya',
  'rue-des-rosiers-paris',
  'quartier-de-la-victoire-paris'
);
