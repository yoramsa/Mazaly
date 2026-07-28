-- ============================================================
--  Mazaly — News : le petit Yuval retrouvé sain et sauf
--  Faits vérifiés (24-25 juillet 2026) : Ynet, i24NEWS, JPost,
--  Times of Israel, Israel Hayom, Israel National News.
--  À exécuter dans Supabase (SQL Editor). Relançable sans doublon.
-- ============================================================

insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Le « miracle d''Ashkelon » : le petit Yuval, 4 ans, retrouvé sain et sauf après 24 heures de recherches',
  'miracle-petit-yuval-retrouve-ashkelon',
  $ex$Disparu jeudi lors d'un pique-nique sur la plage nord d'Ashkelon, Yuval Kogan, 4 ans, a été retrouvé vivant vendredi dans les dunes de Nitzanim, au terme d'une mobilisation nationale exceptionnelle.$ex$,
  $md$<p>Israël a retenu son souffle pendant près de vingt-quatre heures. Yuval Kogan, un petit garçon de 4 ans disparu jeudi en début d'après-midi sur le littoral nord d'Ashkelon, a été retrouvé vendredi après-midi <strong>sain et sauf</strong>, assis sous un arbre dans les dunes proches de la plage de Nitzanim. Un dénouement que beaucoup, des sauveteurs aux anonymes qui ont suivi les recherches heure par heure, ont qualifié de miracle.</p>

<h2>Une disparition en plein pique-nique</h2>
<p>Jeudi, vers 12h30, Yuval pique-nique sur la plage avec son père et ses deux grandes sœurs. En quelques instants, l'enfant s'éloigne vers une zone de végétation dense qui borde le rivage et disparaît du champ de vision de sa famille. Son père le cherche aussitôt, puis alerte les secours : en moins d'un quart d'heure, l'opération de recherche est lancée.</p>

<h2>Une mobilisation nationale exceptionnelle</h2>
<p>Très vite, les moyens engagés prennent une ampleur rare : des centaines de policiers et de garde-frontières, des pisteurs, des équipes cynophiles, un appui aérien par hélicoptère, des unités maritimes et des plongeurs qui ratissent le rivage. Le commissaire de la police israélienne, Daniel Levy, ordonne même le déploiement des cadets de l'école de police en renfort, tandis que le Shin Bet apporte son concours à l'enquête.</p>
<p>À leurs côtés, des <strong>milliers de bénévoles</strong> venus de tout le pays convergent vers Ashkelon et les dunes de Nitzanim pour prêter main-forte, malgré la chaleur écrasante de juillet. Toute la nuit, les recherches se poursuivent sans interruption.</p>

<h2>Le mauvais chemin qui mène au bon endroit</h2>
<p>Vendredi après-midi, le dénouement arrive de la façon la plus inattendue. Un bénévole raconte s'être <em>trompé de route</em> en se dirigeant vers la plage de Nitzanim. C'est là, au détour de ce mauvais virage, qu'il aperçoit un petit garçon sous un arbre, au milieu des dunes : Yuval, éveillé, à environ deux kilomètres du lieu de sa disparition.</p>
<blockquote>« Une glace t'attend à la maison. Maman t'attend. » — Dina, la mère de Yuval, à son fils par appel vidéo, quelques minutes après qu'il a été retrouvé.</blockquote>

<h2>« Un grand miracle »</h2>
<p>Examiné par les secours, l'enfant est déclaré en état stable, sans blessure. La police, qui n'a jamais privilégié la piste de l'enlèvement, salue l'issue heureuse d'une opération hors norme. Un responsable des équipes de recherche résume le sentiment général : compte tenu de l'âge de l'enfant, de la chaleur et du terrain, ces retrouvailles relèvent d'« un grand miracle ».</p>
<p>Les images des retrouvailles entre Yuval, sa famille et les sauveteurs ont ému tout le pays. Au-delà du soulagement, cette histoire restera comme un formidable élan de solidarité : celui d'un pays entier qui, l'espace d'une journée, n'a eu qu'une seule priorité — retrouver un petit garçon de 4 ans.</p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'societe'),
  now()
)
on conflict (slug) do nothing;

-- Mivzak lié (flash info)
insert into mivzakim (texte, lien, urgent, actif)
select
  'Le petit Yuval, 4 ans, retrouvé sain et sauf près d''Ashkelon après 24 heures de recherches — tout le pays soulagé.',
  '/news/miracle-petit-yuval-retrouve-ashkelon',
  false,
  true
where not exists (
  select 1 from mivzakim
  where lien = '/news/miracle-petit-yuval-retrouve-ashkelon'
);
