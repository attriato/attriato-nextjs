# Attriato — Next.js

Next.js (Pages Router) port of the Attriato marketing site, built for deployment on Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local # fill in EmailJS / Adzuna keys
npm run dev
```

Visit http://localhost:3000.

## Environment variables

Set these in `.env.local` locally and in the Vercel project settings for deployments:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_ADZUNA_APP_ID`
- `NEXT_PUBLIC_ADZUNA_APP_KEY`

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — lint the project

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new) — it will auto-detect Next.js.
3. Add the environment variables above in the Vercel project settings.
4. Deploy.
