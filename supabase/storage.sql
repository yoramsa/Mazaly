insert into storage.buckets (id, name, public)
values ('articles', 'articles', true), ('adresses', 'adresses', true), ('publicites', 'publicites', true)
on conflict (id) do nothing;
