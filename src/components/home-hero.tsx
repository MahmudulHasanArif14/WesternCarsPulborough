import Image from "next/image";
import { business } from "@/lib/business";
import { photos } from "@/lib/photos";
import { AppBadges, BookNowIcon, PhoneIcon } from "./ui";

/* ─────────────────────────────────────────────────────────────
   HomeHero
   Anatomy: full-bleed photograph → dark scrim → two columns.
   Left: brand H1, accent strapline, lede, phone, Book Online,
   app badges. Right: a drawn handset showing the booking screen.

   The handset is built from elements rather than shipped as a
   bitmap — it stays sharp at any density and costs no extra request.
   Server-rendered: every word is in the initial HTML.
   ───────────────────────────────────────────────────────────── */

function AppMockup() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[460px] w-[220px] rounded-[2rem] border-4 border-ink/80 bg-navy p-2 shadow-xl ring-1 ring-surface/10"
    >
      {/* Earpiece notch */}
      <div className="absolute top-3 left-1/2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-surface/25" />

      <div className="mt-5 flex h-[calc(100%-1.25rem)] flex-col overflow-hidden rounded-[1.5rem] bg-surface">
        <div className="bg-primary px-4 py-3">
          <p className="text-xs font-bold tracking-wide text-surface uppercase">
            Western Cars
          </p>
          <p className="text-[10px] text-surface/80">Book a car</p>
        </div>

        <div className="flex-1 space-y-3 p-3">
          <div className="rounded-lg border border-line p-2">
            <p className="text-[9px] font-semibold text-muted uppercase">
              Pick up
            </p>
            <p className="text-[11px] font-bold text-ink">
              {business.base} Station
            </p>
          </div>
          <div className="rounded-lg border border-line p-2">
            <p className="text-[9px] font-semibold text-muted uppercase">
              Drop off
            </p>
            <p className="text-[11px] font-bold text-ink">
              Gatwick Airport, South
            </p>
          </div>

          <div className="h-16 rounded-lg bg-mist">
            {/* A suggestion of a route map, not a real one. */}
            <svg viewBox="0 0 160 64" className="h-full w-full">
              <path
                d="M8 52 C 40 52, 46 18, 80 18 S 122 44, 152 12"
                fill="none"
                stroke="#3d58a4"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="8" cy="52" r="4" fill="#1864dc" />
              <circle cx="152" cy="12" r="4" fill="#1864dc" />
            </svg>
          </div>

          <div className="rounded-btn bg-accent py-2 text-center text-[11px] font-bold text-surface">
            Confirm booking
          </div>
          <p className="text-center text-[9px] text-muted">
            Fixed price · 24/7
          </p>
        </div>
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[520px] items-center overflow-hidden bg-navy md:min-h-[600px]">
      <Image
        // src={photos.hero.src}
        src={"/redcars.png"}
        alt="A red car on a country road"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-ink/70"
      />

      <div className="relative z-10 container-page grid w-full grid-cols-1 items-center gap-8 py-16 md:grid-cols-2">
        <div className="text-surface">
          <h1 className="mb-2 text-3xl leading-tight font-bold text-surface uppercase md:text-5xl">
            {business.name}
          </h1>
          <p className="mb-4 text-xl font-semibold text-accent md:text-2xl">
            {business.region} Taxi &amp; Private Hire
          </p>
          <p className="mb-5 text-base opacity-90 md:text-lg">
            Fixed-price airport transfers, local taxis and executive travel
            across {business.region}. Book on the go or use our online service —
            available {business.hours}.
          </p>

          <a
            href={business.phoneHref}
            className="mb-5 inline-flex items-center gap-2 rounded-sm text-2xl font-bold text-accent transition-opacity duration-150 ease-standard hover:opacity-80"
          >
            <PhoneIcon className="h-6 w-6" />
            {business.phone}
          </a>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-btn bg-accent px-6 py-3 text-sm font-bold text-surface transition-opacity duration-150 ease-standard hover:opacity-90"
            >
              <BookNowIcon />
              Book Online
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-btn border-2 border-surface/70 px-6 py-3 text-sm font-bold text-surface transition-colors duration-150 ease-standard hover:bg-surface hover:text-navy"
            >
              WhatsApp us
            </a>
          </div>

          <AppBadges appUrl={business.appUrl} className="mt-6" />
        </div>

        <div className="hidden justify-center md:flex">
          <Image
            src={"/hero.png"}
            alt="App mockup showing a booking screen"
            width={420}
            height={460}
            className="rounded-[2rem] shadow-xl"
          />

          {/* <AppMockup /> */}
        </div>
      </div>
    </section>
  );
}
