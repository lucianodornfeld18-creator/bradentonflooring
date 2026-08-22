import { mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const DOMAIN = 'https://bradentonflooring.com';
const BUILD_DATE = '2026-08-21';
const PHONE_DISPLAY = '(941) 274-5560';
const PHONE_HREF = '+19412745560';
const EMAIL = 'contact@bradentonflooring.com';
const INDEXNOW_KEY = '990ee8fedcf4c10797e76d2688965b4e';

const services = {
  'luxury-vinyl-plank': {
    slug: 'luxury-vinyl-plank',
    name: 'Luxury Vinyl Plank',
    short: 'LVP',
    icon: '▥',
    rootUrl: '/luxury-vinyl-plank/',
    image: '/images/luxury-vinyl-plank-social-card.png',
    generate: false,
    cost: '$4–$9 per square foot installed',
    timeline: 'two to five working days for many occupied residential projects, depending on demolition and slab correction',
    substrate: 'flatness, moisture-vapor conditions, expansion space and the compatibility of any attached pad or separate underlayment',
    summary: 'Waterproof rigid-core SPC and WPC planks for whole homes, rentals, pets and condo projects that need documented acoustic assemblies.',
    bestFor: 'Busy households, pets, open plans, rentals and rooms where water resistance and softer footfall matter.',
    terms: ['SPC rigid core', 'WPC vinyl plank', '20-mil wear layer', 'click-lock flooring', 'acoustic underlayment'],
    specs: [
      ['Core and thickness', 'SPC emphasizes dent resistance and dimensional stability; WPC feels warmer and quieter. Overall thickness matters only when the full construction and locking profile are considered.'],
      ['Wear layer and finish', 'A 20-mil wear layer is a practical family-home benchmark. UV-cured finishes, realistic embossing and painted bevels usually matter more than a marketing-heavy product name.'],
      ['Underlayment and transitions', 'Condo-rated assemblies need published acoustic data. Long continuous runs need manufacturer-approved expansion breaks, perimeter space and transitions planned before the first plank is clicked.']
    ],
    deepDive: [
      'Luxury vinyl plank succeeds in coastal Florida when the specification and the slab are treated as one system. A waterproof plank does not make trapped slab vapor disappear, and a thick attached pad does not flatten a wavy concrete surface. The useful buying question is not simply “Is this LVP waterproof?” but “Is this exact plank, pad and installation method approved for this slab and room layout?”',
      'We compare rigid-core construction, wear-layer thickness, finish texture, locking profile, plank dimensions, acoustic data and warranty exclusions before recommending a line. Large open rooms often look better with longer, wider planks, while rentals and pet-heavy homes benefit from repeatable visuals that make a future board replacement easier to blend.',
      'Preparation determines whether the finished floor feels solid. The scope can include old-floor removal, thin-set grinding, crack treatment, high-spot reduction, low-area filling, moisture mitigation, door undercutting, appliance clearance checks and new transitions. Each item belongs on the written estimate instead of being discovered as an open-ended change order.'
    ],
    process: [
      ['Measure and map', 'Document room dimensions, fixed cabinetry, long runs, door clearances and the direction that best serves the home.'],
      ['Test and flatten', 'Check slab moisture and flatness, then price only the grinding, patching or mitigation the readings justify.'],
      ['Lay out and install', 'Blend cartons, protect expansion space, stagger joints and keep narrow cuts out of focal walls and main entries.'],
      ['Finish and document', 'Fit transitions and trim, clean the floor, review care rules and record the products used for warranty reference.']
    ]
  },
  tile: {
    slug: 'tile',
    name: 'Tile Installation',
    short: 'Tile',
    icon: '◫',
    rootUrl: '/tile/',
    image: '/images/tile-installation-social-card.png',
    generate: true,
    cost: '$7–$20 per square foot for many ceramic and porcelain floor installations',
    timeline: 'four to eight working days for a typical residential floor, with showers and highly detailed layouts taking longer',
    substrate: 'slab flatness, cracks, movement joints, mortar coverage, wet-area waterproofing and the tile manufacturer’s format-specific requirements',
    summary: 'Porcelain, ceramic and wood-look tile for floors, bathrooms, showers, backsplashes and lanai-adjacent rooms.',
    bestFor: 'Wet rooms, sun-heavy spaces, lanais, long-life renovations and owners who value a cool, rigid surface.',
    terms: ['porcelain tile installer', 'ceramic floor tile', 'wood-look plank tile', 'large-format tile', 'shower waterproofing'],
    specs: [
      ['Porcelain versus ceramic', 'Porcelain is denser and better suited to demanding floors and many exterior-rated applications. Ceramic remains a cost-effective choice for suitable walls, backsplashes and lighter-duty interiors.'],
      ['Format and flatness', 'Large-format and plank tile need a flatter substrate than small tile. Layout, offset, warpage and lippage control are reviewed together before mortar is mixed.'],
      ['Wet-area assembly', 'A shower is a drainage and waterproofing system finished with tile—not tile plus caulk. Membranes, penetrations, slopes and flood testing come before the visible surface.']
    ],
    deepDive: [
      'Tile is the most durable finish in the lineup, but it is also the least forgiving of rushed preparation. Porcelain will not hide a moving crack, a hollow patch or an out-of-plane substrate. A reliable scope identifies those conditions early and matches the crack-isolation, uncoupling or leveling work to the room rather than treating every slab the same.',
      'Selection starts with use. Matte porcelain with appropriate wet traction belongs near pool doors and in showers; rectified large-format tile creates tight, contemporary joints but raises the flatness requirement; wood-look planks need a layout that respects their natural warpage. Grout type, movement accommodation and edge profiles influence maintenance as much as color does.',
      'Our tile quotes separate demolition, thin-set removal, slab repair, membrane work, setting labor, grout and trim. That structure makes two bids comparable and keeps the visually small details—niches, benches, patterned layouts, thresholds and base transitions—from becoming surprise charges after demolition.'
    ],
    process: [
      ['Survey the substrate', 'Sound the existing surface, map cracks and high points, verify drainage and measure flatness for the selected tile format.'],
      ['Build the assembly', 'Complete grinding, patching, crack isolation, uncoupling or bonded waterproofing before layout begins.'],
      ['Set with coverage', 'Choose the correct mortar, key it into the substrate, back-butter where required and verify coverage with periodic lift checks.'],
      ['Grout and protect', 'Honor movement joints, use flexible sealant at plane changes, protect cure times and hand over product-specific care guidance.']
    ]
  },
  hardwood: {
    slug: 'hardwood',
    name: 'Hardwood Flooring',
    short: 'Hardwood',
    icon: '▤',
    rootUrl: '/hardwood/',
    image: '/images/hardwood-flooring-social-card.png',
    generate: true,
    cost: '$7–$14 per square foot for many engineered hardwood installations; solid wood assemblies can run higher',
    timeline: 'three to seven working days after material conditioning, depending on adhesive, pattern, stairs and floor preparation',
    substrate: 'concrete moisture, indoor humidity, material moisture content, adhesive limits, flatness and the selected nail-down, glue-down or floating method',
    summary: 'Engineered and solid wood floors with Florida-appropriate acclimation, moisture control and installation methods.',
    bestFor: 'Owners who want a genuine wood surface, premium feel and long-term repair or refinishing potential.',
    terms: ['engineered hardwood', 'glue-down wood flooring', 'wide-plank oak', 'solid hardwood installation', 'wood floor moisture testing'],
    specs: [
      ['Construction and wear layer', 'Engineered hardwood uses a real wood face over a stable core. A thicker wear layer expands future repair and refinishing options; veneer quality matters more than total board thickness alone.'],
      ['Species and finish', 'Oak is versatile and repairable, hickory adds movement and hardness, and low-gloss finishes hide sand and daily wear better than mirror-smooth coatings in bright Florida rooms.'],
      ['Installation method', 'Glue-down engineered wood is common over concrete slabs. Nail-down solid wood suits suitable wood subfloors; floating products are chosen only when the room and manufacturer permit them.']
    ],
    deepDive: [
      'A real wood floor can perform on the Gulf Coast, but it cannot be specified as if the house were in a dry inland climate. The installation method, adhesive vapor tolerance, material construction and year-round indoor conditions all matter. Engineered hardwood is often the practical choice over concrete because its cross-layered core moves less than a solid board while keeping a genuine wood surface.',
      'The best comparison looks beyond species names. Wear-layer thickness, core construction, plank width, board length mix, finish sheen, edge treatment and repairability affect how the floor ages. Wide boards create a calm visual across open plans, but they also make acclimation, adhesive transfer and slab flatness more consequential.',
      'Our written scope records slab and material readings, planned conditioning time, adhesive or vapor-control system, layout direction, transitions and trim. If the building cannot maintain the environment a wood warranty requires, we say so and compare a realistic alternative instead of forcing hardwood into a room where it will become a maintenance problem.'
    ],
    process: [
      ['Document the environment', 'Record slab and ambient conditions, identify sun exposure and confirm the home can maintain the product’s humidity range.'],
      ['Condition the material', 'Bring wood into the controlled space and verify moisture readings rather than relying on a fixed number of calendar days.'],
      ['Prepare and bond', 'Flatten the substrate, use the specified trowel and adhesive system, control working time and clean residue as installation proceeds.'],
      ['Detail the edges', 'Plan expansion, reducers, vents, stair interfaces and base details so the wood can move without leaving awkward visual breaks.']
    ]
  },
  laminate: {
    slug: 'laminate',
    name: 'Laminate Flooring',
    short: 'Laminate',
    icon: '▧',
    rootUrl: '/laminate/',
    image: '/images/laminate-flooring-social-card.png',
    generate: true,
    cost: '$3–$8 per square foot installed for many residential laminate systems',
    timeline: 'two to four working days for many single-story homes after demolition and substrate corrections',
    substrate: 'flatness, concrete vapor protection, perimeter expansion, attached-pad limitations and exposure to plumbing or exterior water',
    summary: 'AC-rated, water-resistant laminate with sharp wood visuals, durable wear surfaces and correct vapor protection over Florida slabs.',
    bestFor: 'Dry living areas, bedrooms, offices and budget-conscious owners who prioritize scratch resistance and realistic wood texture.',
    terms: ['water-resistant laminate', 'AC4 laminate', 'floating laminate floor', 'laminate over concrete', 'wood-look flooring'],
    specs: [
      ['AC wear rating', 'AC3 can suit lighter residential rooms; AC4 is a practical target for active households, hallways and many rentals. AC5 is selected when traffic genuinely justifies commercial-grade abrasion resistance.'],
      ['Core and water claim', 'Most laminate uses a wood-fiber core. Surface-water warranties have time limits and exclusions, so water-resistant should not be confused with indefinitely waterproof.'],
      ['Pad and vapor control', 'Attached cushion can improve sound and feel, but grade-level concrete may still require a separate vapor membrane. The product instructions decide the assembly.']
    ],
    deepDive: [
      'Modern laminate is no longer the soft, repetitive floor many owners remember. Better lines use detailed embossing, matte finishes and strong wear surfaces that resist the fine sand carried into Florida homes. The trade-off is the core: even a water-resistant product needs protected edges, correct expansion and a plan for rooms with genuine leak or standing-water risk.',
      'A useful laminate quote names the exact collection and AC rating, not just a color. It also identifies the pad, vapor membrane, stair or transition parts and whether the manufacturer allows the proposed run length. Those details separate a stable floating floor from one that pinches under cabinets, tents in a long hallway or sounds hollow over an uneven slab.',
      'We recommend laminate where its strengths match the room and redirect bathrooms, laundry rooms or flood-prone entries toward waterproof LVP or porcelain when appropriate. Honest material selection prevents a lower initial price from becoming a premature replacement.'
    ],
    process: [
      ['Confirm the room', 'Map water exposure, sunlight, run length and fixed cabinetry before choosing a product or transition plan.'],
      ['Prepare the slab', 'Verify flatness and moisture conditions, correct ridges or dips and install the approved vapor layer.'],
      ['Assemble the field', 'Blend boards, stagger joints, protect locking edges and keep expansion space clear of fasteners and heavy fixed objects.'],
      ['Close the perimeter', 'Undercut jambs, fit reducers, reinstall trim and explain spill response, cleaning chemistry and humidity expectations.']
    ]
  },
  carpet: {
    slug: 'carpet',
    name: 'Carpet Installation',
    short: 'Carpet',
    icon: '▦',
    rootUrl: '/carpet/',
    image: '/images/carpet-installation-social-card.png',
    generate: true,
    cost: '$2–$6 per square foot installed with many standard residential pads',
    timeline: 'one to three working days for many bedroom, stair and whole-home carpet projects',
    substrate: 'subfloor cleanliness, tack-strip condition, seam placement, cushion density, door clearance and power-stretching requirements',
    summary: 'Nylon, triexta, PET and solution-dyed carpet for bedrooms, stairs, condos and quiet comfort underfoot.',
    bestFor: 'Bedrooms, stairs, upper floors, quiet rooms, 55+ households and projects where comfort and budget lead the decision.',
    terms: ['carpet installer', 'nylon carpet', 'triexta carpet', '8-pound carpet pad', 'stair runner installation'],
    specs: [
      ['Fiber choice', 'Nylon brings resilience to stairs and hallways, triexta balances stain resistance and softness, and PET can serve lower-traffic rooms or value-driven refreshes.'],
      ['Cushion density', 'Pad affects feel, seam stress and long-term support. Density, thickness, moisture-barrier construction and stair suitability are specified separately from the face carpet.'],
      ['Seams and stretching', 'Seams belong away from hard side light and primary traffic when layouts allow. Power stretching—not a knee-kicker-only install—helps keep broad rooms taut.']
    ],
    deepDive: [
      'Carpet still solves problems hard surfaces cannot: it softens bedrooms, quiets upper floors, adds traction to stairs and reduces the sharp footfall that travels through condo structures. Choosing well means matching fiber, twist, density and cushion to the room rather than shopping by hand feel alone.',
      'The installation plan matters before material is cut. Roll width, room shape, windows and traffic determine seam position; stairs need a carpet and pad rated for concentrated wear; existing tack strip and subfloor contamination can change the preparation scope. A low price that omits those details often shifts cost—or compromise—to installation day.',
      'Our quotes identify carpet, pad, removal, furniture handling, seams, stairs, transitions and trim. Pet households can compare moisture-barrier cushion and solution-dyed fibers, while 55+ owners can prioritize firm support and stair traction instead of selecting the deepest, least stable cushion.'
    ],
    process: [
      ['Plan seams and stairs', 'Measure roll direction, side light, doorways, closets and every stair component before ordering material.'],
      ['Remove and inspect', 'Take up old carpet and pad, check tack strip, fasten squeaks where accessible and clean the substrate.'],
      ['Fit pad and carpet', 'Keep cushion seams offset, seal carpet seams correctly and power-stretch the field to the manufacturer’s standard.'],
      ['Trim and review', 'Fit transitions, check doors, vacuum thoroughly and explain spot cleaning, pile recovery and warranty maintenance.']
    ]
  },
  'commercial-flooring': {
    slug: 'commercial-flooring',
    name: 'Commercial Flooring',
    short: 'Commercial',
    icon: '▩',
    rootUrl: '/commercial-flooring/',
    image: '/images/commercial-flooring-social-card.png',
    generate: true,
    cost: '$4–$9 per square foot for many glue-down commercial LVT projects and $3–$7 for many carpet-tile scopes',
    timeline: 'scheduled by zone and occupancy needs; many small suites can be phased across nights or a weekend',
    substrate: 'slab moisture, adhesive limits, rolling loads, occupancy, furniture moves, transitions, maintenance chemistry and after-hours access',
    summary: 'Glue-down LVT, carpet tile, sheet goods and commercial tile for offices, retail, medical, restaurants and shared spaces.',
    bestFor: 'Businesses that need durable specifications, phased work, low downtime, documented products and maintainable repairs.',
    terms: ['commercial LVT installation', 'carpet tile installer', 'office flooring', 'retail flooring', 'medical flooring'],
    specs: [
      ['Traffic and rolling loads', 'Wear layer, indentation resistance, rolling furniture and point loads are matched to the actual operation rather than a generic “commercial” label.'],
      ['Adhesive and moisture', 'Glue-down systems depend on the slab and adhesive limits. Testing establishes whether standard adhesive, moisture-tolerant adhesive or mitigation belongs in the bid.'],
      ['Phasing and maintenance', 'Tile size, pattern, attic stock and cleaning chemistry influence how easily a facility can replace a damaged area without closing the whole space.']
    ],
    deepDive: [
      'Commercial flooring is an operations project as much as a finish project. The correct surface must survive the traffic, wheels, spills and cleaning program, while the installation sequence protects customers, staff and revenue. That is why a useful proposal includes zones, access windows, cure requirements, furniture responsibility and reopening milestones.',
      'Glue-down LVT and carpet tile work well for phased offices and many retail environments because individual units can be replaced. Sheet goods reduce seams in appropriate healthcare or wet-service applications. Porcelain handles selected lobbies, restrooms and food-service areas when slip resistance, movement joints and maintenance are designed into the assembly.',
      'We document product data, substrate findings, transition details and care recommendations so the facility team knows what was installed and how to protect it. Allowances are separated from firm scope, and after-hours or weekend labor is stated openly instead of hidden inside a blended number.'
    ],
    process: [
      ['Walk the operation', 'Record traffic, carts, furniture, public hours, access controls and spaces that cannot be offline together.'],
      ['Test and specify', 'Check substrate conditions and match product, adhesive, transitions and slip performance to each zone.'],
      ['Phase the work', 'Create a sequence for demolition, preparation, installation, cure and reopening with accountable handoffs.'],
      ['Turn over the file', 'Provide product records, attic-stock guidance, cleaning requirements and repair notes for facilities staff.']
    ]
  }
};

const cities = {
  'lakewood-ranch': {
    slug: 'lakewood-ranch',
    name: 'Lakewood Ranch',
    county: 'Manatee and Sarasota counties',
    zips: '34202 and 34211',
    tagline: 'new-build slabs, large open plans and community approval details',
    areas: ['Country Club East', 'Greenbrook', 'Summerfield', 'Waterside', 'Del Webb', 'Star Farms'],
    profile: [
      'Lakewood Ranch flooring projects often begin in newer homes with large uninterrupted rooms, tall sliders and builder-selected finishes. A young slab can still transmit moisture, and long sightlines make every layout decision visible. We therefore treat moisture readings, flatness mapping and plank or tile direction as design inputs—not paperwork completed after a product is sold.',
      'The community mix ranges from detached estate homes to villas, coach homes and 55+ neighborhoods. Attached housing may have acoustic or architectural-review requirements, while gated access and limited work windows affect delivery and crew scheduling. The written plan should account for those rules before demolition is placed on a calendar.'
    ],
    substrate: 'Many homes are slab-on-grade and relatively new. New does not mean flat or dry: curled control joints, patch transitions and moisture from recent construction are common reasons to test rather than assume.',
    access: 'Gate lists, delivery windows, HOA paperwork and occupied-home sequencing are confirmed before materials and a crew arrive.',
    budget: 'Large open plans can lower installation cost per square foot, but long runs, premium formats and builder-floor removal may add preparation and transition work.',
    angles: {
      tile: {
        existing: true,
        titleTag: 'Large-Format & Lanai Tile',
        headline: 'Large-format tile planned for long Lakewood Ranch sightlines',
        lead: 'In Lakewood Ranch, tile usually needs to look calm across an open kitchen, great room and lanai axis. That pushes the project toward rectified porcelain, balanced cuts and a layout established from the architecture rather than from whichever wall is easiest to start against.',
        local: 'Young concrete, bright slider light and long rooms magnify lippage. We map the slab for high seams and shallow depressions, check tile warpage and choose an offset the manufacturer permits. For lanai-adjacent rooms, traction and movement accommodation receive the same attention as color.',
        choices: 'Popular scopes include large-format stone looks, wood-look porcelain through living areas, spa-style primary bathrooms and slip-aware tile near pool entries. Villas and coach homes may also need an acoustic membrane and association packet before hard-surface replacement begins.',
        projects: ['Large-format porcelain in open great rooms', 'Primary-bath and curbless-shower tile', 'Lanai-adjacent floors with wet-traction priorities']
      },
      hardwood: {
        titleTag: 'Engineered Wood for New Homes',
        headline: 'Wide-plank engineered hardwood without guessing about the slab',
        lead: 'Lakewood Ranch owners often want the warmth of real oak to replace a uniform builder floor. Engineered hardwood is normally the practical route over concrete, especially in wide-plank formats that complement large rooms without the height buildup a solid-wood sleeper system can require.',
        local: 'A recently built home can hold construction moisture longer than its finishes suggest. We compare slab readings with the adhesive limits, condition the wood inside the controlled home and plan around south- and west-facing glass that can create strong surface-temperature swings.',
        choices: 'Low-gloss oak, longer board mixes and sawn-face veneers suit the Ranch’s open plans. In active 55+ homes, we also discuss texture, bevel depth and flush transitions so the floor remains comfortable and simple to maintain rather than merely impressive on sample day.',
        projects: ['Wide-plank oak for estate great rooms', 'Builder-floor replacement before move-in', 'Flush-transition wood in 55+ single-story plans']
      },
      laminate: {
        titleTag: 'AC4 Floors for Busy Homes',
        headline: 'Scratch-resistant laminate for active Lakewood Ranch households',
        lead: 'Laminate earns attention in Lakewood Ranch when owners want a crisp wood visual and strong scratch resistance without the cost of engineered hardwood. AC4 products are a useful baseline for busy hallways, home offices and pet traffic, provided water exposure is honestly screened first.',
        local: 'Open plans create long floating-floor runs, and islands or fixed cabinetry can pinch a floor that was not laid out correctly. We calculate run length, expansion breaks and transition locations before installation, then verify the slab is flat enough for the locking system to stay supported.',
        choices: 'Embossed matte planks work well in bright interiors because they reduce glare and disguise sand. Kitchens can be evaluated product by product, but laundry rooms, pool entries and other standing-water risks are often better served by LVP or porcelain.',
        projects: ['AC4 laminate for upstairs bonus rooms', 'Builder-carpet replacement in bedrooms', 'Wood-look upgrades for home offices and dens']
      },
      carpet: {
        titleTag: 'Bedrooms & Stairs',
        headline: 'Carpet selected for quiet rooms, stairs and comfortable 55+ living',
        lead: 'Carpet remains a practical Lakewood Ranch choice for bedrooms, media rooms and stairs where quiet and softness matter more than water resistance. The right combination is not automatically the plushest sample; fiber resilience, cushion density and secure stair detailing determine how the installation ages.',
        local: 'Two-story family homes need seam and stair plans that tolerate concentrated traffic, while 55+ single-story homes often benefit from a firmer pad that feels stable underfoot. Attached villas may favor carpet because its acoustic performance is straightforward for upstairs rooms.',
        choices: 'Nylon suits stairs and heavily used halls, triexta balances stain resistance and softness, and solution-dyed options help pet households. We show carpet and pad as separate line items so a premium face fiber is not undermined by an anonymous cushion.',
        projects: ['Quiet bedroom suites and media rooms', 'Power-stretched carpet on broad upstairs plans', 'Bound runners and fully upholstered staircases']
      },
      'commercial-flooring': {
        titleTag: 'Office & Medical Floors',
        headline: 'Commercial flooring phased around Lakewood Ranch operations',
        lead: 'Lakewood Ranch’s medical offices, professional suites, fitness concepts and retail spaces need flooring that can be installed with limited downtime. The useful plan starts with operating hours, rolling loads and cleaning routines, then selects the material—not the other way around.',
        local: 'Many spaces are newer but still need slab-moisture testing before glue-down products. Multi-tenant access, elevator or loading rules and weekend security are added to the phase plan so a technically sound floor does not create an operational surprise.',
        choices: 'Commercial LVT handles public-facing areas, carpet tile helps office acoustics and modular repairs, and porcelain belongs in selected lobbies or restrooms. Maintenance guidance and attic stock are part of turnover because a facility should be able to repair one zone without replacing the field.',
        projects: ['Medical and professional office suites', 'Retail floors installed after closing', 'Carpet-tile and LVT zoning for shared workplaces']
      }
    }
  },
  sarasota: {
    slug: 'sarasota',
    name: 'Sarasota',
    county: 'Sarasota County',
    zips: '34231–34243',
    tagline: 'condo rules, coastal exposure and mixed-age substrates',
    areas: ['Downtown Sarasota', 'Southside Village', 'Gulf Gate', 'Palmer Ranch', 'Arlington Park', 'Siesta Key'],
    profile: [
      'Sarasota flooring work ranges from mid-century slab homes and preserved terrazzo to downtown towers and coastal properties. The substrate, association rules and access plan can vary more between two nearby projects than the material itself, so useful estimates begin with the building type and existing floor—not a citywide flat price.',
      'Seasonal occupancy, salt and sand near the keys, elevator protection and restricted work hours shape many local projects. Hard-surface condo replacements may require product data, acoustic test reports, certificates of insurance and board approval. Those documents belong in preconstruction rather than in an emergency email on installation morning.'
    ],
    substrate: 'Expect a mix of terrazzo, older concrete, patchwork from earlier renovations and high-rise slabs. Each surface needs a bond, flatness and moisture strategy appropriate to what is actually present.',
    access: 'Condo elevators, loading reservations, hallway protection, work-hour rules and seasonal owner schedules are built into the plan when applicable.',
    budget: 'Building logistics and association requirements can affect labor more than distance does; a clear quote separates those costs from the flooring itself.',
    angles: {
      tile: {
        existing: true,
        titleTag: 'Coastal Bathrooms & Wood-Look',
        headline: 'Porcelain and wet-area assemblies for Sarasota homes and condos',
        lead: 'Sarasota tile projects often combine coastal design with practical water management. Wood-look porcelain, large-format stone visuals and carefully waterproofed bathrooms can handle sand, humidity and seasonal vacancies when the substrate and movement details are built correctly.',
        local: 'Older terrazzo may be a sound substrate worth preserving beneath a new assembly; condo bathrooms require extra care because a leak can damage another residence. We review the building rules, protect common paths and document waterproofing steps before the decorative tile hides them.',
        choices: 'Matte porcelain reduces glare in bright rooms, epoxy or high-performance grout can reduce wet-area maintenance, and acoustic membranes may be required under tile replacing carpet in multi-story buildings.',
        projects: ['Condo bathroom and shower renovations', 'Wood-look porcelain in coastal homes', 'Tile assemblies over suitable terrazzo']
      },
      hardwood: {
        titleTag: 'Engineered Wood for Coastal Homes',
        headline: 'Real wood chosen for Sarasota humidity, condos and bright interiors',
        lead: 'Hardwood in Sarasota works best when owners choose a construction and installation method for the actual building. Engineered oak is usually the safer choice over concrete and in conditioned coastal homes because its layered core is more stable than a solid board during humidity changes.',
        local: 'Condo projects may need acoustic documentation beneath a floating or glue-down wood system, while older mainland homes can present terrazzo, patch transitions or slab moisture. Seasonal residents also need a realistic plan for indoor temperature and humidity while the property is vacant.',
        choices: 'Low-gloss, textured finishes hide fine sand and strong daylight better than high sheen. Wider planks can suit Sarasota’s open interiors, but the board construction, wear layer and adhesive system carry more value than width alone.',
        projects: ['Engineered oak in downtown condos', 'Glue-down wood over prepared mainland slabs', 'Low-gloss wide planks for coastal light']
      },
      laminate: {
        titleTag: 'Water-Resistant Wood Looks',
        headline: 'Laminate for Sarasota rooms where scratch resistance leads',
        lead: 'Laminate can be a smart Sarasota floor in dry bedrooms, offices and living areas where owners want detailed wood visuals and strong abrasion resistance. It is not the default recommendation for every coastal room, because a wood-fiber core still needs protection from leaks and standing water.',
        local: 'We screen ground-floor slabs, condo acoustic rules and seasonal HVAC plans before specifying a system. Existing terrazzo or tile may remain when it is sound, flat and compatible with the approved underlayment, but height at doors and appliances must be checked first.',
        choices: 'AC4 matte planks suit pet traffic and sandy shoes. For kitchens the product warranty and household habits matter; for bathrooms, laundry rooms and storm-entry zones, waterproof vinyl or porcelain is usually the clearer choice.',
        projects: ['Bedroom upgrades in seasonal condos', 'Scratch-resistant floors for pet owners', 'Floating systems over suitable existing tile']
      },
      carpet: {
        titleTag: 'Condo-Quiet Bedrooms & Stairs',
        headline: 'Quiet, comfortable carpet for Sarasota condos and homes',
        lead: 'Carpet continues to make sense in Sarasota bedrooms, upstairs rooms and staircases where sound control and comfort matter. In many condos it is also the simplest way to maintain the acoustic character an association expects without engineering a hard-surface assembly.',
        local: 'High-rise access turns roll planning and delivery timing into part of the job. Seams are positioned around room geometry and window light, common paths are protected and old carpet is removed in a sequence that respects elevator reservations and building hours.',
        choices: 'Solution-dyed fibers help with intense light and stains, nylon performs well on stairs, and moisture-barrier cushion can be useful for pets. Seasonal homes need a cleaning and humidity plan that prevents odor or residue from sitting through long vacancies.',
        projects: ['Condo bedrooms with quiet cushion systems', 'Stair carpet and bound runners', 'Fast seasonal-home refreshes before arrival']
      },
      'commercial-flooring': {
        titleTag: 'Hospitality, Office & Medical',
        headline: 'Commercial floors built around Sarasota guests, patients and staff',
        lead: 'Sarasota commercial flooring must often balance a refined public image with sand, rolling traffic, frequent cleaning and limited shutdown windows. The scope should connect design, slip performance, maintenance and phasing so the floor still works after opening day.',
        local: 'Downtown loading, shared buildings and hospitality operating hours can control the schedule. Coastal entries need walk-off strategy and finishes that tolerate grit; medical and professional suites need low-disruption sequencing and clearly documented products.',
        choices: 'Glue-down LVT suits many public and clinical areas, carpet tile supports acoustics and modular repair, and commercial porcelain can serve selected lobbies or restrooms. The maintenance program is reviewed before the product is approved.',
        projects: ['Hospitality and guest-facing renovations', 'Medical and professional suites', 'After-hours retail and restaurant flooring']
      }
    }
  },
  parrish: {
    slug: 'parrish',
    name: 'Parrish',
    county: 'Manatee County',
    zips: '34219',
    tagline: 'young slabs, builder finishes and fast-growing neighborhoods',
    areas: ['North River Ranch', 'Silverleaf', 'Cross Creek', 'Canoe Creek', 'Harrison Ranch', 'River Wilderness'],
    profile: [
      'Parrish flooring demand is strongly tied to new construction and recently delivered homes. Owners frequently replace builder carpet or entry-grade plank before moving in, extend a hard surface through an open plan or correct transitions between design-center selections. The cleanest timing is before furniture arrives, but new concrete still needs testing and flatness verification.',
      'Large single-story layouts, long hallways and kitchen islands make expansion planning and layout direction visible. Communities also differ in access, work-hour and exterior-delivery rules. A pre-install walk-through should capture those logistics along with slab joints, patch compounds and moisture conditions.'
    ],
    substrate: 'Young concrete can retain construction moisture, and drywall or paint trades may leave patching or surface contamination. We test, clean and map the slab instead of assuming a new home is installation-ready.',
    access: 'Move-in dates, builder punch lists, gate access and overlapping trades are coordinated so the flooring is not damaged by work that should have finished first.',
    budget: 'Empty-home installation can reduce furniture and phasing costs, while builder-floor removal and widespread slab correction should still be itemized.',
    angles: {
      tile: {
        titleTag: 'New-Build Floors & Showers',
        headline: 'Tile that upgrades Parrish builder finishes without inheriting their shortcuts',
        lead: 'Parrish owners often choose tile to replace a basic bathroom package, extend porcelain into main living areas or create a more durable lanai connection. New construction makes access easier, but it does not remove the need to verify slab flatness, joints and moisture.',
        local: 'Large-format tile can expose the ridges and shallow depressions left by production schedules. We map the floor against the selected format, plan balanced cuts around kitchen islands and carry movement accommodation through long sunlit rooms.',
        choices: 'Wood-look porcelain works for whole-home durability, stone-look panels suit contemporary bathrooms, and slip-aware surfaces belong near pool and lanai doors. Shower upgrades include the waterproofing assembly, not only a decorative wall change.',
        projects: ['Large-format upgrades before move-in', 'Builder-bath shower and floor replacements', 'Wood-look porcelain through open plans']
      },
      hardwood: {
        titleTag: 'Wide-Plank Engineered Wood',
        headline: 'Engineered hardwood timed for Parrish move-ins and young slabs',
        lead: 'A vacant new home is an ideal installation window for wide-plank engineered hardwood, provided the building is dry, conditioned and finished with wet trades. Installing before furniture arrives simplifies glue-down work and protects the visual continuity owners want through large living areas.',
        local: 'The slab age makes moisture readings especially important. We also inspect curing compounds, patch materials and paint or drywall contamination that can interfere with adhesive. Builder schedules are not proof that a surface is ready for a wood system.',
        choices: 'Mid-tone matte oak is forgiving of sand and strong window light, while thicker wear layers support future repair. We compare real wood with premium laminate and LVP when pets, pool traffic or long seasonal vacancies change the risk profile.',
        projects: ['Pre-move-in wide-plank installations', 'Builder-carpet replacement in bedrooms', 'Continuous engineered wood through great rooms']
      },
      laminate: {
        titleTag: 'Builder-Floor Upgrades',
        headline: 'AC4 laminate as a practical Parrish new-home upgrade',
        lead: 'Laminate gives Parrish owners a cost-controlled way to replace builder carpet with a durable wood visual in bedrooms, offices and living areas. Installing before move-in reduces furniture handling and lets room-to-room transitions be planned as one system.',
        local: 'Young slabs still require vapor protection, and long new-home hallways demand expansion planning. Kitchen islands, closet systems and heavy built-ins must not trap a floating floor; those fixed elements are mapped before the field is installed.',
        choices: 'AC4 products are a strong fit for active families and pets. Water-resistant collections can serve many kitchens when used within warranty, but laundry rooms and pool entries usually point toward LVP or tile.',
        projects: ['Whole-bedroom packages before move-in', 'Home-office and bonus-room upgrades', 'AC4 floors for pets and growing families']
      },
      carpet: {
        titleTag: 'Bedrooms & Stairs',
        headline: 'Better carpet and pad than the standard Parrish builder package',
        lead: 'Builder carpet is often selected to meet an allowance, not a household’s traffic or comfort needs. Parrish owners can upgrade fiber and cushion before move-in, keep carpet where quiet matters and use hard surfaces in public rooms without accepting one material everywhere.',
        local: 'Empty rooms make seam placement and power stretching efficient, but stair layouts and open upstairs halls still require careful planning. We inspect tack strip and subfloor conditions rather than assuming a new installation should simply cover the builder’s work.',
        choices: 'Triexta supports stain-conscious family rooms, nylon belongs on stairs and busy halls, and a denser pad improves support without making the surface unstable. Pet households can compare solution-dyed fiber and moisture-barrier cushion as separate decisions.',
        projects: ['Pre-move-in bedroom carpet packages', 'Two-story stair and hallway installations', 'Selective carpet with hard-surface main floors']
      },
      'commercial-flooring': {
        titleTag: 'Business Floors',
        headline: 'Commercial flooring for Parrish’s expanding business corridor',
        lead: 'Parrish’s growth brings medical, retail, office and community spaces that need durable floors on practical schedules. New tenant improvements offer a chance to coordinate flooring with millwork and furniture instead of forcing every trade into the same final week.',
        local: 'New commercial slabs still need moisture testing, and construction schedules can pressure adhesive cure times. We sequence substrate work and installation after the wet trades, define protected access and state the reopening requirements for each zone.',
        choices: 'Commercial LVT supports retail and clinical traffic, carpet tile helps offices and meeting rooms, and porcelain fits selected entries or restrooms. Attic stock and maintenance documents are included so a growing operation can repair rather than replace.',
        projects: ['Tenant-improvement LVT and carpet tile', 'Medical and wellness suites', 'Retail and community amenity floors']
      }
    }
  },
  palmetto: {
    slug: 'palmetto',
    name: 'Palmetto',
    county: 'Manatee County',
    zips: '34221',
    tagline: 'older slabs, waterfront exposure and mixed housing stock',
    areas: ['Riviera Dunes', 'Snead Island', 'Sanctuary Cove', 'Historic Palmetto', 'Terra Ceia', 'Artisan Lakes'],
    profile: [
      'Palmetto combines older ranch homes, newer planned neighborhoods, waterfront properties and multi-story residences. That variety makes the substrate history important: one project may involve adhesive residue and slab cracks from several renovations, while the next begins on a newer surface with condo or association requirements.',
      'Waterfront humidity, sandy entries and strong sun influence material selection, but drainage events and plumbing risk should be separated from normal humidity. We evaluate rooms by exposure and use instead of declaring one product the best floor for every Palmetto address.'
    ],
    substrate: 'Older slabs may carry crack repairs, cutback residue, thin-set ridges or mixed patch compounds. Newer waterfront and condo properties can add acoustic and access requirements.',
    access: 'Bridge traffic, gated entries, elevator rules and occupied-home phasing are confirmed when they affect delivery or crew time.',
    budget: 'Preparation varies widely by housing age; line-item grinding, crack treatment and patching make a Palmetto quote more useful than a single blended square-foot number.',
    angles: {
      tile: {
        titleTag: 'Older Slabs & Waterfront Tile',
        headline: 'Porcelain tile planned for Palmetto slabs, water and sun',
        lead: 'Tile is a natural fit for Palmetto entries, bathrooms and lanai-connected spaces, but older concrete can carry cracks or adhesive history that the new surface will not forgive. The assembly must address the slab before the porcelain is asked to hide it.',
        local: 'Waterfront homes benefit from low-absorption porcelain and practical grout, while historic or repeatedly renovated houses may need thin-set grinding, crack isolation or a new flatness layer. In condos, hard-surface sound requirements may also affect the underlayment.',
        choices: 'Wood-look porcelain offers a continuous visual without water anxiety, matte stone looks suit bright interiors and slip-aware finishes belong near exterior doors. Wet-area scopes include bonded waterproofing and movement details.',
        projects: ['Tile over corrected older concrete', 'Waterfront bathrooms and entries', 'Wood-look porcelain near lanais']
      },
      hardwood: {
        titleTag: 'Engineered Wood Over Concrete',
        headline: 'Hardwood that respects Palmetto’s slab history and waterfront climate',
        lead: 'Engineered hardwood can bring genuine warmth to Palmetto interiors when the slab and indoor environment support it. Older homes require more investigation because residues, earlier patching and moisture paths can affect the bond even when the surface looks clean.',
        local: 'Waterfront exposure does not automatically rule out wood, but the home must maintain controlled interior conditions and the selected adhesive must match actual readings. We also plan thresholds carefully where wood meets tile at pool, patio or exterior-adjacent rooms.',
        choices: 'Textured, low-gloss oak hides grit and daily wear better than smooth high sheen. For homes with frequent wet traffic, we can keep real wood in controlled living zones and use porcelain or LVP at the riskier perimeter.',
        projects: ['Glue-down engineered wood in ranch homes', 'Mixed wood-and-tile waterfront plans', 'Wide-plank updates in newer communities']
      },
      laminate: {
        titleTag: 'AC4 Floors Over Prepared Slabs',
        headline: 'Laminate for Palmetto dry rooms, pets and value-focused remodels',
        lead: 'Laminate works well in Palmetto bedrooms, offices and dry living areas when owners want scratch resistance and a detailed wood visual. The key is not asking a wood-fiber core to manage the home’s most water-exposed rooms.',
        local: 'Older tile can sometimes stay as a substrate if it is bonded and flat, saving demolition. Bare or patched concrete still needs the approved vapor system, and crack or height transitions are evaluated before a floating floor is ordered.',
        choices: 'AC4 matte planks are practical for pets and sandy shoes. Kitchens are reviewed against each warranty; laundry, waterfront entries and other standing-water zones usually justify LVP or porcelain instead.',
        projects: ['Bedrooms over prepared concrete', 'Floating floors over suitable existing tile', 'Pet-friendly AC4 living areas']
      },
      carpet: {
        titleTag: 'Comfort for Bedrooms & Stairs',
        headline: 'Carpet that adds quiet and traction to Palmetto homes',
        lead: 'Carpet remains useful in Palmetto bedrooms, upstairs spaces and staircases where hard surfaces can feel loud or slippery. Material and cushion choices should reflect pets, seasonal occupancy and the room’s actual traffic rather than the lowest package price.',
        local: 'Older homes can reveal squeaks, loose tack strip or residue after removal, while waterfront properties benefit from fibers and pads that are easy to clean and dry. We do not install new carpet over a questionable or contaminated substrate without addressing it.',
        choices: 'Nylon is resilient on stairs, triexta supports stain-conscious households and solution-dyed products resist fading. A firm, density-rated cushion can feel comfortable without creating unstable footing.',
        projects: ['Bedroom carpet in ranch homes', 'Stair runners for traction and quiet', 'Fast replacements in occupied residences']
      },
      'commercial-flooring': {
        titleTag: 'Business Floors',
        headline: 'Commercial flooring for Palmetto operations and public spaces',
        lead: 'Palmetto commercial projects range from offices and retail to waterfront hospitality and light industrial support spaces. Each needs a surface selected for its traffic, cleaning and exposure—not a single product called commercial flooring.',
        local: 'Older buildings can carry adhesive residue and slab repairs, while waterfront entries see grit and moisture. We test substrates, map operational zones and state when mitigation, aggressive preparation or a more tolerant product is the responsible choice.',
        choices: 'LVT supports public-facing areas, carpet tile controls office acoustics, sheet goods serve suitable seamless applications and porcelain belongs in selected wet or high-visibility zones. Work can be phased around business hours when cure requirements allow.',
        projects: ['Office and retail renovations', 'Waterfront hospitality entries', 'Phased flooring for occupied facilities']
      }
    }
  },
  venice: {
    slug: 'venice',
    name: 'Venice',
    county: 'Sarasota County',
    zips: '34285, 34292 and 34293',
    tagline: '55+ comfort, seasonal homes and coastal maintenance',
    areas: ['Wellen Park', 'IslandWalk', 'Grand Palm', 'Venice Island', 'Venice Gardens', 'Plantation'],
    profile: [
      'Venice flooring decisions often prioritize easy maintenance, comfortable transitions and reliable performance during seasonal occupancy. The area includes established slab homes, newer Wellen Park communities, villas and coastal properties, so the correct assembly depends on building age and use rather than ZIP code alone.',
      'For 55+ households, glare, traction and abrupt height changes can matter as much as color. Seasonal owners also need products and indoor-climate expectations that remain realistic while the home is vacant. We address those practical details in the selection and layout instead of adding them after a product has been chosen.'
    ],
    substrate: 'Expect both older concrete with renovation history and newer slabs that still require moisture and flatness checks. Existing tile and terrazzo are evaluated for bond, height and overlay compatibility.',
    access: 'Gated-community rules, seasonal schedules and lockbox coordination are planned in writing when owners are away or communities restrict deliveries.',
    budget: 'Occupied and furnished homes may need phased work; empty seasonal windows can reduce handling costs if materials, access and approvals are organized in advance.',
    angles: {
      tile: {
        titleTag: 'Slip-Aware Floors & Showers',
        headline: 'Tile for Venice bathrooms, lanais and low-maintenance living',
        lead: 'Porcelain tile suits Venice owners who want long service life and simple water cleanup, especially in bathrooms and lanai-connected rooms. The design should also consider traction, grout maintenance and transition height so durability does not create avoidable daily discomfort.',
        local: 'Older slabs may need crack isolation or thin-set removal, while new communities can present long bright rooms where lippage and glare are obvious. Curbless or low-threshold showers require the drainage and waterproofing plan to begin below the finished tile.',
        choices: 'Matte porcelain, restrained grout joints and slip-aware wet-area finishes are practical. Wood-look planks deliver warmth visually, while larger stone looks can reduce grout in open rooms when the substrate is flat enough.',
        projects: ['Low-threshold and curbless shower tile', 'Matte porcelain for bright single-story homes', 'Lanai-adjacent floors with traction priorities']
      },
      hardwood: {
        titleTag: 'Stable Engineered Wood',
        headline: 'Engineered hardwood for controlled Venice interiors',
        lead: 'Real wood can suit Venice living rooms and bedrooms when the home remains conditioned and water exposure is managed. Engineered construction is normally favored over concrete because it keeps a genuine wood surface while improving dimensional stability.',
        local: 'Seasonal vacancy makes the indoor environment part of the warranty conversation. We discuss thermostat and humidity expectations, test the slab and use low-gloss finishes that tolerate strong Florida daylight and small traces of sand better than glossy surfaces.',
        choices: 'Textured oak with a useful wear layer provides warmth and future repair options. Flush transitions and moderate bevels can make a single-story home easier to navigate, while tile or LVP may remain better at exterior and laundry zones.',
        projects: ['Low-gloss engineered oak in villas', 'Real wood for controlled living zones', 'Flush transitions for single-story plans']
      },
      laminate: {
        titleTag: 'Scratch-Resistant Seasonal Floors',
        headline: 'Laminate for Venice bedrooms, offices and seasonal homes',
        lead: 'Laminate is a value-conscious choice for dry Venice rooms where scratch resistance and realistic wood visuals are more important than standing-water protection. It can work especially well in bedrooms and home offices when the slab, vapor layer and expansion plan are correct.',
        local: 'Seasonal owners need to maintain the indoor range required by the product rather than turning climate control off for months. Existing tile may support an overlay when it is flat and secure, but doors, appliances and transitions must still clear the added height.',
        choices: 'AC4 matte planks reduce glare and handle daily abrasion. For laundry rooms, bathrooms and exterior entries, we compare waterproof LVP or porcelain rather than stretching a laminate warranty beyond its purpose.',
        projects: ['Seasonal-home bedroom packages', 'Home offices and hobby rooms', 'Overlays on suitable existing hard surfaces']
      },
      carpet: {
        titleTag: '55+ Bedrooms & Safer Stairs',
        headline: 'Comfortable carpet with stable footing for Venice homes',
        lead: 'Carpet gives Venice bedrooms and stairs warmth, sound absorption and traction that hard floors cannot match. For 55+ households, a supportive cushion and secure transitions can be more useful than an extra-soft pad that feels unstable underfoot.',
        local: 'Seasonal homes benefit from low-residue cleaning and fibers that tolerate strong light. Staircases need fresh tack strip, correct pad and a deliberate waterfall, Hollywood or runner detail rather than a quick stretch over aging components.',
        choices: 'Nylon is resilient for stairs and halls, triexta supports stain resistance and solution-dyed options work for pets and sun. Firm 8-pound cushion is a common comparison point, with thickness chosen to match the carpet warranty.',
        projects: ['Supportive bedroom carpet in 55+ homes', 'Bound runners and safer stair surfaces', 'Seasonal replacements coordinated by lockbox']
      },
      'commercial-flooring': {
        titleTag: 'Medical, Retail & Hospitality',
        headline: 'Commercial floors designed for Venice guests and daily operations',
        lead: 'Venice medical, retail, hospitality and professional spaces serve both year-round residents and seasonal volume. Flooring needs to manage carts, walkers, sand, cleaning and limited shutdowns while keeping public areas calm and easy to navigate.',
        local: 'Entry matting, wet traction and low-glare surfaces matter in bright coastal buildings. Gated or shared properties can add access restrictions, and occupied suites need a zone plan that keeps essential rooms available throughout the project.',
        choices: 'Commercial LVT supports rolling traffic and repair, carpet tile helps acoustic zones, and selected sheet or porcelain systems suit rooms with different hygiene or water demands. Transition profiles and maintenance chemistry are specified with the floor.',
        projects: ['Medical and therapy suites', 'Retail and hospitality refreshes', 'Low-downtime professional offices']
      }
    }
  }
};

const articles = [
  {
    slug: 'concrete-slab-moisture-flooring-florida',
    title: 'Concrete Slab Moisture and Flooring in Florida: What to Test Before Installation',
    metaTitle: 'Concrete Slab Moisture & Flooring in Florida | Test Guide',
    description: 'A practical guide to slab moisture tests, vapor barriers, adhesives and floor choices for Florida homes before LVP, hardwood, laminate or tile installation.',
    dek: 'A dry-looking slab can still transmit enough vapor to damage adhesive, wood fiber or a locking floor. Here is what a useful pre-installation moisture conversation should cover.',
    sections: [
      ['Why a concrete slab can look dry and still affect flooring', [
        'Concrete is porous. Water vapor can move from the ground, through the slab and toward the drier conditioned interior even when there is no visible puddle. Florida’s warm, humid conditions and slab-on-grade construction make that movement a routine design consideration rather than an unusual defect.',
        'Different floor systems react differently. Porcelain itself is not harmed by vapor, but salts, adhesives, patch materials and membranes can be. Engineered wood depends on the moisture tolerance of its adhesive and construction. Laminate cores can swell. Floating LVP will not absorb water like wood, yet trapped moisture may still contribute to odor, residue or warranty disputes.',
        'The goal of testing is not to “pass” every slab. It is to match the reading and conditions to a product, preparation and installation method that the manufacturers support.'
      ]],
      ['Common tests and what their numbers actually mean', [
        'Relative-humidity testing evaluates conditions inside the slab using in-situ probes. Calcium-chloride testing estimates moisture-vapor emission at the surface over a defined period. Surface meters can help scan and compare areas, but many are not a substitute for the quantitative method required by an adhesive or floor manufacturer.',
        'A result has meaning only beside the written limits for the exact adhesive, primer, patch and floor system. One product may allow a higher reading with a moisture-tolerant adhesive, while another requires mitigation. Test location, ambient conditions and recent weather or HVAC operation can also affect interpretation.',
        'Ask for the test method, readings, locations and product limits in writing. “The slab felt dry” and “we have never had a problem here” are not equivalent to documented conditions.'
      ]],
      ['Vapor barriers, moisture mitigation and waterproof flooring', [
        'A below-slab vapor retarder is part of the building, but its presence and condition may be unknown in an older home. A topical mitigation system is applied above the concrete when testing and the selected assembly justify it. A floating floor may use an approved film or combination underlayment, while glue-down wood or LVT may need a compatible liquid system or moisture-tolerant adhesive.',
        '“Waterproof flooring” describes how the finished plank responds to surface water; it does not certify the concrete below. Product marketing and substrate requirements answer different questions. Following both protects the installation and the warranty.',
        'Mitigation should be priced as a defined system with preparation requirements, coverage and compatible materials—not as an unnamed bucket rolled onto dusty concrete.'
      ]],
      ['What happens after a high reading', [
        'A high reading does not automatically cancel the project. Options may include changing adhesive, applying a compatible mitigation system, selecting a more tolerant floor or investigating drainage and plumbing when the pattern suggests an abnormal source.',
        'The responsible response depends on the room and severity. A localized wet area near a door or plumbing wall deserves investigation. Uniform elevated readings across a grade-level slab may point toward the vapor-management strategy. Any active leak should be repaired before a floor is used to conceal it.',
        'The quote should show the added system, the preparation it needs and which warranty limits it is intended to satisfy.'
      ]],
      ['Questions to ask during an estimate', [
        'Ask which test will be used, which product limit it will be compared with, whether the adhesive and patch are compatible, and how results will be recorded. Confirm whether mitigation is included, an allowance or a decision made after demolition.',
        'For wood and laminate, ask about indoor humidity expectations after installation. For condos, add the acoustic system to the discussion so the moisture layer, sound layer and manufacturer requirements do not conflict.',
        'A short written record is more useful than a long promise. It gives the homeowner, installer and manufacturer the same reference if questions arise later.'
      ]],
      ['Floor-by-floor moisture priorities', [
        'A floating LVP project needs a flat slab, dry perimeter conditions and an underlayment or vapor strategy that matches the plank instructions. A glue-down resilient floor is less forgiving because moisture, old adhesive and surface contamination can interfere directly with the bond. The word waterproof on a carton does not answer either installation question.',
        'Porcelain tile tolerates surface water well, yet the assembly still depends on sound concrete, compatible patching and movement accommodation. Engineered hardwood adds product-specific moisture limits and indoor humidity expectations. Laminate needs particular attention at exterior doors, kitchens and slab edges because water can enter joints even when the wear surface is durable.',
        'The useful comparison is not which material is universally best. It is which complete system fits the measured slab, room use, maintenance plan and manufacturer limits. That is why two homes on the same Bradenton street can need different preparation beneath the same-looking floor.'
      ]],
      ['Red flags and documentation', [
        'Be cautious when an estimate promises that every slab is dry enough without testing, treats a plastic sheet as an automatic cure, or names a moisture product without stating what triggers its use. Another warning sign is a single preparation price with no description of grinding, patching, crack work, adhesive removal or testing.',
        'Good documentation can be simple: dated readings, the test method, room locations, product data sheets and photographs of unusual conditions. It should connect the observation to a decision, such as using a specific primer or postponing installation. Records are most useful when they are created before the floor hides the slab.',
        'If demolition reveals a condition that was not visible during the estimate, pause and document it before approving added work. Ask how the change affects price, schedule and warranty. That keeps a legitimate field discovery from becoming an open-ended allowance and gives everyone the same explanation for the revised scope.'
      ]]
    ],
    faqs: [
      ['Can a new Florida concrete slab have too much moisture for flooring?', 'Yes. New concrete can retain construction moisture even when the home is ready for other finishes. Testing compares current conditions with the exact floor, adhesive and preparation system rather than assuming age alone makes a slab ready.'],
      ['Does waterproof LVP eliminate the need for slab moisture testing?', 'No. Waterproof describes the plank’s response to surface water. Substrate vapor can still affect adhesives, residues, odor, underlayment and warranty coverage, so the proposed assembly must address the slab.'],
      ['Can tile be installed over a damp slab?', 'Porcelain is moisture resistant, but mortar, membranes, grout and salts can still be affected. The slab condition and product requirements should be evaluated, especially for large-format tile, moisture-sensitive stone or resin-based materials.'],
      ['What should a moisture report include?', 'It should identify the test method, date, room or location, numerical readings, ambient conditions when relevant and the published limit of the proposed installation materials.'],
      ['Is a vapor barrier the same as moisture mitigation?', 'Not always. A below-slab vapor retarder is part of the building. Topical mitigation is a compatible system applied to the prepared slab. Floating floors may use separate approved films; each serves a specific assembly.']
    ]
  },
  {
    slug: 'best-flooring-for-florida-humidity',
    title: 'Best Flooring for Florida Humidity: A Room-by-Room Decision Guide',
    metaTitle: 'Best Flooring for Florida Humidity | Room-by-Room Guide',
    description: 'Compare LVP, porcelain tile, engineered hardwood, laminate and carpet for Florida humidity, sun, slabs, pets, kitchens, bedrooms and seasonal homes.',
    dek: 'Humidity matters, but it is only one part of the decision. Water exposure, sunlight, substrate, comfort, maintenance and the way a room is used usually produce a better answer.',
    sections: [
      ['Start with exposure, not with a product ranking', [
        'There is no single floor that wins every Florida room. A kitchen near a pool slider, an upstairs bedroom, a seasonal condo and a waterfront rental face different risks. Separate everyday humidity from standing water, direct sun, sand, rolling loads and acoustic requirements before comparing materials.',
        'A product can tolerate humid air and still fail over an unprepared slab. Conversely, a sensitive-looking material such as engineered hardwood can perform well when construction, adhesive, acclimation and indoor control are appropriate. The installation system and the room belong in the same decision.',
        'Use a short hierarchy: eliminate products that cannot handle the exposure, compare the remaining choices for comfort and appearance, then verify substrate and building rules.'
      ]],
      ['Kitchens, laundry rooms and entries', [
        'Porcelain tile offers the strongest long-term resistance to water, heat and abrasion. Rigid-core LVP is warmer and quieter underfoot, installs faster and is easier to replace later. Both can work well when the substrate is flat and the perimeter details are correct.',
        'Laminate may carry a surface-water warranty, but plumbing leaks and prolonged standing water remain a different risk. Engineered wood belongs in controlled kitchens only when the owner accepts the maintenance and water response. Carpet is normally reserved for dry rooms.',
        'At exterior doors, consider sand, wet traction, matting and the transition to outdoor surfaces. A beautiful floor that becomes slippery or impossible to clean at the main entry is the wrong specification.'
      ]],
      ['Living rooms and open plans', [
        'LVP creates a continuous wood look at a moderate cost and feels more forgiving than tile. Porcelain offers longer service life and better resistance to intense sun. Engineered hardwood brings a real wood surface and repair potential, while laminate provides sharp visuals and scratch resistance at a lower price.',
        'Long rooms make flatness, layout direction and expansion planning important. Islands, cabinetry and large sliders should be mapped before a floating floor is installed. Tile and glue-down wood also need movement accommodation rather than being locked tightly to every perimeter.',
        'If several products remain viable, compare them in the actual afternoon light and alongside cabinets, baseboards and adjacent rooms—not only under showroom lighting.'
      ]],
      ['Bedrooms, stairs and upstairs rooms', [
        'Carpet remains the quietest and softest choice, especially for bedrooms and stairs. A quality fiber over density-rated cushion can improve comfort and acoustic performance without the cold or hardness of tile.',
        'Laminate and LVP are practical for allergies, pets and easier surface cleaning. Engineered wood gives a premium result on suitable upper wood subfloors. Tile is durable but can transmit more impact sound and feel hard underfoot.',
        'For stairs, material choice affects nosing construction, traction and cost. A stair is not just another group of square feet; it should be measured and quoted as a separate detail.'
      ]],
      ['Seasonal homes and condos', [
        'Seasonal owners should verify the indoor temperature and humidity range required by the floor and adhesive while the property is vacant. Turning climate control off can violate assumptions behind wood, laminate and some resilient-floor warranties.',
        'Condo rules may control sound performance, work hours, elevator use and approval documents. A tested acoustic assembly is more persuasive than a loose claim that a pad is “quiet.” The proposed floor, underlayment and substrate method must be compatible as one system.',
        'LVP and porcelain are frequent choices, but the correct answer still depends on association rules, slab conditions, sunlight and the owner’s comfort priorities.'
      ]],
      ['Sun, air conditioning and everyday operation', [
        'Florida performance is shaped by more than outdoor humidity. Large sliders can heat one section of a floor while air conditioning keeps another area cool. Ask whether the selected product has limits for direct sun or surface temperature, and plan shades or window treatments where intense exposure is part of the room’s normal use.',
        'Continuous climate control matters most for materials that respond to changing indoor conditions. The goal is not to chase one perfect humidity number; it is to keep the home within the manufacturer’s published range and avoid abrupt swings. Seasonal owners should confirm thermostat, dehumidification and monitoring plans before choosing wood or laminate.',
        'Daily habits also influence the decision. Wet shoes near a lanai, sand carried through an entry and condensation around poorly sealed doors create different demands than general humidity. A successful specification connects those real pathways to the floor, transition, perimeter detail and cleaning routine.'
      ]],
      ['A selection worksheet for estimates', [
        'For each room, note the substrate, exterior exposure, pets, rolling loads, expected spills, direct sunlight and desired feel underfoot. Then record whether continuous material, room-to-room transitions or acoustic approval is required. This short worksheet keeps appearance from becoming the only factor in a whole-home decision.',
        'Ask every bidder to identify the exact product, wear or surface specification, installation method, underlayment or adhesive, moisture plan and required preparation. Include trim and stair details. When those items are written consistently, LVP, tile, engineered hardwood, laminate and carpet can be compared as complete systems rather than samples alone.',
        'Finally, match maintenance to the household. A floor that technically survives humidity may still be a poor fit if its grout, gloss, texture or cleaning instructions conflict with the owner’s routine. The best Florida floor is the one whose installation requirements and everyday care are both realistic.'
      ]]
    ],
    faqs: [
      ['What flooring handles Florida humidity best?', 'Porcelain tile and rigid-core LVP are often the most forgiving. Engineered hardwood can also perform well in controlled interiors; laminate and carpet fit specific dry rooms when moisture and indoor conditions are managed.'],
      ['Is engineered hardwood safe in Florida?', 'It can be. Engineered construction is more stable than solid wood, but slab testing, acclimation, compatible adhesive and year-round indoor humidity control remain important.'],
      ['Is tile always better than LVP in Florida?', 'No. Tile wins on lifespan, heat and water tolerance; LVP is quieter, warmer, faster to install and easier to replace. Room use and substrate determine which trade-off is better.'],
      ['What floor is best for a Florida home with pets?', 'Textured LVP and porcelain are strong all-around choices. AC4 laminate resists scratches in dry rooms, while solution-dyed carpet with appropriate cushion can serve bedrooms.'],
      ['Should the same flooring run through the entire house?', 'Only when one material suits every exposure and the layout allows it. Many strong Florida plans use one main floor with tile or another specialized surface in the wettest or brightest zones.']
    ]
  },
  {
    slug: 'flooring-installation-timeline-florida',
    title: 'How Long Does Flooring Installation Take? Florida Project Timelines by Material',
    metaTitle: 'How Long Does Flooring Installation Take? Florida Timelines',
    description: 'Realistic flooring installation timelines for LVP, tile, hardwood, laminate and carpet, including removal, slab prep, condo approvals and cure time.',
    dek: 'Installation days are only one part of the calendar. Product delivery, approvals, demolition, floor preparation, cure time and trim can matter just as much.',
    sections: [
      ['The timeline starts before demolition', [
        'A reliable schedule begins with measurement, product availability and the building’s approval requirements. Special-order material, condo documents and coordinated delivery can take longer than the physical installation. A date promised before those items are confirmed is a target, not a plan.',
        'The estimate should identify who moves furniture, disconnects appliances, removes old flooring and handles baseboards. Those responsibilities affect the first working day and prevent the crew from discovering that the room is not ready.',
        'For occupied homes, sequencing matters. Completing one zone before opening the next can keep bedrooms or kitchens usable, but it can add handling and transition time compared with an empty-home project.'
      ]],
      ['LVP and laminate timelines', [
        'A straightforward floating LVP or laminate installation can move quickly once the substrate is ready. Many single-story residential projects fall within two to five working days, but tile demolition, widespread leveling, long runs and detailed stairs can extend that range.',
        'Material acclimation rules vary. Some rigid-core products need little time in a conditioned space; laminate and other products may require more. The manufacturer’s instructions—not a blanket “24-hour” rule—should set the expectation.',
        'Transitions, baseboards and door undercuts belong in the schedule. A floor is not complete when the last field plank clicks together.'
      ]],
      ['Tile timelines and cure windows', [
        'Tile typically takes longer because demolition, substrate correction, setting, grout and cure occur in stages. A medium residential floor may take four to eight working days; showers, mosaics and large-format work can take longer.',
        'Mortar and grout need protected time before traffic, furniture or water exposure. Rapid-setting products can solve selected schedule problems, but they are not a reason to rush waterproofing, layout or coverage checks.',
        'Shower schedules should include membrane installation, cure where required, flood testing, tile, grout, sealant and final cure before use.'
      ]],
      ['Hardwood and carpet timelines', [
        'Engineered hardwood requires environmental and material readings, not simply a delivery date. Conditioning may take several days, followed by preparation and three to seven working days for many residential installations. Stairs and patterns add time.',
        'Carpet is often the fastest finish. Many bedroom or whole-home scopes take one to three working days after removal and preparation. Roll availability, seam planning, stairs and furniture movement can still influence the calendar.',
        'A fast installation is valuable only when preparation and cure are protected. The shortest responsible schedule is better than the shortest advertised one.'
      ]],
      ['How to make the project move smoothly', [
        'Select and order material before locking the crew date. Complete painting and wet trades first. Confirm access, parking, elevators and gate lists. Remove small valuables and identify where furniture will go. Keep pets and children away from active zones.',
        'Ask for a day-by-day outline with decision points for unforeseen substrate work. A clear allowance and approval process is more useful than pretending no slab will ever need correction.',
        'At handoff, allow time for a walkthrough, cleaning, care instructions and warranty records. Those final steps make the project easier to own after the crew leaves.'
      ]],
      ['Three realistic project scenarios', [
        'A single empty bedroom with prepared concrete and in-stock floating flooring may move from removal to installation quickly. A furnished whole-home LVP project needs phasing, furniture movement, transitions and time to keep essential rooms usable. Similar square footage does not create a similar calendar when access and occupancy differ.',
        'A tile replacement usually adds demolition, dust control, disposal, surface correction, setting and grout cure. A carpet replacement can be faster, but stairs, seams, custom transitions and moving heavy furniture add labor. Product type changes the sequence as much as the room size does.',
        'A condo project may include association approval, insurance documents, freight-elevator reservations and limited work hours before physical installation starts. Treat those items as schedule tasks rather than surprises. A start date is credible only after material, approvals, access and substrate decisions are aligned.'
      ]],
      ['Schedule red flags', [
        'Be careful with a completion promise made before the estimator sees the substrate, measures stairs or confirms material availability. Another warning sign is a schedule that assigns no time to patch cure, adhesive open time, grout cure or required acclimation. Those intervals belong in the plan when the selected system requires them.',
        'Ask what happens if hidden adhesive, hollow tile, cracks or uneven concrete appear after removal. A responsible answer identifies who documents the condition, how added work is priced and when the customer approves it. Without that process, a confident finish date can turn into rushed preparation or an undefined delay.',
        'The final schedule should name the work zones, expected daily access, furniture responsibility and handoff steps. It should also distinguish installation completion from safe return to normal use. That difference matters for moving appliances, placing rugs, washing tile or allowing heavy traffic.'
      ]]
    ],
    faqs: [
      ['Can flooring be installed in one day?', 'A small carpet or floating-floor room sometimes can. Whole-home projects usually need removal, preparation, installation and finishing across multiple days, and tile or adhesive systems require cure time.'],
      ['How long does 1,500 square feet of LVP take?', 'Many straightforward projects take roughly three to five working days, but tile demolition, widespread leveling, stairs, occupied-home phasing and trim can add time.'],
      ['Can I stay home during flooring installation?', 'Often yes. The work can be phased, but noise, dust, adhesive restrictions and furniture movement should be discussed. Some households prefer to leave during demolition.'],
      ['How long before furniture can go back on tile?', 'It depends on the mortar and grout products. Light traffic may be allowed earlier, while heavy furniture and wet use require the stated cure. Follow the product-specific schedule provided at turnover.'],
      ['What commonly delays a flooring project?', 'Material backorders, condo approvals, hidden substrate damage, moisture mitigation, extensive leveling, overlapping trades and unplanned furniture or appliance work are common causes.']
    ]
  },
  {
    slug: 'flooring-removal-subfloor-prep-cost',
    title: 'Flooring Removal and Subfloor Prep Costs: What a Complete Quote Should Show',
    metaTitle: 'Floor Removal & Subfloor Prep Cost | Florida Quote Guide',
    description: 'Understand flooring demolition, thin-set grinding, slab leveling, crack repair, moisture mitigation and trim costs before comparing Florida flooring quotes.',
    dek: 'Two quotes with the same square-foot price can cover very different work. Demolition and preparation are where the hidden gaps usually live.',
    sections: [
      ['Why the material price is only the beginning', [
        'The finished floor is supported by demolition, disposal, cleaning, slab or subfloor correction, moisture control, transitions and trim. A proposal that combines all of those into one vague line makes it difficult to compare bids or understand a change order.',
        'Existing carpet is usually faster to remove than bonded wood or tile. Tile demolition also leaves thin-set that may need grinding. Glue, cutback residue, patch compounds and multiple flooring layers can change the labor and disposal plan.',
        'A line-item estimate should show known scope separately from allowances for conditions that cannot be measured until the old floor is gone.'
      ]],
      ['Removal ranges and what changes them', [
        'Local planning ranges often run from about $0.75 per square foot for straightforward carpet removal to $3.50 or more for difficult bonded or tile systems. These are budgeting anchors, not bids. Floor thickness, adhesive, access, occupied furniture and disposal volume all matter.',
        'Ask whether removal includes haul-away, tack strip, staples, baseboards, thin-set grinding and final cleaning. “Demo included” may mean only that the visible finish is lifted.',
        'Condo elevators, protected corridors, restricted work hours and high-rise disposal routes can add labor that a ground-floor empty home does not require.'
      ]],
      ['Flatness correction, patching and leveling', [
        'Flooring manufacturers publish flatness requirements because locking systems, large tile and glue-down boards need consistent support. Correction can involve grinding a high seam, feathering a shallow depression, filling cracks or pouring self-leveling material in selected areas.',
        'The word leveling is often used loosely. The goal for many floors is a surface flat within tolerance, not necessarily perfectly level to gravity. A room can intentionally slope and still be flat; a level room can still contain sharp humps that damage a plank joint.',
        'A quote should state whether correction is included, measured after demolition or carried as an allowance with an approval limit.'
      ]],
      ['Moisture, cracks and compatibility', [
        'Moisture testing determines whether the planned adhesive, patch and floor are compatible with the slab. Crack treatment depends on width, movement and the new surface. A membrane can isolate suitable cracks but cannot make structural movement disappear.',
        'Products in the stack must work together. Primer, patch, mitigation, adhesive and finish should come from compatible systems or have written approval for the combination.',
        'Photographs and readings create a useful record. They do not need to become a thick report, but they should be specific enough to explain why a preparation item was required.'
      ]],
      ['Trim, doors, appliances and the finished edge', [
        'Baseboards may be removed and reinstalled, replaced or left in place with a shoe molding. Door jambs may need undercutting. Appliances and exterior doors need clearance. Stair nosings and reducers are material-specific and can have longer lead times than the floor itself.',
        'These items affect both appearance and safety. A cheap transition that creates a lip or a refrigerator trapped by added floor height is not a completed installation.',
        'Compare bids using a checklist: removal, disposal, substrate prep, moisture plan, flooring labor, transitions, baseboards, doors, appliances, furniture, cleaning and warranty documentation.'
      ]],
      ['Example scope comparison', [
        'Imagine two proposals for the same tile-to-LVP conversion. The first total includes tile demolition, haul-away, adhesive grinding, moisture testing, localized patching, new baseboards and appliance movement. The second lists only removal and installation, with preparation billed after the floor is open. The lower headline number is not yet a lower comparable price.',
        'A useful comparison converts every bid into the same columns: measured area, waste, removal method, disposal, substrate work, installation system, trims, stairs, furniture, permits or association requirements, cleanup and warranty. Mark each item as included, excluded, allowance or unknown. Unknowns deserve questions before totals are ranked.',
        'Material upgrades should remain separate from necessary substrate work. A homeowner can choose a different plank or tile, but cannot safely choose away correction that the selected system requires. Keeping those categories separate makes value engineering clearer and prevents design choices from hiding installation risk.'
      ]],
      ['Handling discoveries fairly', [
        'Some conditions cannot be confirmed until existing flooring is removed. The contract should explain how discoveries are photographed, measured and priced before added work begins. Unit prices for common patching, grinding or replacement items can make that process more predictable without pretending the exact quantity is known.',
        'Ask whether a proposed correction covers an isolated area or the full room, and what tolerance or product instruction makes it necessary. A straightedge reading, moisture result or photograph is better evidence than a vague statement that the slab is bad. The explanation should connect directly to the installation being purchased.',
        'When a change is approved, record its cost and schedule effect in writing. If the correction changes the planned adhesive, underlayment or transition height, update those details too. A fair change order closes the loop between the newly visible condition and the completed floor.'
      ]]
    ],
    faqs: [
      ['How much does old flooring removal cost in Bradenton?', 'Budgeting ranges often start near $0.75 per square foot for straightforward carpet and can exceed $3.50 for difficult tile or bonded systems. Access, adhesive, disposal and required grinding determine the actual quote.'],
      ['Is subfloor leveling always necessary?', 'No. Only areas outside the selected floor’s tolerance need correction. A crew should measure and identify high or low areas rather than automatically pricing a full-room pour.'],
      ['Can LVP go over existing tile?', 'Sometimes. The tile must be well bonded and flat enough, grout joints may need filling, and doors, appliances and transitions must tolerate the added height.'],
      ['Does tile removal include thin-set grinding?', 'Not automatically. Confirm that the quote includes removing residual mortar to the flatness required for the new floor, plus dust control and disposal.'],
      ['Why is floor preparation sometimes an allowance?', 'Some conditions are hidden until demolition. A defined allowance with unit prices and an approval process can be fairer than either ignoring the risk or inflating every quote for worst-case work.']
    ]
  },
  {
    slug: 'best-flooring-for-dogs-cats-florida',
    title: 'Best Flooring for Dogs and Cats in Florida: Claws, Accidents, Sand and Heat',
    metaTitle: 'Best Flooring for Dogs & Cats in Florida | Pet Floor Guide',
    description: 'Compare LVP, porcelain tile, laminate, hardwood and carpet for Florida homes with dogs and cats, including traction, scratches, accidents and cleaning.',
    dek: 'The best pet floor is not simply the hardest one. Traction, joints, noise, comfort, cleanup and Florida sand all change the answer.',
    sections: [
      ['Five pet-floor problems to solve', [
        'Claws create abrasion, not just deep scratches. Water bowls and accidents test seams and edges. Sand acts like fine grit under paws. Large dogs need traction, and older animals need some forgiveness under joints. A floor should be evaluated across all five conditions.',
        'The household matters too. A trained cat in a quiet bedroom creates a different risk from two large dogs running between a pool and an open living room. Use the most demanding daily route—not the least-used room—to choose the main floor.',
        'No material eliminates maintenance. Entry mats, nail care, prompt cleanup and the correct cleaner extend every finish.'
      ]],
      ['LVP and porcelain tile', [
        'Textured rigid-core LVP is a strong all-around pet choice because it resists surface water, provides more warmth and forgiveness than tile and can be replaced board by board in suitable installations. A quality locking system and flat substrate help seams stay tight.',
        'Porcelain is the scratch and stain champion. It tolerates accidents and wet entries, but glossy tile can be slippery and the hard surface may be uncomfortable for older pets. Matte texture and practical grout improve the result.',
        'For both materials, avoid assuming texture from appearance. Touch full-size samples and watch a pet walk across them when possible.'
      ]],
      ['Laminate and hardwood', [
        'AC4 laminate offers excellent scratch resistance in dry rooms and often hides abrasion better than soft wood. Its limitation is the wood-fiber core, so accidents and bowls need prompt attention and protected edges.',
        'Engineered hardwood gives a repairable real-wood surface but can dent or scratch. Textured, matte, character-grade finishes disguise wear better than dark, smooth high-gloss boards. Rugs and maintained nails help in running paths.',
        'Owners who value natural aging may accept hardwood marks as patina; owners who want a uniform surface should compare LVP or porcelain.'
      ]],
      ['Carpet, cushion and odor control', [
        'Carpet provides traction, warmth and quiet, especially for bedrooms and stairs. Solution-dyed fibers and stain-resistant construction support cleanup, while a moisture-barrier cushion can keep a small accident from reaching the pad below.',
        'The barrier is not a license to leave moisture in place. Seams, perimeter gaps and repeated contamination still need attention. A firm cushion improves stability for older animals and makes vacuuming more effective than an excessively soft pad.',
        'Carpet tile can be useful in selected utility or commercial pet spaces because damaged modules are replaceable, but it creates a different residential look.'
      ]],
      ['A practical room-by-room pet plan', [
        'Use LVP or porcelain through the main pet route, kitchen and exterior entries. Consider carpet for bedrooms and stairs where traction and quiet matter. Keep real wood in controlled spaces if its appearance justifies the added care.',
        'Plan transitions so paws do not meet sharp metal or abrupt height changes. Place washable mats under bowls and at exterior doors. Keep attic stock for any modular floor and record the product name and dye lot.',
        'During the estimate, identify current accident areas and odors honestly. The substrate may need cleaning, sealing or repair before a new surface is installed.'
      ]],
      ['Cleaning, repairability and attic stock', [
        'Read the care instructions before choosing a texture or finish. Deep embossing and wide grout joints can hold more soil, while very glossy surfaces may show paw marks quickly. Confirm which cleaner, mop method and stain treatment the manufacturer permits so routine pet cleanup does not create a warranty conflict.',
        'Repairability differs by system. A click plank in the middle of a large room may require disassembly from a wall or a specialized replacement method. A glue-down plank or carpet tile can be more locally serviceable, while a spare porcelain tile is useful only if grout color and surrounding pieces can be matched without damage.',
        'Keep labeled attic stock in a dry, conditioned location when the product instructions allow it. Record the manufacturer, collection, color, lot information and installation date. A small reserve is especially valuable because colors and locking profiles can change after the original collection is discontinued.'
      ]],
      ['A pet-floor sample test', [
        'Take shortlisted samples into the rooms where they will be used. View them beside pet hair, under daytime and evening light, and from a low angle that reveals sheen. Walk across them with clean shoes and then with a small amount of typical entry dust to see what the surface visually emphasizes.',
        'Test feel as well as appearance. A stable sample should not be treated as a laboratory slip rating, but it can help compare texture and noise. For stairs and older pets, discuss traction, nosing geometry and runner options instead of assuming the hardest surface is automatically the safest choice.',
        'Bring the preferred sample to the estimate and ask how seams, transitions, perimeter gaps, moisture preparation and future board replacement will work in the actual rooms. The product label answers only part of the pet question; the installation layout and maintenance plan complete it.'
      ]]
    ],
    faqs: [
      ['What flooring is most scratch resistant for dogs?', 'Porcelain tile is extremely scratch resistant. AC4 laminate and quality LVP also perform well, while matte texture and mid-tone visuals help conceal fine abrasion and sand.'],
      ['Is LVP safe for dog accidents?', 'The plank surface resists water, but liquid can reach perimeter gaps or damaged joints. Clean accidents promptly and use a flat, properly locked installation.'],
      ['What flooring gives older dogs better traction?', 'Textured LVP, matte tile and low-pile carpet generally provide better traction than glossy tile or smooth high-sheen wood. Sample the actual surface rather than relying on a photo.'],
      ['Does pet urine ruin a concrete slab?', 'Repeated contamination can leave odor in porous concrete. After removal, the slab may need cleaning, drying and a compatible odor-sealing treatment before new flooring.'],
      ['Is carpet a bad choice with pets?', 'Not automatically. Solution-dyed carpet, a suitable pad and prompt cleaning can work well in bedrooms and stairs. It is less forgiving where accidents are frequent or exterior dirt is concentrated.']
    ]
  },
  {
    slug: 'how-to-compare-flooring-estimates',
    title: 'How to Compare Flooring Estimates: A 21-Point Homeowner Checklist',
    metaTitle: 'How to Compare Flooring Estimates | 21-Point Checklist',
    description: 'Compare flooring quotes line by line: product, quantity, removal, slab prep, moisture, trim, furniture, timeline, payment, warranty and change orders.',
    dek: 'The lowest total is not always the lowest scope. This checklist turns three very different flooring proposals into an apples-to-apples comparison.',
    sections: [
      ['1–5: Identify the exact product and quantity', [
        'A quote should name manufacturer, collection, color, plank or tile size and relevant construction such as wear layer, AC rating, wood wear layer or tile type. “Premium vinyl” is not specific enough to price or warranty later.',
        'Confirm measured square footage, waste percentage, cartons ordered and who owns unopened attic stock. Patterned tile, diagonal layouts and irregular rooms may need more waste than a straight plank installation.',
        'Check whether freight, tax, delivery and stair or trim pieces are included. Accessories can arrive from different suppliers and should be confirmed before the crew date.'
      ]],
      ['6–10: Define demolition and preparation', [
        'List the material being removed, haul-away, thin-set or adhesive removal, tack strip, staples and cleaning. State who moves furniture and disconnects appliances.',
        'The proposal should describe moisture testing and the method used when relevant. Flatness correction can be included, unit-priced or carried as a defined allowance. Crack treatment and mitigation need product compatibility, not a generic promise.',
        'If an overlay is proposed, verify the existing floor’s bond, added height, door and appliance clearance and manufacturer permission.'
      ]],
      ['11–15: Installation details and finished edges', [
        'Identify installation method, underlayment, adhesive, grout, membrane or cushion. Condo work should name the acoustic assembly and who supplies the approval packet.',
        'Confirm baseboard treatment, shoe molding, door jamb undercuts, transitions, stair nosings, vents and caulk or touch-up responsibility. These details are visible every day and commonly excluded from low bids.',
        'Ask who supervises the crew and how unexpected conditions are approved. A written change-order process protects both sides.'
      ]],
      ['16–18: Schedule, access and protection', [
        'Record expected start window, working days, cure or no-traffic time and whether the home stays occupied. Condo elevators, gated access and work-hour rules should be assigned to someone.',
        'Confirm dust control, pathway protection, debris storage and daily cleanup. Tile demolition and grinding require a different containment plan than carpet removal.',
        'Materials and wet trades should be ready before the start date. A schedule dependent on unknown product delivery is not firm.'
      ]],
      ['19–21: Payment, warranty and closeout', [
        'Payment milestones should follow the written scope and applicable contract terms. Avoid a vague final balance that can be changed without written approval.',
        'Separate manufacturer material warranty from installer workmanship warranty. Ask what conditions, maintenance and indoor environment each requires and how a claim is started.',
        'Closeout should include a walkthrough, care instructions, product records, remaining attic stock and correction of the punch list. A complete floor is documented as well as installed.',
        'Before signing, verify the company name, working phone and email, insurance documentation when needed, cancellation terms and the address where notices should be sent. These administrative details do not replace technical scope, but they make responsibility clear if scheduling, access or warranty questions arise after the proposal is accepted.'
      ]],
      ['Three bids that look similar but are not', [
        'One estimate may include measured waste, demolition, disposal, moisture testing, floor preparation, trims and furniture movement. Another may show the same product and square footage but leave those items as after-removal charges. A third may include preparation yet specify a different underlayment or thinner transition package. Their totals do not describe the same purchase.',
        'Normalize each proposal before choosing. Put product, quantity, waste, installation method, substrate assumptions, removal, preparation, stairs, trims, baseboards, furniture, appliances, permits, cleanup and warranty into matching rows. Write included, excluded, allowance or unknown beside every row. That exposes scope differences without guessing at a contractor’s intent.',
        'Then compare the assumptions behind the numbers. If one installer measured a high spot, identified old adhesive or reviewed condo rules while another did not, ask both to address the same condition. The goal is not to force identical methods; it is to understand why each complete system is appropriate.'
      ]],
      ['Questions before the final decision', [
        'Ask which exact material and installation instructions control the job, who is responsible for moisture and flatness testing, and how unforeseen substrate work will be approved. Confirm whether the quoted floor is floating, glued, nailed or set in mortar and whether every component is compatible with that method.',
        'Ask who moves furniture and appliances, how occupied rooms are phased, what dust protection is included, when the area can return to normal use and who handles final cleaning. For condos, verify association documents, elevator scheduling, sound requirements and delivery rules before accepting the proposed start date.',
        'Finally, request the payment schedule, workmanship warranty, manufacturer warranty path, cancellation terms and closeout documents in writing. A good decision balances total scope, installation reasoning, communication and accountability. The cheapest line at the bottom is meaningful only after those elements are comparable.'
      ]]
    ],
    faqs: [
      ['Why do flooring estimates vary so much?', 'They may include different products, waste, demolition, preparation, trim, furniture, access and warranty scope. Compare line items before comparing totals.'],
      ['Should floor leveling be included in a quote?', 'Known correction should be included. Hidden conditions can use a defined allowance or unit price with written approval after demolition.'],
      ['What product details belong in the contract?', 'Manufacturer, collection, color, size, construction or rating, quantity, installation method and key accessories should be identifiable.'],
      ['Is a workmanship warranty different from a product warranty?', 'Yes. The manufacturer covers qualifying product defects under its terms; the installer covers qualifying workmanship under the written labor warranty.'],
      ['What is the biggest red flag in a flooring bid?', 'A vague lump sum with no exact product, preparation scope or change-order process makes it difficult to know what is being purchased or compare it fairly.']
    ]
  }
];

function write(relativePath, content) {
  const fullPath = join(ROOT, relativePath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content.replace(/\r?\n/g, '\n'), 'utf8');
}

function htmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function stripHtml(value) {
  return String(value)
    .replace(/<[^>]+>/g, ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&mdash;', '—')
    .replaceAll('&ndash;', '–')
    .replace(/\s+/g, ' ')
    .trim();
}

function jsonLd(value) {
  return `<script type="application/ld+json">\n${JSON.stringify(value, null, 2)}\n</script>`;
}

function analyticsTag() {
  return `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-M454TH7VJM"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-M454TH7VJM');
</script>`;
}

function siteHeader() {
  return `<header>
  <div class="shell nav">
    <a class="logo" href="/" aria-label="Bradenton Flooring home"><img src="/images/bradenton-flooring-logo.png" alt="Bradenton Flooring" width="2172" height="724"></a>
    <ul class="menu">
      <li><a href="/flooring/">Flooring Services ▾</a>
        <div class="drop">
          <a href="/luxury-vinyl-plank/">Waterproof Luxury Vinyl (LVP)</a>
          <a href="/tile/">Porcelain, Ceramic &amp; Wood-Look Tile</a>
          <a href="/hardwood/">Hardwood &amp; Engineered Wood</a>
          <a href="/laminate/">Laminate Flooring</a>
          <a href="/carpet/">Carpet Installation</a>
          <a href="/commercial-flooring/">Commercial Flooring</a>
        </div>
      </li>
      <li><a href="/service-areas/">Where We Work ▾</a>
        <div class="drop">
          <a href="/flooring/lakewood-ranch/">Lakewood Ranch</a>
          <a href="/flooring/sarasota/">Sarasota</a>
          <a href="/flooring/parrish/">Parrish</a>
          <a href="/flooring/palmetto/">Palmetto</a>
          <a href="/flooring/venice/">Venice</a>
          <a href="/service-areas/">All service areas →</a>
        </div>
      </li>
      <li><a href="/blog/">Pricing &amp; Guides</a></li>
      <li><a href="/about/">Our Protocol</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul>
    <div class="nav-cta">
      <a class="nav-phone" href="tel:${PHONE_HREF}">${PHONE_DISPLAY}</a>
      <a class="btn btn-brass" href="/contact/">Free Estimate</a>
      <button class="burger" aria-label="Open menu" aria-controls="mobile-menu" onclick="document.body.classList.toggle('m-open')">☰</button>
    </div>
  </div>
  <nav class="m-menu" id="mobile-menu" aria-label="Mobile">
    <a href="tel:${PHONE_HREF}"><b>📞 Tap to call — ${PHONE_DISPLAY}</b></a>
    <p class="m-group">Flooring</p>
    <a href="/luxury-vinyl-plank/">Waterproof Luxury Vinyl (LVP)</a>
    <a href="/tile/">Porcelain &amp; Wood-Look Tile</a>
    <a href="/hardwood/">Hardwood &amp; Engineered Wood</a>
    <a href="/laminate/">Laminate</a>
    <a href="/carpet/">Carpet</a>
    <a href="/commercial-flooring/">Commercial</a>
    <p class="m-group">Core service areas</p>
    ${Object.values(cities).map(city => `<a href="/flooring/${city.slug}/">${city.name}</a>`).join('\n    ')}
    <p class="m-group">Company</p>
    <a href="/service-areas/">All service areas</a>
    <a href="/blog/">Pricing &amp; Guides</a>
    <a href="/about/">Our Protocol</a>
    <a href="/contact/">Contact</a>
  </nav>
</header>`;
}

function siteFooter() {
  return `<footer>
  <div class="shell">
    <div class="f-grid">
      <div class="f-brand">
        <a class="logo footer-logo" href="/" aria-label="Bradenton Flooring home"><img src="/images/bradenton-flooring-logo.png" alt="Bradenton Flooring" width="2172" height="724" loading="lazy" decoding="async"></a>
        <p>Floors engineered for the Florida you actually live in. Waterproof LVP, tile, hardwood, laminate and carpet — installed to a documented 47-point standard across Manatee &amp; Sarasota counties.</p>
      </div>
      <div>
        <h4>Flooring</h4>
        <a href="/luxury-vinyl-plank/">Luxury Vinyl Plank</a>
        <a href="/tile/">Tile &amp; Wood-Look Tile</a>
        <a href="/hardwood/">Hardwood &amp; Engineered</a>
        <a href="/laminate/">Laminate</a>
        <a href="/carpet/">Carpet</a>
        <a href="/commercial-flooring/">Commercial</a>
      </div>
      <div>
        <h4>Core Service Areas</h4>
        <a href="/flooring/">Bradenton</a>
        ${Object.values(cities).map(city => `<a href="/flooring/${city.slug}/">${city.name}</a>`).join('\n        ')}
        <a href="/service-areas/">All areas →</a>
      </div>
      <div>
        <h4>Contact</h4>
        <a href="tel:${PHONE_HREF}">📞 ${PHONE_DISPLAY}</a>
        <a href="mailto:${EMAIL}">✉ ${EMAIL}</a>
        <a href="/contact/">Free estimate form</a>
        <a href="/contact/">Mon–Sat · 7am–7pm</a>
        <a href="/service-areas/">Bradenton, FL 34212 (service area)</a>
      </div>
      <div>
        <h4>Planning Resources</h4>
        <a href="/blog/flooring-cost-in-bradenton-fl-2026/">2026 Flooring Cost Guide</a>
        <a href="/blog/best-flooring-for-florida-condos/">Florida Condo Flooring</a>
        <a href="/blog/concrete-slab-moisture-flooring-florida/">Slab Moisture Guide</a>
        <a href="/blog/how-to-compare-flooring-estimates/">Compare Flooring Quotes</a>
        <a href="/about/">47-Point Install Protocol</a>
      </div>
    </div>
    <div class="f-bottom">
      <span>© 2026 Bradenton Flooring LLC · Fully Insured · Free Estimates</span>
      <span><a href="/privacy/">Privacy Policy</a> · <a href="/terms/">Terms of Service</a></span>
    </div>
  </div>
</footer>`;
}

function pageHead({ title, description, canonical, image, type = 'website', schemas = [] }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
${analyticsTag()}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${htmlEscape(title)}</title>
<meta name="description" content="${htmlEscape(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Bradenton Flooring">
<meta property="og:title" content="${htmlEscape(title)}">
<meta property="og:description" content="${htmlEscape(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${DOMAIN}${image}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${htmlEscape(title)}">
<meta name="twitter:description" content="${htmlEscape(description)}">
<meta name="twitter:image" content="${DOMAIN}${image}">
<link rel="alternate" type="application/rss+xml" title="Bradenton Flooring Guides" href="${DOMAIN}/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="icon" type="image/png" href="/images/favicon.png">
<link rel="stylesheet" href="/assets/seo-pages.css?v=1">
<link rel="stylesheet" href="/assets/brand-refresh.css?v=2">
${schemas.map(jsonLd).join('\n')}
<meta name="theme-color" content="#fbf9f4">
</head>`;
}

function serviceCityUrl(service, city) {
  return `${service.rootUrl}${city.slug}/`;
}

function faqMarkup(faqs) {
  return faqs.map(([question, answer]) => `<details><summary>${htmlEscape(question)}</summary><p>${htmlEscape(answer)}</p></details>`).join('\n');
}

function serviceCityFaqs(service, city, angle) {
  return [
    [`What does ${service.name.toLowerCase()} cost in ${city.name}, FL?`, `A useful 2026 planning range is ${service.cost}. ${city.budget} The exact quote separates material, removal, preparation, installation, trim and any building logistics after an on-site measurement.`],
    [`How do you prepare floors for ${service.short.toLowerCase()} in ${city.name}?`, `${city.substrate} For this material we specifically verify ${service.substrate}. Required correction is documented and priced before the finished floor covers it.`],
    [`How long does ${service.name.toLowerCase()} installation take in ${city.name}?`, `Plan on ${service.timeline}. ${city.access} Material availability, hidden substrate conditions and cure requirements can change the calendar, so the written scope includes the expected sequence.`],
    [`Which ${service.short.toLowerCase()} option works best for ${city.name} homes?`, `${angle.choices} We compare full-size samples and technical data against the room’s water, sun, traffic, acoustic and maintenance needs rather than naming one product as best for every address.`],
    [`Do you serve ${city.areas.slice(0, 3).join(', ')} and nearby neighborhoods?`, `Yes. Bradenton Flooring serves ${city.name} and communities including ${city.areas.join(', ')}. Send the project address or ZIP code with the rooms and approximate square footage, and we will confirm measurement availability.`]
  ];
}

function serviceCityPage(service, city, angle) {
  const url = serviceCityUrl(service, city);
  const canonical = `${DOMAIN}${url}`;
  const title = `${service.name} ${city.name}, FL | ${angle.titleTag}`;
  const description = `${service.name} in ${city.name}, FL. Local material choices, documented preparation, 2026 cost guidance and free written estimates.`;
  const faqs = serviceCityFaqs(service, city, angle);
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: `${service.name} in ${city.name}, FL`,
      serviceType: service.name,
      description: stripHtml(`${angle.lead} ${service.summary}`),
      url: canonical,
      provider: { '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'], '@id': `${DOMAIN}/#business`, name: 'Bradenton Flooring', url: `${DOMAIN}/`, telephone: PHONE_DISPLAY },
      areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: 'Florida' } },
      offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD', description: `Planning range: ${service.cost}. Final price requires an on-site estimate.` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
        { '@type': 'ListItem', position: 2, name: service.name, item: `${DOMAIN}${service.rootUrl}` },
        { '@type': 'ListItem', position: 3, name: city.name, item: canonical }
      ]
    }
  ];

  return `${pageHead({ title, description, canonical, image: service.image, schemas })}
<body>
${siteHeader()}
<main>
  <div class="hero seo-hero">
    <div class="shell hero-grid">
      <div>
        <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="${service.rootUrl}">${service.name}</a> › <span>${city.name}</span></nav>
        <span class="eyebrow">${htmlEscape(city.county)} · ZIP ${htmlEscape(city.zips)}</span>
        <h1>${htmlEscape(angle.headline)}</h1>
        <p class="lede">${htmlEscape(angle.lead)}</p>
        <div class="hero-ctas"><a class="btn btn-brass" href="/contact/">Request a Written Estimate</a><a class="btn btn-line" href="tel:${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div>
        <div class="badges"><span class="badge">★★★★★ Google</span><span class="badge">47-Point Install Protocol</span><span class="badge">Free On-Site Measurement</span></div>
      </div>
      <aside class="intent-card" aria-label="Quick answer">
        <span class="intent-label">Quick answer</span>
        <h2>${service.short} in ${city.name}</h2>
        <p>${htmlEscape(service.summary)}</p>
        <dl><div><dt>Planning range</dt><dd>${htmlEscape(service.cost)}</dd></div><div><dt>Typical schedule</dt><dd>${htmlEscape(service.timeline)}</dd></div><div><dt>Local focus</dt><dd>${htmlEscape(city.tagline)}</dd></div></dl>
      </aside>
    </div>
  </div>

  <section class="answer-section"><div class="shell"><div class="answer"><p><strong>${service.name} in ${city.name}, Florida</strong> should be specified around ${htmlEscape(city.tagline)}. ${htmlEscape(angle.local)} Bradenton Flooring measures the site, documents preparation, and provides a line-item proposal so the material, labor, removal and substrate work can be compared clearly.</p></div></div></section>

  <section>
    <div class="shell content-grid">
      <article>
        <span class="eyebrow">Local Installation Strategy</span>
        <h2>Why ${city.name} changes the ${service.short.toLowerCase()} plan</h2>
        ${city.profile.map(paragraph => `<p>${htmlEscape(paragraph)}</p>`).join('\n        ')}
        <p>${htmlEscape(angle.local)}</p>
        <p>${htmlEscape(angle.choices)}</p>
      </article>
      <aside class="side-note">
        <h3>Common ${city.name} project types</h3>
        <ul>${angle.projects.map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ul>
        <h3>Neighborhoods and communities</h3>
        <p>${htmlEscape(city.areas.join(' · '))}</p>
        <a class="text-link" href="/flooring/${city.slug}/">See every flooring service in ${city.name} →</a>
      </aside>
    </div>
  </section>

  <section class="soft-section">
    <div class="shell">
      <span class="eyebrow">Material Selection</span>
      <h2>What we compare before recommending ${service.short}</h2>
      <p class="section-lede">${htmlEscape(service.bestFor)} A useful selection balances the visible finish with the technical system below it.</p>
      <div class="why-grid">${service.specs.map(([heading, text]) => `<div class="why"><h3>${htmlEscape(heading)}</h3><p>${htmlEscape(text)}</p></div>`).join('')}</div>
      <div class="prose-inline">${service.deepDive.map(paragraph => `<p>${htmlEscape(paragraph)}</p>`).join('')}</div>
      <p class="term-note"><strong>Terms that may appear in a detailed proposal:</strong> ${htmlEscape(service.terms.join(', '))}. They are used where relevant to the room, not as interchangeable labels.</p>
    </div>
  </section>

  <section>
    <div class="shell">
      <span class="eyebrow">Documented Installation</span>
      <h2>From measurement to finished floor</h2>
      <div class="steps">${service.process.map(([heading, text], index) => `<div class="step"><span class="n">${index + 1}</span><h3>${htmlEscape(heading)}</h3><p>${htmlEscape(text)}</p></div>`).join('')}</div>
      <div class="protocol"><div class="inner"><span class="eyebrow">47-Point Coastal Subfloor &amp; Install Protocol</span><h2>Preparation that stays visible in the records</h2><p class="sub">${htmlEscape(city.substrate)} ${htmlEscape(city.access)}</p><div class="pro-grid"><div class="pro-card"><b>Substrate</b><span>Readings, flatness and corrections documented.</span></div><div class="pro-card"><b>Layout</b><span>Focal lines, cuts, transitions and expansion planned.</span></div><div class="pro-card"><b>Installation</b><span>Products and methods checked against the written scope.</span></div><div class="pro-card"><b>Handoff</b><span>Care, warranty references and punch-list review completed.</span></div></div></div></div>
    </div>
  </section>

  <section class="soft-section">
    <div class="shell">
      <span class="eyebrow">Budget Planning</span>
      <h2>${service.name} cost in ${city.name}</h2>
      <div class="budget-panel"><p><strong>Planning range:</strong> ${htmlEscape(service.cost)}.</p><p>${htmlEscape(city.budget)}</p><p>Ranges are for early budgeting and are not a bid. The written estimate identifies product, quantity, removal, preparation, installation, transitions, trim and applicable access requirements. See the <a href="/blog/flooring-cost-in-bradenton-fl-2026/">2026 Bradenton-area flooring cost guide</a> and the <a href="/blog/flooring-removal-subfloor-prep-cost/">removal and preparation guide</a> before comparing proposals.</p></div>
    </div>
  </section>

  <section>
    <div class="shell faq-wrap">
      <span class="eyebrow">Questions People Ask</span>
      <h2>${service.short} installation FAQs for ${city.name}</h2>
      ${faqMarkup(faqs)}
    </div>
  </section>

  ${relatedMatrix(city, service.slug)}
  ${ctaBand(`Plan your ${service.short.toLowerCase()} project in ${city.name}`, 'Get an on-site measurement and a written, line-item estimate built around the actual rooms and substrate.')}
</main>
${siteFooter()}
</body>
</html>`;
}

