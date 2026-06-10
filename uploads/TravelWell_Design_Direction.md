# TravelWell.World — Design Direction

> **What this document is.** A complete design-direction brief for the redesign and
> rebuild of TravelWell.World, written to be fed directly into the design phase
> (Claude Design / canvas). It translates the functional Requirements Specification
> into concrete, intuitive design decisions: visual language, design tokens, type,
> components, **plus the full information architecture, user flows, per-surface content
> inventory, and state logic** so the design phase can build every surface without
> guessing or skipping anything.
>
> **How to read it.** Two halves that must be satisfied together: §1–§13 + §18 are the
> **visual & interaction system** (principles, color, type, components, screens, states).
> §14–§17 are the **functional foundation** — sitemap & navigation (§14), user flows
> (§15), what each surface must show (§16), and personalization/state logic (§17). The
> Quick-Start (§18) tells the design tool what order to build in. Section refs written
> as "Spec §X" point to the Requirements Specification; plain "§X" points to this doc.
>
> **North star.** *Premium, editorial, and effortlessly intuitive.* The product is a
> "Travel Operating System," but the traveler should never feel the machinery — they
> should feel guided, calm, and in control. Every screen earns its place by moving the
> traveler one clear step forward.
>
> **Theme.** Light, warm, editorial. (Dark surfaces are used only as deliberate
> *accent bands* — investor strips, footers — not as a global mode.)
>
> **Single source of visual truth: the two reference screenshots.** Color, typography,
> and look-and-feel are sampled directly from them. (Any prior CSS file is disregarded.)
> Confirmed type: **Playfair Display** for display/headings and **Inter** for body/UI —
> exactly as used in the screenshots. The palette below — warm ivory ground, pine-teal
> action, champagne-gold accent, warm-charcoal bands — is read straight from the imagery.

---

## 1. Design Principles

These six principles resolve trade-offs when the spec is silent. When in doubt, the
earlier principle wins.

1. **One clear next step.** Every surface has a single primary action. The Dream
   Journey (Interest → Place → Need → Plan) is always visible as forward motion. Never
   present the traveler with a wall of equal-weight choices.
2. **Guided, not gated.** No account is ever required to browse or to build a Travel ID
   (NFR-4). Personalization is a reward for engagement, never a toll booth.
3. **Editorial calm over dashboard density.** This is a magazine that happens to be an
   engine, not an admin panel. Generous whitespace, large imagery, restrained color.
   Data-richness is revealed progressively, never dumped.
4. **Honesty is visible.** Real vs. placeholder content, FTC affiliate disclosure, and
   "coming soon" states are designed as first-class, trustworthy UI — not fine print
   (Hard Constraints 6, 7; FR-S5/S6).
5. **Premium through restraint.** Luxury reads as space, typography, and material
   quality — not gold everywhere. The gold accent is a seasoning, not a sauce.
6. **Accessible and global by default.** Light-theme contrast, full keyboard paths,
   skip-to-content, and complete RTL (Arabic) support are designed in from the first
   component, not retrofitted (NFR-2, FR-I3).

---

## 2. Brand Feel & Voice

**Personality:** a well-traveled, discreet concierge. Knowledgeable, warm, never
breathless. Confident enough to use whitespace.

**The signature (mandatory — Hard Constraint 9).** The brand-voice line
*"If it's \<thing\>… **Travel Well.**"* must appear on SI / Well / Region / Provider
cards. Design treatment:

- The full line is set in the **body serif, italic**, muted ink.
- The words **"Travel Well."** are set in the **pine-teal (ocean accent)**, upright (not
  italic) to make them pop, with the **period always present**.
- Reserve a consistent slot for it at the *foot* of each card so it reads as a signing,
  like a maker's mark.

