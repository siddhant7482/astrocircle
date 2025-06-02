create table public.charts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  svg_code text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.charts enable row level security;

create policy "Users can view their own charts"
  on public.charts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own charts"
  on public.charts for insert
  with check (auth.uid() = user_id); 