function cityFaqs(city) {
  return [
    [`What flooring is best for homes in ${city.name}, Florida?`, `Rigid-core LVP and porcelain tile are strong all-around choices for water resistance and slab-on-grade construction. Engineered hardwood suits controlled interiors, laminate works in selected dry rooms, and carpet remains useful for quiet bedrooms and stairs. The best answer depends on room exposure, substrate, comfort and maintenance.`],
    [`How much does flooring installation cost in ${city.name}?`, `Common planning ranges run about $4–$9 per square foot for LVP, $7–$20 for many tile floors, $7–$14 for engineered hardwood, $3–$8 for laminate and $2–$6 for carpet with standard pad. Removal, preparation, stairs, trim and building logistics are separate scope items.`],
    [`Do you remove old flooring and prepare concrete slabs in ${city.name}?`, `Yes. Quotes can include carpet, tile, laminate, vinyl or wood removal; haul-away; thin-set or adhesive correction; crack treatment; flatness work and moisture-related systems. The work is itemized so preparation is not hidden inside one number.`],
    [`Can you handle HOA or condo flooring requirements in ${city.name}?`, `When a community or building requires approval, we review the flooring language, provide available product and acoustic documentation, coordinate the required installation assembly and plan access rules before demolition is scheduled.`],
    [`Which ${city.name} neighborhoods do you serve?`, `We serve ${city.name} and areas including ${city.areas.join(', ')}. Coverage extends throughout the broader Bradenton–Sarasota service area; send the project ZIP code for measurement availability.`]
  ];
}

