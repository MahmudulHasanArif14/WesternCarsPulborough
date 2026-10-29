"use client";

import { useId, useState } from "react";
import { business, services } from "@/lib/business";
import { Button, ButtonLink, WhatsAppIcon } from "./ui";

const field =
  "w-full rounded-sm border border-line bg-surface px-4 py-3 text-base text-ink " +
  "placeholder:text-muted transition-colors duration-150 ease-standard " +
  "hover:border-accent focus:border-accent focus-visible:outline-2 " +
  "aria-[invalid=true]:border-[#b3261e] disabled:opacity-50";

const label = "block text-sm font-semibold text-ink";

type Values = {
  name: string;
  phone: string;
  email: string;
  service: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  notes: string;
};

const empty: Values = {
  name: "",
  phone: "",
  email: "",
  service: "",
  pickup: "",
  destination: "",
  date: "",
  time: "",
  passengers: "1",
  notes: "",
};

type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  // UK numbers: 10–11 digits once spaces and +44 are stripped.
  const digits = v.phone.replace(/[^\d]/g, "");
  if (!v.phone.trim()) e.phone = "We need a number to confirm your booking.";
  else if (digits.length < 10)
    e.phone = "That number looks too short — please check it.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email))
    e.email = "That email address does not look right.";
  if (!v.pickup.trim()) e.pickup = "Where should we collect you?";
  if (!v.destination.trim()) e.destination = "Where are you going?";
  if (!v.date) e.date = "Please choose a date.";
  return e;
}

