// Travel Scout content layer. Swap image imports for real photography at any time —
// every page reads from this file, so updating it updates the whole site.
import lagos from "@/assets/dest-lagos.jpg";
import capetown from "@/assets/dest-capetown.jpg";
import zanzibar from "@/assets/dest-zanzibar.jpg";
import dubai from "@/assets/dest-dubai.jpg";
import paris from "@/assets/dest-paris.jpg";
import london from "@/assets/dest-london.jpg";
import tokyo from "@/assets/dest-tokyo.jpg";
import newyork from "@/assets/dest-newyork.jpg";
import rio from "@/assets/dest-rio.jpg";
import sydney from "@/assets/dest-sydney.jpg";
import marrakech from "@/assets/dest-marrakech.jpg";
import food from "@/assets/food-market.jpg";
import santorini from "@/assets/hero-greece.jpg";
import aurora from "@/assets/northern-lights.jpg";
import safari from "@/assets/africa-lion.jpg";
import books from "@/assets/travel-books.jpg";

export const images = { lagos, capetown, zanzibar, dubai, paris, london, tokyo, newyork, rio, sydney, marrakech, food, santorini, aurora, safari, books };

export const regions = ["Africa", "Europe", "Asia", "North America", "South America", "Middle East", "Oceania"] as const;
export type Region = (typeof regions)[number];

export const categories = [
  { name: "Destinations", slug: "destinations", description: "City and country guides written from the ground." },
  { name: "Travel Tips", slug: "travel-tips", description: "Practical advice that saves time, money and stress." },
  { name: "Food & Culture", slug: "food-culture", description: "Markets, kitchens, festivals and the people behind them." },
  { name: "Adventure", slug: "adventure", description: "Trails, safaris, coastlines and wild places." },
  { name: "Budget Travel", slug: "budget-travel", description: "See more of the world for less." },
  { name: "Luxury Travel", slug: "luxury-travel", description: "Stays and experiences worth the splurge." },
  { name: "Solo Travel", slug: "solo-travel", description: "Confidence and inspiration for travelling alone." },
  { name: "Family Travel", slug: "family-travel", description: "Trips that work for every age." },
] as const;
export type CategoryName = (typeof categories)[number]["name"];

export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const categorySlug = (name: string) => categories.find((c) => c.name === name)?.slug ?? "destinations";

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  base: string;
}

export const authors: Author[] = [
  { slug: "adaeze-okafor", name: "Adaeze Okafor", role: "Editor-in-Chief", base: "Lagos", bio: "Adaeze has spent a decade writing about West African cities, food and design. She founded Travel Scout to tell the kind of honest, useful stories she wished she could find before her own trips." },
  { slug: "james-whitfield", name: "James Whitfield", role: "Senior Writer", base: "London", bio: "James covers Europe and long-haul city breaks. He is happiest on a night train with a paper map and a bag of pastries." },
  { slug: "naledi-dlamini", name: "Naledi Dlamini", role: "Adventure Editor", base: "Cape Town", bio: "A trail runner and qualified safari guide, Naledi writes about wild places across southern and East Africa — and how to visit them responsibly." },
  { slug: "kenji-morita", name: "Kenji Morita", role: "Food & Culture Writer", base: "Tokyo", bio: "Kenji writes about what people eat and why. He has reviewed more than 400 small restaurants across Asia and still remembers most of the bills." },
];
export const getAuthor = (slug: string) => authors.find((a) => a.slug === slug)!;

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: Region;
  image: string;
  tagline: string;
  intro: string;
  bestTime: string;
  duration: string;
  budget: string;
  attractions: string[];
  thingsToDo: string[];
  eat: { name: string; note: string }[];
  stay: { name: string; note: string }[];
  tips: string[];
  gettingAround: string;
  safety: string;
  featured?: boolean;
  trending?: boolean;
}

