insert into storage.buckets (id, name, public)
values ('articles', 'articles', true), ('adresses', 'adresses', true), ('publicites', 'publicites', true)
on conflict (id) do nothing;

create policy storage_public_read on storage.objects
  for select using (bucket_id in ('articles', 'adresses', 'publicites'));

create policy storage_staff_insert on storage.objects
  for insert with check (bucket_id in ('articles', 'adresses', 'publicites') and is_staff());

create policy storage_staff_update on storage.objects
  for update using (bucket_id in ('articles', 'adresses', 'publicites') and is_staff());

create policy storage_staff_delete on storage.objects
  for delete using (bucket_id in ('articles', 'adresses', 'publicites') and is_staff());
