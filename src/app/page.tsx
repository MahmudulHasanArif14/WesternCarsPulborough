import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import {
  AppBadges,
  BookNowIcon,
  ButtonLink,
  CardLink,
  CarIcon,
  ClockIcon,
  FAQAccordion,
  FeatureRow,
  Figure,
  HeadingDivider,
  PhoneIcon,
  PlaneIcon,
  Section,
  SectionHead,
  ShieldIcon,
} from "@/components/ui";
import {
  airports,
  areas,
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

/** The long-form "welcome" column, as headed paragraphs. */
const welcome = [
  {
    h: `Taxi service for ${business.base} and all of ${business.region}`,
    p: `${business.name} provides licensed private hire across ${business.region} and beyond. Need a railway station, a hospital, a hotel or an airport? Our transfers run to every major UK airport, Gatwick and Heathrow most of all, and we will drive you anywhere on the UK mainland.`,
  },
  {
    h: "Book a London airport transfer",
    p: "Whether you are travelling as a business or a private client, we cover all the capital's airports — London City, Gatwick and Heathrow — as well as Luton and Stansted further out. Whatever you need, we have the vehicle to suit it, so you travel in comfort.",
  },
  {
    h: "Our vehicles",
    p: "An extensive fleet of saloons and estates alongside six, seven and eight seat people carriers. The line-up includes wheelchair accessible vehicles with rear ramp access and four-point restraints.",
  },
  {
    h: "Fully vetted drivers",
    p: "Our drivers are dependable, friendly professionals who have been through a thorough vetting process, so you can count on a hassle-free, safe journey wherever you are going.",
  },
  {
    h: "Ask for your favourite driver",
    p: "Some of our customers get to know their driver and prefer to travel with the same one each time. Depending on availability, we will allocate your preferred driver for every trip.",
  },
  {
    h: `24 hour taxi service for ${business.region}`,
    p: `We operate ${business.hours}, so we are there whenever you need us. We take bookings at short notice and charge the same rates whatever the time, day or night, including bank holidays, Christmas and New Year.`,
  },
  {
    h: "Fixed prices, set before you travel",
    p: "We base our prices on vehicle type and miles travelled — nothing else. Fixed fares apply to a wide range of destinations, including Gatwick, Heathrow, Stansted and Luton airport transfers, and parking charges are already included.",
  },
  {
    h: "Book online, by WhatsApp or by phone",
    p: `We like to be as flexible as possible. Book online at our web booker, call ${business.phone}, or message us on WhatsApp. Cash and card are accepted in every vehicle, and local organisations can set up a business account billed monthly.`,
  },
  {
    h: "Group bookings",
    p: "If a group of you are going somewhere, one vehicle beats several cars: you travel together, nobody drives, and nobody worries about the last train. We cover everything from school runs to hen parties and wedding transport.",
  },
  {
    h: "Customer satisfaction",
    p: "We are a customer-focused business and determined that every passenger is happy with the service we provide. Get in touch today and make your booking with confidence.",
  },
];

const whyUs = [
  {
    icon: <ShieldIcon />,
    title: "Licensed and fully insured",
    body: "A licensed private hire operator with licensed drivers and vehicles inspected to the standard the local authority requires. Competitive rates, quoted up front.",
  },
  {
    icon: <ClockIcon />,
    title: "24/7 taxi service",
    body: `Our cars run ${business.hours}. A 4am airport run or a midnight pickup is routine work, and we take any comment or complaint personally.`,
  },
  {
    icon: <CarIcon />,
    title: "Every kind of journey",
    body: "Saloons, estates, 6–8 seat minibuses, wheelchair accessible vehicles, executive cars and wedding hire — one operator, one standard.",
  },
  {
    icon: <PlaneIcon />,
    title: "Flight-tracked transfers",
    body: "Your driver watches your inbound flight, so an early landing or a two-hour delay costs you nothing extra. Parking is included in the quoted price.",
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

      <HomeHero />

      {/* ───────── Welcome ───────── */}
      <Section>
        <SectionHead
          title={`Welcome to ${business.name}`}
          eyebrow={`Taxi and private hire for ${business.region}`}
        />
        <div className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-2">
          <div className="space-y-4 text-sm leading-relaxed">
            {welcome.map((w) => (
              <div key={w.h}>
                <h3 className="mb-1 text-sm font-bold">{w.h}</h3>
                <p>{w.p}</p>
              </div>
            ))}
            <div className="border-t border-line pt-4">
              <h3 className="mb-1 text-sm font-bold">
                Book your taxi in {business.base} now
              </h3>
              <p>
                Call{" "}
                <a
                  href={business.phoneHref}
                  className="rounded-sm font-bold text-primary hover:underline"
                >
                  {business.phone}
                </a>
                , book online in under a minute, or{" "}
                <Link
                  href="/book"
                  className="rounded-sm font-bold text-primary hover:underline"
                >
                  request a written quote
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <Figure photo="carSaloon" ratio="card" />
            <div className="rounded-lg border border-line bg-mist/40 p-6">
              <h3 className="text-base font-bold">Key facts</h3>
              <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                {[
                  ["Who", business.legalName],
                  ["Where", `${business.base}, ${business.addressRegion}`],
                  ["Covering", business.region],
                  ["Hours", business.hours],
                  ["Phone", business.phone],
                  ["WhatsApp", business.whatsapp],
                  ["Email", business.email],
                  ["Payment", "Cash, card and business accounts"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-semibold tracking-wide text-muted uppercase">
                      {k}
                    </dt>
                    <dd className="mt-0.5 font-medium break-words">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* ───────── Services ───────── */}
      <Section ground="mist" id="our-services">
        <SectionHead
          title="One operator for every kind of journey"
          eyebrow="What we do"
          lede="From a two-minute run to the station to a multi-day executive booking, it is the same office, the same standards and the same fixed-price promise."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="mt-10 text-center">
          <ButtonLink href="/services" variant="outline">
            All {services.length} services
          </ButtonLink>
        </div>
      </Section>

      {/* ───────── App band ───────── */}
      <Section ground="navy">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-surface uppercase md:text-3xl">
              Download our smartphone app
            </h2>
            <HeadingDivider tone="light" align="left" />
            <p className="mt-5 mb-6 text-sm leading-relaxed text-surface/80">
              You can always book a car through our website, by email or on the
              phone. You can also book from our free iPhone and Android app:
              set your pickup and destination, see the price before you
              confirm, and track the car on its way to you. Download it from
              either store, or use the booking page in your mobile browser.
            </p>
            <AppBadges appUrl={business.appUrl} />
          </div>
          <div className="grid gap-4">
            {[
              ["Set your pickup and destination", "No call needed"],
              ["See the fixed price first", "Before you confirm"],
              ["Track your car", "Live, on the way to you"],
              ["Save your regular journeys", "Rebook in two taps"],
            ].map(([t, s]) => (
              <div
                key={t}
                className="flex items-baseline justify-between gap-4 rounded-lg border border-surface/15 bg-surface/5 px-4 py-3"
              >
                <span className="text-sm font-semibold text-surface">{t}</span>
                <span className="shrink-0 text-xs text-surface/70">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────── Service areas band ───────── */}
      <Section ground="primary">
        <h2 className="text-2xl font-bold text-surface md:text-3xl">
          Our taxi service areas
        </h2>
        <HeadingDivider tone="light" align="left" />
        <p className="mt-5 mb-5 text-sm text-surface/90">
          {business.name} provides reliable taxi and private hire services
          across {business.region}. We proudly serve the following locations:
        </p>
        <ul className="mb-6 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3 md:grid-cols-4">
          {areas.map((a) => (
            <li key={a} className="flex items-center gap-1 text-surface/90">
              <span aria-hidden="true" className="opacity-60">
                ·
              </span>
              {a}
            </li>
          ))}
        </ul>

        <h3 className="mt-8 mb-3 text-base font-bold text-surface">
          Towns with their own page
        </h3>
        <ul className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {towns.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/areas/${t.slug}`}
                className="block rounded-lg border border-surface/25 bg-surface/10 px-4 py-3 text-sm font-semibold text-surface transition-colors duration-150 ease-standard hover:bg-surface hover:text-primary"
              >
                Taxis in {t.name}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mb-6 text-sm text-surface/90">
          If your area is not listed, contact us and we will be happy to
          accommodate you —{" "}
          <Link href="/areas" className="rounded-sm underline hover:opacity-100">
            see our full coverage
          </Link>{" "}
          or{" "}
          <Link
            href="/services"
            className="rounded-sm underline hover:opacity-100"
          >
            browse our taxi services
          </Link>
          .
        </p>
        <ButtonLink href={business.bookingUrl} variant="onBand">
          <BookNowIcon />
          Book Online
        </ButtonLink>
      </Section>

      {/* ───────── Why choose us ───────── */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="space-y-8">
            {whyUs.map((w) => (
              <FeatureRow key={w.title} icon={w.icon} title={w.title}>
                {w.body}
              </FeatureRow>
            ))}
          </div>
          <Figure photo="carExecutive" ratio="card" />
        </div>
      </Section>

      {/* ───────── Airports ───────── */}
      <Section ground="mist">
        <SectionHead
          title="Every major UK airport, flight-tracked"
          eyebrow="Airport transfers"
          lede="Meet and greet in arrivals, or kerbside if you would rather go straight to the car. Parking charges are included in the fixed price."
        />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {airports.map((a) => (
            <li
              key={a}
              className="rounded-lg border border-line bg-surface px-4 py-3 text-center text-sm font-semibold shadow-sm"
            >
              {a}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/services/airport-transfers">
            Airport transfer details
          </ButtonLink>
          <ButtonLink href={business.bookingUrl} variant="outline">
            <BookNowIcon />
            Book a transfer
          </ButtonLink>
        </div>
      </Section>

      {/* ───────── FAQ ───────── */}
      <Section>
        <SectionHead
          title="Before you book"
          eyebrow="Frequently asked questions"
          lede="If your question is not here, ring the office — somebody will answer."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion items={homeFaqs} />
        </div>
      </Section>

      {/* ───────── Final CTA ───────── */}
      <section className="bg-primary py-14 text-surface">
        <div className="container-page text-center">
          <h2 className="text-2xl font-bold text-surface md:text-3xl">
            Need a car? Book it now.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-surface/90">
            Book online in under a minute, or ring us and we will give you a
            fixed price on the spot. For anything time-critical, book ahead and
            we will be outside before you need to leave.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={business.bookingUrl} variant="onBand" size="lg">
              <BookNowIcon />
              Book Online
            </ButtonLink>
            <ButtonLink
              href={business.phoneHref}
              size="lg"
              variant="onBand"
              className="border-surface bg-transparent text-surface hover:bg-surface hover:text-primary hover:opacity-100"
            >
              <PhoneIcon />
              {business.phone}
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-surface/80">
            Or{" "}
            <Link href="/book" className="rounded-sm font-bold underline">
              request a written quote
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
