-- ============================================================
--  Mazaly — News : Ben Gourion, où en est-on après la grève sauvage
--  Faits vérifiés : Times of Israel, Jerusalem Post, JNS/EJP,
--  Israel Hayom, The Traveler, Ynet.
--  ⚠️ Info datée (dimanche 23 août 2026) : à actualiser ou dépublier
--     quand la situation sera revenue à la normale.
-- ============================================================

insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Ben Gourion : où en est-on après la grève sauvage de jeudi ?',
  'ben-gourion-apres-greve-sauvage',
  $ex$L'aéroport tourne de nouveau, mais les séquelles persistent : bagages en retard, horaires modifiés, files rallongées. Le point et nos conseils avant de partir.$ex$,
  $md$<p>Si vous prenez l'avion cette semaine, lisez ceci avant de boucler votre valise. Trois jours après l'arrêt de travail qui a paralysé Ben Gourion, l'aéroport fonctionne — mais il traîne encore les conséquences du plus gros épisode de perturbations de l'été.</p>

<h2>Ce qui s'est passé jeudi</h2>
<p>Jeudi 20 août, en début d'après-midi, une <strong>grève sauvage</strong> — c'est-à-dire un arrêt de travail spontané, non déclenché par le syndicat et de ce fait illégal — a bloqué l'aéroport le <strong>jour le plus chargé de l'année</strong>, avec environ 100 000 voyageurs attendus.</p>
<p>Les arrivées ont été quasiment stoppées, les files d'enregistrement et de sécurité se sont figées, et <strong>au moins un avion a fait demi-tour en plein vol</strong>. Le mouvement a duré environ deux heures : les employés ont repris le travail en milieu d'après-midi.</p>
<p>Cette nuance de vocabulaire explique la confusion des premières heures : le syndicat a démenti avoir ordonné quoi que ce soit, ce qui est exact — une grève sauvage part précisément de la base, sans consigne syndicale.</p>

<h2>Vendredi : l'aéroport le plus perturbé au monde</h2>
<p>L'effet domino a été spectaculaire. Vendredi matin, près de 24 heures après la fin du mouvement, Ben Gourion était l'<strong>aéroport le plus perturbé au monde</strong> pour les départs, avec des retards moyens de 70 à 90 minutes. En fin de journée, il occupait encore la première place toutes catégories confondues.</p>
<p>Le plus pénible pour les voyageurs restait les bagages : des attentes d'<strong>une heure et demie à trois heures</strong> à la livraison, et des valises encore empilées dans le terminal samedi.</p>

<h2>Pourquoi ça coince, au fond</h2>
<p>La grève a servi de détonateur, pas de cause unique. Deux problèmes de fond se cumulent :</p>
<ul>
<li><strong>Le manque d'effectifs.</strong> Le président du comité des travailleurs de l'Autorité aéroportuaire alertait depuis des semaines sur un déficit d'environ <strong>400 postes</strong> et une préparation insuffisante à la saison haute.</li>
<li><strong>Les places de stationnement.</strong> Une trentaine d'avions ravitailleurs militaires américains occupent des positions de stationnement à Ben Gourion. Les appareils militaires étant prioritaires pour l'assistance au sol et le contrôle aérien, les vols commerciaux passent après.</li>
</ul>
<p>Le résultat se lit dans les statistiques du mois : sur l'ensemble d'août, à peine <strong>28 % des vols</strong> sont arrivés à l'heure, avec un retard moyen de près de 78 minutes.</p>

<h2>Vous partez cette semaine : nos conseils</h2>
<ul>
<li><strong>Arrivez plus tôt que d'habitude.</strong> Comptez large, surtout aux heures de pointe du matin et du soir.</li>
<li><strong>Suivez votre vol jusqu'au dernier moment</strong> — les changements d'horaire et de porte tombent tard.</li>
<li><strong>Voyagez en cabine si vous le pouvez.</strong> C'est aujourd'hui le meilleur moyen d'éviter le point noir du système.</li>
<li><strong>En soute ?</strong> Glissez l'essentiel — médicaments, chargeurs, une tenue — dans votre bagage à main.</li>
<li><strong>Prévoyez de la marge</strong> sur vos correspondances et sur les rendez-vous prévus le jour de votre arrivée.</li>
</ul>
<p>Bon vol — et un peu de patience : la saison se termine dans quelques jours.</p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now()
)
on conflict (slug) do nothing;

-- Le flash de jeudi n'est plus d'actualité : on le désactive
update mivzakim set actif = false
where texte like 'Ben Gourion : enregistrement interrompu%';

-- Nouveau flash, pointant vers l'article
insert into mivzakim (texte, lien, urgent, actif)
select
  'Ben Gourion : l''aéroport tourne mais les retards et les bagages en souffrance persistent après la grève de jeudi. Nos conseils avant de partir.',
  '/news/ben-gourion-apres-greve-sauvage',
  true,
  true
where not exists (
  select 1 from mivzakim
  where lien = '/news/ben-gourion-apres-greve-sauvage'
);
