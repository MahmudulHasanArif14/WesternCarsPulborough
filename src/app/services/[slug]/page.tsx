import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ButtonLink,
  CardLink,
  BookNowIcon,
  CheckList,
  CtaGroup,
  PageHero,
  PhoneIcon,
  Section,
  SectionHead,
  WhatsAppIcon,
} from "@/components/ui";
import { business, getService, services } from "@/lib/business";
import type { PhotoKey } from "@/lib/photos";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.name} in West Sussex`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${business.name}`,
      description: service.summary,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services
    .filter((s) => s.slug !== service.slug)
    .sort((a, b) => {
      // Same group first, then the rest in declaration order.
      const score = (s: typeof a) => (s.group === service.group ? 0 : 1);
      return score(a) - score(b);
    })
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(service.slug, service.name, service.summary),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.name, path: `/services/${service.slug}` },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow={service.group.toUpperCase()}
        photo={service.photo as PhotoKey}
        title={`${service.name} in West Sussex`}
        lede={service.summary}
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
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
        <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="grid gap-6">
            {service.body.map((para) => (
              <p key={para.slice(0, 40)} className="text-base">
                {para}
              </p>
            ))}

            {service.alsoKnownAs && service.alsoKnownAs.length > 0 ? (
              <div className="rounded-sm border border-line bg-[#fafafa] p-6">
                <p className="text-xs font-semibold tracking-[0.08em] text-muted">
                  ALSO ASKED FOR AS
                </p>
                <p className="mt-3 text-sm text-muted">
                  {service.alsoKnownAs.join(" · ")}
                </p>
              </div>
            ) : null}
          </div>

          <aside className="rounded-sm border border-line bg-surface p-6 shadow-sm lg:sticky lg:top-[96px]">
            <h2 className="text-lg font-semibold">What is included</h2>
            <CheckList items={service.includes} className="mt-4" />
            <div className="mt-6 grid gap-3 border-t border-line pt-6">
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
                variant="ghost"
                size="lg"
              >
                <WhatsAppIcon />
                WhatsApp us
              </ButtonLink>
              <p className="text-xs text-muted">
                Answered {business.hours}. Or email{" "}
                <a
                  href={business.emailHref}
                  className="font-semibold break-all text-accent underline"
                >
                  {business.email}
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tint>
        <SectionHead
          eyebrow="YOU MIGHT ALSO NEED"
          title="Related services"
          lede="Most bookings combine two of these — an airport run with a minibus, or a wedding with guest shuttles. We quote for the whole thing at once."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
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
    </>
  );
}