function cityHubPage(city) {
  const url = `/flooring/${city.slug}/`;
  const canonical = `${DOMAIN}${url}`;
  const title = `Flooring Installation ${city.name}, FL | LVP, Tile & More`;
  const description = `Flooring installation in ${city.name}, FL. Compare LVP, tile, hardwood, laminate, carpet and commercial floors with local preparation guidance.`;
  const faqs = cityFaqs(city);
  const itemList = Object.values(services).map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: `${service.name} in ${city.name}`,
    url: `${DOMAIN}${serviceCityUrl(service, city)}`
  }));
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: `Flooring Installation in ${city.name}, FL`,
      description,
      about: { '@type': 'Service', name: 'Flooring installation', provider: { '@id': `${DOMAIN}/#business` }, areaServed: { '@type': 'City', name: city.name } },
      mainEntity: { '@type': 'ItemList', itemListElement: itemList },
      dateModified: BUILD_DATE
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Flooring Services', item: `${DOMAIN}/flooring/` },
      { '@type': 'ListItem', position: 3, name: city.name, item: canonical }
    ] }
  ];

  return `${pageHead({ title, description, canonical, image: '/images/flooring-installation-social-card.png', schemas })}
<body>
${siteHeader()}
<main>
  <div class="hero seo-hero city-hero"><div class="shell hero-grid"><div><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/flooring/">Flooring Services</a> › <span>${city.name}</span></nav><span class="eyebrow">${htmlEscape(city.county)} · ZIP ${htmlEscape(city.zips)}</span><h1>Flooring Installation in ${city.name}, FL</h1><p class="lede">Compare LVP, tile, hardwood, laminate, carpet and commercial flooring through the conditions that actually shape a ${city.name} project: ${htmlEscape(city.tagline)}.</p><div class="hero-ctas"><a class="btn btn-brass" href="/contact/">Get a Free Measurement</a><a class="btn btn-line" href="tel:${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div><div class="badges"><span class="badge">★★★★★ Google</span><span class="badge">6 Flooring Categories</span><span class="badge">Written Line-Item Quotes</span></div></div><aside class="intent-card"><span class="intent-label">Local planning brief</span><h2>${city.name} at a glance</h2><dl><div><dt>Core ZIPs</dt><dd>${htmlEscape(city.zips)}</dd></div><div><dt>Primary conditions</dt><dd>${htmlEscape(city.tagline)}</dd></div><div><dt>Typical scope</dt><dd>Removal, slab preparation, installation, trim and documentation.</dd></div></dl></aside></div></div>

  <section class="answer-section"><div class="shell"><div class="answer"><p><strong>Bradenton Flooring installs flooring throughout ${city.name}</strong>, including ${htmlEscape(city.areas.join(', '))}. ${htmlEscape(city.profile[0])} Every recommendation starts with the building, room exposure and substrate so the city page remains a useful project guide—not a duplicate list of services.</p></div></div></section>

  <section><div class="shell"><span class="eyebrow">Choose by Material</span><h2>Flooring services in ${city.name}</h2><p class="section-lede">Each material page below has a distinct ${city.name} scope, local selection notes, preparation details, cost framing and questions for that installation type.</p><div class="service-directory">${Object.values(services).map(service => `<a class="svc" href="${serviceCityUrl(service, city)}"><span class="ico">${service.icon}</span><h3>${service.name} in ${city.name}</h3><p>${htmlEscape(city.angles[service.slug]?.lead || service.summary)}</p><span class="go">Plan this service →</span></a>`).join('')}</div></div></section>

  <section class="soft-section"><div class="shell content-grid"><article><span class="eyebrow">Local Conditions</span><h2>What changes from one ${city.name} project to another</h2>${city.profile.map(paragraph => `<p>${htmlEscape(paragraph)}</p>`).join('')}<p><strong>Substrate:</strong> ${htmlEscape(city.substrate)}</p><p><strong>Access and scheduling:</strong> ${htmlEscape(city.access)}</p><p><strong>Budget:</strong> ${htmlEscape(city.budget)}</p></article><aside class="side-note"><h3>Areas we commonly serve</h3><ul>${city.areas.map(area => `<li>${htmlEscape(area)}</li>`).join('')}</ul><p>Also see the complete <a href="/service-areas/">Bradenton Flooring service-area directory</a>.</p></aside></div></section>

  <section><div class="shell"><span class="eyebrow">Material Comparison</span><h2>Start with the room, then compare the floor</h2><div class="price-wrap"><table class="price"><thead><tr><th>Floor type</th><th>2026 planning range</th><th>Strongest use case</th></tr></thead><tbody>${Object.values(services).map(service => `<tr><td><a href="${serviceCityUrl(service, city)}">${service.name}</a></td><td class="val">${htmlEscape(service.cost)}</td><td>${htmlEscape(service.bestFor)}</td></tr>`).join('')}</tbody></table></div><p class="fine-print">Planning ranges are not quotes. Product, demolition, substrate condition, trim, stairs, building logistics and project size affect the written estimate.</p></div></section>

  <section class="soft-section"><div class="shell"><span class="eyebrow">Project Planning</span><h2>A documented path from estimate to handoff</h2><div class="steps"><div class="step"><span class="n">1</span><h3>Measure the rooms</h3><p>Confirm square footage, layout, transitions, doors, appliances and the existing floor.</p></div><div class="step"><span class="n">2</span><h3>Inspect the substrate</h3><p>Check moisture, flatness, bond, cracks and preparation requirements for the selected material.</p></div><div class="step"><span class="n">3</span><h3>Write the scope</h3><p>Separate material, removal, preparation, installation, trim, access and applicable approvals.</p></div><div class="step"><span class="n">4</span><h3>Install and document</h3><p>Follow the product-specific method, complete a walkthrough and hand over care and warranty references.</p></div></div></div></section>

  <section><div class="shell faq-wrap"><span class="eyebrow">Local Questions</span><h2>${city.name} flooring FAQs</h2>${faqMarkup(faqs)}</div></section>
  ${ctaBand(`Compare flooring options for your ${city.name} property`, 'One measurement can price the floor, removal, substrate work, transitions and trim as a complete project.')}
</main>
${siteFooter()}
</body>
</html>`;
}

