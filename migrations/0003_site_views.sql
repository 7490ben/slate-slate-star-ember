create table if not exists site_hits (
  key text primary key,
  total integer not null default 0
);

insert into site_hits (key, total) values ('7490.org', 0)
  on conflict (key) do nothing;

create table if not exists site_live (
  id text primary key,
  seen_at timestamptz not null default now()
);
