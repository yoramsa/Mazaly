-- ============================================================
--  Mazaly — Actualité du jour
--  Isaac Herzog confie le mandat de former le gouvernement
--  à Gadi Eisenkot (Yashar!)
--  Relançable sans doublon.
-- ============================================================

insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Le président Herzog confie à Gadi Eisenkot le mandat de former le prochain gouvernement',
  'herzog-mandat-gadi-eisenkot-gouvernement',
  $ex$Le chef du parti Yashar! a recueilli 67 recommandations de députés, contre 46 pour Benyamin Nétanyahou. Un épisode inédit qui ouvre une période d'incertitude politique en Israël.$ex$,
  $md$<p>Le président <strong>Isaac Herzog</strong> a officiellement confié à <strong>Gadi Eisenkot</strong>, leader du parti d'opposition <strong>Yashar!</strong>, le premier mandat pour former le prochain gouvernement israélien.</p>

<h2>Un rapport de force net à la Knesset</h2>
<p>La décision présidentielle s'appuie sur le décompte des recommandations transmises par les groupes parlementaires. <strong>Gadi Eisenkot</strong> a recueilli le soutien de <strong>67 députés</strong>, parmi lesquels ses partenaires sionistes de l'opposition ainsi que les partis arabes. Le Premier ministre sortant, <strong>Benyamin Nétanyahou</strong>, n'a quant à lui obtenu que <strong>46 recommandations</strong>.</p>
<p>C'est ce différentiel, inscrit dans la tradition constitutionnelle israélienne, qui a conduit le président Herzog à désigner Eisenkot plutôt que le chef de gouvernement en exercice.</p>

<h2>Qui est Gadi Eisenkot</h2>
<p>Ancien <strong>chef d'état-major de Tsahal</strong>, Gadi Eisenkot s'est imposé ces dernières années comme l'une des figures montantes de l'opposition israélienne à la tête du parti <strong>Yashar!</strong>. Sa désignation marque une étape significative dans la recomposition du paysage politique du pays.</p>

<h2>Et maintenant ?</h2>
<p>Le mandat confié par le président lui laisse un délai constitutionnel pour tenter de réunir une coalition majoritaire à la Knesset. L'issue de ces tractations déterminera si Israël se dote d'un nouveau gouvernement dans les semaines à venir, ou si le pays se dirige vers une nouvelle échéance électorale.</p>
<p><em>Cet article sera mis à jour au fil de l'évolution des négociations de coalition.</em></p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now()
)
on conflict (slug) do nothing;

-- Mivzak : annonce du mandat
insert into mivzakim (texte, lien, urgent, actif)
select
  'Le président Herzog confie à Gadi Eisenkot (Yashar!) le mandat de former le prochain gouvernement : 67 recommandations contre 46 pour Nétanyahou.',
  '/news/herzog-mandat-gadi-eisenkot-gouvernement',
  true,
  true
where not exists (
  select 1 from mivzakim
  where lien = '/news/herzog-mandat-gadi-eisenkot-gouvernement'
);
