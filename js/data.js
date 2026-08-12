/* Atlantis Paradise Island — interactive directory data
   Coordinates are percentages of the source map image (2016 × 1287).
   Copy sourced from atlantisbahamas.com (Aug 2026) and the resort map itself. */

const BOOK_STAY = 'https://secure.atlantisbahamas.com/';
const BOOK_PLAY = 'https://www.atlantisbahamas.com/already-booked-things-to-do-atlantis';

const CATEGORIES = {
  stay:    { label: 'Where to Stay',   short: 'Stay',    color: '#BE914F' },
  thrills: { label: 'Water & Thrills', short: 'Thrills', color: '#2949E5' },
  marine:  { label: 'Marine Life',     short: 'Marine',  color: '#3AB0C8' },
  beaches: { label: 'Beaches & Pools', short: 'Beaches', color: '#27455C' },
  play:    { label: 'Play & Unwind',   short: 'Play',    color: '#EB897C' }
};

const PLACES = [
  /* ---------------------------------------------------------------- STAY */
  {
    id: 'royal',
    cat: 'stay',
    name: 'The Royal',
    kicker: 'The beacon of Atlantis',
    x: 53.5, y: 24.0,
    zoom: 2.02,
    blurb: 'The hotel that made Atlantis a landmark. Twin coral-pink towers joined by the Bridge Suite, with the Great Hall of Waters and the Ruins Lagoon at their feet — opulent details fit for royalty and adventures fit for thrill-seekers of any age.',
    points: [
      'Great Hall of Waters looks straight into the Ruins Lagoon',
      'Walk-out access to Aquaventure, the Casino and Mandara Spa',
      'Home of the Bridge Suite, the resort\'s most famous room'
    ],
    learn: 'https://www.atlantisbahamas.com/rooms/royaltowers',
    book: BOOK_STAY
  },
  {
    id: 'cove',
    cat: 'stay',
    name: 'The Cove',
    kicker: 'All-suite, ocean-facing luxury',
    x: 79.0, y: 14.6,
    zoom: 2.11,
    blurb: 'Immaculately designed to provide guests with luxury, sensuality and white-glove Bahamian service. Every room is a suite, and the tower sits between two of the quietest stretches of sand on the property.',
    points: [
      'Private access to Paradise Beach and Cove Beach',
      'The Cove Pool — adults-only beach club with poolside gaming',
      'Suite-only tower with dedicated Cove guest services'
    ],
    learn: 'https://www.atlantisbahamas.com/rooms/thecoveatlantis',
    book: BOOK_STAY
  },
  {
    id: 'reef',
    cat: 'stay',
    name: 'The Reef',
    kicker: 'Residences with kitchens',
    x: 71.9, y: 7.0,
    zoom: 2.11,
    blurb: 'For those who want the comforts of home with remarkable views of a tropical paradise. Studio-to-multi-bedroom residences with full kitchens and balconies, tucked at the quiet northern edge of the resort.',
    points: [
      'Full kitchens and laundry — built for longer stays',
      'Shares Paradise Beach and the Cascades Pool with The Cove',
      'Closest tower to Dolphin Cay and the Tennis Center'
    ],
    learn: 'https://www.atlantisbahamas.com/rooms/thereefatlantis/accommodations',
    book: BOOK_STAY
  },
  {
    id: 'coral',
    cat: 'stay',
    name: 'The Coral',
    kicker: 'Fresh design, marina views',
    x: 39.2, y: 60.6,
    zoom: 1.94,
    blurb: 'Newly reimagined and set between the marina and the sea, The Coral pairs a bright contemporary aesthetic with views of some of the most beautiful yachts in the world.',
    points: [
      'The Coral Pool and a private stretch of Atlantis Beach',
      'Two minutes on foot to Marina Village and the Casino',
      'The best-value gateway to everything Atlantis includes'
    ],
    learn: 'https://www.atlantisbahamas.com/rooms/coraltowers',
    book: BOOK_STAY
  },
  {
    id: 'harborside',
    cat: 'stay',
    name: 'Harborside Resort',
    kicker: 'Villas on the harbour',
    x: 16.2, y: 29.4,
    zoom: 2.02,
    blurb: 'A nautical oasis of low-rise villas across the water from the marina, with full kitchens, its own pools and a slower rhythm — while still holding the keys to the whole resort.',
    points: [
      'Villa-style units with full kitchens and living rooms',
      'Two dedicated pools and a poolside bar away from the crowds',
      'Nassau Harbour views; short walk to Marina Village'
    ],
    learn: 'https://www.atlantisbahamas.com/rooms/harborsideresort',
    book: BOOK_STAY
  },

  /* ------------------------------------------------------------- THRILLS */
  {
    id: 'aquaventure',
    cat: 'thrills',
    name: 'Aquaventure',
    kicker: '141 acres of water',
    x: 74.6, y: 28.4,
    zoom: 1.67,
    blurb: 'The waterscape at the centre of the resort: 141 acres holding 20 million gallons of water, more than 20 swimming areas, high-speed slides, a mile-long river ride and five miles of white sand beach.',
    points: [
      '20 million gallons across more than 20 swimming areas',
      'Included with every Atlantis room — no extra ticket',
      'Poseidon\'s Playzone water fort for younger kids'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/aquaventure-water-park',
    book: BOOK_PLAY
  },
  {
    id: 'power-tower',
    cat: 'thrills',
    name: 'Power Tower',
    kicker: 'The Abyss · The Drop · The Surge · The Falls',
    x: 80.9, y: 31.5,
    zoom: 2.29,
    blurb: 'A 120-foot tower stacking four of the resort\'s fastest rides. The Surge sends inner tubes over a camel-back drop into white water; The Abyss and The Drop take the steeper, darker route down.',
    points: [
      '120 feet tall — the highest launch point at Aquaventure',
      'The Surge: camel-back drop into a white-water run',
      '48" minimum height on the tower rides'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/aquaventure-water-park',
    book: BOOK_PLAY
  },
  {
    id: 'mayan-temple',
    cat: 'thrills',
    name: 'Mayan Temple',
    kicker: 'Leap of Faith',
    x: 71.3, y: 38.0,
    zoom: 2.29,
    blurb: 'The most photographed drop in the Caribbean. Leap of Faith is a 60-foot near-vertical body slide that fires you through a clear acrylic tunnel running the length of a shark-filled lagoon.',
    points: [
      'Leap of Faith — a 60-foot, almost-vertical drop',
      'Clear tunnel through a live marine lagoon',
      'Challenger Slides race side by side with speed clocks'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/aquaventure-water-park',
    book: BOOK_PLAY
  },
  {
    id: 'rapids-river',
    cat: 'thrills',
    name: 'The Rapids River',
    kicker: 'A mile of moving water',
    x: 70.6, y: 22.6,
    zoom: 1.94,
    blurb: 'Not a lazy river. A mile-long circuit with wave surges, elevation changes and drops of up to seven feet, threading white-water sections between the towers and the beach.',
    points: [
      'One mile long with wave surges and white water',
      'Drops of up to seven feet along the route',
      'Rejoins the calmer Lazy River Ride for an easier lap'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/aquaventure-water-park',
    book: BOOK_PLAY
  },

  /* -------------------------------------------------------------- MARINE */
  {
    id: 'the-dig',
    cat: 'marine',
    name: 'The Dig',
    kicker: 'The Lost City, below sea level',
    x: 49.3, y: 37.4,
    zoom: 2.2,
    blurb: 'A walk through the excavated ruins of the Lost City of Atlantis, where exotic marine species have taken up residence inside the streets, aqueducts and laboratories of a civilisation that supposedly sank 11,000 years ago.',
    points: [
      'Set beneath The Royal, open to all resort guests',
      'Part of the largest open-air marine habitat in the world',
      'Over 250 marine species across 14 connected lagoons'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/marine-habitat',
    book: BOOK_PLAY
  },
  {
    id: 'dolphin-cay',
    cat: 'marine',
    name: 'Dolphin Cay',
    kicker: '14 acres · rescue and rehabilitation',
    x: 54.1, y: 14.6,
    zoom: 2.11,
    blurb: 'One of the most sophisticated marine habitats in the world, and the Caribbean\'s premier marine life rescue and rehabilitation facility. Meet dolphins and sea lions face to face, or swim, kayak and paddleboard alongside them.',
    points: [
      'Playtime with Dolphins, Swim in Wonder, Sea Lion Interaction',
      'Ultimate Trainer for a Day — work beside an animal behaviorist',
      'Every programme supports the Atlantis Blue Project Foundation'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/dolphin-cay',
    book: BOOK_PLAY
  },
  {
    id: 'predator-lagoon',
    cat: 'marine',
    name: 'Predator Lagoon',
    kicker: 'A 100-foot tunnel through the sharks',
    x: 58.7, y: 59.3,
    zoom: 2.2,
    blurb: 'A clear underwater tunnel runs 100 feet through the lagoon, giving 360-degree views of sharks, barracuda, rays, sawfish and giant grouper moving through schools of reef fish overhead.',
    points: [
      '100-foot transparent tunnel with 360° views',
      'Sharks, barracuda, rays and critically endangered sawfish',
      'Feedings Tuesday–Sunday at 8am and 3pm'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/marine-habitat',
    book: BOOK_PLAY
  },

  /* ------------------------------------------------------------- BEACHES */
  {
    id: 'cove-beach',
    cat: 'beaches',
    name: 'Cove Beach',
    kicker: 'The quiet crescent',
    x: 87.0, y: 25.5,
    zoom: 1.94,
    blurb: 'A soft white crescent on the Atlantic side of the resort, backed by The Cove and its adults-only pool. The calmest sand at Atlantis, with beachside service and cabanas along the treeline.',
    points: [
      'Beaches open 10am–7pm, seasonally adjusted',
      'Private cabanas available along the sand',
      'Paradise Beach next door is reserved for Cove and Reef guests'
    ],
    learn: 'https://www.atlantisbahamas.com/thingstodo/pools-beaches',
    book: BOOK_PLAY
  },
  {
    id: 'paradise-lagoon',
    cat: 'beaches',
    name: 'Paradise Lagoon',
    kicker: 'Seven acres of protected water',
    x: 49.6, y: 51.2,
    zoom: 1.85,
    blurb: 'A seven-acre saltwater lagoon in the heart of the property with beaches on both shores. The north side is calm and gradual for families; the south side is where the snorkelling and watersports launch.',
    points: [
      'Paddleboards, kayaks, water bikes and snorkel gear at the south beach',
      'North beach has a gradual entry — best for small children',
      'Book gear through the Blue Adventures desk'
    ],
    learn: 'https://www.atlantisbahamas.com/thingstodo/pools-beaches',
    book: BOOK_PLAY
  },

  /* ---------------------------------------------------------------- PLAY */
  {
    id: 'casino',
    cat: 'play',
    name: 'The Casino',
    kicker: 'Built over a seven-acre lagoon',
    x: 39.4, y: 47.0,
    zoom: 2.11,
    blurb: 'A gaming floor suspended over a seven-acre lagoon, under soaring ceilings, Atlantean sculpture and the Chihuly glass of the Temple of the Sun. Eighty tables, the newest slots, and a sports book that never closes.',
    points: [
      '80 gaming tables — blackjack, craps, roulette, baccarat',
      'Slots 24/7; table games 10am–4am daily',
      'Cleitos private tables and the Sea Glass lounge'
    ],
    learn: 'https://www.atlantisbahamas.com/casino',
    book: BOOK_PLAY
  },
  {
    id: 'mandara-spa',
    cat: 'play',
    name: 'Mandara Spa',
    kicker: 'Balinese healing, Bahamian setting',
    x: 62.6, y: 21.2,
    zoom: 2.2,
    blurb: 'Ancient Balinese healing and traditional European therapy blended with natural elements unique to The Bahamas — massage, Elemis facials and body rituals, plunge pools, steam and sauna, and a full salon.',
    points: [
      'Open daily 10am–6pm',
      'Currently at the Mandara Boutique Spa, Royal Tower West',
      'A fully reimagined flagship spa debuts Summer 2026'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/spa',
    book: BOOK_PLAY
  },
  {
    id: 'marina-village',
    cat: 'play',
    name: 'Marina Village',
    kicker: '65,000 sq ft of shops and tables',
    x: 7.4, y: 57.6,
    zoom: 2.02,
    blurb: 'An open-air Bahamian marketplace on the water — 65,000 square feet, more than 20 designer and retail shops, and everything from conch shacks to Nobu, all facing the yachts.',
    points: [
      'Over 20 designer and retail shops, open 10am–10pm',
      'Straw Market across the way — around 60 Bahamian craft booths',
      'Food Truck Village by Tin Ferl for casual Bahamian plates'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/marina-village',
    book: BOOK_PLAY
  },
  {
    id: 'atlantis-marina',
    cat: 'play',
    name: 'Atlantis Marina',
    kicker: 'Deep-water berths for 63 yachts',
    x: 26.0, y: 45.4,
    zoom: 2.11,
    blurb: 'The protected deep-water marina that gives the resort its front row of megayachts, wrapped by Marina Village and its restaurants. Charters, fishing and day excursions all leave from here.',
    points: [
      'Full-service marina at the centre of the resort',
      'Departure point for fishing charters and boat excursions',
      'Ringed by Marina Village dining and shopping'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/marina-village',
    book: BOOK_PLAY
  },
  {
    id: 'theatre',
    cat: 'play',
    name: 'Atlantis Theatre & Nightlife',
    kicker: 'Atlantis LIVE · Aura · The Dilly Club',
    x: 30.9, y: 73.6,
    zoom: 2.11,
    blurb: 'The resort\'s stage for the Atlantis LIVE concert series, with Aura Nightclub above the Casino and the Dilly Club for late sets and cocktails once the theatre empties out.',
    points: [
      'Atlantis LIVE brings touring acts to the resort theatre',
      'Aura Nightclub sits above the Casino floor',
      'CRUSH teen nightclub runs a separate under-18 programme'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/entertainment/aura-nightclub',
    book: BOOK_PLAY
  },
  {
    id: 'kids',
    cat: 'play',
    name: 'Atlantis Kids Adventures',
    kicker: 'Ages 3–12',
    x: 31.8, y: 83.0,
    zoom: 2.2,
    blurb: 'A club where children choose their own adventure across themed rooms — a Victorian dollhouse and Lego build room for the little ones, a culinary studio, performance room and gaming den for the older group.',
    points: [
      'Themed rooms split by age: 3–6 and 7–12',
      'Morning, afternoon and late-night sessions',
      'Reservation and payment required to hold a spot'
    ],
    learn: 'https://www.atlantisbahamas.com/atlantis-kids-adventures',
    book: BOOK_PLAY
  },
  {
    id: 'golf',
    cat: 'play',
    name: 'Ocean Club Golf Course',
    kicker: 'Tom Weiskopf · par 72',
    x: 3.2, y: 65.8,
    zoom: 1.94,
    offmap: true,
    blurb: 'Just west of the resort, a Tom Weiskopf championship layout running more than 7,100 yards along the tip of the Paradise Island peninsula, with the Atlantic on one side and Nassau Harbour on the other.',
    points: [
      'Par 72, over 7,100 yards, ocean on both sides',
      'Crosswinds off the Atlantic make it play longer than the card',
      'Lessons, clinics, Callaway rentals and Play with a Pro'
    ],
    learn: 'https://www.atlantisbahamas.com/things-to-do/golf',
    book: BOOK_PLAY
  }
];
