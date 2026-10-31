import Link from "next/link";
import {
  CheckList,
  CtaGroup,
  Figure,
  PageHero,
  Section,
  SectionHead,
} from "@/components/ui";
import { airports, business, otherAreas, ports, towns } from "@/lib/business";
import type { PhotoKey } from "@/lib/photos";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "Taxi Service Across West Sussex — Towns & Villages We Cover",
  description: `${business.name} covers the whole of West Sussex — Horsham, Chichester, Worthing, Arundel, Petworth, Storrington, Billingshurst and Pulborough — with fixed-price airport transfers to anywhere in the UK. Call ${business.phone}.`,
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Areas we cover", path: "/areas" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="COVERAGE"
        photo="downs"
        title={`A West Sussex taxi firm, covering the whole county`}
        lede="Pulborough is in our name, not the edge of our map. We pick up across West Sussex — from Horsham down to Worthing, from Chichester across to Haywards Heath — and we will drive you anywhere on the UK mainland."
        trail={[
          { name: "Home", path: "/" },
          { name: "Areas we cover", path: "/areas" },
        ]}
      >
        <CtaGroup
          bookingUrl={business.bookingUrl}
          phone={business.phone}
          phoneHref={business.phoneHref}
          tone="onDark"
        />
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="TOWNS"
          title="Where we work, town by town"
          lede="Each of these has its own page with typical journey times, the places nearby we also cover, and the kind of work we do there."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {towns.map((town) => (
            <Link
              key={town.slug}
              href={`/areas/${town.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-[border-color,box-shadow] duration-150 ease-standard hover:border-primary hover:shadow-sm"
            >
              <Figure
                photo={town.photo as PhotoKey}
                ratio="card"
                rounded={false}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold">
                  Taxis in {town.name}
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted">{town.summary}</p>
                <span className="mt-6 text-sm font-semibold text-primary">
                  {town.name} details
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block transition-transform duration-150 ease-standard group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead
          eyebrow="EVERYWHERE ELSE"
          title="And the rest of the county"
          lede="No page of their own yet, but all covered on the same terms and the same number. If your village is not listed it is almost certainly still us you want."
        />
        <ul className="mt-8 flex flex-wrap gap-2">
          {otherAreas.map((a) => (
            <li
              key={a}
              className="rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            >
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-9 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHead eyebrow="AIRPORTS" title="Airports we run to" />
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {airports.map((a) => (
                <li
                  key={a}
                  className="rounded-lg border border-line bg-surface px-4 py-3 text-sm font-medium"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="PORTS" title="Cruise and ferry ports" />
            <ul className="mt-6 grid gap-3">
              {ports.map((p) => (
                <li
                  key={p}
                  className="rounded-lg border border-line bg-surface px-4 py-3 text-sm font-medium"
                >
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Cruise transfers are quoted as a fixed price including the drop at
              the terminal, and we take the return leg on the same booking so
              there is a car waiting when you dock.
            </p>
          </div>
        </div>
      </Section>

      <Section ground="mist">
        <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHead
              eyebrow="REGULAR DESTINATIONS"
              title="Journeys we make week in, week out"
              lede="Knowing the route matters: where the drop-off has moved to, which approach avoids the worst of it, how much earlier you really need to leave."
            />
            <Figure photo="arundel" ratio="wide" className="mt-7" />
          </div>
          <CheckList
            className="sm:grid-cols-2"
            items={[
              "Gatwick Airport, both terminals",
              "Heathrow Airport, all terminals",
              "Pulborough, Horsham and Arundel stations",
              "Central London and the City",
              "Southampton cruise terminals",
              "Goodwood and Fontwell racecourses",
              "Glyndebourne and Chichester Festival Theatre",
              "Brighton, Worthing and the coast",
              "St Richard's and Worthing hospitals",
              "Universities across the South",
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="rounded-lg border border-line bg-surface p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Travelling somewhere unusual?
          </h2>
          <p className="mt-3 max-w-[620px] text-base text-muted">
            Long distance is normal work for us. Tell us the destination and we
            will quote a fixed total for the journey, return leg included if you
            need one.
          </p>
          <CtaGroup
            className="mt-7"
            size="lg"
            bookingUrl={business.bookingUrl}
            phone={business.phone}
            phoneHref={business.phoneHref}
          />
        </div>
      </Section>
    </>
  );
}
