import { QuoteForm } from "@/components/quote-form";
import {
  BookNowIcon,
  ButtonLink,
  CheckList,
  PageHero,
  PhoneIcon,
  Section,
  WhatsAppIcon,
} from "@/components/ui";
import { business } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "Get a Fixed Price — Book a Taxi in Pulborough",
  description: `Request a fixed price from ${business.name}. Tell us where and when and we will quote the whole journey before you travel. Or call ${business.phone}, answered ${business.hours}.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Get a quote", path: "/book" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="GET A QUOTE"
        photo="carSaloon"
        title="Tell us the journey, we will give you a fixed price"
        lede="No meter and no estimate that moves later. Fill this in and we will come back with a price for the whole journey — or call the office if you would rather sort it in one conversation."
        trail={[
          { name: "Home", path: "/" },
          { name: "Get a quote", path: "/book" },
        ]}
      />

      <Section>
        <div className="grid gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="rounded-sm border border-line bg-surface p-6 shadow-sm md:p-10">
            <h2 className="text-lg font-semibold">Your journey</h2>
            <p className="mt-2 mb-7 text-sm text-muted">
              Fields marked{" "}
              <span className="font-semibold text-accent">*</span> are required.
              Everything else helps us price it accurately.
            </p>
            <QuoteForm />
          </div>

          <aside className="grid gap-6 lg:sticky lg:top-[96px]">
            <div className="rounded-sm border border-accent bg-[#fafafa] p-6">
              <h2 className="text-base font-semibold">
                Know the journey? Book it now
              </h2>
              <p className="mt-2 text-sm text-muted">
                Our online booking system gives you a price and confirms the car
                immediately — no waiting for us to come back to you.
              </p>
              <div className="mt-6 grid gap-3">
                <ButtonLink href={business.bookingUrl} size="lg">
                  <BookNowIcon />
                  Book online now
                </ButtonLink>
                <ButtonLink
                  href={business.phoneHref}
                  variant="secondary"
                  size="lg"
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
              </div>
              <p className="mt-4 text-xs text-muted">
                Use the form instead when the journey needs explaining — a
                wedding itinerary, a multi-vehicle group, an account enquiry.
              </p>
            </div>

            <div className="rounded-sm border border-line bg-surface p-6">
              <h2 className="text-base font-semibold">
                What your price includes
              </h2>
              <CheckList
                className="mt-4 text-sm"
                items={[
                  "The full journey, door to door",
                  "Airport parking and drop-off charges",
                  "Waiting time after a delayed landing",
                  "Help with luggage",
                  "Card payment on board at no extra cost",
                ]}
              />
            </div>

            <div className="rounded-sm border border-line bg-surface p-6">
              <h2 className="text-base font-semibold">
                Tell us about luggage
              </h2>
              <p className="mt-2 text-sm text-muted">
                It is the single most useful thing you can add. Eight seats does
                not mean eight suitcases — give us the case count and we will
                send a vehicle that actually fits the lot.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
