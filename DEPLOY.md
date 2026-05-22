# Deploying ApexOps — free, ~5 minutes

The site is a standard **Next.js 14** app. Easiest free host = **Vercel** (free `*.vercel.app` URL, HTTPS, global CDN). Netlify / Cloudflare Pages work the same way.

## Option A — Vercel via drag-and-drop (no Git needed)
1. Create a free account at **https://vercel.com** (sign in with Google/GitHub).
2. Install the CLI in this folder and deploy:
   ```bash
   npm i -g vercel
   vercel        # first run: log in + answer the prompts (accept defaults)
   vercel --prod # promotes to your live URL
   ```
3. Vercel prints your live URL, e.g. **https://apexops.vercel.app**.

## Option B — Vercel via GitHub (recommended, auto-deploys on every push)
1. Put this folder in a GitHub repo:
   ```bash
   git init && git add . && git commit -m "ApexOps site"
   git branch -M main
   git remote add origin https://github.com/<you>/apexops-website.git
   git push -u origin main
   ```
2. On **vercel.com** → **Add New… → Project** → import the repo → **Deploy**.
   Vercel auto-detects Next.js. No settings needed.
3. Live at **https://apexops.vercel.app** (rename the project to change the subdomain).

## Custom domain (when you buy one)
Vercel → Project → **Settings → Domains** → add `apexops.ai` (or whatever you buy) → follow the DNS records it shows. HTTPS is automatic.

## The product trailer
- The demo video is `public/apexops-trailer-web.mp4` (~9.5 MB, web-optimized 720p). It ships with the deploy and streams from Vercel's CDN — fine for launch.
- **Better at scale:** upload the full-quality trailer to YouTube/Vimeo and switch the demo card to an embed (ask and it'll be rewired in minutes). Keeps the repo tiny.

## Lead form
- `app/api/lead/route.js` currently logs submissions server-side. Before launch, forward leads to your inbox/CRM:
  - Quickest: use **Resend** (`resend.com`, free tier) or a **Formspree**/**Google Sheet** webhook — replace the `console.log` line with a fetch to your endpoint.
  - Set any secrets as **Environment Variables** in Vercel → Settings → Environment Variables.

## Local preview of the production build
```bash
npm install
npm run build
npm start    # serves the production build on http://localhost:5174
```
