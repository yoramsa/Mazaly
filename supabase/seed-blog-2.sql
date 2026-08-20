-- ============================================================
--  Mazaly — 3 guides pratiques (blog)
--  Contenu évergreen, volontairement sans montants chiffrés
--  (barèmes et tarifs évoluent) : les lecteurs sont renvoyés
--  vers les sources officielles.
--  Relançable sans doublon.
-- ============================================================

insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Le Bituah Leumi : comprendre la sécurité sociale israélienne',
  'comprendre-bituah-leumi',
  $ex$Cotisations, allocations familiales, congé maternité, chômage : le rôle central de l'Institut national d'assurance, expliqué simplement.$ex$,
  $md$<p>Derrière ce nom qui revient dans toutes les conversations d'olim se cache l'équivalent israélien de la Sécurité sociale et des caisses d'allocations : le <strong>Bituah Leumi</strong> (ביטוח לאומי), l'Institut national d'assurance. Comprendre son fonctionnement fait partie des premiers réflexes à acquérir en arrivant.</p>

<h2>À quoi ça sert</h2>
<p>Le Bituah Leumi couvre un champ très large. Les prestations les plus courantes :</p>
<ul>
<li><strong>Allocations familiales</strong> (<em>kitsbat yeladim</em>), versées automatiquement pour chaque enfant</li>
<li><strong>Congé maternité</strong> et prime de naissance</li>
<li><strong>Indemnités chômage</strong>, sous conditions d'ancienneté de cotisation</li>
<li><strong>Pension d'invalidité</strong> et prestations en cas d'accident du travail</li>
<li><strong>Pension de vieillesse</strong></li>
<li>La collecte de la <strong>cotisation santé</strong>, qui finance votre Kupat Holim</li>
</ul>

<h2>S'inscrire : la première démarche</h2>
<p>En tant qu'olé, votre inscription se fait généralement dans la foulée de l'arrivée, en lien avec l'obtention de la Téoudat Olé et le choix de votre caisse de santé. Cette inscription conditionne l'accès aux soins : sans affiliation, pas de couverture.</p>
<p>Un point à connaître : un <strong>délai de carence</strong> s'applique à certaines prestations pour les nouveaux arrivants, avec des règles particulières pour les olim. Renseignez-vous sur votre situation précise dès l'arrivée plutôt qu'au moment où vous en aurez besoin.</p>

<h2>Qui cotise, et comment</h2>
<p>Si vous êtes <strong>salarié</strong>, les cotisations sont prélevées directement sur votre fiche de paie : vous n'avez rien à faire. Si vous êtes <strong>indépendant</strong> (<em>atsmaï</em>), c'est à vous de vous déclarer et de payer vos cotisations — une obligation que certains découvrent trop tard, avec des régularisations à la clé.</p>
<p>Les personnes sans activité doivent également s'acquitter d'une cotisation minimale pour maintenir leurs droits. Un statut mal déclaré est l'une des sources de problèmes les plus fréquentes chez les nouveaux arrivants.</p>

