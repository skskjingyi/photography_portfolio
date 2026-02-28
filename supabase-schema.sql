-- Run this in your Supabase SQL Editor to set up the database

create table albums (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  cover_url text,
  created_at timestamptz default now()
);

create table photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid references albums(id) on delete cascade,
  cloudinary_id text not null unique,
  url text not null,
  width integer not null default 0,
  height integer not null default 0,
  title text,
  country text,        -- ISO 3166-1 alpha-2 e.g. "JP"
  country_name text,   -- e.g. "Japan"
  lat numeric,
  lng numeric,
  taken_at timestamptz,
  created_at timestamptz default now()
);

-- Index for fast country filtering
create index photos_country_idx on photos(country);
create index photos_album_id_idx on photos(album_id);

-- View for country stats (used by the world map)
create view country_stats as
  select
    country,
    country_name,
    count(*) as count
  from photos
  where country is not null
  group by country, country_name;
