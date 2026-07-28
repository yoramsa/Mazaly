-- ============================================================
--  Mazaly — Signature des articles : « Mazaly Média »
--  Supabase renseignait profiles.nom avec l'email quand le compte
--  n'a pas de nom, et ce champ s'affiche sous le titre des articles.
--  Relançable sans risque.
-- ============================================================

-- 1. Signature de la rédaction à la place de l'email
update profiles
set nom = 'Mazaly Média'
where nom like '%@%';

-- 2. Les futurs comptes ne reprennent plus l'email comme nom
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into profiles (id, nom, role)
  values (new.id, new.raw_user_meta_data->>'nom', 'lecteur');
  return new;
end;
$$;
