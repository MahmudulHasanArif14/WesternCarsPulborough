"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business, services, towns } from "@/lib/business";
import { ButtonLink } from "./ui";

/* ─────────────────────────────────────────────────────────────
   SiteHeader
   Anatomy: primary call bar → white bar (logo · nav · Book Online ·
   hamburger) → mobile panel.
   Desktop dropdowns open on hover and on focus-within, so they are
   reachable by keyboard without JavaScript state.
   ───────────────────────────────────────────────────────────── */

const serviceLinks = services.map((s) => ({
  href: `/services/${s.slug}`,
  label: s.name,
}));

const areaLinks = towns.map((t) => ({
  href: `/areas/${t.slug}`,
  label: `${t.name} Taxis`,
}));

type NavItem =
  | { href: string; label: string; children?: undefined }
  | { label: string; href: string; children: { href: string; label: string }[] };

const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", children: serviceLinks },
  { href: "/fleet", label: "Fleet" },
  { href: "/areas", label: "Areas", children: areaLinks },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={["h-4 w-4", className].filter(Boolean).join(" ")}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape closes the panel and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock scroll behind the open panel.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* ── Call bar ───────────────────────────────────────── */}
      <div className="bg-primary">
        <div className="container-page py-2 text-right text-sm font-medium text-surface">
          <span className="hidden sm:inline">Call Us 24/7 : </span>
          <a
            href={business.phoneHref}
            className="rounded-sm font-semibold transition-opacity duration-150 ease-standard hover:opacity-80"
          >
            <span className="sm:hidden">Call 24/7: </span>
            {business.phone}
          </a>
        </div>
      </div>

      {/* ── Main bar ───────────────────────────────────────── */}
      <div className="border-b border-line bg-surface">
        <div className="container-page flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 rounded-sm"
            aria-label={`${business.name} — home`}
          >
            <Image
              src="/logo.png"
              alt=""
              width={48}
              height={48}
              priority
              className="h-12 w-12 object-contain"
            />
            <span className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight">
                Western Cars
              </span>
              <span className="mt-1 hidden text-xs font-semibold tracking-wide text-muted uppercase sm:inline">
                {business.base} · {business.tagline}
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={[
                      "flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-semibold transition-colors duration-150 ease-standard hover:text-primary",
                      isActive(item.href) ? "text-primary" : "text-ink",
                    ].join(" ")}
                  >
                    {item.label}
                    <ChevronDown className="transition-transform duration-150 ease-standard group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute top-full left-0 z-50 max-h-[70vh] min-w-[260px] overflow-y-auto rounded-b-lg border border-line bg-surface py-1 opacity-0 shadow-lg transition-opacity duration-150 ease-standard group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2 text-sm text-ink transition-colors duration-150 ease-standard hover:bg-mist/50 hover:text-primary"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={[
                    "rounded-sm px-3 py-2 text-sm font-semibold transition-colors duration-150 ease-standard hover:text-primary",
                    isActive(item.href) ? "text-primary" : "text-ink",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href={business.bookingUrl}
              className="hidden sm:inline-flex"
            >
              Book Online
            </ButtonLink>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex h-11 w-11 items-center justify-center rounded-btn border border-line text-ink transition-colors duration-150 ease-standard hover:border-primary hover:text-primary lg:hidden"
            >
              <span className="sr-only">
                {open ? "Close menu" : "Open menu"}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-5 w-5"
              >
                {open ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile panel ───────────────────────────────────── */}
      {open ? (
        <div
          id="mobile-nav"
          onClick={(e) => {
            // Any link tapped inside the panel dismisses it.
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
          className="border-b border-line bg-surface lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="container-page max-h-[calc(100dvh-136px)] overflow-y-auto py-4"
          >
            <ul>
              {nav.map((item) =>
                item.children ? (
                  <li key={item.label} className="border-b border-line/60">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="flex-1 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-standard hover:text-primary"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded((v) =>
                            v === item.label ? null : item.label,
                          )
                        }
                        aria-expanded={expanded === item.label}
                        className="flex h-11 w-11 items-center justify-center rounded-sm text-muted transition-colors duration-150 ease-standard hover:text-primary"
                      >
                        <span className="sr-only">
                          {expanded === item.label ? "Collapse" : "Expand"}{" "}
                          {item.label}
                        </span>
                        <ChevronDown
                          className={[
                            "transition-transform duration-150 ease-standard",
                            expanded === item.label ? "rotate-180" : "",
                          ].join(" ")}
                        />
                      </button>
                    </div>
                    {expanded === item.label ? (
                      <ul className="pb-2">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="block border-b border-line/50 px-4 py-2 text-sm text-muted transition-colors duration-150 ease-standard hover:text-primary"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ) : (
                  <li key={item.href} className="border-b border-line/60">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={[
                        "block py-3 text-sm font-semibold transition-colors duration-150 ease-standard hover:text-primary",
                        isActive(item.href) ? "text-primary" : "text-ink",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <ButtonLink
              href={business.bookingUrl}
              size="lg"
              className="mt-5 w-full"
            >
              Book Online
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
