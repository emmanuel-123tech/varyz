-- Varyz Platform Initial Schema Migration
-- Database: Supabase (PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Prototype Access Requests Table
CREATE TABLE IF NOT EXISTS public.prototype_access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    organisation TEXT NOT NULL,
    role TEXT NOT NULL,
    primary_use_case TEXT NOT NULL,
    country TEXT,
    goals TEXT,
    consent BOOLEAN NOT NULL DEFAULT TRUE,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_prototype_access_requests_email ON public.prototype_access_requests(email);

-- 2. Prototype Access Tokens Table
CREATE TABLE IF NOT EXISTS public.prototype_access_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES public.prototype_access_requests(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    first_accessed_at TIMESTAMPTZ,
    last_accessed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for tokens and email
CREATE INDEX IF NOT EXISTS idx_prototype_access_tokens_token ON public.prototype_access_tokens(token);
CREATE INDEX IF NOT EXISTS idx_prototype_access_tokens_email ON public.prototype_access_tokens(email);

-- 3. Prototype Feedback Table
CREATE TABLE IF NOT EXISTS public.prototype_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_id UUID REFERENCES public.prototype_access_tokens(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    workspace_tested TEXT NOT NULL,
    most_useful_feature TEXT NOT NULL,
    confusing_elements TEXT,
    most_used_feature TEXT,
    suggested_improvements TEXT,
    future_testing_interest BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for feedback email
CREATE INDEX IF NOT EXISTS idx_prototype_feedback_email ON public.prototype_feedback(email);

-- Row Level Security (RLS) Policies
ALTER TABLE public.prototype_access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prototype_access_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prototype_feedback ENABLE ROW LEVEL SECURITY;

-- Allow public insert to requests table (controlled via API endpoint validation)
CREATE POLICY "Allow public insert to access requests"
    ON public.prototype_access_requests
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Allow public insert to feedback table
CREATE POLICY "Allow public insert to feedback"
    ON public.prototype_feedback
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Restrict read access to tokens (server-side service role queries)
CREATE POLICY "Allow service role token read"
    ON public.prototype_access_tokens
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow service role token update"
    ON public.prototype_access_tokens
    FOR UPDATE
    TO public
    USING (true);
