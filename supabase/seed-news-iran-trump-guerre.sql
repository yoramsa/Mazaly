-- ============================================================
--  Mazaly — News : Iran, Trump annonce une guerre « pratiquement terminée »
--  Point sur l'actualité Iran/États-Unis/Israël.
--  ⚠️ Situation évolutive : à actualiser selon les développements
--     (pourparlers au Qatar, position israélienne).
-- ============================================================

insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Iran : Trump annonce une guerre « pratiquement terminée »',
  'iran-trump-guerre-pratiquement-terminee',
  $ex$Donald Trump affirme que la guerre contre l'Iran est, sur le plan militaire, « effectivement terminée » et qu'un accord a de bonnes chances d'aboutir. Pendant ce temps, Téhéran dément tout pourparlers au Qatar et la presse israélienne évoque des pressions quotidiennes de Netanyahou.$ex$,
  $md$<p>Donald Trump a déclaré que la guerre contre l'Iran était, sur le plan militaire, « <strong>effectivement terminée</strong> ». Le président américain estime qu'il y a « de bonnes chances » de parvenir à un accord et dit ne pas prévoir de nouvelle offensive pour le moment. Mais sur le terrain diplomatique, la situation reste confuse et tendue.</p>

<h2>Trump : « plus de chance » qu'un accord se concrétise</h2>
<p>Dans ses dernières déclarations, le président américain a de nouveau affiché son optimisme : selon lui, le volet militaire du conflit est derrière nous, et les prochaines semaines devraient se jouer sur le terrain des négociations plutôt que sur celui des frappes. Il n'a toutefois pas fermé la porte à une reprise des opérations si les discussions échouaient.</p>

<h2>Qatar : des pourparlers que Téhéran dément</h2>
<p>Selon la presse israélienne, le Qatar doit accueillir des discussions entre le vice-président américain <strong>JD Vance</strong> et un responsable iranien, identifié comme <strong>Rezaei</strong>. Cette information a été relayée en citant le chef du renseignement turc comme source.</p>
<p>Téhéran dément cependant catégoriquement l'existence de ces pourparlers. Le principal responsable iranien de la sécurité accuse Washington d'inventer des « <em>négociations imaginaires</em> », rejetant l'idée que des négociateurs iraniens doivent rencontrer des responsables américains au Qatar.</p>

<h2>Netanyahou sous pression, selon des informations israéliennes</h2>
<p>Toujours selon la presse israélienne, Benyamin Netanyahou <strong>appellerait</strong> Trump tous les jours pour le pousser à reprendre la guerre. Cette information n'est à ce stade pas confirmée officiellement de part et d'autre : elle est rapportée au conditionnel par les médias israéliens, et Mazaly la relaie avec la même prudence.</p>

<p>Entre l'optimisme affiché par Washington, le démenti ferme de Téhéran et les pressions rapportées de Jérusalem, le dossier iranien reste à haut risque. À suivre de près. 👀</p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now()
)
on conflict (slug) do nothing;

-- Flash info lié
insert into mivzakim (texte, lien, urgent, actif)
select
  'Trump affirme que la guerre contre l''Iran est « effectivement terminée » militairement. Téhéran dément tout pourparlers au Qatar.',
  '/news/iran-trump-guerre-pratiquement-terminee',
  true,
  true
where not exists (
  select 1 from mivzakim
  where lien = '/news/iran-trump-guerre-pratiquement-terminee'
);
