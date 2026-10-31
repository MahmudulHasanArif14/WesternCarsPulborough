# Website Reference — Western Cars Billingshurst
Source: https://westerncarsbillingshurst.co.uk  ·  Extracted: 2026-10-31  ·  10 routes (from /sitemap.xml + every nav link)

> **For Claude:** this file is a complete build reference. Use it to rebuild the site 1:1 (same routes, layout, copy, classes, colours) or as a template for a sister site (swap brand name, town, phone, areas). Section outlines below list every element in DOM order as
> `TAG: text  {tailwind classes}  STYLE="inline style"  [computed bg/color]`. Indentation = nesting. `[a href=…]` / `[button]` = links/buttons, `IMG(...)` = images inside them. Classes are Tailwind v3 utility classes; colours come from the CSS variables in §2 (`hsl(var(--primary))` etc.).

---
## 1. Tech stack (observed)
- **React SPA** built with **Vite** (`/assets/index-*.js`, `/assets/index-*.css`), client routing via **React Router** (`data-discover` attrs), routes also pre-rendered/served on direct load.
- **Tailwind CSS v3** + **shadcn/ui** design tokens (HSL CSS variables, `--radius`, `bg-primary text-primary-foreground` button variants).
- Icons: **lucide-react** (chevron-down, menu, phone, mail, map-pin, check, info, clock, car, etc.). Facebook/WhatsApp are inline SVG brand icons.
- Font: **Raleway** (Google Fonts `@import`, weights 400–700) for body and headings.
- Built with GoDaddy **Airo** site builder (`/airo-assets/...`, `airo-video-slots.js`, `airo-logo-orientation.js`, GoDaddy `scc-c2` signals + `/analytics.js`).
- Contact form: client-side `fetch("/api/contact/contact-us")` (POST JSON), honeypot field `_gotcha` positioned off-screen.
- Booking: external iCabbi web booker `https://westerncars.webbooker.icabbi.com/` (opens new tab); app download link `https://icab.bi/Western`.
- Cookie consent banner (fixed bottom) with Decline / Accept.
- No dark mode.

---
## 2. Design system

### 2.1 Colour tokens (`:root`, values are `H S% L%` used as `hsl(var(--x))`)
| Token | HSL | Hex | Used for |
|---|---|---|---|
| `--background` | `0 0% 100%` | #FFFFFF |  |
| `--foreground` | `0 0% 4%` | #0A0A0A | Body text |
| `--card` | `0 0% 100%` | #FFFFFF |  |
| `--card-foreground` | `0 0% 4%` | #0A0A0A |  |
| `--popover` | `0 0% 100%` | #FFFFFF |  |
| `--popover-foreground` | `0 0% 4%` | #0A0A0A |  |
| `--primary` | `224 46% 44%` | #3D58A4 | Top bar, hero accents, H2s on inner pages, primary buttons, CTA band bg, service-areas band bg |
| `--primary-foreground` | `0 0% 100%` | #FFFFFF |  |
| `--secondary` | `254 46% 44%` | #553DA4 | Cookie "Decline" button |
| `--secondary-foreground` | `0 0% 100%` | #FFFFFF |  |
| `--muted` | `225 14% 84%` | #D0D3DC | Alternating light section bg (light grey-blue), info cards |
| `--muted-foreground` | `0 0% 45%` | #737373 | Secondary text |
| `--accent` | `217 80% 48%` | #1864DC | Home hero H2 + phone link + H2 "Welcome" colour (#1864DC computed) |
| `--accent-foreground` | `0 0% 100%` | #FFFFFF |  |
| `--destructive` | `0 84% 60%` | #EF4343 |  |
| `--destructive-foreground` | `0 0% 100%` | #FFFFFF |  |
| `--success` | `160 84% 39%` | #10B77F |  |
| `--success-foreground` | `0 0% 100%` | #FFFFFF |  |
| `--warning` | `38 92% 50%` | #F59F0A |  |
| `--warning-foreground` | `0 0% 100%` | #FFFFFF |  |
| `--info` | `217 91% 60%` | #3C83F6 |  |
| `--info-foreground` | `0 0% 100%` | #FFFFFF |  |
| `--border` | `0 0% 85%` | #D9D9D9 | Borders, dividers |
| `--input` | `0 0% 85%` | #D9D9D9 |  |
| `--ring` | `224 46% 44%` | #3D58A4 |  |
| `--chart-1` | `223 47% 74%` | #9EAFDC |  |
| `--chart-2` | `224 46% 59%` | #6680C7 |  |
| `--chart-3` | `224 46% 44%` | #3D58A4 |  |
| `--chart-4` | `223 46% 28%` | #273968 |  |
| `--chart-5` | `225 45% 14%` | #141C34 |  |
| `--sidebar` | `225 14% 84%` | #D0D3DC |  |
| `--sidebar-foreground` | `0 0% 4%` | #0A0A0A |  |
| `--sidebar-primary` | `224 46% 44%` | #3D58A4 |  |
| `--sidebar-primary-foreground` | `0 0% 100%` | #FFFFFF |  |
| `--sidebar-accent` | `217 80% 48%` | #1864DC |  |
| `--sidebar-accent-foreground` | `0 0% 100%` | #FFFFFF |  |
| `--sidebar-border` | `0 0% 85%` | #D9D9D9 |  |
| `--sidebar-ring` | `224 46% 44%` | #3D58A4 |  |
| `--navy` | `225 45% 14%` | #141C34 | Footer bg, "Download app" section bg |
| `--navy-foreground` | `0 0% 100%` | #FFFFFF |  |

Non-colour tokens:
```css
--font-sans: "Raleway", -apple-system, BlinkMacSystemFont, sans-serif;
--font-heading: "Raleway", -apple-system, BlinkMacSystemFont, sans-serif;
--font-serif: ui-serif, Georgia, "Times New Roman", serif;
--font-mono: ui-monospace, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace;
--radius: .5rem;
--radius-button: calc(var(--radius) - 2px);
--space-xs: .5rem;
--space-sm: 1rem;
--space-base: 1.5rem;
--space-lg: 2rem;
--space-xl: 3rem;
--space-xxl: 4rem;
--space-xxxl: 6rem;
--width-content: 72rem;
--shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / .05);
--shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / .05);
--shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / .1), 0 1px 2px -1px hsl(0 0% 0% / .1);
--shadow: 0 1px 3px 0px hsl(0 0% 0% / .1), 0 1px 2px -1px hsl(0 0% 0% / .1);
--shadow-md: 0 1px 3px 0px hsl(0 0% 0% / .1), 0 2px 4px -1px hsl(0 0% 0% / .1);
--shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / .1), 0 4px 6px -1px hsl(0 0% 0% / .1);
--shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / .1), 0 8px 10px -1px hsl(0 0% 0% / .1);
--shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / .25);
```

Key computed colours actually rendered: primary `rgb(61,88,164)` #3D58A4 · navy footer `rgb(20,28,52)` #141C34 · accent blue `rgb(24,100,220)` #1864DC · muted section bg #D0D3DC · body text `rgb(10,10,10)` · muted text `rgb(115,115,115)` · white `#FFFFFF`.

### 2.2 Typography
- Family everywhere: `"Raleway", -apple-system, BlinkMacSystemFont, sans-serif` (`--font-sans` and `--font-heading`). Load: `@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap');`
- Body: 16px / 24px, weight 400, colour #0A0A0A. Most body copy uses `text-sm` (14px) + `leading-relaxed`.
- Home H1: `text-3xl md:text-5xl font-bold leading-tight` uppercase text, white (48px desktop).
- Page-hero H1 (inner pages): `text-3xl md:text-5xl font-bold`, white, centred.
- Section H2: `text-2xl md:text-3xl font-bold`, colour `hsl(var(--primary))`, `font-family: var(--font-heading)`.
- H3 / card titles: `text-base`/`text-lg font-bold`.
- Footer headings: `text-base font-bold uppercase tracking-wide`.
- Nav links: `text-sm font-semibold`, hover `text-primary`.
- Headings use inline `white-space: pre-line` (copy can contain line breaks).

### 2.3 Layout & spacing
- Content container: `max-w-7xl mx-auto px-4` (header/footer/home); inner-page text columns `max-w-4xl mx-auto`; contact `max-w-5xl`; CTA `max-w-2xl`.
- Section rhythm: `py-14` (56px) standard, page hero `py-16`/`py-20` with bg image + dark overlay, header bar `h-20`.
- Inner pages alternate sections **white** ↔ **muted (`hsl(var(--muted))`)** backgrounds, ending with a **primary-blue CTA band** then footer.
- Grids: `grid grid-cols-1 md:grid-cols-2 gap-8/10`, area lists `grid-cols-2 sm:grid-cols-3 md:grid-cols-4`.
- Radius `--radius: .5rem` (cards `rounded-lg`, buttons `rounded`), shadows mostly `shadow-lg`.
- Breakpoints = Tailwind defaults (sm 640, md 768, lg 1024 — desktop nav appears at `lg`).

### 2.4 Reusable components / patterns
- **Top bar**: full-width `hsl(var(--primary))`, right-aligned white `text-sm font-medium` "Call Us 24/7 : 01403 272727".
- **Primary button**: `px-6 py-3 rounded font-bold text-sm text-white` bg `hsl(var(--primary))` (or accent on home hero), `hover:opacity-90`.
- **Outline button**: white bg, 2px primary border, primary text (inner-page intro "Book Online").
- **White button on blue**: bg white, text primary (service-areas band, CTA band).
- **Home hero**: `<section class="relative min-h-[520px] md:min-h-[600px] flex items-center" style="background:hsl(var(--navy))">` → `<img class="absolute inset-0 w-full h-full object-cover">` → overlay `<div class="absolute inset-0 bg-gray-900/65 pointer-events-none">` → 2-col content (text left, phone mockup right).
- **Page hero (inner)**: `relative h-72 md:h-96 flex items-center justify-center text-white text-center overflow-hidden`, bg `<img>` + overlay `absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/75`, centred H1 + subtitle `opacity-90 max-w-xl`. Contact/About/Terms use a plain primary-colour band (`py-12`) instead of an image.
- **Heading divider**: `<div class="mx-auto w-20 h-1 rounded" style="background:hsl(var(--primary))">` under centred section titles.
- **Feature row** (home "Why Choose Us"): `w-14 h-14 rounded` primary-blue icon tile (white `w-7 h-7` icon) + H3 + `text-sm` paragraph.
- **Info cards** (e.g. "Both Gatwick Terminals Covered"): white `rounded-lg border shadow-sm` card with primary dot bullet, bold title, muted sub-text.
- **FAQ accordion**: `border border-border rounded-lg overflow-hidden` items, button `w-full flex justify-between px-5 py-4 text-left font-semibold text-sm hover:bg-muted/40` + lucide chevron-down (rotates when open); answer `px-5 pb-4 text-sm leading-relaxed border-t border-border`. Single item open at a time.
- **CTA band**: `py-14 px-4 text-white text-center` bg primary, H2 + paragraph + phone & Book Online buttons.
- **App store badges**: Google Play + App Store badge images linking to `https://icab.bi/Western` (new tab).
- **Cookie banner**: fixed bottom white bar, H3 "Cookie Consent", text, Decline (`bg-secondary`) + Accept (`bg-primary`) `h-9` buttons.

---
## 3. Routes / sitemap
| Route | Nav label | Title tag |
|---|---|---|
| `/` | Home | Western Cars Billingshurst \| Taxi & Private Hire \| 01403 272727 |
| `/about-us` | About Us | About Us – Western Cars Billingshurst \| Taxi Service Since 2007 |
| `/airport-transfers` | Heathrow Airport Transfers | Heathrow Airport Transfers – Western Cars Billingshurst \| 01403 272727 |
| `/horsham-to-gatwick-transfers` | Gatwick Airport Transfers | Billingshurst to Gatwick Airport Taxis – Western Cars Billingshurst \| 01403 272727 |
| `/luton-airport-transfer` | Luton Airport Transfer | Luton Airport Transfers from Billingshurst – Western Cars \| 01403 272727 |
| `/stansted-airport-transfers` | Stansted Airport Transfers | Stansted Airport Transfers from Billingshurst – Western Cars \| 01403 272727 |
| `/western-cars-airport-transfers-billinghurst` | Billingshurst Airport Transfers | Airport Transfers from Billingshurst – Western Cars \| 01403 272727 |
| `/southampton-seaport-transfers` | Southampton Seaport Transfers | Southampton Seaport Transfers from Billingshurst – Western Cars \| 01403 272727 |
| `/contact-us` | Contact Us | Contact Us – Western Cars Billingshurst \| 01403 272727 |
| `/terms-conditions` | Terms & Conditions | Terms & Conditions – Western Cars Billingshurst Ltd |

Unknown routes (e.g. `/does-not-exist`) render the SPA shell with the home title (no dedicated 404 page).

### 3.1 Navigation map
**Desktop header nav** (`lg:flex`): Home · Transfers ▾ (hover dropdown: Heathrow Airport Transfers → `/airport-transfers`, Gatwick Airport Transfers → `/horsham-to-gatwick-transfers`, Luton Airport Transfer → `/luton-airport-transfer`, Stansted Airport Transfers → `/stansted-airport-transfers`, Billingshurst Airport Transfers → `/western-cars-airport-transfers-billinghurst`, Southampton Seaport Transfers → `/southampton-seaport-transfers`) · About Us · Contact Us · Terms & Conditions.

**Mobile nav** (hamburger `lucide-menu`, below `lg`): Home · Transfers ▾ (same 6 links, `px-8 py-2 text-sm border-b border-border/50`) · **Our Locations ▾** (Billingshurst Taxis `/#billingshurst-taxis`, Rudgwick Taxi Service `/#rudgwick-taxi`, Southwater Taxi Service `/#southwater`, Warnham Taxi Service `/#warnham-taxi-service`, Broadbridge Heath Taxi `/#broadbridge-heath-taxi`, Henfield Taxi Service `/#henfield-taxi`, Cowfold Taxi Service `/#cowfold-taxi`) · About Us · Contact Us · Terms & Conditions.

**Footer Quick Links**: Book Now (iCabbi) · Our Taxi Services `/#our-services` · Taxi from Horsham to Gatwick Airport · Heathrow Airport Transfers · Billingshurst Taxi `/#billingshurst-taxis` · Contact · Terms & Conditions.

**External links**: `tel:01403272727` · `mailto:info@westerncars.co.uk` · `https://westerncars.webbooker.icabbi.com/` · `https://icab.bi/Western` · `https://www.facebook.com/westerncarshorsham` · `https://wa.me/1293850400?text=Book`.

