-- ============================================================
--  Mazaly — Mivzak : perturbations à l'aéroport Ben Gourion
--  Formulation prudente : l'Autorité aéroportuaire parle de
--  perturbations du travail dirigées par le syndicat, tandis que
--  le syndicat dément toute grève et invoque le manque d'effectifs.
--  Sources : Jerusalem Post, Times of Israel, Ynet, N12.
--  ⚠️ Info périssable : désactiver le mivzak une fois la situation
--     revenue à la normale (voir requête en bas de fichier).
-- ============================================================

insert into mivzakim (texte, lien, urgent, actif)
select
  'Ben Gourion : enregistrement interrompu et fortes perturbations en pleine saison. L''Autorité aéroportuaire évoque un arrêt de travail, le syndicat dément toute grève et invoque le manque de personnel. Vérifiez votre vol avant de partir.',
  null,
  true,
  true
where not exists (
  select 1 from mivzakim
  where texte like 'Ben Gourion : enregistrement interrompu%'
);

-- Une fois la situation normalisée, désactiver le flash :
-- update mivzakim set actif = false
-- where texte like 'Ben Gourion : enregistrement interrompu%';
