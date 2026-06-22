-- ============================================================
--  Mazaly — Contenu de démarrage (réel, vérifiable, intemporel)
--  À coller dans Supabase → SQL Editor → Run
--  Réexécutable sans risque (ON CONFLICT DO NOTHING)
-- ============================================================

-- ---------- Catégorie blog "Vie pratique" ----------
insert into categories (nom, slug, type, couleur)
values ('Vie pratique', 'vie-pratique', 'blog', '#4A6FD4')
on conflict (slug) do nothing;


-- ============================================================
--  ARTICLES DE BLOG — guides pratiques (publiés)
-- ============================================================
insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Faire son Alyah : les grandes étapes',
  'faire-son-alyah-grandes-etapes',
  $ex$Du premier dossier à la Téoudat Olé : le parcours pour s'installer en Israël, expliqué simplement.$ex$,
  $md$
<p>Faire son Alyah, c'est devenir citoyen israélien au titre de la Loi du retour. Le parcours est balisé, mais mieux vaut le préparer en amont. Voici les grandes étapes, à titre indicatif.</p>
<h2>1. Constituer son dossier</h2>
<p>Le dossier d'Alyah se monte généralement avec <strong>l'Agence juive (Sokhnout)</strong>, souvent en lien avec des organismes d'accompagnement. On vous demandera notamment des justificatifs d'identité et des documents prouvant votre judéité (actes d'état civil, attestations de votre communauté).</p>
<h2>2. L'entretien et la validation</h2>
<p>Un entretien permet de valider votre éligibilité. Une fois le dossier approuvé, vous obtenez le feu vert pour organiser votre départ.</p>
<h2>3. L'arrivée et la Téoudat Olé</h2>
<p>À l'arrivée, vous recevez votre statut d'<strong>olé hadash</strong> (nouvel immigrant) et la <em>Téoudat Olé</em>, le certificat qui ouvre l'accès à de nombreux droits.</p>
<h2>4. Les aides à l'intégration</h2>
<ul>
<li><strong>Sal Klita</strong> : un "panier d'intégration", une aide financière versée les premiers mois.</li>
<li><strong>Oulpan</strong> : des cours d'hébreu subventionnés (voir notre guide dédié).</li>
<li>Avantages fiscaux et douaniers pour les nouveaux immigrants.</li>
</ul>
<blockquote>Les démarches et les montants évoluent régulièrement. Vérifiez toujours les informations à jour auprès des organismes officiels (Agence juive / Sokhnout, Ministère de l'Alyah et de l'Intégration / Misrad HaKlita).</blockquote>
$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique'),
  now()
),
(
  'Comprendre la Kupat Holim : le système de santé israélien',
  'comprendre-kupat-holim-sante-israel',
  $ex$Quatre caisses, une couverture pour tous : comment fonctionne l'assurance santé en Israël.$ex$,
  $md$
<p>Israël dispose d'un système de santé public et universel, instauré par la <strong>Loi d'assurance maladie nationale de 1995</strong>. Toute personne résidente est couverte.</p>
<h2>Les quatre caisses (Kupot Holim)</h2>
<p>Chacun choisit librement sa caisse d'assurance maladie parmi quatre organismes :</p>
<ul>
<li><strong>Clalit</strong> — la plus grande, avec son propre réseau d'hôpitaux et cliniques.</li>
<li><strong>Maccabi</strong> — très implantée, populaire dans les zones urbaines.</li>
<li><strong>Meuhedet</strong></li>
<li><strong>Leumit</strong></li>
</ul>
<h2>Comment ça marche ?</h2>
<p>Une cotisation santé est prélevée via le <strong>Bituach Leumi</strong> (Institut national d'assurance). En échange, vous accédez au "panier de soins" : médecin de famille, spécialistes, médicaments, hospitalisation, etc.</p>
<h2>Les assurances complémentaires</h2>
<p>Chaque caisse propose des complémentaires (bituach mashlim) pour une meilleure couverture : soins dentaires, médecines alternatives, opérations à l'étranger, etc.</p>
<blockquote>Pensez à vous affilier à une caisse dès votre arrivée. Les nouveaux immigrants bénéficient souvent d'une période de droits particulière — renseignez-vous auprès de votre caisse et du Bituach Leumi.</blockquote>
$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique'),
  now() - interval '1 day'
),
(
  'Apprendre l''hébreu : le système des Oulpanim',
  'apprendre-hebreu-systeme-oulpanim',
  $ex$L'Oulpan, le passage quasi obligé pour s'intégrer : niveaux, déroulé et bons réflexes.$ex$,
  $md$
<p>L'<strong>Oulpan</strong> est une école de langue intensive conçue pour enseigner l'hébreu aux nouveaux arrivants. C'est l'un des piliers de l'intégration en Israël.</p>
<h2>Les niveaux</h2>
<p>Les cours sont organisés par niveaux, du débutant à l'avancé :</p>
<ul>
<li><strong>Oulpan Aleph</strong> — niveau débutant, les fondations de la langue.</li>
<li><strong>Bet, Guimel…</strong> — niveaux intermédiaires et avancés.</li>
</ul>
<h2>Pour les nouveaux immigrants</h2>
<p>Les olim hadashim bénéficient généralement de cours <strong>subventionnés</strong> dans le cadre de leur intégration. Il existe des formules en présentiel, du soir, intensives, et de plus en plus d'options en ligne.</p>
<h2>Nos conseils</h2>
<ul>
<li>Commencez le plus tôt possible, même quelques bases avant l'arrivée.</li>
<li>Pratiquez au quotidien : commerces, voisins, applications.</li>
<li>Ne visez pas la perfection : l'objectif est de communiquer.</li>
</ul>
<blockquote>L'offre et les conditions d'éligibilité varient. Renseignez-vous auprès du Ministère de l'Alyah et de l'Intégration et des Oulpanim de votre ville.</blockquote>
$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique'),
  now() - interval '2 days'
),
(
  'Ouvrir un compte en banque en Israël',
  'ouvrir-compte-banque-israel',
  $ex$Banques, documents, frais : l'essentiel pour ouvrir votre compte bancaire en Israël.$ex$,
  $md$
<p>Ouvrir un compte bancaire est l'une des premières démarches à effectuer en arrivant en Israël. Voici les repères de base.</p>
<h2>Les grandes banques</h2>
<ul>
<li><strong>Bank Hapoalim</strong></li>
<li><strong>Bank Leumi</strong></li>
<li><strong>Israel Discount Bank</strong></li>
<li><strong>Mizrahi-Tefahot</strong></li>
</ul>
<h2>Les documents généralement demandés</h2>
<ul>
<li>Passeport et/ou carte d'identité israélienne (Téoudat Zéhout).</li>
<li>Téoudat Olé pour les nouveaux immigrants.</li>
<li>Un justificatif de domicile.</li>
</ul>
<h2>Bon à savoir</h2>
<p>Les banques israéliennes facturent des <strong>frais de tenue de compte</strong> et de nombreuses opérations. Comparez les offres et n'hésitez pas à négocier, surtout en tant que nouvel immigrant : des conditions avantageuses existent souvent la première période.</p>
<blockquote>Les conditions et tarifs diffèrent d'une banque et d'une agence à l'autre. Demandez toujours la grille de frais à jour avant d'ouvrir votre compte.</blockquote>
$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique'),
  now() - interval '3 days'
)
on conflict (slug) do nothing;


-- ============================================================
--  BONNES ADRESSES — lieux réels et vérifiables
--  (téléphone / site / horaires / adresse exacte à compléter)
-- ============================================================
insert into adresses (nom, slug, description, categorie_id, ville, region, pays, statut, featured)
values
(
  'Marché Mahané Yehuda',
  'marche-mahane-yehuda',
  $d$Le célèbre marché couvert de Jérusalem (le "shuk"). Épices, produits frais, restaurants et bars : un incontournable, animé de jour comme de nuit.$d$,
  (select id from categories where slug = 'commerces'),
  'Jérusalem', 'District de Jérusalem', 'Israël', 'published', true
),
(
  'Marché du Carmel (Shuk HaCarmel)',
  'marche-du-carmel-tel-aviv',
  $d$Le plus grand marché à ciel ouvert de Tel Aviv. Fruits, légumes, street food et bonnes affaires, au cœur de la ville.$d$,
  (select id from categories where slug = 'commerces'),
  'Tel Aviv', 'District de Tel Aviv', 'Israël', 'published', true
),
(
  'Sarona Market',
  'sarona-market-tel-aviv',
  $d$Halle gastronomique couverte à Tel Aviv, installée dans le quartier historique de Sarona. Étals de produits du monde, restaurants et épiceries fines.$d$,
  (select id from categories where slug = 'restaurants'),
  'Tel Aviv', 'District de Tel Aviv', 'Israël', 'published', false
),
(
  'Place de l''Indépendance (Kikar HaAtsmaout)',
  'place-independance-netanya',
  $d$La grande place centrale de Netanya, face à la mer. Cafés, restaurants et lieu de rendez-vous emblématique de la communauté francophone.$d$,
  (select id from categories where slug = 'commerces'),
  'Netanya', 'District Centre', 'Israël', 'published', false
),
(
  'Rue des Rosiers — Le Marais',
  'rue-des-rosiers-paris',
  $d$Au cœur du Marais (Paris 4e), le quartier juif historique : boutiques, traiteurs et institutions de la street food. Une adresse chargée d'histoire.$d$,
  (select id from categories where slug = 'commerces'),
  'Paris', 'Île-de-France', 'France', 'published', false
),
(
  'Quartier de la Victoire',
  'quartier-de-la-victoire-paris',
  $d$Autour de la Grande Synagogue de la Victoire (Paris 9e), un quartier vivant de la vie communautaire parisienne : commerces, services et lieux de culte.$d$,
  (select id from categories where slug = 'services'),
  'Paris', 'Île-de-France', 'France', 'published', false
)
on conflict (slug) do nothing;
