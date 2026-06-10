/* ============================================================================
   TravelWell.World — Canonical taxonomy data (the fixed nouns, §1 / §13.2)
   25 Special Interests · 10 Wells (+2 luxury) · 13 Regions
   Live vs schema/placeholder is honest per V-8 / Law 4.
   This is design-prototype data: names are taxonomy; only a handful are flagged
   "live" to demonstrate the real-vs-preview language — nothing here asserts a
   real provider, price, or fact (V-2).
   ========================================================================== */
window.TWW = window.TWW || {};

/* --- Special Interests (ways of traveling) — grouped taxonomy ---------
   Full future buildout; only the signature set is "live" today. Group order
   + membership defined in TWW.SI_GROUPS below and rendered on the discovery
   page so travelers can see the whole vision. -------------------------- */
TWW.SIS = [
  /* Premium & Signature */
  { id:"ultra",       name:"Ultra-Luxury",                 sig:"the extraordinary",          status:"live",    accent:"#A8873F", lux:true,  group:"premium" },
  { id:"tropical",    name:"Tropical Beaches",             sig:"barefoot luxury",            status:"live",    accent:"#2E8C8C", lux:false, group:"premium" },
  { id:"romance",     name:"Romance & Honeymoons",         sig:"the two of you",             status:"live",    accent:"#A8527A", lux:false, group:"premium" },
  { id:"safari",      name:"Safari Adventures",            sig:"the wild calling",           status:"live",    accent:"#B07A3C", lux:false, group:"premium" },
  { id:"expedition",  name:"Global Expedition Adventures", sig:"to the edges of the map",    status:"preview", accent:"#5C5C5C", lux:false, group:"premium" },
  { id:"globaladv",   name:"Global Adventures",            sig:"the world, wide open",       status:"preview", accent:"#3C7E55", lux:false, group:"premium" },
  /* Water, Cruise & Wellness */
  { id:"liveaboard",  name:"Dive Liveaboards",             sig:"sleep above the reef",       status:"preview", accent:"#2E6E8C", lux:false, group:"water" },
  { id:"river",       name:"River Cruises",                sig:"the slow current",           status:"preview", accent:"#5B86A8", lux:false, group:"water" },
  { id:"diveglobal",  name:"Dive Globally",                sig:"the world below",            status:"preview", accent:"#1F6E8C", lux:false, group:"water" },
  { id:"ocean",       name:"Ocean Adventures",             sig:"the open water",             status:"live",    accent:"#2C6E68", lux:false, group:"water" },
  { id:"wellness",    name:"Wellness Spas & Retreats",     sig:"coming home to yourself",    status:"preview", accent:"#4F8C7A", lux:false, group:"water" },
  /* Life-stage & Active */
  { id:"family",      name:"Family Travel",                sig:"everyone, together",         status:"preview", accent:"#C98A2E", lux:false, group:"active" },
  { id:"hiking",      name:"Global Hiking Tours",          sig:"the trail ahead",            status:"preview", accent:"#3C7E55", lux:false, group:"active" },
  { id:"ski",         name:"Winter Ski",                   sig:"the first track",            status:"preview", accent:"#5B86A8", lux:false, group:"active" },
  { id:"olympic",     name:"Olympic Travel",               sig:"the world's stage",          status:"preview", accent:"#C2562E", lux:false, group:"active" },
  { id:"senior",      name:"Senior Travel",                sig:"unhurried, well-earned",     status:"preview", accent:"#7A5B3B", lux:false, group:"active" },
  /* Culture & Entertainment */
  { id:"culinary",    name:"Culinary Experiences",         sig:"a table worth the flight",   status:"live",    accent:"#9C5B3B", lux:false, group:"culture" },
  { id:"culture",     name:"Culture & History",            sig:"the soul of a place",        status:"preview", accent:"#7A5BA8", lux:false, group:"culture" },
  { id:"deepdive",    name:"Cultural Deep Dives",          sig:"beneath the surface",        status:"preview", accent:"#6B4F9E", lux:false, group:"culture" },
  { id:"entertainment",name:"Live Entertainment",          sig:"the lights come up",         status:"preview", accent:"#C2562E", lux:false, group:"culture" },
  { id:"nightlife",   name:"Nightlife",                    sig:"the city after dark",        status:"preview", accent:"#3C3C5C", lux:false, group:"culture" },
  /* Sports */
  { id:"sports",      name:"Sports Travel",                sig:"where the action is",        status:"preview", accent:"#3C7E55", lux:false, group:"sports" },
  { id:"spectator",   name:"Spectator Sports Travel",      sig:"from the stands",            status:"preview", accent:"#2C6E68", lux:false, group:"sports" },
  { id:"prosports",   name:"Pro Sports Team Travel",       sig:"follow the pros",            status:"preview", accent:"#B07A3C", lux:false, group:"sports" },
  { id:"compsports",  name:"Competitive Sports Team Travel",sig:"travel to compete",         status:"preview", accent:"#2E6E8C", lux:false, group:"sports" },
];

