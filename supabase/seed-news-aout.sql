-- ============================================================
--  Mazaly — 3 news (août 2026)
--  Sources : Times of Israël (FR), Ynet, i24NEWS, Israel National News,
--  JNS, Agence juive / ministère de l'Alyah.
--  À exécuter dans Supabase (SQL Editor). Relançable sans doublon.
-- ============================================================

insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'L''alyah de France s''accélère : près de 2 400 arrivées depuis janvier',
  'alyah-france-2026-chiffres',
  $ex$La France confirme sa place de deuxième pays d'origine de l'alyah. Les chiffres, et ce que cette vague change concrètement sur le terrain.$ex$,
  $md$<p>Le mouvement se confirme, chiffres à l'appui. Depuis le 1<sup>er</sup> janvier 2026, <strong>près de 2 400 Français</strong> se sont installés en Israël dans le cadre de l'alyah — soit une progression d'environ <strong>30 %</strong> par rapport à la même période de l'année précédente, selon les données du ministère de l'Alyah et de l'Intégration et de l'Agence juive.</p>

<h2>Un mouvement de fond, pas un accident</h2>
<p>Cette accélération s'inscrit dans une tendance installée. En 2025, la France avait déjà enregistré environ <strong>3 300 nouveaux olim</strong>, une hausse de près de 45 % sur un an, qui l'avait hissée au rang de <strong>deuxième pays d'origine de l'alyah</strong>, derrière les États-Unis. L'année précédente avait elle-même vu les départs plus que doubler.</p>
<p>L'été, saison traditionnelle des grands départs, concentre une part importante des arrivées : plusieurs milliers de nouveaux immigrants sont attendus sur les mois de juillet et août, toutes origines confondues, dans le cadre des opérations organisées par l'Agence juive, le ministère de l'Alyah et leurs partenaires.</p>

<h2>Ce que cela change sur le terrain</h2>
<p>Pour les villes à forte présence francophone — Netanya, Ashdod, Jérusalem, Tel Aviv, Raanana — cette vague se traduit très concrètement : tension sur le marché locatif, listes d'attente dans les oulpanim, et une demande croissante de services en français, de la santé aux démarches administratives.</p>
<p>Côté institutions, plusieurs mesures ont été mises en avant pour faciliter l'intégration : programmes destinés aux étudiants, simplification de la reconnaissance des diplômes et licences professionnelles, et dispositifs liés au logement.</p>