export const destinations: Destination[] = [
  {
    slug: "lagos", name: "Lagos", country: "Nigeria", region: "Africa", image: lagos, featured: true, trending: true,
    tagline: "Africa's loudest, liveliest creative capital.",
    intro: "Lagos is a city of lagoons, late nights and relentless energy. Between the art galleries of Ikoyi, the beach clubs of Lekki and the markets of Lagos Island, it rewards travellers who lean into its pace.",
    bestTime: "November to March (dry season)", duration: "4–6 days", budget: "$80–$200 per day",
    attractions: ["Nike Art Gallery", "Lekki Conservation Centre canopy walk", "Tarkwa Bay Beach", "Freedom Park", "Kalakuta Republic Museum"],
    thingsToDo: ["Catch live Afrobeat at the New Afrika Shrine", "Take a boat to Tarkwa Bay for a beach day", "Shop for fabric at Balogun Market with a local guide", "Browse contemporary art in Ikoyi galleries"],
    eat: [{ name: "Yellow Chilli", note: "Polished Nigerian classics in Victoria Island" }, { name: "Terra Kulture", note: "Arts centre with a great pepper soup" }, { name: "Suya spots in Ikoyi", note: "Spiced grilled beef, best after dark" }],
    stay: [{ name: "Victoria Island", note: "Central, business-friendly hotels and restaurants" }, { name: "Ikoyi", note: "Leafy, quieter, close to galleries" }, { name: "Lekki", note: "Beach clubs and newer apartments" }],
    tips: ["Plan movement around traffic — mornings and evenings can double journey times.", "Carry some cash in naira; card machines are common but not universal.", "Book a driver or use ride-hailing apps rather than hailing taxis."],
    gettingAround: "Ride-hailing apps (Uber, Bolt) are the easiest option. Ferries connect the islands and avoid traffic; the Blue Line rail is expanding.",
    safety: "Use registered drivers, keep phones discreet in busy markets and avoid walking alone late at night in unfamiliar areas.",
  },
  {
    slug: "cape-town", name: "Cape Town", country: "South Africa", region: "Africa", image: capetown, featured: true, trending: true,
    tagline: "Mountains, oceans and world-class wine at the tip of a continent.",
    intro: "Few cities sit in a setting as dramatic as Cape Town. Hike Table Mountain in the morning, swim at Clifton by afternoon and finish with a glass of Chenin Blanc in the Winelands.",
    bestTime: "October to April", duration: "5–7 days", budget: "$70–$180 per day",
    attractions: ["Table Mountain", "Bo-Kaap", "Kirstenbosch Botanical Garden", "Cape Point", "Boulders Beach penguins"],
    thingsToDo: ["Hike Lion's Head for sunrise", "Drive Chapman's Peak", "Spend a day in Stellenbosch and Franschhoek", "Visit Robben Island"],
    eat: [{ name: "Bo-Kaap Kombuis", note: "Cape Malay curries with a view" }, { name: "Kalk Bay harbour", note: "Fresh fish and chips" }, { name: "Neighbourgoods Market", note: "Saturday food stalls in Woodstock" }],
    stay: [{ name: "City Bowl", note: "Walkable, close to restaurants" }, { name: "Sea Point", note: "Promenade and ocean views" }, { name: "Camps Bay", note: "Beachfront and upmarket" }],
    tips: ["Check the wind forecast — the 'Cape Doctor' can close the cable car.", "Rent a car for the peninsula and Winelands.", "Book Robben Island tickets in advance."],
    gettingAround: "Ride-hailing is reliable and affordable. The MyCiTi bus covers the Atlantic seaboard; a rental car is best for day trips.",
    safety: "Hike popular trails in groups, avoid isolated areas after dark and don't leave valuables in parked cars.",
  },
  {
    slug: "zanzibar", name: "Zanzibar", country: "Tanzania", region: "Africa", image: zanzibar, featured: true, trending: true,
    tagline: "Spice-scented alleys and the clearest water in East Africa.",
    intro: "Zanzibar mixes Swahili, Arab, Indian and European history into a single island. Get lost in the stone streets of Stone Town, then head to the east coast for white sand and turquoise lagoons.",
    bestTime: "June to October, December to February", duration: "6–8 days", budget: "$60–$250 per day",
    attractions: ["Stone Town", "Nungwi Beach", "Jozani Forest", "Prison Island", "Mnemba Atoll"],
    thingsToDo: ["Take a spice farm tour", "Sail a dhow at sunset", "Snorkel at Mnemba Atoll", "Eat at the Forodhani night market"],
    eat: [{ name: "Forodhani Gardens", note: "Night market for 'Zanzibar pizza'" }, { name: "Lukmaan", note: "Local favourite for biryani and curries" }, { name: "The Rock", note: "Seafood restaurant on a rock at high tide" }],
    stay: [{ name: "Stone Town", note: "Boutique hotels in restored merchant houses" }, { name: "Nungwi & Kendwa", note: "Swimmable beaches at all tides" }, { name: "Paje & Jambiani", note: "Laid-back and great for kitesurfing" }],
    tips: ["Dress modestly in Stone Town — cover shoulders and knees.", "East coast beaches have big tides; check tide times.", "Carry US dollars in newer notes for visas and tips."],
    gettingAround: "Private transfers or taxis are easiest. Dala-dala minibuses are cheap and local. Ferries run to Dar es Salaam in two hours.",
    safety: "Generally relaxed. Use licensed guides for boat trips and be wary of beach touts offering tours.",
  },
  {
    slug: "marrakech", name: "Marrakech", country: "Morocco", region: "Africa", image: marrakech,
    tagline: "Souks, riads and rooftop sunsets in the Red City.",
    intro: "Marrakech is sensory overload in the best way: the call to prayer, the scent of cumin, the glow of brass lanterns. Retreat to a quiet riad courtyard between explorations.",
    bestTime: "March to May, September to November", duration: "3–5 days", budget: "$50–$160 per day",
    attractions: ["Jemaa el-Fnaa", "Jardin Majorelle", "Bahia Palace", "Ben Youssef Madrasa", "Le Jardin Secret"],
    thingsToDo: ["Haggle in the souks", "Take a hammam", "Day trip to the Atlas Mountains", "Join a cooking class"],
    eat: [{ name: "Jemaa el-Fnaa food stalls", note: "Grilled meats and snail soup" }, { name: "Café Clock", note: "Camel burgers and storytelling nights" }, { name: "Nomad", note: "Modern Moroccan on a rooftop" }],
    stay: [{ name: "Medina riads", note: "Atmospheric and central" }, { name: "Gueliz", note: "Modern quarter with cafés" }, { name: "Palmeraie", note: "Resort-style retreats" }],
    tips: ["Agree on taxi fares before getting in.", "Polite but firm 'no, thank you' works with touts.", "Friday afternoons are quieter in the souks."],
    gettingAround: "The medina is best on foot. Petit taxis cover the city; agree a price or insist on the meter.",
    safety: "Safe overall; watch for pickpockets in crowds and decline unsolicited 'guides'.",
  },
  {
    slug: "nairobi", name: "Nairobi & the Mara", country: "Kenya", region: "Africa", image: safari,
    tagline: "A city on the edge of the wild.",
    intro: "Nairobi is the gateway to East Africa's great safari country. Spend a day with giraffes and baby elephants in the city, then fly to the Masai Mara for the migration.",
    bestTime: "July to October for the migration", duration: "6–9 days", budget: "$120–$500 per day",
    attractions: ["Nairobi National Park", "David Sheldrick Elephant Orphanage", "Giraffe Centre", "Masai Mara", "Karen Blixen Museum"],
    thingsToDo: ["Watch the wildebeest river crossings", "Take a hot-air balloon over the Mara", "Visit a Maasai-owned conservancy", "Explore Nairobi's art scene"],
    eat: [{ name: "Mama Oliech", note: "Famous fried tilapia" }, { name: "Carnivore", note: "Classic nyama choma experience" }, { name: "Talisman", note: "Garden dining in Karen" }],
    stay: [{ name: "Karen", note: "Green suburb near the national park" }, { name: "Westlands", note: "Nightlife and restaurants" }, { name: "Mara conservancies", note: "Fewer vehicles, better sightings" }],
    tips: ["Conservancies cost more but mean fewer crowds at sightings.", "Pack neutral colours for game drives.", "Bring layers — Mara mornings are cold."],
    gettingAround: "Use ride-hailing in Nairobi. Light aircraft from Wilson Airport reach the Mara in under an hour.",
    safety: "Use reputable operators, avoid walking at night in the city centre and follow guide instructions on safari.",
  },
  {
    slug: "dubai", name: "Dubai", country: "United Arab Emirates", region: "Middle East", image: dubai, featured: true, trending: true,
    tagline: "Desert dunes, record-breaking skylines and old souks.",
    intro: "Dubai is famous for superlatives, but there's more here than malls and towers. Cross the creek by abra, eat in Al Karama and watch the sun set over the desert.",
    bestTime: "November to March", duration: "4–5 days", budget: "$120–$400 per day",
    attractions: ["Burj Khalifa", "Al Fahidi Historical District", "Dubai Creek", "Museum of the Future", "Jumeirah Beach"],
    thingsToDo: ["Take an abra across the creek", "Book a desert safari with stargazing", "Visit the Gold and Spice Souks", "Watch the Dubai Fountain show"],
    eat: [{ name: "Al Ustad Special Kabab", note: "Iranian kebabs since 1978" }, { name: "Ravi Restaurant", note: "Legendary Pakistani canteen" }, { name: "Arabian Tea House", note: "Emirati breakfast in Al Fahidi" }],
    stay: [{ name: "Downtown", note: "Near Burj Khalifa and Dubai Mall" }, { name: "Dubai Marina", note: "Waterfront and beaches" }, { name: "Deira", note: "Affordable and close to souks" }],
    tips: ["Book Burj Khalifa at sunset well in advance.", "Dress modestly in traditional areas.", "The metro is clean, cheap and air-conditioned."],
    gettingAround: "The Dubai Metro and tram cover main areas. Taxis and ride-hailing are plentiful; abras cross the creek for a few dirhams.",
    safety: "Very safe. Respect local laws and customs, particularly around alcohol and public behaviour.",
  },
  {
    slug: "paris", name: "Paris", country: "France", region: "Europe", image: paris, featured: true,
    tagline: "The city that never runs out of corners to discover.",
    intro: "Paris is best experienced slowly: a long lunch, a walk along the Seine, an afternoon in a museum you'd never heard of. Look beyond the landmarks and the city reveals its neighbourhoods.",
    bestTime: "April to June, September to October", duration: "4–6 days", budget: "$150–$350 per day",
    attractions: ["Musée d'Orsay", "Montmartre", "Le Marais", "Sainte-Chapelle", "Canal Saint-Martin"],
    thingsToDo: ["Picnic on the Champ de Mars", "Explore covered passages", "Visit a Sunday market", "Take an evening Seine cruise"],
    eat: [{ name: "Bouillon Chartier", note: "Historic, affordable brasserie" }, { name: "Marché des Enfants Rouges", note: "Oldest covered market in Paris" }, { name: "Du Pain et des Idées", note: "Exceptional pastries" }],
    stay: [{ name: "Le Marais", note: "Central and lively" }, { name: "Saint-Germain", note: "Classic Left Bank charm" }, { name: "Canal Saint-Martin", note: "Local, creative and good value" }],
    tips: ["Many museums are free on the first Sunday of the month.", "Say 'bonjour' when entering shops.", "Lunch menus are the best-value meals."],
    gettingAround: "The Métro is fast and extensive. Vélib' bikes and walking are ideal for central arrondissements.",
    safety: "Safe overall; watch for pickpockets on the Métro and at major sights.",
  },
  {
    slug: "london", name: "London", country: "United Kingdom", region: "Europe", image: london, featured: true,
    tagline: "Free museums, ancient pubs and endless neighbourhoods.",
    intro: "London is many cities in one. Spend mornings in world-class free museums, afternoons in street markets and evenings in a historic pub or West End theatre.",
    bestTime: "May to September", duration: "4–6 days", budget: "$150–$350 per day",
    attractions: ["British Museum", "Tower of London", "Borough Market", "Tate Modern", "Hampstead Heath"],
    thingsToDo: ["Walk the South Bank", "See a West End show", "Explore Columbia Road Flower Market", "Ride the Thames Clipper"],
    eat: [{ name: "Dishoom", note: "Bombay café classics" }, { name: "Borough Market", note: "Produce and street food" }, { name: "Brick Lane", note: "Beigels and curry houses" }],
    stay: [{ name: "South Bank", note: "Central and walkable" }, { name: "Shoreditch", note: "Creative and nightlife-heavy" }, { name: "Kensington", note: "Museums and parks" }],
    tips: ["Use contactless payment on the Tube — daily caps apply.", "Most major museums are free.", "Book theatre tickets on the day for discounts."],
    gettingAround: "The Tube, buses and Overground cover everything. Tap in with a contactless card.",
    safety: "Safe; be aware of phone snatching on busy streets.",
  },
  {
    slug: "santorini", name: "Santorini", country: "Greece", region: "Europe", image: santorini,
    tagline: "Whitewashed villages above a volcanic sea.",
    intro: "Santorini's caldera views are as good as the photos suggest. Visit outside peak summer to enjoy the villages, wineries and black-sand beaches without the crowds.",
    bestTime: "April to June, September to October", duration: "3–4 days", budget: "$120–$400 per day",
    attractions: ["Oia", "Fira to Oia hike", "Akrotiri", "Red Beach", "Pyrgos"],
    thingsToDo: ["Hike the caldera path", "Taste Assyrtiko at a volcanic winery", "Sail around the caldera", "Watch sunset from Imerovigli"],
    eat: [{ name: "Metaxy Mas", note: "Cretan-Santorinian taverna" }, { name: "Lucky's Souvlakis", note: "Cheap and excellent in Fira" }, { name: "Ammoudi Bay", note: "Seafood by the water" }],
    stay: [{ name: "Imerovigli", note: "Caldera views, quieter than Oia" }, { name: "Fira", note: "Central with buses" }, { name: "Kamari", note: "Beachside and affordable" }],
    tips: ["Visit Oia at sunrise instead of sunset.", "Rent an ATV or car for flexibility.", "Avoid days with multiple cruise ships."],
    gettingAround: "KTEL buses connect villages via Fira. Rentals are the most flexible option.",
    safety: "Very safe; take care on cliff paths and in summer heat.",
  },
  {
    slug: "reykjavik", name: "Reykjavík", country: "Iceland", region: "Europe", image: aurora,
    tagline: "Northern lights, hot springs and volcanic roads.",
    intro: "Iceland's small capital is the launch point for waterfalls, glaciers and, in winter, the aurora. It's expensive, but the landscapes are unlike anywhere else on Earth.",
    bestTime: "September to March for aurora, June to August for road trips", duration: "5–8 days", budget: "$180–$400 per day",
    attractions: ["Golden Circle", "Sky Lagoon", "Hallgrímskirkja", "Reynisfjara", "Jökulsárlón"],
    thingsToDo: ["Chase the northern lights", "Soak in a geothermal lagoon", "Drive the South Coast", "Walk on a glacier with a guide"],
    eat: [{ name: "Bæjarins Beztu", note: "The famous hot dog stand" }, { name: "Grandi Mathöll", note: "Harbour food hall" }, { name: "Café Loki", note: "Rye bread ice cream" }],
    stay: [{ name: "Downtown Reykjavík", note: "Walkable and lively" }, { name: "South Coast farms", note: "Dark skies for aurora" }, { name: "Vík", note: "Base for black-sand beaches" }],
    tips: ["Check road.is and the aurora forecast daily.", "Supermarkets keep costs down.", "Tap water is excellent — skip bottled."],
    gettingAround: "Rent a car (4x4 in winter) or join small-group tours. Buses are limited outside the capital.",
    safety: "Very safe, but weather is dangerous. Respect beach warning signs and road closures.",
  },
  {
    slug: "tokyo", name: "Tokyo", country: "Japan", region: "Asia", image: tokyo, featured: true, trending: true,
    tagline: "Neon, tradition and the best food city on earth.",
    intro: "Tokyo is enormous yet orderly, futuristic yet deeply traditional. Every neighbourhood feels like its own village, with tiny bars, shrines and restaurants waiting to be found.",
    bestTime: "March to May, October to November", duration: "5–7 days", budget: "$100–$300 per day",
    attractions: ["Senso-ji", "Meiji Shrine", "Shibuya Crossing", "teamLab Planets", "Yanaka"],
    thingsToDo: ["Eat your way through Omoide Yokocho", "Visit Tsukiji Outer Market", "Day trip to Nikko or Kamakura", "Explore Shimokitazawa's vintage shops"],
    eat: [{ name: "Omoide Yokocho", note: "Smoky yakitori alleys" }, { name: "Tsukiji Outer Market", note: "Breakfast sushi and tamagoyaki" }, { name: "Depachika food halls", note: "Department-store basements" }],
    stay: [{ name: "Shinjuku", note: "Transport hub and nightlife" }, { name: "Asakusa", note: "Traditional atmosphere" }, { name: "Shibuya", note: "Shopping and cafés" }],
    tips: ["Get a Suica or Pasmo card on your phone.", "Tipping is not expected.", "Carry a small bag for rubbish — public bins are rare."],
    gettingAround: "Trains and the Metro are punctual and easy with an IC card. Taxis are clean but expensive.",
    safety: "One of the safest big cities in the world. Normal precautions apply in nightlife areas.",
  },
  {
    slug: "new-york", name: "New York", country: "United States", region: "North America", image: newyork, featured: true,
    tagline: "Five boroughs, a thousand neighbourhoods.",
    intro: "New York moves fast and doesn't apologise. Walk a bridge at sunset, eat a slice at midnight and spend a morning in a museum you could visit ten times.",
    bestTime: "April to June, September to November", duration: "4–6 days", budget: "$200–$450 per day",
    attractions: ["Central Park", "The Met", "Brooklyn Bridge", "The High Line", "Statue of Liberty"],
    thingsToDo: ["Walk the Brooklyn Bridge at sunrise", "Ride the Staten Island Ferry (free)", "Catch a Broadway show", "Eat through Queens"],
    eat: [{ name: "Katz's Delicatessen", note: "Pastrami since 1888" }, { name: "Joe's Pizza", note: "The classic slice" }, { name: "Flushing, Queens", note: "Regional Chinese food" }],
    stay: [{ name: "Lower Manhattan", note: "Historic and well-connected" }, { name: "Williamsburg", note: "Brooklyn bars and views" }, { name: "Upper West Side", note: "Quieter, near Central Park" }],
    tips: ["Tap to pay with OMNY on subways and buses.", "Tip 18–20% at restaurants.", "Book observation decks at off-peak times."],
    gettingAround: "The subway runs 24/7. Walking is the best way to experience Manhattan.",
    safety: "Generally safe in tourist areas; stay aware on late-night subways.",
  },
  {
    slug: "rio-de-janeiro", name: "Rio de Janeiro", country: "Brazil", region: "South America", image: rio,
    tagline: "Mountains that meet the sea, samba that never stops.",
    intro: "Rio's setting is unbeatable: forested peaks, golden beaches and a bay full of boats. Its real heart is in the neighbourhoods, botecos and Sunday samba circles.",
    bestTime: "December to March for heat, May to October for hiking", duration: "5–7 days", budget: "$70–$200 per day",
    attractions: ["Sugarloaf Mountain", "Christ the Redeemer", "Santa Teresa", "Ipanema", "Escadaria Selarón"],
    thingsToDo: ["Hike Dois Irmãos", "Join a roda de samba in Lapa", "Watch sunset at Arpoador", "Explore Tijuca Forest"],
    eat: [{ name: "Bar do Mineiro", note: "Feijoada in Santa Teresa" }, { name: "Confeitaria Colombo", note: "Belle Époque café" }, { name: "Beach kiosks", note: "Açaí and coconut water" }],
    stay: [{ name: "Ipanema", note: "Beachfront and walkable" }, { name: "Botafogo", note: "Local bars and good value" }, { name: "Santa Teresa", note: "Bohemian hillside" }],
    tips: ["Take only what you need to the beach.", "Visit Christ the Redeemer early.", "Learn a few Portuguese phrases."],
    gettingAround: "The metro links the beaches to the centre. Ride-hailing is cheap and safer than street taxis at night.",
    safety: "Use ride-hailing at night, keep phones hidden on the street and hike with a guide on less-busy trails.",
  },
  {
    slug: "sydney", name: "Sydney", country: "Australia", region: "Oceania", image: sydney,
    tagline: "Harbour life, coastal walks and brilliant brunch.",
    intro: "Sydney lives outdoors. Swim in ocean pools, ferry across the harbour and walk clifftop paths between beaches — then finish with world-class dining.",
    bestTime: "September to November, March to May", duration: "4–6 days", budget: "$150–$320 per day",
    attractions: ["Sydney Opera House", "Bondi to Coogee walk", "Manly", "The Rocks", "Royal Botanic Garden"],
    thingsToDo: ["Take the ferry to Manly", "Swim at Bondi Icebergs", "Climb the Harbour Bridge", "Day trip to the Blue Mountains"],
    eat: [{ name: "Bourke Street Bakery", note: "Famous sausage rolls" }, { name: "Chinatown & Haymarket", note: "Great-value Asian food" }, { name: "Single O", note: "Specialty coffee pioneer" }],
    stay: [{ name: "Circular Quay", note: "Harbour views, central" }, { name: "Surry Hills", note: "Food and bars" }, { name: "Bondi", note: "Beach life" }],
    tips: ["Swim between the flags.", "Use an Opal or contactless card on ferries.", "Sun protection is essential year-round."],
    gettingAround: "Ferries, trains and light rail are excellent. Tap on with a contactless card.",
    safety: "Very safe. Respect surf conditions and wear sunscreen.",
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);

type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "img"; src: string; caption: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "tip"; title: string; text: string };
export type { Block };

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: CategoryName;
  author: string;
  date: string;
  readTime: number;
  destination?: string;
  tags?: ("featured" | "popular" | "hidden-gem" | "inspiration")[];
  body: Block[];
}

