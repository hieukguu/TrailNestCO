// Fills the scannable summary fields on existing articles.
//
// Written to describe the products and the buying decision, never TrailNestCo's
// process — that keeps each article internally consistent whether or not it
// claims hands-on testing elsewhere, and adds no new process claims.
import { readFile, writeFile } from "node:fs/promises";

/** @type {Record<string, {keyTakeaways?:string[], quickVerdict?:string, whoFor?:string[], whoShouldSkip?:string[], verdict?:string}>} */
const DATA = {
  "best-camping-tents-review": {
    keyTakeaways: [
      "The REI Co-op Half Dome SL 2+ is the best all-round choice: two doors, two vestibules and enough headroom to sit up, at a weight that still works for short approaches.",
      "For anything you carry far, the MSR Hubba Hubba NX saves meaningful weight — and you pay for every ounce of that saving.",
      "The Coleman Sundome 4-Person is the budget option that makes sense for car camping only. Weight and pack size rule it out for backpacking.",
      "Weight, liveable space and price form a triangle. Any tent optimises two of the three; decide which one you are willing to give up before you shop.",
      "A tent's floor rating counts people lying shoulder to shoulder with no gear. If you want your pack inside, size up one person.",
    ],
    quickVerdict:
      "Most people camping from a car or walking a short distance to a pitch should buy the REI Co-op Half Dome SL 2+. It is the only tent here that does not force a hard trade-off. Choose the MSR Hubba Hubba NX instead if you carry the tent for hours, and the Coleman Sundome if the budget is firm and the tent never leaves arm's reach of the boot.",
    whoFor: [
      "Car campers and weekend backpackers choosing a first serious 3-season tent",
      "Anyone replacing a cheap dome tent that leaks or sags in wind",
      "Couples who want to sit up, change clothes and store packs under cover",
    ],
    whoShouldSkip: [
      "Winter and alpine campers — none of these are 4-season tents",
      "Solo ultralight hikers counting grams, who are better served by a trekking-pole shelter",
      "Families of five or more, who need a larger cabin-style tent than anything compared here",
    ],
    verdict:
      "Buy the Half Dome SL 2+ unless you have a specific reason not to. The two-door layout is the feature you notice every single night, and it is the one thing budget tents almost never include. The Hubba Hubba earns its price only if you genuinely walk in; the Sundome earns its place only if you genuinely do not.",
  },

  "best-headlamps-camping": {
    keyTakeaways: [
      "The Black Diamond Spot 400 is the safest default: bright enough for trail use, simple to operate, and it runs on batteries you can buy anywhere.",
      "The Petzl Actik Core is the pick if you would rather recharge than buy AAAs — and it still accepts AAAs when the cell runs flat.",
      "The Fenix HL32R-T covers the budget end without the usual compromise on beam quality.",
      "Peak lumens is the number brands advertise and the number that matters least. Runtime at a usable brightness is what you actually live with.",
      "A red mode is worth more than extra lumens if you share a tent — it preserves night vision and does not wake anyone.",
      "Cold weather cuts battery performance sharply, which is the strongest argument for a headlamp that takes both a cell and disposables.",
    ],
    quickVerdict:
      "Buy the Black Diamond Spot 400 if you want one headlamp that handles campsite chores and the occasional night hike without fuss. Choose the Petzl Actik Core if you camp often enough that disposable batteries become an annoyance, and the Fenix HL32R-T if you want most of that capability for less.",
    whoFor: [
      "Campers who need light for cooking, tent admin and the walk to the toilet block",
      "Hikers who occasionally finish a route after dark and want a dependable beam",
      "Anyone tired of cheap headlamps whose brightness collapses after twenty minutes",
    ],
    whoShouldSkip: [
      "Runners wanting a wide, low-profile beam built for pace — a running-specific lamp suits better",
      "Cavers and night-technical users, who need far more output and a proper battery system",
      "Anyone who only needs light inside a tent, where a small lantern is more comfortable than a beam",
    ],
    verdict:
      "The Spot 400 wins because it is unremarkable in the right way: it turns on, it is bright enough, and it keeps going. Dual fuel on the Actik Core is the single most useful feature in this category once you camp in the cold, and it is the reason to spend more.",
  },

  "best-hiking-boots": {
    keyTakeaways: [
      "The Salomon X Ultra 4 GTX suits most hikers: light enough to move quickly, stable enough for loose ground.",
      "The Merrell Moab 3 Mid WP remains the value benchmark, and its wider fit works for feet the Salomon pinches.",
      "The Hoka Anacapa Mid GTX is the choice for long days, where cushioning matters more than ground feel.",
      "Fit beats every specification on the list. A boot that rubs at mile two will still rub at mile twenty, whatever the materials.",
      "A waterproof membrane keeps water out and also keeps sweat in. In consistently hot, dry country a non-waterproof boot is the more comfortable choice.",
      "Mid-height helps on uneven ground and with a loaded pack. On maintained trails with a daypack it mostly adds weight.",
    ],
    quickVerdict:
      "The Salomon X Ultra 4 GTX is the boot to try first — it covers day hikes and light overnights without feeling like equipment. Try the Merrell Moab 3 if your feet are wide or the budget is tight, and the Hoka Anacapa if your days run long and your knees notice.",
    whoFor: [
      "Day hikers and weekend backpackers on mixed, sometimes wet terrain",
      "Walkers with a light to moderate pack who want ankle support on uneven ground",
      "Anyone replacing trainers that offer no grip on wet rock",
    ],
    whoShouldSkip: [
      "Mountaineers needing a crampon-compatible, stiff-soled boot",
      "Hikers in consistently hot, dry conditions, where a breathable non-waterproof shoe is more comfortable",
      "Trail runners, who need a shoe built for repeated impact rather than support",
    ],
    verdict:
      "Buy on fit first and reputation second. The X Ultra 4 GTX is the safest starting point because it suits the widest range of feet and terrain, but a Moab 3 that fits your foot properly will outperform a Salomon that does not. Order both if the retailer's returns policy allows it.",
  },

  "best-budget-backpacking-stoves": {
    keyTakeaways: [
      "A canister stove under $50 boils water perfectly well. The money above that buys wind resistance and simmer control, not raw speed.",
      "The BRS-3000T is the lightest way to get a working stove, and the compromise is that it struggles as soon as the wind picks up.",
      "The Soto WindMaster is the pick if you cook anywhere exposed — its burner design is the difference between dinner and a long wait.",
      "Wind is the variable that separates these stoves. In still air the gap between cheap and expensive nearly disappears.",
      "Fuel efficiency matters more than boil time on multi-day trips: a stove that wastes gas means carrying another canister.",
      "None of these simmer well enough for real cooking. If you want more than boiled water, budget for an integrated system instead.",
    ],
    quickVerdict:
      "If you boil water for dehydrated meals and coffee, the BRS-3000T does the job for a fraction of the weight and price of anything else. Spend the extra on the Soto WindMaster if your trips are exposed — ridgelines, coastlines, shoulder season — where wind turns a five-minute boil into fifteen.",
    whoFor: [
      "Backpackers who mainly rehydrate meals and make hot drinks",
      "Anyone assembling a first lightweight kit on a limited budget",
      "Hikers who want a spare stove that costs little and weighs almost nothing",
    ],
    whoShouldSkip: [
      "Campers who genuinely cook, and need reliable simmer control",
      "Groups boiling large volumes, better served by a remote-canister or liquid-fuel stove",
      "Winter and high-altitude users, where canister performance drops and liquid fuel wins",
    ],
    verdict:
      "The honest answer is that the cheapest stove here works. Buy the BRS-3000T, add a windscreen, and put the savings toward a lighter sleeping pad. Step up to the WindMaster only when you can name the trips where wind has actually cost you time.",
  },

  "best-water-filters-camping": {
    keyTakeaways: [
      "Filter choice comes down to group size. Solo and pairs want a squeeze filter; three or more want gravity.",
      "The Sawyer Squeeze is the default for lightweight trips — small, cheap, and it filters straight into a bottle.",
      "The Platypus GravityWorks 4L earns its bulk with groups: you hang it, walk away, and come back to clean water.",
      "Flow rate drops as a filter clogs. Backflushing on schedule matters more to real-world speed than the advertised rate.",
      "Filters remove bacteria and protozoa, not viruses. That is fine across most of North America and Europe; it is not fine everywhere.",
      "Never let a filter freeze. Ice cracks the internal fibres invisibly, and the filter will still appear to work afterwards.",
    ],
    quickVerdict:
      "Buy the Sawyer Squeeze if you hike alone or in a pair — it is light, inexpensive and hard to break. Buy the Platypus GravityWorks 4L if you camp with a group, where the time saved not standing over a squeeze bag is worth the extra weight and cost.",
    whoFor: [
      "Backpackers drawing water from streams and lakes on established routes",
      "Groups who need several litres at camp without queueing at a filter",
      "Campers who want a filter simple enough to maintain in the field",
    ],
    whoShouldSkip: [
      "Travellers in regions where waterborne viruses are a genuine risk — a purifier is needed, not a filter",
      "Winter campers, since any filter that freezes is compromised",
      "Anyone drawing from heavily silted sources without pre-filtering, which clogs these fast",
    ],
    verdict:
      "Match the filter to the group, not to the review score. The Sawyer Squeeze is the one most people should own; the GravityWorks is the one that transforms group camping. Whichever you pick, backflush it before it feels slow rather than after.",
  },

  "yeti-vs-rtic-coolers": {
    keyTakeaways: [
      "The performance gap between these two is real, but it is a matter of hours rather than days.",
      "For weekend trips with a mid-trip ice top-up, both coolers keep food safe and the difference rarely shows.",
      "The gap starts to matter on longer trips with no resupply, where those extra hours decide whether ice survives the last day.",
      "Pre-chilling the cooler and filling it full does more for ice retention than the difference between these two brands.",
      "RTIC undercuts YETI substantially at the same capacity, which is the whole basis of the comparison.",
      "Warranty terms and dealer support differ, and that is worth weighing if the cooler is a long-term purchase.",
    ],
    quickVerdict:
      "For most people the RTIC is the sensible buy: it holds ice long enough for the trips they actually take, at a noticeably lower price. The YETI is the better cooler, and it earns the premium only on long unsupported trips or if you value the warranty and resale value.",
    whoFor: [
      "Weekend campers and tailgaters who want ice to last the trip without fuss",
      "Buyers comparing rotomoulded coolers and wondering whether the premium is justified",
      "Anyone replacing a thin-walled cooler that empties into meltwater by day two",
    ],
    whoShouldSkip: [
      "Backpackers and anyone carrying a cooler any distance — both are heavy before you add ice",
      "Day-trip users, for whom a soft cooler is lighter, cheaper and entirely sufficient",
      "Buyers who need a powered fridge for multi-week travel, where ice is not the answer",
    ],
    verdict:
      "Buy the RTIC and spend the difference on ice, or on a second cooler for drinks so the food one stays shut. The YETI is not overpriced for what it is, but for the trips most people take it solves a problem they do not have.",
  },

  // ── Home Essentials ─────────────────────────────────────────────
  "best-air-fryers-home": {
    keyTakeaways: [
      "The Cosori Pro Gen 2 (5.8 qt) is the best default: enough capacity for a family meal without dominating the worktop.",
      "The Instant Vortex Plus is worth the extra only if you will genuinely use the additional cooking modes rather than just air frying.",
      "The Ninja AF101 (4 qt) suits one or two people and small kitchens, and its limit is basket area rather than power.",
      "Basket area matters more than quoted quart capacity. Food browns properly in a single layer, so a wide basket beats a deep one.",
      "Almost everything you cook needs a shake or turn partway through. A basket that is awkward to remove will quietly annoy you daily.",
      "Dishwasher-safe parts are the difference between using an air fryer several times a week and leaving it in a cupboard.",
    ],
    quickVerdict:
      "The Cosori Pro Gen 2 is the one to buy for most households — the capacity suits a family, the controls are straightforward, and cleanup is easy enough that it stays on the worktop. Take the Ninja AF101 if you cook for one or two, and the Instant Vortex Plus only if the extra functions match how you actually cook.",
    whoFor: [
      "Households cooking frozen foods, chicken, vegetables and reheats several times a week",
      "Anyone wanting oven results without heating a full oven for a small portion",
      "Small kitchens where a compact model can replace a toaster oven",
    ],
    whoShouldSkip: [
      "Large families, who will find even a 6 qt basket forces cooking in batches",
      "Cooks who need precise low-temperature control, which these do not offer",
      "Anyone short on worktop space and unwilling to store an appliance of this size",
    ],
    verdict:
      "Buy for basket area and ease of cleaning, not for the list of preset buttons. The Cosori gets the basics right and stays easy to live with, which is what decides whether an air fryer earns its space or gathers dust.",
  },

  "best-robot-vacuums": {
    keyTakeaways: [
      "The Roborock S8 Pro Ultra is the most capable here, and the self-emptying dock is what makes it genuinely low-effort.",
      "The iRobot Roomba j7+ is the pick if your floors have cables, socks or a pet — its obstacle avoidance is the reason to choose it.",
      "The Eufy RoboVac 11S proves a budget robot still works, provided you accept random navigation and no mapping.",
      "Suction figures are the least useful spec. Navigation quality decides whether the robot finishes the job or strands itself.",
      "A self-emptying dock changes the ownership experience more than any cleaning improvement, especially with pets.",
      "Every robot needs the floor picked up first. None of them replaces a proper vacuum for deep cleaning carpet.",
    ],
    quickVerdict:
      "Buy the Roborock S8 Pro Ultra if you want to think about vacuuming as rarely as possible. Buy the Roomba j7+ if clutter and pet accidents are your reality — avoiding one mess repays the price difference. The Eufy 11S is the sensible entry point for a small, tidy flat.",
    whoFor: [
      "Households wanting daily maintenance cleaning without doing it themselves",
      "Pet owners dealing with hair on hard floors and low-pile carpet",
      "Flats and single-storey homes where a robot can reach everywhere",
    ],
    whoShouldSkip: [
      "Homes with deep, high-pile carpet, where an upright still does a better job",
      "Very cluttered floors that would need tidying before every run",
      "Anyone expecting a robot to replace occasional thorough vacuuming",
    ],
    verdict:
      "Spend on navigation and the dock, not on suction numbers. The S8 Pro Ultra is the version of this product category that finally requires almost nothing from you, and that — not cleaning power — is what people are actually buying.",
  },

  "best-coffee-makers-home": {
    keyTakeaways: [
      "The Technivorm Moccamaster KBGV Select is the drip machine to buy once and keep, and it is priced accordingly.",
      "The Breville Barista Express is an espresso machine with a grinder built in, which is a different hobby to drip coffee — decide which one you want.",
      "The OXO Brew 9-Cup delivers most of the Moccamaster's brew quality for meaningfully less.",
      "Brew temperature and contact time are what separate good drip coffee from flat coffee. Most cheap machines fail on temperature.",
      "A burr grinder improves your cup more than upgrading the brewer does. If the budget is tight, spend there first.",
      "A thermal carafe keeps coffee drinkable; a hotplate slowly ruins it. This matters if you drink a pot over an hour.",
    ],
    quickVerdict:
      "For filter coffee, the OXO Brew 9-Cup is the value pick and the Moccamaster is the buy-it-for-life option. Only choose the Breville Barista Express if you actively want to make espresso and are willing to learn the process — it will not otherwise get used.",
    whoFor: [
      "Households drinking several cups a day who want consistent filter coffee",
      "Anyone upgrading from a supermarket machine that brews weak or bitter",
      "Espresso-curious buyers ready to spend time dialling in a grinder",
    ],
    whoShouldSkip: [
      "Single-cup drinkers, better served by a pour-over or a small pod machine",
      "Anyone unwilling to grind fresh, which caps how much any of these can deliver",
      "Buyers wanting one-touch milk drinks, which needs a bean-to-cup machine instead",
    ],
    verdict:
      "Sort the grinder before the brewer. With fresh grounds and correct brew temperature, the OXO makes coffee that most people cannot distinguish from the Moccamaster. The Moccamaster earns its price on longevity and build, not on a dramatically better cup.",
  },

  // ── Travel & EDC ────────────────────────────────────────────────
  "best-travel-backpack-carry-on": {
    keyTakeaways: [
      "The Osprey Farpoint 40 is the safest choice: it fits most carry-on limits, carries comfortably, and the harness stows away.",
      "The Tortuga Setout 45L suits people who pack in compartments rather than into one large space.",
      "Capacity above roughly 40 litres starts to fail size limits on stricter airlines, whatever the marketing says.",
      "A clamshell opening beats top-loading for travel. You can see and reach everything without unpacking the bag.",
      "Carry comfort matters more than most buyers expect — a hip belt turns a heavy bag into a manageable one.",
      "Check the specific airline before flying. Carry-on limits vary widely and low-cost carriers enforce them hardest.",
    ],
    quickVerdict:
      "Buy the Osprey Farpoint 40 unless you have a reason not to — it is the best balance of comfort, capacity and compliance. The Tortuga Setout 45L is the better bag if you value structured organisation and mostly fly carriers with generous limits.",
    whoFor: [
      "One-bag travellers avoiding checked luggage fees and baggage carousels",
      "Trips of a few days to a few weeks where you can do laundry",
      "Travellers combining city stays with some walking between accommodation",
    ],
    whoShouldSkip: [
      "Anyone needing formal clothing to arrive uncreased",
      "Long expeditions requiring specialist or bulky equipment",
      "Travellers who prefer wheels, where a roller case is easier on paved ground",
    ],
    verdict:
      "Pick on how you pack. The Farpoint suits people who use packing cubes and want one open space; the Setout suits people who want the bag to do the organising. Both beat a roller case the moment you meet stairs or a cobbled street.",
  },

  "best-alternatives-to-nalgene-bottles": {
    keyTakeaways: [
      "The Hydro Flask 32oz Wide Mouth is the pick when you want drinks to stay cold — insulation is the main reason to leave Nalgene behind.",
      "The Platypus Platy 2L is the opposite approach: it packs down to nothing when empty, which a rigid bottle never will.",
      "Insulation costs weight. A vacuum-walled bottle is significantly heavier empty than a hard plastic one.",
      "Wide mouths are easier to fill from a stream, easier to clean, and they accept ice. Narrow mouths are easier to drink from while moving.",
      "Collapsible bottles suit trips where water availability varies and carrying empty volume is wasteful.",
      "Check that any replacement still fits your pack's side pocket and your filter's thread before buying.",
    ],
    quickVerdict:
      "If the appeal of a Nalgene is durability but you want cold water, the Hydro Flask 32oz is the straight upgrade. If the appeal is capacity but you resent carrying an empty bottle all day, the Platypus Platy 2L solves that instead. They answer different complaints.",
    whoFor: [
      "Hikers who want water to stay cold through a hot day",
      "Backpackers wanting to cut the bulk of empty bottles from their pack",
      "Anyone whose Nalgene has cracked, leaked or retained flavours",
    ],
    whoShouldSkip: [
      "Users who need a bottle that survives being dropped on rock repeatedly, where hard plastic still wins",
      "Anyone relying on a specific filter thread that these do not match",
      "Buyers counting grams, since insulated bottles carry a real weight penalty",
    ],
    verdict:
      "There is no single Nalgene replacement, because people leave Nalgene for opposite reasons. Decide first whether your complaint is temperature or bulk; the right bottle follows immediately from that answer.",
  },

  "best-portable-power-stations": {
    keyTakeaways: [
      "The Jackery Explorer 300 Plus covers weekend needs: phones, cameras, a laptop top-up and lights.",
      "The EcoFlow River 2 is the pick when recharge speed matters, which counts if you top up in a car or at a café.",
      "Watt-hours tell you how much energy is stored; watts tell you what it can run. Both need checking against your devices.",
      "Capacity in this class does not run high-draw appliances. Kettles, heaters and hairdryers are out of scope.",
      "LiFePO4 cells last considerably more cycles than older lithium chemistries, which matters over years of ownership.",
      "Solar input is only useful with a matching panel and real sun. Treat it as a bonus, not a plan.",
    ],
    quickVerdict:
      "For camping trips of a weekend or two, the Jackery Explorer 300 Plus carries enough energy for the devices most people bring. Choose the EcoFlow River 2 if you can recharge mid-trip and want that to take under an hour rather than several.",
    whoFor: [
      "Car campers running lights, fans and device charging over a weekend",
      "Photographers and remote workers keeping batteries and laptops topped up",
      "Households wanting modest backup for phones and routers during short outages",
    ],
    whoShouldSkip: [
      "Anyone needing to run fridges, power tools or heating, which needs far more capacity",
      "Backpackers, since these are too heavy to carry any distance",
      "Whole-home backup, which is a different product category entirely",
    ],
    verdict:
      "Work out your actual daily watt-hours before choosing a size — most people overestimate and buy heavier than they need. At this capacity the sensible question is not which is more powerful, but which recharges on the schedule your trips allow.",
  },

  "best-noise-cancelling-headphones-travel": {
    keyTakeaways: [
      "The Sony WH-1000XM6 has the strongest noise cancelling here, which is the main reason to buy for flights.",
      "The Bose QuietComfort 45 is the more comfortable pair over many hours, and comfort is what you notice on a long-haul flight.",
      "The Anker Soundcore Space Q45 delivers most of the useful cancellation for far less money.",
      "Noise cancelling works best on constant low-frequency sound like engine drone. It does far less against speech.",
      "Battery life is rarely the deciding factor now — all of these outlast any single flight comfortably.",
      "Clamping force and earcup depth determine whether a pair is bearable at hour six. Try before buying if you can.",
    ],
    quickVerdict:
      "Buy the Sony WH-1000XM6 if you want the quietest cabin and the best all-round feature set. Buy the Bose QuietComfort 45 if you fly long-haul and value comfort above outright cancellation. The Anker Space Q45 is the sensible choice if you fly a few times a year.",
    whoFor: [
      "Frequent flyers wanting relief from engine noise on long flights",
      "Commuters on trains and buses who want to lower ambient noise",
      "Open-plan office workers using cancellation for concentration",
    ],
    whoShouldSkip: [
      "Listeners who prioritise sound quality above cancellation, better served by wired headphones",
      "Anyone who dislikes over-ear pressure, where in-ear models suit better",
      "Runners and gym users, since over-ear pads trap heat and shift with movement",
    ],
    verdict:
      "Cancellation strength and comfort pull in opposite directions, and the right answer depends on flight length. Under four hours, take the Sony for the quiet. Beyond that, the Bose is the pair you will still want on your head when you land.",
  },

  // ── Single-brand reviews ────────────────────────────────────────
  // These cover one product in lens or colour variants, so the takeaways
  // frame the variant choice rather than ranking competing models.
  "outdoormaster-ski-goggles-pro-review": {
    keyTakeaways: [
      "The Rose Gold Revo lens is the variant to pick if you buy one: it handles the widest span of conditions from overcast to bright.",
      "Add the VLT 8% Dark Smoke lens only if you regularly ski full sun on open snow, where a mid-tint lens leaves you squinting.",
      "The magnetic lens swap is the feature that justifies owning two tints — a slow swap system means you never bother.",
      "Frameless construction widens peripheral vision noticeably compared with framed goggles at similar money.",
      "Amazon ranking reflects sales volume, not optical quality. Judge the lens spec and fit instead.",
      "Fit with a specific helmet is the one thing no review can settle for you — gaps between goggle and helmet let cold air in.",
    ],
    quickVerdict:
      "For most skiers the Rose Gold Revo variant is the sensible single purchase: it covers variable light, which is what a normal season actually looks like. The Dark Smoke lens is a second lens rather than an alternative first one, and the magnetic system makes owning both practical.",
    whoFor: [
      "Skiers and snowboarders wanting quality optics without paying flagship prices",
      "Anyone who skis through changing light and wants to swap tints on the lift",
      "Riders replacing entry-level goggles that fog or distort",
    ],
    whoShouldSkip: [
      "Glasses wearers, who should look at the OTG model instead",
      "Skiers committed to a goggle-helmet system from one brand for guaranteed fit",
      "Anyone needing a photochromic lens that adapts automatically rather than by swapping",
    ],
    verdict:
      "The lens quality and the swap mechanism are the reasons to buy, and both hold up against goggles costing considerably more. Choose the Rose Gold Revo first and treat the darker lens as an accessory for bright days.",
  },

  "outdoormaster-otg-snow-goggles-review": {
    keyTakeaways: [
      "OTG means the goggle is cut to fit over spectacles, and that is the entire reason to choose this over the standard PRO.",
      "The Blue Revo lens is the everyday pick; the VLT 60% Yellow lens is for flat light and overcast days when contrast disappears.",
      "Frame depth is what makes OTG work. Measure your own glasses before assuming any OTG goggle will clear them.",
      "Fogging is the recurring complaint with glasses under goggles, and ventilation matters more here than in a standard goggle.",
      "Wide or thick spectacle arms cause pressure points that only show up after an hour on the hill.",
      "If you can wear contact lenses while skiing, a standard goggle will still be lighter and less prone to fogging.",
    ],
    quickVerdict:
      "If you ski in glasses, this solves a genuine problem that standard goggles do not. Take the Blue Revo lens for general use and add the yellow lens if your local conditions are frequently overcast. If you can wear contacts instead, the standard Ski Goggles PRO remains the better goggle.",
    whoFor: [
      "Skiers and snowboarders who wear prescription glasses on the mountain",
      "Anyone who has tried standard goggles over glasses and given up on fogging or pressure",
      "Riders who want a second yellow lens for low-contrast days",
    ],
    whoShouldSkip: [
      "Contact lens wearers, better served by a standard goggle",
      "Anyone with unusually large frames, which may still not clear the goggle",
      "Skiers wanting the widest possible field of view, which OTG depth slightly reduces",
    ],
    verdict:
      "Judge this on whether your glasses fit, not on optics alone. As a goggle it is competent; as a solution for skiing in glasses it removes a problem that otherwise ruins the day. Measure your frames first.",
  },

  "outdoormaster-rhino-mips-helmet-review": {
    keyTakeaways: [
      "MIPS is a low-friction layer designed to reduce rotational forces in an angled impact, which is how most real crashes happen.",
      "The Virginia Tech rating is independent third-party testing, which is the strongest evidence available for a helmet at any price.",
      "A removable chin bar means one helmet covers both trail riding and descending, at the cost of some rigidity versus a fixed bar.",
      "Ventilation is the everyday trade-off with full-face helmets, and it is what you notice on long climbs.",
      "Fit and retention matter as much as the shell. A helmet that shifts is not protecting you where it was tested to.",
      "Replace any helmet after a significant impact, whatever it looks like from the outside.",
    ],
    quickVerdict:
      "A full-face helmet with MIPS and a 5-star independent safety rating at this price is unusual, and the safety case does not depend on brand reputation — it rests on published third-party testing. Choose the Emerald Green variant if trail visibility matters to you; the shells are otherwise identical.",
    whoFor: [
      "Trail and enduro riders wanting full-face protection without a flagship price",
      "Riders who climb as well as descend and want a removable chin bar",
      "Anyone replacing a helmet with no MIPS or equivalent rotational protection",
    ],
    whoShouldSkip: [
      "Downhill racers under rules requiring a fixed chin bar and specific certification",
      "Road cyclists and commuters, for whom a ventilated open helmet is more suitable",
      "Riders in consistently hot climates doing long climbs, where airflow beats coverage",
    ],
    verdict:
      "The interesting part is not that it is cheap — it is that the safety claim is backed by testing anyone can look up. Confirm the fit on your own head, since a well-rated helmet that sits badly protects you less than a modest one that fits.",
  },
};

