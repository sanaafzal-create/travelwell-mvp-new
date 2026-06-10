/* ============================================================================
   TravelWell.World — Book It checkout (D2). window.TWWCheckout.open(provider, onPending)
   Three tracks by provider.mode: api (search→quote→pay→confirm), widget, affiliate.
   Determines mode from TWW.PROVIDERS when available, else defaults to 'api'.
   ========================================================================== */
(function () {
  const ICON = TWW.ICON;
  const PRICE = { value: 480, comfort: 1240, premium: 3200, ultra: 7800 };

  // mount DOM once
  const scrim = document.createElement("div"); scrim.className = "co-scrim"; scrim.id = "co-scrim";
  const panel = document.createElement("aside"); panel.className = "co"; panel.id = "co-panel";
  panel.setAttribute("role", "dialog"); panel.setAttribute("aria-modal", "true"); panel.setAttribute("aria-label", "Book It");
  document.body.appendChild(scrim); document.body.appendChild(panel);

  let current = null, onPending = null;

  function lookupMode(name) {
    for (const list of Object.values(TWW.PROVIDERS || {})) {
      const p = (list || []).find(x => x.name === name);
      if (p) return p;
    }
    return null;
  }

  function close() {
    panel.dataset.open = "false"; scrim.dataset.open = "false";
    document.removeEventListener("keydown", onKey);
  }
  function onKey(e) { if (e.key === "Escape") close(); }

  function open(block, cb) {
    onPending = cb;
    const prov = lookupMode(block.name);
    const mode = prov ? prov.mode : (block.well === "stay" || block.well === "fly" ? "api" : "affiliate");
    const price = PRICE[prov ? prov.price : "comfort"] || 1240;
    current = { block, prov, mode, price, name: block.name, well: block.well };
    scrim.dataset.open = "true"; panel.dataset.open = "true";
    document.addEventListener("keydown", onKey);
    if (mode === "api") renderApi("search");
    else if (mode === "widget") renderWidget();
    else renderAffiliate("handoff");
  }

  function shell(stepIdx, steps, bodyHtml, footHtml) {
    const w = TWW.WELLS.concat(TWW.LUX_WELLS).find(x => x.id === current.well) || { icon: "compass", name: "" };
    const stepper = steps ? `<div class="co__steps">${steps.map((s, i) => `<div class="co__step" data-state="${i < stepIdx ? "done" : i === stepIdx ? "current" : "todo"}"><span class="bar"></span><span class="lbl">${s}</span></div>`).join("")}</div>` : "";
    panel.innerHTML = `
      <div class="co__head">
        <span class="ic-chip">${ICON(w.icon)}</span>
        <div><h2>Book It</h2><div class="sub">${current.name}</div></div>
        <button class="co__close" data-co-close aria-label="Close">${ICON("close", "ic-sm")}</button>
      </div>
      ${stepper}
      <div class="co__body">${bodyHtml}</div>
      ${footHtml ? `<div class="co__foot">${footHtml}</div>` : ""}`;
  }

  function provSummary() {
    const tier = current.prov ? current.prov.tier : "vetted";
    const w = TWW.WELLS.concat(TWW.LUX_WELLS).find(x => x.id === current.well) || { name: "" };
    return `<div class="co-prov">
      <div style="flex:1">
        <div class="co-prov__name">${current.name}</div>
        <div class="co-prov__meta">${w.name} · ${current.prov ? current.prov.desc : "Vetted provider"}</div>
      </div>
      ${tier === "prime" ? `<span class="co-prov__tier">★ Prime</span>` : ""}
    </div>`;
  }

  /* ---- API track: search → quote → pay → confirm ---- */
  const API_STEPS = ["Search", "Quote", "Pay", "Confirm"];
  function renderApi(stage) {
    if (stage === "search") {
      shell(0, API_STEPS, provSummary() + `
        <div class="co-label">Booking details</div>
        <div class="co-field"><label>Dates</label><input type="text" value="Jul 12 – 16, 2026" id="co-dates"></div>
        <div class="co-field-row">
          <div class="co-field"><label>Travelers</label><select><option>2 adults</option><option>1 adult</option><option>2 adults, 1 child</option></select></div>
          <div class="co-field"><label>Room / class</label><select><option>Tented suite</option><option>Deluxe</option></select></div>
        </div>
        <p class="co-mode-note">${ICON("check", "ic-sm")} Booked securely inside TravelWell</p>`,
        `<button class="btn btn-primary" data-co="search-go">Search availability</button>`);
    }
    else if (stage === "searching") {
      shell(0, API_STEPS, `<div class="co-searching"><div class="co-spinner"></div><div style="font-weight:600">Checking live availability…</div><div style="font-size:13px;color:var(--muted-foreground);margin-top:6px">Querying ${current.name}</div></div>`);
      setTimeout(() => renderApi("quote"), 1500);
    }
    else if (stage === "quote") {
      const nights = 4, nightly = current.price;
      const sub = nights * nightly, taxes = Math.round(sub * 0.08), total = sub + taxes;
      shell(1, API_STEPS, provSummary() + `
        <div class="co-label">Your quote</div>
        <div class="co-quote">
          <div class="co-quote__row"><span class="k">${nights} nights × $${nightly.toLocaleString()}</span><span class="v">$${sub.toLocaleString()}</span></div>
          <div class="co-quote__row"><span class="k">Taxes & fees</span><span class="v">$${taxes.toLocaleString()}</span></div>
          <div class="co-quote__row total"><span class="k">Total</span><span class="v">$${total.toLocaleString()}</span></div>
        </div>
        <p class="co-quote__note">${ICON("info", "ic-sm")} <span>Held for 20 minutes. Free cancellation until 30 days before arrival.</span></p>`,
        `<button class="btn btn-primary" data-co="to-pay">Continue to payment</button>`);
    }
    else if (stage === "pay") {
      shell(2, API_STEPS, provSummary() + `
        <div class="co-label">Payment</div>
        <div class="co-field"><label>Card number</label><div class="co-pay-field">${ICON("gift", "ic-sm")} •••• •••• •••• 4242</div></div>
        <div class="co-field-row">
          <div class="co-field"><label>Expiry</label><div class="co-pay-field">08 / 28</div></div>
          <div class="co-field"><label>CVC</label><div class="co-pay-field">•••</div></div>
        </div>
        <div class="co-pay-secure">${ICON("shield", "ic-sm")} Payment tokenized &amp; encrypted · TravelWell never stores your card</div>`,
        `<button class="btn btn-primary" data-co="pay-go">Pay &amp; confirm</button>`);
    }
    else if (stage === "paying") {
      shell(2, API_STEPS, `<div class="co-searching"><div class="co-spinner"></div><div style="font-weight:600">Confirming your booking…</div></div>`);
      setTimeout(() => renderApi("confirmed"), 1600);
    }
    else if (stage === "confirmed") {
      if (onPending) onPending();
      shell(3, API_STEPS, `<div class="co-confirmed">
        <svg class="co-confirmed__ring" viewBox="0 0 84 84"><circle cx="42" cy="42" r="42"/><path d="M24 44l12 12 24-26"/></svg>
        <h3>Booked &amp; confirmed</h3>
        <p>${current.name} is locked in and added to your itinerary as <b>confirmed</b>.</p>
        <div class="co-confirm-code">CONF · TWW-${Math.random().toString(36).slice(2, 8).toUpperCase()}</div>
      </div>`,
        `<button class="btn btn-primary" data-co-close>Back to my trip</button>`);
      markConfirmed();
    }
  }

  /* ---- Widget track ---- */
  function renderWidget() {
    shell(null, null, provSummary() + `
      <div class="co-label">Partner booking · embedded</div>
      <div class="co-widget">
        <div class="co-widget__bar"><span class="co-widget__dot"></span> Secure partner widget · loaded inside TravelWell</div>
        <div class="co-widget__body">
          <div class="co-widget__prefill">
            <div class="row"><span class="k">Provider</span><span>${current.name}</span></div>
            <div class="row"><span class="k">Dates</span><span>Jul 12 – 16, 2026</span></div>
            <div class="row"><span class="k">Travelers</span><span>2 adults</span></div>
            <div class="row"><span class="k">From your Travel ID</span><span>Pre-filled ✓</span></div>
          </div>
          <p class="co-mode-note" style="margin-top:16px">${ICON("info", "ic-sm")} The partner's own booking form runs here, pre-filled from your trip — you never leave TravelWell.</p>
        </div>
      </div>`,
      `<button class="btn btn-primary" data-co="widget-go">Complete booking</button>`);
  }

  /* ---- Affiliate track ---- */
  function renderAffiliate(stage) {
    if (stage === "handoff") {
      shell(null, null, `<div class="co-affil">
        <div class="co-affil__ic">${ICON("building")}</div>
        <h3 style="font-size:22px">Book with ${current.name}</h3>
        <p style="color:var(--muted-foreground);margin-top:8px">This provider books on their own site. We'll open it in a new tab and keep your trip saved here.</p>
        <p class="co-affil__ftc">${ICON("info", "ic-sm")} <span>${current.prov ? current.prov.commission : "Affiliate partner"}. We may earn a commission if you book through this link — at no extra cost to you.</span></p>
      </div>`,
        `<button class="btn btn-primary" data-co="affil-go">Open ${current.name} ↗</button>`);
    }
    else if (stage === "returned") {
      if (onPending) onPending();
      shell(null, null, `<div class="co-affil">
        <div class="co-affil__ic">${ICON("suitcase")}</div>
        <h3 style="font-size:22px">Welcome back!</h3>
        <p style="color:var(--muted-foreground);margin-top:8px">Your trip is right where you left it.</p>
        <div class="co-returned">
          <div class="co-returned__q">Did you book ${current.name}?</div>
          <div class="co-returned__actions">
            <button class="btn btn-primary" data-co="mark-booked">Yes — mark as booked</button>
            <button class="btn btn-secondary" data-co="not-yet">Not yet</button>
          </div>
        </div>
      </div>`, null);
    }
  }

  function markConfirmed() {
    if (current && current.block) current.block.status = "confirmed";
    if (window.__itRender) window.__itRender();
  }

  /* ---- events ---- */
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-co-close]") || e.target === scrim) { close(); return; }
    const a = e.target.closest("[data-co]");
    if (!a) return;
    switch (a.dataset.co) {
      case "search-go": renderApi("searching"); break;
      case "to-pay": renderApi("pay"); break;
      case "pay-go": renderApi("paying"); break;
      case "widget-go":
        if (onPending) onPending(); markConfirmed();
        shell(null, null, `<div class="co-confirmed"><svg class="co-confirmed__ring" viewBox="0 0 84 84"><circle cx="42" cy="42" r="42"/><path d="M24 44l12 12 24-26"/></svg><h3>Booked via partner</h3><p>${current.name} is confirmed and added to your itinerary.</p></div>`, `<button class="btn btn-primary" data-co-close>Back to my trip</button>`);
        break;
      case "affil-go":
        try { window.open("", "_blank"); } catch (e) {}
        TWW.toast("Opened " + current.name + " in a new tab");
        setTimeout(() => renderAffiliate("returned"), 600);
        break;
      case "mark-booked":
        markConfirmed(); TWW.toast(current.name + " marked as booked"); close(); break;
      case "not-yet":
        if (current.block) current.block.status = "pending";
        if (window.__itRender) window.__itRender();
        close(); break;
    }
  });

  window.TWWCheckout = { open, close };
})();
