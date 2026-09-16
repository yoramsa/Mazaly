-- ============================================================
--  Mazaly — 2 news (septembre 2026)
--  1. Décès de Yehuda Widawski, doyen des survivants de la Shoah
--     Sources : Times of Israel, Jerusalem Post, JNS, Israel National
--     News, Jewish News, Jewish Chronicle, TVP World.
--  2. Le documentaire « NAZA » et la polémique israélienne
--     Sources : Wikipedia, Al Jazeera, Deadline, JTA, Jerusalem Post,
--     Euronews, Democracy Now.
--  Relançable sans doublon.
-- ============================================================

insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Yehuda Widawski, doyen des survivants de la Shoah en Israël, s''est éteint à 107 ans',
  'deces-yehuda-widawski-107-ans',
  $ex$Rescapé du ghetto de Łódź et d'Auschwitz, il a consacré des décennies à relever les tombes juives profanées en Pologne. Il s'est éteint à la veille de Roch Hachana.$ex$,
  $md$<p>Il avait traversé le pire siècle de l'histoire juive et choisi d'en réparer les pierres. <strong>Yehuda Aharon Widawski</strong>, doyen des survivants de la Shoah vivant en Israël, s'est éteint vendredi à l'âge de <strong>107 ans</strong>, à la veille de Roch Hachana.</p>

<h2>De Turek au ghetto de Łódź</h2>
<p>Né en 1919 à <strong>Turek</strong>, en Pologne, il grandit à Łódź où sa famille s'installe. En 1940, les nazis y créent un ghetto : les Widawski y sont enfermés, comme des dizaines de milliers d'autres familles juives.</p>
<p>En <strong>août 1944</strong>, lors de la liquidation du ghetto, la famille est déportée à <strong>Auschwitz</strong>. Ses parents, Abraham et Leah, ainsi que son frère aîné Gabriel, y sont assassinés. Huit jours après son arrivée, Yehuda et son jeune frère Jehoszua sont transférés à Friedland, camp de travail forcé rattaché au complexe de Gross-Rosen.</p>
<p>De toute la famille, trois personnes survivront : lui, son frère cadet et un oncle.</p>

<h2>Réparer ce qui pouvait l'être</h2>
<p>Après la guerre, il épouse Lea Dobrysz et monte une fabrique textile en Pologne, avant de rejoindre Israël en <strong>1950</strong>. L'histoire aurait pu s'arrêter là. Mais en <strong>1978</strong>, il retourne en Pologne — et entreprend ce qui deviendra l'œuvre de sa vie.</p>
<p>Pendant des décennies, il localise et restaure les cimetières et les tombes juives détruits ou laissés à l'abandon. Avec son ami Yosef Buchman, il s'attelle notamment au grand cimetière juif de Łódź, où des milliers de pierres tombales sont relevées — celles de rabbins illustres comme celle de sa propre grand-mère.</p>
<p>Au total, il aura contribué à identifier <strong>plus de 3 000 sépultures</strong>. Autant de noms rendus à la mémoire, dans un pays où l'effacement avait été méthodique.</p>

