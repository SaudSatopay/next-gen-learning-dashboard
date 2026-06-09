# Lumina — Next-Gen Learning Dashboard

A high-fidelity, **dark-mode** student dashboard built for the Frontend Intern Challenge. Live course data is fetched from **Supabase** inside **Next.js Server Components**, the layout is a responsive **Bento grid**, and every interaction is animated with **Framer Motion** under a strict _zero-layout-shift_ rule.

**Concept — "Sunset Console":** a near-black canvas with magenta → amber light bleeding through the UI. Data _glows_ (progress bars and the contribution graph use the sunset ramp), tiles stagger in and lift on hover with spring physics, and the active nav item slides via a shared-layout pill.

> **Live demo:** **https://next-gen-learning-dashboard-mu-seven.vercel.app/**

---

## ✨ How it maps to the rubric

- **Data architecture (RSC + Supabase):** courses fetched on the server via `@supabase/ssr`, streamed through `<Suspense>` with pulsing skeletons, with graceful inline error handling and a fully typed payload.
- **Framer Motion:** staggered entrance (fade + translate-Y), spring hover (`stiffness 300 / damping 20`), progress bar animating `scaleX` 0 → value, and a `layoutId` active pill. **Transform/opacity only**, so nothing triggers layout/paint; `prefers-reduced-motion` is respected.
- **Code quality & types:** modular component tree, semantic HTML (`<nav> <main> <section> <article>`), and a TypeScript `Course` interface for the database payload.
- **Visual & responsive:** premium dark theme; 4-column bento → 2-column tablet (icon-only sidebar) → single-column mobile (bottom nav).

## 🧱 Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · `@supabase/ssr` · `lucide-react` · Syne + Geist via `next/font`.

## 🏗️ Architecture — the server / client split

The dashboard is a Server Component. The static shell renders immediately; the data-driven course tiles stream in.

```
app/page.tsx ............................. Server Component
└─ DashboardShell (server) ............... Sidebar (client) + TopBar (server) + MobileNav (client)
   └─ BentoGrid (server, <section>)
      ├─ HeroTile (server) .............. composes StreakIndicator (client) inside BentoTile (client)
      ├─ ActivityTile (client) .......... Framer Motion stagger over the contribution grid
      └─ <Suspense fallback={<CourseGridSkeleton/>}>
            CoursesSection (async server) → getCourses() → CourseTile (server) × N
```

- **Server Components** do all data work — Supabase credentials and query logic never reach the client bundle.
- **Client Components** (`"use client"`) are the interactive / animated islands (tiles, sidebar, progress bar). Server components fetch data and pass plain, serializable props down to them — the canonical RSC pattern.
- **Data flow:** [`lib/supabase/server.ts`](src/lib/supabase/server.ts) builds a request-scoped `@supabase/ssr` client (awaiting `cookies()` — async in Next.js 16). [`lib/courses.ts`](src/lib/courses.ts) `getCourses()` selects from `courses`, returns a typed `Course[]`, and throws on error. [`CoursesSection`](src/components/courses/CoursesSection.tsx) awaits it inside a `<Suspense>` boundary; failures render a graceful [`<ErrorTile/>`](src/components/ui/ErrorTile.tsx), and [`app/error.tsx`](src/app/error.tsx) is the route-level backstop. Reading `cookies()` keeps the route dynamic, so every request reflects live data.
- **Loading state:** `<Suspense>` streams [`CourseGridSkeleton`](src/components/courses/CourseGridSkeleton.tsx) — pulsing placeholders sized identically to the real cards, so swapping in the data causes **zero layout shift**.

## 🎞️ Animation & zero layout shift

- Only `transform` and `opacity` animate — never `width`/`height`/`top`/`left` — so animations stay on the compositor.
- Hover elevation uses Framer Motion spring physics: `{ type: "spring", stiffness: 300, damping: 20 }`.
- The hover **border glow** is a pre-painted gradient overlay whose _opacity_ fades in (not `box-shadow`), so it never repaints in a way that shifts layout. Elevation is a `scale` transform.
- The progress bar animates `scaleX` 0 → value (transform-origin left); the percentage counts up with a Framer `MotionValue`.
- The sidebar / mobile active highlight is a single `layoutId` pill that springs between items.
- Everything degrades gracefully under `prefers-reduced-motion`.

## 📱 Responsive behaviour

| Breakpoint | Grid | Sidebar |
| --- | --- | --- |
| Desktop (≥1024px) | 4-column bento; Hero + Activity are 2×2 | expanded, collapsible |
| Tablet (768–1023px) | 2 columns | icon-only |
| Mobile (<768px) | single column | fixed bottom navigation |

## 🗄️ Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. In the **SQL Editor**, run [`supabase/migrations/0001_courses.sql`](supabase/migrations/0001_courses.sql). It creates the `courses` table, enables Row Level Security with a public-read policy, and seeds four rows.

   | column | type | notes |
   | --- | --- | --- |
   | `id` | `uuid` | primary key, `gen_random_uuid()` |
   | `title` | `text` | course name |
   | `progress` | `integer` | 0–100 (checked) |
   | `icon_name` | `text` | Lucide icon name |
   | `created_at` | `timestamptz` | `now()` |

3. Copy `.env.example` → `.env.local` and fill in your Project URL + anon key (**Settings → API**):

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```

   The anon key is browser-safe (protected by RLS), hence the `NEXT_PUBLIC_` prefix. **Never** commit `.env.local` (git-ignored) or put the `service_role` key here.

   `icon_name` is mapped to a Lucide icon by [`DynamicIcon`](src/components/ui/DynamicIcon.tsx) via an allow-list; unknown names fall back to a default.

## 🚀 Run locally

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase values
npm run dev                  # http://localhost:3000
```

`npm run build` and `npm run lint` for the production build and linting.

## ▲ Deploy to Vercel

1. Import this repository at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected.
2. Add the two `NEXT_PUBLIC_SUPABASE_*` environment variables.
3. Deploy. (Make sure the migration has been run on your Supabase project first.)

## 📁 Project structure

```
src/
  app/            layout · page · error · globals.css
  components/
    layout/       DashboardShell · Sidebar · MobileNav · TopBar
    bento/        BentoGrid · BentoTile · HeroTile · ActivityTile · CourseTile
    courses/      CoursesSection (async server) · CourseGridSkeleton
    ui/           DynamicIcon · ProgressBar · StreakIndicator · ErrorTile
  lib/            supabase/server · courses · motion · config
  types/          database.ts (Course)
supabase/migrations/0001_courses.sql
```

## 🧗 Challenges & decisions

- **Next.js 16 is newer than its docs in most tutorials**, and it ships breaking changes I worked through against the version's bundled docs: `cookies()` is now async-only; Turbopack is the default builder; the caching model changed (Cache Components / `use cache` is opt-in — this app uses the default dynamic model + `<Suspense>` streaming, and server reads are uncached by default, which suits live data).
- **Zero-shift hover glow:** a `box-shadow` glow would repaint; instead I animate the _opacity_ of a pre-painted gradient overlay and a masked gradient border, and elevate with a `scale` transform.
- **Streaming + stagger:** course tiles aren't in the first paint (they stream after Supabase resolves), so each tile self-animates with an index-based delay instead of relying on a parent `staggerChildren` — the ripple stays intact as cards arrive.
- **Performance:** dropped `backdrop-filter` from the numerous animated bento tiles and `will-change` from the 126 contribution cells to avoid excessive GPU layers; the ambient glow is pure radial-gradients (no blur filter).

---

Built with Next.js, Supabase, Tailwind CSS, and Framer Motion.