const h = (text: string): Block => ({ type: "h2", text });
const p = (text: string): Block => ({ type: "p", text });
const list = (...items: string[]): Block => ({ type: "list", items });
const tip = (title: string, text: string): Block => ({ type: "tip", title, text });
const quote = (text: string, cite?: string): Block => ({ type: "quote", text, cite });
const img = (src: string, caption: string): Block => ({ type: "img", src, caption });

export const guides: Guide[] = [
  {
    slug: "ultimate-zanzibar-travel-guide", title: "The Ultimate Zanzibar Travel Guide",
    excerpt: "From Stone Town's carved doors to the reefs of Mnemba, everything you need to plan a week on the Spice Island.",
    image: zanzibar, category: "Destinations", author: "naledi-dlamini", date: "2026-09-28", readTime: 12, destination: "zanzibar", tags: ["featured", "popular"],
    body: [
      p("Zanzibar is two trips in one. There's Stone Town, a UNESCO-listed maze of coral-stone houses, mosques and markets — and there's the coast, where the Indian Ocean turns every shade of blue. The best itineraries give each half the time it deserves."),
      h("When to go"),
      p("The long dry season runs from June to October, with a shorter dry window from December to February. March to May brings heavy rain and many lodges close. Kitesurfers favour the steady winds of July and January."),
      tip("Scout tip", "Ramadan changes the rhythm of the island. Many restaurants close during the day, but evenings come alive. Check dates before you book."),
      h("Stone Town: two days minimum"),
      p("Hire a local guide for your first morning. The alleys are confusing, and a good guide brings the history of the slave market, the sultans' palaces and the trading families to life."),
      list("The Old Fort and House of Wonders", "The Anglican Cathedral and slave market memorial", "Darajani Market for spices and fruit", "Sunset drinks on a rooftop overlooking the harbour"),
      img(images.marrakech, "Spice stalls are a highlight of any old-town market visit."),
      h("Choosing a beach"),
      p("Nungwi and Kendwa in the north are swimmable at all tides and have the liveliest scene. Paje and Jambiani on the east coast are calmer, with dramatic tides that reveal seaweed farms and sandbanks at low water."),
      quote("Low tide in Jambiani is when the island shows you how it lives — women tending seaweed, children chasing crabs, fishermen walking home.", "Naledi Dlamini"),
      h("Budget and practicalities"),
      list("Visa on arrival or e-visa for most nationalities", "Travel insurance is required for entry", "US dollars widely accepted; bring newer notes", "Budget $60 a day for guesthouses, $250+ for beach resorts"),
    ],
  },
  {
    slug: "things-to-know-before-visiting-lagos", title: "10 Things You Should Know Before Visiting Lagos",
    excerpt: "Traffic, money, music and manners — the honest primer every first-time visitor to Lagos needs.",
    image: lagos, category: "Destinations", author: "adaeze-okafor", date: "2026-09-21", readTime: 9, destination: "lagos", tags: ["popular", "featured"],
    body: [
      p("Lagos can feel overwhelming on day one and addictive by day three. These are the things I tell every friend before they land at Murtala Muhammed."),
      h("1. Traffic shapes your day"),
      p("Locals call it 'go-slow'. Plan one area per day, travel before 7am or after 8pm when you can, and consider ferries between the islands."),
      h("2. Cash still matters"),
      p("Cards and transfers are widespread, but small vendors, tips and markets often run on cash. Withdraw naira at bank ATMs inside malls."),
      h("3. Ride-hailing is your friend"),
      p("Uber and Bolt are reliable and inexpensive. For full days, hiring a driver is often better value and far less stressful."),
      tip("Scout tip", "Save your hotel's address and a nearby landmark in your phone — drivers often navigate by landmark rather than street number."),
      h("4–10. The quick list"),
      list("Greetings matter — always say good morning before asking a question.", "Dress up: Lagosians take style seriously.", "Nightlife starts late; midnight is early.", "Try suya, small chops and pepper soup.", "Book Tarkwa Bay boats from licensed jetties.", "Power cuts happen; most hotels have generators.", "Ask before photographing people, especially in markets."),
      quote("Lagos doesn't slow down for you. Once you accept that, it starts to feel like the most alive place you've ever been.", "Adaeze Okafor"),
    ],
  },
  {
    slug: "hidden-gems-cape-town", title: "7 Hidden Gems in Cape Town",
    excerpt: "Tidal pools, secret trails and neighbourhood cafés most visitors never find.",
    image: capetown, category: "Adventure", author: "naledi-dlamini", date: "2026-09-14", readTime: 7, destination: "cape-town", tags: ["hidden-gem", "popular"],
    body: [
      p("Table Mountain and the V&A Waterfront deserve their fame, but Cape Town's best moments often happen away from them. Here are seven places locals love."),
      h("1. St James tidal pool"),
      p("Painted bathing boxes and a sheltered pool on the False Bay coast. Come early on weekdays."),
      h("2. Skeleton Gorge"),
      p("A shaded, ladder-assisted route up the back of Table Mountain from Kirstenbosch. Less crowded than Platteklip and far prettier."),
      h("3. Kalk Bay harbour at dawn"),
      p("Watch fishing boats come in, then breakfast in one of the village's bookish cafés."),
      h("4–7. More to explore"),
      list("Silvermine Nature Reserve's reservoir swim", "The Company's Garden at sunset", "Woodstock's street art and studios", "Scarborough's empty beaches near Cape Point"),
      tip("Safety", "Always hike with company and tell someone your route. Weather on the mountain changes fast."),
    ],
  },
  {
    slug: "travel-nigeria-on-a-budget", title: "How to Travel Nigeria on a Budget",
    excerpt: "Buses, guesthouses and street food: a realistic guide to exploring Nigeria for under $50 a day.",
    image: food, category: "Budget Travel", author: "adaeze-okafor", date: "2026-09-07", readTime: 10, destination: "lagos", tags: ["popular"],
    body: [
      p("Nigeria can be expensive if you rely on international hotels and private drivers. Travel the way Nigerians do and your money stretches much further."),
      h("Getting between cities"),
      p("Reputable intercity bus companies link Lagos with Ibadan, Abeokuta, Benin City and beyond. Book a day ahead and travel in daylight."),
      h("Where to sleep"),
      p("Locally run guesthouses and short-let apartments cost a fraction of big hotels. Check reviews for generator power and water supply."),
      h("Eating well for less"),
      list("Bukas serve rice, swallow and soups for a few dollars", "Street suya is cheaper and often better than restaurant versions", "Markets are best for fruit and snacks"),
      tip("Money", "Ask for prices before ordering at roadside spots and keep small notes handy."),
    ],
  },
  {
    slug: "best-places-to-visit-west-africa", title: "Best Places to Visit in West Africa",
    excerpt: "From Dakar's surf to Accra's galleries, the region's most rewarding destinations right now.",
    image: lagos, category: "Destinations", author: "adaeze-okafor", date: "2026-08-30", readTime: 11, tags: ["inspiration"],
    body: [
      p("West Africa is one of the world's most creative regions, yet still under-visited. These are the places we keep returning to."),
      h("Lagos, Nigeria"),
      p("The region's cultural engine: music, fashion, art and food on a giant scale."),
      h("Accra, Ghana"),
      p("Easy-going and welcoming, with a thriving gallery scene and beaches within reach."),
      h("Dakar, Senegal"),
      p("Surf breaks, colourful markets and a short ferry to historic Gorée Island."),
      h("Also consider"),
      list("Cape Coast and Elmina castles, Ghana", "Saint-Louis, Senegal", "Abeokuta's Olumo Rock, Nigeria", "The Bijagós Islands, Guinea-Bissau"),
      quote("The best way to see West Africa is slowly, and with an appetite.", "Adaeze Okafor"),
    ],
  },
  {
    slug: "first-timers-guide-to-dubai", title: "A First-Timer's Guide to Dubai",
    excerpt: "How to balance the glamour with old Dubai — plus where to eat, stay and save.",
    image: dubai, category: "Luxury Travel", author: "james-whitfield", date: "2026-08-24", readTime: 8, destination: "dubai", tags: ["popular"],
    body: [
      p("Dubai rewards a little planning. Mix the big-ticket sights with the creek, the souks and the city's extraordinary immigrant food scene."),
      h("Day one: old Dubai"),
      p("Start in Al Fahidi, cross the creek by abra and wander the Spice and Gold Souks. Lunch at a Pakistani or Iranian canteen."),
      h("Day two: the skyline"),
      p("Book the Burj Khalifa observation deck for late afternoon, then watch the fountains from the waterfront."),
      h("Day three: the desert"),
      p("Choose a conservation-focused desert operator for dune drives, falconry and dinner under the stars."),
      tip("Save money", "The metro is cheap and efficient. Many hotel beaches offer day passes that include lunch credit."),
    ],
  },
  {
    slug: "lagos-street-food-guide", title: "A Hungry Traveller's Guide to Lagos Street Food",
    excerpt: "Suya, puff-puff, boli and more: what to eat and where to find it.",
    image: food, category: "Food & Culture", author: "adaeze-okafor", date: "2026-08-18", readTime: 7, destination: "lagos", tags: ["inspiration"],
    body: [
      p("Some of the best food in Lagos is cooked on charcoal by the roadside. Here's how to eat like a local."),
      h("What to order"),
      list("Suya — spiced grilled beef with onions and yaji", "Boli — roasted plantain with groundnuts", "Puff-puff — sweet fried dough", "Jollof rice — the eternal debate"),
      img(images.food, "Jollof rice and suya from a Lagos market stall."),
      h("Where to go"),
      p("Ikoyi and Victoria Island have famous suya spots that open at dusk. For boli, look for roadside grills near bus stops in the afternoon."),
      tip("Scout tip", "Busy stalls mean fresh food. Follow the queues."),
    ],
  },
  {
    slug: "paris-beyond-the-eiffel-tower", title: "Paris Beyond the Eiffel Tower",
    excerpt: "Covered passages, neighbourhood markets and quiet museums for a slower Paris.",
    image: paris, category: "Solo Travel", author: "james-whitfield", date: "2026-08-10", readTime: 8, destination: "paris", tags: ["hidden-gem"],
    body: [
      p("Paris is perfect for solo travellers: walkable, café-filled and full of places where sitting alone is the norm."),
      h("Covered passages"),
      p("Galerie Vivienne and Passage des Panoramas are 19th-century arcades full of bookshops and tiny restaurants."),
      h("Small museums"),
      list("Musée de la Vie Romantique", "Musée Nissim de Camondo", "Musée Bourdelle (free)"),
      h("Markets"),
      p("Marché d'Aligre in the 12th is cheaper and more local than central markets."),
      tip("Solo dining", "Ask for a seat at the bar ('au comptoir') — it's sociable and often faster."),
    ],
  },
  {
    slug: "tokyo-izakaya-etiquette", title: "How to Eat at a Tokyo Izakaya",
    excerpt: "Ordering, etiquette and what to try in Japan's beloved small-plate pubs.",
    image: tokyo, category: "Food & Culture", author: "kenji-morita", date: "2026-08-02", readTime: 6, destination: "tokyo", tags: ["popular"],
    body: [
      p("Izakaya are the living rooms of Tokyo — casual pubs where friends share plates and drinks after work."),
      h("Getting started"),
      p("You'll often receive a small appetiser called otoshi with a cover charge. It's normal, not a scam."),
      h("What to order"),
      list("Karaage — fried chicken", "Yakitori — grilled skewers", "Edamame and pickles", "Seasonal sashimi"),
      quote("Order a little at a time. The izakaya is a conversation, not a banquet.", "Kenji Morita"),
      tip("Etiquette", "Wait for everyone's drink before saying 'kanpai', and never pour your own."),
    ],
  },
  {
    slug: "london-with-kids", title: "London with Kids: A Family Itinerary",
    excerpt: "Free museums, parks and river rides that keep every age happy.",
    image: london, category: "Family Travel", author: "james-whitfield", date: "2026-07-26", readTime: 7, destination: "london",
    body: [
      p("London is one of the world's best family cities, largely because so many of its best attractions are free."),
      h("Museum day"),
      p("The Natural History and Science Museums sit side by side in South Kensington. Arrive at opening time."),
      h("Outdoor day"),
      list("Diana Memorial Playground in Kensington Gardens", "Thames Clipper to Greenwich", "Hampstead Heath kite flying"),
      tip("Transport", "Children under 11 travel free on the Tube with a paying adult."),
    ],
  },
  {
    slug: "carry-on-only-packing-list", title: "The Carry-On Only Packing List",
    excerpt: "Travel lighter for two weeks with this tested list.",
    image: books, category: "Travel Tips", author: "james-whitfield", date: "2026-07-19", readTime: 6, tags: ["popular"],
    body: [
      p("Travelling with only a carry-on saves time, money and back pain. Here's the system we use."),
      h("Clothing"),
      list("4 tops that mix and match", "2 bottoms", "1 light jacket", "Packable layers rather than bulky items"),
      h("Essentials"),
      list("Universal adapter", "Power bank", "Reusable water bottle", "Copies of documents in the cloud"),
      tip("Scout tip", "Wear your heaviest shoes on the plane."),
    ],
  },
  {
    slug: "how-to-find-cheap-flights", title: "How to Find Cheap Flights in 2026",
    excerpt: "Flexible dates, fare alerts and the booking habits that actually save money.",
    image: books, category: "Travel Tips", author: "adaeze-okafor", date: "2026-07-12", readTime: 8,
    body: [
      p("There's no single trick to cheap flights, but a few habits consistently save money."),
      h("Be flexible"),
      p("Use calendar views to compare prices across a month. Mid-week departures are often cheaper."),
      h("Set alerts"),
      p("Fare alerts let prices come to you. Book when a fare drops below your target."),
      list("Check nearby airports", "Compare one-way combinations", "Consider positioning flights"),
      tip("Watch out", "Budget fares can be expensive once bags and seats are added. Compare the total."),
    ],
  },
  {
    slug: "solo-travel-safety-tips", title: "Solo Travel Safety Tips That Actually Work",
    excerpt: "Practical, non-alarmist advice for travelling alone with confidence.",
    image: marrakech, category: "Solo Travel", author: "naledi-dlamini", date: "2026-07-05", readTime: 7,
    body: [
      p("Solo travel is one of the most rewarding ways to see the world. A few habits make it safer and more relaxed."),
      h("Before you go"),
      list("Share your itinerary with someone at home", "Book your first night in advance", "Save offline maps"),
      h("On the ground"),
      p("Arrive in daylight when possible, use registered transport and trust your instincts."),
      tip("Scout tip", "Join a walking or food tour on day one — it's the quickest way to get your bearings and meet people."),
    ],
  },
  {
    slug: "marrakech-medina-guide", title: "Getting Lost (Happily) in the Marrakech Medina",
    excerpt: "How to navigate the souks, find the best riads and eat like a local.",
    image: marrakech, category: "Food & Culture", author: "kenji-morita", date: "2026-06-28", readTime: 9, destination: "marrakech", tags: ["hidden-gem"],
    body: [
      p("The medina is designed to confuse. Embrace it, and you'll find quiet courtyards and craftspeople at work."),
      h("Navigating"),
      p("Use landmarks — the Koutoubia minaret, Jemaa el-Fnaa — and download offline maps."),
      h("What to eat"),
      list("Tanjia — slow-cooked beef", "Msemen — layered flatbread", "Fresh orange juice in the square"),
      tip("Bargaining", "Start at about a third of the asking price and smile. It's a conversation."),
    ],
  },
  {
    slug: "northern-lights-iceland", title: "Chasing the Northern Lights in Iceland",
    excerpt: "Forecasts, locations and camera settings for seeing the aurora.",
    image: aurora, category: "Adventure", author: "naledi-dlamini", date: "2026-06-20", readTime: 8, destination: "reykjavik", tags: ["inspiration"],
    body: [
      p("Seeing the aurora takes patience, clear skies and a little luck. Here's how to improve your odds."),
      h("When"),
      p("September to March, on clear nights. Activity often peaks between 10pm and 2am."),
      h("Where"),
      list("Þingvellir National Park", "Grótta lighthouse near Reykjavík", "Rural South Coast farms"),
      tip("Camera", "Use a tripod, wide aperture, ISO 1600 and 5–15 second exposures."),
    ],
  },
  {
    slug: "planning-a-masai-mara-safari", title: "Planning Your First Masai Mara Safari",
    excerpt: "Conservancies, seasons and costs explained for first-time safari-goers.",
    image: safari, category: "Adventure", author: "naledi-dlamini", date: "2026-06-12", readTime: 10, destination: "nairobi", tags: ["popular"],
    body: [
      p("A Mara safari can be life-changing. Choosing the right season and camp makes a big difference."),
      h("Reserve or conservancy?"),
      p("Private conservancies limit vehicles and allow night drives and walking safaris. They cost more but benefit local Maasai landowners."),
      h("What to pack"),
      list("Neutral clothing", "Binoculars", "Warm layer for mornings", "Soft-sided bag for light aircraft"),
      tip("Responsible travel", "Choose operators that employ local guides and support conservation."),
    ],
  },
  {
    slug: "new-york-in-48-hours", title: "New York in 48 Hours",
    excerpt: "A fast-paced itinerary that balances icons with neighbourhood life.",
    image: newyork, category: "Destinations", author: "james-whitfield", date: "2026-06-04", readTime: 7, destination: "new-york",
    body: [
      p("Two days in New York won't cover everything, but it can cover the right things."),
      h("Day one"),
      list("Sunrise on the Brooklyn Bridge", "Lower Manhattan and the High Line", "Dinner in the West Village"),
      h("Day two"),
      list("The Met and Central Park", "Lunch in Harlem", "Sunset from a Williamsburg rooftop"),
      tip("Transport", "Tap OMNY to ride — fares cap after 12 rides in a week."),
    ],
  },
  {
    slug: "santorini-off-season", title: "Why Santorini Is Better in the Off-Season",
    excerpt: "Fewer crowds, lower prices and the same unforgettable views.",
    image: santorini, category: "Luxury Travel", author: "james-whitfield", date: "2026-05-27", readTime: 6, destination: "santorini", tags: ["hidden-gem"],
    body: [
      p("Visit in April, May or October and Santorini feels like a different island."),
      h("The benefits"),
      list("Hotel prices can drop by half", "Hiking weather is ideal", "Wineries have time to talk"),
      tip("Scout tip", "Some restaurants close from November to March. Check before you book."),
    ],
  },
  {
    slug: "sydney-coastal-walks", title: "Sydney's Best Coastal Walks",
    excerpt: "From Bondi to Manly, the clifftop trails that define the city.",
    image: sydney, category: "Adventure", author: "naledi-dlamini", date: "2026-05-18", readTime: 6, destination: "sydney", tags: ["inspiration"],
    body: [
      p("Sydney's coastline is lined with walking trails, ocean pools and lookouts."),
      h("Bondi to Coogee"),
      p("Six kilometres of beaches, cliffs and cafés. Allow two to three hours with swim stops."),
      h("Spit Bridge to Manly"),
      p("A ten-kilometre bushland trail with harbour views, finishing with a ferry back to the city."),
      tip("Sun safety", "Start early in summer and bring plenty of water."),
    ],
  },
  {
    slug: "rio-neighbourhood-guide", title: "Rio Like a Local: A Neighbourhood Guide",
    excerpt: "Where to drink, dance and eat beyond Copacabana.",
    image: rio, category: "Food & Culture", author: "kenji-morita", date: "2026-05-09", readTime: 8, destination: "rio-de-janeiro",
    body: [
      p("Rio's personality lives in its neighbourhoods. Here's where to spend your evenings."),
      h("Botafogo"),
      p("Craft beer bars and botecos with a young, local crowd."),
      h("Santa Teresa"),
      p("Hilltop bohemia with studios, trams and feijoada."),
      h("Lapa"),
      p("Samba halls and street parties under the arches."),
      tip("Scout tip", "Sunday afternoon rodas de samba are the best introduction to Rio's music."),
    ],
  },
];

