-- ============================================================
--  Mazaly — News : plan israélien de préparation hivernale à Gaza
--  Source : déclaration du bureau du Premier ministre (COGAT/Matpash)
--  sur le compte X, relayée notamment par Tsvi Yechezkeli.
-- ============================================================

insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Hiver à Gaza : Israël détaille son plan d''aide (91 000 tentes, 8 200 camions)',
  'gaza-plan-hiver-israel-aide-humanitaire',
  $ex$Dans une déclaration publiée sur X, le bureau du Premier ministre dévoile le plan israélien de préparation hivernale pour Gaza : tentes, camions de matériel, infrastructures d'eau et d'égouts. Netanyahou accuse par ailleurs le Hamas de « mensonges » et de « manœuvres dilatoires » sur le désarmement.$ex$,
  $md$<p>Le bureau du Premier ministre israélien a publié une longue déclaration en anglais sur son compte X, détaillant le plan israélien de préparation à l'hiver dans la bande de Gaza.</p>

<h2>Un plan coordonné avec l'ONU et le « Conseil de la paix »</h2>
<p>Selon cette déclaration, Israël a fait avancer, via le <strong>COGAT</strong> (Coordinateur des activités gouvernementales dans les territoires, « Matpash »), un plan de préparation hivernale mené en coordination avec le <strong>« Conseil de la paix »</strong>, l'<strong>ONU</strong>, des organisations internationales et des pays donateurs.</p>

<h2>Ce que contient le plan</h2>
<ul>
<li>Plus de <strong>91 000 tentes</strong>.</li>
<li>Plus de <strong>8 200 camions</strong> chargés de bâches de protection, couvertures, vêtements d'hiver et équipements annexes.</li>
<li><strong>12 camions de pompage</strong> (vidange) pour le pompage et l'évacuation des eaux usées.</li>
<li>La réparation des infrastructures d'eau et d'égouts, et la fourniture de carburant pour faire fonctionner les installations de pompage.</li>
</ul>
<p>Le communiqué précise qu'Israël <strong>continuera à soutenir</strong> la préparation hivernale dans la bande de Gaza.</p>

<h2>Netanyahou accuse le Hamas, réaffirme l'engagement envers le plan Trump</h2>
<p>Dans cette même déclaration, le Premier ministre accuse le <strong>Hamas</strong> de mensonges et de manœuvres dilatoires pour échapper au désarmement. Il insiste cependant sur le fait que « l'État d'Israël agit en étroite coopération avec les États-Unis et avec le Conseil de la paix », ajoutant qu'« Israël est engagé envers la réussite du plan en 20 points du président Trump ».</p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now()
)
on conflict (slug) do nothing;
