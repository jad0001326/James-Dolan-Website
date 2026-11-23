# James Dolan

Personal site for James Dolan, SOAR Engineer in PwC UK's Managed Cyber Defence team. This is a Next.js (App Router, TypeScript) rebuild of the static site that GitHub Pages serves at [jamesdolan.info](https://jamesdolan.info).

The previous HTML, CSS, JavaScript, and images are in [`legacy/`](legacy/). `CNAME` is unchanged at the repository root, so this branch does not remove the GitHub Pages custom-domain file. Do not merge until you are ready for Pages to stop publishing the old HTML. The cutover steps are below.

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm test
npm run lint
npm run build
npm start
```

With no `RESEND_API_KEY`, the contact form still validates and returns a demo-mode success. It does not send email.

## Environment variables

Copy `.env.example` to `.env.local`. Set the same values in the Vercel project. None of these belong in client code. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is the only public value, and only if you turn on Turnstile.

| Name | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | To send mail | Resend API key. If it is missing, the form runs in mock mode. |
| `CONTACT_TO_EMAIL` | To send mail | Inbox that receives messages. One address. |
| `CONTACT_FROM_EMAIL` | To send mail | Verified sender, for example `James Dolan <website@jamesdolan.info>`. |
| `CONTACT_DELIVERY` | No | Set to `mock` to skip Resend even when a key is present. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Cloudflare Turnstile site key. Public. |
| `TURNSTILE_SECRET_KEY` | No | Turnstile secret. Server-side. If set, submissions without a valid token are rejected. |

`onboarding@resend.dev` is a sandbox. It can only deliver to the email address on the Resend account. For a real inbox, verify the sending domain in Resend (SPF, DKIM, and a DMARC record) and send from that domain. A subdomain such as `mail.jamesdolan.info` keeps the apex domain's reputation separate.

The form checks the body with Zod, hides a honeypot field, rejects submits that arrive in under two seconds, and rate-limits each IP to 5 messages in 10 minutes on that server instance. Turnstile is the stronger check when the site is busy enough that in-memory limits are not enough. Reply-To is the visitor, so a reply goes to them. Messages are not added to a mailing list.

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home, with the current role and three case studies |
| `/about` | Retail to cyber, skills, education, running |
| `/experience` | Full role write-ups, visible, not in modals |
| `/projects` and `/projects/[slug]` | Anonymised case studies |
| `/certifications` | Held credentials and two that are still in progress |
| `/contact` | Contact form |
| `/cv` | Printable CV. Add `public/cv/james-dolan.pdf` for a file download |
| `/writing` | Empty on purpose. RSS is at `/writing/feed.xml` |

Old `.html` paths redirect to these routes.

## Adding a case study

Add `content/case-studies/your-slug.mdx`:

```mdx
---
title: Short title
summary: One or two sentences with no client name.
platform: D3 Smart SOAR
context: PwC UK, Managed Cyber Defence
period: 2026
order: 4
placeholder: true
---

## Problem

## Approach

## Outcome

<Placeholder>
Replace this with an approved, anonymised result.
</Placeholder>
```

Keep `placeholder: true` until the outcome is approved. The file is picked up by the projects index, the detail page, and the sitemap.

## Phase 2

The writing section, RSS feed, and search helper are the seams for a blog. An in-browser playbook demo has a static outline at `components/phase2/playbook-demo.tsx`.

1. **Posts.** Add `content/writing/note.mdx` with `title`, `summary`, and `publishedAt: YYYY-MM-DD`. It shows on `/writing`, `/writing/[slug]`, the sitemap, and `/writing/feed.xml`.
2. **Search.** `lib/content/search.ts` filters title and summary. `/writing` uses it once a post exists.
3. **Playbook demo.** Replace the outline in `components/phase2/playbook-demo.tsx` with the interactive component. The writing page already renders it.

## Deploy on Vercel, then point the domain

GitHub Pages is still the live site on `main`. This pull request does not change that until it is merged.

1. In Vercel, import this repository. Framework preset: Next.js. Root directory: the repository root. Do not change the GitHub Pages source or the DNS yet.
2. Add the environment variables above. Deploy the preview from this branch and walk the pages, including a contact-form submit.
3. In Resend, verify the domain you will send from before relying on real delivery.
4. When the preview looks right, add `jamesdolan.info` (and `www` if you want it) in the Vercel project domains screen. Vercel will show the DNS records. Do not switch DNS until the next step is done.
5. Merge this pull request only when you are ready for GitHub Pages to stop serving the old HTML. After the merge, `main` is a Next.js app, which Pages cannot build. Disable GitHub Pages so it does not keep claiming `jamesdolan.info` via the root `CNAME` file.
6. Point DNS at Vercel using the records from step 4. Remove the old GitHub Pages records.
7. Open `https://jamesdolan.info`, confirm the certificate, and send a real contact-form message.

To put the old site back, move `legacy/` to the repository root (the `CNAME` file is already there) and turn GitHub Pages back on. The pre-redesign commit on `main` is the other copy.

## Analytics

`@vercel/analytics` is included in the root layout. It records page views when the project is hosted on Vercel. It is not an advertising cookie.

## Link check

Outbound links were requested and checked while this version was built. Replacements:

- BCS CISMP moved to the current qualifications URL. The old `/get-qualified/...` path 404s.
- The old Palo Alto PCSAE page 404s, and the exam has been retired. The credential is still listed, and the link goes to the [certification portfolio](https://www.paloaltonetworks.com/services/education/certification).
- PCAP now points at `https://pythoninstitute.org/pcap`. The old path 404s, and `www.pythoninstitute.org` presents a certificate that does not match the host.
- Ce-CSP points at the current CAPSLOCK course page. The old site description called it a cloud certificate; the qualification is Certified Cyber Security Practitioner.
- Newbattle Abbey College's old access-course path 404s. The link is the college homepage.
- The Strathcarron 10K 2024 event URL 404s. The hospice homepage is linked instead. The copy does not claim a later race.
- `https://www.iso.org/standard/27001` is the current ISO/IEC 27001 page. Automated clients from this environment received HTTP 403; the page itself is the official standard record.
- LinkedIn returned HTTP 999 to a non-browser client, which is LinkedIn's bot response, not a missing profile. The path is the one already published on the site.
- PwC's UK homepage also returned 403 to the checker and is linked as the employer site.

The single old projects card ("Security Automation Platform", Flask and Docker) is not carried forward. It was one unsourced sentence and did not match the published role descriptions. The case studies replace it, and their outcomes are marked as placeholders where no approved figure exists.
