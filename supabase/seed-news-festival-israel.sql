-- ============================================================
--  Mazaly — News : les 65 ans du Festival d'Israël
--  Faits vérifiés (août 2026) : Times of Israel, Ynet, JNS, Euronews.
--  À exécuter dans Supabase (SQL Editor). Relançable sans doublon.
-- ============================================================

insert into articles (titre, slug, extrait, contenu, statut, featured, auteur_id, categorie_id, published_at)
values
(
  'Des funambules au-dessus de Jérusalem : le Festival d''Israël fête ses 65 ans',
  'festival-israel-65-ans-funambules-jerusalem',
  $ex$Quarante ans après la traversée légendaire du Français Philippe Petit, quatre funambules ont réenjambé la vallée de Hinnom. Le festival se poursuit jusqu'au 20 août.$ex$,
  $md$<p>Il fallait lever les yeux. Le 28 juillet, quatre funambules ont traversé le ciel de Jérusalem, suspendus à des câbles tendus au-dessus de la <strong>vallée de Hinnom</strong>, très exactement sur la ligne de couture entre l'est et l'ouest de la ville. En contrebas, l'orchestre Est-Ouest de Jérusalem accompagnait leurs pas. Le spectacle, intitulé <em>« Held By a String »</em> (« Tenu par un fil »), ouvrait la 65<sup>e</sup> édition du Festival d'Israël.</p>

<h2>Un clin d'œil à Philippe Petit</h2>
<p>Le geste n'avait rien d'anodin pour le public francophone. En 1987, ce même festival avait invité le funambule français <strong>Philippe Petit</strong> — celui-là même qui, treize ans plus tôt, avait marché entre les tours du World Trade Center — à traverser la vallée de Hinnom sur un fil tendu entre le quartier arabe et le quartier juif. Au milieu de sa traversée, il avait lâché une colombe blanche, en signe de paix.</p>
<p>Quarante ans plus tard, l'hommage était limpide. Parmi les artistes de cette nouvelle traversée figurait le funambule israélien <strong>Yonatan Tabachnik</strong>, en équilibre au-dessus de l'un des paysages les plus chargés d'histoire du pays.</p>

<h2>Un festival qui va à la rencontre du pays</h2>
<p>Pour ses 65 ans, le Festival d'Israël ne s'est pas contenté de Jérusalem. La programmation se déploie aussi dans le <strong>Néguev occidental</strong> et dans le <strong>nord du pays</strong> — deux régions parmi les plus éprouvées ces dernières années. Une façon d'amener le spectacle vivant là où il fait le plus de bien.</p>
<p>Parmi les moments les plus attendus : le concert de <strong>Sagui Dekel-Chen</strong>, ancien otage, qui interprète les neuf chansons qu'il a écrites et composées durant sa captivité.</p>

<h2>Il vous reste quelques jours</h2>
<p>Bonne nouvelle : le festival se poursuit <strong>jusqu'au 20 août</strong>. Théâtre, musique, danse et cirque sont au programme, avec de nombreux spectacles visuels ou musicaux qui se passent très bien de l'hébreu — de quoi passer une belle soirée en famille, quel que soit votre niveau de langue.</p>$md$,
  'published', false,
  (select id from profiles where role = 'admin' limit 1),
  (select id from categories where slug = 'societe'),
  now()
)
on conflict (slug) do nothing;

-- Mivzak lié (flash info)
insert into mivzakim (texte, lien, urgent, actif)
select
  'Culture : le Festival d''Israël fête ses 65 ans — spectacles à Jérusalem, dans le Néguev et dans le nord jusqu''au 20 août.',
  '/news/festival-israel-65-ans-funambules-jerusalem',
  false,
  true
where not exists (
  select 1 from mivzakim
  where lien = '/news/festival-israel-65-ans-funambules-jerusalem'
);
