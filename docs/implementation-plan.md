# Varyz Platform Website & Protected Prototype - Implementation Plan

## Executive Summary

Varyz is an enterprise drone intelligence and operational management platform that unifies drone mission planning, active mission monitoring, agricultural intelligence (NDVI/vegetation/planting suitability), security surveillance, incident monitoring, and client project reporting.

This plan details the construction of a production-ready Next.js application for Varyz featuring:
1. A conversion-focused landing page adhering strictly to the Varyz design system (#06162C navy, #8CCB45 lime, #6B3CE8 purple).
2. A high-converting Prototype Access Request form with client/server validation, rate limiting, and spam protection.
3. Supabase database schema with complete migrations for request tracking, token management, and tester feedback.
4. Transactional email integration via Resend for access token distribution.
5. A token-protected prototype workspace viewer with role filtering, full-screen screenshot previewing, keyboard navigation, screen explanations, and an inline feedback system.
6. Complete legal compliance pages, SEO metadata, sitemap.xml, robots.txt, and accessibility standards.

---

## 1. Architecture & Tech Stack

- **Framework**: Next.js 14+ (App Router) with TypeScript & React 18
- **Styling**: Tailwind CSS, custom design tokens matching reference files, subtle grid patterns, glassmorphism, and responsive layouts
- **Database & Auth**: Supabase JS Client (`@supabase/supabase-js`) for PostgreSQL database management
- **Email Delivery**: Resend (`resend`) for transactional prototype access delivery
- **Validation**: Zod schema validation on both client and server side
- **Form Management**: React Hook Form with Zod resolver (`@hookform/resolvers/zod`)
- **Icons**: Lucide React (`lucide-react`)
- **Animation & Transitions**: Tailwind transition utilities & micro-animations

---

## 2. Directory & Component Breakdown

```
varyz-app/
├── docs/
│   └── implementation-plan.md
├── references/                      # Raw visual assets & screenshots
├── public/
│   ├── assets/                      # Optimized WebP/PNG assets for web app
│   │   ├── logo.png
│   │   ├── hero-dashboard.png
│   │   ├── client/                  # Client role screenshots
│   │   ├── drone/                   # Drone Operator role screenshots
│   │   ├── agriculture/             # Agriculture Analyst screenshots
│   │   └── security/                # Security Analyst screenshots
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql   # Tables, indexes, RLS policies, constraints
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Global Root Layout with font, meta, & toast provider
│   │   ├── page.tsx                 # Main Conversion Landing Page
│   │   ├── privacy-policy/page.tsx  # Editable Privacy Policy
│   │   ├── terms-of-use/page.tsx    # Editable Terms of Use
│   │   ├── prototype/page.tsx      # Protected Prototype Route (?token=...)
│   │   ├── not-found.tsx            # Custom 404 Page
│   │   ├── error.tsx                # Custom Error Boundary
│   │   └── api/
│   │       ├── request-access/route.ts # Server Action / API Route for access requests
│   │       └── submit-feedback/route.ts# Server Action / API Route for tester feedback
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Sticky Header with Logo, Nav links, Mobile Menu, CTA
│   │   │   └── Footer.tsx           # Footer with links, social links, disclaimer
│   │   ├── landing/
│   │   │   ├── HeroSection.tsx      # Main Hero with CTA & Hero Screenshot
│   │   │   ├── ProductIntro.tsx     # One operational picture section
│   │   │   ├── ProblemSolution.tsx  # 5-point challenge vs Varyz solution
│   │   │   ├── CoreCapabilities.tsx # 4 main capabilities
│   │   │   ├── RoleWorkspaces.tsx   # 4 role-based cards with screenshots
│   │   │   ├── HowItWorks.tsx       # 3-step workflow: Capture -> Understand -> Act
│   │   │   ├── PrototypePreview.tsx # 4 preview screens public preview
│   │   │   ├── Benefits.tsx         # 6 core platform benefits
│   │   │   ├── FAQSection.tsx       # Accessible Accordion with 8 FAQs
│   │   │   └── FinalCTA.tsx         # Final conversion push section
│   │   ├── modals/
│   │   │   ├── RequestAccessModal.tsx# Access request form modal with rate limiting & state
│   │   │   └── FeedbackModal.tsx    # Tester feedback form modal inside prototype
│   │   └── prototype/
│   │       ├── PrototypeHeader.tsx  # Header with token badge, role filter, feedback trigger
│   │       ├── RoleFilterTabs.tsx   # Role switcher (All, Drone, Agri, Security, Client)
│   │       ├── ScreenGrid.tsx       # Grid of screens with aspect ratio preservation
│   │       ├── ScreenModal.tsx      # Large preview modal with prev/next keyboard nav
│   │       └── ExpiredTokenCard.tsx # Useful expired/invalid link state screen
│   ├── lib/
│   │   ├── supabase.ts              # Supabase database client & fallback data store
│   │   ├── resend.ts                # Resend email handler with fallback logging
│   │   ├── schemas.ts               # Zod validation schemas
│   │   ├── rate-limit.ts            # Server-side rate limiter
│   │   └── prototype-data.ts        # Comprehensive metadata for all 20+ prototype screens
│   └── types/
│       └── index.ts                 # TypeScript interfaces & types
├── .env.example
├── .env.local
├── README.md                        # Setup, deployment, testing instructions
├── tailwind.config.js
└── tsconfig.json
```

---

## 3. Database Schema Design (`supabase/migrations/001_initial_schema.sql`)

### Table: `prototype_access_requests`
- `id` (UUID, Primary Key, Default: `gen_random_uuid()`)
- `full_name` (TEXT, NOT NULL)
- `email` (TEXT, NOT NULL, UNIQUE)
- `organisation` (TEXT, NOT NULL)
- `role` (TEXT, NOT NULL)
- `primary_use_case` (TEXT, NOT NULL)
- `country` (TEXT)
- `goals` (TEXT)
- `consent` (BOOLEAN, NOT NULL, DEFAULT true)
- `ip_address` (TEXT)
- `created_at` (TIMESTAMPTZ, DEFAULT NOW())
- `updated_at` (TIMESTAMPTZ, DEFAULT NOW())

### Table: `prototype_access_tokens`
- `id` (UUID, Primary Key, Default: `gen_random_uuid()`)
- `request_id` (UUID, FK -> `prototype_access_requests.id` ON DELETE CASCADE)
- `email` (TEXT, NOT NULL)
- `token` (TEXT, NOT NULL, UNIQUE)
- `expires_at` (TIMESTAMPTZ, NOT NULL)
- `first_accessed_at` (TIMESTAMPTZ)
- `last_accessed_at` (TIMESTAMPTZ)
- `created_at` (TIMESTAMPTZ, DEFAULT NOW())

### Table: `prototype_feedback`
- `id` (UUID, Primary Key, Default: `gen_random_uuid()`)
- `token_id` (UUID, FK -> `prototype_access_tokens.id` ON DELETE SET NULL)
- `email` (TEXT, NOT NULL)
- `rating` (INT, CHECK (rating >= 1 AND rating <= 5))
- `workspace_tested` (TEXT, NOT NULL)
- `most_useful_feature` (TEXT, NOT NULL)
- `confusing_elements` (TEXT)
- `most_used_feature` (TEXT)
- `suggested_improvements` (TEXT)
- `future_testing_interest` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMPTZ, DEFAULT NOW())

