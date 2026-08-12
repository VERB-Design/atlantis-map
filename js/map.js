/* ============================================================
   Atlantis Paradise Island — Interactive Resort Map
   Pan / zoom engine, markers, filters and detail tray.
   No dependencies.
   ============================================================ */
(function () {
  'use strict';

  /* Layout space for the map. The asset is 3456px wide but is laid out at
     2016x1287, so it renders at ~1.7x for crisp zooming while every marker
     coordinate stays a plain percentage of this box. */
  var MAP_W = 2016, MAP_H = 1287;
  var MAX_SCALE = 3.2;

  var app      = document.getElementById('app');
  var viewport = document.getElementById('viewport');
  var stage    = document.getElementById('stage');
  var mkLayer  = document.getElementById('markers');
  var filters  = document.getElementById('filters');
  var tray     = document.getElementById('tray');
  var heroImg  = document.getElementById('tray-hero-img');

  /* view state */
  var tx = 0, ty = 0, s = 1, minScale = 1;
  var vw = 0, vh = 0;
  var activeId = null;
  var activeCat = 'all';
  var nodes = {};                   // id -> marker element
  var anim = null;

  /* ---------------------------------------------------------- utils */

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
  function easeInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function isNarrow() { return window.innerWidth <= 720; }

  /* How much of the viewport the open tray covers. The pan bounds are
     extended by this so an edge-of-map marker can still be brought into
     the part of the screen the user can actually see. */
  function trayPad() {
    if (!app.classList.contains('tray-open')) return { left: 0, bottom: 0 };
    return isNarrow()
      ? { left: 0, bottom: tray.offsetHeight }
      : { left: tray.offsetWidth, bottom: 0 };
  }

  /* Keep the map covering the viewport at all times. */
  function clampPan(nx, ny, ns) {
    var w = MAP_W * ns, h = MAP_H * ns, pad = trayPad();
    var slack = Math.min(pad.left, Math.max(0, w - vw));
    nx = w <= vw ? (vw - w) / 2 : clamp(nx, vw - w, slack);
    ny = (h + pad.bottom) <= vh ? (vh - h) / 2 : clamp(ny, vh - h - pad.bottom, 0);
    return [nx, ny];
  }

  function apply() {
    stage.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0) scale(' + s + ')';
    stage.style.setProperty('--inv', 1 / s);
    app.classList.toggle('is-zoomed', s > (vw / MAP_W) * 1.25);
  }

  function setView(nx, ny, ns) {
    ns = clamp(ns, minScale, MAX_SCALE);
    var p = clampPan(nx, ny, ns);
    tx = p[0]; ty = p[1]; s = ns;
    apply();
  }

  function tweenTo(nx, ny, ns, dur) {
    if (anim) cancelAnimationFrame(anim);
    ns = clamp(ns, minScale, MAX_SCALE);
    var p = clampPan(nx, ny, ns);
    var x0 = tx, y0 = ty, s0 = s;
    var x1 = p[0], y1 = p[1], s1 = ns;
    var t0 = performance.now();
    dur = dur || 900;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setView(x1, y1, s1); return;
    }

    (function step(now) {
      var k = clamp((now - t0) / dur, 0, 1), e = easeInOut(k);
      tx = x0 + (x1 - x0) * e;
      ty = y0 + (y1 - y0) * e;
      s  = s0 + (s1 - s0) * e;
      apply();
      if (k < 1) anim = requestAnimationFrame(step); else anim = null;
    })(t0);
  }

  /* -------------------------------------------------------- sizing */

  /* Vertical band the markers actually occupy, as a 0-1 fraction of the
     map height. The resting view is framed on this rather than on the
     artwork's centre, so no pin falls outside the default crop. */
  var band = null;
  function markerBand() {
    if (band) return band;
    var lo = 1, hi = 0;
    PLACES.forEach(function (p) {
      var y = p.y / 100;
      if (y < lo) lo = y;
      if (y > hi) hi = y;
    });
    band = (lo + hi) / 2;
    return band;
  }

  /* Scale at which the whole map would fit. No longer reachable by zooming
     out, but still the reference the per-place focus zooms are tuned to. */
  function fitScale() { return Math.min(vw / MAP_W, vh / MAP_H); }

  /* Resting view: the map spans the full viewport width. */
  function defaultView() {
    var ds = clamp(vw / MAP_W, minScale, MAX_SCALE);
    return [(vw - MAP_W * ds) / 2, vh / 2 - markerBand() * MAP_H * ds, ds];
  }

  function measure(keepAnchor) {
    var anchorX = (vw / 2 - tx) / s, anchorY = (vh / 2 - ty) / s;
    vw = viewport.clientWidth;
    vh = viewport.clientHeight;
    /* zoom-out floor is full width: the map's left and right edges stay
       pinned to the viewport edges, never pulling in to a letterbox */
    minScale = vw / MAP_W;

    if (keepAnchor && s > 0) {
      var ns = Math.max(s, minScale);
      setView(vw / 2 - anchorX * ns, vh / 2 - anchorY * ns, ns);
    } else {
      var d = defaultView();
      setView(d[0], d[1], d[2]);
    }
  }

  /* ------------------------------------------------------- markers */

  function buildMarkers() {
    var frag = document.createDocumentFragment();

    PLACES.forEach(function (p) {
      var colour = CATEGORIES[p.cat].color;

      var wrap = document.createElement('div');
      wrap.className = 'mk' + (p.cat === 'stay' ? ' is-stay' : '');
      wrap.style.left = p.x + '%';
      wrap.style.top  = p.y + '%';
      wrap.dataset.cat = p.cat;
      wrap.dataset.id  = p.id;

      var inner = document.createElement('button');
      inner.type = 'button';
      inner.className = 'mk-inner';
      inner.style.setProperty('--c', colour);
      inner.setAttribute('aria-label', p.name + ' — ' + CATEGORIES[p.cat].label);

      var dot = document.createElement('span');
      dot.className = 'dot';

      var label = document.createElement('span');
      label.className = 'mk-label';
      label.textContent = p.name;

      inner.appendChild(dot);
      inner.appendChild(label);
      wrap.appendChild(inner);
      frag.appendChild(wrap);
      nodes[p.id] = wrap;

      inner.addEventListener('click', function (e) {
        e.stopPropagation();
        open(p.id);
      });
    });

    mkLayer.appendChild(frag);
  }

  /* ------------------------------------------------------- filters */

  function buildFilters() {
    var defs = [{ key: 'all', label: 'All', color: '#1F2328' }];
    Object.keys(CATEGORIES).forEach(function (k) {
      defs.push({ key: k, label: CATEGORIES[k].short, color: CATEGORIES[k].color });
    });

    defs.forEach(function (d) {
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.cat = d.key;
      b.setAttribute('aria-pressed', d.key === 'all' ? 'true' : 'false');

      var sw = document.createElement('span');
      sw.className = 'swatch';
      sw.style.setProperty('--c', d.color);

      var tx_ = document.createElement('span');
      tx_.textContent = d.label;

      b.appendChild(sw);
      b.appendChild(tx_);
      b.addEventListener('click', function () { setFilter(d.key); });
      filters.appendChild(b);
    });
  }

  function setFilter(cat) {
    activeCat = cat;

    Array.prototype.forEach.call(filters.children, function (b) {
      b.setAttribute('aria-pressed', b.dataset.cat === cat ? 'true' : 'false');
    });

    PLACES.forEach(function (p) {
      var hidden = cat !== 'all' && p.cat !== cat;
      nodes[p.id].classList.toggle('is-hidden', hidden);
      if (hidden && p.id === activeId) close();
    });
  }

  /* ---------------------------------------------------------- tray */

  function paintHero(p) {
    heroImg.style.backgroundImage = p.image ? 'url("' + p.image + '")' : 'none';
  }

  function open(id) {
    var p = null;
    for (var i = 0; i < PLACES.length; i++) if (PLACES[i].id === id) { p = PLACES[i]; break; }
    if (!p) return;

    app.classList.add('touched');

    /* marker state */
    if (activeId && nodes[activeId]) nodes[activeId].classList.remove('is-active');
    nodes[p.id].classList.add('is-active');
    activeId = p.id;

    /* content */
    document.getElementById('tray-cat').textContent    = CATEGORIES[p.cat].label;
    document.getElementById('tray-kicker').textContent = p.kicker;
    document.getElementById('tray-title').textContent  = p.name;
    document.getElementById('tray-blurb').textContent  = p.blurb;

    var ul = document.getElementById('tray-points');
    ul.innerHTML = '';
    p.points.slice(0, 3).forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = t;
      ul.appendChild(li);
    });

    var learn = document.getElementById('tray-learn');
    var book  = document.getElementById('tray-book');
    learn.href = p.learn;
    book.href  = p.book;
    book.textContent = p.cat === 'stay' ? 'Book a stay' : 'Book';

    /* replay the reveal animation on re-open */
    app.classList.remove('tray-open');
    void tray.offsetWidth;
    app.classList.add('tray-open');
    tray.setAttribute('aria-hidden', 'false');
    document.getElementById('tray-body').scrollTop = 0;

    paintHero(p);

    /* fly the map to the marker, offset for the tray */
    focusPlace(p);

    if (history.replaceState) history.replaceState(null, '', '#' + p.id);
  }

  function focusPlace(p) {
    var trayW = isNarrow() ? 0 : tray.offsetWidth;
    var targetX = trayW + (vw - trayW) / 2;
    var targetY = isNarrow() ? vh * 0.13 : vh * 0.5;

    var ns = clamp(fitScale() * (p.zoom || 2.2), minScale, MAX_SCALE);
    var px = (p.x / 100) * MAP_W, py = (p.y / 100) * MAP_H;

    tweenTo(targetX - px * ns, targetY - py * ns, ns, 950);
  }

  function close() {
    if (activeId && nodes[activeId]) nodes[activeId].classList.remove('is-active');
    activeId = null;
    app.classList.remove('tray-open');
    tray.setAttribute('aria-hidden', 'true');
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    var d = defaultView();
    tweenTo(d[0], d[1], d[2], 850);
  }

  /* ------------------------------------------------- pan / zoom in */

  var drag = null, moved = false;

  viewport.addEventListener('pointerdown', function (e) {
    if (e.target.closest('.mk-inner')) return;
    if (anim) { cancelAnimationFrame(anim); anim = null; }
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, tx: tx, ty: ty };
    moved = false;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture(e.pointerId);
    app.classList.add('touched');
  });

  viewport.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
    setView(drag.tx + dx, drag.ty + dy, s);
  });

  function endDrag(e) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    drag = null;
    viewport.classList.remove('is-dragging');
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  /* click empty map to dismiss */
  viewport.addEventListener('click', function (e) {
    if (moved || e.target.closest('.mk-inner')) return;
    if (activeId) close();
  });

  /* wheel / trackpad zoom about the cursor */
  viewport.addEventListener('wheel', function (e) {
    e.preventDefault();
    if (anim) { cancelAnimationFrame(anim); anim = null; }
    app.classList.add('touched');
    var factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.012 : 0.0022));
    zoomAt(e.clientX, e.clientY, s * factor);
  }, { passive: false });

  function zoomAt(vx, vy, ns) {
    ns = clamp(ns, minScale, MAX_SCALE);
    var px = (vx - tx) / s, py = (vy - ty) / s;
    setView(vx - px * ns, vy - py * ns, ns);
  }

  /* pinch */
  var pinch = null;
  var pointers = {};
  viewport.addEventListener('pointerdown', function (e) { pointers[e.pointerId] = e; });
  viewport.addEventListener('pointermove', function (e) {
    if (!(e.pointerId in pointers)) return;
    pointers[e.pointerId] = e;
    var ids = Object.keys(pointers);
    if (ids.length !== 2) { pinch = null; return; }
    var a = pointers[ids[0]], b = pointers[ids[1]];
    var dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    var cx = (a.clientX + b.clientX) / 2, cy = (a.clientY + b.clientY) / 2;
    if (!pinch) { pinch = { dist: dist, s: s }; return; }
    drag = null;
    zoomAt(cx, cy, pinch.s * (dist / pinch.dist));
  });
  function dropPointer(e) { delete pointers[e.pointerId]; if (Object.keys(pointers).length < 2) pinch = null; }
  viewport.addEventListener('pointerup', dropPointer);
  viewport.addEventListener('pointercancel', dropPointer);

  /* ------------------------------------------------------- chrome */

  document.getElementById('zoomui').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    app.classList.add('touched');
    var k = b.dataset.zoom;
    if (k === 'in')  zoomStep(1.55);
    if (k === 'out') zoomStep(1 / 1.55);
    if (k === 'reset') close();
  });

  function zoomStep(f) {
    if (anim) { cancelAnimationFrame(anim); anim = null; }
    var ns = clamp(s * f, minScale, MAX_SCALE);
    var cx = (app.classList.contains('tray-open') && !isNarrow())
      ? tray.offsetWidth + (vw - tray.offsetWidth) / 2 : vw / 2;
    var px = (cx - tx) / s, py = (vh / 2 - ty) / s;
    tweenTo(cx - px * ns, vh / 2 - py * ns, ns, 420);
  }

  document.getElementById('tray-close').addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && activeId) close();
  });

  window.addEventListener('resize', function () {
    measure(true);
    var p = null;
    if (activeId) { for (var i = 0; i < PLACES.length; i++) if (PLACES[i].id === activeId) p = PLACES[i]; }
    if (p) focusPlace(p);
  });

  /* ---------------------------------------------------------- boot */

  function start() {
    buildMarkers();
    buildFilters();
    measure(false);

    var hash = location.hash.replace('#', '');
    if (hash) setTimeout(function () { open(hash); }, 500);

    /* a pasted/edited hash on an already-loaded page should work too */
    window.addEventListener('hashchange', function () {
      var id = location.hash.replace('#', '');
      if (id && id !== activeId) open(id);
      else if (!id && activeId) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
