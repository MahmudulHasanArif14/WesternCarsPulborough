/**
 * Photo registry.
 *
 * Every image on the site is declared here with its licence and attribution.
 * All of these are freely licensed stock/documentary photographs of real West
 * Sussex places — they are NOT photographs of Western Cars vehicles, drivers or
 * customers, and nothing on the site presents them as such.
 *
 * REPLACING THESE WITH THE COMPANY'S OWN PHOTOGRAPHY:
 *   1. Drop the new file into `public/images/`.
 *   2. Point the `src` here at it and update `alt`.
 *   3. Set `credit: null` — owned photography needs no attribution, and the
 *      credits block on /about hides any entry with a null credit.
 */

export type Credit = {
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  /** Note any change we made — CC BY-SA requires derivatives to be flagged. */
  modified?: string;
};

export type Photo = {
  src: string;
  alt: string;
  /** null for the company's own photography. */
  credit: Credit | null;
};

const CC_BY_2 = "https://creativecommons.org/licenses/by/2.0";
const CC_BY_4 = "https://creativecommons.org/licenses/by/4.0";
const CC_BY_SA_2 = "https://creativecommons.org/licenses/by-sa/2.0";
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0";
const COMMONS = "https://commons.wikimedia.org/wiki/File:";

/** Every car photo was cropped — see scratchpad/crop_cars.js for the regions. */
const CROPPED = "Cropped from the original.";