function relatedMatrix(city, currentServiceSlug = '') {
  return `<section class="soft-section related-matrix"><div class="shell"><span class="eyebrow">Related Local Services</span><h2>Compare flooring options in ${city.name}</h2><div class="svc-grid">${Object.values(services).filter(service => service.slug !== currentServiceSlug).map(service => `<a class="svc" href="${serviceCityUrl(service, city)}"><span class="ico">${service.icon}</span><h3>${service.name}</h3><p>${htmlEscape(service.summary)}</p><span class="go">View ${city.name} details →</span></a>`).join('')}</div><p class="matrix-back"><a href="/flooring/${city.slug}/">View the complete ${city.name} flooring guide →</a></p></div></section>`;
}

function ctaBand(title, text) {
  return `<section style="padding-top:0"><div class="shell"><div class="band"><div><h2>${htmlEscape(title)}</h2><p>${htmlEscape(text)}</p></div><div class="cta-actions"><a class="btn" href="tel:${PHONE_HREF}">📞 ${PHONE_DISPLAY}</a><a class="btn" href="/contact/">Start My Estimate</a></div></div></div></section>`;
}

function articlePage(article) {
  const url = `/blog/${article.slug}/`;
  const canonical = `${DOMAIN}${url}`;
  const wordText = [article.description, ...article.sections.flatMap(([heading, paragraphs]) => [heading, ...paragraphs]), ...article.faqs.flat()].join(' ');
  const wordCount = stripHtml(wordText).split(/\s+/).length;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonical}#article`,
    headline: article.title,
    description: article.description,
    image: `${DOMAIN}/images/flooring-guides-social-card.png`,
    author: { '@type': 'Organization', name: 'Bradenton Flooring', url: `${DOMAIN}/about/` },
    publisher: { '@type': 'Organization', name: 'Bradenton Flooring', logo: { '@type': 'ImageObject', url: `${DOMAIN}/images/bradenton-flooring-logo.png` } },
    datePublished: BUILD_DATE,
    dateModified: BUILD_DATE,
    wordCount,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    about: ['Flooring installation', 'Florida homes', 'Flooring selection and preparation']
  };
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: article.faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) };
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${DOMAIN}/blog/` },
    { '@type': 'ListItem', position: 3, name: article.title, item: canonical }
  ] };
  return `${pageHead({ title: article.metaTitle, description: article.description, canonical, image: '/images/flooring-guides-social-card.png', type: 'article', schemas: [schema, faqSchema, breadcrumb] })}
