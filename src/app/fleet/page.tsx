import {
  CheckList,
  CtaGroup,
  Figure,
  PageHero,
  Section,
  SectionHead,
} from "@/components/ui";
import { business } from "@/lib/business";
import type { PhotoKey } from "@/lib/photos";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "Our Fleet — Saloons, Estates, Minibuses & Accessible Vehicles",
  description: `The ${business.name} fleet: saloons, estates for extra luggage, 6-8 seater minibuses, wheelchair accessible vehicles and executive cars. Call ${business.phone} and we will match the vehicle to the journey.`,
  alternates: { canonical: "/fleet" },
};

const fleet = [
  {
    name: "Saloon",
    photo: "carSaloon",
    capacity: "Up to 4 passengers · 2 large cases",
    body: "The everyday car. Station runs, appointments, local journeys and a couple travelling to the airport with normal luggage.",
    good: [
      "Local journeys and station transfers",
      "Up to four passengers",
      "Two large cases plus hand luggage",
      "Card payment on board",
    ],
  },
  {
    name: "Estate",
    photo: "carEstate",
    capacity: "Up to 4 passengers · 4 large cases",
    body: "Same number of seats as the saloon but roughly double the boot. The right choice when the luggage, not the party size, is the problem.",
    good: [
      "Airport runs with full luggage",
      "Golf clubs, skis and pushchairs",
      "Cruise port transfers",
      "University term runs",
    ],
  },
  {
    name: "MPV / People Carrier",
    photo: "carMpvFront",
    capacity: "Up to 6 passengers · 4 large cases",
    body: "Keeps a family or small group together in one vehicle at one fare, with enough boot space to still be useful at an airport.",
    good: [
      "Families of five or six",
      "Small groups to events",
      "Child seats fitted on request",
      "Airport work with moderate luggage",
    ],
  },
  {
    name: "8 Seater Minibus",
    photo: "carMpvSide",
    capacity: "Up to 8 passengers · luggage varies",
    body: "Our largest standard vehicle. Eight three-point belts. With a full load of passengers, luggage space is limited — tell us your case count and we will be straight with you about whether one vehicle is enough.",
    good: [
      "Groups of seven or eight",
      "Nights out and event travel",
      "Sports teams and golf trips",
      "Hen and stag transport",
    ],
  },
  {
    name: "Wheelchair Accessible Vehicle",
    photo: "carAccessible",
    capacity: "1 wheelchair + up to 4 passengers",
    body: "Rear ramp access with four-point chair restraints and a separate occupant belt, so most passengers travel without transferring out of their chair.",
    good: [
      "Manual and most powered chairs",
      "Hospital, clinic and day-centre runs",
      "Carer or companion travels free",
      "No charge for extra loading time",
    ],
  },
  {
    name: "Executive Saloon",
    photo: "carExecutive",
    capacity: "Up to 3 passengers · 2 large cases",
    body: "Kept to showroom standard with a suited driver, for client-facing journeys, VIP travel and chauffeur bookings by the half-day or day.",
    good: [
      "Client collection and corporate travel",
      "VIP and escort journeys",
      "Weddings and formal occasions",
      "Half-day, full-day and multi-day hire",
    ],
  },
];

export default function FleetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Fleet", path: "/fleet" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="OUR FLEET"
        photo="carExecutive"
        title="The right vehicle for the journey, not just the nearest one"
        lede="Seat count is the obvious question; luggage is usually the one that catches people out. Tell us passengers and large cases when you book and we will match the vehicle properly."
        trail={[
          { name: "Home", path: "/" },
          { name: "Fleet", path: "/fleet" },
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
        <div className="grid gap-6 lg:grid-cols-2">
          {fleet.map((v) => (
            <article
              key={v.name}
              className="overflow-hidden rounded-lg border border-line bg-surface transition-[border-color,box-shadow] duration-150 ease-standard hover:border-primary hover:shadow-sm"
            >
              <Figure
                photo={v.photo as PhotoKey}
                ratio="wide"
                rounded={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="p-6">
              <h2 className="text-lg font-bold">{v.name}</h2>
              <p className="mt-1 text-xs font-semibold text-primary">
                {v.capacity}
              </p>
              <p className="mt-4 text-sm text-muted">{v.body}</p>
              <p className="mt-6 text-xs font-semibold tracking-[0.08em] text-muted">
                GOOD FOR
              </p>
              <CheckList items={v.good} className="mt-3 text-sm" />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead
          eyebrow="EVERY VEHICLE"
          title="What you get whichever car turns up"
        />
        <CheckList
          className="mt-8 sm:grid-cols-2 lg:grid-cols-3"
          items={[
            "Licensed vehicle, licensed driver",
            "Fully insured for private hire",
            "Card and cash payment on board",
            "Non-smoking throughout",
            "Child seats and boosters on request",
            "Clean inside, every journey",
          ]}
        />
      </Section>

      <Section>
        <div className="rounded-lg border border-line bg-surface p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Not sure which you need?
          </h2>
          <p className="mt-3 max-w-[620px] text-base text-muted">
            Tell us the number of passengers and the number of large cases and
            we will tell you which vehicle fits — including when the honest
            answer is that you need two.
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
