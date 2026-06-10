# TravelWell.World — Master Design Brief (Design-Ready)
### Consolidated, screen-by-screen input for the design agent

> **What this file is.** A single, consolidated, **design-ready** brief that ties
> together the two requirements volumes and restates them as everything a design
> agent needs to design **every screen and flow** of TravelWell.World — from a
> fresh start.
>
> **Deep sources (read when you need full field-level detail):**
> - `REQUIREMENTS_SPECIFICATION.md` — **Volume I**: the structural OS (taxonomy,
>   data model, APIs, monetization, safety, i18n, the Unbreakable Laws).
> - `REQUIREMENTS_SPECIFICATION_VOL2.md` — **Volume II**: the experience layer
>   (Concierge, onboarding, journey, budgeting, shared itinerary, booking).
>
> This brief is the **entry point and consolidation**; the two volumes are the
> reference appendices. Where this brief and a volume agree, build from this; for
> exhaustive field lists, drop into the volume.

---

## 0. How to use this brief (design authority)

**You (the design agent) own all visual decisions.** This brief deliberately does
**not** prescribe layout, color, typography, spacing, grid, iconography, imagery
treatment, or motion. It tells you, for each screen and flow: its **purpose**,
**how the user arrives**, the **content/elements that must be present**, the
**states** it must handle, the **interactions/behaviors** required, and the
**rules it must never break**.

**Your job:** turn this into a complete, beautiful, accessible, mobile-first,
multilingual (incl. RTL) design system and a designed screen for every surface
and state listed in §6, honoring the content/voice rules (§2) and the hard
constraints (§13).

**Two things are fixed and are NOT yours to restyle away:**
1. The **brand voice/content rules** in §2 (these are content, not aesthetics).
2. The **Unbreakable Laws** in §13 (structural/legal/safety constraints).

Everything else — how it looks and feels — is yours.

---

## 1. The product in one page

**TravelWell.World is a Travel Operating System** — not a booking site, not a
blog. It organizes global travel demand into a fixed taxonomy and routes each
traveler from *interest → place → what-excites-them → needs → partner → trip
plan*, personalized by a lightweight profile, monetized through disclosed
partners, and guided end-to-end by a conversational AI Concierge.

**Who it's for (design for all of them, equally, from day one):**
- Anonymous traveler browsing on a phone.
- Profiled traveler with a saved "Travel ID."
- A 25-year-old thumbing through *and* an 85-year-old with hearing aids in — same
  magic, different modality (read or hear, type or talk, fast or slow).
- Investors/partners viewing demo surfaces.
- Premium/ultra-luxury travelers (extra service tiers and Wells).

**The experience spine (memorize this):**
> Sign Up / Sign In → **Travel ID** → Dream Journey (Special Interest → Region →
> Activities → the Wells → **Book It!**) → the same Book-It motion repeats per
> Well → one shared itinerary, always saved → *bon voyage*. The **Concierge walks
> beside the traveler at every step.**

