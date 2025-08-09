# Arjun – 3D Portfolio (Next.js + R3F)

Production-ready personal site with a unique Three.js hero and flat-file content.

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
- Add projects in `content/projects/*.mdx`

## Deploy (Vercel)
- Push to GitHub and import repo in Vercel
- Set env vars as needed
- Optionally add Plausible domain in `content/site.json` (socials.plausibleDomain)
