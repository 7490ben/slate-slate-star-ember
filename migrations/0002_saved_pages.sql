create table if not exists saved_pages (
  user_id text not null,
  handle text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, handle)
);
create index if not exists saved_pages_user_id_idx on saved_pages (user_id);
