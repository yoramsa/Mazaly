-- ============================================================
--  Mazaly — News : nouveaux seuils d'aquisition des radars
--  Chiffres : infographie officielle de la campagne sécurité routière.
--  Contexte vérifié : Ynet, N12/Mako (plan d'application 2026).
--  À exécuter dans Supabase (SQL Editor). Relançable sans doublon.
-- ============================================================

insert into articles (titre, slug, extrait, contenu, image_cover, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Radars : la tolérance fortement réduite sur les routes israéliennes',
  'nouveaux-seuils-radars-israel',
  $ex$Le seuil de déclenchement des radars fixes passe de +11 à +6 km/h en ville. Ce qui change concrètement pour votre conduite, expliqué chiffre par chiffre.$ex$,
  $md$<p>Vous rouliez jusqu'ici avec une marge confortable au passage des radars ? Elle vient de fondre. L'agence de la circulation de la police israélienne a <strong>abaissé les seuils de déclenchement des radars fixes</strong>, avec un objectif affiché : concentrer les contrôles sur les excès qui mettent réellement des vies en danger.</p>
<p>Concrètement, la « marge de tolérance » — cet écart au-dessus de la vitesse autorisée en dessous duquel aucun avis de contravention n'était émis — est réduite de moitié sur certains axes. Voici le détail.</p>

<figure>
<img src="/images/body-nouveaux-seuils-radars-israel.jpg" alt="Infographie officielle : les nouveaux seuils d'aquisition des radars en Israël" />
<figcaption>L'infographie officielle de la campagne de sécurité routière. Traduction et explications ci-dessous.</figcaption>
</figure>

<h2>Les nouveaux seuils, type de route par type de route</h2>

<div class="table-wrap">
<table>
<thead>
<tr>
<th>Type de route</th>
<th>Vitesse autorisée</th>
<th>Ancien seuil</th>
<th>Nouveau seuil</th>
</tr>
</thead>
<tbody>
<tr>
<td>Urbaine (en ville)</td>
<td>jusqu'à 50 km/h</td>
<td>+11 km/h</td>
<td><strong>+6 km/h</strong></td>
</tr>
<tr>
<td>Interurbaine</td>
<td>50 à 80 km/h</td>
<td>+11 km/h</td>
<td><strong>+7 km/h</strong></td>
</tr>
<tr>
<td>Route rapide</td>
<td>90 à 110 km/h</td>
<td>+12 km/h</td>
<td><strong>+9 km/h</strong></td>
</tr>
<tr>
<td>Voie express (limitée à 120)</td>
<td>120 km/h</td>
<td>+13 km/h</td>
<td><strong>+10 km/h</strong></td>
</tr>
</tbody>
</table>
</div>

<p>Traduit en situations du quotidien : sur un boulevard urbain limité à 50 km/h, le radar se déclenchait auparavant à partir de 61 km/h — il flashe désormais dès <strong>56 km/h</strong>. Sur la route 6, limitée à 120, le déclenchement passe de 133 à <strong>130 km/h</strong>.</p>

<h2>Au-delà de 30 km/h : rien ne change, et c'est très lourd</h2>
<p>Un point reste identique, et il mérite d'être rappelé : un dépassement de <strong>plus de 30 km/h</strong> au-dessus de la vitesse autorisée entraîne une verbalisation immédiate, une <strong>suspension administrative du permis</strong> et de lourdes sanctions. Aucune tolérance n'a jamais existé à ce niveau, et aucune n'est introduite.</p>

<h2>Pourquoi cette décision</h2>
<p>La police met en avant quatre arguments : créer une dissuasion réelle, cibler les cas qui mettent des vies en danger, protéger les piétons et les cyclistes, et faire baisser le nombre d'accidents et de victimes. La vitesse excessive reste l'un des principaux facteurs d'accidents mortels en Israël.</p>
<p>Cette mesure s'inscrit dans un plan d'application routière beaucoup plus large pour 2026 : environ <strong>200 véhicules de patrouille supplémentaires</strong>, des dizaines de radars nouvelle génération — dont des dispositifs de <em>contrôle de vitesse moyenne</em>, qui mesurent votre vitesse sur tout un tronçon et non en un point unique — et une hausse des sanctions pour plusieurs infractions jugées particulièrement dangereuses. L'objectif fixé : réduire la mortalité routière de 25 % en cinq ans et de 50 % en dix ans.</p>
<p>Le durcissement ne fait pas l'unanimité : certains y voient d'abord une machine à contraventions. La police, elle, assume une logique de dissuasion.</p>

<h2>Ce qu'il faut retenir au volant</h2>
<p>La marge n'existe plus vraiment. Le réflexe le plus simple reste le meilleur : caler sa vitesse sur la limite affichée plutôt que sur une tolérance supposée — d'autant que les nouveaux radars à vitesse moyenne rendent inutile le freinage de dernière seconde devant la cabine.</p>
<p>Bouclez votre ceinture, restez attentifs, respectez les limitations. Et rentrez bien.</p>$md$,
  '/images/nouveaux-seuils-radars-israel.jpg',
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now()
)
on conflict (slug) do nothing;

-- Mivzak lié (flash info)
insert into mivzakim (texte, lien, urgent, actif)
select
  'Radars : la tolérance passe de +11 à +6 km/h en ville, et de +13 à +10 km/h sur voie express.',
  '/news/nouveaux-seuils-radars-israel',
  true,
  true
where not exists (
  select 1 from mivzakim
  where lien = '/news/nouveaux-seuils-radars-israel'
);
