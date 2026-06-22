-- ============================================================
--  Mazaly — Système "Mivzak" (מבזק / flash info)
--  À lancer dans Supabase → SQL Editor. Réexécutable.
-- ============================================================

create table if not exists mivzakim (
  id uuid primary key default gen_random_uuid(),
  texte text not null,
  lien text,
  urgent boolean default false,
  actif boolean default true,
  created_at timestamp default now()
);

alter table mivzakim enable row level security;

-- Le public ne voit que les flashes actifs
drop policy if exists mivzakim_select_public on mivzakim;
create policy mivzakim_select_public on mivzakim
  for select using (actif = true);

-- La rédaction (admin/redacteur) gère tout
drop policy if exists mivzakim_staff_all on mivzakim;
create policy mivzakim_staff_all on mivzakim
  for all using (is_staff());
