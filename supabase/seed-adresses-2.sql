-- ============================================================
--  Mazaly — 8 bonnes adresses supplémentaires (Israël + France)
--  Lieux et quartiers repères, vérifiables publiquement.
--  Pas de téléphone ni d'horaires : à compléter depuis /admin
--  au cas par cas, pour éviter toute information périmée.
--  Relançable sans doublon.
-- ============================================================

insert into adresses (nom, slug, description, categorie_id, ville, region, pays, statut, featured)
values
(
  'Marché aux puces de Jaffa (Shuk HaPishpishim)',
  'marche-aux-puces-jaffa',
  $d$Le marché aux puces de la vieille ville de Jaffa : brocante, antiquités, artisanat et créateurs, au milieu de terrasses et de bars. L'un des quartiers les plus vivants de Tel Aviv, surtout en fin de journée.$d$,
  (select id from categories where slug = 'commerces'),
  'Tel Aviv-Jaffa', 'District de Tel Aviv', 'Israël', 'published', true
),
(
  'Neve Tzedek',
  'neve-tzedek-tel-aviv',
  $d$Le premier quartier juif bâti hors des murs de Jaffa, devenu l'un des plus charmants de Tel Aviv. Ruelles piétonnes, maisons basses, boutiques de créateurs et cafés — idéal pour une promenade de fin d'après-midi.$d$,
  (select id from categories where slug = 'commerces'),
  'Tel Aviv-Jaffa', 'District de Tel Aviv', 'Israël', 'published', false
),
(
  'Le port de Tel Aviv (Namal)',
  'port-de-tel-aviv',
  $d$L'ancien port de Tel Aviv reconverti en promenade en bois face à la mer. Restaurants, terrasses, marché couvert et espaces de jeux : une valeur sûre en famille, du matin jusque tard le soir.$d$,
  (select id from categories where slug = 'restaurants'),
  'Tel Aviv-Jaffa', 'District de Tel Aviv', 'Israël', 'published', false
),
(
  'Les jardins bahá''ís',
  'jardins-bahais-haifa',
  $d$Les terrasses monumentales qui dévalent le mont Carmel jusqu'à la baie de Haïfa, inscrites au patrimoine mondial de l'UNESCO. La vue depuis le belvédère de Louis Promenade est l'une des plus belles du pays.$d$,
  (select id from categories where slug = 'services'),
  'Haïfa', 'District de Haïfa', 'Israël', 'published', true
),
(
  'Le front de mer d''Ashdod',
  'front-de-mer-ashdod',
  $d$Longues plages de sable, promenade aménagée et parcs en bord de mer, dans une ville qui compte l'une des plus fortes communautés francophones d'Israël. Cafés et commerces français à proximité immédiate.$d$,
  (select id from categories where slug = 'commerces'),
  'Ashdod', 'District Sud', 'Israël', 'published', false
),
(
  'La vieille ville de Jérusalem',
  'vieille-ville-jerusalem',
  $d$Les quatre quartiers intra-muros, le Mur occidental et les souks couverts. Le cœur historique de Jérusalem, à parcourir à pied : prévoyez de bonnes chaussures et de l'eau.$d$,
  (select id from categories where slug = 'services'),
  'Jérusalem', 'District de Jérusalem', 'Israël', 'published', true
),
(
  'Sarcelles — quartier des Flanades',
  'sarcelles-flanades',
  $d$Surnommée « la petite Jérusalem », Sarcelles concentre une vie communautaire dense : commerces cachère, traiteurs, librairies et institutions. Un repère pour la communauté du Val-d'Oise.$d$,
  (select id from categories where slug = 'commerces'),
  'Sarcelles', 'Île-de-France', 'France', 'published', false
),
(
  'Rue Saint-Suffren et le quartier juif de Marseille',
  'quartier-juif-marseille',
  $d$Autour du 8e arrondissement et de la Grande Synagogue de Marseille, un quartier vivant de la communauté du sud : commerces, restaurants et lieux de culte, à deux pas des plages.$d$,
  (select id from categories where slug = 'commerces'),
  'Marseille', 'Provence-Alpes-Côte d''Azur', 'France', 'published', false
)
on conflict (slug) do nothing;