<body>
${siteHeader()}
<main>
  <div class="post-hero"><div class="shell"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Flooring Guides</a> › <span>${htmlEscape(article.title)}</span></nav><span class="eyebrow">Florida Flooring Field Guide</span><h1>${htmlEscape(article.title)}</h1><p>${htmlEscape(article.dek)}</p><p class="byline">Prepared by the Bradenton Flooring estimating and installation team · Published and reviewed ${BUILD_DATE}</p></div></div>
  <article class="shell prose article-prose">
    <div class="direct-answer"><strong>In brief:</strong> ${htmlEscape(article.description)} Every product and project differs; use this guide to ask better questions, then verify the final system against the room, substrate and manufacturer instructions.</div>
    <nav class="jump-links" aria-label="On this page"><strong>On this page</strong><ol>${article.sections.map(([heading], index) => `<li><a href="#section-${index + 1}">${htmlEscape(heading)}</a></li>`).join('')}</ol></nav>
    ${article.sections.map(([heading, paragraphs], index) => `<section id="section-${index + 1}"><h2>${htmlEscape(heading)}</h2>${paragraphs.map(paragraph => `<p>${htmlEscape(paragraph)}</p>`).join('')}</section>`).join('\n')}
    <section><h2>Questions homeowners ask</h2><div class="faq-wrap">${faqMarkup(article.faqs)}</div></section>
    <aside class="editorial-note"><h2>How this guide was prepared</h2><p>This guide synthesizes the questions that belong in a Florida flooring estimate: room exposure, material limits, concrete or wood substrate conditions, preparation, installation method, schedule and care. Price references are local planning ranges already used across Bradenton Flooring’s 2026 service pages, not a substitute for an on-site proposal. Product instructions and building requirements control when they are more specific.</p></aside>
  </article>
  <section class="soft-section"><div class="shell"><span class="eyebrow">Continue Planning</span><h2>Turn the guide into a room-by-room scope</h2><div class="svc-grid"><a class="svc" href="/flooring/"><h3>Compare all flooring services</h3><p>LVP, tile, hardwood, laminate, carpet and commercial systems with local pricing and preparation guidance.</p><span class="go">Browse services →</span></a><a class="svc" href="/service-areas/"><h3>Find your service area</h3><p>Core city guides and the complete Bradenton–Sarasota coverage directory.</p><span class="go">Browse locations →</span></a><a class="svc" href="/contact/"><h3>Request a written estimate</h3><p>Measure the rooms and price the material, removal, preparation, trim and schedule together.</p><span class="go">Start the estimate →</span></a></div></div></section>
  ${ctaBand('Need an answer for your exact rooms?', 'A free measurement turns general guidance into a product-specific, line-item project plan.')}
