/**
 * Canonical business data. Every phone number, email and address on the site
 * reads from here — never hardcode contact details in a component.
 */

export const business = {
  name: "Western Cars Pulborough",
  legalName: "Western Cars Pulborough",
  tagline: "Taxi & Private Hire",
  url: "https://westerncarspulborough.co.uk",
  phone: "01798 305555",
  phoneHref: "tel:+441798305555",
  email: "info@westerncarspulborough.co.uk",
  emailHref: "mailto:info@westerncarspulborough.co.uk",
  whatsapp: "+44 7722 489859",
  whatsappHref: "https://wa.me/447722489859",
  /** Live online booking system (iCabbi web booker). */
  bookingUrl: "https://westerncars.webbooker.icabbi.com/",
  /** iCabbi app listing — one link that resolves to Play Store or App Store. */
  appUrl: "https://icab.bi/Western",

  /**
   * Positioning: the firm SERVES the whole of West Sussex. Pulborough is in the
   * name, not the limit of the coverage. Use `region` in customer-facing copy
   * and `base` only where the office location is genuinely the point.
   */
  region: "West Sussex",
  regionLong: "West Sussex and the surrounding counties",
  /** The area served, for copy like "licensed across {area}". */
  area: "West Sussex",
  base: "Pulborough",
  /** Kept for schema.org PostalAddress, which needs a real locality. */
  addressLocality: "Pulborough",
  addressRegion: "West Sussex",

  hours: "24 hours a day, 7 days a week",
  /** Approximate centroid of the coverage area, for LocalBusiness geo. */
  geo: { lat: 50.9576, lng: -0.5139, radiusKm: 40 },
} as const;

export const airports = [
  "Gatwick",
  "Heathrow",
  "Stansted",
  "Luton",
  "London City",
  "Southampton",
  "Bristol",
  "Birmingham",
] as const;

export const ports = ["Southampton", "Portsmouth", "Dover"] as const;

/**
 * Towns with their own landing page at /areas/[slug]. These are the places
 * worth ranking for individually. Everywhere else we cover is listed in
 * `otherAreas` below and on /areas-we-cover.
 */
export type Town = {
  slug: string;
  name: string;
  /** Appears in the page title and H1. */
  summary: string;
  /** Two or three paragraphs of genuinely local copy. */
  body: string[];
  /** Nearby places this page also answers for. */
  nearby: string[];
  /** Typical journeys from this town, with honest rough times. */
  journeys: { to: string; time: string }[];
  /** Key into the photo registry. */
  photo: string;
};