**Tone of microcopy:** plain, generous, second person ("Your journey," "Continue your
trip"). Avoid jargon on traveler surfaces; the OS vocabulary (Wells, SIs, Engines) is
for the About/Architecture and investor surfaces, not the casual browser.

---

## 3. Color System (Light Theme)

The palette is **warm ivory ground + one dominant action color (pine-teal) + one
editorial accent (champagne-gold)**, with warm near-black ink. Dark warm-charcoal is an
accent surface only. This matches the screenshots and follows the "dominant color with
sharp accents" rule rather than a timid, evenly distributed palette.

### 3.1 Core palette

| Role | Name | Hex (ref) | oklch (token) | Use |
|---|---|---|---|---|
| Ground | Ivory | `#F7F4EC` | `oklch(0.964 0.012 85)` | Page background |
| Surface | Warm White | `#FFFFFF` | `oklch(1 0 0)` | Cards, sheets, inputs |
| Surface alt | Linen | `#FBF9F3` | `oklch(0.984 0.008 85)` | Section banding |
| Ink | Espresso Black | `#1C1B18` | `oklch(0.205 0.006 75)` | Primary text, headings |
| Muted ink | Stone | `#6B6760` | `oklch(0.52 0.008 80)` | Secondary text, captions |
| **Primary** | **Pine Teal** | `#2C6E68` | `oklch(0.50 0.055 178)` | CTAs, links, active nav, "Travel Well." |
| Primary hover | Deep Pine | `#235A55` | `oklch(0.44 0.052 178)` | Hover/pressed |
| Primary soft | Sage Mist | `#E3EDE9` | `oklch(0.93 0.018 175)` | Icon chips, tints, selected bg |
| **Accent** | **Champagne Gold** | `#C2A35B` | `oklch(0.74 0.085 85)` | Editorial accents, luxury, "LIVE" pills |
| Accent deep | Antique Gold | `#A8873F` | `oklch(0.63 0.09 82)` | Gold text on light, links in dark bands |
| Dark band | Warm Charcoal | `#211D17` | `oklch(0.21 0.012 75)` | Investor strips, footer, sample-journey |
| Border | Sand Line | `#E7E2D6` | `oklch(0.905 0.012 85)` | Hairlines, card borders, dividers |
| Input border | Sand Line | `#E7E2D6` | `oklch(0.905 0.012 85)` | Field borders |
| Ring (focus) | Pine Teal 60% | — | `oklch(0.50 0.055 178 / 0.55)` | Focus ring (always visible) |

### 3.2 Semantic & functional colors

These carry meaning required by the spec — keep them distinct from the gold accent so
meaning never blurs into decoration.

| Role | Hex (ref) | oklch | Used for |
|---|---|---|---|
| Emergency / destructive | `#B3261E` | `oklch(0.50 0.20 27)` | Global Emergency action (FR-S3), destructive |
| Success / Live | `#2C6E68` (teal) | — | "Real / Live" status, confirmations |
| Pre-launch / Coming soon | Stone on Linen | — | Ship-Well, Insure-Well "Activated at Launch" |
| Disclosure / info | `#6B6760` | — | FTC affiliate disclosure text |

**Safety Card level scale (1–4)** — a calm, legible 4-step ramp, never alarmist:

| Level | Meaning | Hex | Token name |
|---|---|---|---|
| 1 | Exercise normal precautions | `#3F7E55` | safety-1 (green) |
| 2 | Increased caution | `#C2A35B` | safety-2 (gold) |
| 3 | Reconsider travel | `#C9772F` | safety-3 (amber) |
| 4 | Do not travel | `#B3261E` | safety-4 (red) |

Present safety level as a labeled chip with both color **and** text/number (never color
alone — accessibility).

### 3.3 CSS token block (fresh — sampled from the screenshots)

A clean set of CSS custom properties to drive the rebuild. Ship the **light theme only**
as the default; the dark values are scoped solely for the intentional dark *bands*
(investor strips, footer), not a global toggle.

```css
:root {
  --background: oklch(0.964 0.012 85);        /* Ivory ground */
  --foreground: oklch(0.205 0.006 75);        /* Espresso ink */
  --card: oklch(1 0 0);                        /* Warm white */
  --card-foreground: oklch(0.205 0.006 75);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.205 0.006 75);
  --primary: oklch(0.50 0.055 178);            /* Pine teal */
  --primary-foreground: oklch(0.99 0.005 85);
  --secondary: oklch(0.93 0.018 175);          /* Sage mist */
  --secondary-foreground: oklch(0.44 0.052 178);
  --muted: oklch(0.984 0.008 85);              /* Linen */
  --muted-foreground: oklch(0.52 0.008 80);    /* Stone */
  --accent: oklch(0.74 0.085 85);              /* Champagne gold */
  --accent-foreground: oklch(0.205 0.006 75);
  --destructive: oklch(0.50 0.20 27);          /* Emergency red */
  --destructive-foreground: oklch(0.99 0.005 85);
  --border: oklch(0.905 0.012 85);             /* Sand line */
  --input: oklch(0.905 0.012 85);
  --ring: oklch(0.50 0.055 178);               /* Focus = pine */
  --radius: 0.75rem;                            /* see §6 */

  /* Brand extensions (new) */
  --gold-deep: oklch(0.63 0.09 82);
  --dark-band: oklch(0.21 0.012 75);
  --dark-band-foreground: oklch(0.97 0.01 85);
  --safety-1: oklch(0.55 0.10 150);
  --safety-2: oklch(0.74 0.085 85);
  --safety-3: oklch(0.65 0.15 55);
  --safety-4: oklch(0.50 0.20 27);
}
```

> **Contrast notes.** Ink on Ivory and white clears WCAG AA for body and AAA for large
> text. Pine-teal text on ivory passes AA. **Gold is decorative, not a text color on
> light** — for gold *text*, use Antique Gold (`--gold-deep`) or place gold on the dark
> band. White text on pine-teal passes AA for buttons.

---

## 4. Typography

A high-contrast **serif for display** (Playfair Display) paired with a clean, neutral
**sans for UI/body** (Inter) — the exact editorial-meets-modern pairing used in the
screenshots. The character comes from the *contrast between the two* and from generous
sizing and spacing, not from exotic faces: Playfair's dramatic thick/thin strokes at
large sizes do the heavy lifting; Inter stays quiet and legible underneath.

### 4.1 Families

| Role | Family | Fallback | Notes |
|---|---|---|---|
| **Display / Headings** | **Playfair Display** | Georgia, "Times New Roman", serif | High-contrast transitional serif; the dramatic thick/thin strokes give the "Worlds of Adventure" / "Extraordinary Experiences" headings their editorial elegance. Use weights 400–600; reserve 700 for the largest hero only. |
| **Body / UI** | **Inter** | system-ui, "Helvetica Neue", sans-serif | Clean, neutral, highly legible at small sizes — used for all paragraphs, navigation, buttons, captions, eyebrows, and status text. |
| **Codes / IDs (optional)** | **Inter** (tabular nums) or a system monospace | ui-monospace | For entity IDs (`TWW-W-001`), version stamps, and investor figures. Inter with `font-variant-numeric: tabular-nums` keeps the two-font system intact; a monospace is optional only on the Architecture/investor surfaces. |

> Both faces are free Google Fonts. Load Playfair Display weights 400/500/600 (+ italic
> for the signature line) and Inter weights 400/500/600. Keep the family count to these
> two everywhere — the discipline is part of the premium feel. Do **not** substitute a
> sans for display headings or a serif for body.

### 4.2 Type scale (desktop; scale down ~0.85× on mobile)

| Token | Family / Weight | Size / Line | Use |
|---|---|---|---|
| Display XL | Playfair Display 600–700 | 72 / 1.02 | Hero H1 ("TravelWell") |
| Display L | Playfair Display 500 | 56 / 1.05 | Page titles ("Extraordinary Experiences") |
| H2 | Playfair Display 500 | 36 / 1.15 | Section titles ("Travel, Elevated") |
| H3 | Playfair Display 500 | 24 / 1.25 | Card titles, Well names, experience-card titles |
| Eyebrow | Inter 600, 0.14em tracking, UPPERCASE | 12 / 1.4 | Kickers ("WHY TRAVELWELL", "DISCOVER") — set in pine-teal |
| Lead | Inter 400 | 20 / 1.5 | Hero subcopy, section ledes |
| Body | Inter 400 | 16 / 1.6 | Paragraphs |
| Body S | Inter 400 | 14 / 1.55 | Card descriptions, captions |
| Micro | Inter 500 | 12 / 1.4 | Disclosure, metadata, status pills |
| Signature | Playfair Display italic 400 | 16 / 1.5 | The "Travel Well." brand line |

> Note: "Your Journey Starts Here" in the hero (screenshot 1) is set in serif italic —
> use Playfair Display italic for that one supporting line to echo the display family.

**Rules.** Headings are serif and ink-colored (or white on dark/photo). The **gold
accent on a hero subtitle** (as in screenshot 1's "Worlds of Adventure") is a *special
treatment for the hero only* — don't repeat gold serif headings throughout. Eyebrows are
always uppercase sans in pine-teal. Body copy never goes below 14px.

---

## 5. Spacing, Grid & Layout

- **Spacing scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Sections breathe
  with 96–128px vertical rhythm on desktop; cards use 24–32px internal padding.
- **Grid:** 12-column, max content width **1200px**, gutters 24px (32px ≥1440px).
  Editorial sections may use a centered single column at ~720px for reading comfort.
- **Card grids:** 3-up for feature cards and experience cards; 5-up for the Special
  Interests / Wells rows (collapsing to 2-up then 1-up on mobile — see §11).
- **Asymmetry where it earns attention:** hero uses a wide bleed image with a
  left-weighted text column; "Special Interests" uses a tighter, denser tile grid as a
  deliberate change of rhythm.
- **Section banding:** alternate Ivory ↔ Linen ↔ Warm White to segment long pages
  without hard rules. Reserve the **Warm Charcoal dark band** for investor/sample-journey
  strips and the footer only.

---

## 6. Material: Radius, Elevation, Borders

- **Radius:** `--radius: 0.75rem` (12px) for cards/buttons; **pills** (fully rounded)
  for status chips, the Discover/CTA buttons, and the "Your Trip" tray — matches the
  rounded buttons in the screenshots.
- **Borders:** 1px Sand Line hairlines. Cards on Ivory use a hairline + very soft
  shadow; cards on white use shadow alone.
- **Elevation (soft, warm, never harsh):**
  - E1 (cards): `0 1px 2px rgba(28,27,24,.04), 0 4px 16px rgba(28,27,24,.05)`
  - E2 (hover / popover): `0 8px 28px rgba(28,27,24,.10)`
  - E3 (tray / modal): `0 16px 48px rgba(28,27,24,.16)`
- **Imagery treatment:** large rounded images (12–16px), subtle dark gradient scrim at
  the bottom of photo cards so white overlay text stays legible (as in the experience
  cards). Every image **must** carry alt text — it's a required data field (NFR-2).

---

## 7. Iconography & Imagery

- **Icons:** a single consistent line set (e.g. Lucide), 1.5px stroke, pine-teal inside
  Sage-Mist rounded square "chips" for feature/well icons (matches screenshot 1's icon
  chips). Never mix filled and line styles in one row.
- **Photography is the hero medium.** Rich, editorial travel photography, warm-graded to
  sit beside the ivory ground. Faces and motion welcome (the screenshots use a singer, a
  diver, the Seine). Avoid stocky, over-saturated imagery.
- **Empty/placeholder imagery** for schema-only content uses a muted, desaturated
  treatment with a clear "Preview" marker — never a polished photo that implies the
  content is live (Hard Constraint 6).

---

## 8. Motion

Restrained and premium. The goal is *one well-orchestrated arrival per screen*, not
scattered fidgeting.

- **Page load:** staggered fade-and-rise (8–12px, 60–80ms stagger) on hero text, then
  cards. One time, on first paint.
- **Hover:** cards lift 2–4px with shadow E1→E2 and image scale 1.0→1.03 (overflow
  hidden). Buttons darken to hover token; gold pills get a faint sheen.
- **Journey progress:** the Step Indicator animates the active step with a smooth fill,
  reinforcing forward motion.
- **Tray / sheets:** slide + fade, 200–260ms, ease-out.
- **Respect `prefers-reduced-motion`:** disable transforms, keep opacity only.

---

## 9. Core Components (mapped to requirements)

Design these as a reusable kit; every traveler surface is assembled from them.

### 9.1 Buttons
- **Primary:** pine-teal fill, white text, pill, 44px min height. (e.g. "Design Your Next
  Adventure," "Get Started.")
- **Secondary:** white/transparent fill, Sand-Line border, ink text, pill.
- **Gold (special):** champagne-gold fill, charcoal text — reserved for investor/luxury
  CTAs ("View Itinerary") and used sparingly.
- **Ghost / link:** pine-teal text, underline on hover.
- All buttons: visible focus ring (pine), pressed state, disabled = 40% + no shadow.

### 9.2 Status pills & badges (a small, consistent language)
- **Engine Active:** pill with a small live dot + label ("TravelWell Engine Active") — a
  reassuring system-status indicator, low-key, on light or photo.
- **LIVE:** gold pill, charcoal text — for the investor/demo strip.
- **Real vs. Placeholder (Hard Constraint 6):** *Live* = small teal dot + "Live" label;
  *Preview/Schema* = stone outline pill + "Preview" + desaturated card. These must be
  visually distinct at a glance and never mixed in the same "real" list.
- **Coming Soon ("Activated at Launch"):** stone pill on a slightly dimmed card — used
  for Ship-Well and Insure-Well. The card stays visible (so the architecture reads) but
  clearly cannot be acted on yet.

### 9.3 Cards
- **Feature card** (Why-TravelWell style): icon chip, H3 title, body-S description,
  hairline + E1 shadow.
- **Experience card** (large photo): full-bleed image, bottom scrim, serif title +
  caption in white, optional carousel dots (gold = active). Foot slot reserved for the
  "Travel Well." signature where applicable.
- **SI / Region / Provider card:** hero image, name, signature line, accent stripe (each
  SI/Region carries its own `color_accent` — let it tint a thin top border or the icon
  chip, *within* the brand palette), live/preview status, and — for providers — the FTC
  disclosure + tracked-redirect CTA.
- **Well tile:** pine-teal solid tile, white icon chip, Well name + one-word category
  (matches "Your Travel Ecosystem" row). Conditional Wells (Nanny-Well, Security-Well)
  appear in this row **only** on Luxury / Ultra-Luxury contexts (Hard Constraint 3).

### 9.4 FTC Affiliate Disclosure (FR-S5, FR-M3 — non-negotiable)
A consistent, honest, non-hidden treatment wherever a monetized provider link appears:
- A small info-marked line in micro type, stone color, directly adjacent to the CTA
  (not buried in a footer): e.g. *"We may earn a commission if you book through this
  link."* plus the provider's own `ftc_disclosure` string.
- Prospective (unsigned) partners get a distinct "Prospective partner" tag and must not
  look like a confirmed deal (FR §2.5).
- All such CTAs route through the `/go` tracked redirect (FR-M3) — design the CTA so the
  redirect is invisible to the user but the disclosure is not.

### 9.5 Navigation (global shell — FR-N1…N5)
- **Top bar:** logo (TW mark + wordmark) left; primary links center/right (Worlds of
  Adventure / Discover, etc.); auth (Sign in / Get Started, or Discover / Sign out) far
  right. Translucent over the hero, solid Ivory on scroll. Active link = pine-teal.
- **Locale switcher:** compact, preserves the current page (FR-N5); flips the entire
  shell to **RTL for Arabic** (FR-I3) — mirror layout, not just text.
- **Skip-to-content** link (visible on focus) as the first focusable element (FR-N3).
- **Footer (dark band):** brand signature line, version stamp (mono), and links to the
  proof/structure pages (Architecture, SIs, Regions, Wells, Providers, Founder's Grand
  Tour). Gold for link hovers on the dark band.

### 9.6 "Your Trip" tray (FR-J5)
A persistent, dismissible bottom/side tray showing the trip-in-progress with a count and
a "Continue" CTA, reachable from anywhere. Slides up; collapses to a small pill when
idle. Suppressed on the dedicated itinerary and demo surfaces (documented rule).

### 9.7 Journey Step Indicator (FR-J, §3)
A slim 4-step progress rail — "Step X of 4: Interest · Place · Need · Plan" — pinned near
the top of journey surfaces. Completed steps = teal fill; current = teal outline + label;
upcoming = stone. Always offers clear back-navigation up the ladder without losing
context (FR-J6).

### 9.8 Global Emergency action (FR-S3)
A discreet but always-reachable affordance (e.g. a small shield/“Emergency” entry in the
shell). Calm in resting state; uses the emergency-red token only inside the opened
panel, which surfaces the destination Safety Card essentials (hospital, embassy,
advisory level, checklist) and links to the digital safety card / First Aid Kit QR.

### 9.9 Identity Card (Travel ID output, FR §4.9)
The reward artifact of the 6-step builder. A premium "card" object (think passport-meets-
membership): warm-white surface, gold hairline, the traveler's party, styles, budgets-by-
category summarized as chips, and selected SIs. Editable; resettable; lives client-side.

---

## 10. Screen-by-Screen Direction

Each entry: the job of the screen + the intuitive layout move. Routes are from the spec
for traceability.

### Home `/[locale]` (FR §4.1)
*Job: one inviting door into the journey.* Full-bleed hero photo, serif H1 with the
gold-accent second line, short lede, **one** primary CTA ("Design Your Next Adventure")
+ one secondary ("Explore Experiences"). Below: a 3-up "Why TravelWell" trust row, a
small curated set of featured SIs/destinations, and — if a Travel ID exists — a
"Suggested for you" rail (FR-P1). Close with the dark investor strip. No clutter; one
path forward (Principle 1).

### Discover / Experiences (FR §4.2 index)
*Job: make the taxonomy feel like a magazine, not a database.* Big serif title + lede,
then 3 large experience cards (with carousels), a denser "Special Interests" tile grid
("Explore your passions"), and the "Your Travel Ecosystem" Wells row. End with a "Sample
Journey" dark strip → View Itinerary. (Mirrors screenshot 2 exactly.)

### Special Interests index & detail (FR §4.2)
Index lists all 25 SIs with name, signature line, hero, accent, and live/preview status.
Detail: editorial intro, the Wells this SI activates, a **provider rail** (grouped by
Well, with disclosure), and links into relevant regions/destinations. Age-cohort banner
when a profile exists (FR-P1). Intersection view `[slug]/[region]` caps at top 12, shown
six at a time (FR-J7).

### Regions index & detail (FR §4.3)
Index: 11 regions, each with positioning line, country count, gateway airports, accent.
Detail: countries, airports, season profile, destinations in-region, provider routing.
Quick region-to-region nav (a slim horizontal selector).

### Destinations index & detail (FR §4.4)
Index with a **Live / Preview filter** (real vs schema, clearly distinguished). Detail:
hero, description, provider stacks grouped by Well, the **Safety Card**, related guides,
related destinations. Live destinations always show a Safety Card (FR-S1).

### Wells index & detail (FR §4.5)
Present all 10 Wells with purpose + path to providers; Ship-Well in pre-launch state. On
Luxury / Ultra-Luxury contexts, additionally surface **Nanny-Well** and **Security-Well**
(12 total), suppressed everywhere else. Well detail: providers, service categories,
commission/use-case context.

### Providers `/[locale]/providers` (FR §4.6)
A filterable catalog (by Well / SI / region). Each entry: tier-aware emphasis,
accreditations, FTC disclosure, tracked-redirect CTA. Use restrained tier cues
(platinum/gold/silver/bronze) — a small label, not loud color.

### Guides index & detail (FR §4.7)
Editorial grid grouped by type; each card shows type indicator, headline, lede, read
time, last-updated. Detail = long-form reading column (~720px) with in-context
provider/destination links. Includes standalone guides (e.g. Morocco — Top 8).

### Plan Your Trip `/[locale]/plan` (FR §4.8)
High-intent hub: seasonal/date-aware campaign banner (uses current date + Travel ID),
featured campaigns, featured destinations, featured guides, a **10-Well coverage
checklist**, and the full SI grid. The checklist doubles as a gentle upsell of uncovered
Wells.

### Travel ID wizard & Profile (FR §4.9)
A friendly, **6-step** wizard (Age → Activity/Interests → per-Well Budget → Party → Trip
Type → free-text dream). One question-cluster per step, the Step Indicator visible,
progress saved as they go, no account required. Ends by presenting the **Identity Card**
(§9.9) with edit/reset. Keep it conversational and low-friction — this is the
personalization on-ramp, so it must never feel like a form to "get through."

### Itinerary builder `/[locale]/itinerary` (FR §4.10)
Interactive board across the **6 time blocks** (Dawn · Morning · Midday · Afternoon ·
Evening · Night). Blocks tie to destination/SI/Well/provider; drag to arrange. An **AI
Sync/Review** button returns suggestions — the response must **label its source**
("AI-generated" vs "Suggested by rules") per FR §6/§7, shown as a small, honest tag. A
**Well-gap** panel shows uncovered Wells with upsell CTAs.

### First Aid Kit / commerce `/[locale]/kit` (FR §4.12)
Product page: hero, life-saving items, "what's inside" categories, the QR → safety-card
digital integration, target-traveler profiles, FAQs, and an order/pre-order path (email
pre-order now, checkout later — design so the swap to Stripe is invisible). Price shown
clearly ($189).

### Events / community (FR §4.13)
Race For The Conch logistics hub and Founder's Grand Tour narrative. **Surge/seasonal
windows must be real** (Hard Constraint 8) — design the seasonal indicators so they read
as factual data, never hype.

### Investor / Partner demo surfaces (FR §4.15)
*A distinct, more "boardroom" register — this is where the dark band and gold lead.*
- **Public `/demo`:** live platform stats, Well revenue architecture, engines,
  differentiators, OS architecture, tech stack. No gate.
- **VC `/vc-demo` (gated):** a real worked Paris itinerary with real commission data, a
  scaling calculator, integration roadmap, revenue milestones. Design a clean
  password gate.
- **VC Ultra `/vc-demo/ultra`:** extended luxury economics. All numbers real/auditable
  (Hard Constraint 8).
Use the mono font for figures and IDs to signal rigor.

### About / Architecture (FR §4.16)
The credibility surface: explain the OS layers (SIs, Regions, Wells, Engines, Schemas)
and the spec-first philosophy. This is the one place where the full system vocabulary and
diagrammatic layout are welcome.

---

## 11. Responsive Behavior

- **Breakpoints:** mobile <640 · tablet 640–1024 · desktop 1024–1440 · wide >1440.
- **Hero:** image moves behind/above text on mobile; H1 scales to ~40px; single stacked
  CTA.
- **Grids:** 5-up → 2-up (mobile) for SI/Well rows; 3-up → 1-up for feature/experience
  cards. Maintain ≥16px gutters.
- **Nav:** collapses to a hamburger sheet on mobile; "Your Trip" tray becomes a bottom
  bar; Emergency stays one tap away.
- **Touch targets:** ≥44px. Carousels become swipeable.

---

## 12. Accessibility & Internationalization

- **Contrast:** all combinations in §3 meet WCAG AA (gold is decorative only — see note).
- **Keyboard:** full tab order, visible pine focus ring on every interactive element,
  logical order through the journey, escape closes trays/sheets.
- **Skip-to-content:** first focusable element (FR-N3).
- **Status never by color alone:** safety levels, live/preview, and coming-soon always
  pair color with text/icon.
- **Alt text:** required on all hero/imagery (it's a data field) — design slots assume it
  exists (NFR-2).
- **RTL (Arabic, FR-I3):** the entire shell mirrors — nav, cards, the Step Indicator
  direction, icon placement, and the "Your Trip" tray. Inter does not cover Arabic, so
  pair an Arabic-capable companion for Arabic body/UI (e.g. **Noto Sans Arabic** or
  **IBM Plex Sans Arabic**) and a display face for Arabic headings (e.g. **Noto Naskh
  Arabic**) since Playfair Display is Latin-only. Locale-aware metadata/breadcrumbs are
  designed per-locale (FR-I5).
- **Reduced motion:** honored (see §8).

---

## 13. Honesty & State Treatments (cross-cutting, required)

These appear across many screens and must be designed once, consistently:

1. **Real vs. Placeholder** — teal "Live" vs. stone "Preview" + desaturated media;
   never mixed in a "real" list (Hard Constraint 6, FR-S6).
2. **FTC disclosure** — adjacent to every monetized CTA; prospective partners tagged
   (FR-S5, §2.5).
3. **Coming-soon Wells** — Ship-Well / Insure-Well shown but un-actionable, "Activated
   at Launch."
4. **Conditional Wells** — Nanny-Well & Security-Well surface only on Luxury /
   Ultra-Luxury (Hard Constraint 3).
5. **AI source labeling** — itinerary suggestions tagged AI vs. rules (FR §6/§7).
6. **Graceful degradation** — flight status, magic-link verify, etc., show a calm
   "preview/coming soon" state rather than an error when keys are absent (NFR-3).

---

## 14. Information Architecture & Sitemap

> **The screenshots show a deliberately minimal nav; the spec (FR-N1) requires exposing
> many sections. Resolution:** keep the top bar editorial and uncluttered (matching the
> screenshots), and carry the full IA in a **"Worlds of Adventure" mega-menu** + the
> **footer**. The traveler sees calm; the structure is one click away.

### 14.1 Global navigation (the persistent shell)

**Top bar (always visible).**
- Left: TW logomark + "TravelWell" wordmark (→ Home).
- Center/right: **"Worlds of Adventure"** (opens mega-menu), **Discover** (→ experiences
  index).
- Right: auth-state action — *anonymous:* "Sign in" (text) + "Get Started" (primary
  pill); *profiled:* "My Itinerary" (pill) + "Sign out" (text).
- Locale switcher (compact), and the global **Emergency** affordance.
- First focusable element: **skip-to-content** (FR-N3).

**"Worlds of Adventure" mega-menu** exposes the full primary IA (FR-N1), grouped:
- *Explore:* Special Interests · Destinations · Regions · Guides
- *The System:* Wells · Providers · About / Architecture
- *Plan:* Plan Your Trip · Travel ID · My Itinerary · Profile
- *More:* Demo · First Aid Kit · Events

**Footer (dark band, FR-N2):** brand signature line, version stamp (tabular numerals),
and links to proof/structure pages — Architecture, SIs, Regions, Wells, Providers,
Founder's Grand Tour — plus legal + FTC affiliate-disclosure statement.

**Persistent global affordances:** "Your Trip" tray (FR-J5, suppressed on itinerary +
demo surfaces), Emergency action (FR-S3), locale switcher with RTL flip (FR-N5/FR-I3).

### 14.2 Full route map (every surface the design must account for)

| Route | Surface | Auth | Notes |
|---|---|---|---|
| `/[locale]` | Home | public | One door into the journey |
| `/[locale]/si` · `/si/[slug]` · `/si/[slug]/[region]` | Special Interests index / detail / intersection | public | 25 SIs; live vs preview; cap top-12, six at a time |
| `/[locale]/regions` · `/regions/[id]` | Regions index / detail | public | 11 regions (01F→11A) |
| `/[locale]/destinations` · `/destinations/[slug]` | Destinations index / detail | public | Live/preview filter; Safety Card on live |
| `/[locale]/wells` · `/wells/[type]` | Wells index / detail | public | 10 base (Ship pre-launch); +Nanny/Security on Luxury/Ultra |
| `/[locale]/providers` | Providers catalog | public | Filter by well/si/region; FTC + tracked redirect |
| `/[locale]/guides` · `/guides/[slug]` · `/morocco` | Guides | public | Editorial; type-grouped |
| `/[locale]/plan` | Plan Your Trip | public | Seasonal banner + 10-Well checklist + SI grid |
| `/[locale]/travel-id` · `/profile` | Travel ID wizard / Profile | public, client-only | 6-step → Identity Card; edit/reset |
| `/[locale]/itinerary` · `/itinerary/[id]` | Itinerary builder | public, client-only | 6 time blocks; AI sync; Well-gap |
| `/[locale]/ultra` | Ultra-Luxury universe | public | Service tiers, concierge path, moat narrative |
| `/[locale]/kit` | First Aid Kit / commerce | public | $189; email pre-order now, checkout later |
| `/race-for-the-conch` · `/founders-grand-tour` | Events / community | public | Real surge/seasonal data only |
| `/demo` | Public investor demo | public | Live stats, revenue architecture |
| `/vc-demo` · `/vc-demo/ultra` | VC demos | **gated** | Password gate; real/auditable economics |
| `/[locale]/about/architecture` | About / Architecture | public | OS-layer credibility surface |
| `/[locale]/go` | Affiliate tracked redirect | public | Invisible hop; disclosure shown at source |
| `/[locale]/verify-email` | Email verification | public | **Stub today** — calm "magic link coming soon" state; degrade gracefully (NFR-3) |

---

## 15. Primary User Flows

These are the journeys the design must make effortless. Each is the *happy path* with the
key decision points and states the screens must support.

### 15.1 The Dream Journey (the spine — 4 steps, FR-J1→J7)
1. **Interest.** Traveler lands on Home or Discover → picks a Special Interest. Live SIs
   are selectable; preview SIs are visibly distinct and not dead-ends (they explain
   "coming soon"). *Step Indicator: 1 of 4.*
2. **Place.** SI detail shows relevant Regions → traveler picks a Region/Destination.
   Intersection view caps at top 12 (six at a time). *Step 2 of 4.*
3. **Need / Partner.** SI × Place shows a **provider rail grouped by Well**, each with FTC
   disclosure. Traveler acts on a provider → routes via `/go`. *Step 3 of 4.*
4. **Plan.** Selections assemble into the Itinerary; traveler proceeds toward booking via
   partner links. *Step 4 of 4.*
- **Throughout:** the "Your Trip" tray reflects progress; back-navigation steps up the
  SI → Region → Provider ladder without losing context (FR-J6). No step is a dead end.

### 15.2 Build a Travel ID (6-step wizard, FR §4.9)
Entry: "Get Started" / "Design Your Next Adventure" / any personalization prompt →
**Age → Activity & Interests → per-Well Budget → Party → Trip Type → Free-text dream** →
**Identity Card** presented. Saved to client storage at each step (resumable). No account.
Exits: continue into the Dream Journey, or edit/reset later from Profile. *Step Indicator
visible the whole way; one question-cluster per screen.*

### 15.3 Personalized return visit (FR-P1)
Profiled traveler returns → Home shows **"Suggested for you"** destinations → SI pages show
an **age-cohort banner** → Plan ranks campaigns by **season + profile** → Itinerary offers
**AI sync**. All four must also work (gracefully) with *no* profile present.

### 15.4 Assemble & sync an itinerary (FR §4.10, FR-P7)
Add ItineraryBlocks across the **6 time blocks** (Dawn · Morning · Midday · Afternoon ·
Evening · Night), each tied to destination/SI/Well/provider → drag to arrange → tap **AI
Sync/Review** → suggestions return, each **labeled source: "AI" or "rules"** → a
**Well-gap panel** shows uncovered Wells with upsell CTAs. Persists; loadable by ID.

### 15.5 Act on a monetized provider (FR-M3, FR-S5)
See provider tile → **FTC disclosure shown adjacent to the CTA** (and "prospective
partner" tag if unsigned) → tap CTA → silent hop through `/go` (records intent) →
forwards to partner. The redirect is invisible; the disclosure is not.

### 15.6 Reach help fast (FR-S3)
From **any** page → Emergency affordance → panel surfaces the current destination's Safety
Card essentials (advisory level 1–4, nearest hospital, embassy, checklist) → link to the
digital safety card / First Aid Kit QR. Calm at rest; red only inside the open panel.

### 15.7 View a gated investor demo (FR §4.15)
Visit `/vc-demo` → clean password gate → real worked Paris itinerary + commission data +
scaling calculator + roadmap. `/demo` is ungated. All figures real/auditable.

### 15.8 Switch language / RTL (FR-N5, FR-I3)
Locale switcher → page is preserved → for **Arabic**, the entire shell mirrors to RTL
(layout, nav, Step Indicator direction, tray side), not just text.

---

## 16. Content & Data Inventory (what each surface must show)

So the design never invents or omits a field. Each entity's *display* fields, drawn from
the data model (Spec §2). Status/disclosure treatments per §13.

- **Special Interest card / page:** name, tagline/signature line, hero image (+alt),
  `color_accent`, live/preview status, traveler archetype (page), editorial intro (page),
  Wells activated, featured destinations (editorial note · budget range · best season ·
  highlight stat), links to regions. (Spec §2.1, §4.2)
- **Region card / page:** name + ID, positioning/mood line, member-country count (page:
  list), gateway airports, season profile, accent, destinations in region. (Spec §2.2)
- **Well tile / page:** name, body-system purpose/tagline, service categories, providers,
  commission/use-case context (page). Ship-Well = "Activated at Launch"; Nanny/Security
  only on Luxury/Ultra. (Spec §2.3, §4.5)
- **Destination card / page:** name, tagline, region, country (+code), hero (+alt),
  live/preview, description (page), provider stacks grouped by Well, **Safety Card**,
  related guides, related destinations, season profile, stay-type tiers. (Spec §2.4)
- **Provider tile:** name, type, Well, pricing/quality tier cue, accreditations,
  **FTC disclosure**, tracked-redirect CTA; "prospective" tag if unsigned. (Spec §2.5)
- **Safety Card:** advisory level (1–4, color + label), nearest hospital (name/coords),
  embassy info, crime/risk breakdown, natural hazards, connectivity, traveler checklist.
  (Spec §2.6)
- **Guide card / page:** type indicator, headline, lede, read time, last-updated;
  long-form body with in-context provider/destination links. (Spec §4.7)
- **Identity Card (Travel ID output):** party members (role · interests · dietary ·
  accessibility), per-category budget chips, travel styles, selected SIs, trip intent /
  occasion / pace / window; edit + reset. (Spec §2.7)
- **Itinerary block:** time block, destination, SI, Well, provider, notes; plus the
  Well-gap summary and AI-suggestion source tag. (Spec §2.8)
- **The brand signature** (`"If it's …​ Travel Well."`) on SI/Well/Region/Provider cards
  (Hard Constraint 9 — treatment in §2).

---

## 17. Personalization & State Logic

**Four personalization surfaces (FR-P1)** — each must have a designed *with-profile* and
*without-profile* state: (1) Home "Suggested for you"; (2) SI age-cohort banner; (3) Plan
seasonal ranking; (4) Itinerary AI sync. Up to five identity-aligned options where the
"Five-Option Smart Choice" applies (FR-P4).

**Auth/profile states for the shell:** *anonymous* (Sign in / Get Started) vs *profiled*
(My Itinerary / Sign out) — design both top-bar variants (per the two screenshots).

**Required state designs for every relevant surface (consolidate with §13):**
- **Empty** — no results / no itinerary yet / no profile: a warm prompt + one clear CTA,
  never a blank void.
- **Loading** — calm skeletons in card shapes; no spinners-on-spinners.
- **Live vs Preview** — teal "Live" vs stone "Preview" + desaturated media (never mixed).
- **Coming soon** — Ship-Well, Insure-Well, `verify-email` magic link: visible but
  un-actionable, "Activated at Launch" / "coming soon."
- **Graceful degradation** (NFR-3) — flight status, email verify, AI key absent:
  fall back to a calm static/rules state, never an error wall.
- **Conditional** — Nanny-Well / Security-Well appear only in Luxury/Ultra contexts.
- **Error** — friendly, recoverable, keeps the shell + Emergency reachable.

---

## 18. Quick-Start for the Design Phase

When generating screens in the design tool, in order:

0. Read the **functional foundation first** — IA & sitemap (§14), user flows (§15),
   content inventory (§16), and state logic (§17) — so no surface, field, or flow is
   skipped.
1. Establish the **token sheet** from §3.3 and the **type pairing** from §4 — every
   screen inherits these.
2. Build the **global shell** (§9.5 + §14.1): top nav + mega-menu, footer dark band,
   skip-link, Emergency, "Your Trip" tray, locale switcher (with an RTL variant).
3. Build the **component kit** (§9) before composing screens.
4. Compose screens in journey order — the **Dream Journey spine** (§15.1): **Home →
   Discover → SI detail → SI×Region → provider rail → Travel ID wizard → Itinerary** —
   then the supporting, commerce, and investor surfaces from the route map (§14.2).
5. For each screen, design **every state** in §17 (empty/loading/live-vs-preview/
   coming-soon/error/RTL), not just the happy path.
6. Pressure-test each screen against the **six principles** (§1), the **content
   inventory** (§16), and the **honesty treatments** (§13) before calling it done.

**One-line brief to keep on screen:** *Warm editorial luxury — ivory ground, pine-teal
action, champagne-gold accent, Playfair Display serif over Inter sans. Every screen: one
clear next step, honest about what's real, effortless to use.*