<h2>Vous arrivez cet été ?</h2>
<p>Les premières semaines sont souvent les plus denses : Téoudat Olé, ouverture de compte bancaire, inscription à une Kupat Holim, choix d'un oulpan. Nos guides pratiques détaillent chacune de ces étapes — et la communauté, elle, est déjà sur place pour vous accueillir.</p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'actualites'),
  now()
),
(
  'Fiscalité des olim : l''exonération de 10 ans maintenue, mais la déclaration devient obligatoire',
  'reforme-fiscale-olim-2026',
  $ex$Depuis le 1er janvier 2026, les nouveaux immigrants conservent leur avantage fiscal mais doivent déclarer chaque année leurs revenus de source étrangère. Ce qui change vraiment.$ex$,
  $md$<p>C'est l'un des piliers de l'attractivité de l'alyah, et il a fait couler beaucoup d'encre ces derniers mois. Mise au point : <strong>l'exonération d'impôt de dix ans sur les revenus de source étrangère n'est pas supprimée</strong>. Elle reste en vigueur pour les nouveaux immigrants (<em>olim hadashim</em>) comme pour les résidents de retour au pays.</p>

<h2>Le vrai changement : la transparence</h2>
<p>Ce qui change, depuis le <strong>1<sup>er</sup> janvier 2026</strong>, c'est l'obligation déclarative. Jusque-là, les personnes concernées bénéficiaient non seulement d'une exonération d'impôt, mais aussi d'une <em>dispense de déclaration</em> de leurs revenus et avoirs étrangers pendant dix ans. Cette dispense a disparu.</p>
<p>Autrement dit : vous ne payez toujours pas d'impôt en Israël sur vos revenus de source étrangère pendant dix ans, mais vous devez désormais <strong>les déclarer chaque année</strong> à l'administration fiscale israélienne.</p>

<h2>Pourquoi maintenant</h2>
<p>La réforme ne vient pas de nulle part. Israël était sous la pression de l'OCDE et de l'Union européenne en matière de transparence fiscale, avec la menace d'une inscription sur la liste des pays jugés non coopératifs. La déclaration obligatoire est la réponse apportée : conserver l'avantage fiscal, tout en rendant les flux visibles.</p>

<h2>Ce qu'il faut faire</h2>
<p>Si vous êtes olé ou résident de retour et que vous percevez des revenus depuis l'étranger — loyers, dividendes, pensions, activité indépendante, plus-values — l'obligation vous concerne, même si vous ne devez pas un shekel d'impôt.</p>
<p>Le sujet étant technique et les situations personnelles très variables, l'accompagnement par un expert-comptable ou un avocat fiscaliste familier des dossiers franco-israéliens reste vivement recommandé. Une déclaration omise peut coûter cher, alors que l'exonération, elle, demeure intacte.</p>$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'economie'),
  now() - interval '5 hours'
),
(
  'Israël lance un programme d''alyah dédié aux enseignants',
  'programme-alyah-enseignants',
  $ex$Un dispositif national veut recruter des enseignants juifs à l'étranger et fluidifier leur intégration professionnelle. Premier public visé : l'Amérique du Nord.$ex$,
  $md$<p>Israël manque d'enseignants et va les chercher au-delà de ses frontières. Le pays vient de lancer son <strong>premier programme national d'alyah destiné aux enseignants juifs</strong>, pensé pour lever l'un des obstacles les plus décourageants de l'installation : trouver un poste correspondant à sa qualification.</p>

<h2>Comment ça marche</h2>
<p>Le ministère de l'Éducation doit établir une <strong>cartographie des postes disponibles</strong> par matière, par compétence et par région, afin d'orienter les candidats vers les établissements qui en ont réellement besoin. Une base de données nationale reliera les futurs enseignants aux écoles israéliennes.</p>
<p>Le dispositif prévoit des salons dédiés à l'alyah des enseignants au cours de l'année 2026-2027, où les candidats pourront rencontrer des représentants du système éducatif israélien, <strong>faire examiner leurs diplômes</strong> et explorer les offres. S'y ajoutent des webinaires et des réunions d'information.</p>
<p>Après l'arrivée, l'accompagnement se poursuit : recherche d'emploi, certification, apprentissage de l'hébreu et adaptation professionnelle. Les initiateurs espèrent identifier plusieurs centaines de candidats sur l'année à venir.</p>

<h2>Et pour les francophones ?</h2>
<p>Soyons précis : le programme cible pour l'instant les enseignants des <strong>États-Unis et du Canada</strong>. Rien n'a été annoncé à ce jour pour la France ou la Belgique.</p>
<p>Le signal, lui, mérite d'être relevé. Israël passe d'une logique d'accueil passif à un <strong>recrutement actif par métier</strong>, sur des professions en tension. Pour les enseignants francophones qui envisagent le départ, la reconnaissance des diplômes et le niveau d'hébreu restent les deux points à préparer très en amont — quel que soit le dispositif.</p>$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'societe'),
  now() - interval '1 day'
)
on conflict (slug) do nothing;

-- Mivzakim liés
insert into mivzakim (texte, lien, urgent, actif)
select v.texte, v.lien, v.urgent, v.actif
from (values
  ('Alyah : près de 2 400 Français installés en Israël depuis janvier, soit +30 % sur un an.',
   '/news/alyah-france-2026-chiffres', false, true),
  ('Fiscalité : depuis janvier 2026, les olim doivent déclarer chaque année leurs revenus étrangers — l''exonération de 10 ans, elle, est maintenue.',
   '/news/reforme-fiscale-olim-2026', false, true)
) as v(texte, lien, urgent, actif)
where not exists (select 1 from mivzakim m where m.lien = v.lien);