export const towns = [
  {
    slug: "pulborough",
    name: "Pulborough",
    photo: "pulboroughStation",
    summary:
      "Taxis in Pulborough for the station, the surgery, the shops and the airport — pre-booked or as soon as we can reach you.",
    body: [
      "Pulborough is where the office sits, so it is the quickest place in the county for us to reach. Station pickups are the bread and butter: the Arun Valley line into Victoria and down to Bognor means a lot of our mornings start on the station approach and a lot of our evenings end there.",
      "We know which platform the London trains come into, where the drop-off actually is rather than where the signs suggest, and how long the queue onto the A29 takes at half past eight. For a train you cannot miss, book the night before and we will be outside with time in hand.",
      "Beyond the station it is the everyday work — the surgery, Sainsbury's, the school run, the pub and home. Short journeys get the same dispatch and the same drivers as the long airport runs.",
    ],
    nearby: ["Codmore Hill", "Hardham", "Nutbourne", "West Chiltington"],
    journeys: [
      { to: "Gatwick Airport", time: "approx. 50 minutes" },
      { to: "Heathrow Airport", time: "approx. 1h 30m" },
      { to: "Chichester", time: "approx. 35 minutes" },
      { to: "Horsham", time: "approx. 30 minutes" },
    ],
  },
  {
    slug: "horsham",
    name: "Horsham",
    photo: "horsham",
    summary:
      "Taxis and airport transfers in Horsham, with fixed prices to Gatwick and corporate accounts for local employers.",
    body: [
      "Horsham is our busiest town after Pulborough, and it is mostly two kinds of work: Gatwick runs, because the airport is barely half an hour up the road, and business travel for the employers around the town centre and the Broadbridge Heath side.",
      "Gatwick from Horsham is short enough that people are tempted to drive and park — until they price a fortnight in the long stay. We quote a fixed return that usually lands under the parking, and nobody has to leave a car sitting at the airport.",
      "Evening and weekend work runs to Brighton, the Horsham restaurants and the London trains out of Horsham station.",
    ],
    nearby: ["Broadbridge Heath", "Southwater", "Roffey", "Warnham"],
    journeys: [
      { to: "Gatwick Airport", time: "approx. 30 minutes" },
      { to: "Heathrow Airport", time: "approx. 1h 15m" },
      { to: "Central London", time: "approx. 1h 30m" },
      { to: "Brighton", time: "approx. 50 minutes" },
    ],
  },
  {
    slug: "chichester",
    name: "Chichester",
    photo: "downsEntrance",
    summary:
      "Chichester taxis for the Festival Theatre, Goodwood, the hospital and airport transfers across the county.",
    body: [
      "Chichester work has a rhythm to it: theatre nights at the Festival Theatre, race meetings and the Revival up at Goodwood, hospital appointments at St Richard's, and a steady flow of airport runs from the villages around the city.",
      "For the theatre and for Goodwood the journey home is the part that matters. We hold the vehicle for your end time rather than making you join the scrum for a cab afterwards, which on a Revival weekend is the difference between leaving and waiting an hour.",
      "The city centre is largely pedestrianised, so we will agree a specific pickup point when you book instead of guessing at a street corner.",
    ],
    nearby: ["Lavant", "Bosham", "Selsey", "Tangmere", "Westhampnett"],
    journeys: [
      { to: "Goodwood", time: "approx. 15 minutes" },
      { to: "Gatwick Airport", time: "approx. 1h 15m" },
      { to: "Southampton Port", time: "approx. 50 minutes" },
      { to: "Portsmouth", time: "approx. 40 minutes" },
    ],
  },
  {
    slug: "worthing",
    name: "Worthing",
    photo: "worthing",
    summary:
      "Worthing taxis and airport transfers, with minibuses for groups and accessible vehicles for hospital runs.",
    body: [
      "Worthing is a big town with a lot of coast, and the work splits between seafront and station journeys, hospital runs to Worthing Hospital, and airport transfers from the residential streets inland.",
      "Group travel is common here — nights out along the seafront, trips over to Brighton, and family parties that need six or eight seats rather than two cars. One minibus keeps everyone together at one fare.",
      "We also run a good deal of accessible work in Worthing: ramp-access vehicles for appointments and day centres, with no charge for the extra loading time.",
    ],
    nearby: ["Goring-by-Sea", "Findon", "Lancing", "Ferring", "Durrington"],
    journeys: [
      { to: "Gatwick Airport", time: "approx. 1 hour" },
      { to: "Brighton", time: "approx. 30 minutes" },
      { to: "Heathrow Airport", time: "approx. 1h 40m" },
      { to: "Southampton Port", time: "approx. 1h 15m" },
    ],
  },
  {
    slug: "arundel",
    name: "Arundel",
    photo: "arundel",
    summary:
      "Arundel taxis for weddings, events at the castle, the station and airport transfers along the Arun valley.",
    body: [
      "Arundel punches above its size for event work. Weddings at the castle and the cathedral, the festival in August, and a steady stream of visitors who arrive by train and need moving the last mile up the hill.",
      "The town is awkward for vehicles — narrow streets, a one-way system and limited stopping — so we agree the pickup point when you book rather than circling. For weddings we drive the route beforehand and know where the car can actually wait.",
      "Arundel station is on the Arun Valley line, which makes it a common start point for London journeys and a common finish point for people coming home late.",
    ],
    nearby: ["Amberley", "Burpham", "Lyminster", "Walberton", "Slindon"],
    journeys: [
      { to: "Gatwick Airport", time: "approx. 1 hour" },
      { to: "Chichester", time: "approx. 25 minutes" },
      { to: "Goodwood", time: "approx. 30 minutes" },
      { to: "Worthing", time: "approx. 25 minutes" },
    ],
  },
  {
    slug: "petworth",
    name: "Petworth",
    photo: "petworth",
    summary:
      "Petworth taxis and private hire, covering the town, Petworth House events and the surrounding villages.",
    body: [
      "Petworth has no railway station, which changes the job entirely: almost everything here is a car journey, and people book further ahead because there is no fallback if a taxi does not turn up.",
      "We cover the town and the villages around it — Tillington, Lurgashall, Lodsworth, Northchapel — for appointments, shopping trips, the pub and the long runs to the airports. Standing bookings are common for anyone making the same trip each week.",
      "Events at Petworth House and the antiques trade bring visitors who need moving between the town, the hotels and the stations at Pulborough and Haslemere.",
    ],
    nearby: ["Tillington", "Lurgashall", "Lodsworth", "Northchapel", "Fittleworth"],
    journeys: [
      { to: "Pulborough station", time: "approx. 15 minutes" },
      { to: "Haslemere station", time: "approx. 25 minutes" },
      { to: "Gatwick Airport", time: "approx. 1h 5m" },
      { to: "Chichester", time: "approx. 30 minutes" },
    ],
  },
  {
    slug: "storrington",
    name: "Storrington",
    photo: "storrington",
    summary:
      "Storrington taxis for local journeys, appointments, Pulborough station and fixed-price airport transfers.",
    body: [
      "Storrington sits right under the Downs, ten minutes from the office, and is one of the places we cover most reliably at short notice.",
      "Much of the work here is appointments and station runs — Pulborough for the London line, Amberley for the local stops — plus a good deal of evening work to Worthing and Brighton.",
      "We do a lot of accessible and assisted journeys in and around Storrington. If you need help to the door or extra time getting in and out, say so when you book and the driver will allow for it.",
    ],
    nearby: ["Sullington", "Washington", "Ashington", "West Chiltington", "Amberley"],
    journeys: [
      { to: "Pulborough station", time: "approx. 10 minutes" },
      { to: "Gatwick Airport", time: "approx. 55 minutes" },
      { to: "Worthing", time: "approx. 25 minutes" },
      { to: "Brighton", time: "approx. 45 minutes" },
    ],
  },
  {
    slug: "billingshurst",
    name: "Billingshurst",
    photo: "downs",
    summary:
      "Billingshurst taxis and airport transfers, with station runs on the Arun Valley line and fixed Gatwick prices.",
    body: [
      "Billingshurst is a commuter village with a station, which means early mornings and late evenings: the first trains to London and the last ones back.",
      "Gatwick is about forty minutes away, close enough that we run a lot of early transfers from here — the 4am pickups that nobody else wants and we take as normal work.",
      "The village has grown a good deal, and the newer estates off the Stane Street side are easy to get lost in. Give us the street name and we will find it; we have been to most of them.",
    ],
    nearby: ["Wisborough Green", "Adversane", "Five Oaks", "Barns Green", "Kirdford"],
    journeys: [
      { to: "Gatwick Airport", time: "approx. 40 minutes" },
      { to: "Horsham", time: "approx. 20 minutes" },
      { to: "Heathrow Airport", time: "approx. 1h 20m" },
      { to: "Central London", time: "approx. 1h 40m" },
    ],
  },
] as const satisfies readonly Town[];