export const photos = {
  /* ── Vehicles ─────────────────────────────────────────────────────────
     Representative vehicles of the types we run. Cropped to remove the
     non-UK registration plates that appear in the source photographs. */

  carMpvFront: {
    src: "/images/car-mpv-front.jpg",
    alt: "A black Mercedes-Benz V-Class people carrier, the type of vehicle used for group and airport journeys.",
    credit: {
      author: "Alexander-93",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl: `${COMMONS}2019_Mercedes-Benz_V-Class_(W447)_1X7A1743.jpg`,
      modified: CROPPED,
    },
  },
  carMpvSide: {
    src: "/images/car-mpv-side.jpg",
    alt: "The side profile of a black Mercedes-Benz V-Class, showing the sliding passenger door.",
    credit: {
      author: "Alexander Migl",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl: `${COMMONS}Mercedes-Benz_V-Class_(W447,_2023)_DSC_7977.jpg`,
      modified: CROPPED,
    },
  },
  carExecutive: {
    src: "/images/car-executive.jpg",
    alt: "A black Mercedes-Benz S-Class executive saloon.",
    credit: {
      author: "Alexander Migl",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl: `${COMMONS}Mercedes-Benz_W223_IAA_2021_1X7A0206.jpg`,
      modified: CROPPED,
    },
  },
  carSaloon: {
    src: "/images/car-saloon.jpg",
    alt: "A silver Mercedes-Benz E-Class saloon, the type of car used for everyday journeys.",
    credit: {
      author: "Alexander Migl",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl: `${COMMONS}Mercedes-Benz_W214_1X7A0885.jpg`,
      modified: CROPPED,
    },
  },
  carEstate: {
    src: "/images/car-estate.jpg",
    alt: "A Skoda Superb estate, showing the large boot used for airport journeys with full luggage.",
    credit: {
      author: "Vauxford",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl: `${COMMONS}2017_Skoda_Superb_Estate_SE_L_Executive_TDI_2.0.jpg`,
      modified: CROPPED,
    },
  },
  carAccessible: {
    src: "/images/car-accessible.jpg",
    alt: "A wheelchair ramp deployed from the rear door of an accessible taxi.",
    credit: {
      author: "Turini2",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      sourceUrl: `${COMMONS}London_taxi_with_deployed_wheelchair_ramp.jpg`,
      modified: CROPPED,
    },
  },

  /* ── Places ───────────────────────────────────────────────────────── */

  hero: {
    src: "/images/west-sussex-lane.jpg",
    alt: "A country lane in West Sussex lit by low autumn sunlight, with trees overhanging the road.",
    credit: {
      author: "Emma Simpson",
      license: "Unsplash License",
      licenseUrl: "https://unsplash.com/license",
      sourceUrl: "https://unsplash.com/photos/mNGaaLeWEp0",
    },
  },
  gatwick: {
    src: "/images/gatwick-south-terminal.jpg",
    alt: "Aircraft parked at the stands at Gatwick Airport South Terminal under grey cloud.",
    credit: {
      author: "Bill Boaden",
      license: "CC BY-SA 2.0",
      licenseUrl: CC_BY_SA_2,
      sourceUrl: `${COMMONS}Gatwick_Airport_South_Terminal_-_geograph.org.uk_-_5918604.jpg`,
    },
  },
  pulboroughStation: {
    src: "/images/pulborough-station.jpg",
    alt: "The platform and station buildings at Pulborough railway station, West Sussex.",
    credit: {
      author: "HJ Mitchell",
      license: "CC BY 4.0",
      licenseUrl: CC_BY_4,
      sourceUrl: `${COMMONS}Pulborough_railway_station_01.jpg`,
    },
  },
  downs: {
    src: "/images/south-downs-upwaltham.jpg",
    alt: "A wide harvested field rising to the horizon on the South Downs near Upwaltham, West Sussex.",
    credit: {
      author: "sagesolar",
      license: "CC BY 4.0",
      licenseUrl: CC_BY_4,
      sourceUrl: `${COMMONS}South_Downs_near_Upwaltham,_West_Sussex.jpg`,
    },
  },
  downsEntrance: {
    src: "/images/south-downs-entrance.jpg",
    alt: "The entrance to the South Downs National Park at East Lavant, West Sussex.",
    credit: {
      author: "ITookSomePhotos",
      license: "CC BY 4.0",
      licenseUrl: CC_BY_4,
      sourceUrl: `${COMMONS}Entrance_to_South_Downs_National_Park,_East_Lavant,_West_Sussex,_England.jpg`,
    },
  },
  goodwood: {
    src: "/images/goodwood-house.jpg",
    alt: "Goodwood House in West Sussex, seen across its parkland.",
    credit: {
      author: "Ian Stannard",
      license: "CC BY-SA 2.0",
      licenseUrl: CC_BY_SA_2,
      sourceUrl: `${COMMONS}Goodwood_House,_West_Sussex,_England-2Oct2011.jpg`,
    },
  },
  arundel: {
    src: "/images/arundel-castle.jpg",
    alt: "Arundel Castle and its grounds from the air, surrounded by West Sussex woodland.",
    credit: {
      author: "Miles Sabin",
      license: "CC BY-SA 2.0",
      licenseUrl: CC_BY_SA_2,
      sourceUrl: `${COMMONS}Arundel_Castle_-West_Sussex,_England-23June2011.jpg`,
    },
  },
  petworth: {
    src: "/images/petworth-town.jpg",
    alt: "The old streets and rooftops of Petworth, West Sussex.",
    credit: {
      author: "Len Williams",
      license: "CC BY-SA 2.0",
      licenseUrl: CC_BY_SA_2,
      sourceUrl: `${COMMONS}Petworth,_West_Sussex_-_geograph.org.uk_-_3685278.jpg`,
    },
  },
  worthing: {
    src: "/images/worthing-seafront.jpg",
    alt: "The seafront and promenade at Worthing on the West Sussex coast.",
    credit: {
      author: "Stephen McKay",
      license: "CC BY-SA 2.0",
      licenseUrl: CC_BY_SA_2,
      sourceUrl: `${COMMONS}Worthing_Seafront_-_geograph.org.uk_-_5418187.jpg`,
    },
  },
  storrington: {
    src: "/images/storrington-kithurst.jpg",
    alt: "Storrington seen from Kithurst Hill, with the West Sussex weald beyond.",
    credit: {
      author: "Phillip Capper",
      license: "CC BY 2.0",
      licenseUrl: CC_BY_2,
      sourceUrl: `${COMMONS}Storrington_from_Kithurst_Hill,_West_Sussex,_England,_2002.jpg`,
    },
  },
  horsham: {
    src: "/images/horsham-old-town-hall.jpg",
    alt: "The Old Town Hall in Horsham, West Sussex.",
    credit: {
      author: "Andy Li",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0",
      sourceUrl: `${COMMONS}Horsham_Old_Town_Hall_2024-06-04.jpg`,
    },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/** Every distinct credit, for the attribution block on /about. */
export const photoCredits = Object.values(photos)
  .filter((p): p is Photo & { credit: Credit } => p.credit !== null)
  .map((p) => ({ ...p.credit, src: p.src }));
