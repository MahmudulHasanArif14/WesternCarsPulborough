---
name: design-system-western-cars
description: >
  Apply the Western Cars Pulborough | Taxi & Private Hire design system when building or
  updating UI. Use when creating components, choosing colors or typography, or reviewing
  designs for marketing interfaces.
---

# Western Cars Pulborough | Taxi & Private Hire — Design System Skill

## When to Use

- Building new UI components for Western Cars Pulborough | Taxi & Private Hire.
- Reviewing or updating existing component styles.
- Choosing colors, typography, or spacing for marketing pages.
- Checking designs against the extracted token set.

## Context

- **Product:** Western Cars Pulborough | Taxi & Private Hire — https://westerncarspulborough.co.uk/
- **Surface:** marketing
- **Audience:** Developers and technical decision-makers
- **Character:** Conversion-focused marketing presence with a balanced color system and single-typeface typography.

## Contact (canonical — use everywhere)

- **Phone:** 01798 305555
- **Email:** info@westerncarspulborough.co.uk
- **WhatsApp:** +44 7722 489859

## Services

Taxi service (primary category) · Airport transfers · Corporate travel · MVP hire ·
Wheelchair accessible taxis · Long-distance taxi service · Courier service ·
Airport shuttle service · Chauffeur service · Transportation service ·
Meet and greet service · Local taxi service · Corporate account service ·
Executive service · Event hire car service · Pet-friendly taxi service ·
6–8 seater minibus taxi · Large capacity taxi · Wedding car service ·
Wedding taxi transport · Event hire taxi transport · VIP transport escort ·
Security escort transport · Chauffeur escort service

## Tokens

### Colors

| Token | Value | Role |
|-------|-------|------|
| color-1 | `#0A0A0A` | Text Primary |
| color-4 | `#737373` | Text Secondary |
| color-2 | `#3D58A4` | Accent |
| color-3 | `#1864DC` | Accent |
| color-5 | `#D9D9D9` | Border |
| color-6 | `#FFFFFF` | Text Light |

### Typography

**Font stack:** Raleway

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 14px | Captions, metadata |
| text-sm | 16px | Labels, secondary text |
| text-base | 18px | Body text (default) |
| text-lg | 24px | Subheadings, emphasis |
| text-xl | 36px | Section headings |
| text-2xl | 48px | Section headings |

**Weight scale:** 400 · 500 · 600 · 700
**Line heights:** 48px · 32px · 40px · 28px · 22.75px · 20px · 24px

### Spacing

**Base unit:** 8px

`space-1: 4px` · `space-2: 8px` · `space-3: 12px` · `space-4: 16px` · `space-5: 20px` ·
`space-6: 24px` · `space-7: 32px` · `space-8: 40px` · `space-9: 56px` · `space-10: 64px` ·
`space-11: 99px` · `space-12: 584px`

### Shapes

**Border radius:** `radius-sm: 4px`

### Elevation

- **shadow-sm:** `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px`

### Motion

- `all`
- `none`
- `color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), fill 0.15s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1)`
- `opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)`

## Component Inventory

- **Buttons:** 2 detected
- **Links:** 31 detected
- **Navigation:** 1 element
- **Lists:** 2 detected
- **Images:** 20 detected

## Constraints

### Always

- Use tokens from the tables above — do not introduce new values.
- Include hover, focus-visible, and disabled states for interactive elements.
- Follow the 8px spacing grid.
- Meet WCAG 2.2 AA contrast minimums.

### Never

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (4px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Tone

Concise, confident, implementation-focused. Avoid filler preambles.

## Authoring Workflow

1. State intent — one sentence on purpose.
2. Map tokens — list every token the component uses.
3. Define anatomy — named parts with token assignments.
4. Specify states — default, hover, focus-visible, active, disabled, loading, error, empty.
5. Describe interactions — keyboard, pointer, touch, edge cases.
6. Add a11y criteria — testable pass/fail checks.
7. List anti-patterns — concrete misuse examples.
8. Close with the Definition of Done checklist.

## Output Structure

1. Overview (purpose, when to use, when not to use)
2. Tokens and foundations
3. Anatomy, variants, responsive behavior
4. States and interactions
5. Accessibility (ARIA, contrast, focus, screen reader)
6. Content guidelines (copy rules, tone)
7. Anti-patterns with reasoning

## Component Requirements

- Reference only tokens from the tables above.
- Define all states: default, hover, focus-visible, active, disabled, loading, error.
- Handle edge cases: empty, overflow, truncation, max content.
- Include keyboard navigation behavior.
- Document ARIA roles and labels.

## Definition of Done

- Default state renders (smoke test).
- All states visually verified.
- Zero hardcoded visual values — tokens only.
- Keyboard navigation works without pointer.
- No critical a11y violations.
- Tested at min and max breakpoint.
- At least one anti-pattern documented.
- Purpose, usage, and limitations documented.