/** Covered, but without a page of their own. */
export const otherAreas = [
  "Midhurst",
  "Littlehampton",
  "Bognor Regis",
  "Haslemere",
  "Steyning",
  "Pease Pottage",
  "Crawley",
  "Burgess Hill",
  "Haywards Heath",
  "East Grinstead",
  "Shoreham-by-Sea",
  "Lancing",
  "Henfield",
  "Pulborough villages",
  "Amberley",
  "Fittleworth",
  "Wisborough Green",
  "Rudgwick",
  "Loxwood",
  "Selsey",
  "Bosham",
  "Emsworth",
] as const;

/** Flat list of every named place, for schema areaServed and the footer. */
export const areas = [
  ...towns.map((t) => t.name),
  ...otherAreas,
] as const;

export function getTown(slug: string): Town | undefined {
  return towns.find((t) => t.slug === slug);
}

export type Service = {
  slug: string;
  name: string;
  /** Shown in nav and cards. */
  short: string;
  /** Meta description and hero subhead. */
  summary: string;
  /** Longer body copy, one paragraph per entry. */
  body: string[];
  /** Concrete, checkable inclusions. */
  includes: string[];
  /** Grouped in the services index. */
  group: "Travel" | "Business" | "Occasions" | "Specialist";
  /** Surfaced in the primary navigation menu. */
  featured?: boolean;
  /** Additional service categories this page answers for. */
  alsoKnownAs?: string[];
  /** Key into the photo registry in lib/photos.ts. */
  photo?: string;
};

