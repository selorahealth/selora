-- ============================================================
-- SELORA HEALTH — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS (extends Supabase auth.users)
-- ============================================================
create table if not exists public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  role text not null check (role in ('patient', 'hospital', 'researcher', 'admin')),
  country text default 'NG',
  currency text default 'NGN',
  language text default 'en',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- PATIENT PROFILES
-- ============================================================
create table if not exists public.patient_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade unique not null,
  full_name text not null,
  date_of_birth date,
  blood_group text,
  genotype text,
  phone text,
  wallet_address text,
  wallet_seed_encrypted text, -- AES-256 encrypted, never expose
  tier text default 'free' check (tier in ('free', 'premium', 'early_access')),
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- HOSPITAL PROFILES
-- ============================================================
create table if not exists public.hospital_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade unique not null,
  hospital_name text not null,
  address text,
  state text,
  country text default 'NG',
  phone text,
  email text,
  verified boolean default false,
  wallet_address text,
  wallet_seed_encrypted text,
  tier text default 'standard' check (tier in ('basic', 'standard', 'enterprise')),
  logo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- RESEARCHER PROFILES
-- ============================================================
create table if not exists public.researcher_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade unique not null,
  full_name text not null,
  institution text not null,
  irb_number text,
  irb_expiry date,
  verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- MEDICAL RECORDS
