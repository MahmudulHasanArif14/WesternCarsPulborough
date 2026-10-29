import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CardLink,
  CheckList,
  CtaGroup,
  PageHero,
  Section,
  SectionHead,
  WhatsAppIcon,
} from "@/components/ui";
import { business, featuredServices, getTown, towns } from "@/lib/business";
import type { PhotoKey } from "@/lib/photos";
import {
  breadcrumbSchema,
  faqSchema,
  townServiceSchema,
  townFaqs,
} from "@/lib/schema";

export function generateStaticParams() {
  return towns.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const town = getTown(slug);
  if (!town) return { title: "Area not found" };
  return {
    title: `Taxi in ${town.name} | Airport Transfers & Private Hire`,
    description: `${town.summary} Fixed prices, available ${business.hours}. Book online or call ${business.phone}.`,
    alternates: { canonical: `/areas/${town.slug}` },
    openGraph: {
      title: `Taxi in ${town.name} | ${business.name}`,
      description: town.summary,
      url: `/areas/${town.slug}`,
    },
  };
}

export default async function TownPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const town = getTown(slug);
  if (!town) notFound();

  const faqs = townFaqs(town);
  const others = towns.filter((t) => t.slug !== town.slug).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(townServiceSchema(town)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Areas we cover", path: "/areas" },
              { name: town.name, path: `/areas/${town.slug}` },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow={`${town.name.toUpperCase()}, WEST SUSSEX`}
        photo={town.photo as PhotoKey}
        title={`Taxi in ${town.name} — airport transfers and private hire`}
        lede={town.summary}
        trail={[
          { name: "Home", path: "/" },
          { name: "Areas we cover", path: "/areas" },
          { name: town.name, path: `/areas/${town.slug}` },
        ]}
      >
        <CtaGroup
          bookingUrl={business.bookingUrl}
          phone={business.phone}
          phoneHref={business.phoneHref}
          tone="onDark"
        />
      </PageHero>

      {/* Answer-engine block: the direct answer, high on the page. */}
      <Section>
        <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="grid gap-6">
            <div className="rounded-sm border border-accent bg-[#fafafa] p-6">
              <h2 className="text-base font-semibold">
                Do you cover {town.name}?
              </h2>
              <p className="mt-3 text-base">
                Yes. {business.name} covers {town.name} and the whole of{" "}
                {business.region}, {business.hours}. We run fixed-price airport
                transfers, local journeys, minibuses for groups, wheelchair
                accessible vehicles and executive cars. Book online or call{" "}
                <a
                  href={business.phoneHref}
                  className="font-semibold text-accent underline"
                >
                  {business.phone}
                </a>
                .
              </p>
            </div>

            {town.body.map((para) => (
              <p key={para.slice(0, 40)} className="text-base">
                {para}
              </p>
            ))}

            <div>
              <h2 className="text-lg font-semibold">
                Also covering, around {town.name}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {town.nearby.map((n) => (
                  <li
                    key={n}
                    className="rounded-sm border border-line px-3 py-2 text-sm text-muted"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-sm border border-line bg-surface p-6 shadow-sm lg:sticky lg:top-[96px]">
            <h2 className="text-lg font-semibold">
              From {town.name}, typically
            </h2>
            <ul className="mt-4 grid gap-3">
              {town.journeys.map((j) => (
                <li
                  key={j.to}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-sm font-medium">{j.to}</span>
                  <span className="shrink-0 text-xs text-muted">{j.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              Door-to-door estimates that vary with traffic. Every journey is
              quoted as a fixed price before you travel.
            </p>
            <div className="mt-6 border-t border-line pt-6">
              <CtaGroup
                className="sm:flex-col"
                size="lg"
                bookingUrl={business.bookingUrl}
                phone={business.phone}
                phoneHref={business.phoneHref}
              />
              <p className="mt-4 flex items-start gap-2 text-xs text-muted">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                Or WhatsApp{" "}
                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent underline"
                >
                  {business.whatsapp}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tint>
        <SectionHead
          eyebrow={`SERVICES IN ${town.name.toUpperCase()}`}
          title={`What we do in ${town.name}`}
          lede={`Every service we run is available in ${town.name} on the same terms and the same number.`}
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
      </Section>

      <Section>
        <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHead
              eyebrow="QUESTIONS"
              title={`Booking a taxi in ${town.name}`}
            />
            <CheckList
              className="mt-7"
              items={[
                "Fixed price quoted before you travel",
                `Available ${business.hours}`,
                "Card and cash in every vehicle",
                "Licensed drivers, licensed vehicles",
              ]}
            />
          </div>
          <div className="grid gap-3">
            {faqs.map((f) => (
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

      <Section tint>
        <SectionHead
          eyebrow="NEARBY"
          title="Other towns we cover"
          lede="Same firm, same fixed prices, same number."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((t) => (
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
          <Link
            href="/areas"
            className="rounded-sm text-sm font-semibold text-accent underline transition-colors duration-150 ease-standard hover:text-accent-bright"
          >
            See the full coverage area
          </Link>
        </div>
      </Section>
    </>
  );
}