<h2>Nos conseils</h2>
<p>Ouvrez un <strong>compte personnel en ligne</strong> sur le site du Bituah Leumi : la plupart des démarches et attestations y sont accessibles, et vous y suivez l'état de vos cotisations.</p>
<p>Signalez systématiquement tout <strong>changement de situation</strong> — mariage, naissance, déménagement, perte d'emploi, passage en indépendant. Beaucoup de droits ne sont pas automatiques et se perdent faute d'avoir été demandés à temps.</p>
<p>Enfin, les barèmes et conditions évoluent régulièrement : vérifiez toujours l'information sur le site officiel de l'Institut, qui propose un service d'information par téléphone, ou faites-vous accompagner par une association d'aide aux olim.</p>$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique'),
  now() - interval '2 hours'
),
(
  'Trouver un emploi en Israël quand on est francophone',
  'trouver-emploi-israel-francophone',
  $ex$Reconnaissance des diplômes, CV à l'israélienne, réseau et niveau d'hébreu : les leviers concrets pour décrocher un poste.$ex$,
  $md$<p>C'est souvent la plus grande source d'inquiétude avant le départ, et le principal facteur de réussite après l'arrivée. Voici les repères qui comptent vraiment pour trouver un emploi en Israël quand on vient de France, de Belgique ou de Suisse.</p>

<h2>1. Vérifiez si votre métier est réglementé</h2>
<p>C'est la toute première question à traiter, idéalement <strong>avant</strong> de partir. Médecins, infirmiers, avocats, psychologues, architectes, professions comptables : ces métiers exigent une <strong>reconnaissance de diplôme</strong> et parfois un examen ou un stage complémentaire en Israël.</p>
<p>Les délais peuvent se compter en mois. Constituer le dossier depuis la France — traductions assermentées, relevés de notes, attestations d'expérience — vous fera gagner un temps considérable.</p>

<h2>2. Refaites votre CV à l'israélienne</h2>
<p>Le CV israélien est court, factuel et orienté résultats. Quelques différences avec les habitudes françaises :</p>
<ul>
<li>Pas de photo, pas d'âge, pas de situation familiale</li>
<li>Une à deux pages maximum</li>
<li>Les réalisations concrètes priment sur les intitulés de poste</li>
<li>Version en hébreu <em>et</em> en anglais — l'anglais suffit dans de nombreux secteurs</li>
</ul>

<h2>3. Le réseau prime sur les annonces</h2>
<p>En Israël, une large part des recrutements passe par la recommandation. Cultivez votre réseau sans complexe : groupes professionnels francophones, associations d'olim, anciens de votre oulpan, LinkedIn. Un message direct à un responsable d'équipe est ici parfaitement admis — la culture professionnelle est bien plus directe qu'en France.</p>

<h2>4. L'hébreu : nécessaire, mais pas toujours bloquant</h2>
<p>Soyons honnêtes : l'hébreu élargit considérablement le champ des possibles, en particulier dans la fonction publique, la santé, l'enseignement et le commerce de proximité.</p>
<p>Mais plusieurs secteurs recrutent en français ou en anglais dès le premier jour : la <strong>high-tech</strong>, le service client international, le tourisme, l'import-export, les centres d'appels francophones, les cabinets travaillant avec la clientèle française. Beaucoup d'olim y démarrent, apprennent la langue en parallèle, puis évoluent.</p>

<h2>5. Les dispositifs d'accompagnement</h2>
<p>Ne restez pas seul. Le ministère de l'Alyah et de l'Intégration, les municipalités des villes à forte population francophone et plusieurs associations proposent ateliers CV, coaching, formations professionnelles et parfois des aides à la reconversion. Ces services sont souvent gratuits — et largement sous-utilisés.</p>

<h2>Et le statut d'indépendant ?</h2>
<p>Ouvrir un statut d'<em>atsmaï</em> est relativement simple en Israël et séduit beaucoup de francophones, notamment ceux qui conservent des clients en France. Attention toutefois aux obligations qui en découlent : TVA, cotisations Bituah Leumi, comptabilité. Un rendez-vous avec un expert-comptable dès le départ évite bien des mauvaises surprises.</p>$md$,
  'published', true,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique'),
  now() - interval '1 day 3 hours'
),
(
  'Téléphone, internet et vie numérique : s''équiper à l''arrivée',
  'telephone-internet-israel',
  $ex$Carte SIM, box internet, applications indispensables et paiement sans contact : le kit numérique du nouvel arrivant.$ex$,
  $md$<p>Entre l'ouverture d'un compte bancaire et l'inscription à la Kupat Holim, on oublie souvent que la vie quotidienne en Israël est <strong>massivement numérique</strong>. Prendre rendez-vous, payer, se déplacer, recevoir une convocation : presque tout passe par le téléphone. Voici de quoi être opérationnel rapidement.</p>

<h2>Une ligne mobile, dès les premiers jours</h2>
<p>Le marché israélien de la téléphonie est très concurrentiel, et les forfaits y sont nettement moins chers qu'en France. Plusieurs opérateurs se partagent le marché, avec des offres mobiles généreuses en données.</p>
<p>Deux conseils : privilégiez au départ un <strong>forfait sans engagement</strong>, le temps de vérifier la couverture là où vous vivez ; et faites vérifier que votre téléphone est bien <strong>désimlocké</strong> avant de quitter la France.</p>
<p>Un numéro israélien n'est pas un confort, c'est une nécessité : il conditionne l'accès aux services administratifs, aux applications bancaires et à la vérification par SMS de la plupart des sites.</p>

<h2>Internet à la maison : deux factures, pas une</h2>
<p>C'est la particularité qui surprend le plus les nouveaux arrivants. En Israël, la connexion domestique se compose généralement de <strong>deux contrats distincts</strong> : l'infrastructure (la ligne, fibre ou cuivre) d'un côté, et le fournisseur d'accès de l'autre. Vous recevrez donc deux factures.</p>
<p>Vérifiez la disponibilité de la fibre à votre adresse avant de signer : la couverture progresse vite mais reste inégale selon les immeubles et les quartiers.</p>

<h2>Les applications à installer tout de suite</h2>
<ul>
<li><strong>Waze</strong> — né en Israël, il est ici le standard absolu pour se déplacer</li>
<li><strong>Moovit</strong> — transports en commun, horaires et itinéraires</li>
<li>L'application de votre <strong>Kupat Holim</strong> — rendez-vous, ordonnances et résultats d'analyses</li>
<li>Celle de votre <strong>banque</strong>, ainsi qu'une application de paiement entre particuliers, très largement utilisée pour rembourser un ami ou régler un artisan</li>
<li><strong>WhatsApp</strong> — bien plus qu'une messagerie : commerces, écoles, associations et syndics de copropriété communiquent presque exclusivement par groupes</li>
</ul>

<h2>Payer au quotidien</h2>
<p>La carte bancaire et le sans contact sont acceptés à peu près partout, y compris pour de très petits montants. Le paiement en plusieurs fois (<em>tashloumim</em>) est une pratique courante et proposée spontanément en caisse pour les achats importants — une habitude locale déroutante au début, mais bien pratique.</p>

<h2>Le réflexe qui change tout</h2>
<p>Créez sans attendre un compte sur le portail des services publics israéliens et activez l'identification numérique. De plus en plus de démarches — impôts, Bituah Leumi, état civil — se règlent en ligne, sans file d'attente. C'est quelques minutes de configuration pour des heures économisées ensuite.</p>$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'vie-pratique'),
  now() - interval '2 days'
)
on conflict (slug) do nothing;
