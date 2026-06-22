create table if not exists profiles (
  id uuid references auth.users primary key,
  nom text,
  avatar_url text,
  role text default 'lecteur',
  created_at timestamp default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text unique not null,
  type text not null,
  couleur text,
  icone text,
  created_at timestamp default now()
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text unique not null
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  slug text unique not null,
  contenu text,
  extrait text,
  image_cover text,
  auteur_id uuid references profiles(id),
  categorie_id uuid references categories(id),
  statut text default 'draft',
  featured boolean default false,
  vues integer default 0,
  created_at timestamp default now(),
  published_at timestamp
);

create table if not exists articles_tags (
  article_id uuid references articles(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (article_id, tag_id)
);

create table if not exists adresses (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text unique not null,
  description text,
  categorie_id uuid references categories(id),
  adresse text,
  ville text,
  region text,
  telephone text,
  site_web text,
  email text,
  instagram text,
  image text,
  images text[],
  horaires text,
  prix_moyen text,
  statut text default 'draft',
  featured boolean default false,
  created_at timestamp default now()
);

create table if not exists avis (
  id uuid primary key default gen_random_uuid(),
  adresse_id uuid references adresses(id) on delete cascade,
  user_id uuid references profiles(id),
  note integer check (note between 1 and 5),
  commentaire text,
  created_at timestamp default now()
);

create table if not exists marques (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text unique not null,
  description text,
  logo text,
  site_web text,
  categorie_id uuid references categories(id),
  contact text,
  statut text default 'draft',
  featured boolean default false,
  created_at timestamp default now()
);

create table if not exists publicites (
  id uuid primary key default gen_random_uuid(),
  titre text,
  image text not null,
  lien text not null,
  emplacement text not null,
  date_debut date,
  date_fin date,
  actif boolean default true,
  clics integer default 0,
  impressions integer default 0,
  created_at timestamp default now()
);

create table if not exists newsletters (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  nom text,
  actif boolean default true,
  created_at timestamp default now()
);

alter table profiles enable row level security;
alter table categories enable row level security;
alter table tags enable row level security;
alter table articles enable row level security;
alter table articles_tags enable row level security;
alter table adresses enable row level security;
alter table avis enable row level security;
alter table marques enable row level security;
alter table publicites enable row level security;
alter table newsletters enable row level security;

create or replace function is_staff()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'redacteur')
  );
$$;

create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists profiles_select_public on profiles;
create policy profiles_select_public on profiles for select using (true);
drop policy if exists profiles_update_self on profiles;
create policy profiles_update_self on profiles for update using (auth.uid() = id);
drop policy if exists profiles_admin_all on profiles;
create policy profiles_admin_all on profiles for all using (is_admin());

drop policy if exists categories_select_public on categories;
create policy categories_select_public on categories for select using (true);
drop policy if exists categories_staff_write on categories;
create policy categories_staff_write on categories for all using (is_staff());

drop policy if exists tags_select_public on tags;
create policy tags_select_public on tags for select using (true);
drop policy if exists tags_staff_write on tags;
create policy tags_staff_write on tags for all using (is_staff());

drop policy if exists articles_select_published on articles;
create policy articles_select_published on articles for select using (statut = 'published');
drop policy if exists articles_staff_select on articles;
create policy articles_staff_select on articles for select using (is_staff());
drop policy if exists articles_staff_write on articles;
create policy articles_staff_write on articles for all using (is_staff());

drop policy if exists articles_tags_select_public on articles_tags;
create policy articles_tags_select_public on articles_tags for select using (true);
drop policy if exists articles_tags_staff_write on articles_tags;
create policy articles_tags_staff_write on articles_tags for all using (is_staff());

drop policy if exists adresses_select_published on adresses;
create policy adresses_select_published on adresses for select using (statut = 'published');
drop policy if exists adresses_staff_select on adresses;
create policy adresses_staff_select on adresses for select using (is_staff());
drop policy if exists adresses_staff_write on adresses;
create policy adresses_staff_write on adresses for all using (is_staff());

drop policy if exists avis_select_public on avis;
create policy avis_select_public on avis for select using (true);
drop policy if exists avis_insert_auth on avis;
create policy avis_insert_auth on avis for insert with check (auth.uid() = user_id);
drop policy if exists avis_delete_self on avis;
create policy avis_delete_self on avis for delete using (auth.uid() = user_id or is_staff());

drop policy if exists marques_select_published on marques;
create policy marques_select_published on marques for select using (statut = 'published');
drop policy if exists marques_staff_select on marques;
create policy marques_staff_select on marques for select using (is_staff());
drop policy if exists marques_staff_write on marques;
create policy marques_staff_write on marques for all using (is_staff());

drop policy if exists publicites_select_active on publicites;
create policy publicites_select_active on publicites for select using (actif = true);
drop policy if exists publicites_staff_all on publicites;
create policy publicites_staff_all on publicites for all using (is_staff());

drop policy if exists newsletters_insert_public on newsletters;
create policy newsletters_insert_public on newsletters for insert with check (true);
drop policy if exists newsletters_staff_select on newsletters;
create policy newsletters_staff_select on newsletters for select using (is_staff());
drop policy if exists newsletters_staff_write on newsletters;
create policy newsletters_staff_write on newsletters for all using (is_staff());

create or replace function increment_vues(article_slug text)
returns void
language sql
security definer
as $$
  update articles set vues = vues + 1 where slug = article_slug and statut = 'published';
$$;

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into profiles (id, nom, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'nom', new.email), 'lecteur');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

insert into categories (nom, slug, type, couleur) values
  ('Actualités', 'actualites', 'news', '#4A6FD4'),
  ('Société', 'societe', 'news', '#1B2B6B'),
  ('Économie', 'economie', 'news', '#7B5EA7'),
  ('Récits', 'recits', 'blog', '#7B5EA7'),
  ('Lifestyle', 'lifestyle', 'blog', '#C9A84C'),
  ('Restaurants', 'restaurants', 'adresse', '#C9A84C'),
  ('Commerces', 'commerces', 'adresse', '#4A6FD4'),
  ('Services', 'services', 'adresse', '#1B2B6B')
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public)
values ('articles', 'articles', true), ('adresses', 'adresses', true), ('publicites', 'publicites', true)
on conflict (id) do nothing;
