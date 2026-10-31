import {
  CardLink,
  CtaGroup,
  PageHero,
  Section,
  SectionHead,
} from "@/components/ui";
import { allCategories, business, serviceGroups, services } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "Our Services — Taxi, Airport, Executive & Accessible Travel",
  description: `All ${services.length} services from ${business.name}, covering the whole of West Sussex: airport transfers, corporate accounts, wheelchair accessible taxis, minibuses, weddings, executive travel, couriers and more. Call ${business.phone}.`,
  alternates: { canonical: "/services" },
};

const groupBlurbs: Record<string, string> = {
  Travel: "The journeys we run most — airports, stations, long runs and local trips.",
  Business: "Account travel, executive cars and same-day courier work for employers.",
  Occasions: "Weddings, race days, concerts and anything where timing matters more than usual.",
  Specialist: "Journeys that need a particular vehicle or a particular kind of care.",
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="SERVICES"
        photo="carMpvFront"
        title="Everything we do, right across West Sussex"
        lede={`${services.length} services, one office and one number. If what you need is not listed, ring us anyway — most unusual requests turn out to be something we already do.`}
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      >
        <CtaGroup
          bookingUrl={business.bookingUrl}
          phone={business.phone}
          phoneHref={business.phoneHref}
          tone="onDark"
        />
      </PageHero>

      {serviceGroups.map((group, i) => {
        const inGroup = services.filter((s) => s.group === group);
        if (inGroup.length === 0) return null;
        return (
          <Section key={group} ground={i % 2 === 1 ? "mist" : "white"}>
            <SectionHead title={group} lede={groupBlurbs[group]} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {inGroup.map((s) => (
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
          </Section>
        );
      })}

      <Section>
        <SectionHead
          eyebrow="ALSO ASKED FOR AS"
          title="Other names for the work we do"
          lede="People describe the same journey in different ways. These all come through to the same office on the same number."
        />
        <ul className="mt-8 flex flex-wrap gap-2">
          {[...new Set(allCategories)].map((c) => (
            <li
              key={c}
              className="rounded-lg border border-line px-3 py-2 text-sm text-muted"
            >
              {c}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
