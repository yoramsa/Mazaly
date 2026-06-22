-- ============================================================
--  Mazaly — Contenu de DÉMONSTRATION (à remplacer)
--  6 news + 10 mivzakim génériques, marqués "exemple".
--  À remplacer / supprimer depuis /admin.
--  Prérequis : seed-content.sql (catégories) et mivzak.sql (table).
-- ============================================================

-- -------------------- 6 NEWS d'exemple --------------------
insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Forum de l''emploi francophone : rendez-vous à Netanya',
  'demo-forum-emploi-francophone-netanya',
  $ex$(Exemple) Un rendez-vous pour rapprocher recruteurs et candidats de la communauté.$ex$,
  $md$<p><em>(Contenu d'exemple — à remplacer depuis l'admin.)</em></p><p>Un forum de l'emploi destiné à la communauté francophone se tiendra prochainement. Entreprises, associations et candidats sont attendus pour une journée d'échanges et de rencontres.</p><p>Ateliers CV, conseils en reconversion et offres dans plusieurs secteurs seront proposés sur place.</p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now()
),
(
  'Une nouvelle association culturelle voit le jour à Jérusalem',
  'demo-nouvelle-association-culturelle-jerusalem',
  $ex$(Exemple) Une initiative pour faire vivre la culture francophone dans la capitale.$ex$,
  $md$<p><em>(Contenu d'exemple — à remplacer depuis l'admin.)</em></p><p>Une nouvelle association culturelle vient d'être créée. Elle proposera des conférences, des soirées et des activités pour petits et grands tout au long de l'année.</p><p>Les bénévoles et adhérents sont invités à rejoindre le projet.</p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'societe'),
  now() - interval '4 hours'
),
(
  'Les commerces francophones se regroupent',
  'demo-commerces-francophones-se-regroupent',
  $ex$(Exemple) Un réseau pour soutenir les commerçants de la communauté.$ex$,
  $md$<p><em>(Contenu d'exemple — à remplacer depuis l'admin.)</em></p><p>Plusieurs commerçants francophones lancent un réseau d'entraide pour mutualiser leurs moyens et gagner en visibilité.</p><p>Une carte des adresses partenaires est en préparation.</p>$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'economie'),
  now() - interval '8 hours'
),
(
  'Rentrée scolaire : ce qui change pour les familles olim',
  'demo-rentree-scolaire-familles-olim',
  $ex$(Exemple) Les repères utiles pour préparer la rentrée des enfants.$ex$,
  $md$<p><em>(Contenu d'exemple — à remplacer depuis l'admin.)</em></p><p>À l'approche de la rentrée, les familles récemment installées s'organisent. Inscriptions, fournitures et accompagnement linguistique sont au programme.</p><p>Des dispositifs d'aide existent pour faciliter l'intégration des élèves.</p>$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now() - interval '1 day'
),
(
  'Un festival du film francophone s''installe à Tel Aviv',
  'demo-festival-film-francophone-tel-aviv',
  $ex$(Exemple) Projections, rencontres et débats autour du cinéma francophone.$ex$,
  $md$<p><em>(Contenu d'exemple — à remplacer depuis l'admin.)</em></p><p>Un festival dédié au cinéma francophone proposera une sélection de films récents, en présence d'invités.</p><p>Le programme complet et la billetterie seront annoncés prochainement.</p>$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'societe'),
  now() - interval '1 day 6 hours'
),
(
  'Nouvelle permanence d''information en français',
  'demo-permanence-information-francais',
  $ex$(Exemple) Un point d'accueil pour répondre aux questions du quotidien.$ex$,
  $md$<p><em>(Contenu d'exemple — à remplacer depuis l'admin.)</em></p><p>Une permanence d'information en français ouvre ses portes pour orienter les nouveaux arrivants : santé, démarches administratives et vie pratique.</p><p>L'accueil se fera sur rendez-vous.</p>$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now() - interval '2 days'
)
on conflict (slug) do nothing;


-- -------------------- 10 MIVZAKIM d'exemple --------------------
-- (Nécessite mivzak.sql. Ne pas relancer plusieurs fois : cela créerait des doublons.)
insert into mivzakim (texte, lien, urgent, actif) values
  ('(Exemple) Météo : grand soleil attendu sur l''ensemble du pays ce week-end.', null, false, true),
  ('(Exemple) Trafic dense signalé sur l''autoroute entre Tel Aviv et Netanya.', null, false, true),
  ('(Exemple) Économie : le shekel reste stable face à l''euro aujourd''hui.', null, false, true),
  ('(Exemple) Culture : ouverture de la billetterie du festival francophone.', '/news', false, true),
  ('(Exemple) Communauté : nouvelle permanence d''aide aux olim à Ashdod.', '/news', false, true),
  ('(Exemple) Éducation : les inscriptions aux oulpanim sont ouvertes.', '/blog', false, true),
  ('(Exemple) URGENT : information de dernière minute à remplacer.', null, true, true),
  ('(Exemple) Transports : une nouvelle ligne de bus dessert Jérusalem.', null, false, true),
  ('(Exemple) Sport : belle victoire de l''équipe locale hier soir.', null, false, true),
  ('(Exemple) URGENT : alerte à remplacer depuis l''admin.', null, true, true);
