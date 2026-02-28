# Setup Guide

Follow these steps once before running the site.

---

## 1. Supabase

1. Go to https://supabase.com and create a free project.
2. In the dashboard go to **SQL Editor** and paste the contents of `supabase-schema.sql`, then run it.
3. In **Project Settings → API**, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

---

## 2. Cloudinary

1. Go to https://cloudinary.com and create a free account.
2. From the dashboard copy your **Cloud Name** → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
3. From **Settings → API Keys** copy your API Key and Secret.
4. Go to **Settings → Upload → Upload presets**, click **Add upload preset**:
   - Signing mode: **Unsigned**
   - Folder: `photos` (optional, keeps things tidy)
   - Save → copy the preset name → `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

---

## 3. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in all values in `.env.local`.

To generate `AUTH_SECRET` run:
```bash
openssl rand -base64 32
```
(or use any long random string)

---

## 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000

- **Upload photos**: http://localhost:3000/admin  (use your `ADMIN_PASSWORD`)

---

## 5. Deploy to Vercel

1. Push this repo to GitHub.
2. Go to https://vercel.com → Import project → select the repo.
3. In Vercel project settings → **Environment Variables**, add all variables from `.env.local`.
4. Deploy. Done.

---

## Site structure

| Page | URL |
|---|---|
| Home | `/` |
| All photos | `/gallery` |
| Albums list | `/albums` |
| Single album | `/albums/[slug]` |
| World map | `/map` |
| Country photos | `/map/[country-code]` |
| Admin upload | `/admin` |
