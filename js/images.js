/* ============================================================================
   TravelWell.World — Curated cinematic image library
   Real stock photography (Unsplash CDN), verified to load in-preview. These are
   PLACEHOLDER selections chosen for tone + topic; swap freely at Claude Code
   handoff. Every id is a confirmed-good photo (see imgtest).
   Usage:  TWW.img('safari')           → full URL at default width (1400)
           TWW.img('safari', 600)      → at a given width
           TWW.imgAttr('safari')       → ' src="…"' to drop into an <image-slot>
   ========================================================================== */
window.TWW = window.TWW || {};
(function () {
  const U = (id, w, q = 75) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

  // key → unsplash photo id (verified loading)
  const IDS = {
    // hero / safari family
    safariGiraffe:  "1516426122078-c23e76319801",
    lion:           "1547970810-dc1eac37d174",
    safariJeep:     "1534177616072-ef7dc120449d",
    elephant:       "1564760055775-d63b17a55c44",
    // water / ocean
    tropicalBeach:  "1507525428034-b723cf961d3e",
    oceanAerial:    "1505228395891-9a51e7e86bf6",
    maldivesResort: "1582719508461-905c673771fd",
    // landscape / regions
    mountainValley: "1469474968028-56623f02e42e",
    desertDunes:    "1509316785289-025f5b846b35",
    northernLights: "1531366936337-7c912a4589a7",
    baliRice:       "1518548419970-58e3b4079ab2",
    // cities / culture
    paris:          "1502602898657-3e91760cbb34",
    venice:         "1514890547357-a9ee288728e0",
    marrakech:      "1597212618440-806262de4f6b",
    dubai:          "1512453979798-5ea266f8880c",
    kyoto:          "1545569341-9eb8b30979d9",
    santorini:      "1533105079780-92b9be482077",
    // experiences
    restaurant:     "1414235077428-338989a2e8c0",
    spaWellness:    "1540555700478-4be289fbecef",
    luxuryPool:     "1571896349842-33c89424de2d",
  };

  // Special-Interest id → image key (covers all 25 in data.js)
  const SI_IMG = {
    ultra:"luxuryPool", tropical:"tropicalBeach", romance:"venice", safari:"safariGiraffe",
    expedition:"mountainValley", globaladv:"desertDunes",
    liveaboard:"oceanAerial", river:"venice", diveglobal:"oceanAerial", ocean:"maldivesResort", wellness:"spaWellness",
    family:"baliRice", hiking:"mountainValley", ski:"northernLights", olympic:"dubai", senior:"santorini",
    culinary:"restaurant", culture:"kyoto", deepdive:"marrakech", entertainment:"dubai", nightlife:"dubai",
    sports:"mountainValley", spectator:"dubai", prosports:"paris", compsports:"oceanAerial",
  };

  TWW.IMG_IDS = IDS;
  TWW.img = (key, w = 1400, q) => IDS[key] ? U(IDS[key], w, q) : "";
  TWW.imgAttr = (key, w = 1400) => IDS[key] ? ` src="${TWW.img(key, w)}"` : "";
  TWW.siImg = (siId, w = 900) => TWW.img(SI_IMG[siId] || "mountainValley", w);

  // Region code → image key (covers all 13 in data.js)
  const REGION_IMG = {
    "01F":"paris", "02F":"santorini", "03F":"northernLights", "04A":"dubai",
    "05A":"safariGiraffe", "06A":"elephant", "07A":"baliRice", "08A":"kyoto",
    "09P":"tropicalBeach", "10S":"mountainValley", "11C":"oceanAerial",
    "12A":"desertDunes", "13A":"northernLights",
  };
  TWW.regionImg = (code, w = 900) => TWW.img(REGION_IMG[code] || "mountainValley", w);
})();
