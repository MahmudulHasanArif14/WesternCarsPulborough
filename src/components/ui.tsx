import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { photos, type PhotoKey } from "@/lib/photos";

/* ─────────────────────────────────────────────────────────────
   Button / ButtonLink
   Intent: the single interactive affordance for every CTA.
   Variants map to the three grounds the site uses — white, the
   primary band, and the navy band.
   Tokens: color-primary, color-accent, color-surface, color-line,
           radius-btn, text-sm, ease-standard.
   States: default, hover, focus-visible, active, disabled.
   ───────────────────────────────────────────────────────────── */

type Variant =
  | "primary" // solid primary on a light ground
  | "accent" // solid bright blue, for the home hero
  | "outline" // white fill, 2px primary border
  | "onBand"; // white fill, primary text — for use on primary/navy

type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-bold " +
  "transition-[color,background-color,border-color,opacity] duration-150 ease-standard " +
  "disabled:pointer-events-none disabled:opacity-50 select-none text-center";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-surface border-2 border-primary hover:opacity-90 active:opacity-80",
  accent:
    "bg-accent text-surface border-2 border-accent hover:opacity-90 active:opacity-80",
  outline:
    "bg-surface text-primary border-2 border-primary hover:bg-primary hover:text-surface",
  onBand:
    "bg-surface text-primary border-2 border-surface hover:opacity-90 active:opacity-80",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm min-h-[44px]",
  lg: "px-8 py-4 text-base min-h-[52px]",
};

