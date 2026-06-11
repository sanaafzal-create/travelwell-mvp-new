/* ============================================================================
   TravelWell.World — Shell controller (§3 systems)
   Injects the global chrome (header, mega-menu, footer, Concierge, Your-Trip
   tray, Emergency, Whisper) into any page that includes <div id="tw-shell">…
   and wires all interactions + state. Mobile-first, RTL-aware, keyboard-safe.
   Requires data.js + tokens.css + shell.css first.
   ========================================================================== */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const store = {
    get: (k, d) => { try { const v = localStorage.getItem("tww:" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem("tww:" + k, JSON.stringify(v)); } catch {} },
  };

  /* ---- Icon set (inline SVG; one source of truth) -------------------- */
  const P = {
    compass:'<circle cx="12" cy="12" r="9"/><path d="m14.5 9.5-2 5-3 1.5 2-5z"/>',
    plane:'<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>',
    bed:'<path d="M3 18v-6h18v6M3 12V7m18 5V9a2 2 0 0 0-2-2H8v5M3 18v2m18-2v2"/>',
    utensils:'<path d="M4 3v7a2 2 0 0 0 4 0V3M6 11v10M18 3c-1.5 0-3 1.5-3 5s1.5 4 3 4m0-9v18"/>',
    car:'<path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-14 0h14m-14 0a2 2 0 0 0-2 2v3h2m12-5a2 2 0 0 1 2 2v3h-2M7 16h10M6.5 16v2m11-2v2"/>',
    bag:'<path d="M6 7V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1m-13 0h14l-1 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"/>',
    sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2 .3.0M5 18l.6 1.6"/>',
    gift:'<path d="M20 12v8H4v-8M2 8h20v4H2zM12 8v12M12 8S10 3 7.5 4 9 8 12 8zM12 8s2-5 4.5-4S15 8 12 8z"/>',
    shield:'<path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/>',
    box:'<path d="M21 8l-9-5-9 5 9 5zM3 8v8l9 5 9-5V8M12 13v8"/>',
    heart:'<path d="M12 20S4 14.5 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 11-8 11z"/>',
    lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    send:'<path d="M4 12l16-7-7 16-2-7z"/>',
    chev:'<path d="m6 9 6 6 6-6"/>',
    close:'<path d="M6 6l12 12M18 6 6 18"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/>',
    sos:'<path d="M12 2l2.5 5 5.5.8-4 3.9 1 5.5L12 20l-5 2.6 1-5.5-4-3.9 5.5-.8z" fill="none"/><path d="M12 9v4M12 16h.01"/>',
    cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
    hospital:'<path d="M4 21V8l8-5 8 5v13M9 21v-5h6v5M12 8v4M10 10h4"/>',
    phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    pin:'<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    sparkles:'<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z"/>',
    bag2:'<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
    read:'<path d="M3 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H3zM21 5h-7a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h7z"/>',
    sound:'<path d="M4 9v6h4l5 4V5L8 9zM16 9a3 3 0 0 1 0 6M18.5 7a6 6 0 0 1 0 10"/>',
    menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
    stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>',
    check:'<path d="M5 12l5 5L20 6"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2m20 0h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',
    message:'<path d="M4 5h16v11H8l-4 4z"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  };
  const ICON = (n, cls = "") => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ""}</svg>`;
  window.TWW = window.TWW || {}; TWW.ICON = ICON; TWW.P = P;

  /* ---- Mega-menu markup --------------------------------------------- */
  function megaMenu() {
    const featuredSI = TWW.SIS.filter(s => s.status === "live").slice(0, 5);
    const wells = TWW.WELLS.slice(0, 8);
    const regions = TWW.REGIONS.slice(0, 8);
    return `
    <div class="tw-mega" id="tw-mega" data-open="false" role="region" aria-label="Worlds of Adventure">
      <div class="tw-mega__inner">
        <div class="tw-mega__col">
          <div class="tw-mega__feature">
            <span class="eyebrow">Start here</span>
            <h3>Design Your Dream Journey</h3>
            <p class="sig">If it's the trip of a lifetime… <span style="color:var(--accent)">Travel Well.</span></p>
          </div>
          <h4>Special Interests · 25</h4>
          <div class="tw-mega__si-grid">
            ${featuredSI.map(s => `<a class="tw-mega__link" href="si-detail.html?si=${s.id}">${ICON("compass")}${s.name}</a>`).join("")}
          </div>
          <a class="tw-mega__viewall" href="special-interests.html">View all 25 interests ${ICON("arrow","ic-sm")}</a>
        </div>
        <div class="tw-mega__col">
          <h4>The Wells · 10</h4>
          ${wells.map(w => `<a class="tw-mega__link" href="wells.html#${w.id}">${ICON(w.icon)}${w.name}${w.status==="soon"?'<span class="tag">Soon</span>':''}</a>`).join("")}
          <a class="tw-mega__viewall" href="wells.html">All Wells & partners ${ICON("arrow","ic-sm")}</a>
        </div>
        <div class="tw-mega__col">
          <h4>Regions · 13</h4>
          ${regions.map(r => `<a class="tw-mega__link" href="region-detail.html?r=${r.code}">${ICON("pin")}${r.name}</a>`).join("")}
          <a class="tw-mega__viewall" href="regions.html">All 13 regions ${ICON("arrow","ic-sm")}</a>
        </div>
        <div class="tw-mega__col">
          <h4>Plan & Discover</h4>
          <a class="tw-mega__link" href="plan.html">${ICON("compass")}Plan Your Trip</a>
          <a class="tw-mega__link" href="destinations.html">${ICON("pin")}Destinations</a>
          <a class="tw-mega__link" href="providers.html">${ICON("bag2")}Providers</a>
          <a class="tw-mega__link" href="guides.html">${ICON("read")}Guides</a>
          <a class="tw-mega__link" href="itinerary.html">${ICON("check")}Your Itinerary</a>
          <h4 style="margin-top:18px">Premium & System</h4>
          <a class="tw-mega__link tw-mega__link--gold" href="luxury.html">${ICON("sparkle")}Luxury &amp; Ultra-Luxury</a>
          <a class="tw-mega__link" href="about.html">${ICON("globe")}About / Architecture</a>
          <a class="tw-mega__link" href="demo.html">${ICON("sparkles")}Investor Demo</a>
        </div>
        <div class="tw-mega__signature">
          <p class="signature">A Travel Operating System — <span class="tw">Travel Well.</span></p>
          <a class="btn btn-primary" href="special-interests.html">Design Your Next Adventure</a>
        </div>
      </div>
    </div>`;
  }

  /* ---- Footer -------------------------------------------------------- */
  function footer() {
    return `
    <footer class="tw-footer">
      <div class="tw-footer__inner">
        <div class="tw-footer__top">
          <div class="tw-footer__brand">
            <a class="tw-logo" href="Home.html">Travel<span class="lwell">Well</span><span class="lworld">.world</span></a>
            <p class="tw-footer__sig">If it's a once-in-a-lifetime journey… <span class="tw">Travel Well.</span></p>
          </div>
          <div class="tw-footer__col">
            <h5>The System</h5>
            <a href="about.html">About / Architecture</a>
            <a href="special-interests.html">25 Special Interests</a>
            <a href="regions.html">13 Regions</a>
            <a href="wells.html">10 Wells</a>
            <a href="providers.html">200+ Providers</a>
          </div>
          <div class="tw-footer__col">
            <h5>Journeys</h5>
            <a href="plan.html">Plan Your Trip</a>
            <a href="guides.html">Travel Guides</a>
            <a href="luxury.html">Luxury Worlds</a>
            <a href="destinations.html">Destinations</a>
            <a href="itinerary.html">Your Itinerary</a>
          </div>
          <div class="tw-footer__col">
            <h5>Partners & Proof</h5>
            <a href="demo.html">Public Demo</a>
            <a href="vc-demo.html">VC Demo</a>
            <a href="first-aid-kit.html">First Aid Kit</a>
            <a href="#" onclick="return false">FTC Disclosures</a>
            <a href="#" onclick="return false">Accessibility</a>
          </div>
        </div>
        <div class="tw-footer__bottom">
          <span>© 2026 TravelWell.World — every link disclosed, every fact real.</span>
          <span class="tw-footer__version">TWW-OS · v2.4.0 · 25 SI · 10 Wells · 13 Regions</span>
        </div>
      </div>
    </footer>`;
  }

  /* ---- Concierge panel ---------------------------------------------- */
  function concierge() {
    return `
    <div class="tw-concierge" id="tw-concierge" data-open="false" role="dialog" aria-modal="false" aria-label="Talk to Me — your Concierge">
      <div class="tw-concierge__head">
        <div class="tw-concierge__avatar">${ICON("sparkles")}</div>
        <div style="flex:1">
          <div class="tw-concierge__title">Speak with Atlas</div>
          <div class="tw-concierge__sub"><span class="dot"></span> Your Concierge · powered by Claude</div>
        </div>
        <button class="tw-iconbtn" data-tw-close="concierge" aria-label="Close Concierge" style="width:36px;height:36px;border:0;background:var(--surface-alt)">${ICON("close","ic-sm")}</button>
      </div>
      <div class="tw-concierge__context" id="tw-concierge-ctx">
        <span>Knows:</span>
        <span class="ctx-chip">Safari & Wildlife</span>
        <span class="ctx-chip">East Africa</span>
        <span class="ctx-chip">Trip · 3 blocks</span>
      </div>
      <div class="tw-concierge__body" id="tw-concierge-body"></div>
      <div class="tw-concierge__foot">
        <div class="tw-io-toggle" role="group" aria-label="How should I respond?">
          <button data-io="read" aria-pressed="true">${ICON("read","ic-sm")} Read</button>
          <button data-io="hear" aria-pressed="false">${ICON("sound","ic-sm")} Hear</button>
          <button data-io="both" aria-pressed="false">Both</button>
        </div>
        <div class="tw-input">
          <input type="text" id="tw-concierge-input" placeholder="Ask me anything, or tell me your dream…" aria-label="Message the Concierge">
          <button class="tw-input__mic" data-tw-listen aria-label="Talk instead of type">${ICON("mic","ic-sm")}</button>
          <button class="tw-input__send" data-tw-send aria-label="Send">${ICON("send","ic-sm")}</button>
        </div>
        <div class="tw-stop-row">${ICON("stop","ic-sm")} Say “stop” anytime — I'll step back gracefully.</div>
      </div>
    </div>`;
  }

  /* ---- Your-Trip tray ------------------------------------------------ */
  function tray() {
    return `
    <div class="tw-tray" id="tw-tray" data-open="false" role="dialog" aria-modal="false" aria-label="Your Trip">
      <div class="tw-tray__head">
        <div>
          <div class="tw-concierge__title" style="font-size:18px">Your Trip</div>
          <div class="tw-concierge__sub" id="tw-tray-sub">Always saved · auto-synced</div>
        </div>
        <button class="tw-iconbtn" data-tw-close="tray" aria-label="Close trip" style="width:36px;height:36px;border:0;background:var(--surface-alt)">${ICON("close","ic-sm")}</button>
      </div>
      <div class="tw-tray__body" id="tw-tray-body"></div>
      <div class="tw-tray__foot" id="tw-tray-foot"></div>
    </div>`;
  }

  /* ---- Emergency overlay -------------------------------------------- */
  function emergency() {
    return `
    <div class="tw-emergency" id="tw-emergency" data-open="false" role="dialog" aria-modal="true" aria-label="Emergency help">
      <div class="tw-emergency__scrim" data-tw-close="emergency"></div>
      <div class="tw-emergency__card">
        <div class="tw-emergency__head">
          <div class="ring">${ICON("sos")}</div>
          <div style="flex:1">
            <h2 style="font-size:22px">Emergency Help</h2>
            <p class="t-body-s" style="color:var(--muted-foreground);margin-top:2px">Nearest help and the right local numbers.</p>
          </div>
          <button class="tw-iconbtn" data-tw-close="emergency" aria-label="Close" style="width:36px;height:36px;border:0;background:var(--surface-alt)">${ICON("close","ic-sm")}</button>
        </div>
        <div class="tw-emergency__loc" id="tw-emergency-loc">
          ${ICON("pin","ic-sm")}
          <div><b>Using your itinerary location:</b> Maasai Mara, Kenya. <a href="#" data-tw-useloc onclick="return false" style="font-weight:600">Use precise GPS instead</a> for nearest hospital.</div>
        </div>
        <div class="tw-emergency__list">
          <div class="tw-emerg-item">
            <div class="tw-emerg-item__ic">${ICON("phone")}</div>
            <div><div class="tw-emerg-item__name">Local emergency line</div><div class="tw-emerg-item__meta">Kenya · police / fire / ambulance</div></div>
            <a class="btn btn-secondary tw-emerg-item__call" href="tel:999">Call 999</a>
          </div>
          <div class="tw-emerg-item">
            <div class="tw-emerg-item__ic">${ICON("hospital")}</div>
            <div><div class="tw-emerg-item__name">Nearest hospital</div><div class="tw-emerg-item__meta">Shown from your saved location</div></div>
            <a class="btn btn-secondary tw-emerg-item__call" href="#" onclick="return false">Directions</a>
          </div>
          <div class="tw-emerg-item">
            <div class="tw-emerg-item__ic">${ICON("shield")}</div>
            <div><div class="tw-emerg-item__name">Your embassy</div><div class="tw-emerg-item__meta">From your Travel ID nationality</div></div>
            <a class="btn btn-secondary tw-emerg-item__call" href="#" onclick="return false">Contact</a>
          </div>
        </div>
        <div style="padding:8px 24px 22px">
          <p class="ftc">${ICON("globe","ic-sm")} Numbers and locations are surfaced from verified safety data — never fabricated. Confirm with local authorities on the ground.</p>
        </div>
      </div>
    </div>`;
  }

  /* ---- Whisper unit -------------------------------------------------- */
  function whisper() {
    return `
    <div class="tw-whisper" id="tw-whisper" data-show="false" role="status" aria-live="polite">
      <div class="tw-whisper__ic">${ICON("sun","ic-sm")}</div>
      <div style="flex:1">
        <div class="tw-whisper__kind" id="tw-whisper-kind">Comfort & Pacing</div>
        <p class="tw-whisper__text" id="tw-whisper-text">Your afternoon in Nairobi looks full — there's an easy free hour near your hotel if you'd like to slow down.</p>
      </div>
      <button class="tw-whisper__close" data-tw-close="whisper" aria-label="Dismiss">${ICON("close","ic-sm")}</button>
    </div>`;
  }

  function toast() { return `<div class="tw-toast" id="tw-toast" role="status" aria-live="polite"></div>`; }

  /* ---- Header -------------------------------------------------------- */
  function header(active) {
    const loc = store.get("locale", "en");
    const L = TWW.LOCALES.find(l => l.code === loc) || TWW.LOCALES[0];
    return `
    <header class="tw-header">
      <div class="tw-header__bar">
        <button class="tw-iconbtn tw-burger" data-tw-burger aria-label="Menu">${ICON("menu")}</button>
        <a class="tw-logo" href="Home.html">Travel<span class="lwell">Well</span><span class="lworld">.world</span></a>
        <nav class="tw-nav" aria-label="Primary">
          <button class="tw-nav__trigger" data-tw-mega aria-expanded="false" aria-controls="tw-mega">Worlds of Adventure ${ICON("chev","ic-sm chev")}</button>
          <a class="tw-nav__link${active==="plan"?" ":""}" href="plan.html">Plan</a>
          <a class="tw-nav__link" href="guides.html">Guides</a>
          <a class="tw-nav__link" href="about.html">About</a>
        </nav>
        <div class="tw-header__spacer"></div>
        <div class="tw-header__actions">
          <div class="tw-locale">
            <button class="tw-locale__btn" data-tw-locale aria-haspopup="true" aria-expanded="false">${ICON("globe","ic-sm")} <span class="loc-lbl">${L.code.toUpperCase()}</span> ${ICON("chev","ic-sm")}</button>
            <div class="tw-locale__menu" id="tw-locale-menu" hidden>
              <div class="tw-locale__group">Launch languages</div>
              ${TWW.LOCALES.filter(l=>l.tier==="launch").map(l=>`<button class="tw-locale__item" data-loc="${l.code}" ${l.code===loc?'aria-current="true"':''}>${l.label}<span class="native">${l.native}</span></button>`).join("")}
              <div class="tw-locale__group">Coming soon</div>
              ${TWW.LOCALES.filter(l=>l.tier==="staged").map(l=>`<button class="tw-locale__item" data-loc="${l.code}" ${l.code===loc?'aria-current="true"':''}>${l.label}<span class="native">${l.native}</span></button>`).join("")}
            </div>
          </div>
          <button class="tw-iconbtn tw-iconbtn--emergency" data-tw-emergency aria-label="Emergency help">${ICON("cross")}</button>
          <button class="tw-iconbtn" data-tw-tray aria-label="Your Trip">${ICON("bag2")}<span class="badge" id="tw-trip-badge" hidden>0</span></button>
          <button class="tw-talk-btn" data-tw-concierge>${ICON("sparkles","ic-sm")} <span class="lbl">Speak with Atlas</span></button>
        </div>
      </div>
    </header>`;
  }

  /* ====================================================================
     Concierge state machine
     ==================================================================== */
  const recoSet = [
    { name:"Angama Mara", why:"Clifftop suites over the Mara triangle — <b>matches your luxury + safari blend</b>." },
    { name:"Mahali Mzuri", why:"Richard Branson's tented camp — <b>great for a romance-leaning safari</b>." },
    { name:"Governors' Camp", why:"Front-row Great Migration access — <b>fits your July dates</b>." },
    { name:"Sala's Camp", why:"Quiet southern Mara — <b>matches “easy on the feet” pacing</b>." },
  ];
  const C = { body: () => $("#tw-concierge-body") };
  function bubble(role, html) { return `<div class="tw-msg tw-msg--${role}">${html}</div>`; }

  const states = {
    primer() {
      C.body().innerHTML = `
        <div class="tw-primer">
          <div class="tw-concierge__avatar">${ICON("sparkles")}</div>
          <h3 style="font-size:20px">Hello — I'm your Concierge.</h3>
          <p class="t-body-s" style="color:var(--muted-foreground);margin-top:8px;max-width:34ch;margin-inline:auto">I can plan from a single sentence, or just keep you company while you browse. You can <b>type or talk</b>, and I can <b>read or speak</b> back — your choice, remembered.</p>
          <div style="display:flex;flex-direction:column;gap:8px;margin-top:18px">
            <button class="btn btn-primary" data-tw-cstate="guided">Walk me through it</button>
            <button class="btn btn-secondary" data-tw-cstate="conversation">I'll just type</button>
          </div>
          <div class="tw-stop-row">${ICON("stop","ic-sm")} You're in control — say “stop” anytime.</div>
        </div>`;
    },
    guided() {
      C.body().innerHTML =
        bubble("bot", "Wonderful. Let's find your dream in a few easy questions — <b>nothing like an interrogation</b>. First: are you dreaming of wildlife, water, culture, or pure rest?") +
        `<div style="display:flex;gap:8px;flex-wrap:wrap;align-self:flex-start">
          <button class="btn btn-secondary" style="height:38px" data-tw-cstate="recommending">Wildlife 🦁</button>
          <button class="btn btn-secondary" style="height:38px" data-tw-cstate="recommending">Water 🌊</button>
          <button class="btn btn-secondary" style="height:38px" data-tw-cstate="recommending">Culture 🏛</button>
        </div>`;
    },
    conversation() {
      C.body().innerHTML =
        bubble("user", "We want a safari for our anniversary in July.") +
        bubble("bot", "A safari anniversary in July — the Great Migration is at its peak then. Shall I pull a few camps that lean romantic, or keep it classic?");
    },
    thinking() {
      C.body().innerHTML =
        bubble("user", "Show me where to stay near the Mara.") +
        bubble("bot", `<span class="tw-typing"><span></span><span></span><span></span></span>`);
      setTimeout(() => { if ($("#tw-concierge")?.dataset.open === "true") states.recommending(); }, 1400);
    },
    recommending() {
      C.body().innerHTML =
        bubble("bot", "Here are <b>4 that fit you</b> — each with why it's a match. Tap one to add it to your trip.") +
        recoSet.map((r, i) => `
          <div class="tw-rec" data-tw-addreco="${r.name}">
            <div class="tw-rec__num">${i + 1}</div>
            <div><div class="tw-rec__name">${r.name}</div><div class="tw-rec__why">${r.why}</div></div>
          </div>`).join("") +
        `<p class="ftc" style="margin-top:4px">${ICON("globe","ic-sm")} These are real, in-system options. You always choose and book — I never book for you.</p>`;
    },
    listening() {
      C.body().innerHTML = `
        <div class="tw-listening">
          <div class="tw-mic-ring">${ICON("mic")}</div>
          <div class="tw-wave">${Array.from({length:9}).map((_,i)=>`<i style="animation-delay:${i*0.08}s"></i>`).join("")}</div>
          <p class="t-body-s" style="color:var(--muted-foreground)">Listening… speak naturally. Tap to stop.</p>
          <button class="btn btn-secondary" data-tw-cstate="thinking">${ICON("stop","ic-sm")} Done</button>
        </div>`;
    },
    speaking() {
      C.body().innerHTML =
        bubble("bot", `<div style="display:flex;align-items:center;gap:8px"><span class="tw-wave" style="height:18px">${Array.from({length:5}).map((_,i)=>`<i style="animation-delay:${i*0.1}s"></i>`).join("")}</span> Speaking aloud…</div>The Great Migration peaks in July, so I'd book your river-crossing days first.`) ;
    },
    acting() {
      C.body().innerHTML =
        bubble("bot", "Taking you to <b>Stay-Well</b> for the Mara, pre-filtered to your picks…") +
        `<div class="tw-rec" style="cursor:default"><div class="tw-rec__num">${ICON("arrow","ic-sm")}</div><div><div class="tw-rec__name">Opening Stay-Well · East Africa</div><div class="tw-rec__why">Your page stays right here behind me.</div></div></div>`;
    },
    stopped() {
      C.body().innerHTML =
        bubble("bot", "Of course — I'll step back. I'm one tap away whenever you want me. Happy exploring. ✨");
    },
    degraded() {
      C.body().innerHTML =
        `<div class="tw-degraded">${ICON("globe","ic-sm")} I'm having trouble reaching the network. Let me get that in a moment — your trip is safe and saved.</div>` +
        bubble("bot", "In the meantime, everything you've planned is still here. Want to keep browsing offline?");
    },
    error() {
      C.body().innerHTML =
        `<div class="tw-degraded" style="background:color-mix(in oklch, var(--destructive) 8%, white);border-color:color-mix(in oklch, var(--destructive) 30%, white);color:var(--destructive)">${ICON("close","ic-sm")} Something went wrong on my end.</div>` +
        bubble("bot", "That one's on me. Try again, or tell me differently — I'll keep trying.") +
        `<button class="btn btn-secondary" data-tw-cstate="conversation" style="align-self:flex-start">Try again</button>`;
    },
  };
  TWW.conciergeState = (s) => { (states[s] || states.primer)(); };

  /* ====================================================================
     Your-Trip tray rendering
     ==================================================================== */
  function defaultTrip() {
    return store.get("trip", [
      { well:"activities", icon:"compass", name:"Great Migration game drives", meta:"Activities-Well · Maasai Mara", status:"confirmed" },
      { well:"stay", icon:"bed", name:"Angama Mara", meta:"Stay-Well · 4 nights", status:"pending" },
      { well:"fly", icon:"plane", name:"Nairobi → Mara airstrip", meta:"Fly-Well", status:"idea" },
    ]);
  }
  function renderTray() {
    const trip = TWW.trip || defaultTrip();
    TWW.trip = trip;
    const body = $("#tw-tray-body"), foot = $("#tw-tray-foot"), badge = $("#tw-trip-badge"), sub = $("#tw-tray-sub");
    if (!body) return;
    if (badge) { badge.hidden = trip.length === 0; badge.textContent = trip.length; }
    if (trip.length === 0) {
      if (sub) sub.textContent = "Nothing yet — let's begin";
      body.innerHTML = `
        <div class="tw-tray__empty">
          <div class="tw-empty-ic">${ICON("bag2")}</div>
          <h3 style="font-size:18px">Your trip starts here</h3>
          <p class="t-body-s" style="color:var(--muted-foreground);margin-top:8px">Pick a Special Interest and I'll start filling your Wells. Everything you add is saved automatically.</p>
        </div>`;
      foot.innerHTML = `<a class="btn btn-primary" href="special-interests.html" style="width:100%">Start your journey</a>`;
      return;
    }
    const covered = new Set(trip.map(b => b.well)).size;
    if (sub) sub.textContent = `${trip.length} added · ${covered}/10 Wells covered`;
    body.innerHTML = `
      <div class="tw-trip-coverage" aria-label="${covered} of 10 Wells covered">
        ${TWW.WELLS.map(w => `<i class="${trip.some(b=>b.well===w.id)?"on":""}"></i>`).join("")}
      </div>
      ${trip.map(b => `
        <div class="tw-trip-block">
          <div class="tw-trip-block__ic">${ICON(b.icon)}</div>
          <div style="flex:1">
            <div class="tw-trip-block__name">${b.name}</div>
            <div class="tw-trip-block__meta">${b.meta} · <span class="pill ${b.status==="confirmed"?"pill-live":b.status==="pending"?"pill-gold":"pill-preview"}" style="padding:2px 8px;font-size:11px">${b.status[0].toUpperCase()+b.status.slice(1)}</span></div>
          </div>
        </div>`).join("")}`;
    foot.innerHTML = `
      <a class="btn btn-primary" href="itinerary.html" style="width:100%;margin-bottom:8px">Open full itinerary</a>
      <a class="btn btn-ghost" href="special-interests.html" style="display:block;text-align:center">Keep building →</a>`;
  }
  TWW.renderTray = renderTray;
  TWW.addToTrip = (block) => {
    TWW.trip = (TWW.trip || defaultTrip()).concat([block]);
    store.set("trip", TWW.trip);
    renderTray();
    showToast(`Added to your trip · ${block.name}`);
  };

  function showToast(msg) {
    const t = $("#tw-toast");
    if (!t) return;
    t.innerHTML = `${ICON("check","ic-sm")} ${msg}`;
    t.dataset.show = "true";
    clearTimeout(t._t); t._t = setTimeout(() => t.dataset.show = "false", 2600);
  }
  TWW.toast = showToast;

  /* ====================================================================
     Whisper
     ==================================================================== */
  const whispers = {
    pacing: { kind:"Comfort & Pacing", text:"Your afternoon looks full — there's an easy free hour near your hotel if you'd like to slow down." },
    together: { kind:"Together-Time", text:"You and Maya both have Thursday evening open — a sunset dinner could be lovely." },
    timeblock: { kind:"A gentle idea", text:"Your Morning block in Marrakech is open. The souks are calmest right after breakfast." },
  };
  TWW.showWhisper = (key = "pacing") => {
    if (store.get("whisperDial", "rare") === "off") return;
    const w = whispers[key] || whispers.pacing;
    $("#tw-whisper-kind").textContent = w.kind;
    $("#tw-whisper-text").textContent = w.text;
    const el = $("#tw-whisper"); el.dataset.show = "true";
    clearTimeout(el._t); el._t = setTimeout(() => el.dataset.show = "false", 9000);
  };

  /* ====================================================================
     Open / close machinery (one panel at a time; ESC + backdrop close)
     ==================================================================== */
  function setBackdrop(on) { const b = $("#tw-backdrop"); if (b) b.dataset.open = on ? "true" : "false"; }
  function closeAll() {
    ["tw-concierge","tw-tray","tw-emergency","tw-mega"].forEach(id => { const e = $("#" + id); if (e) e.dataset.open = "false"; });
    document.querySelectorAll('[data-tw-mega]').forEach(b => b.setAttribute("aria-expanded","false"));
    setBackdrop(false);
  }
  TWW.closeAll = closeAll;
  function open(id, { backdrop = false, init } = {}) {
    closeAll();
    const e = $("#" + id); if (!e) return;
    e.dataset.open = "true";
    if (backdrop) setBackdrop(true);
    if (init) init();
    const focusable = e.querySelector("input, button, a");
    if (focusable) setTimeout(() => focusable.focus(), 60);
  }

  /* ====================================================================
     Wire everything
     ==================================================================== */
  function wire() {
    // mega
    document.querySelectorAll("[data-tw-mega]").forEach(btn => btn.addEventListener("click", () => {
      const mega = $("#tw-mega"); const isOpen = mega.dataset.open === "true";
      if (isOpen) { closeAll(); } else { open("tw-mega", { backdrop: true }); btn.setAttribute("aria-expanded","true"); }
    }));
    // panels
    document.querySelectorAll("[data-tw-concierge]").forEach(b => b.addEventListener("click", () =>
      open("tw-concierge", { init: () => { if (!C.body().children.length) states.primer(); } })));
    document.querySelectorAll("[data-tw-tray]").forEach(b => b.addEventListener("click", () =>
      open("tw-tray", { init: renderTray })));
    document.querySelectorAll("[data-tw-emergency]").forEach(b => b.addEventListener("click", () =>
      open("tw-emergency", { backdrop: false })));
    // close buttons
    document.addEventListener("click", (e) => {
      const c = e.target.closest("[data-tw-close]");
      if (c) { const w = c.dataset.twClose; if (w === "whisper") { $("#tw-whisper").dataset.show = "false"; } else { closeAll(); } }
      const reco = e.target.closest("[data-tw-addreco]");
      if (reco) { TWW.addToTrip({ well:"stay", icon:"bed", name: reco.dataset.twAddreco, meta:"Stay-Well · added by Concierge", status:"idea" }); }
      const cs = e.target.closest("[data-tw-cstate]");
      if (cs) { TWW.conciergeState(cs.dataset.twCstate); }
    });
    // backdrop
    $("#tw-backdrop")?.addEventListener("click", closeAll);
    // ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeAll(); $("#tw-locale-menu")?.setAttribute("hidden",""); }
    });
    // concierge input
    const send = () => { const i = $("#tw-concierge-input"); if (i && i.value.trim()) { i.value=""; } states.thinking(); };
    document.querySelector("[data-tw-send]")?.addEventListener("click", send);
    $("#tw-concierge-input")?.addEventListener("keydown", e => { if (e.key === "Enter") send(); });
    document.querySelector("[data-tw-listen]")?.addEventListener("click", () => states.listening());
    // io toggle
    document.querySelectorAll(".tw-io-toggle button").forEach(b => b.addEventListener("click", () => {
      document.querySelectorAll(".tw-io-toggle button").forEach(x => x.setAttribute("aria-pressed","false"));
      b.setAttribute("aria-pressed","true"); store.set("io", b.dataset.io);
    }));
    const io = store.get("io","read");
    document.querySelectorAll(".tw-io-toggle button").forEach(b => b.setAttribute("aria-pressed", b.dataset.io===io?"true":"false"));
    // locale
    const locBtn = document.querySelector("[data-tw-locale]");
    locBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      const m = $("#tw-locale-menu"); const willOpen = m.hasAttribute("hidden");
      if (willOpen) { m.removeAttribute("hidden"); locBtn.setAttribute("aria-expanded","true"); }
      else { m.setAttribute("hidden",""); locBtn.setAttribute("aria-expanded","false"); }
    });
    document.addEventListener("click", () => { $("#tw-locale-menu")?.setAttribute("hidden",""); locBtn?.setAttribute("aria-expanded","false"); });
    $("#tw-locale-menu")?.addEventListener("click", e => e.stopPropagation());
    document.querySelectorAll("[data-loc]").forEach(b => b.addEventListener("click", () => TWW.setLocale(b.dataset.loc)));
    // burger -> mega
    document.querySelector("[data-tw-burger]")?.addEventListener("click", () => open("tw-mega", { backdrop:true }));
    renderTray();
  }

  /* ---- Locale / RTL -------------------------------------------------- */
  TWW.setLocale = (code) => {
    const L = TWW.LOCALES.find(l => l.code === code) || TWW.LOCALES[0];
    store.set("locale", code);
    document.documentElement.lang = code;
    document.documentElement.dir = L.dir;
    // re-render header to reflect new locale label + current marker
    const host = $("#tw-shell-header"); if (host) { host.innerHTML = header(TWW.active); wire(); }
    showToast(`Language · ${L.native}${L.dir === "rtl" ? " · RTL" : ""}`);
  };

  /* ---- Mount --------------------------------------------------------- */
  TWW.mountShell = (opts = {}) => {
    TWW.active = opts.active || "";
    // favicon — wordmark "W" mark (teal ground, ivory serif W, gold dot); injected on every page
    try {
      const fav = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="%232C6E68"/><text x="32" y="45" text-anchor="middle" font-family="Georgia,serif" font-weight="600" font-size="38" fill="%23F7F4EC">W</text><circle cx="49" cy="46" r="4" fill="%23C2A35B"/></svg>';
      let link = document.querySelector('link[rel="icon"]');
      if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
      link.type = "image/svg+xml";
      link.href = "data:image/svg+xml," + fav;
    } catch (e) {}
    const headHost = document.createElement("div"); headHost.id = "tw-shell-header";
    headHost.innerHTML = header(TWW.active);
    document.body.prepend(headHost);
    const tail = document.createElement("div");
    tail.innerHTML = `<div class="tw-backdrop" id="tw-backdrop" data-open="false"></div>` +
      megaMenu() + concierge() + tray() + emergency() + whisper() + toast() +
      (opts.footer === false ? "" : footer());
    document.body.appendChild(tail);
    // restore locale/dir
    const loc = store.get("locale","en"); const L = TWW.LOCALES.find(l=>l.code===loc)||TWW.LOCALES[0];
    document.documentElement.lang = loc; document.documentElement.dir = L.dir;
    wire();
  };
})();
