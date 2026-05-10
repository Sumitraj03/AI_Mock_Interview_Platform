# InterviewPilot AI

A production-style AI mock interview SaaS built with React, Vite, Tailwind CSS, Zustand, Clerk-ready auth, Supabase-ready persistence, OpenAI-ready serverless AI routes, Stream Video-ready rooms, Framer Motion, Recharts, Lucide, and ShadCN-style UI primitives.

## Features

- Landing page with premium SaaS sections, pricing, testimonials, and CTA
- Login/signup with Clerk when configured, plus runnable mock auth by default
- Protected dashboard routes with responsive sidebar layout
- AI question generator with category, type, difficulty, loading states, and saved prompts
- Mock interview room with camera, mic, timer, room IDs, and Stream Video SDK support
- AI feedback report with score, rubric chart, strengths, weaknesses, and suggestions
- Interview history, analytics charts, settings, theme toggle, toasts, skeletons, and error states

## Portfolio Alignment

Tools and technologies: React.js, Tailwind CSS, Supabase, Clerk, OpenAI API, Stream Video SDK.

Resume-ready highlights:

- Engineered a production-style AI-powered mock interview platform using React.js, Tailwind CSS, Clerk Authentication, Supabase, and Stream SDK, enabling secure video-based mock interviews, protected user workflows, and responsive cross-device experience.
- Developed modular frontend architecture with reusable dashboard components, AI-driven interview question generation, analytics visualizations, interview history tracking, lazy loading, and optimized API state management to improve scalability and maintainability.
- Integrated OpenAI-powered feedback workflows to generate personalized interview insights, technical/HR question sets, and performance analysis dashboards while implementing modern SaaS UI patterns, dark/light theme support, loading skeletons, and smooth animated interaction.

## Getting Started

```bash
npm install
npm run dev
```

The app runs without API keys using mock data.

## Environment Setup

Create `.env` from `.env.example`.

```bash
cp .env.example .env
```

Useful keys when you are ready for real services:

- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `VITE_STREAM_API_KEY`
- `STREAM_API_SECRET`
- `VITE_STREAM_TOKEN_ENDPOINT`

Keep `OPENAI_API_KEY` server-only. Do not expose it with a `VITE_` prefix.

Integration checklist:

- Clerk: publishable key for frontend authentication.
- Supabase: project URL and anon key for interview session persistence.
- OpenAI: server-only API key for question generation and feedback routes.
- Stream Video: API key plus `STREAM_API_SECRET` for the secure token endpoint. The Stream secret should stay server-side.

## Supabase Table

Create this table if you want persisted interview sessions:

```sql
create table interview_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  title text not null,
  category text,
  duration text,
  score int,
  notes text,
  created_at timestamptz default now()
);
```

## OpenAI Routes

Vercel serverless functions live in:

- `api/generate-questions.js`
- `api/generate-feedback.js`

Set `VITE_ENABLE_REAL_AI=true` after adding `OPENAI_API_KEY` in your server environment.

## Stream Video

The video room works locally with browser camera and mic. For Stream:

1. Add `VITE_STREAM_API_KEY`.
2. Provide `VITE_STREAM_TOKEN_ENDPOINT` that returns `{ "token": "..." }` for the current user.
3. Deploy the token endpoint server-side so Stream secrets stay private.

## Build

```bash
npm run build
```

## Deploy To Vercel

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Add environment variables from `.env.example`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