-- ============================================================
create table if not exists public.medical_records (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patient_profiles(id) on delete cascade not null,
  hospital_id uuid references public.hospital_profiles(id) on delete set null,
  record_type text not null, -- 'blood_work', 'xray', 'prescription', 'scan', 'report', 'other'
  title text not null,
  file_url text, -- Supabase Storage URL
  encrypted boolean default true,
  iota_proof_hash text, -- on-chain proof from record_vault contract
  status text default 'active' check (status in ('active', 'pending', 'deleted')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- ACCESS LOGS
-- ============================================================
create table if not exists public.access_logs (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patient_profiles(id) on delete cascade not null,
  hospital_id uuid references public.hospital_profiles(id) on delete set null,
  hospital_name text, -- snapshot in case hospital is deleted
  access_type text not null check (access_type in ('full', 'anonymised', 'emergency', 'denied')),
  qr_token_used text,
  iota_tx_digest text, -- on-chain log from consent_ledger
  accessed_at timestamptz default now()
);

-- ============================================================
-- CONSENT SETTINGS
-- ============================================================
create table if not exists public.consent_settings (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patient_profiles(id) on delete cascade unique not null,
  emergency_access boolean default true,
  research_sharing boolean default false,
  insurance_access boolean default false,
  pharma_studies boolean default false,
  updated_at timestamptz default now()
);

-- ============================================================
-- QR TOKENS
-- ============================================================
create table if not exists public.qr_tokens (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patient_profiles(id) on delete cascade not null,
  token_hash text not null unique,
  expires_at timestamptz not null,
  used boolean default false,
  used_by_hospital_id uuid references public.hospital_profiles(id),
  created_at timestamptz default now()
);

-- ============================================================
-- EARNINGS
-- ============================================================
create table if not exists public.earnings (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patient_profiles(id) on delete cascade not null,
  study_id uuid,
  amount_iota numeric default 0,
  amount_local numeric default 0,
  currency text default 'NGN',
  status text default 'pending' check (status in ('pending', 'available', 'withdrawn')),
  iota_tx_digest text,
  created_at timestamptz default now()
);

-- ============================================================
-- WITHDRAWALS
-- ============================================================
create table if not exists public.withdrawals (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patient_profiles(id) on delete cascade not null,
  amount_local numeric not null,
  currency text not null,
  bank_code text,
  account_number text,
  account_name text,
  flutterwave_ref text,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- RESEARCH STUDIES
-- ============================================================
create table if not exists public.studies (
  id uuid default uuid_generate_v4() primary key,
  researcher_id uuid references public.researcher_profiles(id) on delete cascade not null,
  title text not null,
  description text,
  iota_study_id text, -- on-chain study ID from research_marketplace contract
  monthly_rate_usd numeric,
  max_participants integer,
  current_participants integer default 0,
  is_active boolean default false,
  deadline timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- STUDY PARTICIPANTS
-- ============================================================
create table if not exists public.study_participants (
  id uuid default uuid_generate_v4() primary key,
  study_id uuid references public.studies(id) on delete cascade not null,
  patient_id uuid references public.patient_profiles(id) on delete cascade not null,
  hospital_id uuid references public.hospital_profiles(id),
  joined_at timestamptz default now(),
  unique(study_id, patient_id)
);

-- ============================================================
-- TRANSACTIONS (all money movements)
-- ============================================================
create table if not exists public.transactions (
  id uuid default uuid_generate_v4() primary key,
  type text not null check (type in ('research_payment', 'patient_earning', 'hospital_earning', 'platform_fee', 'withdrawal', 'subscription')),
  from_role text,
  to_role text,
  amount_iota numeric,
  amount_local numeric,
  currency text,
  iota_tx_digest text,
  flutterwave_ref text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'failed')),
  metadata jsonb,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.patient_profiles enable row level security;
alter table public.hospital_profiles enable row level security;
alter table public.researcher_profiles enable row level security;
alter table public.medical_records enable row level security;
alter table public.access_logs enable row level security;
alter table public.consent_settings enable row level security;
alter table public.qr_tokens enable row level security;
alter table public.earnings enable row level security;
alter table public.withdrawals enable row level security;
alter table public.studies enable row level security;
alter table public.study_participants enable row level security;
alter table public.transactions enable row level security;

-- Users can read/update their own row
drop policy if exists "users: own row" on public.users;
create policy "users: own row" on public.users
  for all using (auth.uid() = id);

-- Patients can read/update their own profile
drop policy if exists "patient_profiles: own" on public.patient_profiles;
create policy "patient_profiles: own" on public.patient_profiles
  for all using (auth.uid() = user_id);

-- Hospitals can read/update their own profile
drop policy if exists "hospital_profiles: own" on public.hospital_profiles;
create policy "hospital_profiles: own" on public.hospital_profiles
  for all using (auth.uid() = user_id);

-- Hospitals can be read by anyone (for QR scan lookup)
drop policy if exists "hospital_profiles: public read" on public.hospital_profiles;
create policy "hospital_profiles: public read" on public.hospital_profiles
  for select using (verified = true);

-- Researchers can read/update their own profile
drop policy if exists "researcher_profiles: own" on public.researcher_profiles;
create policy "researcher_profiles: own" on public.researcher_profiles
  for all using (auth.uid() = user_id);

-- Patients can manage their own records
drop policy if exists "medical_records: own" on public.medical_records;
create policy "medical_records: own" on public.medical_records
  for all using (
    auth.uid() = (
      select user_id from public.patient_profiles where id = patient_id
    )
  );

-- Patients can see their own access logs
drop policy if exists "access_logs: own" on public.access_logs;
create policy "access_logs: own" on public.access_logs
  for select using (
    auth.uid() = (
      select user_id from public.patient_profiles where id = patient_id
    )
  );

-- Patients can manage their own consent
drop policy if exists "consent_settings: own" on public.consent_settings;
create policy "consent_settings: own" on public.consent_settings
  for all using (
    auth.uid() = (
      select user_id from public.patient_profiles where id = patient_id
    )
  );

-- Patients manage their own QR tokens
drop policy if exists "qr_tokens: own" on public.qr_tokens;
create policy "qr_tokens: own" on public.qr_tokens
  for all using (
    auth.uid() = (
      select user_id from public.patient_profiles where id = patient_id
    )
  );

-- Patients see their own earnings
drop policy if exists "earnings: own" on public.earnings;
create policy "earnings: own" on public.earnings
  for select using (
    auth.uid() = (
      select user_id from public.patient_profiles where id = patient_id
    )
  );

-- Patients manage their own withdrawals
drop policy if exists "withdrawals: own" on public.withdrawals;
create policy "withdrawals: own" on public.withdrawals
  for all using (
    auth.uid() = (
      select user_id from public.patient_profiles where id = patient_id
    )
  );

-- Researchers manage their own studies
drop policy if exists "studies: own" on public.studies;
create policy "studies: own" on public.studies
  for all using (
    auth.uid() = (
      select user_id from public.researcher_profiles where id = researcher_id
    )
  );

-- Everyone can read active studies
drop policy if exists "studies: public read" on public.studies;
create policy "studies: public read" on public.studies
  for select using (is_active = true);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_patient_profile_updated
  before update on public.patient_profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_hospital_profile_updated
  before update on public.hospital_profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_user_updated
  before update on public.users
  for each row execute procedure public.handle_updated_at();

-- Auto-create user row after Supabase auth signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'patient')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- INDEXES (for query performance)
-- ============================================================
create index if not exists idx_medical_records_patient on public.medical_records(patient_id);
create index if not exists idx_access_logs_patient on public.access_logs(patient_id);
create index if not exists idx_access_logs_hospital on public.access_logs(hospital_id);
create index if not exists idx_earnings_patient on public.earnings(patient_id);
create index if not exists idx_qr_tokens_patient on public.qr_tokens(patient_id);
create index if not exists idx_qr_tokens_hash on public.qr_tokens(token_hash);
create index if not exists idx_transactions_type on public.transactions(type);
create index if not exists idx_study_participants_study on public.study_participants(study_id);