function cls(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={cls(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  if (external) {
    return (
      <a
        href={href}
        className={cls(variant, size, className)}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls(variant, size, className)}>
      {children}
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   BookNowIcon + CtaGroup
   Intent: one canonical call-to-action order used on every page —
   book online first, phone second. Changing the hierarchy happens here.
   ───────────────────────────────────────────────────────────── */

export function BookNowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={["h-5 w-5 fill-current", className].filter(Boolean).join(" ")}
    >
      <path d="M6 2.5a.8.8 0 0 1 .8.8v.9h6.4v-.9a.8.8 0 0 1 1.6 0v.9H16A1.5 1.5 0 0 1 17.5 5.7v10A1.5 1.5 0 0 1 16 17.2H4a1.5 1.5 0 0 1-1.5-1.5v-10A1.5 1.5 0 0 1 4 4.2h1.2v-.9a.8.8 0 0 1 .8-.8M4 7.8v7.9h12V7.8zm4.7 6-2.4-2.4 1.1-1.1 1.3 1.3 3.2-3.2 1.1 1.1z" />
    </svg>
  );
}

/**
 * The standard CTA row. `tone="onBand"` is for the primary/navy bands and
 * the photo heroes, where a bordered white button reads better than an
 * outlined primary one.
 */
export function CtaGroup({
  bookingUrl,
  phone,
  phoneHref,
  size = "md",
  tone = "onLight",
  className,
}: {
  bookingUrl: string;
  phone: string;
  phoneHref: string;
  size?: Size;
  tone?: "onLight" | "onDark";
  className?: string;
}) {
  const onDark = tone === "onDark";
  return (
    <div
      className={["flex flex-col gap-3 sm:flex-row", className]
        .filter(Boolean)
        .join(" ")}
    >
      <ButtonLink
        href={bookingUrl}
        size={size}
        variant={onDark ? "accent" : "primary"}
      >
        <BookNowIcon />
        Book Online
      </ButtonLink>
      <ButtonLink
        href={phoneHref}
        size={size}
        variant={onDark ? "onBand" : "outline"}
        className={
          onDark
            ? "border-surface bg-transparent text-surface hover:bg-surface hover:text-primary hover:opacity-100"
            : undefined
        }
      >
        <PhoneIcon />
        {phone}
      </ButtonLink>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section — the page rhythm. Sections alternate white and `mist`,
   with `navy` and `primary` reserved for the full-bleed bands.
   ───────────────────────────────────────────────────────────── */

const grounds = {
  white: "bg-surface",
  mist: "bg-mist",
  navy: "bg-navy text-surface",
  primary: "bg-primary text-surface",
} as const;

export function Section({
  children,
  className,
  ground = "white",
  width = "page",
  ...props
}: Omit<ComponentProps<"section">, "ground"> & {
  ground?: keyof typeof grounds;
  width?: "page" | "prose";
}) {
  return (
    <section
      className={["py-14", grounds[ground], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className={width === "prose" ? "container-prose" : "container-page"}>
        {children}
      </div>
    </section>
  );
}

/**
 * The underline that sits beneath every centred section title. On the dark
 * bands it switches to white so it stays visible.
 */
export function HeadingDivider({
  tone = "primary",
  align = "center",
}: {
  tone?: "primary" | "light";
  align?: "left" | "center";
}) {
  return (
    <div
      aria-hidden="true"
      className={[
        "mt-4 h-1 w-20 rounded-sm",
        tone === "light" ? "bg-surface" : "bg-primary",
        align === "center" ? "mx-auto" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "center",
  tone = "dark",
  as: As = "h2",
  divider = true,
}: {
  /** Italic strapline under the title, as the house style sets it. */
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  divider?: boolean;
}) {
  const centred = align === "center";
  return (
    <div
      className={[
        "max-w-3xl",
        centred ? "mx-auto text-center" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <As
        className={[
          "font-bold",
          As === "h1"
            ? "text-3xl md:text-5xl"
            : "text-2xl md:text-3xl",
          tone === "light" ? "text-surface" : "text-ink",
        ].join(" ")}
      >
        {title}
      </As>
      {eyebrow ? (
        <p
          className={[
            "mt-2 text-lg italic",
            tone === "light" ? "text-surface/80" : "text-muted",
          ].join(" ")}
        >
          {eyebrow}
        </p>
      ) : null}
      {divider ? (
        <HeadingDivider
          tone={tone === "light" ? "light" : "primary"}
          align={align}
        />
      ) : null}
      {lede ? (
        <p
          className={[
            "mt-5 text-sm leading-relaxed",
            tone === "light" ? "text-surface/90" : "text-muted",
          ].join(" ")}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Breadcrumbs — shared by both PageHero variants
   ───────────────────────────────────────────────────────────── */

export function Breadcrumbs({
  trail,
  tone = "dark",
}: {
  trail: { name: string; path: string }[];
  tone?: "dark" | "light";
}) {
  const muted = tone === "light" ? "text-surface/70" : "text-muted";
  const current = tone === "light" ? "text-surface" : "text-ink";
  const hover = tone === "light" ? "hover:text-surface" : "hover:text-primary";
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center justify-center gap-2 text-xs ${muted}`}
      >
        {trail.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="opacity-50">
                /
              </span>
            ) : null}
            {i === trail.length - 1 ? (
              <span aria-current="page" className={current}>
                {item.name}
              </span>
            ) : (
              <Link
                href={item.path}
                className={`rounded-sm transition-colors duration-150 ease-standard ${hover}`}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   Figure — a registry photo at a fixed aspect ratio.
   Intent: one place that decides how photography is cropped, rounded
   and loaded, so no page hand-rolls an <img>.
   ───────────────────────────────────────────────────────────── */

const ratios = {
  wide: "aspect-[16/9]",
  banner: "aspect-[21/9]",
  card: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
} as const;

export function Figure({
  photo,
  ratio = "wide",
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  rounded = true,
  /** Darkens the image so white text placed over it stays legible. */
  scrim = false,
  children,
}: {
  photo: PhotoKey;
  ratio?: keyof typeof ratios;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  scrim?: boolean;
  children?: ReactNode;
}) {
  const p = photos[photo];
  return (
    <div
      className={[
        "relative overflow-hidden bg-mist",
        ratios[ratio],
        rounded ? "rounded-lg shadow-lg" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {scrim ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/10"
        />
      ) : null}
      {children ? (
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {children}
        </div>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PageHero — the banner every inner page opens with.
   With a photo: a tall centred band over a darkened image.
   Without: a flat primary band, as the house style uses on the
   text-only pages (contact, about, terms).
   ───────────────────────────────────────────────────────────── */

export function PageHero({
  eyebrow,
  title,
  lede,
  trail,
  photo,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  trail?: { name: string; path: string }[];
  photo?: PhotoKey;
  children?: ReactNode;
}) {
  const inner = (
    <div className="relative z-10 container-page text-center text-surface">
      {trail && trail.length > 0 ? (
        <div className="mb-5">
          <Breadcrumbs trail={trail} tone="light" />
        </div>
      ) : null}
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold tracking-[0.12em] text-surface/80 uppercase">
          {eyebrow}
        </p>
      ) : null}
      {/* text-surface is explicit: the base layer pins h1 to --color-ink,
          which would otherwise win over the inherited light colour. */}
      <h1 className="mx-auto max-w-4xl text-3xl font-bold text-surface md:text-5xl">
        {title}
      </h1>
      {lede ? (
        <p className="mx-auto mt-4 max-w-xl text-base text-surface/90">
          {lede}
        </p>
      ) : null}
      {children ? (
        <div className="mt-7 flex justify-center">{children}</div>
      ) : null}
    </div>
  );

  if (photo) {
    return (
      <div className="relative isolate flex min-h-72 items-center overflow-hidden bg-navy py-16 md:min-h-96">
        <Image
          src={photos[photo].src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink/70 to-ink/85"
        />
        {inner}
      </div>
    );
  }

  return <div className="bg-primary py-12 md:py-16">{inner}</div>;
}

/* ─────────────────────────────────────────────────────────────
   Card / CardLink / InfoCard
   ───────────────────────────────────────────────────────────── */

export function Card({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={[
        "rounded-lg border border-line bg-surface p-6 shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

/** A card that is entirely a link. Never nest another control inside it. */
export function CardLink({
  href,
  title,
  children,
  cta = "Read more",
}: {
  href: string;
  title: string;
  children: ReactNode;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-sm
                 transition-[border-color,box-shadow,transform] duration-150 ease-standard
                 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {children}
      </p>
      <span className="mt-6 text-sm font-bold text-primary">
        {cta}
        <span
          aria-hidden="true"
          className="ml-2 inline-block transition-transform duration-150 ease-standard group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}

/**
 * A small white card with a primary dot — used for the "what's included"
 * grids on the service and airport pages.
 */
export function InfoCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary"
        />
        <div>
          <p className="text-sm font-bold">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{children}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Icon tile + heading + copy. The "Why Choose Us" pattern, also used on
 * the service pages for the three-point summaries.
 */
export function FeatureRow({
  icon,
  title,
  children,
  tone = "dark",
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={[
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg",
          tone === "light" ? "bg-surface/15 text-surface" : "bg-primary text-surface",
        ].join(" ")}
      >
        {icon}
      </div>
      <div>
        <h3
          className={[
            "text-base font-bold",
            tone === "light" ? "text-surface" : "text-ink",
          ].join(" ")}
        >
          {title}
        </h3>
        <p
          className={[
            "mt-1 text-sm leading-relaxed",
            tone === "light" ? "text-surface/80" : "text-muted",
          ].join(" ")}
        >
          {children}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTABand — the primary-blue closer that ends every inner page
   ───────────────────────────────────────────────────────────── */

export function CTABand({
  title,
  children,
  actions,
}: {
  title: string;
  children?: ReactNode;
  actions: ReactNode;
}) {
  return (
    <section className="bg-primary py-14 text-surface">
      <div className="container-page text-center">
        <h2 className="text-2xl font-bold text-surface md:text-3xl">{title}</h2>
        {children ? (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-surface/90">
            {children}
          </p>
        ) : null}
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {actions}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQ accordion — native <details>, so every answer stays in the
   HTML for crawlers even while visually collapsed.
   ───────────────────────────────────────────────────────────── */

export function FAQAccordion({
  items,
  className,
}: {
  items: readonly { q: string; a: string }[];
  className?: string;
}) {
  return (
    <div
      className={["divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface", className]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold transition-colors duration-150 ease-standard marker:content-none hover:bg-mist/40">
            {f.q}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0 text-primary transition-transform duration-150 ease-standard group-open:rotate-180"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AppBadges — links to the iCabbi app listing.
   Drawn rather than bitmapped, so they stay sharp and carry no
   third-party asset we are not licensed to host.
   ───────────────────────────────────────────────────────────── */

function StoreBadge({
  kicker,
  name,
  icon,
}: {
  kicker: string;
  name: string;
  icon: ReactNode;
}) {
  return (
    <span className="inline-flex h-12 items-center gap-3 rounded-lg border border-surface/30 bg-ink/80 px-4 text-surface transition-colors duration-150 ease-standard group-hover:border-surface/70">
      {icon}
      <span className="flex flex-col leading-none">
        <span className="text-[10px] opacity-80">{kicker}</span>
        <span className="mt-0.5 text-sm font-bold">{name}</span>
      </span>
    </span>
  );
}

export function AppBadges({
  appUrl,
  className,
}: {
  appUrl: string;
  className?: string;
}) {
  return (
    <div className={["flex flex-wrap gap-3", className].filter(Boolean).join(" ")}>
      <a
        href={appUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-lg"
      >
        <span className="sr-only">Get the booking app on Google Play</span>
        <StoreBadge
          kicker="GET IT ON"
          name="Google Play"
          icon={
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <path d="M3.6 2.3a1 1 0 0 0-.4.8v17.8a1 1 0 0 0 .4.8l10-9.7zm11.1 8.3 2.9-2.8-9.8-5.6zm0 2.8-6.9 8.4 9.8-5.6zm1.4-1.4 3.2-3a1 1 0 0 1 0 1.7z" />
            </svg>
          }
        />
      </a>
      <a
        href={appUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-lg"
      >
        <span className="sr-only">Get the booking app on the App Store</span>
        <StoreBadge
          kicker="Download on the"
          name="App Store"
          icon={
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8s-1.7-.8-2.8-.8c-1.5 0-2.8.8-3.6 2.1-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7 1.9-1.1 2.6-2.1c.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.2-.9-2.2-3.4M14.2 5.9c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.7-.9 2.7 1 .1 2-.5 2.6-1.3" />
            </svg>
          }
        />
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Check list — inclusions, with a decorative tick
   ───────────────────────────────────────────────────────────── */

export function CheckList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={["grid gap-3", className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="mt-0.5 h-5 w-5 shrink-0 fill-primary"
          >
            <path d="M7.6 14.3 3.9 10.6l1.4-1.4 2.3 2.3 6.1-6.1 1.4 1.4z" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────
   Icons — 20px, currentColor, decorative only
   ───────────────────────────────────────────────────────────── */

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={["h-5 w-5 fill-current", className].filter(Boolean).join(" ")}
    >
      <path d="M6.6 3.1a1.3 1.3 0 0 0-1.8-.2L3.5 4a2 2 0 0 0-.5 2.3 19 19 0 0 0 10.7 10.7 2 2 0 0 0 2.3-.5l1.1-1.3a1.3 1.3 0 0 0-.2-1.8l-2.5-1.9a1.3 1.3 0 0 0-1.6.05l-1 .9a14.4 14.4 0 0 1-4.6-4.6l.9-1a1.3 1.3 0 0 0 .05-1.6z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={["h-5 w-5 fill-current", className].filter(Boolean).join(" ")}
    >
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.4-.2-3 .8.8-2.9-.2-.4A8.2 8.2 0 0 1 12 3.8m-3.6 4c-.2 0-.5.1-.7.4-.3.3-.8.8-.8 1.8s.8 2 .9 2.2c.1.1 1.5 2.4 3.7 3.3 1.8.7 2.2.6 2.6.5.5 0 1.5-.6 1.7-1.2.2-.6.2-1 .2-1.1l-.3-.2-1.7-.8c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6 6 0 0 1-1.8-1.1 6.6 6.6 0 0 1-1.2-1.6c-.1-.2 0-.3.1-.4l.5-.6.2-.4-.8-1.8c-.2-.4-.4-.4-.5-.4z" />
    </svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={["h-5 w-5 fill-current", className].filter(Boolean).join(" ")}
    >
      <path d="M2.5 5A1.5 1.5 0 0 1 4 3.5h12A1.5 1.5 0 0 1 17.5 5v.4L10 10 2.5 5.4zm0 2.6 7.1 4.3a.8.8 0 0 0 .8 0l7.1-4.3V15A1.5 1.5 0 0 1 16 16.5H4A1.5 1.5 0 0 1 2.5 15z" />
    </svg>
  );
}

export function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={["h-7 w-7 fill-current", className].filter(Boolean).join(" ")}
    >
      <path d="M12 2 4 5v6.5c0 5 3.4 9.4 8 10.5 4.6-1.1 8-5.5 8-10.5V5zm-1 14-4-4 1.4-1.4 2.6 2.6 5.6-5.6L18 9z" />
    </svg>
  );
}

export function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={["h-7 w-7", className].filter(Boolean).join(" ")}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.4 2" />
    </svg>
  );
}

export function CarIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={["h-7 w-7 fill-current", className].filter(Boolean).join(" ")}
    >
      <path d="M5.8 5.3A2 2 0 0 1 7.7 4h8.6a2 2 0 0 1 1.9 1.3L19.8 10H21a1 1 0 0 1 0 2h-.5v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6.5v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-6H3a1 1 0 0 1 0-2h1.2zM7.9 6l-1.2 4h10.6l-1.2-4zM7 13.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4m10 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4" />
    </svg>
  );
}

export function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={["h-7 w-7 fill-current", className].filter(Boolean).join(" ")}
    >
      <path d="M21 14.5 13.5 10V4.2a1.5 1.5 0 0 0-3 0V10L3 14.5V16l7.5-2.2v4L8 19.6V21l4-1 4 1v-1.4l-2.5-1.8v-4L21 16z" />
    </svg>
  );
}