/** Builds a prefilled WhatsApp message as the no-JS-backend fallback. */
function whatsappUrl(v: Values) {
  const lines = [
    "Quote request from your website:",
    `Name: ${v.name || "-"}`,
    `Phone: ${v.phone || "-"}`,
    v.email ? `Email: ${v.email}` : "",
    v.service ? `Service: ${v.service}` : "",
    `Pickup: ${v.pickup || "-"}`,
    `Destination: ${v.destination || "-"}`,
    `Date/time: ${v.date || "-"} ${v.time}`.trim(),
    `Passengers: ${v.passengers}`,
    v.notes ? `Notes: ${v.notes}` : "",
  ].filter(Boolean);
  return `${business.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function QuoteForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const errorId = (key: keyof Values) => `${id}-${key}-error`;

  function describe(key: keyof Values) {
    return {
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": errors[key] ? errorId(key) : undefined,
      disabled: state === "sending",
    } as const;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first field with a problem.
      const first = Object.keys(found)[0];
      document
        .querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus({ preventScroll: false });
      return;
    }
    setState("sending");
    // No backend is wired yet: hand the enquiry straight to WhatsApp, which is
    // how the office already takes bookings. Swap this for a POST to an API
    // route or form service when one exists.
    window.open(whatsappUrl(values), "_blank", "noopener,noreferrer");
    setState("sent");
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="rounded-sm border border-accent bg-surface p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold">Your request is on its way</h3>
        <p className="mt-3 text-base text-muted">
          We have opened WhatsApp with your details filled in — press send and
          we will come back to you with a fixed price. If WhatsApp did not
          open, call us on{" "}
          <a
            href={business.phoneHref}
            className="font-semibold text-accent underline"
          >
            {business.phone}
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={business.phoneHref}>
            Call {business.phone}
          </ButtonLink>
          <Button
            variant="ghost"
            onClick={() => {
              setValues(empty);
              setState("idle");
            }}
          >
            Send another request
          </Button>
        </div>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      {hasErrors ? (
        <p
          role="alert"
          className="rounded-sm border border-[#b3261e] bg-surface px-4 py-3 text-sm text-[#b3261e]"
        >
          Please check the highlighted fields below.
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="name"
          label="Your name"
          required
          value={values.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          errorId={errorId("name")}
          describe={describe("name")}
          autoComplete="name"
          placeholder="Jane Smith"
        />
        <Field
          name="phone"
          label="Phone number"
          required
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(v) => set("phone", v)}
          error={errors.phone}
          errorId={errorId("phone")}
          describe={describe("phone")}
          autoComplete="tel"
          placeholder="07700 900000"
        />
      </div>

      <Field
        name="email"
        label="Email"
        hint="Optional — we will send your written quote here."
        type="email"
        inputMode="email"
        value={values.email}
        onChange={(v) => set("email", v)}
        error={errors.email}
        errorId={errorId("email")}
        describe={describe("email")}
        autoComplete="email"
        placeholder="jane@example.com"
      />

      <div className="grid gap-2">
        <label className={label} htmlFor={`${id}-service`}>
          What do you need?
        </label>
        <select
          id={`${id}-service`}
          name="service"
          className={field}
          value={values.service}
          onChange={(e) => set("service", e.target.value)}
          disabled={state === "sending"}
        >
          <option value="">Not sure / something else</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="pickup"
          label="Pickup address"
          required
          value={values.pickup}
          onChange={(v) => set("pickup", v)}
          error={errors.pickup}
          errorId={errorId("pickup")}
          describe={describe("pickup")}
          placeholder="Lower Street, Pulborough"
        />
        <Field
          name="destination"
          label="Destination"
          required
          value={values.destination}
          onChange={(v) => set("destination", v)}
          error={errors.destination}
          errorId={errorId("destination")}
          describe={describe("destination")}
          placeholder="Gatwick Airport, South Terminal"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field
          name="date"
          label="Date"
          required
          type="date"
          value={values.date}
          onChange={(v) => set("date", v)}
          error={errors.date}
          errorId={errorId("date")}
          describe={describe("date")}
        />
        <Field
          name="time"
          label="Pickup time"
          type="time"
          value={values.time}
          onChange={(v) => set("time", v)}
          errorId={errorId("time")}
          describe={describe("time")}
        />
        <Field
          name="passengers"
          label="Passengers"
          type="number"
          min={1}
          max={8}
          value={values.passengers}
          onChange={(v) => set("passengers", v)}
          errorId={errorId("passengers")}
          describe={describe("passengers")}
        />
      </div>

      <div className="grid gap-2">
        <label className={label} htmlFor={`${id}-notes`}>
          Anything we should know?
        </label>
        <p className="text-xs text-muted">
          Flight number, number of large cases, wheelchair, child seat, pets, a
          return leg — the more you tell us, the more accurate the price.
        </p>
        <textarea
          id={`${id}-notes`}
          name="notes"
          rows={4}
          className={field}
          value={values.notes}
          onChange={(e) => set("notes", e.target.value)}
          disabled={state === "sending"}
          maxLength={1000}
          placeholder="BA2634 landing 19:40, two large cases and a dog."
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Request a fixed price"}
        </Button>
        <p className="text-xs text-muted">
          Or call{" "}
          <a
            href={business.phoneHref}
            className="font-semibold text-accent underline"
          >
            {business.phone}
          </a>{" "}
          — answered {business.hours}.
        </p>
      </div>

      <p className="flex items-start gap-2 text-xs text-muted">
        <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        Submitting opens WhatsApp with your details ready to send, so you keep a
        copy of the conversation.
      </p>
    </form>
  );
}

function Field({
  name,
  label: labelText,
  hint,
  error,
  errorId,
  value,
  onChange,
  describe,
  required,
  ...input
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  errorId: string;
  value: string;
  onChange: (v: string) => void;
  describe: Record<string, unknown>;
  required?: boolean;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "name" | "id" | "required"
>) {
  const id = useId();
  const fieldId = `${id}-${name}`;
  return (
    <div className="grid gap-2">
      <label className={label} htmlFor={fieldId}>
        {labelText}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 font-normal text-muted">(optional)</span>
        )}
      </label>
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      <input
        id={fieldId}
        name={name}
        className={field}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        {...describe}
        {...input}
      />
      {error ? (
        <p id={errorId} className="text-xs font-medium text-[#b3261e]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
