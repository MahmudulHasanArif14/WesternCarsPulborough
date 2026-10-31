import {
  CheckList,
  CtaGroup,
  PageHero,
  Section,
  SectionHead,
} from "@/components/ui";
import { business } from "@/lib/business";
import { photoCredits } from "@/lib/photos";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "About Us — Licensed Taxi & Private Hire Across West Sussex",
  description: `${business.name} is a licensed taxi and private hire operator covering the whole of West Sussex — Horsham, Chichester, Worthing, Arundel, Pulborough and beyond — ${business.hours}.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "We quote, then we stick to it",
    body: "The price you are given is the price you pay. Traffic, a delayed flight or a longer wait than expected is our problem to absorb, not a line added to your fare at the end.",
  },
  {
    title: "We turn up early",
    body: "Arriving on time means arriving a few minutes before. On airport runs and anything with a deadline, your driver is outside before the time you asked for.",
  },
  {
    title: "We tell you the truth about the vehicle",
    body: "If eight people and eight suitcases will not fit in one minibus, we say so when you book rather than at the kerb on the morning of your flight.",
  },
  {
    title: "One number, a person on the end of it",
    body: "No app queue and no chatbot. Ring the office and somebody who knows the roads and the drivers picks up.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="ABOUT US"
        photo="carExecutive"
        title="A West Sussex taxi firm, run the way a local firm should be"
        lede={`${business.name} is a licensed taxi and private hire operator covering the whole of ${business.region}. We started in ${business.base} and kept the name, but the map is the county — everything from a two-minute run to the station to multi-day executive bookings, ${business.hours}.`}
        trail={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
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
            <p className="text-base">
              Most of our work comes from people who have used us before, or who
              were told about us by somebody who has. That shapes how we
              operate: a firm that depends on the same few thousand households
              and businesses cannot afford to be late, vague about price, or
              unreachable at six in the morning.
            </p>
            <p className="text-base">
              We run a mixed fleet on purpose. A saloon is right for the
              station and wrong for four people flying long-haul; an eight
              seater is right for a group and wrong for one passenger with a
              wheelchair. Matching the vehicle to the journey is most of the job,
              and it starts with asking you the right questions when you book.
            </p>
            <p className="text-base">
              Alongside the everyday local work we hold corporate accounts,
              handle wedding and event transport, run same-day courier jobs, and
              take wheelchair accessible and pet-friendly bookings as standard
              rather than as a favour.
            </p>
          </div>

          <div className="rounded-lg border border-line bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-bold">The essentials</h2>
            <dl className="mt-4 grid gap-4">
              {[
                ["Covering", `All of ${business.region}`],
                ["Office", business.base],
                ["Available", business.hours],
                ["Phone", business.phone],
                ["Email", business.email],
                ["WhatsApp", business.whatsapp],
                ["Payment", "Cash, card, or monthly account"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid gap-1 border-b border-line pb-4 last:border-0 last:pb-0"
                >
                  <dt className="text-xs font-semibold tracking-[0.08em] text-muted">
                    {k.toUpperCase()}
                  </dt>
                  <dd className="text-sm font-medium break-words">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead
          eyebrow="HOW WE WORK"
          title="Four things we do not compromise on"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-lg border border-line bg-surface p-6"
            >
              <h3 className="text-base font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHead
            eyebrow="LICENSING AND SAFETY"
            title="The boring details that matter"
            lede="Private hire is a regulated trade. Here is what that means in practice for a journey you book with us."
          />
          <CheckList
            items={[
              "Licensed private hire operator",
              "Every driver licensed and background-checked",
              "Vehicles inspected to local authority standard",
              "Full private hire insurance on every journey",
              "Pre-booked journeys only — as the licence requires",
              "Child seats and boosters available on request",
            ]}
          />
        </div>
      </Section>

      {/* Attribution required by the CC licences on the site photography.
          Delete this whole section once the company's own photos replace them
          and every `credit` in lib/photos.ts is null. */}
      {photoCredits.length > 0 ? (
        <Section ground="mist">
          <SectionHead
            eyebrow="PHOTOGRAPHY"
            title="About the photographs on this site"
            lede="These are freely licensed photographs of real West Sussex places. They are not pictures of our own vehicles, drivers or customers."
          />
          <ul className="mt-8 grid gap-2 text-xs text-muted sm:grid-cols-2 lg:grid-cols-3">
            {photoCredits.map((c) => (
              <li
                key={c.src}
                className="rounded-lg border border-line bg-surface px-4 py-3"
              >
                {c.author} —{" "}
                <a
                  href={c.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors duration-150 ease-standard hover:text-primary"
                >
                  source
                </a>
                ,{" "}
                <a
                  href={c.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer license"
                  className="underline transition-colors duration-150 ease-standard hover:text-primary"
                >
                  {c.license}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section>
        <div className="rounded-lg border border-line bg-surface p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Try us on your next journey
          </h2>
          <p className="mt-3 max-w-[620px] text-base text-muted">
            Start with something small — a station run or an appointment. If we
            get that right, you will know who to call for the airport.
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