export const services: Service[] = [
  {
    slug: "airport-transfers",
    photo: "carEstate",
    name: "Airport Transfers",
    short: "Airport transfers",
    group: "Travel",
    featured: true,
    alsoKnownAs: ["Airport shuttle service", "Meet and greet service"],
    summary:
      "Fixed-price airport transfers from Pulborough to Gatwick, Heathrow and every major UK airport, with flight tracking and meet and greet.",
    body: [
      "We run airport transfers from Pulborough and the surrounding villages every day of the year, at any hour. Gatwick is our most common run and takes around 50 minutes door to door; Heathrow is roughly 90 minutes depending on the M25.",
      "Your driver tracks your inbound flight. If you land early we are already there; if you are delayed, your pickup moves with the flight at no extra charge. For arrivals we offer meet and greet in the terminal with a name board, or a kerbside pickup if you would rather go straight to the car.",
      "Prices are quoted and fixed before you travel — no meter, no surcharge for a late landing, and no parking charges added afterwards.",
    ],
    includes: [
      "Fixed price confirmed in writing before you travel",
      "Live flight tracking on every arrival",
      "Free waiting time after landing",
      "Meet and greet in arrivals, or kerbside pickup",
      "All parking and drop-off charges included",
      "Help with luggage, and child seats on request",
    ],
  },
  {
    slug: "corporate-travel",
    photo: "carExecutive",
    name: "Corporate Travel",
    short: "Corporate travel",
    group: "Business",
    featured: true,
    alsoKnownAs: ["Corporate account service", "Executive service"],
    summary:
      "Account-based corporate travel and executive cars for businesses across West Sussex, with monthly invoicing and named drivers.",
    body: [
      "We hold corporate accounts for employers across West Sussex, from single-site offices to companies moving visiting clients between London and the South Coast. Bookings are placed by phone, email or WhatsApp and confirmed back to whoever needs the confirmation.",
      "Accounts are invoiced monthly with a cost centre or reference against each journey, so travel can be reconciled without chasing receipts. Regular runs — the same station pickup each Monday, the same airport trip each quarter — can be set as a standing booking.",
      "For client-facing journeys we assign an executive saloon and a driver who knows the route, suited and briefed on where to wait.",
    ],
    includes: [
      "Monthly invoicing with per-journey references",
      "Named, vetted drivers for regular runs",
      "Executive saloons for client-facing travel",
      "Standing bookings for recurring journeys",
      "Priority dispatch for account holders",
      "A single point of contact for your bookings",
    ],
  },
  {
    slug: "wheelchair-accessible-taxis",
    photo: "carAccessible",
    name: "Wheelchair Accessible Taxis",
    short: "Wheelchair accessible",
    group: "Specialist",
    featured: true,
    summary:
      "Wheelchair accessible taxis in Pulborough with ramp access, four-point restraints and drivers trained in safe loading.",
    body: [
      "Our wheelchair accessible vehicles take most manual and powered chairs without the passenger needing to transfer. Access is by a non-slip ramp at the rear, and the chair is secured with a four-point restraint system plus a separate occupant belt.",
      "Drivers are trained in safe loading and will take the time it needs — there is no rush and no charge for the extra minutes. A companion or carer travels in the same vehicle at no additional cost.",
      "When you book, tell us the make of chair or its approximate width and whether it is manual or powered, and we will confirm the right vehicle for the journey.",
    ],
    includes: [
      "Rear ramp access — no transfer needed",
      "Four-point chair restraints and occupant belt",
      "Drivers trained in safe loading and securing",
      "A carer or companion travels free",
      "No charge for extra loading time",
      "Hospital, clinic and day-centre runs welcome",
    ],
  },
  {
    slug: "wedding-cars",
    photo: "carExecutive",
    name: "Wedding Cars",
    short: "Wedding cars",
    group: "Occasions",
    featured: true,
    alsoKnownAs: ["Wedding taxi transport"],
    summary:
      "Wedding car hire and guest transport across West Sussex — a smart car for the couple and minibuses to move everyone else.",
    body: [
      "Wedding work is two jobs: getting the couple there calmly and on time, and moving everyone else without anybody being left on a verge. We quote for both together.",
      "For the couple we provide a valeted car with a suited driver who has driven the route beforehand and knows where to stop for photographs. For guests we run shuttles between hotel, ceremony and reception, as many loops as needed, and we take the last guests home at the end of the night.",
      "We confirm timings with you a week before, and again the day before. On the day your driver arrives early as standard.",
    ],
    includes: [
      "Route driven and timed in advance",
      "Valeted vehicle and suited driver",
      "Guest shuttles between venues, multiple loops",
      "Late-night returns after the reception",
      "Timings confirmed a week and a day before",
      "One quote covering couple and guests",
    ],
  },
  {
    slug: "executive-and-vip-travel",
    photo: "carExecutive",
    name: "Executive & VIP Travel",
    short: "Executive & VIP",
    group: "Business",
    featured: true,
    alsoKnownAs: [
      "Chauffeur service",
      "Chauffeur escort service",
      "VIP transport escort",
      "Security escort transport",
    ],
    summary:
      "Chauffeur-driven executive cars, VIP transport and discreet escort travel with vetted drivers and confirmed itineraries.",
    body: [
      "Executive travel is chauffeur work rather than taxi work: one driver assigned for the day or the itinerary, a car kept to showroom standard, and no conversation unless you start it.",
      "For VIP and escort travel we plan the route and the arrival point in advance, hold the vehicle where it needs to be rather than circling, and coordinate with venue or event security where there is any. Drivers on this work are vetted and experienced, and treat every detail of the booking as confidential.",
      "Half-day, full-day and multi-day bookings are available, including waiting time between appointments.",
    ],
    includes: [
      "One assigned driver for the full itinerary",
      "Executive saloon kept to showroom standard",
      "Routes and arrival points planned in advance",
      "Coordination with venue or event security",
      "Vetted drivers, complete discretion",
      "Half-day, full-day and multi-day hire",
    ],
  },
  {
    slug: "minibus-and-group-travel",
    photo: "carMpvSide",
    name: "Minibus & Group Travel",
    short: "Minibus & groups",
    group: "Travel",
    featured: true,
    alsoKnownAs: ["6-8 seater minibus taxi", "Large capacity taxi", "MVP hire"],
    summary:
      "6 to 8 seater minibus taxis for groups, with proper luggage space for airport runs and nights out.",
    body: [
      "Our 6 to 8 seater minibuses keep a group together in one vehicle instead of splitting across two cars at two fares. Every seat has a three-point belt.",
      "For airport work the key question is luggage, not seats: eight passengers with eight large cases will not fit one vehicle whatever the seat count. Tell us the number of large cases when you book and we will confirm whether one minibus is enough or a second vehicle is needed.",
      "Popular for golf trips, race days, hen and stag travel, sports teams and family holidays.",
    ],
    includes: [
      "6, 7 and 8 seat vehicles, all with three-point belts",
      "Luggage capacity confirmed before booking",
      "One fare for the group, not one per car",
      "Airport, port and event runs",
      "Late-night and early-morning availability",
      "Child seats and boosters on request",
    ],
  },
  {
    slug: "long-distance-taxi",
    photo: "carEstate",
    name: "Long Distance Taxi",
    short: "Long distance",
    group: "Travel",
    alsoKnownAs: ["Transportation service"],
    summary:
      "Fixed-price long-distance taxi journeys from Pulborough to anywhere in the UK, including cruise ports and university runs.",
    body: [
      "We take long-distance bookings anywhere on the UK mainland — London and the South Coast most often, but regularly the Midlands, the West Country, Wales and the North.",
      "Long journeys are quoted as a fixed total rather than left on a meter, so the price does not move with traffic. On runs beyond about three hours we build in a comfort stop and, where the distance warrants it, a second driver.",
      "Cruise ports at Southampton, Portsmouth and Dover are a regular run, as are start-of-term and end-of-term university trips with a car loaded full.",
    ],
    includes: [
      "Fixed total quoted up front, traffic included",
      "Comfort stops planned on longer runs",
      "Cruise port transfers — Southampton, Portsmouth, Dover",
      "University term-start and term-end runs",
      "Return legs booked at the same time",
      "Large-luggage vehicles available",
    ],
  },
  {
    slug: "local-taxi-service",
    photo: "carSaloon",
    name: "Local Taxi Service",
    short: "Local taxis",
    group: "Travel",
    summary:
      "Local taxis in Pulborough and the surrounding villages — station runs, shopping trips, appointments and school journeys.",
    body: [
      "The everyday work: Pulborough station, the shops, the surgery, the school gates, the pub and home again. Short local journeys matter as much to us as the long airport runs, and they are dispatched from the same office.",
      "Pre-book for anything time-critical — a train to catch, a hospital appointment — and we will be outside before you need to leave. For regular journeys such as a weekly appointment we can set a standing booking so you do not have to ring each time.",
      "We cover Pulborough, Petworth, Billingshurst, Storrington, Arundel, Midhurst and the villages between.",
    ],
    includes: [
      "Pulborough station pickups and drop-offs",
      "Appointments, surgeries and hospital runs",
      "Standing bookings for regular journeys",
      "School and college journeys",
      "Card payment in every vehicle",
      "Pre-booked, or as soon as we can get to you",
    ],
  },
  {
    slug: "courier-service",
    photo: "carSaloon",
    name: "Courier Service",
    short: "Courier & parcels",
    group: "Business",
    summary:
      "Same-day courier service from Pulborough — documents, parcels and urgent items delivered direct with no depot and no sorting.",
    body: [
      "A same-day courier run is a taxi journey without a passenger: your item is collected, driven straight to the address, and handed over. It never enters a depot, is never sorted, and is never left with a neighbour.",
      "We carry legal documents, signed contracts, keys, samples, spare parts, prescriptions and anything else that has to be somewhere today. The driver stays with the item for the whole journey.",
      "You get the driver's departure time and a confirmation on delivery, including the name of whoever signed for it.",
    ],
    includes: [
      "Direct collection to delivery, no depot",
      "Item stays with one driver throughout",
      "Confirmation on delivery, with signatory name",
      "Legal documents, keys, samples, spare parts",
      "Local, London and UK-wide runs",
      "Account billing for regular senders",
    ],
  },
  {
    slug: "event-and-hire-car-service",
    photo: "carMpvFront",
    name: "Event & Hire Car Service",
    short: "Events",
    group: "Occasions",
    alsoKnownAs: ["Event hire taxi transport", "Event hire car service"],
    summary:
      "Event transport and car hire with driver for race days, concerts, corporate days out and parties across West Sussex and beyond.",
    body: [
      "Event travel is usually about the journey home, not the journey out. We hold vehicles for your end time so a group of twenty is not competing with everyone else for the same two taxis at eleven o'clock.",
      "Goodwood, Fontwell, Glyndebourne, Brighton and the London arenas are regular destinations. For larger groups we run several vehicles on a staggered schedule and keep one back for anyone who leaves late.",
      "Hire by the hour, the evening or the day, with the driver waiting between legs so you are not re-booking on the night.",
    ],
    includes: [
      "Vehicles held for your end time",
      "Several vehicles coordinated for larger groups",
      "Driver waits between legs — no re-booking",
      "Goodwood, Fontwell, Glyndebourne, Brighton, London",
      "Hourly, evening and full-day hire",
      "One invoice for the whole group",
    ],
  },
  {
    slug: "pet-friendly-taxi",
    photo: "carEstate",
    name: "Pet Friendly Taxi",
    short: "Pet friendly",
    group: "Specialist",
    summary:
      "Pet friendly taxis in Pulborough — dogs and other animals welcome, with vet trips and airport runs taken as standard.",
    body: [
      "Not every taxi will take a dog. Ours will, as long as you tell us when you book so we send a suitable vehicle and allow for the space.",
      "Dogs travel in the boot area or footwell depending on size; bring a crate or a harness if your animal has one. Vet and emergency vet trips are a regular run for us, including out of hours.",
      "We also handle airport runs for owners travelling with a pet, and relocations where the animal and the luggage travel together.",
    ],
    includes: [
      "Dogs and small animals welcome, any size",
      "Crates and harnesses accommodated",
      "Vet and out-of-hours emergency vet runs",
      "Airport journeys with pets",
      "Protective covers used as standard",
      "No surcharge for assistance dogs",
    ],
  },
];

export const serviceGroups = [
  "Travel",
  "Business",
  "Occasions",
  "Specialist",
] as const;

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const featuredServices = services.filter((s) => s.featured);

/** Every service category this site answers for. */
export const allCategories: string[] = [
  "Taxi service",
  ...services.flatMap((s) => [s.name, ...(s.alsoKnownAs ?? [])]),
];

/**
 * Static build-time date values. `Cache Components` rejects `new Date()` during
 * prerender, and a copyright year does not need to be dynamic — bump it when
 * you next deploy in a new year.
 */
export const copyrightYear = 2026;
export const contentUpdated = "2026-10-29";
