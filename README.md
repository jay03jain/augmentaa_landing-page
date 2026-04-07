# Augmentaa Digital — Website

Next.js 14 (App Router) marketing site for Augmentaa Digital: EV charging hardware, SPARK EV / SPARK DRIVE / BATTERY PULSE software, and intracity EV logistics.

## Stack

- **Framework:** Next.js 14, TypeScript
- **Styling:** Tailwind CSS (+ `@tailwindcss/typography` for MDX)
- **Motion:** Framer Motion
- **Particles:** tsParticles (slim + links)
- **Product imagery:** PNG/JPG with `react-parallax-tilt` on `/products`
- **Blog:** MDX with [Contentlayer2](https://github.com/timlrx/contentlayer2)
- **Email:** [Resend](https://resend.com) via `/api/contact` and `/api/enquiry`
- **Analytics:** Google Analytics 4 (`@next/third-parties`) + optional [Umami](https://umami.is)
- **Form logging:** Neon Postgres (optional) + `/admin` dashboard

## Local setup

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in values (see below).

4. Run the dev server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

`npm run build` runs `contentlayer2 build` first so MDX posts and types stay in sync.

### Environment variables

See `.env.example` for the full list. Minimum for contact forms:

- `RESEND_API_KEY`
- Optional: `RESEND_FROM` (verified domain sender in Resend)

Optional:

- `NEXT_PUBLIC_GA_ID` — GA4 measurement ID
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` / `NEXT_PUBLIC_UMAMI_SRC` — Umami tracking
- `DATABASE_URL` — Neon Postgres connection string (form submissions are logged here when set)
- `ADMIN_PASSWORD` — protects `/admin` (server-only; not prefixed with `NEXT_PUBLIC_`)

### Database (Neon)

1. Create a free database on [Neon](https://neon.tech).
2. Run the SQL in `lib/db/schema.sql` against the database (Neon SQL editor or `psql`).
3. Set `DATABASE_URL` in `.env.local`. Contact and enquiry API routes insert rows after a successful Resend send (failures are ignored so email still succeeds).

### UMAMI SETUP (one-time)

1. Go to [Running on Vercel](https://umami.is/docs/running-on-vercel).
2. Fork the official Umami repo: [github.com/umami-software/umami](https://github.com/umami-software/umami).
3. Deploy to Vercel (free) and connect a free Neon Postgres database for Umami’s own schema.
4. Create a website in the Umami dashboard → copy the tracking script `src` URL and website ID.
5. Add to `.env.local`:

   ```
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
   NEXT_PUBLIC_UMAMI_SRC=https://your-umami-instance.vercel.app/script.js
   ```

Custom events use `data-umami-event` attributes on CTAs and forms (see site components).

### Admin dashboard

With `ADMIN_PASSWORD` and (optionally) `DATABASE_URL` set, visit `/admin`, sign in, and review logged submissions. Session analytics remain in GA4 and Umami.

## Deploy to Vercel

1. Push the project to GitHub and import it in [Vercel](https://vercel.com).
2. Add environment variables from `.env.example` under **Project → Settings → Environment Variables**.
3. Connect the custom domain `www.augmentaa.co.in` in Vercel; HTTPS is handled automatically.

## Content

- Blog posts live in `content/blog/` as `.mdx` files with frontmatter (`title`, `date`, `description`).
- Product imagery is under `public/images/` (sourced from the legacy static site).

## Licence

Proprietary — Augmentaa Digital.

# augmentaa_landing-page