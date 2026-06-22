-- Ajout du champ "pays" aux bonnes adresses (France / Israël)
-- À lancer une seule fois dans Supabase → SQL Editor

alter table adresses
  add column if not exists pays text default 'Israël';

-- Renseigne un pays par défaut pour les adresses déjà créées
update adresses set pays = 'Israël' where pays is null;
