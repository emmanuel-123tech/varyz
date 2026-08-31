# Varyz - Geo-Security & Agricultural Intelligence Platform

Varyz is an enterprise drone intelligence and operational management platform that turns aerial information into clear, actionable decisions. It connects drone mission planning, active flight telemetry, agricultural intelligence (NDVI vegetation analysis, soil moisture, planting suitability), security surveillance, incident monitoring, and client project reporting in one clear platform.

---

## 🚀 Key Features

1. **Conversion-Focused Landing Page**
   - Built with Next.js App Router, TypeScript, and Tailwind CSS matching Varyz brand colors (`#06162C` Navy, `#8CCB45` Lime Green, `#6B3CE8` Purple).
   - High-impact Hero section, Product Vision, 5-Point Challenge/Solution, 4 Core Capabilities, 4 Role-Based Workspaces, 3-Step Workflow, 4 Public Teaser Screens, 6 Platform Benefits, 8 Accessible Accordion FAQs, and conversion CTAs.
   - Header with desktop & mobile drawer menu, exact Instagram and LinkedIn URLs.

2. **Prototype Access Request System**
   - High-converting modal triggered by any CTA.
   - Client and server-side validation via Zod and React Hook Form.
   - Server-side rate limiting (max 5 requests per 15 mins per IP) and honeypot spam protection.
   - Saves requests in Supabase database (`prototype_access_requests` table) with fallback data store.
   - Duplicate tester handling (resends existing access token).
   - Generates random 32-character hex access tokens valid for 30 days.

3. **Transactional Email Access Delivery**
   - Integrates with Resend API to deliver branded HTML and plain-text emails containing single-click prototype access links.
   - Fallback development logger mode when API keys are not provided.

4. **Token-Protected Prototype Workspace**
   - Protected route `/prototype?token=<TOKEN>` validating tokens against Supabase.
   - Expired link screen with one-click re-request form (`ExpiredTokenCard`).
   - Workspace role filter switcher (All, Drone Operator, Agriculture Analyst, Security Analyst, Client & Viewer).
   - Interactive screenshot grid displaying 20+ real application screens while preserving original aspect ratios.
   - Fullscreen Lightbox preview modal with Next/Prev buttons, keyboard arrow navigation (`←`, `→`), `Esc` key to close, and zoom controls.

5. **Tester Feedback Collection System**
   - In-app feedback modal capturing 1–5 star rating, tested workspace, most useful feature, confusing elements, and future testing interest.
   - Saves feedback in Supabase (`prototype_feedback` table) linked to the access token.

6. **Legal & Technical Standards**
   - Editable Privacy Policy (`/privacy-policy`) and Terms of Use (`/terms-of-use`).
   - Custom 404 (`/not-found`) and Error Boundary (`/error`).
   - SEO metadata, Open Graph preview, `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase PostgreSQL (`@supabase/supabase-js`)
- **Email**: Resend (`resend`)
- **Validation**: Zod + React Hook Form (`@hookform/resolvers/zod`)
- **Icons**: Lucide React (`lucide-react`)
- **Animations**: Canvas Confetti & Tailwind Transitions

---

## ⚙️ Setup & Installation Instructions

### 1. Prerequisites
Ensure you have Node.js 18+ installed on your system.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and populate credentials:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Resend Transactional Email Configuration
RESEND_API_KEY=re_123456789
RESEND_FROM_EMAIL=Varyz Access <access@varyz.io>

# Application Base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

*Note: If `RESEND_API_KEY` or Supabase keys are omitted in local development, the application automatically runs using an in-memory data store and prints access links to the console/UI toast notification.*

---

## 🗄️ Supabase Database Migration Setup

1. Log into your Supabase Dashboard and select your project.
2. Open the **SQL Editor**.
3. Copy the SQL migration script from `supabase/migrations/001_initial_schema.sql`.
4. Run the script to create tables:
   - `prototype_access_requests`
   - `prototype_access_tokens`
   - `prototype_feedback`
   - Indexes and Row Level Security (RLS) policies.

---

## 💻 Running the Application Locally

Start Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification Guide

### 1. Type & Lint Checking
Run type check and linter to verify code quality:
```bash
npm run lint
npx tsc --noEmit
```

### 2. Production Build Verification
Test Next.js production bundler:
```bash
npm run build
```

### 3. Manual UI & Interaction Testing
- **Landing Page Navigation**: Test header nav links, mobile drawer menu, and social links (Instagram & LinkedIn).
- **Access Request Form**: Click "Request Prototype Access", verify required field validation (Full Name, Email, Organisation, Role, Primary Use Case, Consent checkbox).
- **Token Link Generation**: Submit valid form -> verify success state & access token generation.
- **Prototype Access**: Navigate to `/prototype?token=<TOKEN>` -> verify workspace header, role filter tabs (Drone, Agriculture, Security, Client).
- **Lightbox Navigation**: Click any screen thumbnail -> test `←` and `→` keyboard arrows, zoom, and `Esc` key.
- **Feedback Submission**: Click "Submit Feedback" inside prototype -> fill 1-5 rating, workspace, useful features -> verify submission success.
- **Expired Token Test**: Navigate to `/prototype?token=invalid-123` -> verify expired token card and re-request CTA.

