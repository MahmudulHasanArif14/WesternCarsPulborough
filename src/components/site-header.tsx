"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business, services } from "@/lib/business";
import { ButtonLink, PhoneIcon } from "./ui";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/areas", label: "Areas" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape closes and returns focus to the toggle.
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
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-sm"
          aria-label={`${business.name} — home`}
        >
          <Image src="/logo.png" alt="" width={44} height={44} priority />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">
              Western Cars
            </span>
            <span className="mt-1 hidden text-xs font-semibold text-muted sm:inline">
              {business.tagline} · {business.region}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={[
                    "rounded-sm text-sm font-medium transition-colors duration-150 ease-standard hover:text-accent",
                    isActive(item.href) ? "text-accent" : "text-ink",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={business.phoneHref}
            className="hidden items-center gap-2 rounded-sm text-sm font-semibold text-ink transition-colors duration-150 ease-standard hover:text-accent md:flex"
          >
            <PhoneIcon />
            {business.phone}
          </a>
          <ButtonLink
            href={business.bookingUrl}
            className="hidden sm:inline-flex"
          >
            Book online
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-line text-ink transition-colors duration-150 ease-standard hover:border-accent hover:text-accent lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-5 w-5 fill-current"
            >
              {open ? (
                <path d="M5.3 4 4 5.3 8.7 10 4 14.7 5.3 16 10 11.3 14.7 16 16 14.7 11.3 10 16 5.3 14.7 4 10 8.7z" />
              ) : (
                <path d="M3 5h14v1.6H3zm0 4.2h14v1.6H3zm0 4.2h14V15H3z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          onClick={(e) => {
            // Any link tapped inside the panel dismisses it.
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
          className="border-t border-line bg-surface lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="container-page max-h-[calc(100dvh-72px)] overflow-y-auto py-6"
          >
            <ul className="grid gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={[
                      "block rounded-sm px-3 py-3 text-base font-semibold transition-colors duration-150 ease-standard hover:bg-[#fafafa]",
                      isActive(item.href) ? "text-accent" : "text-ink",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 mb-2 px-3 text-xs font-semibold tracking-[0.08em] text-muted">
              ALL SERVICES
            </p>
            <ul className="grid gap-1 pb-4">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="block rounded-sm px-3 py-2 text-sm text-muted transition-colors duration-150 ease-standard hover:bg-[#fafafa] hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>

            <ButtonLink href={business.bookingUrl} size="lg" className="w-full">
              Book online
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
