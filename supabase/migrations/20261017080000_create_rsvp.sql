create table if not exists public.rsvp (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(trim(guest_name)) > 0),
  attendance_status text not null check (attendance_status in ('InsyaAllah Hadir', 'Mohon Maaf Tidak Hadir', 'Belum Bisa Memastikan')),
  guest_count integer not null default 1 check (guest_count >= 1 and guest_count <= 20),
  whatsapp text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.rsvp enable row level security;

create policy "Public may submit RSVP"
on public.rsvp
for insert
to anon, authenticated
with check (true);

-- Intentionally no public SELECT, UPDATE, or DELETE policies.
