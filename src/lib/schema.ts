import {
  allCategories,
  areas,
  business,
  services,
  towns,
  type Town,
} from "./business";

const ORG_ID = `${business.url}/#organization`;

/**
 * LocalBusiness / TaxiService graph for the whole site.
 *
 * GEO note: `areaServed` is the full West Sussex coverage, not just the base
 * town, and is expressed both as an administrative area and as a service
 * radius so that search and assistant surfaces can resolve either.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TaxiService", "LocalBusiness"],
    "@id": ORG_ID,
    name: business.name,
    legalName: business.legalName,
    description: `Licensed taxi and private hire covering the whole of ${business.region}. Fixed-price airport transfers, corporate accounts, wheelchair accessible vehicles, weddings and executive travel, ${business.hours}.`,
    url: business.url,
    telephone: "+441798305555",
    email: business.email,
    priceRange: "££",
    currenciesAccepted: "GBP",
    paymentAccepted: "Cash, Credit Card, Debit Card, Invoice",
    image: `${business.url}/images/car-saloon.jpg`,
    logo: {
      "@type": "ImageObject",
      url: `${business.url}/logo.png`,
      width: 512,
      height: 512,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "West Sussex",
        containedInPlace: { "@type": "Country", name: "United Kingdom" },
      },
      ...areas.map((a) => ({ "@type": "City", name: a })),
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: business.geo.lat,
        longitude: business.geo.lng,
      },
      geoRadius: business.geo.radiusKm * 1000,
    },
    knowsAbout: allCategories,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Taxi and private hire services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.summary,
          url: `${business.url}/services/${s.slug}`,
        },
      })),
    },
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book a taxi online",
      target: {
        "@type": "EntryPoint",
        urlTemplate: business.bookingUrl,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Taxi booking" },
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+441798305555",
        contactType: "reservations",
        availableLanguage: "English",
        areaServed: "GB",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: "+447722489859",
        contactType: "customer support",
        availableLanguage: "English",
      },
    ],
  };
}

export function serviceSchema(slug: string, name: string, summary: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description: summary,
    url: `${business.url}/services/${slug}`,
    serviceType: name,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "West Sussex",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: { "@type": "ContactPoint", telephone: "+441798305555" },
      serviceUrl: business.bookingUrl,
    },
  };
}

/** Service + Place pairing for a town landing page. */
export function townServiceSchema(town: Town) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Taxi service in ${town.name}`,
    description: town.summary,
    url: `${business.url}/areas/${town.slug}`,
    serviceType: "Taxi service",
    provider: { "@id": ORG_ID },
    areaServed: [
      {
        "@type": "City",
        name: town.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "West Sussex",
        },
      },
      ...town.nearby.map((n) => ({ "@type": "Place", name: n })),
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: { "@type": "ContactPoint", telephone: "+441798305555" },
      serviceUrl: business.bookingUrl,
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${business.url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** ItemList of the town pages, to help crawlers find the whole set. */
export function townListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Towns served by ${business.name}`,
    itemListElement: towns.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Taxi in ${t.name}`,
      url: `${business.url}/areas/${t.slug}`,
    })),
  };
}

/**
 * Per-town FAQs.
 *
 * AEO note: these are written as complete, self-contained answers. An assistant
 * quoting any single answer should still convey the town, the company, the
 * availability and the phone number without needing the surrounding page.
 */
export function townFaqs(town: Town) {
  const nearest = town.journeys[0];
  return [
    {
      q: `Do you cover ${town.name}?`,
      a: `Yes. ${business.name} covers ${town.name} and the whole of ${business.region}, ${business.hours}. You can book online at ${business.bookingUrl} or call ${business.phone}.`,
    },
    {
      q: `How much is a taxi from ${town.name} to ${nearest.to}?`,
      a: `${town.name} to ${nearest.to} takes ${nearest.time.replace("approx. ", "roughly ")} door to door. We quote a fixed price for the journey before you travel rather than running a meter, so traffic does not change what you pay. Call ${business.phone} or book online for a price.`,
    },
    {
      q: `Can I book a taxi in ${town.name} in advance?`,
      a: `Yes, and for anything time-critical you should. Pre-booked journeys from ${town.name} are confirmed with a fixed price, and your driver arrives a few minutes early as standard. Book online at ${business.bookingUrl}, call ${business.phone}, or WhatsApp ${business.whatsapp}.`,
    },
    {
      q: `Do you run airport transfers from ${town.name}?`,
      a: `Yes. We run fixed-price transfers from ${town.name} to Gatwick, Heathrow and every major UK airport, with flight tracking on arrivals, free waiting time after a delayed landing, and all parking charges included in the quoted price.`,
    },
    {
      q: `Is there a wheelchair accessible taxi in ${town.name}?`,
      a: `Yes. We run wheelchair accessible vehicles with rear ramp access and four-point restraints across ${business.region}, including ${town.name}, so most passengers travel without transferring out of their chair. A carer or companion travels free. Mention the type of chair when you book.`,
    },
    {
      q: `Do you have minibuses for groups in ${town.name}?`,
      a: `Yes. We run 6 to 8 seater minibuses from ${town.name}, which keeps a group together at one fare rather than splitting across two cars. For airport journeys tell us the number of large suitcases as well as passengers, since luggage usually sets the limit rather than seats.`,
    },
  ];
}

export const homeFaqs = [
  {
    q: "Do you only cover Pulborough?",
    a: `No. Pulborough is in our name, but ${business.name} covers the whole of ${business.region} — Horsham, Chichester, Worthing, Arundel, Petworth, Storrington, Billingshurst and everywhere in between — and we will drive you to any destination on the UK mainland.`,
  },
  {
    q: "How do I book a taxi?",
    a: `Three ways: book online at ${business.bookingUrl}, call ${business.phone}, or WhatsApp ${business.whatsapp}. The phone is fastest for a pickup today; online booking is best for planning ahead. All three are answered ${business.hours}.`,
  },
  {
    q: "How far in advance should I book?",
    a: `For airport transfers and anything time-critical, a day or two ahead is ideal and guarantees the vehicle you want. For local journeys across ${business.region} we can often get to you straight away — call ${business.phone} and we will tell you honestly how long it will be.`,
  },
  {
    q: "How much is a taxi to Gatwick?",
    a: "Gatwick is our most common run — around 50 minutes from Pulborough and about 30 from Horsham. We quote a fixed price for the journey before you travel: no meter, and no extra charge if your flight lands late. Call or book online for a price.",
  },
  {
    q: "Do you track flights for airport pickups?",
    a: "Yes. Every arrival is matched to your flight number and monitored. If you land early we are already waiting; if you are delayed, your pickup time moves with the flight at no extra cost, and parking charges are included in the quoted price.",
  },
  {
    q: "Can you take a wheelchair?",
    a: `Yes. We run wheelchair accessible vehicles with rear ramp access and four-point restraints across ${business.region}, so most passengers travel without transferring out of their chair. A carer or companion travels free. Tell us the type of chair when you book.`,
  },
  {
    q: "Do you carry more than four passengers?",
    a: "Yes — our 6 to 8 seater minibuses keep a group in one vehicle at one fare. For airport runs, tell us the number of large cases as well as passengers, since luggage usually sets the limit rather than seats.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash and card in every vehicle. Business customers can open an account and be invoiced monthly with a reference against each journey.",
  },
  {
    q: "Are you available at night and on bank holidays?",
    a: `We operate ${business.hours}, including Christmas and New Year. Early-morning airport runs and late-night returns are routine work for us.`,
  },
  {
    q: "Will you take my dog?",
    a: "Yes, dogs and small animals are welcome — just tell us when you book so we send a suitable vehicle. Assistance dogs travel at no extra charge, and we use protective covers as standard.",
  },
];
