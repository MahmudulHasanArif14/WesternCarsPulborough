import Image from "next/image";
import Link from "next/link";
import { areas, business, copyrightYear, services } from "@/lib/business";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "./ui";

const company = [
  { href: "/about", label: "About us" },
  { href: "/areas", label: "Areas we cover" },
  { href: "/fleet", label: "Our fleet" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Get a quote" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-[#fafafa]">
      <div className="container-page py-9 md:py-10">
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo.png"
              alt=""
              width={56}
              height={56}
              className="mb-4 h-14 w-14"
            />
            <p className="text-lg font-bold">{business.name}</p>
            <p className="mt-1 text-sm text-muted">{business.tagline}</p>
            <p className="mt-4 text-sm text-muted">
              Licensed taxi and private hire across the whole of {business.region}
              — not just {business.base}. Available {business.hours}.
            </p>

            <ul className="mt-6 grid gap-3">
              <li>
                <a
                  href={business.phoneHref}
                  className="flex items-center gap-3 rounded-sm text-base font-semibold text-ink transition-colors duration-150 ease-standard hover:text-accent"
                >
                  <PhoneIcon className="text-accent" />
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-sm text-sm text-ink transition-colors duration-150 ease-standard hover:text-accent"
                >
                  <WhatsAppIcon className="text-accent" />
                  {business.whatsapp}
                  <span className="sr-only">(opens WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href={business.emailHref}
                  className="flex items-center gap-3 rounded-sm text-sm break-all text-ink transition-colors duration-150 ease-standard hover:text-accent"
                >
                  <MailIcon className="shrink-0 text-accent" />
                  {business.email}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-labelledby="footer-services">
            <p
              id="footer-services"
              className="text-xs font-semibold tracking-[0.08em] text-muted"
            >
              SERVICES
            </p>
            <ul className="mt-4 grid gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="rounded-sm text-sm text-ink transition-colors duration-150 ease-standard hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <p
              id="footer-company"
              className="text-xs font-semibold tracking-[0.08em] text-muted"
            >
              COMPANY
            </p>
            <ul className="mt-4 grid gap-2">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="rounded-sm text-sm text-ink transition-colors duration-150 ease-standard hover:text-accent"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold tracking-[0.08em] text-muted">
              AREAS WE COVER
            </p>
            <p className="mt-4 text-sm text-muted">
              {areas.slice(0, 14).join(" · ")} and every town and village in between.
            </p>
            <Link
              href="/areas"
              className="mt-4 inline-block rounded-sm text-sm font-semibold text-accent transition-colors duration-150 ease-standard hover:text-accent-bright"
            >
              See full coverage
            </Link>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {copyrightYear} {business.name}. All rights
            reserved.
          </p>
          <p>Licensed private hire operator · Covering all of {business.region}</p>
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
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-sm bg-accent-bright px-4 text-sm font-semibold text-surface transition-colors duration-150 ease-standard hover:bg-accent active:bg-accent"
        >
          <PhoneIcon />
          Call now
        </a>
        <a
          href={business.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-sm border border-accent px-4 text-sm font-semibold text-accent transition-colors duration-150 ease-standard hover:bg-accent hover:text-surface"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