⚠️ Issues found (fix when rebuilding): the home page has **no elements with ids** `our-services`, `billingshurst-taxis`, `rudgwick-taxi`, `southwater`, `warnham-taxi-service`, `broadbridge-heath-taxi`, `henfield-taxi`, `cowfold-taxi`, `portsmouth-port-transfers` — those anchor links just land on the top of home. The WhatsApp link `wa.me/1293850400` is missing the UK country code (should be `wa.me/441293850400`).

---
## 4. Global layout (identical on every route)

### 4.1 Header (exact HTML, svgs collapsed)
```html
<header style="font-family: var(--font-sans);"><div class="text-right px-4 py-2 text-sm font-medium text-white" style="background: hsl(var(--primary));">Call Us 24/7 : 01403 272727</div><div class="bg-white border-b border-border"><div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-20"><a class="flex-shrink-0" href="/" data-discover="true"><img alt="Western Cars Billingshurst" class="block h-auto max-h-14 w-auto max-w-[200px] object-contain" src="/airo-assets/images/logo/horizontal" data-airo-logo-corrected="horizontal" style="filter: none;"></a><nav aria-label="Main navigation" class="hidden lg:flex items-center gap-1"><a class="px-3 py-2 text-sm font-semibold hover:text-primary transition-colors" href="/" data-discover="true" style="color: hsl(var(--foreground));">Home</a><div class="relative group"><button class="flex items-center gap-1 px-3 py-2 text-sm font-semibold hover:text-primary transition-colors" style="color: hsl(var(--foreground));">Transfers <svg/></button><div class="absolute top-full left-0 z-50 hidden group-hover:block bg-white border border-border shadow-lg min-w-[240px] py-1"><a class="block px-4 py-2 text-sm hover:bg-muted transition-colors" href="/airport-transfers" data-discover="true" style="color: hsl(var(--foreground));">Heathrow Airport Transfers</a><a class="block px-4 py-2 text-sm hover:bg-muted transition-colors" href="/horsham-to-gatwick-transfers" data-discover="true" style="color: hsl(var(--foreground));">Gatwick Airport Transfers</a><a class="block px-4 py-2 text-sm hover:bg-muted transition-colors" href="/luton-airport-transfer" data-discover="true" style="color: hsl(var(--foreground));">Luton Airport Transfer</a><a class="block px-4 py-2 text-sm hover:bg-muted transition-colors" href="/stansted-airport-transfers" data-discover="true" style="color: hsl(var(--foreground));">Stansted Airport Transfers</a><a class="block px-4 py-2 text-sm hover:bg-muted transition-colors" href="/western-cars-airport-transfers-billinghurst" data-discover="true" style="color: hsl(var(--foreground));">Billingshurst Airport Transfers</a><a class="block px-4 py-2 text-sm hover:bg-muted transition-colors" href="/southampton-seaport-transfers" data-discover="true" style="color: hsl(var(--foreground));">Southampton Seaport Transfers</a></div></div><a class="px-3 py-2 text-sm font-semibold hover:text-primary transition-colors" href="/about-us" data-discover="true" style="color: hsl(var(--foreground));">About Us</a><a class="px-3 py-2 text-sm font-semibold hover:text-primary transition-colors" href="/contact-us" data-discover="true" style="color: hsl(var(--foreground));">Contact Us</a><a class="px-3 py-2 text-sm font-semibold hover:text-primary transition-colors" href="/terms-conditions" data-discover="true" style="color: hsl(var(--foreground));">Terms &amp; Conditions</a></nav><button class="lg:hidden p-2" aria-label="Toggle navigation"><svg/></button></div></div></header>
```
Mobile menu (open state):
```html
<!-- rendered inside header, after the h-20 bar, only when menu open -->
<nav aria-label="Mobile navigation" class="lg:hidden border-t border-border bg-white pb-4">
  <a class="block px-4 py-3 text-sm font-semibold border-b border-border" href="/">Home</a>
  <div><button class="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold border-b border-border">Transfers <ChevronDown/></button>
    <!-- when expanded: 6 transfer links, each: class="block px-8 py-2 text-sm border-b border-border/50" -->
  </div>
  <div><button class="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold border-b border-border">Our Locations <ChevronDown/></button>
    <!-- when expanded: 7 location links (see 3.1), same sub-link classes -->
  </div>
  <a class="block px-4 py-3 text-sm font-semibold border-b border-border" href="/about-us">About Us</a>
  <a class="block px-4 py-3 text-sm font-semibold border-b border-border" href="/contact-us">Contact Us</a>
  <a class="block px-4 py-3 text-sm font-semibold" href="/terms-conditions">Terms &amp; Conditions</a>
</nav>
```