export const sortedGuides = [...guides].sort((a, b) => b.date.localeCompare(a.date));
export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
export const guidesForDestination = (slug: string) => sortedGuides.filter((g) => g.destination === slug);
export const guidesByCategory = (name: string) => sortedGuides.filter((g) => g.category === name);
export const guidesByTag = (tag: NonNullable<Guide["tags"]>[number]) => sortedGuides.filter((g) => g.tags?.includes(tag));

export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export type SearchResult = {
  type: "Destination" | "Guide" | "Category";
  title: string;
  excerpt: string;
  image?: string;
  category: string;
  to: string;
};

export function searchAll(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const has = (...s: string[]) => s.some((x) => x.toLowerCase().includes(q));
  const d: SearchResult[] = destinations
    .filter((x) => has(x.name, x.country, x.region, x.tagline))
    .map((x) => ({ type: "Destination", title: `${x.name}, ${x.country}`, excerpt: x.tagline, image: x.image, category: x.region, to: `/destinations/${x.slug}` }));
  const c: SearchResult[] = categories
    .filter((x) => has(x.name, x.description))
    .map((x) => ({ type: "Category", title: x.name, excerpt: x.description, category: "Category", to: `/guides?category=${x.slug}` }));
  const g: SearchResult[] = sortedGuides
    .filter((x) => has(x.title, x.excerpt, x.category, x.destination ?? ""))
    .map((x) => ({ type: "Guide", title: x.title, excerpt: x.excerpt, image: x.image, category: x.category, to: `/guides/${x.slug}` }));
  return [...d, ...c, ...g];
}
