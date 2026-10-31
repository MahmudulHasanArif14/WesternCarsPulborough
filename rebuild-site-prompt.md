# Prompt: Rebuild site from UI reference with SEO + GEO + AEO

> Fill in the `{{...}}` values first. Attach `western-cars-billingshurst-site-reference.md` (or the reference-pack zip) and paste everything below into Claude, inside your existing project.

---

You are a senior full-stack engineer and technical SEO specialist. Rebuild the website in **this existing project**. Use the attached UI reference (`western-cars-billingshurst-site-reference.md` and screenshots) as the source of truth for layout, design and structure. The finished site must be production-ready and optimised for traditional SEO, **GEO** (generative engine optimisation: being cited by ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews) and **AEO** (answer engine optimisation: featured snippets, People Also Ask and voice).

## 0. Site variables (use everywhere, never hard-code the reference site's details)

- Brand name: {{Western Cars Pulborough}} (reference: Western Cars Billingshurst)
- Legal name + company no.: {{Western Cars Pulborough}},
- Primary town / region: {{Pulborough}}, {{West sussex,Uk}}
- Domain: {{https://www.westerncarspulborough.co.uk/}}
- Phone (display / E.164): {{+441798305555}} / {{+441798305555}}
- Email: {{info@westerncarspulborough.co.uk}}
-
- Geo coordinates (optional): {{LAT}}, {{LNG}}
- Opening hours: {{24/7}}
- Founded: {{2007}}
- Booking URL: {{https://westerncars.webbooker.icabbi.com/}}
- App URL: {{https://icab.bi/Western}}
- Socials (sameAs): {{facebook}}, {{[google business profile](https://share.google/rPx2AVgp47i5EGWg2)}}, {{others}}
- WhatsApp: {{(https://wa.me/447722489859)}} (must include the country code)
- Service areas: {{list of towns/villages}}
- Airports/ports served: {{Gatwick, Heathrow, Luton, Stansted, Southampton...}}
- Facts the content may state: {{fleet types, wheelchair access, fixed fares, licensing council, card payments, etc.}}

If a value is missing, use a clearly marked `TODO` placeholder. Never invent facts, prices, reviews, ratings, awards or statistics.

## 1. Work order

1. **Inspect first.** Read `package.json`, the framework config, the routing structure, the existing components, the Tailwind/CSS setup and any SEO helpers. Reuse what exists and follow the project's conventions. Don't add dependencies unless they're needed.
2. **Plan.** Give a short plan: the route map, the components to create or reuse, and the SEO architecture. Then continue without waiting unless something is destructive or truly ambiguous.
3. **Implement** in phases: design tokens → layout shell → shared components → pages → SEO/GEO/AEO layer → contact form backend.
4. **Validate** (see §8), fix problems, then report.

## 2. Stack rules

- Use the project's existing framework. If it's Next.js, use the App Router, Server Components by default, `"use client"` only for interactive parts (mobile menu, dropdown, accordion, cookie banner, form), the `metadata`/`generateMetadata` API, `next/image` and `next/font` (Raleway).
- Pages must be server-rendered or statically generated. All content and JSON-LD must be in the initial HTML, because AI crawlers don't run JavaScript.
- Use Tailwind with the reference's CSS variables (§2.1 of the reference) mapped in the Tailwind config the shadcn way (`primary: 'hsl(var(--primary))'`, plus `navy`). Icons: lucide-react.

## 3. UI: match the reference 1:1

- Reproduce every route and section in order, using the classes, spacing, colours, typography and copy patterns from the reference's §2, §4 and §5. Check each page against its screenshot (desktop and mobile).
- Layout shell: top bar → header (desktop hover dropdown, mobile accordion menu with "Transfers" and "Our Locations") → main → footer (3 columns, navy) → cookie banner.
- Shared components: TopBar, Header, MobileNav, Footer, CookieBanner, PageHero (image + gradient overlay), HomeHero, Section (white or muted, alternating), FeatureRow, InfoCard, FAQAccordion, CTABand, AppBadges, ContactForm, Breadcrumbs.
- Rewrite the copy for {{BRAND_NAME}} / {{TOWN}}. Keep the same section purpose and similar length, but make it **original**, not copied from the reference site (copied text counts as duplicate content).
- **Fix the reference site's bugs:** create real targets for every link. Either add `id` anchors on home for `our-services` and each location, or (better) give every location in "Our Locations" its own page. Correct the WhatsApp number. Add a proper `not-found` page that returns HTTP 404.

## 4. Routes

Keep the reference structure, adapted to {{TOWN}}:

- `/`
- `/about-us`
- `/contact-us`
- `/terms-conditions`
- one page per airport or port in {{Airports/ports}}
- **new:** one page per main service area (for example `/taxi-{{area}}`), each with unique local content: landmarks, stations, typical journeys, and journey times only if supplied
- optional: `/faq` hub and `/privacy-policy` (required if analytics or cookies are used)

Use lowercase hyphenated slugs, with no duplicate or near-duplicate pages. Every page must link to at least 3 related pages (internal-linking mesh: home ↔ services ↔ areas ↔ airports).

## 5. Technical SEO

- Per-route unique `<title>` (≤60 chars, keyword + {{TOWN}} + brand) and meta description (≤155 chars, includes the phone number or a call to action).
- Self-referencing canonical, `lang="en-GB"`, Open Graph and Twitter tags with a real 1200×630 image per page type.
- `sitemap.xml` (all indexable routes with `lastmod`), `robots.txt` (allow all, sitemap URL), and the `metadataBase`/site URL set from an environment variable.
- Exactly one H1 per page, logical H2/H3 order, and descriptive `alt` text on every image.
- Core Web Vitals: priority-load the hero image only, set width and height on every image to stop layout shift, use AVIF/WebP and lazy-load images below the first screen. Keep client JS minimal and self-host the font with `display: swap`.
- Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), and HTTPS-only links.

## 6. Structured data (JSON-LD, server-rendered, validated)

- **Site-wide:** `Organization` + `TaxiService` (also typed `LocalBusiness`) with one stable `@id` (`{{domain}}/#organization`). Include name, legalName, url, logo, image, telephone, email, address, geo, areaServed (each area as a `Place`), openingHoursSpecification, priceRange, foundingDate and `sameAs`. Add a `WebSite` entity.
- **Every inner page:** `BreadcrumbList` + `WebPage` (with `about` and `isPartOf`).
- **Airport, port and area pages:** a `Service` with `serviceType`, `provider` → `#organization`, and `areaServed`.
- **Any page with FAQs:** `FAQPage`, where the questions and answers match the visible text word for word.
- Never add `AggregateRating`/`Review` unless real, verifiable reviews are shown on the page.

## 7. GEO + AEO content rules

- **Answer first:** under each H2 phrased as a question ("How much is a taxi from {{TOWN}} to Gatwick?"), the first paragraph is a direct 40–60 word answer. Supporting detail comes after.
- Each airport, port and area page has an FAQ section of 4–6 real customer questions with concise, factual answers, and uses the accordion component. Answers stay in the HTML even when collapsed.
- **Key facts block** on home, about and each service page: a short list of who, where, hours, vehicles, payment, booking methods and phone number. These are easy for AI to extract and cite.
- **Entity consistency:** exactly the same name, phone, address, email and hours on every page, in the footer, in the schema and on Google Business Profile.
- Use clear, specific, citable sentences with named places, terminals and real distances (only when provided). Avoid vague marketing filler.
- Show "Last updated" dates on service pages, matching `dateModified` in the schema.
- Add `/llms.txt`: a brand summary, key facts and links to the main pages with one-line descriptions.
- `robots.txt` must allow AI and search crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Bingbot, Googlebot) unless I say otherwise.
- Use semantic HTML (`header`, `nav`, `main`, `article`, `section`, `footer`, `address`), and `<table>` for any fare or comparison data.

## 8. Contact form and security

- Server-side handler (Server Action or API route) that validates input with a schema. Include a honeypot field, rate limiting, a length limit on every field, and safe error messages.
- Secrets live only in server environment variables, never in client code. Provide `.env.example`.
- Accessible labels, inline errors, and success and failure states.
- The cookie banner must block non-essential scripts until consent is given.

## 9. Validation (actually run these)

- Type check, lint and a production build.
- For every route: HTTP 200, unique title, description and canonical, one H1, and no broken internal links or anchors (write a quick link-check script). Unknown URLs must return 404.
- Parse every JSON-LD block, check it against the Schema.org shapes, and confirm the FAQ schema matches the visible text.
- Lighthouse (mobile) on home plus one service page: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- Check the rendered HTML **without JavaScript** to confirm the content and schema are present.
- Visually compare against the reference screenshots at 1440px and 390px.

## 10. Final report

Report in this format:

- **Changed:** routes and components created, and key decisions.
- **Validated:** the checks that were run, with results.
- **Remaining:** TODO placeholders that need real data, plus anything not done.
- **Next step:** for example, set up Google Business Profile and Search Console, submit the sitemap, and gather real reviews.