### 4.2 Footer
`<footer>` bg `hsl(var(--navy))` (#141C34), text white, `font-family: var(--font-sans)`.
```
<div>  {max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8}
  <div>
    H3: About Western Cars  {text-base font-bold mb-4 uppercase tracking-wide} STYLE="font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Western Cars has been dedicated to delivering the best taxi services in Billingshurst since 2007. Specialising in Airport Transfers to all major UK Airports, we offer seamless journeys, including reliable taxis from Billingshurst to Gatwick and Heathrow Airport. Our range of taxi services include Private Hire Taxis, Group Taxis, and VIP Chauffeuring, all based in Billingshurst, West Sussex.  {text-sm leading-relaxed opacity-80} [computed color=rgb(255, 255, 255)]
  <div>
    H3: Quick Links  {text-base font-bold mb-4 uppercase tracking-wide} STYLE="font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    <ul>  {space-y-2 text-sm opacity-80}
      <li> [computed color=rgb(255, 255, 255)]
        [a href=https://westerncars.webbooker.icabbi.com/] "Book Now"  {hover:opacity-100 transition-opacity} [computed color=rgb(255, 255, 255)]
      <li> [computed color=rgb(255, 255, 255)]
        [a href=/#our-services] "Our Taxi Services"  {hover:opacity-100 transition-opacity} [computed color=rgb(255, 255, 255)]
      <li> [computed color=rgb(255, 255, 255)]
        [a href=/horsham-to-gatwick-transfers] "Taxi from Horsham to Gatwick Airport"  {hover:opacity-100 transition-opacity} [computed color=rgb(255, 255, 255)]
      <li> [computed color=rgb(255, 255, 255)]
        [a href=/airport-transfers] "Heathrow Airport Transfers"  {hover:opacity-100 transition-opacity} [computed color=rgb(255, 255, 255)]
      <li> [computed color=rgb(255, 255, 255)]
        [a href=/#billingshurst-taxis] "Billingshurst Taxi"  {hover:opacity-100 transition-opacity} [computed color=rgb(255, 255, 255)]
      <li> [computed color=rgb(255, 255, 255)]
        [a href=/contact-us] "Contact"  {hover:opacity-100 transition-opacity} [computed color=rgb(255, 255, 255)]
      <li> [computed color=rgb(255, 255, 255)]
        [a href=/terms-conditions] "Terms & Conditions"  {hover:opacity-100 transition-opacity} [computed color=rgb(255, 255, 255)]
  <div>
    H3: Contact Us  {text-base font-bold mb-4 uppercase tracking-wide} STYLE="font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    <address>  {not-italic text-sm opacity-80 space-y-2}
      <div>  {flex items-center gap-2}
        ICON {lucide lucide-phone w-4 h-4 flex-shrink-0}
        [a href=tel:01403272727] "T: 01403 272727"  {hover:opacity-100 transition-opacity} [computed color=rgb(255, 255, 255)]
      <div>  {flex items-center gap-2}
        ICON {lucide lucide-mail w-4 h-4 flex-shrink-0}
        [a href=mailto:info@westerncars.co.uk] "E: info@westerncars.co.uk"  {hover:opacity-100 transition-opacity} [computed color=rgb(255, 255, 255)]
    <div>  {flex gap-4 mt-4}
      [a href=https://www.facebook.com/westerncarshorsham target=_blank] "" [icon w-6 h-6 fill-current]  {opacity-80 hover:opacity-100 transition-opacity} [computed color=rgb(255, 255, 255)]
      [a href=https://wa.me/1293850400?text=Book target=_blank] "" [icon w-6 h-6 fill-current]  {opacity-80 hover:opacity-100 transition-opacity} [computed color=rgb(255, 255, 255)]
div: © Copyright 2026 – Western Cars Billingshurst Ltd. Registered Company in England & Wales No: 16038694  {border-t text-center py-4 text-xs opacity-70} STYLE="border-color: hsl(var(--primary) / 0.4);"
```

### 4.3 Cookie banner
```html
<div class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg" role="alertdialog" aria-live="polite" aria-label="Cookie consent banner" aria-describedby="cookie-banner-description" data-airo-non-editable="true"><div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div class="flex-1"><h3 class="text-sm font-semibold text-gray-900 mb-1">Cookie Consent</h3><p id="cookie-banner-description" class="text-sm text-gray-600">We serve cookies. We use tools, such as cookies, to enable essential services and functionality on our site and to collect data on how visitors interact with our site, products and services. By clicking Accept, you agree to our use of these tools for advertising, analytics and support.</p></div><div class="flex items-center gap-3 flex-shrink-0"><button class="inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-[var(--radius-button)] px-3 whitespace-nowrap">Decline</button><button class="inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-[var(--radius-button)] px-3 whitespace-nowrap">Accept</button></div></div></div></div>
```

---
## 5. Pages (section-by-section, full copy)

### 5.1 Home — `/`

- **Title:** Western Cars Billingshurst | Taxi & Private Hire | 01403 272727
- **Meta description:** Western Cars Billingshurst — 24/7 taxi and private hire service in Horsham & Billingshurst, West Sussex. Airport transfers to Gatwick, Heathrow, Stansted & more. Call 01403 272727.
- **Canonical:** https://westerncarsbillingshurst.co.uk/
- **OG/Twitter:** `og:title=Western Cars Billingshurst | Taxi & Private Hire` · `og:description=24/7 taxi and private hire in Billingshurst, West Sussex. Airport transfers to Gatwick, Heathrow & more.` · `og:url=https://westerncarsbillingshurst.co.uk` · `og:type=website` · `og:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/hero-bg` · `twitter:card=summary_large_image` · `twitter:title=Western Cars Billingshurst | Taxi & Private Hire` · `twitter:description=24/7 taxi and private hire in Billingshurst, West Sussex. Airport transfers to Gatwick, Heathrow & more.` · `twitter:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/hero-bg`
- Screenshots: `shots/home-desktop.jpg`, `-mobile.jpg`

JSON-LD:
```json
{"@context":"https://schema.org","@type":"Organization","@id":"https://westerncarsbillingshurst.co.uk/#organization","name":"Western Cars Billingshurst","url":"https://westerncarsbillingshurst.co.uk/"}
{"@context":"https://schema.org","@type":"TaxiService","@id":"https://westerncarsbillingshurst.co.uk/#organization","name":"Western Cars Billingshurst","url":"https://westerncarsbillingshurst.co.uk","telephone":"+441403272727","email":"info@westerncars.co.uk","address":{"@type":"PostalAddress","addressLocality":"Billingshurst","addressRegion":"West Sussex","postalCode":"RH14 9NY","addressCountry":"GB"},"areaServed":["Billingshurst","Horsham","Southwater","Mannings Heath","Slinfold","Rudgwick","Broadbridge Heath","Warnham","West Sussex"],"openingHours":"Mo-Su 00:00-23:59","priceRange":"££","description":"24/7 taxi and private hire service in Billingshurst and West Sussex. Specialising in airport transfers to Gatwick, Heathrow, Luton, Stansted and Southampton seaport."}
```

Structure:
```
<section>  {relative min-h-[520px] md:min-h-[600px] flex items-center} STYLE="background: hsl(var(--navy));" [computed bg=rgb(20, 28, 52)]
  IMG src=/airo-assets/images/pages/home/hero-bg alt="Western Cars fleet" 2048x1536  {absolute inset-0 w-full h-full object-cover}
  DECOR <div>  {absolute inset-0 bg-gray-900/65 pointer-events-none} [computed bg=rgba(17, 24, 39, 0.65)]
  <div>  {relative z-10 max-w-7xl mx-auto px-4 py-16 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center}
    <div>  {text-white}
      H1: WESTERN CARS BILLINGSHURST  {text-3xl md:text-5xl font-bold mb-2 leading-tight} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
      H2: BILLINGSHURST TAXI HIRE  {text-xl md:text-2xl font-semibold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--accent));" [computed color=rgb(24, 100, 220)]
      p: Book a Cab on the go or use our online service. Just Compare.  {text-base md:text-lg mb-5 opacity-90} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
      <div>  {flex items-center gap-2 mb-5}
        ICON {lucide lucide-phone w-5 h-5} STYLE="color: hsl(var(--accent));"
        [a href=tel:01403272727] "01403 272727"  {text-2xl font-bold hover:opacity-80 transition-opacity} STYLE="white-space: pre-line; color: hsl(var(--accent));" [computed color=rgb(24, 100, 220)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-6 py-3 rounded font-bold text-white text-sm mb-6 hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--accent));" [computed bg=rgb(24, 100, 220) color=rgb(255, 255, 255)]
      <div>  {flex gap-3 flex-wrap}
        [a href=https://icab.bi/Western target=_blank] "" IMG(/assets/images/a070d400fe2022914f4ce75433ed0eb6.png alt="Download on Google Play" {h-12 w-auto object-contain}) [computed color=rgb(255, 255, 255)]
        [a href=https://icab.bi/Western target=_blank] "" IMG(/assets/images/2ec15a8e3de087170519b9bd2faf03dd.png alt="Download on the App Store" {h-12 w-auto object-contain}) [computed color=rgb(255, 255, 255)]
    <div>  {flex justify-center}
      IMG src=/assets/images/be864ae5cb7de32d3c150ca6689fb8c0.png alt="Western Cars booking app on smartphone" 375x510  {max-h-80 w-auto object-contain drop-shadow-2xl}
<section>  {py-14 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-7xl mx-auto px-4}
    <div>  {text-center mb-8}
      H2: Welcome to Western Cars & Taxis  {text-3xl md:text-4xl font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
      p: Taxi Service For Billingshurst  {text-lg italic mb-3} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      DECOR <div>  {mx-auto w-20 h-1 rounded} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
    <div>  {grid grid-cols-1 md:grid-cols-2 gap-10 items-start}
      <div>  {text-sm leading-relaxed space-y-4} STYLE="color: hsl(var(--foreground));"
        <div>
          p: Taxi Service for Billingshurst, East & West Sussex  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: At Western Cars, we provide private hire transport in Billingshurst across East and West Sussex. Need to get to a major transport hub like a railway station or airport? We've got you covered. Our airport transfers can take you to whichever major UK airport you need to get to, including Gatwick and Heathrow Airport. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
        <div>
          p: Book A London Airport Transfer  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: Whether you're travelling as a business or individual client, we offer unrivalled travel to and from all the capital's key airports, including London City, Gatwick and Heathrow as well as three further out, such as Luton and Stansted. Whatever you need, our local Billingshurst taxis will have the vehicle to suit your requirements, so you travel to and from the airport in comfort and style. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
        <div>
          p: Billingshurst Taxi Vehicles  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: We can an extensive fleet here at Western Cars incorporating estates and saloons as well as six, seven or eight-person people carriers. The line-up includes wheelchair accessible taxis. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
        <div>
          p: Fully Vetted Taxi Drivers  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: Not only are all our drivers dependable, friendly professionals, they have been through a thorough vetting process. This means we can assure you of a hassle-free, safe journey wherever you are going. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
        <div>
          p: Ask For Your Favourite Driver  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: We know that some of our clients have got to know their driver and prefer to travel with the same one on each journey where possible. Depending on availability, we can allocate your preferred driver for every trip, as long as they are available. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
        <div>
          p: 24 Hour Taxi Service For Billingshurst  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: We operate a round-the-clock, 24-hour taxi service, so when we call, we're whenever you need us, we're not messing around. We are available at short notice and charge the same rates whatever the time, day or night. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
        <div>
          p: We Can Offer Set Rates  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: We base our prices on vehicle type and miles travelled — nothing else. We have fixed fares for a variety of destinations, including major airports like Stansted, Gatwick and Heathrow Airport transfers. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
        <div>
          p: Book Your Billingshurst Taxi Online, Via Text or by Phone  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: We like to be as flexible as possible for all our customers. So you can phone or text us, or book your cab online via our website. We also accept all major debit and credit cards. And if you're a local organisation who would benefit from our cabs in Billingshurst, set up a business account with us. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
        <div>
          p: Personal Digital Assistant (PDA) Fitted Taxis  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: We install Personal Digital Assistants or PDAs in all our cars so that passengers have access to live progress reports about their journey. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
        <div>
          p: We Offer Group Taxi Bookings  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: If a group of you need to go somewhere, there are many advantages to booking a Billingshurst cab. It means you can travel together, can all enjoy a drink and don't have to worry about public transport or last train or bus times. We cater for everything from school runs to hen parties and wedding transport — ask us for a quote and book a cab today. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
        <div>
          p: Customer Satisfaction  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: We're very much a customer-focused business, and are determined that every passenger should be happy with the service we provide. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
        <div>  {mt-4 pt-4 border-t border-border}
          p: Book Your Taxi in Billingshurst Now  {font-bold mb-1} STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
          p: Our reputation speaks volumes. Western Cars has listened to you and grown from strength to strength. We've helped numerous satisfied customers to get where they need to be, at the time they need to be there. Get in touch today and make your taxi booking with confidence. STYLE="white-space: pre-line;" [computed color=rgb(10, 10, 10)]
      <div>  {flex justify-center}
        IMG src=/airo-assets/images/pages/home/taxi-night alt="Taxi service at night" 612x613  {w-full max-w-sm rounded shadow-lg object-cover} STYLE="max-height: 520px;"
<section>  {py-14} STYLE="background: hsl(var(--navy));" [computed bg=rgb(20, 28, 52)]
  <div>  {max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center}
    <div>  {text-white}
      H2: DOWNLOAD OUR SMARTPHONE APP  {text-2xl md:text-3xl font-bold mb-4 uppercase} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
      p: You can always book your Billingshurst cab via our site, email or phone number. But did you know we have also launched Western Cars' free iPhone and Android app? So, we are pleased to announce that we have launched our mobile app for the Android and iOS Platform. You book through these apps on your Android or iPhone smartphone. Download the below app stores to download. You can also go directly to our website through your mobile web browser to book through our user friendly booking engine.  {text-sm leading-relaxed opacity-80 mb-6} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
      <div>  {flex gap-3 flex-wrap}
        [a href=https://icab.bi/Western target=_blank] "" IMG(/airo-assets/images/pages/home/download-on-google-play alt="Download on Google Play" {h-12 w-auto object-contain}) [computed color=rgb(255, 255, 255)]
        [a href=https://icab.bi/Western target=_blank] "" IMG(/airo-assets/images/pages/home/download-on-the-app-store alt="Download on the App Store" {h-12 w-auto object-contain}) [computed color=rgb(255, 255, 255)]
    <div>  {flex justify-center}
      IMG src=/airo-assets/images/pages/home/app-mockup alt="Taxi booking app on smartphone" 375x510  {max-h-80 w-auto object-contain drop-shadow-2xl}
<section>  {py-14} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
  <div>  {max-w-7xl mx-auto px-4 text-white}
    H2: Our Taxi Service Areas  {text-2xl md:text-3xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Western Cars provides reliable taxi and private hire services in Billingshurst and surrounding areas. We proudly serve the following locations:  {text-sm mb-4 opacity-90} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
    <ul>  {grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 mb-4 text-sm}
      li: Horsham  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Crawley  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Five Oaks  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Slinfold  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Broadbridge Heath  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Rudgwick  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Buck's Green  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: West Grinstead  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Partridge Green  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Southwater  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Lower Beeding  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Warnham  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Mannings Heath  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Bolney  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Billingshurst  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Barns Green  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
      li: Cowfold  {flex items-center gap-1 opacity-90} [computed color=rgb(255, 255, 255)]
    <div>  {text-sm opacity-90 mb-2}
      [a href=/horsham-to-gatwick-transfers] "Taxi from Horsham to Gatwick"  {underline hover:opacity-100 mr-4} [computed color=rgb(255, 255, 255)]
      [a href=/airport-transfers] "Heathrow Airport Transfers"  {underline hover:opacity-100} [computed color=rgb(255, 255, 255)]
    p: If your area isn't listed, feel free to contact us, and we'll be happy to accommodate your needs. See our taxi services here >  {text-sm opacity-90 mb-6} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
    [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-6 py-3 rounded font-bold text-sm hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--background)); color: hsl(var(--primary));" [computed bg=rgb(255, 255, 255) color=rgb(61, 88, 164)]
<section>  {py-14 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center}
    <div>  {space-y-8}
      <div>  {flex gap-4 items-start}
        <div>  {flex-shrink-0 w-14 h-14 rounded flex items-center justify-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
          ICON {w-7 h-7 text-white fill-current}
        <div>
          H3: Why Choose Us?  {text-base font-bold mb-1} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: Western Cars are fully licensed Minicab Service. Our prices are very competitive as we are the providers of one of the cheapest rates on the market.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {flex gap-4 items-start}
        <div>  {flex-shrink-0 w-14 h-14 rounded flex items-center justify-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
          ICON {w-7 h-7 text-white fill-current}
        <div>
          H3: 24/7 Taxi Service  {text-base font-bold mb-1} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: Our taxis operate 24/7 and offer excellent customer service. We take any complaints or comments personally.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {flex gap-4 items-start}
        <div>  {flex-shrink-0 w-14 h-14 rounded flex items-center justify-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
          ICON {w-7 h-7 text-white fill-current}
        <div>
          H3: Taxi Services  {text-base font-bold mb-1} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: Western Cars cab bookings include Private car and Private taxi services.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
    <div>
      IMG src=/airo-assets/images/pages/home/fleet-photo alt="Western Cars fleet of vehicles" 1600x900  {w-full rounded shadow-lg object-cover} STYLE="max-height: 420px;"
```

### 5.2 About Us — `/about-us`

- **Title:** About Us – Western Cars Billingshurst | Taxi Service Since 2007
- **Meta description:** Learn about Western Cars Billingshurst — providing professional private hire taxis, airport transfers, and VIP travel across West Sussex since 2007.
- **Canonical:** https://westerncarsbillingshurst.co.uk/about-us
- **OG/Twitter:** `og:title=About Us – Western Cars Billingshurst` · `og:description=Professional taxi and private hire services in Billingshurst, West Sussex since 2007. Airport transfers, group taxis, VIP travel and more.` · `og:url=https://westerncarsbillingshurst.co.uk/about-us` · `og:type=website` · `og:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/hero-bg` · `twitter:card=summary_large_image` · `twitter:title=About Us – Western Cars Billingshurst` · `twitter:description=Professional taxi and private hire services in Billingshurst, West Sussex since 2007. Airport transfers, group taxis, VIP travel and more.` · `twitter:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/hero-bg`
- Screenshots: `shots/about-us-desktop.jpg`, `-mobile.jpg`

JSON-LD:
```json
{"@context":"https://schema.org","@type":"AboutPage","@id":"https://westerncarsbillingshurst.co.uk/about-us#webpage","name":"About Us – Western Cars Billingshurst","url":"https://westerncarsbillingshurst.co.uk/about-us","isPartOf":{"@id":"https://westerncarsbillingshurst.co.uk/#website"},"about":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"}}
```

Structure:
```
<section>  {py-12 px-4 text-white text-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
  <div>  {max-w-4xl mx-auto}
    H1: About Us  {text-3xl md:text-4xl font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Taxi Service Billingshurst  {text-lg opacity-90} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
<section>  {py-10 px-4} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
  <div>  {max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-white text-center sm:text-left}
    ICON {lucide lucide-clock3 w-10 h-10 flex-shrink-0 opacity-90}
    <div>
      p: Open 24 Hours, 7 Days a Week  {text-xl font-bold} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
      p: We never close. Whether you need an early morning airport run or a late-night pickup, Western Cars Billingshurst is available around the clock, every day of the year — including bank holidays.  {text-sm opacity-90 mt-1 max-w-xl} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
<section>  {py-12 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: About Western Cars Billingshurst  {text-2xl md:text-3xl font-bold mb-6} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: At Western Cars Billingshurst, we offer a wide range of taxi services including:  {text-base mb-4} STYLE="color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <ul>  {space-y-2 mb-4}
      li: Private Hire Cars  {flex items-start gap-2} [computed color=rgb(10, 10, 10)]
      li: VIP Travel  {flex items-start gap-2} [computed color=rgb(10, 10, 10)]
      li: Group Taxis  {flex items-start gap-2} [computed color=rgb(10, 10, 10)]
      li: Airport Transfers (including to Gatwick and Heathrow as well as others UK-wide)  {flex items-start gap-2} [computed color=rgb(10, 10, 10)]
      li: Tours of Cities or Towns (plus other areas of interest)  {flex items-start gap-2} [computed color=rgb(10, 10, 10)]
      li: Taxis to Universities  {flex items-start gap-2} [computed color=rgb(10, 10, 10)]
    p: We can also take you to any transport hub such as ports, railways and bus stations. STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Where We Provide Taxi Services  {text-2xl md:text-3xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: We operate in and around Billingshurst, West Sussex, covering Southwater, Mannings Heath, Slinfold, Rudgwick, Broadbridge Heath, Warnham and beyond.  {text-base} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Why Choose Our Billingshurst Taxi Service?  {text-2xl md:text-3xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: We pride ourselves on offering the best taxis in Billingshurst, and there are many reasons why people come back to us time after time. Our professional local taxis have excellent knowledge of the local road networks in Billingshurst, plus those further afield. Our use of technology systems, including GPS, means we can anticipate hold-ups such as roadworks and other delays so that we can then find alternative routes where necessary. We also work hard to keep affordable taxi fares, and to make every single journey as comfortable and convenient as possible. All of which adds up to a consistently high level of customer satisfaction for anyone needing a taxi in Billingshurst.  {text-base leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6}
    <div>  {bg-white rounded-lg p-6 shadow-sm} [computed bg=rgb(255, 255, 255)]
      ICON {lucide lucide-clock w-8 h-8 mb-3} STYLE="color: hsl(var(--primary));"
      H3: Here For You With a 24-hour Taxi Service  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      p: Obviously, flights and other trips don't conform to a neat 9-to-5 pattern. So, unlike public transport, we're available to our customers 24/7, 365 days a year. This means you get wherever you need to be, whenever you need to get there, at short notice if needs be. Equally, if you ever want to make or discuss a booking, we're always happy to talk to you.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {bg-white rounded-lg p-6 shadow-sm} [computed bg=rgb(255, 255, 255)]
      ICON {lucide lucide-car w-8 h-8 mb-3} STYLE="color: hsl(var(--primary));"
      H3: A Professional Fleet of Vehicles  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      p: Our vehicles include executive cars, six-seater MPVs and saloon models. So we'll have something to suit your needs, allowing you to travel in comfort and style however many of you are travelling. We also maintain every vehicle meticulously to keep it in premium condition, and ensure our cars are consistently spotlessly clean.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {bg-white rounded-lg p-6 shadow-sm} [computed bg=rgb(255, 255, 255)]
      ICON {lucide lucide-smartphone w-8 h-8 mb-3} STYLE="color: hsl(var(--primary));"
      H3: Book By Smartphone  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      p: We know that it's not always convenient to make a phone call or order your cab by email or online. To give our customers even more choice, our app allows you to book a taxi on your mobile phone in moments.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Our History  {text-2xl md:text-3xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Western Cars has been dedicated to delivering the best taxi services in Billingshurst since 2007. Specialising in Airport Transfers to all major UK Airports, we offer seamless journeys, including reliable taxis from Billingshurst to Gatwick and Heathrow Airport. Our range of taxi services include Private Hire Taxis, Group Taxis, and VIP Chauffeuring, all based in Billingshurst, West Sussex. Whether you need a taxi to Gatwick, Heathrow, or any other destination, we are here to take you there in comfort.  {text-base leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-14 px-4 text-white text-center} STYLE="background: hsl(var(--navy));" [computed bg=rgb(20, 28, 52)]
  <div>  {max-w-2xl mx-auto}
    H2: Ready to Book?  {text-2xl md:text-3xl font-bold mb-3} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Want to book a taxi, minicab, airport transfer or private hire taxi? Book online, by phone or via the app.  {mb-6 opacity-90} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
    <div>  {flex flex-col sm:flex-row gap-4 justify-center}
      [a href=tel:01403272727] "Call 01403 272727"  {inline-block px-6 py-3 rounded font-semibold border-2 border-white hover:bg-white hover:text-foreground transition-colors} [computed color=rgb(255, 255, 255)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-6 py-3 rounded font-semibold text-primary-foreground transition-colors} STYLE="white-space: pre-line; background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164) color=rgb(255, 255, 255)]
```

### 5.3 Heathrow Airport Transfers — `/airport-transfers`

- **Title:** Heathrow Airport Transfers – Western Cars Billingshurst | 01403 272727
- **Meta description:** Reliable Heathrow Airport transfers from Billingshurst & West Sussex. All terminals covered, 24/7, fixed fares, flight monitoring. Call 01403 272727.
- **Canonical:** https://westerncarsbillingshurst.co.uk/airport-transfers
- **OG/Twitter:** `og:title=Heathrow Airport Transfers – Western Cars Billingshurst` · `og:description=Professional taxi transfers to and from Heathrow Airport. All terminals, 24/7, fixed fares. Call 01403 272727.` · `og:url=https://westerncarsbillingshurst.co.uk/airport-transfers` · `og:type=website` · `og:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/airport-transfers/hero` · `twitter:card=summary_large_image` · `twitter:title=Heathrow Airport Transfers – Western Cars Billingshurst` · `twitter:description=Professional taxi transfers to and from Heathrow Airport. All terminals, 24/7, fixed fares.` · `twitter:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/airport-transfers/hero`
- Screenshots: `shots/airport-transfers-desktop.jpg`, `-mobile.jpg`

JSON-LD:
```json
{"@context":"https://schema.org","@type":"Service","@id":"https://westerncarsbillingshurst.co.uk/airport-transfers#service","name":"Heathrow Airport Transfers","description":"Professional taxi transfers to and from London Heathrow Airport from Billingshurst and West Sussex. All terminals covered, 24/7, fixed fares.","provider":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"},"areaServed":{"@type":"Place","name":"Billingshurst, West Sussex"},"url":"https://westerncarsbillingshurst.co.uk/airport-transfers"}
{"@context":"https://schema.org","@type":"WebPage","@id":"https://westerncarsbillingshurst.co.uk/airport-transfers#webpage","name":"Heathrow Airport Transfers – Western Cars Billingshurst","url":"https://westerncarsbillingshurst.co.uk/airport-transfers","isPartOf":{"@id":"https://westerncarsbillingshurst.co.uk/#website"},"about":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"}}
```

Structure:
```
<section>  {relative h-72 md:h-96 flex items-center justify-center text-white text-center overflow-hidden}
  IMG src=/airo-assets/images/pages/airport-transfers/hero alt="Heathrow Airport terminal" 1440x600  {absolute inset-0 w-full h-full object-cover}
  DECOR <div>  {absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/75 pointer-events-none}
  <div>  {relative z-10 px-4 max-w-3xl mx-auto}
    H1: Heathrow Airport Transfers  {text-3xl md:text-5xl font-bold mb-3 leading-tight} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Reliable, comfortable taxi transfers from Billingshurst & West Sussex to Heathrow Airport — available 24/7.  {text-base md:text-lg opacity-90 max-w-xl mx-auto} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
<section>  {py-14 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Your Local Heathrow Transfer Specialists  {text-2xl md:text-3xl font-bold mb-6} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Western Cars Billingshurst provides professional, punctual airport transfer services to and from London Heathrow Airport. Whether you're travelling for business or leisure, our experienced drivers will get you there on time, every time.  {text-base leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: We cover all Heathrow terminals — T2, T3, T4 and T5 — and offer fixed, competitive fares with no hidden charges. Our fleet includes saloon cars, estate cars and larger vehicles for groups, all maintained to the highest standards.  {text-base leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-14 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-5xl mx-auto}
    H2: Why Choose Western Cars for Heathrow?  {text-2xl md:text-3xl font-bold text-center mb-10} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    <div>  {grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6}
      <div>  {bg-white rounded-lg p-6 shadow-sm border border-border} [computed bg=rgb(255, 255, 255)]
        <div>  {mb-4} STYLE="color: hsl(var(--primary));"
          ICON {lucide lucide-clock w-8 h-8}
        H3: 24/7 Availability  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        p: We operate around the clock, 365 days a year, so you can book early morning or late night flights with confidence.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {bg-white rounded-lg p-6 shadow-sm border border-border} [computed bg=rgb(255, 255, 255)]
        <div>  {mb-4} STYLE="color: hsl(var(--primary));"
          ICON {lucide lucide-plane w-8 h-8}
        H3: Flight Monitoring  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        p: We track your flight in real time. If your flight is delayed, your driver will adjust — no extra charge.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {bg-white rounded-lg p-6 shadow-sm border border-border} [computed bg=rgb(255, 255, 255)]
        <div>  {mb-4} STYLE="color: hsl(var(--primary));"
          ICON {lucide lucide-pound-sterling w-8 h-8}
        H3: Fixed Fares  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        p: All our Heathrow transfer prices are fixed and agreed upfront. No surge pricing, no surprises.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {bg-white rounded-lg p-6 shadow-sm border border-border} [computed bg=rgb(255, 255, 255)]
        <div>  {mb-4} STYLE="color: hsl(var(--primary));"
          ICON {lucide lucide-car w-8 h-8}
        H3: Meet & Greet  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        p: Your driver will meet you in the arrivals hall with a name board, ready to assist with your luggage.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {bg-white rounded-lg p-6 shadow-sm border border-border} [computed bg=rgb(255, 255, 255)]
        <div>  {mb-4} STYLE="color: hsl(var(--primary));"
          ICON {lucide lucide-shield w-8 h-8}
        H3: Fully Licensed  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        p: Western Cars is a fully licensed private hire operator. All drivers are DBS checked and professionally trained.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {bg-white rounded-lg p-6 shadow-sm border border-border} [computed bg=rgb(255, 255, 255)]
        <div>  {mb-4} STYLE="color: hsl(var(--primary));"
          ICON {lucide lucide-users w-8 h-8}
        H3: All Group Sizes  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        p: From solo travellers to large groups, we have the right vehicle for your party and luggage requirements.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
<section>  {py-14 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: All Heathrow Terminals Covered  {text-2xl md:text-3xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: We provide transfers to and from every Heathrow terminal, including Terminal 2 (The Queen's Terminal), Terminal 3, Terminal 4 and Terminal 5 (British Airways). Just let us know your terminal when booking.  {text-base leading-relaxed mb-8} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {grid grid-cols-1 sm:grid-cols-2 gap-4}
      <div>  {flex items-start gap-3 p-4 rounded-lg border border-border}
        DECOR <div>  {w-2 h-2 rounded-full mt-2 flex-shrink-0} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
        <div>
          p: Terminal 2  {font-bold text-sm} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: The Queen's Terminal — Star Alliance airlines  {text-sm} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {flex items-start gap-3 p-4 rounded-lg border border-border}
        DECOR <div>  {w-2 h-2 rounded-full mt-2 flex-shrink-0} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
        <div>
          p: Terminal 3  {font-bold text-sm} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: Long-haul and international carriers  {text-sm} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {flex items-start gap-3 p-4 rounded-lg border border-border}
        DECOR <div>  {w-2 h-2 rounded-full mt-2 flex-shrink-0} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
        <div>
          p: Terminal 4  {font-bold text-sm} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: Selected airlines including some British Airways routes  {text-sm} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {flex items-start gap-3 p-4 rounded-lg border border-border}
        DECOR <div>  {w-2 h-2 rounded-full mt-2 flex-shrink-0} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
        <div>
          p: Terminal 5  {font-bold text-sm} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: British Airways and Iberia hub  {text-sm} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
<section>  {py-14 px-4 text-white text-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
  <div>  {max-w-2xl mx-auto}
    H2: Book Your Heathrow Transfer Today  {text-2xl md:text-3xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Call us any time on 01403 272727 or use our online booking to reserve your Heathrow airport transfer. We recommend booking at least 24 hours in advance.  {text-base opacity-90 mb-8} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
    <div>  {flex flex-col sm:flex-row gap-4 justify-center}
      [a href=tel:01403272727] "01403 272727"  {inline-block px-8 py-3 rounded font-bold text-base hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--background)); color: hsl(var(--primary));" [computed bg=rgb(255, 255, 255) color=rgb(61, 88, 164)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-8 py-3 rounded font-bold text-base border-2 border-white hover:bg-white transition-colors} STYLE="color: hsl(var(--background));" [computed color=rgb(255, 255, 255)]
```

### 5.4 Gatwick Airport Transfers — `/horsham-to-gatwick-transfers`

- **Title:** Billingshurst to Gatwick Airport Taxis – Western Cars Billingshurst | 01403 272727
- **Meta description:** Reliable taxi transfers from Billingshurst & West Sussex to Gatwick Airport. Both terminals, 24/7, fixed fares, personal service. Call 01403 272727.
- **Canonical:** https://westerncarsbillingshurst.co.uk/horsham-to-gatwick-transfers
- **OG/Twitter:** `og:title=Billingshurst to Gatwick Airport Taxis – Western Cars Billingshurst` · `og:description=Professional taxi transfers from Billingshurst to Gatwick Airport. Both terminals, 24/7, fixed fares. Call 01403 272727.` · `og:url=https://westerncarsbillingshurst.co.uk/horsham-to-gatwick-transfers` · `og:type=website` · `og:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/gatwick-transfers/hero` · `twitter:card=summary_large_image` · `twitter:title=Billingshurst to Gatwick Airport Taxis – Western Cars Billingshurst` · `twitter:description=Professional taxi transfers from Billingshurst to Gatwick Airport. Both terminals, 24/7, fixed fares.` · `twitter:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/gatwick-transfers/hero`
- Screenshots: `shots/horsham-to-gatwick-transfers-desktop.jpg`, `-mobile.jpg`

JSON-LD:
```json
{"@context":"https://schema.org","@type":"Service","@id":"https://westerncarsbillingshurst.co.uk/horsham-to-gatwick-transfers#service","name":"Billingshurst to Gatwick Airport Taxi Transfers","description":"Professional taxi transfers from Billingshurst and West Sussex to London Gatwick Airport. Both terminals covered, 24/7, fixed fares.","provider":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"},"areaServed":{"@type":"Place","name":"Billingshurst, West Sussex"},"url":"https://westerncarsbillingshurst.co.uk/horsham-to-gatwick-transfers"}
{"@context":"https://schema.org","@type":"WebPage","@id":"https://westerncarsbillingshurst.co.uk/horsham-to-gatwick-transfers#webpage","name":"Billingshurst to Gatwick Airport Taxis – Western Cars Billingshurst","url":"https://westerncarsbillingshurst.co.uk/horsham-to-gatwick-transfers","isPartOf":{"@id":"https://westerncarsbillingshurst.co.uk/#website"},"about":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"}}
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much is the taxi fare from Billingshurst to Gatwick Airport?","acceptedAnswer":{"@type":"Answer","text":"This will vary according to when you're departing and the sort of vehicle you need. Contact us for a tailored quote for your trip today."}},{"@type":"Question","name":"Can I book a taxi in advance for a Billingshurst to Gatwick Airport journey?","acceptedAnswer":{"@type":"Answer","text":"Yes, you can! We recommend pre-booking your Gatwick Airport transfer from Billingshurst once you know you are travelling. Pre-book via our contact form, app, or phone."}},{"@type":"Question","name":"How many passengers and luggage can a Western Cars taxi accommodate?","acceptedAnswer":{"@type":"Answer","text":"Our fleet includes saloon cars, estate cars, MPVs and minibuses, so we can help however many of you are travelling."}},{"@type":"Question","name":"Do you cover both Gatwick North and South terminals?","acceptedAnswer":{"@type":"Answer","text":"Yes — we cover both Gatwick North Terminal and South Terminal. Just let us know your terminal when booking and your driver will be there to meet you."}},{"@type":"Question","name":"Any tips for a smooth taxi ride from Billingshurst to Gatwick Airport?","acceptedAnswer":{"@type":"Answer","text":"We suggest making your booking as soon as you can, double-checking your flight details, being ready at pick-up time with your belongings, and having your travel documents to hand."}}]}
```

Structure:
```
<section>  {relative h-72 md:h-96 flex items-center justify-center text-white text-center overflow-hidden}
  IMG src=/airo-assets/images/pages/gatwick-transfers/hero alt="Gatwick Airport terminal" 1440x600  {absolute inset-0 w-full h-full object-cover}
  DECOR <div>  {absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/75 pointer-events-none}
  <div>  {relative z-10 px-4 max-w-3xl mx-auto}
    H1: Billingshurst to Gatwick Airport Taxis  {text-3xl md:text-5xl font-bold mb-3 leading-tight} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Reliable, comfortable taxi transfers from Billingshurst & West Sussex to London Gatwick Airport — available 24/7, 365 days a year.  {text-base md:text-lg opacity-90 max-w-xl mx-auto} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
<section>  {py-14 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Billingshurst to Gatwick Airport Taxis  {text-2xl md:text-3xl font-bold mb-6} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Western Cars Billingshurst provide airport transfers to all major UK airports including London Gatwick Airport. Our exceptional Gatwick Airport taxi service caters for both leisure and business travellers, whether you're flying solo, heading off with one other person, or travelling as a group. We're available 365 days of the year, 24/7.  {text-base leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {flex flex-col sm:flex-row gap-4 mt-8}
      [a href=tel:01403272727] "01403 272727"  {inline-block px-8 py-3 rounded font-bold text-base text-white text-center hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164) color=rgb(255, 255, 255)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-8 py-3 rounded font-bold text-base text-center border-2 hover:bg-muted transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Outstanding Comfort & Convenience  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Modern air travel can be stressful, but planning your journey to Gatwick Airport makes things so much easier. Book a Gatwick transfer by taxi and eliminate worries about plotting the best route, unreliable public transport and the hunt for that elusive, overpriced parking space.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: Opting for an airport taxi from Gatwick Airport to Billingshurst not only offers unparalleled convenience but typically allows you to set off later than the alternatives, maximising your pre-departure time. Our airport transfers run long after trains and buses have stopped running for the night — and before they start up again in the morning.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: You also have the sheer comfort of travelling in a climate-controlled vehicle from start to finish, and a door-to-airport service — which is especially important if you are travelling with lots of luggage, children, elderly passengers, or anyone who may be less mobile.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: A Personal Service  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: What really sets us apart is our ability to tailor our services to your requirements when you book a taxi from Billingshurst to Gatwick Airport. Whether you wish to travel from Gatwick Airport to home or both ways, our personalised private hire taxi service is ideally equipped to accommodate particular requests — for example if you want a child seat, wheelchair access, or have any other travel requirements.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: When we confirm your booking, we will note your baggage needs, how many passengers will be travelling, plus how many child seats you need, if any. And if you have a preferred driver who has taken you to the airport before, please tell us — we will do our best to make sure they drive you again.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Easy Booking Process, 24/7  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: You can reserve your cab through our website, on your phone via our app, or just give us a call — we offer multiple options for making your booking for your taxi from Billingshurst to Gatwick Airport, all of them user-friendly.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: We know that some people prefer to give us a quick call to sort out their cab to London Gatwick. You can do this 24/7 and speak to one of our operators — a real person who can answer your questions whatever the time of day or night.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Excellent Customer Service & Reliability  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: When it comes to Gatwick airport taxi services from Billingshurst, we are your dependable partners for seamless travel and are committed to consistent customer satisfaction. We fully appreciate how important it is to be on time when you have a plane to catch, so we will not keep you waiting once you have landed on the return leg of your trip.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: Our drivers take pride in what they do, know the local area well and provide a sky-high standard of customer service.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Corporate & Group Airport Transfers to Gatwick  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: We cater for both individual and group travel. We can get you to the airport whether there are two or more of you travelling — whether you're flying as a team to a work conference or jetting off on a honeymoon, family holiday, celebration or any other gathering.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Both Gatwick Terminals Covered  {text-xl md:text-2xl font-bold mb-6} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    <div>  {grid grid-cols-1 sm:grid-cols-2 gap-4}
      <div>  {flex items-start gap-3 p-4 rounded-lg border border-border bg-white} [computed bg=rgb(255, 255, 255)]
        DECOR <div>  {w-2 h-2 rounded-full mt-2 flex-shrink-0} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
        <div>
          p: North Terminal  {font-bold text-sm} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: easyJet, TUI, Wizz Air and other carriers  {text-sm} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {flex items-start gap-3 p-4 rounded-lg border border-border bg-white} [computed bg=rgb(255, 255, 255)]
        DECOR <div>  {w-2 h-2 rounded-full mt-2 flex-shrink-0} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
        <div>
          p: South Terminal  {font-bold text-sm} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: British Airways, Vueling, Norwegian and others  {text-sm} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
<section>  {py-14 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Billingshurst to Gatwick Taxi Service FAQs  {text-2xl md:text-3xl font-bold mb-8} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    <div>  {flex flex-col gap-3}
      <div>  {border border-border rounded-lg overflow-hidden}
        [button] "How much is the taxi fare from Billingshurst to Gatwick Airport?" [icon lucide lucide-chevron-down w-5 h-5 flex-shrink-0 ml-4 transition-transform]  {w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm hover:bg-muted/40 transition-colors} STYLE="color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
      <div>  {border border-border rounded-lg overflow-hidden}
        [button] "Can I book a taxi in advance for a Billingshurst to Gatwick Airport journey?" [icon lucide lucide-chevron-down w-5 h-5 flex-shrink-0 ml-4 transition-transform]  {w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm hover:bg-muted/40 transition-colors} STYLE="color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
      <div>  {border border-border rounded-lg overflow-hidden}
        [button] "How many passengers and luggage can a Western Cars taxi accommodate?" [icon lucide lucide-chevron-down w-5 h-5 flex-shrink-0 ml-4 transition-transform]  {w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm hover:bg-muted/40 transition-colors} STYLE="color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
      <div>  {border border-border rounded-lg overflow-hidden}
        [button] "Do you cover both Gatwick North and South terminals?" [icon lucide lucide-chevron-down w-5 h-5 flex-shrink-0 ml-4 transition-transform]  {w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm hover:bg-muted/40 transition-colors} STYLE="color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
      <div>  {border border-border rounded-lg overflow-hidden}
        [button] "Any tips for a smooth taxi ride from Billingshurst to Gatwick Airport?" [icon lucide lucide-chevron-down w-5 h-5 flex-shrink-0 ml-4 transition-transform rotate-180]  {w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm hover:bg-muted/40 transition-colors} STYLE="color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        div: We suggest making your booking as soon as you can, double-checking your flight details, being ready at pick-up time with your belongings, and having your travel documents to hand. This preparation should result in a smoother, stress-free journey.  {px-5 pb-4 text-sm leading-relaxed border-t border-border} STYLE="color: hsl(var(--muted-foreground));"
<section>  {py-14 px-4 text-white text-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
  <div>  {max-w-2xl mx-auto}
    H2: Book Your Gatwick Taxi From Billingshurst Now  {text-2xl md:text-3xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Book online now for a hassle-free trip to the airport — and get your business trip or holiday off to a flying start. Call us any time on 01403 272727 or use our online booking.  {text-base opacity-90 mb-8} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
    <div>  {flex flex-col sm:flex-row gap-4 justify-center}
      [a href=tel:01403272727] "01403 272727"  {inline-block px-8 py-3 rounded font-bold text-base hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--background)); color: hsl(var(--primary));" [computed bg=rgb(255, 255, 255) color=rgb(61, 88, 164)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-8 py-3 rounded font-bold text-base border-2 border-white hover:bg-white transition-colors} STYLE="color: hsl(var(--background));" [computed color=rgb(255, 255, 255)]
```

FAQ answers (accordion content):
- **Q: How much is the taxi fare from Billingshurst to Gatwick Airport?**
  A: This will vary according to when you're departing and the sort of vehicle you need. Contact us for a tailored quote for your trip today.
- **Q: Can I book a taxi in advance for a Billingshurst to Gatwick Airport journey?**
  A: Yes, you can! We recommend pre-booking your Gatwick Airport transfer from Billingshurst once you know you are travelling. This gives you one less thing to think about and makes the whole process of going away less stressful. Pre-book via our contact form, app, or phone.
- **Q: How many passengers and luggage can a Western Cars taxi accommodate?**
  A: Our fleet includes saloon cars, estate cars, MPVs and minibuses, so we can help however many of you are travelling. Once we know the size of your party, we will work out the right vehicle or vehicles to send.
- **Q: Do you cover both Gatwick North and South terminals?**
  A: Yes — we cover both Gatwick North Terminal and South Terminal. Just let us know your terminal when booking and your driver will be there to meet you.
- **Q: Any tips for a smooth taxi ride from Billingshurst to Gatwick Airport?**
  A: We suggest making your booking as soon as you can, double-checking your flight details, being ready at pick-up time with your belongings, and having your travel documents to hand. This preparation should result in a smoother, stress-free journey.

### 5.5 Luton Airport Transfer — `/luton-airport-transfer`

- **Title:** Luton Airport Transfers from Billingshurst – Western Cars | 01403 272727
- **Meta description:** Reliable taxi transfers from Billingshurst & West Sussex to London Luton Airport. Available 24/7, fixed fares, personal service. Call 01403 272727.
- **Canonical:** https://westerncarsbillingshurst.co.uk/luton-airport-transfer
- **OG/Twitter:** `og:title=Luton Airport Transfers from Billingshurst – Western Cars` · `og:description=Professional taxi transfers from Billingshurst to Luton Airport. 24/7, fixed fares, all group sizes. Call 01403 272727.` · `og:url=https://westerncarsbillingshurst.co.uk/luton-airport-transfer` · `og:type=website` · `og:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/luton-transfer/hero` · `twitter:card=summary_large_image` · `twitter:title=Luton Airport Transfers from Billingshurst – Western Cars` · `twitter:description=Professional taxi transfers from Billingshurst to Luton Airport. 24/7, fixed fares, all group sizes.` · `twitter:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/luton-transfer/hero`
- Screenshots: `shots/luton-airport-transfer-desktop.jpg`, `-mobile.jpg`

JSON-LD:
```json
{"@context":"https://schema.org","@type":"Service","@id":"https://westerncarsbillingshurst.co.uk/luton-airport-transfer#service","name":"Billingshurst to Luton Airport Taxi Transfers","description":"Professional taxi transfers from Billingshurst and West Sussex to London Luton Airport. Available 24/7, fixed fares, all group sizes.","provider":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"},"areaServed":{"@type":"Place","name":"Billingshurst, West Sussex"},"url":"https://westerncarsbillingshurst.co.uk/luton-airport-transfer"}
{"@context":"https://schema.org","@type":"WebPage","@id":"https://westerncarsbillingshurst.co.uk/luton-airport-transfer#webpage","name":"Billingshurst to Luton Airport Taxis – Western Cars Billingshurst","url":"https://westerncarsbillingshurst.co.uk/luton-airport-transfer","isPartOf":{"@id":"https://westerncarsbillingshurst.co.uk/#website"},"about":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"}}
```

Structure:
```
<section>  {relative h-72 md:h-96 flex items-center justify-center text-white text-center overflow-hidden}
  IMG src=/airo-assets/images/pages/luton-transfer/hero alt="Luton Airport terminal" 1440x600  {absolute inset-0 w-full h-full object-cover}
  DECOR <div>  {absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/75 pointer-events-none}
  <div>  {relative z-10 px-4 max-w-3xl mx-auto}
    H1: Billingshurst to Luton Airport Taxis  {text-3xl md:text-5xl font-bold mb-3 leading-tight} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Reliable, comfortable taxi transfers from Billingshurst & West Sussex to London Luton Airport — available 24/7, 365 days a year.  {text-base md:text-lg opacity-90 max-w-xl mx-auto} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
<section>  {py-14 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Billingshurst to Luton Airport Taxis  {text-2xl md:text-3xl font-bold mb-6} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Western Cars Billingshurst provide airport transfers to all major UK airports, including London Luton Airport. Whether you're travelling alone or with a group, our first-rate Luton Airport taxi service serves both business and leisure travellers. Our Luton Airport services are available 24/7, throughout the year.  {text-base leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {flex flex-col sm:flex-row gap-4 mt-8}
      [a href=tel:01403272727] "01403 272727"  {inline-block px-8 py-3 rounded font-bold text-base text-white text-center hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164) color=rgb(255, 255, 255)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-8 py-3 rounded font-bold text-base text-center border-2 hover:bg-muted transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Convenience & Comfort  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Air travel can be stressful, but planning your trip to Luton Airport makes things much easier. Book a taxi transfer to Luton Airport and eliminate worries about figuring out the best route, unreliable public transport, or finding that elusive, expensive parking spot.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: Choosing an airport taxi from Billingshurst to Luton Airport usually enables you to depart later than the alternatives, maximising your pre-departure time. Our airport transfers run long after buses and trains have ceased operations for the night — and before they resume in the morning.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: You also have the sheer comfort of travelling in a climate-controlled vehicle from start to finish, and a door-to-airport service — which can be crucial if you are travelling with a lot of luggage, children, elderly passengers, or anyone who might be less mobile.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: A Personal Service  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Our ability to customise our services to meet your needs when you reserve a taxi from Billingshurst to Luton Airport is what truly makes us stand out. Our personalised private hire taxi service is perfectly suited to meet specific needs — such as wheelchair access, a child seat, or any other travel requirements — whether you want to travel from home to Luton Airport or both ways.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: When we confirm your booking, we will note your baggage needs, how many passengers will be travelling, plus how many child seats you need, if any. And if you have a preferred driver who has taken you to the airport before, please tell us — we will do our best to make sure they drive you again.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Book a Taxi to Luton Airport in Advance  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: You can pre-book your London Luton Airport taxi via our website or app, or call us on 01403 272727. We recommend booking in advance to give you one less thing to think about and make the whole process of going away less stressful.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Corporate & Group Airport Transfers to Luton  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: We cater for both individual and group travel. We can get you to the airport whether there are two or more of you travelling — whether you're flying as a team to a work conference or jetting off on a honeymoon, family holiday, celebration or any other gathering.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Billingshurst Airport Taxi Transfers  {text-xl md:text-2xl font-bold mb-4} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Our Billingshurst taxis can also take you to all major UK airports, including Heathrow Airport, Gatwick Airport, London City Airport and Stansted Airport.  {text-base leading-relaxed mb-6} STYLE="color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {flex flex-wrap gap-3}
      [a href=/airport-transfers] "Heathrow Airport Transfers"  {inline-block px-5 py-2 rounded border text-sm font-semibold hover:bg-white transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      [a href=/horsham-to-gatwick-transfers] "Gatwick Airport Transfers"  {inline-block px-5 py-2 rounded border text-sm font-semibold hover:bg-white transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      [a href=/stansted-airport-transfers] "Stansted Airport Transfers"  {inline-block px-5 py-2 rounded border text-sm font-semibold hover:bg-white transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
<section>  {py-14 px-4 text-white text-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
  <div>  {max-w-2xl mx-auto}
    H2: Book Your Luton Airport Taxi From Billingshurst Now  {text-2xl md:text-3xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Book online now for a hassle-free trip to the airport and get your business trip or holiday off to a flying start. Call us any time on 01403 272727 or use our online booking.  {text-base opacity-90 mb-8} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
    <div>  {flex flex-col sm:flex-row gap-4 justify-center}
      [a href=tel:01403272727] "01403 272727"  {inline-block px-8 py-3 rounded font-bold text-base hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--background)); color: hsl(var(--primary));" [computed bg=rgb(255, 255, 255) color=rgb(61, 88, 164)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-8 py-3 rounded font-bold text-base border-2 border-white hover:bg-white transition-colors} STYLE="color: hsl(var(--background));" [computed color=rgb(255, 255, 255)]
```

### 5.6 Stansted Airport Transfers — `/stansted-airport-transfers`

- **Title:** Stansted Airport Transfers from Billingshurst – Western Cars | 01403 272727
- **Meta description:** Reliable taxi transfers from Billingshurst & West Sussex to London Stansted Airport. Available 24/7, fixed fares, personal service. Call 01403 272727.
- **Canonical:** https://westerncarsbillingshurst.co.uk/stansted-airport-transfers
- **OG/Twitter:** `og:title=Stansted Airport Transfers from Billingshurst – Western Cars` · `og:description=Professional taxi transfers from Billingshurst to Stansted Airport. 24/7, fixed fares, all group sizes. Call 01403 272727.` · `og:url=https://westerncarsbillingshurst.co.uk/stansted-airport-transfers` · `og:type=website` · `og:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/stansted-transfers/hero` · `twitter:card=summary_large_image` · `twitter:title=Stansted Airport Transfers from Billingshurst – Western Cars` · `twitter:description=Professional taxi transfers from Billingshurst to Stansted Airport. 24/7, fixed fares, all group sizes.` · `twitter:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/stansted-transfers/hero`
- Screenshots: `shots/stansted-airport-transfers-desktop.jpg`, `-mobile.jpg`

JSON-LD:
```json
{"@context":"https://schema.org","@type":"Service","@id":"https://westerncarsbillingshurst.co.uk/stansted-airport-transfers#service","name":"Billingshurst to Stansted Airport Taxi Transfers","description":"Professional taxi transfers from Billingshurst and West Sussex to London Stansted Airport. Available 24/7, fixed fares, all group sizes.","provider":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"},"areaServed":{"@type":"Place","name":"Billingshurst, West Sussex"},"url":"https://westerncarsbillingshurst.co.uk/stansted-airport-transfers"}
{"@context":"https://schema.org","@type":"WebPage","@id":"https://westerncarsbillingshurst.co.uk/stansted-airport-transfers#webpage","name":"Stansted Airport Transfers from Billingshurst – Western Cars Billingshurst","url":"https://westerncarsbillingshurst.co.uk/stansted-airport-transfers","isPartOf":{"@id":"https://westerncarsbillingshurst.co.uk/#website"},"about":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"}}
```

Structure:
```
<section>  {relative h-72 md:h-96 flex items-center justify-center text-white text-center overflow-hidden}
  IMG src=/airo-assets/images/pages/stansted-transfers/hero alt="Stansted Airport terminal" 1440x600  {absolute inset-0 w-full h-full object-cover}
  DECOR <div>  {absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/75 pointer-events-none}
  <div>  {relative z-10 px-4 max-w-3xl mx-auto}
    H1: Stansted Airport Transfers from Billingshurst  {text-3xl md:text-5xl font-bold mb-3 leading-tight} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Professional, reliable taxi transfers from Billingshurst & West Sussex to London Stansted Airport — available 24/7, 365 days a year.  {text-base md:text-lg opacity-90 max-w-xl mx-auto} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
<section>  {py-14 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Billingshurst to Stansted Airport Taxis  {text-2xl md:text-3xl font-bold mb-6} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Western Cars Billingshurst provide airport transfers to all major UK airports, including London Stansted Airport. Whether you are travelling alone or in a group, for business or pleasure, we provide excellent London Stansted Airport taxi services that are professional, friendly, and available 24/7.  {text-base leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: We fully appreciate the importance of being on time when you have a plane to catch, and that no one wants to be kept waiting any longer than necessary after landing. We monitor all flights before sending drivers on jobs, so you do not even need to tell us if you land late.  {text-base leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {flex flex-col sm:flex-row gap-4 mt-8}
      [a href=tel:01403272727] "01403 272727"  {inline-block px-8 py-3 rounded font-bold text-base text-white text-center hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164) color=rgb(255, 255, 255)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-8 py-3 rounded font-bold text-base text-center border-2 hover:bg-muted transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Taxi Service to Stansted Airport  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Planning your route to the airport always reduces the hassle of an international trip, even though flying can be stressful. Book a taxi transfer to Stansted Airport to avoid the hassle of figuring out a route, being let down by public transport, or hunting for a parking spot.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: In addition to offering unmatched ease and convenience, an airport taxi frequently allows you to depart later than with other options, maximising your pre-departure time. Our Billingshurst airport transfers run long after buses and trains have ceased operations for the night — and before they resume in the morning.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Book a Taxi to Stansted in Advance  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: You can pre-book your taxi to and from London Stansted via our website or app, or call us on 01403 272727. Booking in advance means one less thing to think about and makes the whole process of going away far less stressful.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: London Stansted Taxis 24 Hours  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: We know that some customers prefer to give us a quick call to sort out their cab to Stansted. For that reason, you can do this 24/7 and speak to one of our operators, no matter the time of day or night.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Dependable Stansted Airport Transfers  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Our vehicles are climate-controlled for maximum comfort. When we confirm your booking, we will ensure we understand your baggage needs, the number of passengers travelling, whether you need any child seats, and if so, how many.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: We also offer a highly customised service to meet your specific needs — whether that is wheelchair access, a child seat, or any other travel requirement. If you have a preferred driver who has taken you to the airport before, just let us know and we will do our best to arrange it.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Billingshurst Airport Taxi Transfers  {text-xl md:text-2xl font-bold mb-4} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: We do not just do airport transfers to Stansted Airport. Our Billingshurst taxis can also take you to all major UK airports, including Heathrow Airport, Gatwick Airport, and Luton Airport.  {text-base leading-relaxed mb-6} STYLE="color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {flex flex-wrap gap-3}
      [a href=/airport-transfers] "Heathrow Airport Transfers"  {inline-block px-5 py-2 rounded border text-sm font-semibold hover:bg-white transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      [a href=/horsham-to-gatwick-transfers] "Gatwick Airport Transfers"  {inline-block px-5 py-2 rounded border text-sm font-semibold hover:bg-white transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      [a href=/luton-airport-transfer] "Luton Airport Transfers"  {inline-block px-5 py-2 rounded border text-sm font-semibold hover:bg-white transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
<section>  {py-14 px-4 text-white text-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
  <div>  {max-w-2xl mx-auto}
    H2: Book Your Stansted Airport Taxi From Billingshurst Now  {text-2xl md:text-3xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Book online now for a hassle-free trip to the airport and get your business trip or holiday off to a flying start. Call us any time on 01403 272727 or use our online booking.  {text-base opacity-90 mb-8} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
    <div>  {flex flex-col sm:flex-row gap-4 justify-center}
      [a href=tel:01403272727] "01403 272727"  {inline-block px-8 py-3 rounded font-bold text-base hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--background)); color: hsl(var(--primary));" [computed bg=rgb(255, 255, 255) color=rgb(61, 88, 164)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-8 py-3 rounded font-bold text-base border-2 border-white hover:bg-white transition-colors} STYLE="color: hsl(var(--background));" [computed color=rgb(255, 255, 255)]
```

### 5.7 Billingshurst Airport Transfers — `/western-cars-airport-transfers-billinghurst`

- **Title:** Airport Transfers from Billingshurst – Western Cars | 01403 272727
- **Meta description:** Reliable airport transfers from Billingshurst to Gatwick, Heathrow, Luton, Stansted & more. Available 24/7, fixed fares, professional drivers. Call 01403 272727.
- **Canonical:** https://westerncarsbillingshurst.co.uk/western-cars-airport-transfers-billinghurst
- **OG/Twitter:** `og:title=Airport Transfers from Billingshurst – Western Cars` · `og:description=Reliable airport transfers from Billingshurst to Gatwick, Heathrow, Luton, Stansted & more. Available 24/7, fixed fares, professional drivers.` · `og:url=https://westerncarsbillingshurst.co.uk/western-cars-airport-transfers-billinghurst` · `og:type=website` · `og:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/billinghurst-airport-transfers/hero` · `twitter:card=summary_large_image` · `twitter:title=Airport Transfers from Billingshurst – Western Cars` · `twitter:description=Reliable airport transfers from Billingshurst to Gatwick, Heathrow, Luton, Stansted & more. Available 24/7, fixed fares.` · `twitter:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/billinghurst-airport-transfers/hero`
- Screenshots: `shots/western-cars-airport-transfers-billinghurst-desktop.jpg`, `-mobile.jpg`

JSON-LD:
```json
{"@context":"https://schema.org","@type":"Service","@id":"https://westerncarsbillingshurst.co.uk/western-cars-airport-transfers-billinghurst#service","name":"Airport Transfers from Billingshurst – Western Cars","description":"Reliable and professional airport transfer services from Billingshurst to all major UK airports including Gatwick, Heathrow, Luton and Stansted. Available 24/7.","provider":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"},"areaServed":{"@type":"Place","name":"Billingshurst, West Sussex"},"url":"https://westerncarsbillingshurst.co.uk/western-cars-airport-transfers-billinghurst"}
{"@context":"https://schema.org","@type":"WebPage","@id":"https://westerncarsbillingshurst.co.uk/western-cars-airport-transfers-billinghurst#webpage","name":"Airport Transfers from Billingshurst – Western Cars Billingshurst","url":"https://westerncarsbillingshurst.co.uk/western-cars-airport-transfers-billinghurst","isPartOf":{"@id":"https://westerncarsbillingshurst.co.uk/#website"},"about":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"}}
```

Structure:
```
<section>  {relative h-72 md:h-96 flex items-center justify-center text-white text-center overflow-hidden}
  IMG src=/airo-assets/images/pages/billinghurst-airport-transfers/hero alt="Passengers with luggage at an airport terminal" 1440x600  {absolute inset-0 w-full h-full object-cover}
  DECOR <div>  {absolute inset-0 bg-gradient-to-b from-gray-900/55 to-gray-900/75 pointer-events-none}
  <div>  {relative z-10 px-4 max-w-3xl mx-auto}
    H1: Airport Transfers from Billingshurst  {text-3xl md:text-5xl font-bold mb-3 leading-tight} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Reliable, professional airport transfer services from Billingshurst and the surrounding areas — available 24/7, 365 days a year.  {text-base md:text-lg opacity-90 max-w-xl mx-auto} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
<section>  {py-14 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Seamless Airport Transfers from Billingshurst  {text-2xl md:text-3xl font-bold mb-6} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: At Western Cars, we specialise in providing reliable and professional airport transfer services in Billingshurst and the surrounding areas. Whether you're travelling for business or leisure, our dedicated team ensures a comfortable and timely journey to and from all major UK airports.  {text-base leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: Our experienced drivers monitor flight schedules to ensure timely arrivals and departures, providing complete peace of mind for your travels.  {text-base leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {flex flex-col sm:flex-row gap-4 mt-8}
      [a href=tel:01403272727] "01403 272727"  {inline-block px-8 py-3 rounded font-bold text-base text-white text-center hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164) color=rgb(255, 255, 255)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-8 py-3 rounded font-bold text-base text-center border-2 hover:bg-muted transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
<section>  {py-14 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-5xl mx-auto}
    H2: Our Airport Transfer Services Cover  {text-2xl md:text-3xl font-bold mb-10 text-center} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    <div>  {grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6}
      <div>  {bg-white rounded-lg p-6 shadow-sm border} STYLE="border-color: hsl(var(--border));" [computed bg=rgb(255, 255, 255)]
        H3: Gatwick Airport  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
        p: Just a short drive away, we offer prompt pickups and drop-offs to Gatwick — both North and South terminals.  {text-sm leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
        [a href=/horsham-to-gatwick-transfers] "Learn more →"  {text-sm font-semibold hover:underline} STYLE="color: hsl(var(--accent));" [computed color=rgb(24, 100, 220)]
      <div>  {bg-white rounded-lg p-6 shadow-sm border} STYLE="border-color: hsl(var(--border));" [computed bg=rgb(255, 255, 255)]
        H3: Heathrow Airport  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
        p: Travel to Heathrow with ease, avoiding the hassle of public transport. We serve all terminals.  {text-sm leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
        [a href=/airport-transfers] "Learn more →"  {text-sm font-semibold hover:underline} STYLE="color: hsl(var(--accent));" [computed color=rgb(24, 100, 220)]
      <div>  {bg-white rounded-lg p-6 shadow-sm border} STYLE="border-color: hsl(var(--border));" [computed bg=rgb(255, 255, 255)]
        H3: Luton Airport  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
        p: Comfortable, fixed-fare transfers to London Luton Airport, available around the clock.  {text-sm leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
        [a href=/luton-airport-transfer] "Learn more →"  {text-sm font-semibold hover:underline} STYLE="color: hsl(var(--accent));" [computed color=rgb(24, 100, 220)]
      <div>  {bg-white rounded-lg p-6 shadow-sm border} STYLE="border-color: hsl(var(--border));" [computed bg=rgb(255, 255, 255)]
        H3: Stansted Airport  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
        p: Reliable transfers to London Stansted Airport for business and leisure travellers alike.  {text-sm leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
        [a href=/stansted-airport-transfers] "Learn more →"  {text-sm font-semibold hover:underline} STYLE="color: hsl(var(--accent));" [computed color=rgb(24, 100, 220)]
      <div>  {bg-white rounded-lg p-6 shadow-sm border} STYLE="border-color: hsl(var(--border));" [computed bg=rgb(255, 255, 255)]
        H3: London City Airport  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
        p: Swift transfers to London City Airport, ideal for business travellers needing a fast, stress-free journey.  {text-sm leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {bg-white rounded-lg p-6 shadow-sm border} STYLE="border-color: hsl(var(--border));" [computed bg=rgb(255, 255, 255)]
        H3: Other Major Airports  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
        p: We also serve Southampton Airport, Birmingham Airport, and other major UK airports on request.  {text-sm leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
<section>  {py-14 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-5xl mx-auto}
    H2: Why Choose Western Cars?  {text-2xl md:text-3xl font-bold mb-10 text-center} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    <div>  {grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6}
      <div>  {flex gap-4}
        <div>  {flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
          ICON {lucide lucide-clock w-7 h-7}
        <div>
          H3: 24/7 Availability  {text-base font-bold mb-1} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: We're here for you around the clock, every day of the week — no matter how early your flight or how late you land.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {flex gap-4}
        <div>  {flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
          ICON {lucide lucide-car w-7 h-7}
        <div>
          H3: Diverse Fleet  {text-base font-bold mb-1} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: From saloons to 8-seater people carriers, we have the right vehicle for your group size and luggage requirements.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {flex gap-4}
        <div>  {flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
          ICON {lucide lucide-shield w-7 h-7}
        <div>
          H3: Professional Drivers  {text-base font-bold mb-1} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: Our drivers are fully vetted, courteous, and knowledgeable about the local area and all major airport routes.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {flex gap-4}
        <div>  {flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
          ICON {lucide lucide-tag w-7 h-7}
        <div>
          H3: Fixed Rates  {text-base font-bold mb-1} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: Enjoy transparent pricing with no hidden charges. The price you're quoted is the price you pay.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {flex gap-4}
        <div>  {flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
          ICON {lucide lucide-smartphone w-7 h-7}
        <div>
          H3: Easy Booking  {text-base font-bold mb-1} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: Reserve your ride online, via phone, or through our user-friendly mobile app — whichever suits you best.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <div>  {flex gap-4}
        <div>  {flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
          ICON {lucide lucide-star w-7 h-7}
        <div>
          H3: Trusted Since 2007  {text-base font-bold mb-1} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
          p: Western Cars has been delivering the best taxi and airport transfer services in the area since 2007.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
<section>  {py-14 px-4 text-white text-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
  <div>  {max-w-2xl mx-auto}
    H2: Book Your Airport Transfer Today  {text-2xl md:text-3xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Planning your next trip? Let Western Cars handle your airport transportation needs in Billingshurst. Call us any time on 01403 272727 or book online through our website.  {text-base opacity-90 mb-8} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
    <div>  {flex flex-col sm:flex-row gap-4 justify-center}
      [a href=tel:01403272727] "01403 272727"  {inline-block px-8 py-3 rounded font-bold text-base hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--background)); color: hsl(var(--primary));" [computed bg=rgb(255, 255, 255) color=rgb(61, 88, 164)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-8 py-3 rounded font-bold text-base border-2 border-white hover:bg-white transition-colors} STYLE="color: hsl(var(--background));" [computed color=rgb(255, 255, 255)]
```

### 5.8 Southampton Seaport Transfers — `/southampton-seaport-transfers`

- **Title:** Southampton Seaport Transfers from Billingshurst – Western Cars | 01403 272727
- **Meta description:** Reliable taxi transfers from Billingshurst & West Sussex to the Port of Southampton. Available 24/7, fixed fares, personal service. Call 01403 272727.
- **Canonical:** https://westerncarsbillingshurst.co.uk/southampton-seaport-transfers
- **OG/Twitter:** `og:title=Southampton Seaport Transfers from Billingshurst – Western Cars` · `og:description=Professional taxi transfers from Billingshurst to Southampton Port. 24/7, fixed fares, all group sizes. Call 01403 272727.` · `og:url=https://westerncarsbillingshurst.co.uk/southampton-seaport-transfers` · `og:type=website` · `og:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/southampton-seaport-transfers/hero` · `twitter:card=summary_large_image` · `twitter:title=Southampton Seaport Transfers from Billingshurst – Western Cars` · `twitter:description=Professional taxi transfers from Billingshurst to Southampton Port. 24/7, fixed fares, all group sizes.` · `twitter:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/southampton-seaport-transfers/hero`
- Screenshots: `shots/southampton-seaport-transfers-desktop.jpg`, `-mobile.jpg`

JSON-LD:
```json
{"@context":"https://schema.org","@type":"Service","@id":"https://westerncarsbillingshurst.co.uk/southampton-seaport-transfers#service","name":"Billingshurst to Southampton Seaport Taxi Transfers","description":"Reliable taxi transfers from Billingshurst and West Sussex to the Port of Southampton. Available 24/7, fixed fares, all group sizes.","provider":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"},"areaServed":{"@type":"Place","name":"Billingshurst, West Sussex"},"url":"https://westerncarsbillingshurst.co.uk/southampton-seaport-transfers"}
{"@context":"https://schema.org","@type":"WebPage","@id":"https://westerncarsbillingshurst.co.uk/southampton-seaport-transfers#webpage","name":"Southampton Seaport Transfers from Billingshurst – Western Cars Billingshurst","url":"https://westerncarsbillingshurst.co.uk/southampton-seaport-transfers","isPartOf":{"@id":"https://westerncarsbillingshurst.co.uk/#website"},"about":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"}}
```

Structure:
```
<section>  {relative h-72 md:h-96 flex items-center justify-center text-white text-center overflow-hidden}
  IMG src=/airo-assets/images/pages/southampton-seaport-transfers/hero alt="Port of Southampton cruise terminal" 1440x600  {absolute inset-0 w-full h-full object-cover}
  DECOR <div>  {absolute inset-0 bg-gradient-to-b from-gray-900/55 to-gray-900/75 pointer-events-none}
  <div>  {relative z-10 px-4 max-w-3xl mx-auto}
    H1: Southampton Seaport Transfers from Billingshurst  {text-3xl md:text-5xl font-bold mb-3 leading-tight} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Reliable, comfortable taxi transfers from Billingshurst & West Sussex to the Port of Southampton — available 24/7, 365 days a year.  {text-base md:text-lg opacity-90 max-w-xl mx-auto} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
<section>  {py-14 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Port of Southampton Transfers  {text-2xl md:text-3xl font-bold mb-6} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: Western Cars Billingshurst provide seaport transfers to all major southern UK seaports, including the Port of Southampton.  {text-base leading-relaxed mb-4} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {flex flex-col sm:flex-row gap-4 mt-8}
      [a href=tel:01403272727] "01403 272727"  {inline-block px-8 py-3 rounded font-bold text-base text-white text-center hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164) color=rgb(255, 255, 255)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-8 py-3 rounded font-bold text-base text-center border-2 hover:bg-muted transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Taxi Service to Southampton Seaport  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: The Port of Southampton, located on the south coast of England and operated by Associated British Ports, is one of the UK's most important and busiest ports. It serves as a major hub for container shipping, vehicle exports, and cruise travel.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: The port handles around 1.5 to 1.9 million containers (TEUs) and nearly 900,000 vehicles annually, making it the UK's top vehicle-handling port. It is also Northern Europe's leading cruise turnaround port, with five dedicated cruise terminals and around 2 million passengers each year.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: Benefiting from deep water access and unique tidal patterns, the port can accommodate large vessels most of the time and has excellent rail and road links to London and beyond.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Book a Taxi to the Port of Southampton in Advance  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: You can pre-book your taxi to and from Southampton Port via our website or app, or call us on 01403 272727. Our taxi services are available 24/7, so no matter when your cruise departs or arrives, we have you covered.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Southampton Port Taxis 24 Hours  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: We know that some customers prefer to give us a quick call to sort out their cab to Southampton. For that reason, you can do this 24/7 and speak to one of our operators — talk to a real person and ask a question, whatever the time.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    H2: Dependable Southampton Seaport Transfers  {text-xl md:text-2xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: From the point of first contact, we will make sure everything goes smoothly. Our drivers take pride in their work, know the local area well, and provide a high standard of customer service.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: We ensure we cater to all our customers' needs — whether this is a larger vehicle to fit more baggage or child seats, we have it covered. Just let us know any specifics when you make your booking and we will handle the rest.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    p: As well as Southampton, we also offer seaport transfers to all major southern UK ports, including Portsmouth.  {text-base leading-relaxed mb-3} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
<section>  {py-12 px-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
  <div>  {max-w-4xl mx-auto}
    H2: Other Transfer Services from Billingshurst  {text-xl md:text-2xl font-bold mb-4} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
    p: As well as Southampton, we offer transfers to all major airports and southern UK ports. Explore our other transfer services below.  {text-base leading-relaxed mb-6} STYLE="color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {flex flex-wrap gap-3}
      [a href=/#portsmouth-port-transfers] "Portsmouth Port Transfers"  {inline-block px-5 py-2 rounded border text-sm font-semibold hover:bg-white transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      [a href=/horsham-to-gatwick-transfers] "Gatwick Airport Transfers"  {inline-block px-5 py-2 rounded border text-sm font-semibold hover:bg-white transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      [a href=/airport-transfers] "Heathrow Airport Transfers"  {inline-block px-5 py-2 rounded border text-sm font-semibold hover:bg-white transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      [a href=/luton-airport-transfer] "Luton Airport Transfers"  {inline-block px-5 py-2 rounded border text-sm font-semibold hover:bg-white transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      [a href=/stansted-airport-transfers] "Stansted Airport Transfers"  {inline-block px-5 py-2 rounded border text-sm font-semibold hover:bg-white transition-colors} STYLE="border-color: hsl(var(--primary)); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
<section>  {py-14 px-4 text-white text-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
  <div>  {max-w-2xl mx-auto}
    H2: Book Your Southampton Seaport Transfer Today  {text-2xl md:text-3xl font-bold mb-4} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Book online now for a hassle-free trip to the port and get your holiday off to a great start. Call us any time on 01403 272727 or use our online booking.  {text-base opacity-90 mb-8} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
    <div>  {flex flex-col sm:flex-row gap-4 justify-center}
      [a href=tel:01403272727] "01403 272727"  {inline-block px-8 py-3 rounded font-bold text-base hover:opacity-90 transition-opacity} STYLE="white-space: pre-line; background: hsl(var(--background)); color: hsl(var(--primary));" [computed bg=rgb(255, 255, 255) color=rgb(61, 88, 164)]
      [a href=https://westerncars.webbooker.icabbi.com/ target=_blank] "Book Online"  {inline-block px-8 py-3 rounded font-bold text-base border-2 border-white hover:bg-white transition-colors} STYLE="color: hsl(var(--background));" [computed color=rgb(255, 255, 255)]
```

### 5.9 Contact Us — `/contact-us`

- **Title:** Contact Us – Western Cars Billingshurst | 01403 272727
- **Meta description:** Contact Western Cars Billingshurst. Call us 24/7 on 01403 272727 or send us a message. Taxi and private hire services across Billingshurst and West Sussex.
- **Canonical:** https://westerncarsbillingshurst.co.uk/contact-us
- **OG/Twitter:** `og:title=Contact Us – Western Cars Billingshurst` · `og:description=Get in touch with Western Cars Billingshurst. Available 24/7 for taxi bookings, airport transfers and private hire across West Sussex.` · `og:url=https://westerncarsbillingshurst.co.uk/contact-us` · `og:type=website` · `og:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/hero-bg` · `twitter:card=summary_large_image` · `twitter:title=Contact Us – Western Cars Billingshurst` · `twitter:description=Get in touch with Western Cars Billingshurst. Available 24/7 for taxi bookings, airport transfers and private hire across West Sussex.` · `twitter:image=https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/hero-bg`
- Screenshots: `shots/contact-us-desktop.jpg`, `-mobile.jpg`

JSON-LD:
```json
{"@context":"https://schema.org","@type":"ContactPage","@id":"https://westerncarsbillingshurst.co.uk/contact-us#webpage","name":"Contact Us – Western Cars Billingshurst","url":"https://westerncarsbillingshurst.co.uk/contact-us","isPartOf":{"@id":"https://westerncarsbillingshurst.co.uk/#website"},"about":{"@id":"https://westerncarsbillingshurst.co.uk/#organization"}}
```

Structure:
```
<section>  {py-12 px-4 text-white text-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
  <div>  {max-w-4xl mx-auto}
    H1: Contact Us  {text-3xl md:text-4xl font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Your Local Billingshurst Taxi Company  {text-lg opacity-90} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
<section>  {py-14 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12}
    <div>
      H2: Get in Touch Today  {text-2xl font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      p: Contact Western Cars Billingshurst for access to exceptional taxi services. Fill out the form and we will answer your query as soon as possible.  {text-sm mb-6} STYLE="white-space: pre-line; color: hsl(var(--muted-foreground));" [computed color=rgb(115, 115, 115)]
      <form>  {space-y-4}
        input type=text name=_gotcha placeholder=""  STYLE="position: absolute; left: -9999px;" [computed bg=rgb(255, 255, 255)]
        <div>
          label: Your Name *  {block text-sm font-medium mb-1} STYLE="color: hsl(var(--foreground));"
          input type=text name=name placeholder="Your Name" required  {w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2} STYLE="color: hsl(var(--foreground)); background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
        <div>
          label: Email Address *  {block text-sm font-medium mb-1} STYLE="color: hsl(var(--foreground));"
          input type=email name=email placeholder="Email Address" required  {w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2} STYLE="color: hsl(var(--foreground)); background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
        <div>
          label: Phone  {block text-sm font-medium mb-1} STYLE="color: hsl(var(--foreground));"
          input type=tel name=phone placeholder="Phone"   {w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2} STYLE="color: hsl(var(--foreground)); background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
        <div>
          label: Subject  {block text-sm font-medium mb-1} STYLE="color: hsl(var(--foreground));"
          input type=text name=subject placeholder="Subject"   {w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2} STYLE="color: hsl(var(--foreground)); background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
        <div>
          label: Message *  {block text-sm font-medium mb-1} STYLE="color: hsl(var(--foreground));"
          textarea type=textarea name=message placeholder="Message" required  {w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 resize-none} STYLE="color: hsl(var(--foreground)); background: hsl(var(--background));" [computed bg=rgb(255, 255, 255)]
        [button] "Send Message"  {w-full py-3 px-6 rounded font-semibold text-white transition-opacity disabled:opacity-60} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164) color=rgb(255, 255, 255)]
    <div>  {space-y-8}
      <div>
        H2: Where to Find Western Cars  {text-2xl font-bold mb-3} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
        p: Western Cars is based in Billingshurst, West Sussex. We can take you to any major UK airport, including Gatwick and Heathrow. For airport transfers, you can find us at any of the taxi drop-off and pick-up points.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
      <div>
        H3: Service Area  {text-lg font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
        p: Western Cars provide taxi services to Billingshurst and surrounding areas, including taxis to Southwater, Mannings Heath, Slinfold, Rudgwick, Broadbridge Heath, Warnham and more.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
      <div>  {rounded-lg p-6 space-y-4} STYLE="background: hsl(var(--muted));" [computed bg=rgb(208, 211, 220)]
        <div>  {flex items-center gap-3}
          ICON {lucide lucide-phone w-5 h-5 flex-shrink-0} STYLE="color: hsl(var(--primary));"
          [a href=tel:01403272727] "01403 272727"  {text-sm font-medium hover:underline} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex items-center gap-3}
          ICON {lucide lucide-mail w-5 h-5 flex-shrink-0} STYLE="color: hsl(var(--primary));"
          [a href=mailto:info@westerncars.co.uk] "info@westerncars.co.uk"  {text-sm font-medium hover:underline} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
```

### 5.10 Terms & Conditions — `/terms-conditions`

- **Title:** Terms & Conditions – Western Cars Billingshurst Ltd
- **Meta description:** Read the terms and conditions for Western Cars Billingshurst Ltd — covering bookings, carriage, cancellations, privacy, and general conditions of service.
- **Canonical:** https://westerncarsbillingshurst.co.uk/terms-conditions
- **OG/Twitter:** `og:title=Terms & Conditions – Western Cars Billingshurst` · `og:description=Terms and conditions for Western Cars Billingshurst Ltd taxi and private hire services.` · `og:url=https://westerncars-horsham.co.uk/terms-conditions` · `og:type=website` · `twitter:card=summary_large_image`
- Screenshots: `shots/terms-conditions-desktop.jpg`, `-mobile.jpg`

JSON-LD:
```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://westerncars-horsham.co.uk/terms-conditions#webpage","name":"Terms & Conditions – Western Cars Billingshurst","url":"https://westerncars-horsham.co.uk/terms-conditions","isPartOf":{"@id":"https://westerncars-horsham.co.uk/#website"},"about":{"@id":"https://westerncars-horsham.co.uk/#organization"}}
```

Structure:
```
<section>  {py-12 px-4 text-white text-center} STYLE="background: hsl(var(--primary));" [computed bg=rgb(61, 88, 164)]
  <div>  {max-w-4xl mx-auto}
    H1: Terms & Conditions  {text-3xl md:text-4xl font-bold mb-2} STYLE="white-space: pre-line; font-family: var(--font-heading);" [computed color=rgb(255, 255, 255)]
    p: Western Cars Billingshurst Ltd  {text-lg opacity-90} STYLE="white-space: pre-line;" [computed color=rgb(255, 255, 255)]
<section>  {py-12 px-4 bg-white} [computed bg=rgb(255, 255, 255)]
  <div>  {max-w-4xl mx-auto}
    p: In these Conditions: "These Conditions" means the standard terms and conditions of sale set out in this document and (unless the context otherwise requires) includes any special terms and conditions agreed in writing between the Passenger and the Provider; "The Passenger" means the person who accepts a quotation or offer of the Provider for the sale of Services or whose order for the Services is accepted by the Provider; "The Provider" means Western Cars Billingshurst Ltd. "The Contract" means the contract for the provision of airport transfer services under these Conditions; "The Service" means the service of transport to or from airports (including any instalment of the service or any multiple services) which the Provider is to supply in accordance with these Conditions. Any reference in these Conditions to a statute or a provision of a statute shall be construed as a reference to that statute or provision as amended, re-enacted or extended at the relevant time. The headings in these Conditions are for convenience only and shall not affect their interpretation.  {text-sm leading-relaxed mb-10} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {mb-10}
      H2: 1. Conditions  {text-xl font-bold mb-4 pb-2 border-b border-border} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      <div>  {space-y-4}
        <div>  {flex gap-3}
          span: 1.1  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: The Provider shall sell and the Passenger shall purchase the Service in accordance with any quotation or offer of the Provider which is accepted by the Passenger, or any reservation of the Passenger which is accepted by the Provider, subject in either case to these Conditions, which shall govern the Contract to the exclusion of any other terms and conditions subject to which any such quotation is accepted or purported to be accepted, or any such reservation is made or purported to be made, by the Passenger.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.2  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: A contract will only come into being upon the acceptance of the Provider of the reservation and the following conditions shall be deemed to be incorporated in the contract. The passenger accepts these terms & conditions by placing a reservation, booking with the provider via but not limited to the providers; web site (http://www.westerncars-horsham.co.uk), via telephone, or via any representative agent.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.3  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: The Contract will be subject to these conditions. The provider reserves the right to revise these terms & conditions at any time without prior notice at its sole discretion. Any revised terms and conditions will be posted on the providers web site and will come into effect 1 hour after posting.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.4  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: No reservation submitted by the passenger shall be deemed to be accepted by the provider unless and until confirmed in writing by email, telephone or otherwise by an authorised representative of the provider.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.5  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: The specification for the services shall be those set out in the providers sales documentation unless varied expressly in the passengers reservation (if accepted by the provider). The service will only be supplied as stated in the providers price list. Reservations received other than these will be adjusted accordingly. Illustrations, photographs or descriptions whether in the website, brochures, price lists or other documents issued by the provider are intended as a guide only and the contents shall not be binding on the Provider.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.6  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: The Provider reserves the right to make any changes in the specification of the services which are required to conform with any applicable safety or other statutory or regulatory requirements or, where the services are to be supplied to the Providers specification, which do not materially affect their performance.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.7  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Sub-contracting companies are not authorised to make any representations or claims concerning the service unless confirmed by the Provider in writing by email, telephone or otherwise. In entering into the Contract the Passenger acknowledges that it does not rely on, and waives any claim for breach of, any such representations, which are not so confirmed.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.8  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: No variation to these Conditions shall be binding unless agreed in writing by email, telephone or otherwise between the authorised representations of the passenger and the provider.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.9  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Sales literature, price lists and other documents issued by the provider in relation to the service are subject to alteration without notice and do not constitute offers to sell the service, which are capable of acceptance. A reservation placed by the passenger may not be withdrawn, cancelled or altered prior to acceptance by the provider. No contract for the offer of service shall be binding on the provider unless the provider has issued a quotation which is expressed to be an offer of service; or has accepted a reservation placed by the passenger, by whichever is the earlier of: the Providers written acceptance or delivery of the service. Any typographical, clerical or other accidental errors or omissions in any sales literature, quotation, price list, acceptance of offer, invoice or other document or information issued by the Provider shall be subject to correction without any liability on the part of the Provider. The price of the Service shall be the price listed in the Providers published price list current at the date of acceptance of the passengers reservation or such other price as may be agreed in writing by the provider and the passenger.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.10  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Where the provider has quoted a price for the service other than in accordance with the Providers published price list the price quoted shall be valid for 24 hours only or such other time as the Provider may specify.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.11  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: The Provider reserves the right, by giving notice to the Passenger at any time before delivery, to increase the price of the service to reflect any increase in the cost to the provider which is due to any factor beyond the control of the provider (such as, without limitation, any foreign exchange fluctuation, currency regulation or alteration of duties, any change in delivery dates, quantities or specifications for the service which is requested by the Passenger, or any delay caused by any instructions of the Passenger or failure of the Passenger to give the Provider adequate information or instructions).  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.12  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: The Provider reserves the right to use the services of contractors or sub-contractors (herein known as third parties) to provide services to Passengers. Where appropriate, details i.e. names and addresses of any such third parties will be provided by the Provider upon any reasonable request and at the discretion of the Provider.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.13  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Reservations made for service on the following dates will be subject to an additional surcharge of 100% on published prices: 24th, 25th, 26th, and 31st December & 1st January.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.14  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: A maximum time of 1 hour for address collections & 3 hours for airport collections will be allocated, whereupon non-contact with passengers will classify the reservation to be a no show & will be subject to clauses 3.2 & 4.33.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 1.15  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: All payments that are made in any other form than cash (pounds sterling) to the Provider for the provision of service & on any confirmed reservations made with the provider directly or indirectly will result in a charge (booking fee) to the passenger of £3.00 sterling (in addition to any cash payment and/or discounted price).  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {mb-10}
      H2: 2. Terms of Carriage  {text-xl font-bold mb-4 pb-2 border-b border-border} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      <div>  {space-y-4}
        <div>  {flex gap-3}
          span: 2.1  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: The Providers prices are based on Passengers being ready to travel at the booked time. Passengers must book their airport transfer in accordance with check in times and guidelines provided by their relevant airline.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 2.2  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: All meets apart from airports waiting time are free for the first 5 minutes; thereafter you will be charged 40p per minute on the entire waiting time. Airports meets: 60 minutes free waiting time from the time of landing (additional free waiting time can be requested at time of booking), thereafter you will be charged 40p per minute. (There is no additional charge for flight delays). Fares quoted are flat rates. Any diversions, additional set downs or pickups by passengers will incur a minimum charge of £5.00 per diversion. Fares quoted that are not booked will have a validity of 24 hours. Western Cars reserve the right of altering any prices without prior notification however any quote/booking confirmed by Western Cars will remain binding.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 2.3  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Neither Western Cars nor any of its contracted or sub-contracted drivers will accept responsibility for loss or damage to luggage. Passengers are responsible for ensuring that their luggage is loaded/unloaded at all times, if accompanying the luggage on the journey. Western Cars and/or its contracted or sub-contracted drivers have the right to refuse any passenger or to make the journey due to the passenger having excess luggage which would result in the vehicle being unsafe whilst in motion.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 2.4  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Vehicles are booked by Passengers as requested. Saloon and Estate cars carry a maximum of 4 passengers & luggage. Vehicles to carry a larger number of passengers & luggage are available & are to be booked as required.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 2.5  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Western Cars will not carry in its vehicles any of the following: Explosives, firearms, flammables, tear gas, mace, pepper spray; Perishables; Fragile, breakable, or temperature sensitive items; Pets, insects, animals (other than registered Guide Dogs for the visually impaired); Cash; Hazardous waste; Pressurized containers; Securities and negotiable papers; Human remains; Alcoholic beverages, or anything containing alcohol; Illegal narcotics/drugs.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 2.6  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Western Cars reserves the right to disallow additional goods at any time.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 2.7  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: In the instance where accompanied luggage is transported, you agree to defend, indemnify and hold Western Cars and its owners, workers, clients, agents, and drivers harmless from all claims, demands, causes of actions, damages, liabilities, costs and expenses, including attorneys' fees, arising from or related to your acts or omissions in connection with your use of the Service.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 2.8  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: In the instance where accompanied luggage is transported, Western Cars will try its level best to deliver the luggage to the exact destination as booked by the passenger. If the driver is unable to obtain a signature for the receipt of luggage on such delivery, the driver is within his remit to return the luggage to our head office where storage and additional delivery costs may be incurred.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {mb-10}
      H2: 3. Cancellations / Cancellation Charges  {text-xl font-bold mb-4 pb-2 border-b border-border} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      <div>  {space-y-4}
        <div>  {flex gap-3}
          span: 3.1  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: No reservation which has been accepted by the Provider may be cancelled by the Passenger except with the agreement in writing, by email, telephone or otherwise of the Provider and on terms that the Passenger shall indemnify the Provider in full against all loss (including loss of profit), costs (including the cost of all labour and materials used), damages, charges and expenses incurred by the Provider as a result of cancellation.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 3.2  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Vehicles that are cancelled by passengers after reservation acceptance by the provider shall incur a £10.00 charge.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 3.3  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Cancellations must be informed of a minimum of 24 hours prior to the time of booking by telephone: 01403 272727.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 3.4  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Cancellations informed 24 hours or more prior to the time of booking: £10.00 cancellation charge incurred.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 3.5  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Cancellations informed 3 to 24 hours prior to the time of booking: cancellation charge of 50% of quoted price for provision of service.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 3.6  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Cancellations not informed up to 3 hours prior to the time of booking: cancellation charge of 100% of quoted price for provision of service.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {mb-10}
      H2: 4. Privacy Policy  {text-xl font-bold mb-4 pb-2 border-b border-border} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      <div>  {space-y-4}
        <div>  {flex gap-3}
          span: 4.1  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Western Cars do not store credit card details nor do we share customer details with any 3rd parties. By using the services contained on this website, you agree that we may use personal information provided by you in order to conduct appropriate anti-fraud checks.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 4.2  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Personal information that you provide may be disclosed to a credit reference or fraud prevention agency, which may keep a record of that information.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {mb-10}
      H2: 5. General Applications  {text-xl font-bold mb-4 pb-2 border-b border-border} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      <div>  {space-y-4}
        <div>  {flex gap-3}
          span: 5.1  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: The Provider shall not be liable to the Passenger or be deemed to be in breach of the Contract by reason of any delay in delivery or in performing, or any failure to perform, any of the Providers obligations in relation to the Service, if the delay or failure was due to any cause beyond the Providers reasonable control. Without prejudice to the generality of the foregoing, the following shall be regarded as causes beyond the Providers reasonable control directly or indirectly: Act of God, explosion, flood, tempest, fire or accident; War or threat of war, sabotage, insurrection, civil disturbance or requisition; Acts, restrictions, regulations, byelaws, prohibitions or measures of any kind on the part of any governmental, parliamentary or local authority; traffic accidents, traffic hold ups, traffic congestion; Strikes, lockouts or other industrial actions or trade disputes (whether involving employees of the Provider or of a third party); Flight delays, flight cancellations; power failure or breakdown in machinery including computer systems.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 5.2  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Subject as expressly provided in these Conditions, all warranties, conditions or other terms implied by statute or common law are excluded to the fullest extent permitted by law.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 5.3  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: Except as expressly provided in these Conditions, the Provider shall not be liable to the passenger by reason of any representation, or any implied warranty, condition or other term, or any duty at common law or under statute, or under the express terms of the Contract, for any direct or consequential loss or damage sustained by the Passenger (including, without limitation, loss of profit or indirect or special loss), costs, expenses or other claims for consequential compensation whatsoever (and whether caused by the negligence of the Provider, its servants or agents or otherwise) which arise out of or in connection with the supply of the services.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 5.4  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: The Passenger undertakes to the Provider that the Passenger will regard as confidential the Contract and all information obtained by the Passenger relating to the business and/or products of the Provider and will not use or disclose to any third party such information without the Providers prior written consent, provided that this undertaking shall not apply to information which is in the public domain other than by reason of the Passengers default.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 5.5  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: The passenger will use all reasonable endeavours to ensure compliance with this condition by its employees, servants and agents. This Condition shall survive the termination of the contract.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
    <div>  {mb-10}
      H2: 6. Miscellaneous  {text-xl font-bold mb-4 pb-2 border-b border-border} STYLE="font-family: var(--font-heading); color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
      <div>  {space-y-4}
        <div>  {flex gap-3}
          span: 6.1  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: No waiver by the provider of any breach of the Contract by the passenger shall be considered as a waiver of any subsequent breach of the same or any other provision.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 6.2  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: If any provision of these Conditions is held by any competent authority to be invalid or unenforceable in whole or in part the validity of the other provisions of these Conditions and the remainder of the provision in question shall not be affected thereby.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
        <div>  {flex gap-3}
          span: 6.3  {text-sm font-semibold flex-shrink-0 w-10} STYLE="white-space: pre-line; color: hsl(var(--primary));" [computed color=rgb(61, 88, 164)]
          p: The Contract shall be governed by the laws of England & Wales.  {text-sm leading-relaxed} STYLE="white-space: pre-line; color: hsl(var(--foreground));" [computed color=rgb(10, 10, 10)]
```

---
## 6. Image assets (absolute URLs)

- https://westerncarsbillingshurst.co.uk/airo-assets/images/logo/horizontal
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/airport-transfers/hero
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/billinghurst-airport-transfers/hero
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/gatwick-transfers/hero
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/app-mockup
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/download-on-google-play
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/download-on-the-app-store
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/fleet-photo
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/hero-bg
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/home/taxi-night
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/luton-transfer/hero
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/southampton-seaport-transfers/hero
- https://westerncarsbillingshurst.co.uk/airo-assets/images/pages/stansted-transfers/hero
- https://westerncarsbillingshurst.co.uk/assets/images/2ec15a8e3de087170519b9bd2faf03dd.png
- https://westerncarsbillingshurst.co.uk/assets/images/a070d400fe2022914f4ce75433ed0eb6.png
- https://westerncarsbillingshurst.co.uk/assets/images/be864ae5cb7de32d3c150ca6689fb8c0.png

Hero/bg images are `<img class="absolute inset-0 w-full h-full object-cover">` with an overlay div on top, not CSS backgrounds.

---
## 7. How to rebuild (instructions for Claude)
1. Stack: Vite + React + React Router + Tailwind v3 (or Next.js App Router with Server Components). Paste the §2.1 tokens into `:root` in `index.css` and map them in `tailwind.config` the shadcn way (`primary: 'hsl(var(--primary))'`, plus `navy`).
2. Build shared `<Layout>` = TopBar + Header (desktop hover dropdown, mobile accordion menu) + `<Outlet/>` + Footer + CookieBanner, exactly per §4.
3. Create one route per row in §3 and reproduce each page's sections in order from §5 using the listed classes, inline styles and copy. Inner airport pages share one template: Hero → intro (H2 + text + Phone/Book buttons) → alternating white/muted text sections → optional cards / FAQ → primary CTA band.
4. Per-route `<title>`, meta description, canonical, OG tags and JSON-LD exactly as listed (TaxiService schema on home; Service/FAQPage/BreadcrumbList on inner pages as given).
5. Contact form → POST to your own endpoint (server-side validation, rate limit, honeypot `_gotcha`); never expose secrets client-side.
6. For a **sister site**: change brand name, town (Billingshurst → X), phone `01403 272727`, email, postal code `RH14 9NY`, service-area list, company number, image assets; keep structure/styles. Fix the §3.1 issues (add the anchor ids or point links at real pages; correct WhatsApp number).
