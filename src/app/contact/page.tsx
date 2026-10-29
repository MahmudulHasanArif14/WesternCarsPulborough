import Link from "next/link";
import {
  MailIcon,
  PageHero,
  PhoneIcon,
  Section,
  SectionHead,
  WhatsAppIcon,
} from "@/components/ui";
import { business } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "Contact Us — Call, WhatsApp or Email",
  description: `Contact ${business.name}: call ${business.phone}, WhatsApp ${business.whatsapp} or email ${business.email}. Answered ${business.hours}.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    key: "phone",
    label: "Call the office",
    value: business.phone,
    href: business.phoneHref,
    note: "The fastest way to book, and the only way to get a price in under a minute. Answered day and night.",
    Icon: PhoneIcon,
    external: false,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: business.whatsapp,
    href: business.whatsappHref,
    note: "Good for sending a flight number, an address or a photo of a parking spot — and you keep a copy of the conversation.",
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    key: "email",
    label: "Email",
    value: business.email,
    href: business.emailHref,
    note: "Best for account enquiries, written quotes, invoices and wedding or event itineraries.",
    Icon: MailIcon,
    external: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="CONTACT"
        photo="carMpvSide"
        title="Get hold of us"
        lede={`One number, answered ${business.hours}. For anything time-critical, call rather than message — you will have a price and a confirmed car before you hang up.`}
        trail={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {channels.map(({ key, label, value, href, note, Icon, external }) => (
            <a
              key={key}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex flex-col rounded-sm border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-150 ease-standard hover:border-accent hover:shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#fafafa] text-accent">
                <Icon />
              </span>
              <span className="mt-6 text-xs font-semibold tracking-[0.08em] text-muted">
                {label.toUpperCase()}
              </span>
              <span className="mt-2 text-lg font-semibold break-words text-ink transition-colors duration-150 ease-standard group-hover:text-accent">
                {value}
              </span>
              <span className="mt-4 flex-1 text-sm text-muted">{note}</span>
              {external ? (
                <span className="sr-only">(opens in a new tab)</span>
              ) : null}
            </a>
          ))}
        </div>
      </Section>

      <Section tint>
        <div className="grid gap-9 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHead
              eyebrow="WHEN WE ANSWER"
              title={`Open ${business.hours}`}
              lede="Including bank holidays, Christmas Day and New Year. Early-morning airport runs and late-night returns are routine work, not an exception."
            />
            <dl className="mt-7 grid gap-4">
              {[
                ["Bookings and quotes", "Any hour, by phone or WhatsApp"],
                ["Account enquiries", "By email, replied to within one working day"],
                ["Wedding and event planning", "By email or a call at a time that suits you"],
                ["Same-day courier jobs", "Call the office — we will give you a collection time"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid gap-1 border-b border-line pb-4 last:border-0 last:pb-0"
                >
                  <dt className="text-sm font-semibold">{k}</dt>
                  <dd className="text-sm text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-sm border border-line bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
              Booking by phone? Have these ready
            </h2>
            <p className="mt-3 text-sm text-muted">
              With these five things we can usually quote and confirm in a
              single call.
            </p>
            <ol className="mt-6 grid gap-4">
              {[
                "Pickup address and destination",
                "Date and pickup time",
                "Number of passengers",
                "Number of large suitcases",
                "Flight number, if it is an airport arrival",
              ].map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-accent-bright text-xs font-bold text-surface"
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-line pt-6 text-sm text-muted">
              Would rather write it down?{" "}
              <Link
                href="/book"
                className="font-semibold text-accent underline transition-colors duration-150 ease-standard hover:text-accent-bright"
              >
                Use the quote form
              </Link>{" "}
              and we will come back to you with a fixed price.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
