/* ============================================================================
   TravelWell.World — Itinerary builder controller (D1)
   ========================================================================== */
TWW.mountShell({ active: "itinerary" });
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const ICON = TWW.ICON;
  const allWells = {}; [...TWW.WELLS, ...TWW.LUX_WELLS].forEach(w => allWells[w.id] = w);

  const TRAVELERS = [
    { id: "amara", initial: "A", name: "Amara" },
    { id: "jhumur", initial: "J", name: "Jhumur" },
  ];

  const TIME_SLOTS = [
    { id: "dawn", label: "Dawn", range: "5–7 a.m." },
    { id: "morning", label: "Morning", range: "7–11 a.m." },
    { id: "midday", label: "Midday", range: "11 a.m.–2 p.m." },
    { id: "afternoon", label: "Afternoon", range: "2–6 p.m." },
    { id: "evening", label: "Evening", range: "6–9 p.m." },
    { id: "night", label: "Night", range: "9 p.m.–late" },
  ];

  // block: { id, slot, name, well, provider, status, whom:[ids]|'all', place }
  const b = (id, slot, name, well, status, whom, place) => ({ id, slot, name, well, status, whom, place: place !== false });
  const TRIP = {
    name: "Kenya: Anniversary Safari",
    region: "East Africa",
    dates: "Jul 12 – 22, 2026",
    days: [
      { date: "Sat · Jul 12", loc: "Nairobi", blocks: [
        b("d1-1", "afternoon", "Nairobi → Mara airstrip", "fly", "confirmed", "all"),
        b("d1-2", "evening", "Welcome dinner at Angama Mara", "eat", "confirmed", "all"),
        b("d1-3", "night", "Angama Mara — Suite 7", "stay", "confirmed", "all"),
      ]},
      { date: "Sun · Jul 13", loc: "Maasai Mara", blocks: [
        b("d2-1", "dawn", "Hot-air balloon safari", "activities", "pending", "all"),
        b("d2-2", "morning", "Great Migration game drive", "activities", "confirmed", "all"),
        b("d2-3", "afternoon", "Couples spa ritual", "beauty", "idea", ["amara", "jhumur"]),
        b("d2-4", "evening", "Bush dinner under the stars", "eat", "pending", "all"),
      ]},
      { date: "Mon · Jul 14", loc: "Maasai Mara", blocks: [
        b("d3-1", "morning", "Maasai village cultural visit", "activities", "idea", "all"),
        b("d3-2", "afternoon", "Big cat tracking with researcher", "activities", "idea", ["jhumur"]),
      ]},
    ],
  };

  // which wells are covered by current blocks
  function coveredWells() {
    const set = new Set();
    TRIP.days.forEach(d => d.blocks.forEach(bl => set.add(bl.well)));
    return set;
  }
  function statusCounts() {
    const c = { idea: 0, pending: 0, confirmed: 0 };
    TRIP.days.forEach(d => d.blocks.forEach(bl => c[bl.status]++));
    return c;
  }

  let overlay = "all";   // 'all' | traveler id
  let aiReviewed = false;
  let state = "building"; // building | empty | voyage

  const STATUS_LABEL = { idea: "Idea", pending: "Pending", confirmed: "Confirmed" };
  const STATUS_PILL = { idea: "pill-preview", pending: "pill-gold", confirmed: "pill-live" };

  /* ---------- header ---------- */
  function header() {
    const cov = coveredWells();
    const counts = statusCounts();
    return `<div class="it-head"><div class="it-head__inner">
      <div class="it-head__top">
        <div class="it-head__title-wrap">
          <div class="it-head__eyebrow eyebrow">${ICON("suitcase", "ic-sm")} Your itinerary · always saved</div>
          <h1>${TRIP.name}</h1>
          <div class="it-head__meta">
            <span>${ICON("pin", "ic-sm")} ${TRIP.region}</span>
            <span>${ICON("calendar", "ic-sm")} ${TRIP.dates}</span>
            <span>${ICON("heart", "ic-sm")} ${TRAVELERS.length} travelers</span>
          </div>
        </div>
        <div class="it-head__actions">
          <div class="it-head__party" aria-label="Travelers">
            ${TRAVELERS.map(t => `<span class="av" title="${t.name}">${t.initial}</span>`).join("")}
          </div>
          <button class="btn btn-secondary" data-tw-concierge>${ICON("sparkle", "ic-sm")} Speak with Claude</button>
        </div>
      </div>
      <div class="it-summary">
        <div class="it-cov">
          <span class="it-cov__bar">${TWW.WELLS.map(w => `<i class="${cov.has(w.id) ? "on" : ""}"></i>`).join("")}</span>
          <span class="it-cov__label"><b>${cov.size} of 10 Wells</b> covered</span>
        </div>
        <div class="it-statuses">
          <span class="it-stat"><span class="swatch" style="background:var(--safety-1)"></span>${counts.confirmed} confirmed</span>
          <span class="it-stat"><span class="swatch" style="background:var(--accent)"></span>${counts.pending} pending</span>
          <span class="it-stat"><span class="swatch" style="background:var(--muted-foreground)"></span>${counts.idea} ideas</span>
        </div>
        <div class="it-overlay-toggle" id="it-overlay" role="group" aria-label="Show plans for" style="margin-inline-start:auto">
          <button data-whom="all" aria-pressed="${overlay === "all"}">Everyone</button>
          ${TRAVELERS.map(t => `<button data-whom="${t.id}" aria-pressed="${overlay === t.id}"><span class="mini-av">${t.initial}</span>${t.name}</button>`).join("")}
        </div>
      </div>
    </div></div>`;
  }

  /* ---------- day nav ---------- */
  function dayNav() {
    return `<div class="it-daynav" id="it-daynav">
      ${TRIP.days.map((d, i) => `<button class="it-daynav__btn" data-day="${i}" aria-current="${i === 0}">
        <div class="it-daynav__day">Day ${i + 1}</div><div class="it-daynav__date">${d.date.split(" · ")[1]}</div>
      </button>`).join("")}
      <button class="it-daynav__btn" data-add-day><div class="it-daynav__day">&nbsp;</div><div class="it-daynav__date">+ Day</div></button>
    </div>`;
  }

  /* ---------- block ---------- */
  function whomLabel(whom) {
    if (whom === "all") return { avs: TRAVELERS, label: "Everyone" };
    const list = TRAVELERS.filter(t => whom.includes(t.id));
    return { avs: list, label: list.map(t => t.name).join(" & ") };
  }
  function isDimmed(whom) {
    if (overlay === "all") return false;
    if (whom === "all") return false;
    return !whom.includes(overlay);
  }

  function blockCard(bl) {
    const w = allWells[bl.well];
    const whom = whomLabel(bl.whom);
    const dim = isDimmed(bl.whom) ? " dim" : "";
    const nextAction = bl.status === "idea"
      ? `<button class="it-block__btn it-block__btn--primary" data-book="${bl.id}">Book It</button>`
      : bl.status === "pending"
        ? `<button class="it-block__btn it-block__btn--primary" data-confirm="${bl.id}">${ICON("check", "ic-sm")} Confirm</button>`
        : `<span class="it-block__btn" style="color:var(--safety-1);border-color:color-mix(in oklch,var(--safety-1) 40%,var(--border))">${ICON("check", "ic-sm")} Booked</span>`;
    return `<div class="it-block it-block--${bl.status}${dim}" data-block="${bl.id}">
      <div class="it-block__ic">${ICON(w.icon)}</div>
      <div class="it-block__main">
        <div class="it-block__top">
          <div style="flex:1;min-width:0">
            <div class="it-block__name">${bl.name}</div>
            <div class="it-block__sub"><span class="it-block__well">${ICON(w.icon, "ic-sm")} ${w.name}</span>${bl.place ? `<span>·</span><button class="it-block__well" data-takemeto="${bl.name}" style="border:0;background:none;cursor:pointer;color:var(--primary);font:inherit;padding:0">${ICON("pin", "ic-sm")} Take me there</button>` : ""}</div>
          </div>
          <span class="it-block__status pill ${STATUS_PILL[bl.status]}">${STATUS_LABEL[bl.status]}</span>
        </div>
        <div class="it-block__foot">
          <div class="it-block__whom">
            <span class="it-block__whom-avs">${whom.avs.map(t => `<span class="av" title="${t.name}">${t.initial}</span>`).join("")}</span>
            <span class="it-block__whom-label">${whom.label}</span>
            <button class="it-block__icon-btn" data-editwhom="${bl.id}" aria-label="Edit who this is for" style="width:26px;height:26px;margin-inline-start:2px">${ICON("arrow", "ic-sm")}</button>
          </div>
          <div class="it-block__actions">
            ${nextAction}
            <button class="it-block__icon-btn" data-remove="${bl.id}" aria-label="Remove">${ICON("close", "ic-sm")}</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  /* ---------- day ---------- */
  function daySection(day, i) {
    const bySlot = {};
    day.blocks.forEach(bl => { (bySlot[bl.slot] = bySlot[bl.slot] || []).push(bl); });
    return `<section class="it-day" id="day-${i}">
      <div class="it-day__head">
        <span class="it-day__num">Day ${i + 1}</span>
        <span class="it-day__date">${day.date}</span>
        <span class="it-day__loc">${ICON("pin", "ic-sm")} ${day.loc}</span>
      </div>
      ${TIME_SLOTS.map(slot => {
        const blocks = bySlot[slot.id] || [];
        const filled = blocks.length > 0;
        return `<div class="it-slot ${filled ? "it-slot--filled" : ""}">
          <div class="it-slot__rail"></div><div class="it-slot__dot"></div>
          <div class="it-slot__time"><div class="t">${slot.label}</div><div class="r">${slot.range}</div></div>
          <div class="it-slot__blocks">
            ${blocks.map(blockCard).join("")}
            <button class="it-slot__add" data-addblock="${i}:${slot.id}">${ICON("arrow", "ic-sm")} Add to ${slot.label.toLowerCase()}</button>
          </div>
        </div>`;
      }).join("")}
    </section>`;
  }

  /* ---------- sidebar: Well-gap ---------- */
  function gapPanel() {
    const cov = coveredWells();
    const gaps = TWW.WELLS.filter(w => w.status !== "soon" && !cov.has(w.id));
    return `<div class="it-panel">
      <div class="it-panel__head">${ICON("compass")}<h3>Well coverage</h3><span class="pill pill-preview">${cov.size}/10</span></div>
      <div class="it-panel__body">
        <div class="it-gap-grid">
          ${TWW.WELLS.map(w => {
            const on = cov.has(w.id);
            return `<div class="it-gap-cell ${on ? "covered" : "gap"}" title="${w.name}"><span class="it-gap-cell__iconwrap">${ICON(w.icon)}</span><span class="it-gap-cell__lbl">${w.name.replace("-Well","")}</span></div>`;
          }).join("")}
        </div>
        ${gaps.length ? `<div style="font-size:12.5px;color:var(--muted-foreground);margin-bottom:10px">Not yet covered — want to round out the trip?</div>
        <div class="it-gap-list">
          ${gaps.slice(0, 3).map(w => `<div class="it-gap-item">
            <span class="it-gap-item__ic">${ICON(w.icon)}</span>
            <span class="it-gap-item__name">${w.name}</span>
            <a class="it-gap-item__cta" href="well-detail.html?w=${w.id}">Add →</a>
          </div>`).join("")}
        </div>` : `<div style="font-size:13px;color:var(--safety-1);font-weight:600">${ICON("check", "ic-sm")} Every Well covered — beautifully complete.</div>`}
      </div>
    </div>`;
  }

  /* ---------- sidebar: AI review ---------- */
  function aiPanel() {
    return `<div class="it-panel">
      <div class="it-panel__head">${ICON("sparkle")}<h3>AI trip review</h3></div>
      <div class="it-panel__body">
        <button class="btn btn-primary it-ai-btn" data-ai-review>${ICON("sparkle", "ic-sm")} Review my trip</button>
        <div id="it-ai-results"></div>
      </div>
    </div>`;
  }
  function aiResults() {
    return `
      <div class="it-ai-suggestion"><span class="it-ai-suggestion__ic">${ICON("car", "ic-sm")}</span>
        <div><div class="it-ai-suggestion__text"><b>Gap on Day 1.</b> You land in Nairobi but there's no airport transfer before your flight to the Mara. Want me to add one?</div>
        <div class="it-ai-actions"><button class="it-ai-mini it-ai-mini--primary" data-ai-add="transfer">Add transfer</button><button class="it-ai-mini" data-ai-dismiss>Dismiss</button></div></div></div>
      <div class="it-ai-suggestion"><span class="it-ai-suggestion__ic">${ICON("sun", "ic-sm")}</span>
        <div><div class="it-ai-suggestion__text"><b>Day 2 looks full.</b> Four activities back-to-back. Consider moving the spa ritual to Day 3 for a gentler pace.</div>
        <div class="it-ai-actions"><button class="it-ai-mini it-ai-mini--primary" data-ai-dismiss>Good idea</button><button class="it-ai-mini" data-ai-dismiss>Keep as is</button></div></div></div>`;
  }

  /* ---------- sidebar: whispers ---------- */
  function whisperPanel() {
    return `<div class="it-panel">
      <div class="it-panel__head">${ICON("sun")}<h3>Gentle whispers</h3></div>
      <div class="it-panel__body" style="display:flex;flex-direction:column;gap:16px">
        <div class="it-whisper"><span class="it-whisper__ic">${ICON("heart", "ic-sm")}</span>
          <div><div class="it-whisper__kind">Together time</div><div class="it-whisper__text">You &amp; Jhumur share every block but the Day 3 cat-tracking. A free morning together could be lovely.</div></div></div>
        <div class="it-whisper"><span class="it-whisper__ic">${ICON("compass", "ic-sm")}</span>
          <div><div class="it-whisper__kind">Pacing</div><div class="it-whisper__text">Two dawn starts in a row — build in a slow morning so you arrive home rested, not wrung out.</div></div></div>
      </div>
    </div>`;
  }

  /* ---------- compositions ---------- */
  function buildingView() {
    return header() + `<div class="it-layout">
      <div class="it-main">
        ${dayNav()}
        ${TRIP.days.map(daySection).join("")}
      </div>
      <aside class="it-side">${gapPanel()}${aiPanel()}${whisperPanel()}</aside>
    </div><div style="height:80px"></div>`;
  }

  function emptyView() {
    return `<div class="it-empty">
      <div class="it-empty__art">${ICON("suitcase")}</div>
      <span class="eyebrow" style="display:block;margin-bottom:10px">Your itinerary</span>
      <h2>Your trip starts with a single spark.</h2>
      <p>You haven't added anything yet. Pick a way you love to travel and we'll start building — every choice lands here automatically, always saved.</p>
      <div class="it-empty__actions">
        <a class="btn btn-primary" href="special-interests.html" style="height:54px;padding:0 28px;font-size:16px">Design your journey →</a>
        <button class="btn btn-secondary" style="height:54px" data-tw-concierge>${ICON("sparkle", "ic-sm")} Speak with Claude</button>
      </div>
    </div>`;
  }

  function voyageView() {
    return header() + `<div class="it-layout"><div class="it-main">
      <div class="it-voyage">
        <span class="eyebrow">Everything's confirmed</span>
        <h2>Bon voyage, Amara &amp; Jhumur.</h2>
        <p>Your anniversary safari is fully booked and saved. We'll send gentle reminders, your Safety Card travels with you, and the Emergency Button is one tap away the whole time.</p>
        <div style="display:flex;gap:12px;margin-top:22px;flex-wrap:wrap">
          <button class="btn btn-gold">Download trip pack</button>
          <button class="btn" style="background:rgba(255,255,255,.16);color:#fff;border:1px solid rgba(255,255,255,.3)" data-tw-trip>View all bookings</button>
        </div>
      </div>
      ${TRIP.days.map(daySection).join("")}
    </div>
    <aside class="it-side">${gapPanel()}${whisperPanel()}</aside>
    </div><div style="height:80px"></div>`;
  }

  function render() {
    if (state === "empty") $("#it-root").innerHTML = emptyView();
    else if (state === "voyage") {
      // confirm all for voyage demo
      TRIP.days.forEach(d => d.blocks.forEach(bl => bl.status = "confirmed"));
      $("#it-root").innerHTML = voyageView();
    } else $("#it-root").innerHTML = buildingView();
    document.querySelectorAll("#it-switch button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.state === state)));
  }

  function findBlock(id) {
    for (const d of TRIP.days) { const bl = d.blocks.find(x => x.id === id); if (bl) return { day: d, bl }; }
    return {};
  }

  /* ---------- events ---------- */
  document.addEventListener("click", (e) => {
    const sw = e.target.closest("#it-switch button");
    if (sw) { state = sw.dataset.state; if (state === "building") location.reload(); else render(); return; }

    const ov = e.target.closest("#it-overlay button");
    if (ov) { overlay = ov.dataset.whom; render(); return; }

    const day = e.target.closest("[data-day]");
    if (day) { const el = $("#day-" + day.dataset.day); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); document.querySelectorAll("[data-day]").forEach(b => b.setAttribute("aria-current", String(b === day))); return; }

    const book = e.target.closest("[data-book]");
    if (book) { openCheckout(book.dataset.book); return; }

    const conf = e.target.closest("[data-confirm]");
    if (conf) { const { bl } = findBlock(conf.dataset.confirm); if (bl) { bl.status = "confirmed"; render(); TWW.toast("Confirmed · " + bl.name); } return; }

    const rm = e.target.closest("[data-remove]");
    if (rm) { const { day, bl } = findBlock(rm.dataset.remove); if (day) { day.blocks = day.blocks.filter(x => x.id !== bl.id); render(); TWW.toast("Removed from your trip"); } return; }

    const tmt = e.target.closest("[data-takemeto]");
    if (tmt) { TWW.toast("Opening map · " + tmt.dataset.takemeto); return; }

    const ew = e.target.closest("[data-editwhom]");
    if (ew) { cycleWhom(ew.dataset.editwhom); return; }

    if (e.target.closest("[data-ai-review]")) {
      const slot = $("#it-ai-results");
      if (!aiReviewed) { slot.innerHTML = `<div style="text-align:center;padding:16px 0"><span class="tw-typing"><span></span><span></span><span></span></span><div style="font-size:12.5px;color:var(--muted-foreground);margin-top:8px">Reviewing your 9 blocks…</div></div>`;
        setTimeout(() => { slot.innerHTML = aiResults(); aiReviewed = true; }, 1300); }
      return;
    }
    if (e.target.closest("[data-ai-add]")) {
      TRIP.days[0].blocks.push(b("ai-transfer", "afternoon", "Nairobi airport transfer", "move", "pending", "all"));
      aiReviewed = false; render(); TWW.toast("Added · Nairobi airport transfer"); return;
    }
    if (e.target.closest("[data-ai-dismiss]")) { const s = e.target.closest(".it-ai-suggestion"); if (s) s.remove(); return; }

    const addb = e.target.closest("[data-addblock]");
    if (addb) { TWW.toast("Browse Wells to add to this time block"); return; }
    if (e.target.closest("[data-add-day]")) { TWW.toast("Add another day to your trip"); return; }
  });

  function cycleWhom(id) {
    const { bl } = findBlock(id);
    if (!bl) return;
    // cycle: all → amara → jhumur → both → all
    const cur = bl.whom;
    if (cur === "all") bl.whom = ["amara"];
    else if (Array.isArray(cur) && cur.length === 1 && cur[0] === "amara") bl.whom = ["jhumur"];
    else if (Array.isArray(cur) && cur.length === 1 && cur[0] === "jhumur") bl.whom = ["amara", "jhumur"];
    else bl.whom = "all";
    render();
    const lbl = bl.whom === "all" ? "Everyone" : whomLabel(bl.whom).label;
    TWW.toast("For: " + lbl);
  }

  /* ---------- Book It checkout (D2) — modal with API/widget/affiliate tracks ---------- */
  function openCheckout(blockId) {
    const { bl } = findBlock(blockId);
    if (!bl) return;
    if (window.TWWCheckout) window.TWWCheckout.open(bl, () => { bl.status = "pending"; render(); });
    else { bl.status = "pending"; render(); TWW.toast("Added to bookings · " + bl.name); }
  }

  render();
  window.__itRender = render;
  window.__itTRIP = TRIP;
})();
