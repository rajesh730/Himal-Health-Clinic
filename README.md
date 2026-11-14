# Himal Health Clinic

Public website for Himal Health Clinic & Pharmacy in Katunje, Bhaktapur.

## Local development

Requires Node.js 22.13 or later.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Vercel deployment

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, import the repository. It will detect **Next.js** automatically.
3. Keep the default settings: root directory `./`, build command `next build`, and output directory `.next`.
4. Set `NEXT_PUBLIC_SITE_URL` to the final production URL, without a trailing slash. Use the custom domain if one is connected.
5. Deploy and confirm the canonical URL, sitemap, robots file, phone links, and map link on the production domain.

No database, private environment variable, or server-side integration is required for the current public site.
