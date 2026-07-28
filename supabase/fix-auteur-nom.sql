-- ============================================================
--  Mazaly — Remplace les adresses email affichées comme nom d'auteur
--  Supabase renseigne profiles.nom avec l'email quand le compte
--  n'a pas de nom : on met une signature lisible à la place.
--  Relançable sans risque.
-- ============================================================

update profiles
set nom = 'Rédaction Mazaly'
where nom like '%@%';
