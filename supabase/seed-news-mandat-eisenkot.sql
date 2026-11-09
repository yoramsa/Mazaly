-- ============================================================
--  Mazaly — Actualité du jour
--  Isaac Herzog confie le mandat de former le gouvernement
--  à Gadi Eisenkot (Yashar!)
--  Sources : i24NEWS, Times of Israel, The Jerusalem Post, CNN,
--  Al Jazeera, NPR, The Washington Post, PBS NewsHour,
--  Israel Hayom, RTBF.
--  Relançable sans doublon (upsert sur le slug).
-- ============================================================

insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Le président Herzog confie à Gadi Eisenkot le mandat de former le prochain gouvernement',
  'herzog-mandat-gadi-eisenkot-gouvernement',
  $ex$Désigné avec 67 soutiens contre 46 pour Nétanyahou, l'ancien chef d'état-major devra composer avec l'appui décisif des partis arabes, ses propres conditions pour gouverner, et un casse-tête institutionnel autour de la présidence de la Knesset.$ex$,
  $md$<p>Le président <strong>Isaac Herzog</strong> a officiellement confié, dimanche, à <strong>Gadi Eisenkot</strong>, chef du parti centriste <strong>Yashar!</strong> et ancien chef d'état-major de Tsahal, le premier mandat pour former le prochain gouvernement d'Israël. Une décision qui écarte, au moins dans un premier temps, le Premier ministre sortant <strong>Benyamin Nétanyahou</strong>, et qui ouvre une période de tractations aussi décisive qu'incertaine.</p>

<h2>Un scrutin qui a fragilisé Nétanyahou</h2>
<p>Au terme des élections législatives de novembre 2026, aucun bloc ne dispose d'une majorité automatique à la <strong>Knesset</strong>. Le parti de Gadi Eisenkot, Yashar!, s'impose comme la force pivot de l'opposition, tandis que la coalition sortante de Benyamin Nétanyahou voit son socle s'éroder, plusieurs formations s'en étant distancées pendant la campagne.</p>

<h2>67 recommandations contre 46 : un vote qui tranche</h2>
<p>Conformément à la tradition constitutionnelle israélienne, le président Herzog a consulté l'ensemble des partis représentés à la Knesset avant de désigner le candidat chargé de former le gouvernement. Au terme de ces consultations, <strong>67 députés</strong> ont recommandé Gadi Eisenkot — parmi lesquels ses partenaires sionistes du bloc d'opposition ainsi que les partis arabes —, contre <strong>46 pour Benyamin Nétanyahou</strong>. Selon Yashar!, il s'agit du total de recommandations le plus élevé obtenu par un candidat depuis 2015.</p>
<p>Ce chiffre ne garantit toutefois pas une majorité gouvernementale : le seul bloc sioniste d'Eisenkot ne compte que <strong>48 sièges</strong>, loin des 61 nécessaires pour gouverner.</p>

<h2>Le rôle décisif des partis arabes</h2>
<p>C'est l'appui des formations arabes qui a fait basculer le rapport de force. Le chef du parti <strong>Raam</strong>, <strong>Mansour Abbas</strong>, a publiquement affirmé vouloir « tendre la main » pour soutenir les efforts d'Eisenkot. Plusieurs analystes évoquent désormais la perspective d'un <strong>gouvernement minoritaire</strong>, toléré par l'abstention des députés arabes à la Knesset plutôt que par un accord de coalition formel — une formule qui éviterait à Eisenkot de voir son bloc d'opposition sioniste se fracturer.</p>

<h2>Les conditions d'Eisenkot pour gouverner</h2>
<p>Pour bâtir sa coalition, Gadi Eisenkot a posé plusieurs principes qu'il présente comme la porte d'entrée de tout futur gouvernement d'« urgence nationale » : la reconnaissance d'Israël comme <strong>État juif et démocratique</strong>, fidèle aux valeurs de la Déclaration d'indépendance, l'instauration d'une <strong>conscription universelle</strong> au service militaire ou national, et la qualification du <strong>Hamas</strong> comme organisation terroriste. « La porte du gouvernement que nous mettrons en place est ouverte à tout élu qui accepte ces principes », a-t-il déclaré, présentant son projet comme une rupture avec ce qu'il a qualifié de « gouvernement du 7-Octobre ».</p>
<p>Ces conditions, destinées à rassurer l'opinion sioniste sur la nature de la future coalition, compliquent en retour tout accord formel avec les partis arabes, eux-mêmes réticents à en endosser certains termes.</p>

<h2>Nétanyahou riposte</h2>
<p>Resté Premier ministre par intérim jusqu'à l'investiture d'un nouveau gouvernement, Benyamin Nétanyahou n'a pas tardé à répliquer. Il a relancé sa campagne contre Eisenkot, notamment à l'aide d'une <strong>vidéo générée par intelligence artificielle</strong>, et averti qu'un gouvernement adossé, même indirectement, au soutien des partis arabes conduirait selon lui à « l'effondrement d'Israël ». Il a par ailleurs appelé à la formation d'un <strong>gouvernement d'union nationale</strong> — une option qu'Eisenkot a exclue à plusieurs reprises, affirmant, selon la chaîne Kan, qu'il ne rejoindrait « même pas si Trump le lui demandait » un gouvernement dirigé par Nétanyahou.</p>

<h2>Le casse-tête de la présidence de la Knesset</h2>
<p>Un point de friction symbolique illustre la difficulté de toute négociation : l'entourage d'Eisenkot souhaite remplacer <strong>Amir Ohana</strong> à la présidence de la Knesset, poste clé pour le contrôle de l'agenda parlementaire, tandis que les proches de Nétanyahou en font une condition préalable à toute discussion sur une union nationale.</p>

<h2>Un calendrier serré</h2>
<p>Gadi Eisenkot dispose désormais de <strong>28 jours</strong> pour former une coalition viable, un délai que le président Herzog peut prolonger de <strong>14 jours</strong> supplémentaires — soit un maximum de six semaines. S'il échoue, le mandat pourrait revenir à Benyamin Nétanyahou, voire déboucher sur de nouvelles élections.</p>

<p><em>Cet article sera mis à jour au fil des négociations de coalition.</em></p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now()
)
on conflict (slug) do update set
  titre = excluded.titre,
  extrait = excluded.extrait,
  contenu = excluded.contenu,
  statut = excluded.statut,
  featured = excluded.featured,
  categorie_id = excluded.categorie_id;

-- Mivzak : annonce du mandat (mise à jour si déjà présent, sinon création)
update mivzakim
set texte = 'Le président Herzog confie à Gadi Eisenkot (Yashar!) le mandat de former le prochain gouvernement : 67 recommandations contre 46 pour Nétanyahou.',
    urgent = true,
    actif = true
where lien = '/news/herzog-mandat-gadi-eisenkot-gouvernement';

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
