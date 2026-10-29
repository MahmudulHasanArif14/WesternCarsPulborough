import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import {
  BookNowIcon,
  ButtonLink,
  CardLink,
  Figure,
  PhoneIcon,
  Section,
  SectionHead,
  WhatsAppIcon,
} from "@/components/ui";
import {
  airports,
  business,
  featuredServices,
  services,
  towns,
} from "@/lib/business";
import { faqSchema, homeFaqs, townListSchema } from "@/lib/schema";

export const metadata = {
  title: `Taxi in West Sussex | Airport Transfers & Private Hire`,
  description: `Licensed taxi and private hire covering the whole of West Sussex — Horsham, Chichester, Worthing, Arundel, Pulborough and beyond. Fixed-price Gatwick and Heathrow transfers, minibuses, wheelchair accessible vehicles and executive cars, ${business.hours}. Book online or call ${business.phone}.`,
  alternates: { canonical: "/" },
};

const trust = [
  {
    title: "Fixed prices, quoted up front",
    body: "Every journey is priced before you travel. No meter, no surprise surcharge at the end, and parking charges included on airport runs.",
  },
  {
    title: "Available 24 hours",
    body: "A 4am airport run or a midnight pickup is routine work, including bank holidays, Christmas and New Year.",
  },
  {
    title: "The whole county covered",
    body: "Horsham to Worthing, Chichester to Haywards Heath. One firm for the whole of West Sussex, and we will drive you anywhere in the UK.",
  },
  {
    title: "Licensed and fully insured",
    body: "A licensed private hire operator with licensed drivers and vehicles inspected to the standard your local authority requires.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(townListSchema()) }}
      />

      <HeroCarousel />

      {/* ───────── Popular journeys ───────── */}
      <Section>
        <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHead
            eyebrow="POPULAR JOURNEYS"
            title="The runs we make every day"
            lede="Typical door-to-door times. Every journey is quoted as a fixed price before you travel, so traffic is our problem rather than yours."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["Horsham → Gatwick", "approx. 30 minutes"],
              ["Pulborough → Gatwick", "approx. 50 minutes"],
              ["Pulborough → Heathrow", "approx. 1h 30m"],
              ["Chichester → Goodwood", "approx. 15 minutes"],
              ["Worthing → Brighton", "approx. 30 minutes"],
              ["Arundel → Southampton Port", "approx. 1h 10m"],
            ].map(([route, time]) => (
              <li
                key={route}
                className="flex items-baseline justify-between gap-4 rounded-sm border border-line bg-surface px-4 py-3"
              >
                <span className="text-sm font-medium">{route}</span>
                <span className="shrink-0 text-xs text-muted">{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ───────── Services ───────── */}
      <Section tint>
        <SectionHead
          eyebrow="WHAT WE DO"
          title="One operator for every kind of journey"
          lede="From a two-minute run to the station to a multi-day executive booking, it is the same office, the same standards and the same fixed-price promise."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s) => (
            <CardLink
              key={s.slug}
              href={`/services/${s.slug}`}
              title={s.name}
              cta="See details"
            >
              {s.summary}
            </CardLink>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/services" variant="ghost">
            All {services.length} services
          </ButtonLink>
        </div>
      </Section>

      {/* ───────── Why us ───────── */}
      <Section>
        <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead
              eyebrow="WHY WESTERN CARS"
              title="The things that actually matter when you book a taxi"
            />
            <Figure photo="carSaloon" ratio="wide" className="mt-7" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {trust.map((t) => (
              <div key={t.title}>
                <h3 className="text-base font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────── Airports ───────── */}
      <Section tint>
        <div className="grid gap-9 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHead
              eyebrow="AIRPORT TRANSFERS"
              title="Every major UK airport, flight-tracked"
              lede="Your driver watches your inbound flight, so an early landing or a two-hour delay costs you nothing extra. Meet and greet in arrivals, or kerbside if you would rather go straight to the car."
            />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services/airport-transfers">
                Airport transfer details
              </ButtonLink>
              <ButtonLink href={business.bookingUrl} variant="ghost">
                <BookNowIcon />
                Book a transfer
              </ButtonLink>
            </div>
            <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {airports.map((a) => (
                <li
                  key={a}
                  className="rounded-sm border border-line bg-surface px-4 py-3 text-sm font-medium"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <Figure photo="carEstate" ratio="card" />
        </div>
      </Section>

      {/* ───────── Coverage ───────── */}
      <Section>
        <SectionHead
          eyebrow="AREAS WE COVER"
          title="A West Sussex firm, not just a Pulborough one"
          lede="We pick up right across the county. Each town below has its own page with typical journey times and the villages nearby we also cover."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {towns.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/areas/${t.slug}`}
                className="block rounded-sm border border-line bg-surface px-4 py-3 text-base font-medium transition-colors duration-150 ease-standard hover:border-accent hover:text-accent"
              >
                Taxis in {t.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href="/areas" variant="ghost">
            Full coverage area
          </ButtonLink>
        </div>
      </Section>

      {/* ───────── FAQ ───────── */}
      <Section tint>
        <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHead
            eyebrow="QUESTIONS"
            title="Before you book"
            lede="If your question is not here, ring the office — somebody will answer."
          />
          <div className="grid gap-3">
            {homeFaqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border border-line bg-surface p-6 transition-[border-color] duration-150 ease-standard hover:border-accent"
              >
                <summary className="cursor-pointer list-none text-base font-semibold marker:content-none">
                  <span className="flex items-start justify-between gap-4">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-accent transition-transform duration-150 ease-standard group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────── Final CTA ───────── */}
      <Section>
        <div className="rounded-sm border border-line bg-surface p-6 shadow-sm md:p-10">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h2 className="text-lg font-bold md:text-xl">
                Need a car? Book it now.
              </h2>
              <p className="mt-3 max-w-[520px] text-base text-muted">
                Book online in under a minute, or ring us and we will give you a
                fixed price on the spot. For anything time-critical, book ahead
                and we will be outside before you need to leave.
              </p>
            </div>
            <div className="grid gap-3">
              <ButtonLink href={business.bookingUrl} size="lg">
                <BookNowIcon />
                Book online
              </ButtonLink>
              <ButtonLink
                href={business.phoneHref}
                size="lg"
                variant="secondary"
              >
                <PhoneIcon />
                {business.phone}
              </ButtonLink>
              <ButtonLink
                href={business.whatsappHref}
                size="lg"
                variant="ghost"
              >
                <WhatsAppIcon />
                WhatsApp us
              </ButtonLink>
              <Link
                href="/book"
                className="rounded-sm text-center text-sm font-semibold text-accent underline transition-colors duration-150 ease-standard hover:text-accent-bright"
              >
                Or request a written quote
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
