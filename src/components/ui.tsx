import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { photos, type PhotoKey } from "@/lib/photos";

/* ─────────────────────────────────────────────────────────────
   Button / ButtonLink
   Intent: the single interactive affordance for every CTA.
   Tokens: color-accent-bright, color-surface, color-ink, color-line,
           radius-sm, spacing-3/4/6, text-sm/base, ease-standard.
   States: default, hover, focus-visible, active, disabled.
   ───────────────────────────────────────────────────────────── */

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold " +
  "transition-[color,background-color,border-color,opacity] duration-150 ease-standard " +
  "disabled:pointer-events-none disabled:opacity-50 select-none text-center";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-bright text-surface hover:bg-accent active:bg-accent " +
    "border border-transparent",
  secondary:
    "bg-surface text-accent border border-accent hover:bg-accent hover:text-surface " +
    "active:bg-accent active:text-surface",
  ghost:
    "bg-transparent text-ink border border-line hover:border-accent hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-3 text-sm min-h-[44px]",
  lg: "px-6 py-4 text-base min-h-[56px]",
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
 * The standard CTA row. `tone="onDark"` is for use over a photo hero, where
 * the secondary button needs a light outline instead of the accent one.
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
  return (
    <div
      className={["flex flex-col gap-3 sm:flex-row", className]
        .filter(Boolean)
        .join(" ")}
    >
      <ButtonLink href={bookingUrl} size={size}>
        <BookNowIcon />
        Book online
      </ButtonLink>
      <ButtonLink
        href={phoneHref}
        size={size}
        variant={tone === "onDark" ? "ghost" : "secondary"}
        className={
          tone === "onDark"
            ? "border-surface/40 bg-transparent text-surface hover:border-surface hover:bg-surface hover:text-ink"
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
   Section — vertical rhythm on the 8px grid
   ───────────────────────────────────────────────────────────── */

export function Section({
  children,
  className,
  tint,
  ...props
}: ComponentProps<"section"> & { tint?: boolean }) {
  return (
    <section
      className={[
        "py-9 md:py-10",
        tint ? "bg-[#fafafa] border-y border-line" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={[
        "max-w-[720px]",
        align === "center" ? "mx-auto text-center" : "",
      ].join(" ")}
    >
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <As
        className={
          As === "h1"
            ? "text-xl md:text-2xl font-bold"
            : "text-lg md:text-xl font-bold"
        }
      >
        {title}
      </As>
      {lede ? <p className="mt-4 text-base text-muted">{lede}</p> : null}
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
  const hover =
    tone === "light" ? "hover:text-surface" : "hover:text-accent";
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={`flex flex-wrap items-center gap-2 text-xs ${muted}`}>
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
   Tokens: radius-sm, color-line, color-ink (scrim), ease-standard.
   States: loading (blur-free fade), loaded, decorative vs. captioned.
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
        "relative overflow-hidden bg-[#fafafa]",
        ratios[ratio],
        rounded ? "rounded-sm border border-line" : "",
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
   PageHero — the banner every inner page opens with, plus breadcrumbs
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
  /** Optional background photograph, darkened so the text stays AA-legible. */
  photo?: PhotoKey;
  children?: ReactNode;
}) {
  if (photo) {
    return (
      <div className="relative isolate border-b border-line bg-ink">
        <Image
          src={photos[photo].src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        {/* Two scrims: a vertical one so the photo still reads at the edges,
            and a left-weighted one that guarantees AA contrast under the text. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/35"
        />
        <div className="relative container-page py-9 text-surface md:py-10">
          {trail && trail.length > 0 ? (
            <Breadcrumbs trail={trail} tone="light" />
          ) : null}
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-surface/80">
              {eyebrow}
            </p>
          ) : null}
          {/* text-surface is explicit: the base layer pins h1 to --color-ink,
              which would otherwise win over the inherited light colour. */}
          <h1 className="max-w-[820px] text-xl font-bold text-surface md:text-2xl">
            {title}
          </h1>
          {lede ? (
            <p className="mt-4 max-w-[680px] text-base text-surface/90">
              {lede}
            </p>
          ) : null}
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-line bg-[#fafafa]">
      <div className="container-page py-9 md:py-10">
        {trail && trail.length > 0 ? <Breadcrumbs trail={trail} /> : null}

        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-[820px] text-xl font-bold md:text-2xl">{title}</h1>
        {lede ? (
          <p className="mt-4 max-w-[680px] text-base text-muted">{lede}</p>
        ) : null}
        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Card — one radius, one border, hover lift on pointer devices
   ───────────────────────────────────────────────────────────── */

export function Card({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={[
        "rounded-sm border border-line bg-surface p-6",
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
      className="group flex h-full flex-col rounded-sm border border-line bg-surface p-6
                 transition-[border-color,box-shadow] duration-150 ease-standard
                 hover:border-accent hover:shadow-sm"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 flex-1 text-sm text-muted">{children}</p>
      <span className="mt-6 text-sm font-semibold text-accent">
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
        <li key={item} className="flex gap-3 text-base">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="mt-1 h-5 w-5 shrink-0 fill-accent"
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
