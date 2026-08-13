# Atlantis Paradise Island — Interactive Resort Map

A full-bleed (100vw × 100vh) interactive directory built on the illustrated
Atlantis Paradise Island resort map. No frameworks, no build step, no
dependencies — open `index.html` or serve the folder.

## What's in it

**83 clickable markers** under a five-item top menu — View all, Stay,
Experiences, Aquaventure, Dining. Experiences drops down to a second level:
View all, Marine Activities, Dolphin Cay, Pools, Entertainment, Casino,
Spa & Fitness, Golf & Tennis, Shopping. Counts next to each are live.

Aquaventure holds the waterpark itself — slides, towers, rivers and the pools
inside it. Everything you can eat or drink, including the Aquaventure outlets,
sits under Dining.


Clicking a marker flies the map to that location (offset to clear the tray)
and slides a panel in from the left with an image, description, three key
points, and **Learn more** / **Book** buttons.

**Interaction**
- Drag to pan · scroll or pinch to zoom · +/− and reset controls
- Zooming out stops at full width — the map's left and right edges stay
  pinned to the viewport edges and never pull in to a letterbox
- Category filter bar along the bottom
- `Esc` or a click on open map closes the tray
- Deep links: `index.html#dolphin-cay` opens straight to a place

## Files

```
index.html          markup + cache-busted asset links
css/styles.css      all styling
js/data.js          the 21 places — copy, coordinates, links   <- edit this
js/map.js           pan/zoom engine, markers, tray
assets/atlantis-map.jpg   clean greyscale artwork (3456 × 2206)
assets/img/*.jpg          21 place photographs, 1:1
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
  image: 'assets/img/dolphin-cay.jpg',
  blurb: '…',
  points: ['…','…','…'],    // exactly 3
  learn: 'https://…',
  book:  'https://…'
}
```

To move a pin, change `x` / `y` — they're percentages of the map image, so
they're resolution-independent.

## Notes for next pass

- **Tray imagery** is real photography pulled from atlantisbahamas.com's own
  CDN, cropped 1:1 to 800x800 in `assets/img/<id>.jpg`. Swap any of them by
  replacing the file, or point `image:` in `js/data.js` somewhere else.
- **Skin**: `#254297` is the only brand colour and is reserved for primary
  actions. Everything secondary is grey. Colour survives only on the map
  pins, one hue per category.
- **Drawer** is 400px max-width with a 1:1 hero image and top-aligned copy.
- **Outfit is the only typeface**, loaded from Google Fonts at 200-600.
- The artwork is the **clean greyscale render** — no labels, legend, pins or
  wordmark baked in, so the UI supplies all of them and the coloured pins are
  the only colour on the page. It is laid out at 2016 × 1287 while the file is
  3456px wide, giving ~1.7x for crisp zooming; every marker coordinate is a
  percentage of that layout box, so swapping the artwork for another render
  with the same framing needs no coordinate changes.
- Copy and links sourced from atlantisbahamas.com, August 2026.
- Bump the `?v=N` params in `index.html` (css, js, and the map `<img>`) and
  in `js/data.js` (the photo paths) after changing any asset.