</main>
${siteFooter()}
</body>
</html>`;
}

function injectBefore(html, marker, content, id) {
  if (html.includes(`data-seo-block="${id}"`)) return html;
  const index = html.indexOf(marker);
  if (index === -1) throw new Error(`Marker not found for ${id}: ${marker}`);
  return `${html.slice(0, index)}${content}\n\n${html.slice(index)}`;
}

function serviceMatrixSection(service) {
  const cards = [
    `<a class="svc" href="${service.rootUrl}"><h3>Bradenton</h3><p>${service.name} planning, pricing and Florida installation details for the home market at the center of our service area.</p><span class="go">Current Bradenton guide →</span></a>`,
    ...Object.values(cities).map(city => `<a class="svc" href="${serviceCityUrl(service, city)}"><h3>${service.name} in ${city.name}</h3><p>${htmlEscape(city.angles[service.slug]?.lead || service.summary)}</p><span class="go">View ${city.name} guide →</span></a>`)
  ];
  return `<section class="soft-section" data-seo-block="${service.slug}-city-matrix"><div class="shell"><span class="eyebrow">Service × City Directory</span><h2>${service.name} across Bradenton, Lakewood Ranch and Sarasota</h2><p class="section-lede">Each location guide focuses on that city’s building types, substrate risks, access rules, material choices and project questions rather than repeating a generic landing page.</p><div class="svc-grid">${cards.join('')}</div></div></section>`;
}

function cityServicesSection(city) {
  return `<section class="soft-section" data-seo-block="${city.slug}-service-matrix"><div class="shell"><span class="eyebrow">All ${city.name} Services</span><h2>Compare flooring materials for ${city.name}</h2><div class="svc-grid">${Object.values(services).map(service => `<a class="svc" href="${serviceCityUrl(service, city)}"><h3>${service.name}</h3><p>${htmlEscape(service.summary)}</p><span class="go">View local service →</span></a>`).join('')}</div><p style="margin-top:1.2rem"><a href="/flooring/${city.slug}/">Open the complete ${city.name} flooring guide →</a></p></div></section>`;
}

function replaceHeaderFooter(html) {
  html = html.replace(/<header>[\s\S]*?<\/header>/, siteHeader());
  html = html.replace(/<footer>[\s\S]*?<\/footer>/, siteFooter());
  return html;
}

function normalizeExistingHtml(html, relativePath) {
  html = replaceHeaderFooter(html);
  html = html.replace(/\n?<meta name="indexnow-key" content="\{\{INDEXNOW_KEY\}\}">/g, '');
  html = html.replace(/,\s*"sameAs"\s*:\s*\[\]/g, '');
  if (!html.includes('type="application/rss+xml"')) {
    html = html.replace('</head>', `<link rel="alternate" type="application/rss+xml" title="Bradenton Flooring Guides" href="${DOMAIN}/feed.xml">\n</head>`);
  }
  if (!html.includes('href="/images/favicon.png"')) {
    html = html.replace('</head>', '<link rel="icon" type="image/png" href="/images/favicon.png">\n</head>');
  }
  const missingImageMap = [
    [/\/(?:images\/)?[^"']*(?:commercial)[^"']*\.jpg/gi, '/images/commercial-flooring-social-card.png'],
    [/\/images\/[^"']*(?:hardwood|engineered)[^"']*\.jpg/gi, '/images/hardwood-flooring-social-card.png'],
    [/\/images\/[^"']*(?:laminate)[^"']*\.jpg/gi, '/images/laminate-flooring-social-card.png'],
    [/\/images\/[^"']*(?:carpet)[^"']*\.jpg/gi, '/images/carpet-installation-social-card.png'],
    [/\/images\/[^"']*(?:tile|wood-look)[^"']*\.jpg/gi, '/images/tile-installation-social-card.png'],
    [/\/images\/[^"']*(?:vinyl|lvp)[^"']*\.jpg/gi, '/images/luxury-vinyl-plank-social-card.png'],
    [/\/images\/[^"']*\.jpg/gi, relativePath.startsWith('blog/') ? '/images/flooring-guides-social-card.png' : '/images/flooring-installation-social-card.png']
  ];
  for (const [pattern, replacement] of missingImageMap) html = html.replace(pattern, replacement);
  return html;
}

function walk(dir) {
  return readdirSync(dir).flatMap(name => {
    const full = join(dir, name);
    const rel = relative(ROOT, full).split(sep).join('/');
    if (rel.startsWith('.git/') || rel.startsWith('design-options/') || rel.startsWith('scripts/')) return [];
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function buildCss() {
  const source = readFileSync(join(ROOT, 'flooring/index.html'), 'utf8');
  const base = source.match(/<style>([\s\S]*?)<\/style>/)?.[1];
  if (!base) throw new Error('Unable to extract base CSS from flooring/index.html');
  const extra = `