<h2>Une vie en forme de réponse</h2>
<p>Sa disparition, à la veille du Nouvel An juif, referme l'un des derniers témoignages directs de cette génération. Elle laisse une trajectoire d'une cohérence rare : un homme qui a vu sa famille anéantie et qui a passé le reste de son existence à empêcher que d'autres soient oubliés.</p>
<p>Que son souvenir soit une bénédiction.</p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'societe'),
  now()
),
(
  '« NAZA » : le documentaire primé à Venise qui déchire Israël',
  'documentaire-naza-venise-polemique',
  $ex$Ovation de 25 minutes et Prix spécial du jury pour un film de réalisateurs israéliens sur la guerre à Gaza. Le gouvernement dénonce, l'armée envisage des poursuites. Décryptage.$ex$,
  $md$<p>Une ovation de vingt-cinq minutes, un prix majeur — et une tempête politique en Israël. Le documentaire <strong>« NAZA »</strong>, présenté le 10 septembre en compétition officielle à la <strong>83<sup>e</sup> Mostra de Venise</strong>, y a reçu le <strong>Prix spécial du jury</strong>. Depuis, il ne quitte plus le débat public israélien.</p>

<h2>Ce qu'est le film</h2>
<p>Ce documentaire britannique de 80 minutes est signé par deux réalisateurs israéliens, <strong>Yuval Abraham et Rachel Szor</strong>, déjà oscarisés en 2025 pour <em>No Other Land</em>.</p>
<p>Fruit d'une enquête de près de trois ans, il repose sur <strong>24 entretiens</strong> avec des sources issues du renseignement et de l'armée israéliens, filmées de nuit sur des toits de Tel Aviv, visages et voix numériquement modifiés pour préserver leur anonymat.</p>
<p>Le titre est un acronyme militaire hébreu — <strong>נזק אגבי</strong> (<em>nezek agavi</em>, « dommage collatéral ») — qui désigne, dans le jargon opérationnel, le nombre de civils dont la mort est anticipée lors d'une frappe.</p>

<h2>Ce que le film affirme</h2>
<p>Selon les témoignages recueillis, le renseignement israélien aurait eu recours à des <strong>systèmes d'intelligence artificielle</strong> pour désigner des cibles humaines à Gaza. Les lanceurs d'alerte y décrivent des procédures de ciblage dans lesquelles les pertes civiles auraient été anticipées et acceptées.</p>
<p>Ces affirmations reposent sur des témoignages anonymes et n'ont pas été corroborées de manière indépendante.</p>

<h2>La réponse israélienne</h2>
<p>Elle a été immédiate et coordonnée. <strong>Tsahal dément</strong> les accusations. Le chef d'état-major <strong>Eyal Zamir</strong> a qualifié le film de diffamatoire, évoquant de « graves et fausses accusations contre les soldats et les commandants de Tsahal », et n'exclut pas des poursuites judiciaires contre les réalisateurs.</p>
<p>Le Premier ministre <strong>Benyamin Netanyahou</strong> a jugé « choquant » l'accueil réservé au film à Venise, y voyant une manifestation de l'incitation antisémite mondiale : « Nous combattons l'incitation antisémite dans le monde entier, mais lorsqu'elle vient de chez nous, c'est intolérable. »</p>
<p>Le ministre de la Culture <strong>Miki Zohar</strong> est allé plus loin, accusant les réalisateurs de trahison et demandant au ministère de l'Intérieur et à l'Autorité de la population d'examiner la possibilité de leur <strong>retirer la nationalité israélienne</strong>. Le ministère des Affaires étrangères a de son côté transmis des éléments de langage à ses diplomates en poste à l'étranger.</p>

<h2>Un débat qui dépasse le film</h2>
<p>La classe politique israélienne s'est divisée sur la réponse à apporter. Pour les uns, il s'agit d'un film à charge instrumentalisé à l'étranger et diffusé en pleine guerre. Pour les autres, la demande de déchéance de nationalité visant des journalistes et cinéastes pose une question de liberté d'expression — un argument largement repris dans la presse internationale.</p>
<p>Le film n'a à ce jour pas de distributeur en Israël.</p>

<p><em>Cet article rapporte les termes d'un débat en cours. Les affirmations du documentaire comme les réponses officielles y sont présentées telles qu'elles ont été formulées publiquement, sans prise de position de la rédaction.</em></p>$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now() - interval '6 hours'
)
on conflict (slug) do nothing;

-- Mivzak : hommage (sobre, non urgent)
insert into mivzakim (texte, lien, urgent, actif)
select
  'Yehuda Widawski, doyen des survivants de la Shoah en Israël, s''est éteint à 107 ans. Il avait consacré sa vie à relever les tombes juives de Pologne.',
  '/news/deces-yehuda-widawski-107-ans',
  false,
  true
where not exists (
  select 1 from mivzakim
  where lien = '/news/deces-yehuda-widawski-107-ans'
);
