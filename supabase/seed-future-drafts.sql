-- ============================================================
--  Mazaly — 5 futurs sujets en BROUILLON (non publiés)
--  Couverture déjà rattachée + plan à compléter.
--  À lancer dans Supabase → SQL Editor. Réexécutable.
--  Ils n'apparaissent PAS sur le site tant que statut='draft'.
--  Pour publier : /admin → l'article → compléter → statut "Publié".
-- ============================================================

insert into articles (titre, slug, extrait, contenu, image_cover, statut, featured, auteur_id, categorie_id)
values
(
  'Le permis de conduire en Israël',
  'permis-de-conduire-israel',
  $ex$Échange du permis étranger, examens, délais : ce qu'il faut savoir pour conduire en Israël. (Brouillon)$ex$,
  $md$<p><em>Brouillon à compléter.</em></p><h2>Échanger un permis étranger</h2><p>À rédiger…</p><h2>Les démarches et examens</h2><p>À rédiger…</p><h2>Bon à savoir</h2><p>À rédiger…</p>$md$,
  '/images/permis-de-conduire-israel.jpg',
  'draft', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique')
),
(
  'Scolariser ses enfants en Israël',
  'scolariser-ses-enfants-israel',
  $ex$Système scolaire, réseaux, francophonie : comment inscrire et accompagner ses enfants. (Brouillon)$ex$,
  $md$<p><em>Brouillon à compléter.</em></p><h2>Le système scolaire israélien</h2><p>À rédiger…</p><h2>Les écoles et réseaux</h2><p>À rédiger…</p><h2>L'accompagnement des enfants francophones</h2><p>À rédiger…</p>$md$,
  '/images/scolariser-ses-enfants-israel.jpg',
  'draft', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique')
),
(
  'Les impôts en Israël : premiers repères',
  'impots-en-israel',
  $ex$Impôt sur le revenu, statut de nouvel immigrant, conventions fiscales : les bases. (Brouillon)$ex$,
  $md$<p><em>Brouillon à compléter.</em></p><h2>Les grands principes</h2><p>À rédiger…</p><h2>Les avantages pour les nouveaux immigrants</h2><p>À rédiger…</p><h2>Éviter la double imposition</h2><p>À rédiger…</p>$md$,
  '/images/impots-en-israel.jpg',
  'draft', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique')
),
(
  'Se loger en Israël : louer ou acheter',
  'se-loger-en-israel',
  $ex$Marché locatif, achat, contrats : repères pour se loger sereinement en Israël. (Brouillon)$ex$,
  $md$<p><em>Brouillon à compléter.</em></p><h2>Louer un logement</h2><p>À rédiger…</p><h2>Acheter : les étapes</h2><p>À rédiger…</p><h2>Conseils et pièges à éviter</h2><p>À rédiger…</p>$md$,
  '/images/se-loger-en-israel.jpg',
  'draft', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique')
),
(
  'Se déplacer en Israël',
  'transports-en-israel',
  $ex$Train, bus, Rav-Kav, taxis : tout pour bien circuler en Israël. (Brouillon)$ex$,
  $md$<p><em>Brouillon à compléter.</em></p><h2>Les transports en commun</h2><p>À rédiger…</p><h2>La carte Rav-Kav</h2><p>À rédiger…</p><h2>Taxis et applications</h2><p>À rédiger…</p>$md$,
  '/images/transports-en-israel.jpg',
  'draft', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique')
)
on conflict (slug) do nothing;