/* Generated local SEO page components */
.seo-hero .hero-grid{grid-template-columns:minmax(0,1.25fr) minmax(300px,.75fr);align-items:center}.seo-hero .hero-grid>*{min-width:0}.seo-hero h1,.post-hero h1{overflow-wrap:anywhere}.seo-hero .eyebrow{max-width:100%;white-space:normal;overflow-wrap:anywhere}
.crumbs{font-size:.82rem;margin-bottom:.8rem}.crumbs a{color:var(--brass-deep)}
.intent-card{background:rgba(255,254,251,.96);border:1px solid #d9c89e;border-top:5px solid var(--brass);border-radius:22px;padding:1.6rem;box-shadow:var(--shadow-lg)}
.intent-card h2{font-size:1.65rem;margin:.4rem 0 1rem}.intent-label{font-size:.72rem;text-transform:uppercase;letter-spacing:.13em;color:var(--brass-deep);font-weight:800}
.intent-card dl{display:grid;gap:.9rem;margin-top:1.2rem}.intent-card dl div{padding-top:.85rem;border-top:1px solid var(--hairline)}.intent-card dt{font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;color:var(--stone);font-weight:800}.intent-card dd{margin:.25rem 0 0;line-height:1.55}
.answer-section{padding:0}.content-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(260px,.65fr);gap:2rem;align-items:start}.content-grid article p{margin:.85rem 0;max-width:72ch}
.side-note,.budget-panel,.editorial-note{background:var(--white);border:1px solid var(--hairline);border-left:4px solid var(--brass);border-radius:var(--r-md);padding:1.45rem;box-shadow:var(--shadow)}
.side-note ul{padding-left:1.1rem;margin:.6rem 0 1.2rem}.side-note li{margin:.4rem 0}.text-link{font-weight:750;color:var(--brass-deep)}
.soft-section{background:linear-gradient(135deg,rgba(239,233,220,.76),rgba(249,247,241,.9));border-top:1px solid var(--hairline);border-bottom:1px solid var(--hairline)}
.section-lede{color:var(--stone);max-width:76ch;margin-bottom:1.4rem}.prose-inline{columns:2;column-gap:2.2rem;margin:1.7rem 0}.prose-inline p{break-inside:avoid;margin:0 0 1rem}.term-note,.fine-print{font-size:.9rem;color:var(--stone)}
.budget-panel{max-width:880px}.budget-panel p{margin:.7rem 0}.faq-wrap{max-width:900px}.faq-wrap details{margin:.75rem 0}.faq-wrap details p{max-width:78ch}
.service-directory{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem}.service-directory .svc{display:block;text-decoration:none;color:inherit}
.related-matrix .svc-grid{grid-template-columns:repeat(3,1fr)}.matrix-back{margin-top:1.25rem;font-weight:750}.cta-actions{display:flex;gap:.8rem;flex-wrap:wrap}
.direct-answer{background:#f5ecd8;border:1px solid #dec994;border-left:5px solid var(--brass);border-radius:12px;padding:1.15rem 1.25rem;margin-bottom:1.6rem}.byline{font-size:.86rem;color:var(--stone);margin-top:1rem}.jump-links{background:#f8f5ee;border:1px solid var(--hairline);border-radius:14px;padding:1.2rem 1.4rem;margin:1.5rem 0 2rem}.jump-links ol{columns:2;margin:.7rem 0 0;padding-left:1.25rem}.jump-links li{margin:.35rem 0}.article-prose>section{padding:1.25rem 0}.editorial-note{margin:2rem 0}.editorial-note h2{margin-top:0}
@media(max-width:920px){.seo-hero .hero-grid,.content-grid{grid-template-columns:1fr}.service-directory,.related-matrix .svc-grid{grid-template-columns:repeat(2,1fr)}.prose-inline{columns:1}}
@media(max-width:620px){.service-directory,.related-matrix .svc-grid{grid-template-columns:1fr}.jump-links ol{columns:1}.intent-card{padding:1.25rem}.seo-hero h1{font-size:clamp(2rem,9.6vw,2.45rem);line-height:1.08}}
`;
  write('assets/seo-pages.css', `${base}\n${extra}`);
}

function buildNewPages() {
  for (const city of Object.values(cities)) {
    write(`flooring/${city.slug}/index.html`, cityHubPage(city));
    for (const service of Object.values(services)) {
      const angle = city.angles[service.slug];
      if (service.generate && angle && !angle.existing) write(`${service.slug}/${city.slug}/index.html`, serviceCityPage(service, city, angle));
    }
  }
  for (const article of articles) write(`blog/${article.slug}/index.html`, articlePage(article));
}

function updateExistingPages() {
  const publicFiles = walk(ROOT).filter(full => full.endsWith('.html') && readFileSync(full, 'utf8').includes('aria-label="Bradenton Flooring home"'));
  for (const full of publicFiles) {
    const rel = relative(ROOT, full).split(sep).join('/');
    let html = normalizeExistingHtml(readFileSync(full, 'utf8'), rel);
    write(rel, html);
  }

  for (const service of Object.values(services)) {
    const path = `${service.slug}/index.html`;
    let html = readFileSync(join(ROOT, path), 'utf8');
    html = injectBefore(html, '<!-- CTA BAND -->', serviceMatrixSection(service), `${service.slug}-city-matrix`);
    write(path, html);
  }

  for (const city of Object.values(cities)) {
    for (const service of Object.values(services)) {
      const path = `${service.slug}/${city.slug}/index.html`;
      try {
        let html = readFileSync(join(ROOT, path), 'utf8');
        if (!html.includes(`data-seo-block="${city.slug}-service-matrix"`) && !html.includes('related-matrix')) {
          html = injectBefore(html, '<!-- CTA BAND -->', cityServicesSection(city), `${city.slug}-service-matrix`);
          write(path, html);
        }
      } catch {}
    }
  }

  let home = readFileSync(join(ROOT, 'index.html'), 'utf8');
  const cityHubSection = `<section class="soft-section" data-seo-block="core-city-hubs"><div class="shell"><span class="eyebrow">Flooring by City</span><h2>Local installation guides for six core markets</h2><p class="section-lede">Each city guide organizes LVP, tile, hardwood, laminate, carpet and commercial flooring around the area’s housing, slab, access and maintenance conditions.</p><div class="svc-grid">${Object.values(cities).map(city => `<a class="svc" href="/flooring/${city.slug}/"><h3>Flooring in ${city.name}</h3><p>${htmlEscape(city.profile[0])}</p><span class="go">Open city guide →</span></a>`).join('')}</div></div></section>`;
  home = injectBefore(home, '<!-- CTA BAND -->', cityHubSection, 'core-city-hubs');
  write('index.html', home);

  let areas = readFileSync(join(ROOT, 'service-areas/index.html'), 'utf8');
  const areaHubSection = `<section class="soft-section" data-seo-block="core-city-hubs"><div class="shell"><span class="eyebrow">Core City Hubs</span><h2>Compare every flooring service by city</h2><div class="svc-grid">${Object.values(cities).map(city => `<a class="svc" href="/flooring/${city.slug}/"><h3>${city.name}</h3><p>${htmlEscape(city.tagline)}. ZIP ${htmlEscape(city.zips)}.</p><span class="go">View all ${city.name} services →</span></a>`).join('')}</div></div></section>`;
  areas = injectBefore(areas, '<!-- CTA BAND -->', areaHubSection, 'core-city-hubs');
  write('service-areas/index.html', areas);

  let blog = readFileSync(join(ROOT, 'blog/index.html'), 'utf8');
  const blogSection = `<section class="soft-section" data-seo-block="new-planning-guides"><div class="shell"><span class="eyebrow">New Planning Guides</span><h2>Preparation, material and estimate guides</h2><div class="post-grid">${articles.map(article => `<article class="post-card"><div class="pc-body"><span class="pc-date">Updated August 21, 2026</span><h2>${htmlEscape(article.title)}</h2><p>${htmlEscape(article.description)}</p><a class="go" href="/blog/${article.slug}/">Read the guide →</a></div></article>`).join('')}</div></div></section>`;
  blog = injectBefore(blog, '</main>', blogSection, 'new-planning-guides');
  write('blog/index.html', blog);
}

function buildTechnicalFiles() {
  const indexable = walk(ROOT)
    .filter(full => full.endsWith('index.html'))
    .map(full => relative(ROOT, dirname(full)).split(sep).join('/'))
    .filter(rel => !rel.startsWith('design-options') && !rel.startsWith('scripts'))
    .map(rel => rel === '' ? '/' : `/${rel}/`)
    .sort((a, b) => a === '/' ? -1 : a.localeCompare(b));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map(path => `  <url>\n    <loc>${DOMAIN}${path}</loc>\n    <lastmod>${BUILD_DATE}</lastmod>\n  </url>`).join('\n')}\n</urlset>\n`;
  write('sitemap.xml', sitemap);

  const robots = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;
  write('robots.txt', robots);
  write(`${INDEXNOW_KEY}.txt`, `${INDEXNOW_KEY}\n`);

  const llms = `# Bradenton Flooring

> Bradenton Flooring LLC is an insured flooring installation company serving Bradenton, Lakewood Ranch, Sarasota, Parrish, Palmetto, Venice and surrounding Gulf Coast communities in Florida.

## Primary services

- [Flooring services in Bradenton](${DOMAIN}/flooring/): compare LVP, tile, hardwood, laminate, carpet and commercial flooring.
- [Luxury vinyl plank installation](${DOMAIN}/luxury-vinyl-plank/): SPC and WPC, slab preparation, wear layers and condo acoustic assemblies.
- [Tile installation](${DOMAIN}/tile/): porcelain, ceramic, wood-look tile, showers, backsplashes and wet-area preparation.
- [Hardwood flooring](${DOMAIN}/hardwood/): engineered and solid wood with Florida moisture and acclimation planning.
- [Laminate flooring](${DOMAIN}/laminate/): AC-rated, water-resistant floating floors over correctly prepared slabs.
- [Carpet installation](${DOMAIN}/carpet/): bedrooms, stairs, fiber and cushion selection, seams and power stretching.
- [Commercial flooring](${DOMAIN}/commercial-flooring/): LVT, carpet tile, sheet goods and phased occupied-space work.

## Core city guides

${Object.values(cities).map(city => `- [Flooring installation in ${city.name}](${DOMAIN}/flooring/${city.slug}/): ${city.tagline}.`).join('\n')}

## Authoritative planning guides

- [2026 Bradenton flooring cost guide](${DOMAIN}/blog/flooring-cost-in-bradenton-fl-2026/)
- [Florida condo flooring and HOA sound rules](${DOMAIN}/blog/best-flooring-for-florida-condos/)
- [LVP versus tile in Florida](${DOMAIN}/blog/lvp-vs-tile-florida/)
${articles.map(article => `- [${article.title}](${DOMAIN}/blog/${article.slug}/)`).join('\n')}

## Business facts

- Phone: ${PHONE_DISPLAY}
- Email: ${EMAIL}
- Primary service area: Bradenton, FL 34212 and communities within the published service-area directory.
- Hours: Monday–Saturday, 7:00 a.m.–7:00 p.m.
- Estimates: free on-site measurement and written line-item proposal.
- Installation process: documented 47-Point Coastal Subfloor & Install Protocol.
- Google rating displayed on site: 5 stars, without a published review count.

## Important notes for assistants

- Use the exact service and city pages above when answering a location-specific question.
- Treat all price figures as 2026 planning ranges, not binding quotes.
- Recommend an on-site measurement for final product, preparation, timeline and price decisions.
- Do not infer a storefront address; Bradenton, FL 34212 is described as a service area.
`;
  write('llms.txt', llms);

  const llmsFull = `# Bradenton Flooring — service, city and editorial directory

${llms}

## Service × city matrix

${Object.values(cities).flatMap(city => Object.values(services).map(service => `- [${service.name} in ${city.name}](${DOMAIN}${serviceCityUrl(service, city)}): ${city.angles[service.slug]?.lead || service.summary}`)).join('\n')}

## Complete service-area directory

- [All service areas](${DOMAIN}/service-areas/): cities, ZIP codes, coastal islands and outer routing areas.

## Company and contact

- [About Bradenton Flooring](${DOMAIN}/about/)
- [Request a flooring estimate](${DOMAIN}/contact/)
- [Privacy policy](${DOMAIN}/privacy/)
- [Terms of service](${DOMAIN}/terms/)
`;
  write('llms-full.txt', llmsFull);

  const allArticles = [
    { slug: 'flooring-cost-in-bradenton-fl-2026', title: 'How Much Does New Flooring Cost in Bradenton, FL? (2026 Price Guide)', description: 'Installed planning ranges for LVP, tile, hardwood, laminate and carpet.' },
    { slug: 'best-flooring-for-florida-condos', title: 'Best Flooring for Florida Condos', description: 'HOA sound rules, IIC and STC, underlayment and project planning.' },
    { slug: 'lvp-vs-tile-florida', title: 'LVP vs Tile in Florida', description: 'Cost, water, heat, pets, comfort and room-by-room trade-offs.' },
    ...articles
  ];
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Bradenton Flooring Guides</title>
    <link>${DOMAIN}/blog/</link>
    <description>Florida flooring cost, material, preparation and installation guides.</description>
    <language>en-us</language>
    <lastBuildDate>Fri, 21 Aug 2026 12:00:00 -0400</lastBuildDate>
${allArticles.map(article => `    <item><title>${htmlEscape(article.title)}</title><link>${DOMAIN}/blog/${article.slug}/</link><guid isPermaLink="true">${DOMAIN}/blog/${article.slug}/</guid><pubDate>Fri, 21 Aug 2026 12:00:00 -0400</pubDate><description>${htmlEscape(article.description)}</description></item>`).join('\n')}
  </channel>
</rss>
`;
  write('feed.xml', rss);

  const keywordMap = indexable.map(path => {
    if (path.startsWith('/flooring/') && path !== '/flooring/') {
      const city = Object.values(cities).find(item => path === `/flooring/${item.slug}/`);
      if (city) return { url: `${DOMAIN}${path}`, type: 'city hub', primaryIntent: `flooring installation ${city.name} FL`, avoids: Object.values(services).map(service => `${service.short.toLowerCase()} ${city.name}`) };
    }
    for (const service of Object.values(services)) {
      for (const city of Object.values(cities)) {
        if (path === serviceCityUrl(service, city)) return { url: `${DOMAIN}${path}`, type: 'service × city', primaryIntent: `${service.name.toLowerCase()} ${city.name} FL`, parentHub: `${DOMAIN}/flooring/${city.slug}/` };
      }
    }
    const article = articles.find(item => path === `/blog/${item.slug}/`);
    if (article) return { url: `${DOMAIN}${path}`, type: 'editorial guide', primaryIntent: stripHtml(article.metaTitle), commercialTarget: `${DOMAIN}/flooring/` };
    return { url: `${DOMAIN}${path}`, type: path.startsWith('/blog/') ? 'editorial' : 'existing core page' };
  });
  write('seo/keyword-map.json', `${JSON.stringify(keywordMap, null, 2)}\n`);
}

function buildRoadmap() {
  const content = `# Bradenton Flooring SEO roadmap

Updated: ${BUILD_DATE}

## Published architecture

- One Bradenton service hub at \`/flooring/\`.
- Five additional core city hubs: Lakewood Ranch, Sarasota, Parrish, Palmetto and Venice.
- One page per service × core city for LVP, tile, hardwood, laminate, carpet and commercial flooring.
- Nine editorial guides: three existing and six new planning resources.
- Self-canonical URLs, crawlable HTML links, Service/CollectionPage/Article/Breadcrumb structured data and visible FAQ content.

## Cannibalization rules

1. City hubs target broad “flooring installation + city” intent and summarize all materials.
2. Service × city pages target one material or commercial service in one city.
3. Service roots target Bradenton plus material-level expertise.
4. Blog articles answer informational questions and link to commercial pages; they do not use service-page titles.
5. Do not add another URL for a synonym such as “vinyl flooring” versus “luxury vinyl plank.” Expand the existing canonical page instead.

## Deferred locations

Do not automatically produce full matrices for Ellenton, North Port, Osprey, Nokomis, Anna Maria Island, Longboat Key, Siesta Key, Sun City Center, Ruskin, Apollo Beach, Riverview, Brandon, Wimauma, Myakka City, Port Charlotte, Punta Gorda or Arcadia. Create a dedicated page only when at least one of these exists:

- verified search or Search Console demand;
- completed-project photography or first-hand project notes;
- distinct building, access or material requirements that justify unique guidance;
- enough operational coverage to serve the area consistently.

Until then, the service-area directory is the canonical answer for those communities. This protects the domain from doorway-page and scaled-content risk.

## Next evidence to add

- Real project photography with location, material and descriptive alt text.
- Verified Google Business Profile URL after approval.
- Named owner or technical reviewer biography when the business is ready to publish it.
- Real project case studies with measured scope, substrate findings, product used, schedule and homeowner-approved photos.
- Search Console query and page data after 8–12 weeks to decide which pages to expand, merge or retitle.
`;
  write('SEO-ROADMAP.md', content);
}

buildCss();
buildNewPages();
updateExistingPages();
buildTechnicalFiles();
buildRoadmap();

console.log(`Generated ${Object.keys(cities).length} city hubs, service-city pages, ${articles.length} guides and technical discovery files.`);
