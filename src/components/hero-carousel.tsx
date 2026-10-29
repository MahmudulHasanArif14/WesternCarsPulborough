"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { business } from "@/lib/business";
import { photos, type PhotoKey } from "@/lib/photos";
import { BookNowIcon, ButtonLink, PhoneIcon } from "./ui";

/* ─────────────────────────────────────────────────────────────
   HeroCarousel
   Intent: a full-viewport opening statement that shows the kind of
   vehicle you actually get, rotating through the three journeys that
   matter most.

   Tokens: color-ink (scrim), color-surface, color-accent-bright,
           radius-sm, spacing-*, text-xl/2xl, ease-standard.

   States: slide active / inactive, paused (hover, focus, reduced
           motion, tab hidden), dot default / hover / focus-visible /
           current.

   Interactions:
     - Auto-advances every 6s. Pauses on hover, on keyboard focus
       within, when the tab is hidden, and entirely under
       prefers-reduced-motion.
     - Left/Right arrows move between slides when the dots have focus.
     - Every slide's copy is in the DOM at all times for crawlers;
       inactive slides are hidden from AT with aria-hidden and are
       not focusable (inert).

   A11y: the region is labelled and marked aria-roledescription
     "carousel"; dots are real buttons in a tablist-free pattern with
     aria-current; the scrim guarantees >7:1 contrast for the heading.
   ───────────────────────────────────────────────────────────── */

type Slide = {
  photo: PhotoKey;
  eyebrow: string;
  title: string;
  body: string;
  /** Object-position, so the vehicle stays in frame at every aspect. */
  position?: string;
};

const SLIDES: Slide[] = [
  {
    // Lightest of the three, so the opening frame reads clearly.
    photo: "carSaloon",
    eyebrow: "AIRPORT TRANSFERS",
    title: "Taxi & private hire across West Sussex",
    body: "Fixed-price transfers to Gatwick, Heathrow and every major UK airport. Flight-tracked, parking included, 24 hours a day.",
    position: "center 40%",
  },
  {
    photo: "carExecutive",
    eyebrow: "EXECUTIVE & CORPORATE",
    title: "Chauffeur-driven executive travel",
    body: "Suited drivers, cars kept to showroom standard, and corporate accounts invoiced monthly. Discretion as standard.",
    position: "center 45%",
  },
  {
    photo: "carMpvSide",
    eyebrow: "GROUPS UP TO 8",
    title: "One vehicle, one fare, everyone together",
    body: "6 to 8 seater minibuses with the luggage space to match. Tell us your case count and we will send a vehicle that fits the lot.",
    position: "center 40%",
  },
];

const INTERVAL = 6000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const regionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Pause while the tab is in the background — no point animating off-screen.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setIndex((i) => (i + 1) % SLIDES.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
    }
  }, []);

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Western Cars Pulborough services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden border-b border-line bg-ink
                 lg:min-h-[calc(100svh-72px)]"
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.photo}
          aria-hidden={i !== index}
          className={[
            "absolute inset-0 transition-opacity duration-700 ease-standard motion-reduce:transition-none",
            i === index ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <Image
            src={photos[slide.photo].src}
            alt={i === index ? photos[slide.photo].alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={85}
            className="object-cover"
            style={{ objectPosition: slide.position ?? "center" }}
          />
        </div>
      ))}

      {/* Scrim: dense only across the bottom band where the copy sits, so the
          vehicle stays clearly visible through the top two thirds. The two
          gradients compound to >7:1 behind the heading. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 via-50% to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 via-60% to-transparent"
      />

      <div className="relative container-page pb-9 pt-10 md:pb-10">
        <p className="mb-4 inline-flex items-center gap-2 rounded-sm border border-surface/25 bg-ink/40 px-3 py-1 text-xs font-semibold text-surface backdrop-blur-sm">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-sm bg-accent-bright"
          />
          Available {business.hours}
        </p>

        <div className="relative">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.photo}
              aria-hidden={i !== index}
              // Keeps all copy crawlable while hiding inactive slides from AT.
              {...(i !== index ? { inert: "" as unknown as boolean } : {})}
              className={[
                i === index
                  ? "relative opacity-100"
                  : "pointer-events-none absolute inset-0 opacity-0",
                "transition-opacity duration-500 ease-standard motion-reduce:transition-none",
              ].join(" ")}
            >
              <p className="text-xs font-semibold tracking-[0.08em] text-surface/80">
                {slide.eyebrow}
              </p>
              {i === 0 ? (
                <h1 className="mt-2 max-w-[760px] text-xl font-bold text-surface md:text-2xl">
                  {slide.title}
                </h1>
              ) : (
                <p
                  role="heading"
                  aria-level={2}
                  className="mt-2 max-w-[760px] text-xl font-bold text-surface md:text-2xl"
                >
                  {slide.title}
                </p>
              )}
              <p className="mt-4 max-w-[560px] text-base text-surface/90">
                {slide.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={business.bookingUrl} size="lg">
            <BookNowIcon />
            Book online
          </ButtonLink>
          <ButtonLink
            href={business.phoneHref}
            size="lg"
            variant="ghost"
            className="border-surface/40 bg-ink/30 text-surface backdrop-blur-sm hover:border-surface hover:bg-surface hover:text-ink"
          >
            <PhoneIcon />
            Call {business.phone}
          </ButtonLink>
        </div>

        <div
          className="mt-8 flex items-center gap-3"
          onKeyDown={onKeyDown}
          role="group"
          aria-label="Choose slide"
        >
          {SLIDES.map((slide, i) => (
            <button
              key={slide.photo}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index ? "true" : undefined}
              aria-label={`Slide ${i + 1} of ${SLIDES.length}: ${slide.eyebrow.toLowerCase()}`}
              className="group flex h-11 items-center p-0"
            >
              <span
                className={[
                  "block h-1 rounded-sm transition-all duration-300 ease-standard",
                  i === index
                    ? "w-10 bg-surface"
                    : "w-5 bg-surface/40 group-hover:bg-surface/70",
                ].join(" ")}
              />
            </button>
          ))}
          <span className="ml-2 text-xs text-surface/70" aria-hidden="true">
            {index + 1} / {SLIDES.length}
          </span>
        </div>
      </div>
    </section>
  );
}
