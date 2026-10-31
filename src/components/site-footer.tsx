import Link from "next/link";
import { business, copyrightYear, services } from "@/lib/business";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "./ui";

/* ─────────────────────────────────────────────────────────────
   SiteFooter — navy, three columns: about · quick links · contact,
   closed by a thin copyright rule.
   ───────────────────────────────────────────────────────────── */

const quickLinks = [
  { href: business.bookingUrl, label: "Book Now", external: true },
  { href: "/services", label: "Our Taxi Services" },
  { href: "/services/airport-transfers", label: "Airport Transfers" },
  { href: "/areas/pulborough", label: "Pulborough Taxis" },
  { href: "/areas", label: "Areas We Cover" },
  { href: "/fleet", label: "Our Fleet" },
  { href: "/book", label: "Get a Quote" },
  { href: "/contact", label: "Contact" },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-base font-bold tracking-wide text-surface uppercase">
      {children}
    </h2>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy text-surface">
      <div className="container-page grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
        <div>
          <FooterHeading>About Western Cars</FooterHeading>
          <p className="text-sm leading-relaxed opacity-80">
            {business.name} provides licensed taxi and private hire across the
            whole of {business.region} — not just {business.base}. Specialising
            in fixed-price airport transfers to Gatwick, Heathrow, Luton,
            Stansted and Southampton, alongside local journeys, minibus and
            group travel, wheelchair accessible vehicles, executive cars and
            wedding hire. Available {business.hours}.
          </p>
        </div>

        <nav aria-label="Quick links">
          <FooterHeading>Quick Links</FooterHeading>
          <ul className="space-y-2 text-sm opacity-80">
            {quickLinks.map((l) =>
              l.external ? (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm transition-opacity duration-150 ease-standard hover:opacity-100 hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="rounded-sm transition-opacity duration-150 ease-standard hover:opacity-100 hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div>
          <FooterHeading>Contact Us</FooterHeading>
          <address className="space-y-2 text-sm not-italic opacity-80">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 shrink-0" />
              <a
                href={business.phoneHref}
                className="rounded-sm transition-opacity duration-150 ease-standard hover:opacity-100 hover:underline"
              >
                T: {business.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm transition-opacity duration-150 ease-standard hover:opacity-100 hover:underline"
              >
                WhatsApp: {business.whatsapp}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <a
                href={business.emailHref}
                className="rounded-sm break-all transition-opacity duration-150 ease-standard hover:opacity-100 hover:underline"
              >
                E: {business.email}
              </a>
            </div>
          </address>

          <p className="mt-4 text-sm opacity-80">
            {business.base}, {business.addressRegion} · Open {business.hours}
          </p>
        </div>
      </div>

      {/* Service index — flat links, kept crawlable without a fourth column. */}
      <div className="container-page border-t border-primary/40 py-6">
        <h2 className="sr-only">All services</h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs opacity-70">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="rounded-sm transition-opacity duration-150 ease-standard hover:opacity-100 hover:underline"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-primary/40 py-4 text-center text-xs opacity-70">
        <div className="container-page">
          &copy; Copyright {copyrightYear} – {business.legalName}. Licensed
          private hire operator covering {business.region}.
        </div>
      </div>
    </footer>
  );
}

/**
 * Fixed call/WhatsApp bar for small screens. Hidden from `lg` up, where the
 * header already exposes the phone number. Body gets bottom padding so the
 * bar never covers page content.
 */
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface lg:hidden">
      <div
        className="grid grid-cols-2 gap-3 px-4 py-3"
        style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      >
        <a
          href={business.phoneHref}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-btn bg-primary px-4 text-sm font-bold text-surface transition-opacity duration-150 ease-standard hover:opacity-90"
        >
          <PhoneIcon />
          Call now
        </a>
        <a
          href={business.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-btn border-2 border-primary px-4 text-sm font-bold text-primary transition-colors duration-150 ease-standard hover:bg-primary hover:text-surface"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