const file = "lib/articles.ts";
let src = await readFile(file, "utf8");

// The file is CRLF. Emit the same ending we find so we do not leave a mixed
// bag behind, and match either ending when anchoring.
const EOL = src.includes("\r\n") ? "\r\n" : "\n";

const fmt = (v, indent) => {
  const pad = " ".repeat(indent);
  if (Array.isArray(v))
    return `[${EOL}${v.map((x) => `${pad}  ${JSON.stringify(x)},`).join(EOL)}${EOL}${pad}]`;
  return JSON.stringify(v);
};

let done = 0;
const skipped = [];
for (const [slug, fields] of Object.entries(DATA)) {
  // Anchor on the `related:` line we injected earlier — it is unique per article
  // and sits at the top level of the object, so insertion is unambiguous.
  const anchor = new RegExp(
    `(^([ \\t]*)slug:\\s*"${slug}",\\r?\\n[ \\t]*related: \\[[^\\]]*\\],\\r?\\n)`,
    "m"
  );
  const m = src.match(anchor);
  if (!m) {
    skipped.push(`${slug} (anchor not found)`);
    continue;
  }
  const indent = m[2];

  // Guard against re-running.
  const start = src.indexOf(m[0]);
  const next = src.indexOf('slug: "', start + m[0].length);
  if (/^\s*keyTakeaways:/m.test(src.slice(start, next === -1 ? undefined : next))) {
    skipped.push(`${slug} (already filled)`);
    continue;
  }

  const block = Object.entries(fields)
    .map(([k, v]) => `${indent}${k}: ${fmt(v, indent.length)},${EOL}`)
    .join("");

  src = src.replace(anchor, `$1${block}`);
  done++;
}

await writeFile(file, src);
console.log(`filled ${done} article(s)`);
skipped.forEach((s) => console.log(`  skipped: ${s}`));