---

## 4. Key User Flow & Interactive Mechanics

1. **Public Landing Page**:
   - Visitors land on `https://domain.com/`
   - Hero button or header CTA triggers `RequestAccessModal`
   - Role-based cards show real screenshot overlays
   - FAQ accordion is accessible via keyboard
2. **Access Request & Token Generation**:
   - Client submits form -> validated via Zod (`requestAccessSchema`)
   - Server checks rate limit per IP/Email (max 3 requests per 15 minutes)
   - Server checks if record already exists in Supabase.
     - If new: Creates request record, generates random 32-char hex token (expires in 30 days).
     - If existing: Retrieves/refreshes access token.
   - Server invokes Resend API to deliver email with link: `https://domain.com/prototype?token=<TOKEN>`
   - Form shows confirmation message: "Your prototype access is on its way. Check your email for your private link."
3. **Protected Prototype Access**:
   - Visitor navigates to `/prototype?token=<TOKEN>`
   - Server/Component validates token in database.
     - If invalid/missing/expired -> Renders `ExpiredTokenCard` with option to re-request link.
     - If valid -> Updates `first_accessed_at` (if null) and `last_accessed_at` timestamp in Supabase.
   - Renders interactive Prototype Viewer with:
     - Filter tabs: All, Drone Operator (7 screens), Agriculture Analyst (8 screens), Security Analyst (2 screens), Client/Viewer (7 screens)
     - Screen cards displaying thumbnail, role tag, title, and key capabilities breakdown
     - Large preview lightbox with Next/Previous controls, keyboard arrow navigation, Esc to close, and zoom controls
     - Floating "Submit Prototype Feedback" CTA opening `FeedbackModal`

---

## 5. Verification & Testing Strategy

1. **Type & Lint Checking**:
   - Execute `npm run lint` and `tsc --noEmit` to ensure zero compilation errors.
2. **Build Verification**:
   - Execute `npm run build` to verify Next.js production bundler succeeds.
3. **Browser Testing (Playwright / Chrome Subagent)**:
   - Verify layout responsiveness across desktop (1440px), tablet (768px), and mobile (375px).
   - Test prototype request form validation with empty fields, invalid email, missing consent.
   - Submit valid request, verify token generation, and check simulated/actual email output.
   - Navigate to `/prototype?token=<VALID_TOKEN>`, verify screen grid, role filtering, keyboard navigation in lightbox modal.
   - Submit prototype feedback and verify database persistence.
   - Test invalid token `/prototype?token=invalid-123` to verify expired token fallback UI.
   - Verify social links: Instagram (`https://www.instagram.com/usevarys?igsh=Ym5oZDF5ZHJzamt2`) and LinkedIn (`https://www.linkedin.com/company/varyz/`).

---

## 6. Deployment & Environment Setup

- Create `.env.example` with:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
  - `NEXT_PUBLIC_APP_URL`
- Document step-by-step local execution and Vercel/Supabase setup in `README.md`.