**The core taxonomy (the nouns you'll design around):**
- **25 Special Interests (SIs)** — ways of traveling (Safari, Culinary, Ocean
  Adventures, Romance & Honeymoons, Ultra-Luxury, etc.). Each is *live* or
  *schema/placeholder* and the two must be distinguishable.
- **10 Wells** (the need/commerce channels): Fly · Stay · Eat · Move · Gear ·
  Beauty · Insure · **Activities** · Ship · Shop. **+2 luxury-only Wells**
  (**Nanny**, **Security**) on the Ultra-Luxury & Luxury SIs → 12 there.
- **13 Regions** (`01F`→`13A`), incl. USA (`12A`) & Canada (`13A`), which expand
  into nested sub-regions.
- **Destinations** (live or stub), each anchored to SIs and inside a region.
- **Providers** (~200+), tiered, monetized, FTC-disclosed.

---

## 2. Brand voice & content rules (mandatory — content, not aesthetics)

These bind the words on every screen and the Concierge's behavior. Design must
leave room for them and never undercut them.

- **V-1 Signature line.** SI / Well / Region / Provider cards carry the signature:
  *"If it's **\<thing\>**… **Travel Well.**"* — italic body, "Travel Well." in the
  ocean accent, **period after "Well" always.** (Design the treatment; keep the
  structure and the period.)
- **V-2 Truth.** Never show fabricated providers, prices, availability, facts, or
  phone numbers. Real, in-system options only. Empty is better than invented.
- **V-3 Honor the value.** No "quick," "cheap," or "budget massage." Mid-Range is
  gracious, not lesser. A $180 massage is never "a quick massage."
- **V-4 High-intent.** Active, confident, forward-moving language. We *take*
  travelers where they *want to go*.
- **V-5 The traveler always chooses and books.** Nothing auto-books. "Book my
  flight" *opens Fly-Well*.
- **V-6 Easy stop, always.** The Concierge stops gracefully on request.
- **V-7 Age matches, never limits.** Age range tailors safety/pace; it never
  judges or restricts. The traveler's wishes always lead.
- **V-8 Real vs placeholder never mislead.** Live content and schema/placeholder
  content must be visibly distinct.
- **V-9 "Claude," never "Copilot"** in any copy/labels referring to the assistant.

---

## 3. Global systems (present across screens — design these once)

These appear on (nearly) every screen and define the frame around all content.

### 3.1 Navigation shell
- **Header nav** exposing primary sections: Home, Special Interests, Destinations,
  Regions, Wells, Providers, Plan, Guides, Itinerary, Travel ID/Profile, Demo,
  About/Architecture. (You decide structure — overflow, grouping, mobile pattern.)
- **Footer** with the brand signature, version stamp, and key proof links
  (Architecture, SIs, Regions, Wells, Providers, Founder's Grand Tour).
- **Locale switcher** (9 languages; AR is RTL — see §11).
- **Skip-to-content** affordance (accessibility).
- **Back navigation** that steps up the SI → Region → Activities → Provider ladder
  without losing context.

### 3.2 The Concierge — "🎙️ Talk to Me" (the headline system)
- **Reachable in one action on every screen**, as a **non-destructive overlay/
  panel** (never throws away the page behind it).
- **Type or talk** (voice in) and **read / hear / both** (voice out) — a persisted
  toggle; a friendly first-use primer.
- **Context-aware**: knows the current SI(s), region/destination, Travel ID, and
  itinerary-so-far.
- Design must support all Concierge moments: greeting / Guided First-Trip (a
  warm, 4–7 step, never-an-interrogation session), **best-for-you recommendation
  sets (~3–5 options, each with a reason it fits)**, navigation hand-offs,
  tentative-idea drop-ins, "take me there"/ride hand-offs, and the easy **Stop**.
- States to design: collapsed entry affordance; first-use primer; active
  conversation (text); listening (voice in); speaking (voice out); recommending
  (option set); acting/navigating; stopped; degraded/offline ("let me get that in
  a moment"); error.

### 3.3 "Your Trip" tray (North Star)
- Always one tap away (may be suppressed on the dedicated itinerary/demo screens).
- Shows the trip-in-progress summary and a "continue building" path.
- States: empty (no trip yet); in-progress (with counts/coverage); just-added
  confirmation.

### 3.4 Emergency
- A globally reachable **Emergency** action on every screen.
- Uses GPS when granted (nearest hospital, right local numbers); **falls back to
  the itinerary location** when location is declined.

### 3.5 Whispers (gentle assistance)
- Soft, **occasional** suggestions — not notifications, not nagging. On a single
  **traveler-controlled dial** (frequency + fully off; default on-but-rare).
- Types: time-block soft suggestions; **Together-Time** (shared free slots on a
  shared trip); **Comfort & Pacing** (weather/route/pace aware). Truth rule
  applies (real places only).
- Design a consistent, dismissible, non-intrusive Whisper treatment + the dial
  control (in onboarding and in settings).

### 3.6 Journey step indicator
- Communicates progress through the Dream Journey (Special Interest → Region →
  Activities → Wells/Book It). Design for 4 or 5 steps (Activities may be its own
  step or the front of "Choose Providers") — the Activities moment must exist.

---

## 4. Information architecture / sitemap (all surfaces)

Routes are locale-prefixed (`/[locale]/…`). You may restructure routes, but keep
canonical deep-link patterns and the SI-anchored hierarchy.

**Entry & account:** Home · Sign Up · Sign In · Verify Email · Travel ID (builder)
· Profile.
**Dream Journey:** Special Interests index → SI detail → SI × Region (Activities +
Wells) · Regions index → Region detail (→ nested sub-regions for USA/Canada) ·
Destinations index → Destination detail (kept *inside* the region path; plus a
write-in for off-catalog places).
**Wells & partners:** Wells index → Well detail · Providers discovery · `/go`
affiliate redirect.
**Plan & content:** Plan Your Trip · Guides index → Guide detail · curated guides
(e.g. Morocco Top-8).
**Trip:** Itinerary builder → specific itinerary (with the shared per-person
overlay).
**Commerce:** First Aid Kit product.
**Premium:** Ultra-Luxury universe · Luxury universe (separate worlds).
**Events/brand:** Race For The Conch · Founder's Grand Tour.
**Investor/partner:** Public Demo · VC Demo (gated) · VC Ultra Demo · About /
Architecture.

(Full per-route detail in Volume I §4 and Volume II §7.)

---

## 5. Core flows (design the end-to-end paths)

Design each flow as a connected sequence with all its states. Diagrams/field
detail live in Volume II.

1. **Anonymous → Dream Journey:** Home → pick SI → pick Region → pick Activities →
   the Wells (pre-filled) → Book It. (~4–5 taps home→booking.)
2. **Guided First-Trip (Concierge):** "I don't know what to do" → warm 4–7 step
   session → a tentative dream trip on the page → "make it real."
3. **Sign Up → activation:** name/email → age range (with the kind "why") → define
   the party (who you book & pay for) → per-member notifications → dream text +
   theme + trip length → per-Well budget blend → **Travel IDs built + dream trip
   started** → 4 activation steps (verify email · location/Emergency · notification
   channels · Well-Whisper dial).
4. **Sign In (returning):** recognized by name (passwordless — device-remembered or
   magic link) → gentle "anything changed?" → Talk-to-Me right there → continue the
   saved trip *or* start a new one (pre-informed).
5. **Per-Well loop:** with SI + Region + Activities chosen, the always-visible
   Wells bar → tap a Well → scoped options → Book It → back to trip → next Well.
6. **Book It (two tracks):** booking-mode split → **in-TWW checkout** (API/GTN,
   hosted-payment) **or** **new-tab affiliate hand-off** via `/go` → return →
   "Back to your trip" → "Did you book it? → Mark as booked."
7. **Shared itinerary:** one trip, every block tagged **for whom** → toggle
   **Everyone / Just me / [each traveler]** → Together-Time & Comfort/Pacing
   Whispers ride the overlay.

---

## 6. Screen-by-screen design specs

For each surface: **Purpose · Entry · Must contain · States · Interactions ·
Personalization · Success.** Design every screen for **all listed states**.

> Global note for ALL screens: the nav shell (§3.1), Talk-to-Me (§3.2), Your-Trip
> tray (§3.3), and Emergency (§3.4) are present (with documented suppressions).
> Every screen must have **empty / loading / error** states, work mobile-first,
> and support RTL + long-translation text.

### A. Entry & onboarding

**A1 — Home**
- *Purpose:* one clear path into the Dream Journey; minimal clutter.
- *Must contain:* brand promise; a single primary entry to start the journey; a
  small curated set of featured SIs and featured destinations; personalized
  "suggested for you" when a Travel ID exists.
- *States:* anonymous; profiled (personalized); returning (welcome-back).
- *Success:* the traveler starts a journey or talks to the Concierge.

**A2 — Sign Up** (flow #3)
- *Must contain (as steps, each explained by its payoff):* name + email; **age
  range** (range, never birthday; with the "safe and exciting" why); **party**
  builder (names + age ranges; who you book & pay for; couple/family = one
  itinerary/one budget; separate-payers = own party, linked later); **per-member
  notifications** (kids none; partner optional own channel; main always); dream
  free-text; **theme** chooser (examples; 1–2; not the SI catalog); trip length;
  **per-Well budget blend** (up to 3 tiers).
- *States:* per-step; "walk me through it" (hands to Guided First-Trip); validation
  errors; the moment Travel IDs are built and the dream trip is started.
- *Success:* a party of Travel IDs + a started dream trip.

**A3 — Activation steps** (post Sign Up)
- *Must contain:* verify-email prompt; **location opt-in** (with itinerary
  fallback, framed for the Emergency Button); **notification channel** pick
  (email/SMS/both); **Well-Whisper dial** (frequency / off).
- *States:* each step granted/declined; skipped; confirmed.

**A4 — Sign In / Welcome Back** (flow #4)
- *Must contain:* by-name welcome; gentle "anything to update?"; Talk-to-Me entry;
  continue-vs-new choice.
- *States:* same device (0-click recognized); new device (magic-link sent / link
  landing); profile-update mini-flows; not-recognized fallback.

**A5 — Verify Email**
- *Must contain:* branded verification landing; status (pending/verified/expired);
  onward CTA into the journey.
- *States:* awaiting click; success; expired/invalid; resend.

**A6 — Travel ID builder & A7 — Profile**
- *Purpose:* create/edit/reset the profile (6-step Identity Builder → Identity
  Card); no account required.
- *Must contain:* age cohort; interests/SIs; per-Well budget; party; trip type;
  free-text dream; dietary/accessibility; contact + consent; an **Identity Card**
  output summarizing the traveler.
- *States:* new; editing; saved; reset/cleared.

### B. The Dream Journey

**B1 — Special Interests index**
- *Must contain:* all 25 SIs as picture-first cards (name + signature line + accent
  + hero); **live vs schema/soon** clearly distinguished; up-to-3 selection with a
  **"1–2 is the sweet spot"** message; optional age-cohort personalization context.
- *States:* anonymous; profiled (pre-lit from theme); selecting (1/2/3); schema-only
  (non-selectable/coming-soon).
- *Success:* an SI chosen → region step.

**B2 — SI detail**
- *Must contain:* SI editorial (promise, intro), the Wells it activates, a provider
  rail, links into relevant regions/destinations, signature line.
- *States:* live SI (full) vs schema SI (placeholder, clearly marked).

**B3 — Regions index**
- *Must contain:* all 13 regions (positioning line, country count, gateway
  airports, accent); quick navigation between regions.
- *States:* default; filtered-by-SI relevance.

**B4 — Region detail (+ nested sub-regions)**
- *Must contain:* member countries, gateway airports, season profile, destinations
  within; for **USA/Canada**, expansion into **labeled sub-regions**, each with its
  own ranked "Top" list; provider routing.
- *States:* standard region; expandable sub-region region; sub-region open.

**B5 — Activities step (the hybrid)**
- *Purpose:* "what excites you?" — generate interest AND pre-filter providers.
- *Must contain:* visual activity cards drawn from the chosen SI(s); multi-select;
  a clear hand-off into the Wells now **pre-filled** with matched providers.
- *States:* none selected; some selected; how picks map to Wells.
- *Success:* activities chosen → Wells pre-filled.

**B6 — SI × Region (the Wells working surface)**
- *Must contain:* the **always-visible Wells bar** (10 Wells; +Nanny/Security on
  Luxury/Ultra-Luxury); scoped, curated provider options per Well (capped/paged —
  e.g. top 12, six at a time); per-Well budget reflected; Book It per provider;
  the **destination write-in** ("Somewhere else?…") + continue-to-Book-It.
- *States:* per-Well loading/empty/results; provider chosen → added to trip;
  write-in path.

**B7 — Destinations index & B8 — Destination detail**
- *Note:* keep destinations **inside the region path** — do not pull travelers off
  the journey into a big separate detour.
- *Must contain (detail):* hero, description, provider stacks grouped by Well,
  **Safety Card**, related guides, related destinations; live vs stub distinction.
- *States:* live destination (full); stub (clearly marked); write-in/off-catalog.

### C. Wells & partners

**C1 — Wells index**
- *Must contain:* all 10 Wells (purpose/tagline + path to providers); **Ship-Well
  in a pre-launch "Activated at Launch" state**; on Luxury/Ultra-Luxury contexts,
  also **Nanny** & **Security**.
- *States:* live Well; pre-launch Well; luxury-only Wells shown/suppressed.

**C2 — Well detail**
- *Must contain:* providers, service categories, commission/use-case context.

**C3 — Providers discovery**
- *Must contain:* the vetted partner catalog; filters by Well / SI / region;
  **FTC disclosure** at every provider; tier/credential framing (Prime Providers
  first); routes via the tracked redirect.
- *States:* unfiltered; filtered; prospective-partner (labeled, not "signed").

**C4 — `/go` affiliate redirect**
- *Must contain:* branded "heading to our trusted partner, your trip is saved"
  interstitial; auto-forward; "keep planning" path.
- *States:* counting-down/forwarding; manual continue.

### D. Itinerary & booking

**D1 — Itinerary builder / specific itinerary**
- *Must contain:* blocks across **6 time blocks** (Dawn · Morning · Midday ·
  Afternoon · Evening · Night), each tied to destination/SI/Well/provider;
  block lifecycle **idea → pending → confirmed**; a **Well-gap** view (which Wells
  the trip hasn't covered) with upsell CTAs; AI sync/review producing suggestions.
- *The shared overlay:* every block tagged **for whom**; a toggle **Everyone /
  Just me / [each traveler]**; Together-Time & Comfort/Pacing Whispers; "take me
  there" on any named place.
- *States:* empty (no trip); building; tentative-heavy; mixed tentative/confirmed;
  multi-traveler overlay; AI-suggestions present; bon-voyage/complete.

**D2 — Book It (states within provider cards & checkout)**
- *Must contain (by booking mode):*
  - **API/in-TWW:** search → quote → pay (hosted/tokenized payment) → confirm →
    confirmed block.
  - **Widget:** embedded partner widget, pre-filled, in-TWW.
  - **Affiliate:** opens partner in a **new tab** via `/go`; on return, a **"Back
    to your trip"** affordance and **"Did you book {Provider}? → Mark as booked."**
- *States:* searching; quoted; paying; confirmed; off-site/handed-off; returned/
  capture; error/unavailable.

### E. Plan & content

**E1 — Plan Your Trip**
- *Must contain:* a **date-aware seasonal banner** (current date + profile-aware);
  registry/featured campaigns; featured destinations & guides; a **10-Well coverage
  checklist**; the SI grid.
- *States:* anonymous; profiled (ranked/personalized); seasonal variants.

**E2 — Guides index & E3 — Guide detail**
- *Must contain (index):* guides grouped by type, each with type indicator,
  headline, lede, read time, last-updated.
- *Must contain (detail):* long-form editorial with in-context provider/destination
  links; curated standalone guides (e.g. Morocco Top-8 ranked list).

### F. Commerce / product

**F1 — First Aid Kit**
- *Must contain:* product hero; the life-saving items; what's inside (categories);
  **QR digital integration to destination safety cards**; target traveler profiles;
  FAQs; order/pre-order path (email pre-order now; checkout future).
- *States:* browse; pre-order; (future) checkout.

### G. Premium worlds

**G1 — Ultra-Luxury & G2 — Luxury (two separate worlds)**
- *Must contain:* service tiers; journey archetypes; concierge engagement path; the
  operational-moat narrative; the **extra Nanny & Security Wells**; per-Well
  UL/Luxury budgets; **narrow-the-dream** Concierge questions ("villa or
  penthouse?"); calendar of marquee events where relevant.
- *Note:* design these as a **tool, not a brochure** — lead with a chooser (by
  event / region / journey) and the live calendar; tuck heavy doctrine/story into
  disclosures.

### H. Investor / partner & system

**H1 — Public Demo · H2 — VC Demo (gated) · H3 — VC Ultra Demo**
- *Must contain:* live platform stats; Well revenue architecture; traffic engines;
  differentiators; OS architecture; tech stack. VC demos add a real worked
  itinerary with **real** commission data, scaling calculator, roadmap. (Gated demo
  needs an access state.) **All economics must be real — never fabricated.**

**H4 — About / Architecture**
- *Must contain:* the OS layers (25 SIs, 13 regions, 10 Wells, engines, schemas)
  and the spec-first philosophy — a credibility surface.

**H5 — Events/brand:** Race For The Conch (event logistics hub) · Founder's Grand
Tour (founder narrative). Surge/seasonal data must be **accurate**.

---

## 7. Content & data on screens (what populates the designs)

Design around these entities (full fields in Volume I §2). Each card/detail must
surface its key content and respect live-vs-placeholder:
- **SI:** name, tagline/signature, emotional promise, hero, accent, Wells it
  activates, featured destinations, live/schema.
- **Region:** name, positioning line, countries, gateway airports, season profile,
  (sub-regions for USA/Canada).
- **Well:** name, purpose/tagline, service categories, providers, (pre-launch for
  Ship).
- **Destination:** name, tagline, region, country, hero, description, provider
  stacks by Well, **Safety Card** (advisory level 1–4, hospital, embassy, risk,
  hazards, connectivity, checklist), live/stub.
- **Provider:** name, type, Well, tier/credentials, pricing tier, description,
  **FTC disclosure**, booking action, prospective-vs-signed.
- **Travel ID:** party (with age ranges), per-Well budgets, interests, trip intent
  + free-text dream, dietary/accessibility, contact/consent → **Identity Card**.
- **Itinerary block:** time block, type, linked entity, status (idea/pending/
  confirmed), **for-whom**, source.

---

## 8. Component inventory (functional — produce a designed component for each)

Global: nav header, footer, locale switcher, skip-link, **Talk-to-Me panel** (+
all its states), **Your-Trip tray**, **Emergency button**, **Whisper** unit +
dial, **Journey step indicator**, **Back/ladder navigation**.

Cards/rails: **SI card**, **Region card** (+ sub-region expander), **Well card/
tile**, **Wells bar** (the always-visible per-Well loop control), **Destination
card**, **Provider card** (with disclosure + tier/credential + Book-It states),
**Guide card**, **Activity card**, **Five-Option recommendation set**.

Forms/inputs: **age-range picker**, **party builder** (member + contact + notify),
**per-Well budget picker** (quick blend + fine-tune), **theme chooser**,
**dream free-text**, **notification/Whisper settings**, **destination write-in**.

Trip/booking: **itinerary block** (+ idea/pending/confirmed + for-whom),
**time-block day layout**, **Everyone/Just-me/per-traveler toggle**, **Well-gap
panel**, **in-TWW checkout**, **embedded widget frame**, **`/go` interstitial**,
**Back-to-trip + "Did you book it?"** capture.

Safety/system: **Safety Card**, **Identity Card**, **seasonal banner**, **Activated-
at-Launch pill**, **live/placeholder badges**, **FTC disclosure** unit, **gated-
access** state (VC demo).

(Design each component's full state set — see §9.)

---

## 9. States & edge cases (design for all of these)

- **Empty:** no trip, no profile, no results in a Well, no providers for a filter.
- **Loading / streaming:** Concierge thinking/streaming; provider search; booking
  quote.
- **Error / unavailable:** failed search, expired magic link, declined location,
  off-site partner failure, Concierge degraded/offline fallback.
- **No profile vs profiled:** every personalized surface needs both.
- **Live vs placeholder/stub:** SIs, destinations, prospective providers, pre-launch
  Ship-Well.
- **Real-data discipline:** never render invented data; show honest empty/“coming
  soon” instead.
- **Multi-traveler:** overlay views; whose-day; shared budget.
- **Long text / i18n:** designs must not break with longer translations.
- **RTL:** full mirror for Arabic.
- **Returning vs first-time.**

---

## 10. Accessibility & inclusivity (hard requirements)

- Read **or** hear everything (the Concierge); persisted read/hear/both toggle.
- Type **or** talk (voice in); voice control always visible.
- Designed for older travelers and varied abilities — generous, legible, forgiving;
  honor "easy on the feet" pacing cues in trip surfaces.
- Keyboard navigable; skip-to-content; alt text on all imagery (alt text is a data
  field — surface it).
- Sufficient contrast and target sizes (you choose the system; meet WCAG AA+).
- Inclusive, non-judgmental framing of age and budget (V-3, V-7).

---

## 11. Internationalization & RTL

- 9 locales: `en, es, fr, de, pt, ja, zh, ar, ko`; **launch tier EN/ES/AR/ZH**;
  English first, others staged.
- **Arabic is full RTL** — design a complete mirrored layout system.
- Locale switcher preserves the current page.
- Concierge: voice in-language; multilingual content.
- All components must tolerate variable text length without breaking.

---

## 12. Responsive / device

- **Mobile-first** — the primary traveler is on a phone (and on the ground,
  sometimes offline). Then tablet and desktop.
- Concierge, Your-Trip tray, Emergency, and the Wells bar must all work well in the
  smallest viewport.
- On-the-ground moments (maps/ride hand-offs, eSIM nudge) assume a phone in hand.

---

## 13. Hard constraints (the Unbreakable Laws — design must honor)

1. The **OS/taxonomy is the product** — design must make the *system* feel
   intelligent, not just present content.
2. **25 SIs**, **10 Wells (12 for Luxury & Ultra-Luxury)**, **13 Regions**,
   **5-Pillar / 25-section** structures — counts and structure are fixed.
3. **Every surface has an SI anchor** — no SI-less screens.
4. **Real vs placeholder never mislead** (V-8); only OS-Architect-approved content
   is "live."
5. **All affiliate links disclosed (FTC)** at point of action.
6. **Accurate surge/seasonal data only** — even in demos.
7. **Brand signature line** present on SI/Well/Region/Provider cards (V-1).
8. **Canonical deep-link patterns** — no one-off routes.
9. **The traveler always chooses and books** (V-5); nothing auto-books.
10. **Truth rule everywhere** (V-2) — including the Concierge, Whispers, and
    maps/ride hand-offs (which carry the "you confirm and pay" disclaimer).
11. **Body-metaphor architecture** — Wells map to body systems; safety rides
    Blood + Breath (the Kit + Safety Cards connect).
12. **"Claude," never "Copilot"** (V-9).

---

## 14. Out of scope / future (don't design these for v1, but leave room)

- Mass-market ocean cruise lines (Carnival/RC/Norwegian/MSC) — out entirely.
- A direct booking/payment engine beyond hosted/tokenized partner payment (no raw
  card capture; full custom checkout is post-launch).
- Linked-group travel (two parties) and full per-traveler auto-syncing itineraries
  — later (MVP = one party, one itinerary + for-whom tag).
- Cross-device accounts (Supabase) — later (MVP = device-remembered Travel ID +
  magic link).
- Italian locale — deprecated.
- Live status (flight/lift/ferry), eSIM nudges, email-parse → itinerary, full
  ride-hailing coverage — staged behind flags.

---

## 15. Source-of-truth map (where to dig for detail)

- **This file** — consolidated, design-ready entry point.
- **`REQUIREMENTS_SPECIFICATION.md` (Volume I)** — structural OS: entities &
  fields, APIs, monetization, safety, i18n, laws, canonical counts.
- **`REQUIREMENTS_SPECIFICATION_VOL2.md` (Volume II)** — experience layer:
  Concierge, onboarding, journey, per-Well budget, shared itinerary, booking,
  Whispers, cost controls, build-state matrix.
- **The live site** — authoritative for any count or content question.
- Deep specs referenced by the volumes: `docs/AI_CONCIERGE_FOR_SANA.md`,
  `docs/FLOWS_FOR_SANA.md`, `docs/BOOKING_IN_TWW.md`, the per-Well budget engine
  (`src/lib/budget-tiers.ts`), the AI Brain (`src/lib/ai-brain/`), and the
  cognition specs under `spec/cognition/`.

---

*Design authority is yours; the rules in §2 and §13 are not. Design every screen
and every state in §6 and §9, for every locale (incl. RTL) and every device
(mobile-first), so a traveler — 25 or 85, reading or listening, in any of our
languages — is guided from "I don't know what to do" all the way to bon voyage.*

*If it's travel… **Travel Well.***
