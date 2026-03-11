-- ============================================================
-- SELORA HEALTH — Migration: 002_kyc_and_emergency_contacts.sql
-- Adds KYC status to users and an emergency_contacts table.
-- ============================================================

-- 1. Add verification_status to users table
ALTER TABLE public.users 
ADD COLUMN verification_status text DEFAULT 'pending' 
CHECK (verification_status IN ('pending', 'verified', 'rejected'));

-- Provide a migration path for existing hospital/researcher records (if any)
UPDATE public.users u
SET verification_status = 'verified'
FROM public.hospital_profiles h
WHERE u.id = h.user_id AND h.verified = true;

UPDATE public.users u
SET verification_status = 'verified'
FROM public.researcher_profiles r
WHERE u.id = r.user_id AND r.verified = true;

-- Drop the old boolean columns (optional but recommended for consistency)
ALTER TABLE public.hospital_profiles DROP COLUMN verified;
ALTER TABLE public.researcher_profiles DROP COLUMN verified;


-- 2. Create emergency_contacts table
CREATE TABLE public.emergency_contacts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id uuid REFERENCES public.patient_profiles(id) ON DELETE CASCADE NOT NULL,
  contact_patient_id uuid REFERENCES public.patient_profiles(id) ON DELETE CASCADE NOT NULL,
  relationship text,
  can_access_records boolean DEFAULT false, -- if true, contact can access records in absolute emergency
  created_at timestamptz DEFAULT now(),
  UNIQUE(patient_id, contact_patient_id)
);

-- Note: A patient cannot be their own emergency contact
ALTER TABLE public.emergency_contacts
ADD CONSTRAINT check_not_self_contact CHECK (patient_id != contact_patient_id);

-- Enable RLS
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

-- Patients can view and manage their own emergency contacts
CREATE POLICY "emergency_contacts: patient view own" ON public.emergency_contacts
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM public.patient_profiles WHERE id = patient_id)
  );

CREATE POLICY "emergency_contacts: patient manage own" ON public.emergency_contacts
  FOR ALL USING (
    auth.uid() = (SELECT user_id FROM public.patient_profiles WHERE id = patient_id)
  );

-- Contacts can view who has nominated them
CREATE POLICY "emergency_contacts: contact view nominations" ON public.emergency_contacts
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM public.patient_profiles WHERE id = contact_patient_id)
  );
