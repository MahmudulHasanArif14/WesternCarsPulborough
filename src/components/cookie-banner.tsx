"use client";

import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   CookieBanner
   Intent: ask once, remember the answer, and stay out of the way.
   The site loads no analytics or advertising scripts, so the choice
   is recorded and nothing else is gated behind it — but the record
   is what lets any future non-essential script check consent first.

   States: unanswered (visible) · accepted · declined · storage
           unavailable (treated as unanswered, never throws).
   ───────────────────────────────────────────────────────────── */

const KEY = "wcp-cookie-consent";

export function CookieBanner() {
  // Starts hidden so the server HTML and the first client paint agree.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      // Private mode or blocked storage: say nothing rather than nag.
    }
  }, []);

  function answer(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      // Nothing to persist to — dismissing for this visit is enough.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="alertdialog"
      aria-live="polite"
      aria-label="Cookie consent"
      aria-describedby="cookie-banner-description"
      className="fixed inset-x-0 bottom-[76px] z-50 border-t border-line bg-surface shadow-lg lg:bottom-0"
    >
      <div className="container-page py-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <h2 className="mb-1 text-sm font-bold">Cookie Consent</h2>
            <p id="cookie-banner-description" className="text-sm text-muted">
              We use only the cookies needed to make this site work and to
              remember this choice. We do not run advertising or tracking
              cookies.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => answer("declined")}
              className="min-h-[44px] rounded-btn border-2 border-line px-4 text-sm font-bold text-ink transition-colors duration-150 ease-standard hover:border-primary hover:text-primary"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => answer("accepted")}
              className="min-h-[44px] rounded-btn border-2 border-primary bg-primary px-4 text-sm font-bold text-surface transition-opacity duration-150 ease-standard hover:opacity-90"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
