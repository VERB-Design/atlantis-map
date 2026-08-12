# Atlantis Paradise Island — Interactive Resort Map

A full-bleed (100vw × 100vh) interactive directory built on the illustrated
Atlantis Paradise Island resort map. No frameworks, no build step, no
dependencies — open `index.html` or serve the folder.

## What's in it

**21 clickable markers**

| Category | Count | Places |
|---|---|---|
| Where to Stay | 5 | The Royal, The Cove, The Reef, The Coral, Harborside Resort |
| Water & Thrills | 4 | Aquaventure, Power Tower, Mayan Temple, The Rapids River |
| Marine Life | 3 | The Dig, Dolphin Cay, Predator Lagoon |
| Beaches & Pools | 2 | Cove Beach, Paradise Lagoon |
| Play & Unwind | 7 | The Casino, Mandara Spa, Marina Village, Atlantis Marina, Atlantis Theatre & Nightlife, Atlantis Kids Adventures, Ocean Club Golf Course |

Clicking a marker flies the map to that location (offset to clear the tray)
and slides a panel in from the left with an image, description, three key
points, and **Learn more** / **Book** buttons.

**Interaction**
- Drag to pan · scroll or pinch to zoom · +/− and reset controls
- Category filter bar along the bottom
- `Esc` or a click on open map closes the tray
- Deep links: `index.html#dolphin-cay` opens straight to a place

## Files

```
index.html          markup + cache-busted asset links
css/styles.css      all styling
js/data.js          the 21 places — copy, coordinates, links   <- edit this
js/map.js           pan/zoom engine, markers, tray
assets/atlantis-map.jpg   source artwork (2016 × 1287)
```

## Editing content

Everything editable lives in `js/data.js`. Each entry:

```js
{
  id: 'dolphin-cay',        // also the deep-link hash
  cat: 'marine',            // stay | thrills | marine | beaches | play
  name: 'Dolphin Cay',
  kicker: '14 acres · rescue and rehabilitation',
  x: 54.1, y: 14.6,         // % of the map image — this is the pin position
  zoom: 2.11,               // how far to fly in (× the fitted view)
  blurb: '…',
  points: ['…','…','…'],    // exactly 3
  learn: 'https://…',
  book:  'https://…'
}
```

To move a pin, change `x` / `y` — they're percentages of the map image, so
they're resolution-independent.

## Notes for next pass

- **Tray imagery** is currently a zoomed crop of the map artwork itself. To use
  real photography, drop files into `assets/img/` and swap the
  `#tray-hero-img` background in `paintHero()` (`js/map.js`) for `p.image`.
- **Map resolution** is 2016 × 1287, which is why max zoom is capped at 2.8×.
  A higher-res export would allow deeper zoom and a sharper focused view.
- The legend printed on the original artwork (bottom right) is covered by a
  live glass "Map Key" panel that scales with the map.
- Copy and links sourced from atlantisbahamas.com, August 2026.
- Bump the `?v=N` params in `index.html` after any css/js change.