/* Group order + labels for the Special Interests discovery page */
TWW.SI_GROUPS = [
  { id:"premium", name:"Premium & Signature",       blurb:"Our flagship ways to travel — live now." },
  { id:"water",   name:"Water, Cruise & Wellness",  blurb:"On, under and beside the water." },
  { id:"active",  name:"Life-stage & Active",        blurb:"For every age, pace and energy." },
  { id:"culture", name:"Culture & Entertainment",    blurb:"The soul of a place, and its nightlife." },
  { id:"sports",  name:"Sports",                     blurb:"Play it, watch it, travel for it." },
];

/* --- 10 Wells (+2 luxury-only) — body-metaphor architecture (§13.11) -- */
TWW.WELLS = [
  { id:"fly",        name:"Fly-Well",        tag:"Getting there",          body:"Breath",       status:"live",    icon:"plane" },
  { id:"stay",       name:"Stay-Well",       tag:"Where you rest",         body:"Skin",         status:"live",    icon:"bed" },
  { id:"eat",        name:"Eat-Well",        tag:"What you savor",         body:"Digestion",    status:"live",    icon:"utensils" },
  { id:"move",       name:"Move-Well",       tag:"Getting around",         body:"Muscle",       status:"live",    icon:"car" },
  { id:"gear",       name:"Gear-Well",       tag:"What you carry",         body:"Bones",        status:"live",    icon:"bag" },
  { id:"beauty",     name:"Beauty-Well",     tag:"Looking & feeling well", body:"Senses",       status:"live",    icon:"sparkle" },
  { id:"activities", name:"Activities-Well", tag:"What excites you",       body:"Heart",        status:"live",    icon:"compass" },
  { id:"shop",       name:"Shop-Well",       tag:"Taking it home",         body:"Memory",       status:"live",    icon:"gift" },
  { id:"insure",     name:"Insure-Well",     tag:"Peace of mind",          body:"Immunity",     status:"soon",    icon:"shield" },
  { id:"ship",       name:"Ship-Well",       tag:"Sending it ahead",       body:"Circulation",  status:"soon",    icon:"box" },
];
TWW.LUX_WELLS = [
  { id:"nanny",    name:"Nanny-Well",    tag:"Care for the little ones", body:"Nurture",  status:"live", icon:"heart", lux:true },
  { id:"security", name:"Security-Well", tag:"Discreet protection",      body:"Defense",  status:"live", icon:"lock",  lux:true },
];

