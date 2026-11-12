-- ============================================================
--  Mazaly — News : Iran, réunion sécuritaire en vue entre
--  Netanyahou et Eisenkot sur fond de tractations gouvernementales
--  Sources : Times of Israel, Ynet, Jewish Insider, i24NEWS
--  (couverture du 10 au 12 novembre 2026).
--  ⚠️ Situation évolutive : à actualiser selon les développements
--     (issue des pourparlers de coalition, tenue réelle du cabinet).
-- ============================================================

insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Iran : un cabinet de sécurité prévu dimanche, Netanyahou et Eisenkot s''affrontent sur le dossier',
  'iran-netanyahou-eisenkot-cabinet-securite-dimanche',
  $ex$Alors que le président Isaac Herzog a confié à Gadi Eisenkot le mandat de former le prochain gouvernement, les pourparlers d'union avec le Likoud de Netanyahou sont au point mort. Sur fond de craintes d'une reprise des frappes contre l'Iran, un cabinet de sécurité restreint est annoncé pour dimanche, et Eisenkot met en garde Netanyahou contre toute instrumentalisation politique du dossier iranien.$ex$,
  $md$<p>Trois semaines après les élections législatives du 27 octobre, qui ont fait perdre sa majorité à la coalition de Benyamin Netanyahou, la scène politique israélienne reste bloquée. En toile de fond, un dossier brûlant revient s'imposer : celui de l'Iran, et la crainte, dans l'opposition, qu'une reprise des hostilités serve de levier politique.</p>

<h2>Le mandat confié à Eisenkot</h2>
<p>Le président <strong>Isaac Herzog</strong> a chargé <strong>Gadi Eisenkot</strong>, chef du parti Yashar, de former le prochain gouvernement : 67 députés l'ont recommandé à la Knesset, contre 46 pour Netanyahou et 7 abstentions. Eisenkot dispose de 28 jours pour constituer une coalition, un délai que Herzog peut prolonger de 14 jours supplémentaires.</p>

<h2>Des pourparlers d'union interrompus</h2>
<p>Selon Ynet, le Likoud cherchait à négocier un <strong>gouvernement d'union</strong> avec Yashar tout en tentant d'écarter les partis haredim de l'équation d'Eisenkot. Mais les discussions se sont enlisées sur plusieurs points de friction : la création d'une commission d'enquête sur le 7 octobre, la nomination de responsables sécuritaires de haut rang, et un discours de Netanyahou à la Knesset jugé « clivant ». Eisenkot aurait depuis annulé la séance de négociation suivante avec le Likoud.</p>

<h2>L'Iran, chiffre central du bras de fer</h2>
<p>C'est à la Knesset que Netanyahou a lié sa demande d'union nationale à la menace iranienne, déclarant : « <em>Face à ces menaces, nous devons faire une seule chose dans cette maison : mettre de côté toute autre considération et établir un gouvernement d'union nationale</em> ». Dans l'opposition, on redoute qu'une frappe contre l'Iran ne soit utilisée pour décréter un état d'urgence et imposer, par ce biais, un gouvernement d'union que Eisenkot refuse par ailleurs politiquement.</p>
<p>Eisenkot a adressé un courrier à Netanyahou l'appelant à « <em>agir avec responsabilité nationale en cette période sensible</em> ». Le bureau du Premier ministre a rétorqué qu'il s'agissait d'« <strong>une démarche irresponsable et une tentative manifeste de politiser des questions de sécurité</strong> », tout en accusant Eisenkot de chercher à gouverner avec des « soutiens du terrorisme », en référence aux tractations de Yashar avec des partis arabes et haredim.</p>

<h2>Un cabinet de sécurité attendu dimanche</h2>
<p>Dans ce climat de défiance, un <strong>cabinet de sécurité restreint</strong> serait convoqué dimanche, sur fond de craintes, côté opposition, d'une possible reprise des frappes contre l'Iran. Aucune décision officielle n'a pour l'instant été annoncée des deux côtés, et ces informations restent à prendre au conditionnel : Mazaly suivra l'évolution du dossier, entre urgence sécuritaire réelle et bras de fer politique autour de la formation du prochain gouvernement.</p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now()
)
on conflict (slug) do nothing;
