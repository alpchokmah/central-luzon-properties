# Central Luzon Properties

A custom, server-rendered estate discovery website. No runtime dependencies. Requires Node.js 22+.

## Run

```sh
npm run dev
```

Open http://localhost:3000. For configured environments, use `node --env-file=.env server.mjs` after copying `.env.example` to `.env` and editing it.

## Included

- Home page with area, developer and property-type filters.
- Why Central Luzon page (`/why-central-luzon`) on investing and building a life in the region, linked from the main nav beside Good to know.
- Partner with us page (`/partner-with-us`) for owners, brokers and developers who want to feature properties, with a dedicated form saved to `data/partners.csv` and a Google Sheets **Partners** tab when configured.
- Individually crawlable Cresendo, Alviera and TARI pages with on-site estate profiles (summarized from developer materials) and an actual Google Flow-generated 8-second 720p film each.
- Responsive layouts, keyboard controls, native FAQ disclosures, pause/resume and reduced-motion support.
- Inquiry form with server-side validation, consent, honeypot and rate limiting.
- Private CSV lead storage in `data/leads.csv`; compatible with Excel and Google Sheets imports. This is local/server storage, not automatic Google Sheets sync. No email is sent by the form.
- Canonicals, per-page metadata, JSON-LD WebSite/Place/FAQPage, XML sitemap and robots.txt. No ranking or AI-answer inclusion guarantees.

## Lead spreadsheet

When `GOOGLE_SHEETS_ID` and `GOOGLE_SERVICE_ACCOUNT_FILE` are set in `.env`, each inquiry is appended to the Google Sheet tab (default `Leads`) and also saved to `data/leads.csv` as a local backup. Partnership requests go to the **Partners** tab (`GOOGLE_SHEETS_PARTNERS_TAB`, created automatically if missing) and `data/partners.csv`. Share the sheet with the service account `client_email` as **Editor**. Keep the JSON key out of git (already gitignored).

Without those env vars, only the local CSV is used. Open `data/leads.csv` in Excel or import into Google Sheets manually if needed.

For remote CSV export, set `LEADS_EXPORT_TOKEN` and request `GET /admin/leads.csv` with `Authorization: Bearer <token>`. No token is embedded in the browser. For multiple server instances, replace local CSV writes with shared transactional storage; this version serializes writes within a single Node process.

## Public deployment

This delivery is a working local website, not a public deployment. The Sites plugin disappeared from the available installation during setup, so no managed Sites deployment was performed.

Deploy on a Node host with a persistent private data volume. Configure HTTPS, `SITE_URL` to the public domain, `HOST=0.0.0.0` if required by the host, `PORT`, `DATA_DIR`, and an export token. Do not deploy the filesystem-backed form onto ephemeral/serverless storage without replacing persistence. Back up the lead directory. Confirm the named partner's identity/contact information, privacy contact and actual inventory before promoting publicly. Behind a reverse proxy, configure rate limiting at the proxy; this server intentionally does not trust arbitrary forwarded IP headers.

## Verification

```sh
npm test
```

Checks cover consent, input validation, formula-safe CSV output and concurrent persistence. Browser verification covered area filtering, no-match house-and-lot state, mobile rendering, estate video playback and inquiry submission. The server only serves allowlisted public file types and protects the CSV export with a bearer secret.

## Content and video provenance

See `SOURCES.md`. Estate profiles do not assert live inventory or prices. House-and-lot is an inquiry preference, not a fabricated listing. All three Flow films are clearly marked AI-generated lifestyle concepts, not representations of actual built amenities.