/* --- 13 Regions (01F → 13A) ------------------------------------------- */
TWW.REGIONS = [
  { code:"01F", name:"Western Europe",            line:"Old-world capitals, modern ease",     countries:8, gateways:"CDG · LHR · AMS", status:"live" },
  { code:"02F", name:"The Mediterranean",         line:"Sun, sea, and centuries",             countries:9, gateways:"BCN · FCO · ATH", status:"live" },
  { code:"03F", name:"Northern Europe & Nordics", line:"Fjords, design, long light",          countries:7, gateways:"CPH · OSL · HEL", status:"preview" },
  { code:"04A", name:"Middle East & Gulf",        line:"Where ancient meets audacious",       countries:6, gateways:"DXB · DOH · AUH", status:"live" },
  { code:"05A", name:"East Africa",               line:"The cradle of the safari",            countries:5, gateways:"NBO · JRO · KGL", status:"live" },
  { code:"06A", name:"Southern Africa",           line:"Big skies, bigger game",              countries:5, gateways:"CPT · JNB · WDH", status:"preview" },
  { code:"07A", name:"South & Southeast Asia",    line:"Temples, islands, spice",             countries:9, gateways:"BKK · SIN · DPS", status:"live" },
  { code:"08A", name:"East Asia",                 line:"Tradition at the speed of now",       countries:5, gateways:"NRT · ICN · HKG", status:"preview" },
  { code:"09P", name:"Oceania & The Pacific",     line:"The end of the map, the start of awe",countries:6, gateways:"SYD · AKL · NAN", status:"preview" },
  { code:"10S", name:"Latin America",             line:"Color, rhythm, wild horizons",        countries:11,gateways:"MEX · LIM · GIG", status:"preview" },
  { code:"11C", name:"Caribbean & Atlantic",      line:"A thousand shades of blue",           countries:13,gateways:"NAS · PUJ · SJU", status:"live" },
  { code:"12A", name:"United States",             line:"Fifty ways to wander",                countries:1, gateways:"JFK · LAX · ORD", status:"live", sub:true },
  { code:"13A", name:"Canada",                    line:"Vast, wild, and gracious",            countries:1, gateways:"YYZ · YVR · YUL", status:"preview", sub:true },
];

/* --- USA / Canada sub-regions (§B4) ----------------------------------- */
TWW.SUBREGIONS = {
  "12A": ["Pacific Coast","Mountain West","The Southwest","Texas & The Gulf","The Midwest","The South","New England","Mid-Atlantic","Alaska","Hawai‘i"],
  "13A": ["British Columbia","The Rockies","The Prairies","Ontario","Québec","The Maritimes","The North"],
};

/* --- Locales (§11) — launch tier EN/ES/AR/ZH ------------------------- */
TWW.LOCALES = [
  { code:"en", label:"English",  native:"English",  dir:"ltr", tier:"launch" },
  { code:"es", label:"Spanish",  native:"Español",  dir:"ltr", tier:"launch" },
  { code:"ar", label:"Arabic",   native:"العربية",  dir:"rtl", tier:"launch" },
  { code:"zh", label:"Chinese",  native:"中文",      dir:"ltr", tier:"launch" },
  { code:"fr", label:"French",   native:"Français", dir:"ltr", tier:"staged" },
  { code:"de", label:"German",   native:"Deutsch",  dir:"ltr", tier:"staged" },
  { code:"pt", label:"Portuguese",native:"Português",dir:"ltr",tier:"staged" },
  { code:"ja", label:"Japanese", native:"日本語",    dir:"ltr", tier:"staged" },
  { code:"ko", label:"Korean",   native:"한국어",     dir:"ltr", tier:"staged" },
];

/* --- SI → Region affinity (which regions shine for each interest) ----- */
/* Used to rank/filter the Regions index by the traveler's chosen SIs.    */
TWW.REGION_SI = {
  "01F": ["culture","culinary","romance","arts","heritage","wine","rail","city"],
  "02F": ["romance","culinary","ocean","wine","sailing","culture","heritage","surf"],
  "03F": ["photo","adventure","eco","wellness","rail","sacred","ski"],
  "04A": ["ultra","city","culture","heritage","wellness","family","golf"],
  "05A": ["safari","photo","adventure","eco","romance","family","heritage"],
  "06A": ["safari","wine","adventure","eco","photo","ocean"],
  "07A": ["wellness","culinary","diving","surf","sacred","culture","eco","family"],
  "08A": ["culture","culinary","arts","city","sacred","ski","heritage"],
  "09P": ["diving","ocean","adventure","eco","surf","sailing","photo","romance"],
  "10S": ["adventure","culture","festivals","eco","photo","culinary","surf","heritage"],
  "11C": ["ocean","romance","diving","sailing","surf","family","wellness"],
  "12A": ["road","adventure","family","city","golf","ski","festivals","arts"],
  "13A": ["adventure","ski","eco","photo","rail","road","wellness"],
};
