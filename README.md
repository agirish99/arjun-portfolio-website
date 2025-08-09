# Arjun – 3D Portfolio (Next.js + R3F)

Production-ready personal site with a unique Three.js hero, flat-file content, and strong a11y/SEO.

## Stack
Next.js (App Router), TypeScript, Tailwind, react-three-fiber, drei, Framer Motion, shadcn-like UI, lucide-react, Zod, MDX.

## Quick Start
```bash
pnpm i
pnpm dev
```
Open http://localhost:3000

## Update Content (no code)
- Edit `content/site.json`, `content/skills.yml`, `content/experience.yml`
- Add projects in `content/projects/*.mdx` (or run `pnpm new:project "Title" --slug my-slug`)

## Email (Contact form)
- **Formspree**: set `FORM_ENDPOINT` env to your form endpoint
- **Resend**: set `RESEND_API_KEY` and `TO_EMAIL` env

## SEO
- `app/robots.ts` and `app/sitemap.ts`
- OG image at `app/opengraph-image.tsx`

## Deploy (Vercel)
- Push to GitHub and import repo in Vercel
- Set env vars as needed
- Optionally add Plausible domain in `content/site.json` (socials.plausibleDomain)

## Scripts
- `pnpm new:project "Title" --slug slug`
