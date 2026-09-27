(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ss = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeInOut = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const NF = new Intl.NumberFormat(LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const euro = v => UI.money(NF.format(v));
  const pad2 = n => String(n).padStart(2, '0');
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const NS = 'http://www.w3.org/2000/svg';
  const COW = window.COWREG;
  const catVar = c => `var(--c${c})`;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } }
  };

  /* ---------- Carte des zones sur la photo ---------- */
  function buildRegions(svg, withNums) {
    const regs = {};
    CUTS.forEach(cut => {
      const r = COW.regions[cut.id];
      const p = document.createElementNS(NS, 'polygon');
      p.setAttribute('points', r.poly.map(q => q.join(',')).join(' '));
      p.setAttribute('class', 'reg');
      p.style.setProperty('--rc', catVar(cut.cat));
      svg.appendChild(p);
      regs[cut.id] = p;
    });
    if (withNums) {
      CUTS.forEach(cut => {
        const r = COW.regions[cut.id];
        const t = document.createElementNS(NS, 'text');
        t.setAttribute('x', r.c[0]); t.setAttribute('y', r.c[1]);
        t.setAttribute('class', 'reg-num');
        t.textContent = cut.n;
        svg.appendChild(t);
        regs[cut.id].num = t;
      });
    }
    return regs;
  }
  function pip(x, y, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  const alphaMask = { w: 328, h: 213, data: null };
  (function loadAlpha() {
    const img = new Image();
    img.src = 'assets/img/cow.webp';
    img.decode().then(() => {
      const c = document.createElement('canvas');
      c.width = alphaMask.w; c.height = alphaMask.h;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, 0, 0, c.width, c.height);
      try { alphaMask.data = g.getImageData(0, 0, c.width, c.height).data; } catch (e) { /* lecture impossible : on garde le test polygonal */ }
    }).catch(() => {});
  })();
  function regionAt(ix, iy) {
    if (ix < 0 || iy < 0 || ix >= COW.w || iy >= COW.h) return null;
    if (alphaMask.data) {
      const x = Math.floor(ix / COW.w * alphaMask.w), y = Math.floor(iy / COW.h * alphaMask.h);
      if (alphaMask.data[(y * alphaMask.w + x) * 4 + 3] < 110) return null;
    }
    const hit = CUTS.find(c => pip(ix, iy, COW.regions[c.id].poly));
    return hit ? hit.id : null;
  }

  /* ---------- Navigation ---------- */
  const nav = $('#nav');
  const onNav = () => nav.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onNav, { passive: true }); onNav();

  if (fine && !reduce) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', clamp((e.clientX - r.left - r.width / 2) * .22, -8, 8) + 'px');
        el.style.setProperty('--my', clamp((e.clientY - r.top - r.height / 2) * .35, -6, 6) + 'px');
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--mx', '0px'); el.style.setProperty('--my', '0px'); });
    });
  }

  // le trait de couteau disparaît une fois la coupe jouée
  const cw = $('.cutword');
  const cutDone = () => cw.classList.add('done');
  cw.addEventListener('animationend', e => { if (e.animationName === 'knife') cutDone(); });
  setTimeout(cutDone, 1600);

  // code-barres de la fiche de traçabilité
  (function barcode() {
    const svg = $('.barcode');
    if (!svg) return;
    let x = 0, seed = 17, out = '';
    while (x < 118) {
      seed = (seed * 9301 + 49297) % 233280;
      const w = 1 + (seed % 3);
      if (seed % 5 !== 0) out += `<rect x="${x}" y="0" width="${w * .8}" height="18" fill="#1E1516"/>`;
      x += w + 1;
    }
    svg.innerHTML = out;
  })();

  /* ---------- 1. Anatomie au scroll ---------- */
  const A = {
    sec: $('#decoupe'), pin: $('.anat-pin'), wrap: $('#cow-wrap'), img: $('.cow-img'), map: $('#cow-map'),
    svgL: $('#leaders'), box: $('#pieces'), head: $('.anat-head'), hint: $('.scroll-hint'), copy: $('.hero-copy'),
    fiche: $('.fiche'), word: $('.wordmark'), tip: $('#cow-tip'),
    pieces: {}, lines: {}, dots: {}, p: 0, pT: 0, L: null, cur: null, hot: null, last: {}
  };
  A.regs = buildRegions(A.map, true);
  const shadow = document.createElement('span');
  shadow.className = 'cow-shadow';
  A.wrap.prepend(shadow);
  const ROT = CUTS.map((c, i) => ((i * 47) % 29) - 14);
  [...new Set(CUTS.map(c => c.img))].forEach(n => { const im = new Image(); im.src = `assets/img/${n}.webp`; });

  CUTS.forEach(cut => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'piece';
    b.dataset.id = cut.id;
    b.setAttribute('aria-label', UI.openCut(cut.name));
    b.tabIndex = -1;
    b.innerHTML = `<span class="piece-img"><img src="assets/img/${cut.img}.webp" alt="" decoding="async" draggable="false"></span><span class="piece-lbl"><em>${pad2(cut.n)}</em>${cut.name}</span>`;
    b.addEventListener('click', () => openDrawer(cut.id));
    b.addEventListener('pointerenter', () => setHot(cut.id));
    b.addEventListener('pointerleave', () => setHot(null));
    b.addEventListener('focus', () => setHot(cut.id));
    b.addEventListener('blur', () => setHot(null));
    A.box.appendChild(b);
    A.pieces[cut.id] = b;
    const ln = document.createElementNS(NS, 'line');
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('r', 3);
    A.svgL.append(ln, dot);
    A.lines[cut.id] = ln;
    A.dots[cut.id] = dot;
  });

  function setHot(id) {
    if (A.hot === id) return;
    if (A.hot) {
      A.regs[A.hot].classList.remove('hot');
      A.pieces[A.hot].classList.remove('hot');
      A.lines[A.hot].classList.remove('hot');
      A.dots[A.hot].classList.remove('hot');
    }
    A.hot = id;
    if (id) {
      A.regs[id].classList.add('hot');
      A.pieces[id].classList.add('hot');
      A.lines[id].classList.add('hot');
      A.dots[id].classList.add('hot');
    }
  }

  function hungarian(cost) {
    const n = cost.length, INF = 1e18;
    const u = new Array(n + 1).fill(0), v = new Array(n + 1).fill(0), p = new Array(n + 1).fill(0), way = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
      p[0] = i;
      let j0 = 0;
      const minv = new Array(n + 1).fill(INF), used = new Array(n + 1).fill(false);
      do {
        used[j0] = true;
        const i0 = p[j0];
        let delta = INF, j1 = 0;
        for (let j = 1; j <= n; j++) {
          if (used[j]) continue;
          const cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
          if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
          if (minv[j] < delta) { delta = minv[j]; j1 = j; }
        }
        for (let j = 0; j <= n; j++) { if (used[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta; }
        j0 = j1;
      } while (p[j0] !== 0);
      do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
    }
    const res = new Array(n);
    for (let j = 1; j <= n; j++) res[p[j] - 1] = j - 1;
    return res;
  }

  function anatLayout() {
    const W = A.pin.clientWidth, H = A.pin.clientHeight;
    const navH = nav.offsetHeight;
    const mobile = W < 760;
    const ar = COW.h / COW.w;
    const L = { W, H, mobile, pos: {} };
    A.wrap.classList.add('js');
    if (mobile) {
      const copyBottom = A.copy.offsetTop + A.copy.offsetHeight;
      const w = clamp((H - copyBottom - 10) / ar, W * 0.78, W - 16);
      L.hero = { x: (W - w) / 2, y: Math.max(copyBottom - w * ar * 0.06, H - w * ar + 4), w };
      const top = navH + 46;
      const cw = W - 28;
      L.center = { x: 14, y: top, w: cw };
      const gridTop = top + cw * ar * 0.9;
      const cols = 5, rows = Math.ceil(CUTS.length / cols);
      const cellW = (W - 12) / cols;
      const cellH = Math.min(cellW * 1.05, (H - gridTop - 8) / rows);
      L.pw = Math.min(cellW - 4, (cellH - 22) / 0.75);
      L.ph = L.pw * 0.75 + 22;
      CUTS.forEach((c, i) => { L.pos[c.id] = { x: 6 + cellW * (i % cols) + cellW / 2, y: gridTop + cellH * Math.floor(i / cols) + cellH / 2 }; });
    } else {
      const wHero = Math.min(W * 0.6, (H - navH - 30) / ar, 1080);
      L.hero = { x: W - wHero - W * 0.03, y: navH + (H - navH - wHero * ar) / 2 + 16, w: wHero };
      const cx = W / 2 + W * 0.02, cy = navH + (H - navH) / 2 + 8;
      const rx = Math.min(W * 0.435, 820), ry = (H - navH) / 2 - 62;
      const cw = Math.min(rx * 1.16, (ry * 2 - 150) / ar, 760);
      L.center = { x: cx - cw / 2, y: cy - cw * ar / 2 + 22, w: cw };
      // emplacements répartis sur une ellipse, en laissant un vide en haut à gauche pour le titre
      const gapA = -2.62, gapB = -1.74;
      const samples = [];
      let total = 0, prev = null;
      for (let k = 0; k <= 1440; k++) {
        const t = -Math.PI + k / 1440 * Math.PI * 2;
        const pt = [cx + rx * Math.cos(t), cy + ry * Math.sin(t)];
        if (prev && !(t > gapA && t < gapB)) total += Math.hypot(pt[0] - prev[0], pt[1] - prev[1]);
        samples.push([t, pt, total]);
        prev = pt;
      }
      const N = CUTS.length;
      const at = s => {
        s = ((s % total) + total) % total;
        let lo = 0, hi = samples.length - 1;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (samples[mid][2] < s) lo = mid + 1; else hi = mid; }
        return samples[lo];
      };
      const regs = CUTS.map(c => {
        const r = COW.regions[c.id];
        const x = L.center.x + r.c[0] / COW.w * cw, y = L.center.y + r.c[1] / COW.h * cw * ar;
        return { id: c.id, x, y, a: Math.atan2((y - cy) / ry, (x - cx) / rx) };
      }).sort((a, b) => a.a - b.a);
      // affectation optimale région → emplacement (distance totale minimale : les traits ne se croisent pas)
      let best = null;
      for (let k = 0; k < 36; k++) {
        const slots = [];
        for (let j = 0; j < N; j++) slots.push(at((k / 36 + j) * total / N)[1]);
        const cost = regs.map(r => slots.map(s => Math.hypot(s[0] - r.x, s[1] - r.y)));
        const asg = hungarian(cost);
        const sum = asg.reduce((acc, j, i) => acc + cost[i][j], 0);
        if (!best || sum < best.sum) best = { sum, slots, asg };
      }
      regs.forEach((r, i) => { const s = best.slots[best.asg[i]]; L.pos[r.id] = { x: s[0], y: s[1] }; });
      L.pw = clamp(total / N * 0.8, 96, 136);
      L.ph = L.pw * 0.75 + 30;
      CUTS.forEach(c => {
        const q = L.pos[c.id];
        q.x = clamp(q.x, L.pw / 2 + 8, W - L.pw / 2 - 8);
        q.y = clamp(q.y, navH + L.ph / 2 + 4, H - L.ph / 2 - 4);
      });
    }
    A.box.style.setProperty('--pw', L.pw + 'px');
    A.svgL.setAttribute('viewBox', `0 0 ${W} ${H}`);
    A.L = L;
    A.top = A.sec.getBoundingClientRect().top + scrollY;
    A.len = A.sec.offsetHeight - H;
    A.last = {};
    renderAnat(A.p, true);
  }

  function setVar(el, key, name, v) {
    const k = key + name;
    const r = Math.round(v * 1000) / 1000;
    if (A.last[k] !== r) { A.last[k] = r; el.style.setProperty(name, r); }
  }

  function renderAnat(p, force) {
    const L = A.L;
    if (!L) return;
    const a = easeInOut(ss(0, .2, p));
    const b = ss(.16, .34, p);
    const c = ss(.26, .72, p);
    const d = ss(.66, .78, p);
    const x = lerp(L.hero.x, L.center.x, a), y = lerp(L.hero.y, L.center.y, a), w = lerp(L.hero.w, L.center.w, a);
    const h = w * COW.h / COW.w;
    A.cur = { x, y, w, h };
    A.wrap.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${(w / 1000).toFixed(5)})`;
    const hc = ss(0, .12, p);
    A.copy.style.opacity = 1 - hc;
    A.copy.style.transform = `translate3d(0, ${(-70 * hc).toFixed(1)}px, 0)`;
    A.copy.style.visibility = hc > .99 ? 'hidden' : '';
    A.fiche.style.opacity = 1 - hc;
    A.fiche.style.visibility = hc > .99 ? 'hidden' : '';
    A.word.style.transform = `translate(-50%, ${(p * 18).toFixed(2)}%)`;
    A.word.style.opacity = 1 - .7 * c;
    A.hint.style.opacity = 1 - ss(0, .05, p);
    A.head.style.opacity = d;
    A.head.style.transform = `translate(${L.mobile ? '-50%' : '0'}, ${(14 * (1 - d)).toFixed(1)}px)`;
    setVar(A.img, 'cow', '--sat', 1 - .82 * c);
    setVar(A.img, 'cow', '--bri', 1 + .14 * c);
    const n = CUTS.length;
    CUTS.forEach((cut, i) => {
      const reg = A.regs[cut.id];
      const bi = clamp((b - i / n * .55) / .45);
      const ti = clamp((c - i / n * .6) / .4);
      const e = easeOut(ti);
      setVar(reg, cut.id, '--so', .95 * bi * (1 - .35 * e));
      setVar(reg, cut.id, '--fo', .6 * e);
      setVar(reg.num, cut.id, '--no', clamp(bi * 1.4) * (L.mobile ? 1 : .9));
      const r = COW.regions[cut.id];
      const sx = x + r.c[0] / COW.w * w, sy = y + r.c[1] / COW.h * h;
      const t = L.pos[cut.id];
      const mx = (sx + t.x) / 2 + (t.x - sx) * .1, my = Math.min(sy, t.y) - 60 * (1 - Math.abs(t.y - sy) / L.H);
      const u = 1 - e;
      const px = u * u * sx + 2 * u * e * mx + e * e * t.x;
      const py = u * u * sy + 2 * u * e * my + e * e * t.y;
      const sc = lerp(.16, 1, e);
      const piece = A.pieces[cut.id];
      piece.style.transform = `translate3d(${(px - L.pw / 2).toFixed(1)}px, ${(py - L.ph / 2).toFixed(1)}px, 0) scale(${sc.toFixed(3)}) rotate(${(ROT[i] * u).toFixed(1)}deg)`;
      piece.style.opacity = clamp(ti * 2.5).toFixed(3);
      const live = e > .96;
      if (piece.classList.contains('live') !== live) {
        piece.classList.toggle('live', live);
        piece.tabIndex = live ? 0 : -1;
      }
      const ln = A.lines[cut.id], dot = A.dots[cut.id];
      const lo = L.mobile ? 0 : e;
      const iy = py - 10;
      ln.setAttribute('x1', sx.toFixed(1)); ln.setAttribute('y1', sy.toFixed(1));
      ln.setAttribute('x2', px.toFixed(1)); ln.setAttribute('y2', iy.toFixed(1));
      ln.style.opacity = lo;
      dot.setAttribute('cx', sx.toFixed(1)); dot.setAttribute('cy', sy.toFixed(1));
      dot.style.opacity = lo;
    });
  }

  // survol de la vache : zone + étiquette qui suit le curseur
  function cowHit(e) {
    const pr = A.pin.getBoundingClientRect();
    const lx = e.clientX - pr.left, ly = e.clientY - pr.top;
    return { lx, ly, id: A.cur ? regionAt((lx - A.cur.x) / A.cur.w * COW.w, (ly - A.cur.y) / A.cur.h * COW.h) : null };
  }
  A.pin.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    if (!A.cur || e.target.closest('.piece, .btn, a, .fiche, .hero-copy')) { hideTip(); A.pin.style.cursor = ''; return; }
    const { lx, ly, id } = cowHit(e);
    setHot(id);
    A.pin.style.cursor = id ? 'pointer' : '';
    if (id) {
      const cut = CUT[id];
      A.tip.innerHTML = `<em>${pad2(cut.n)}</em>${cut.name}`;
      A.tip.style.transform = `translate(${(lx + 16).toFixed(0)}px, ${(ly - 38).toFixed(0)}px)`;
      A.tip.classList.add('on');
    } else hideTip();
  });
  A.pin.addEventListener('pointerleave', () => { hideTip(); setHot(null); });
  A.pin.addEventListener('click', e => {
    if (e.target.closest('.piece, .btn, a, .hero-copy, .fiche')) return;
    const { id } = cowHit(e);
    if (id) openDrawer(id);
  });
  function hideTip() { A.tip.classList.remove('on'); }

  $$('[data-scroll="anat-end"]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    scrollTo({ top: A.top + A.len * .9, behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* ---------- 2. Guide des morceaux ---------- */
  const G = { cow: $('#guide-cow'), list: $('#cut-list'), chips: $('#usage-chips'), count: $('#guide-count'), input: $('#cut-search'), sug: $('#suggest'), usage: 'tout', rows: {}, hot: null };
  G.regs = buildRegions($('svg', G.cow), true);
  Object.values(G.regs).forEach(r => { r.num.style.setProperty('--no', 1); });
  USAGES.forEach(([id, label]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.u = id;
    const n = id === 'tout' ? CUTS.length : CUTS.filter(c => c.usages.includes(id)).length;
    b.innerHTML = `${label} <span class="n">${n}</span>`;
    b.setAttribute('aria-pressed', id === 'tout');
    b.addEventListener('click', () => setUsage(id));
    G.chips.appendChild(b);
  });
  CUTS.forEach(cut => {
    const li = document.createElement('li');
    li.innerHTML = `<button type="button" class="cut-row" data-id="${cut.id}">
      <span class="th"><img src="assets/img/${cut.img}.webp" alt="" loading="lazy" decoding="async"></span>
      <span class="nm"><b><em>${pad2(cut.n)}</em>${cut.name}</b><span>${cut.aka} · ${ZONES[cut.zone]}</span></span>
      <span class="pr"><b>${euro(cut.prix)}/kg</b><span class="cat-pill"><i style="background:${catVar(cut.cat)}"></i>${CAT[cut.cat].label}</span></span>
    </button>`;
    const row = li.firstElementChild;
    row.addEventListener('click', () => openDrawer(cut.id));
    row.addEventListener('pointerenter', () => gHot(cut.id));
    row.addEventListener('pointerleave', () => gHot(null));
    row.addEventListener('focus', () => gHot(cut.id));
    row.addEventListener('blur', () => gHot(null));
    G.list.appendChild(li);
    G.rows[cut.id] = li;
  });
  function gHot(id) {
    if (G.hot) { G.regs[G.hot].classList.remove('hot'); G.rows[G.hot].firstElementChild.classList.remove('hot'); }
    G.hot = id;
    if (id) { G.regs[id].classList.add('hot'); G.rows[id].firstElementChild.classList.add('hot'); }
  }
  function setUsage(u) {
    G.usage = u;
    $$('.chip', G.chips).forEach(b => b.setAttribute('aria-pressed', b.dataset.u === u));
    applyGuide();
  }
  function matches(cut) {
    const q = norm(G.input.value.trim());
    const okU = G.usage === 'tout' || cut.usages.includes(G.usage);
    const okQ = !q || norm(cut.name + ' ' + cut.aka).includes(q);
    return okU && okQ;
  }
  function applyGuide() {
    let n = 0;
    const filtering = G.usage !== 'tout' || G.input.value.trim();
    CUTS.forEach((cut, i) => {
      const ok = matches(cut);
      if (ok) n++;
      G.rows[cut.id].hidden = !ok;
      const reg = G.regs[cut.id];
      reg.style.setProperty('--fo', ok ? (filtering ? .78 : .55) : .06);
      reg.style.setProperty('--so', ok ? .9 : .25);
      reg.num.style.setProperty('--no', ok ? 1 : .25);
      if (ok && filtering && !reduce) {
        reg.animate([{ fillOpacity: .15 }, { fillOpacity: .78 }], { duration: 500, delay: i * 18, easing: 'ease-out' });
      }
    });
    const label = USAGES.find(u => u[0] === G.usage)[1];
    G.count.textContent = n === 0 ? UI.noMatch : (G.usage === 'tout' ? UI.count(n) : UI.countFor(n, label));
  }
  G.cow.addEventListener('pointermove', e => {
    const r = G.cow.getBoundingClientRect();
    const id = regionAt((e.clientX - r.left) / r.width * COW.w, (e.clientY - r.top) / r.height * COW.h);
    gHot(id);
    G.cow.style.cursor = id ? 'pointer' : 'crosshair';
    G.cow.title = id ? CUT[id].name : '';
  });
  G.cow.addEventListener('pointerleave', () => gHot(null));
  G.cow.addEventListener('click', e => {
    const r = G.cow.getBoundingClientRect();
    const id = regionAt((e.clientX - r.left) / r.width * COW.w, (e.clientY - r.top) / r.height * COW.h);
    if (id) openDrawer(id);
  });

  // recherche avec suggestions
  let sugIdx = -1, sugItems = [];
  function renderSuggest() {
    const q = norm(G.input.value.trim());
    applyGuide();
    if (!q) { G.sug.hidden = true; sugItems = []; return; }
    sugItems = CUTS.filter(c => norm(c.name + ' ' + c.aka).includes(q)).slice(0, 6);
    sugIdx = sugItems.length ? 0 : -1;
    G.sug.innerHTML = sugItems.map((c, i) => `<li role="option" id="sg-${c.id}" data-id="${c.id}" aria-selected="${i === 0}"><img src="assets/img/${c.img}.webp" alt=""><span><b>${c.name}</b><small>${c.aka} · ${ZONES[c.zone]}</small></span></li>`).join('');
    G.sug.hidden = !sugItems.length;
    if (sugItems[0]) gHot(sugItems[0].id);
  }
  G.input.addEventListener('input', renderSuggest);
  G.input.addEventListener('keydown', e => {
    if (G.sug.hidden) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      sugIdx = (sugIdx + (e.key === 'ArrowDown' ? 1 : -1) + sugItems.length) % sugItems.length;
      $$('li', G.sug).forEach((li, i) => li.setAttribute('aria-selected', i === sugIdx));
      gHot(sugItems[sugIdx].id);
    } else if (e.key === 'Enter' && sugItems[sugIdx]) {
      e.preventDefault();
      G.sug.hidden = true;
      openDrawer(sugItems[sugIdx].id);
    } else if (e.key === 'Escape') G.sug.hidden = true;
  });
  G.sug.addEventListener('pointerdown', e => {
    const li = e.target.closest('li');
    if (!li) return;
    e.preventDefault();
    G.sug.hidden = true;
    openDrawer(li.dataset.id);
  });
  G.input.addEventListener('blur', () => setTimeout(() => { G.sug.hidden = true; }, 120));
  applyGuide();

  /* ---------- Bandeau ---------- */
  const mt = $('.marquee-track');
  mt.append(...[...mt.children].map(n => n.cloneNode(true)));

  /* ---------- 3. Préparations en vue éclatée ---------- */
  const M = { sec: $('#maison'), pin: $('.prep-pin'), stage: $('#prep-stage'), box: $('#xp'), svg: $('#xp-lines'), tabs: $('#prep-tabs'),
    p: 0, pT: 0, cur: null, items: [], swap: 1, swapT0: 0, L: null };
  const fmtPct = v => UI.pct(new Intl.NumberFormat(LOCALE).format(v));
  PREPS.forEach(pr => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.setAttribute('role', 'tab');
    b.dataset.id = pr.id;
    b.textContent = pr.tab;
    b.addEventListener('click', () => { if (!M.cur || M.cur.id !== pr.id) setPrep(pr.id, true); });
    M.tabs.appendChild(b);
  });
  function setPrep(id, animate) {
    const pr = PREPS.find(x => x.id === id);
    M.cur = pr;
    $$('.chip', M.tabs).forEach(b => b.setAttribute('aria-selected', b.dataset.id === id));
    $('#prep-title').textContent = pr.title;
    $('#prep-lede').textContent = pr.lede;
    $('#prep-badges').innerHTML = pr.badges.map(x => `<li>${x}</li>`).join('');
    $('#prep-price').innerHTML = `<b>${euro(pr.prix)}</b><small>${pr.priceNote}</small>`;
    const add = $('#prep-add');
    add.textContent = pr.cta;
    add.dataset.add = pr.productId;
    M.box.innerHTML = '';
    M.svg.innerHTML = '';
    const layers = pr.layers.map(l => Object.assign({}, l));
    if (pr.product) layers.push({ product: true, img: pr.product.img, name: pr.product.name });
    M.items = layers.map(ly => {
      const el = document.createElement(ly.cut ? 'button' : 'div');
      el.className = 'xl' + (ly.product ? ' prod' : '');
      if (ly.cut) {
        el.type = 'button';
        el.setAttribute('aria-label', UI.layerCut(ly.name));
        el.addEventListener('click', () => openDrawer(ly.cut));
      }
      el.innerHTML = ly.img ? `<img src="assets/img/${ly.img}.webp" alt="${ly.product ? ly.name : ''}" draggable="false">` : '<span class="salt">NaCl</span>';
      const lab = document.createElement('div');
      lab.className = 'xlab';
      if (!ly.product) lab.innerHTML = `<span class="pct">${fmtPct(ly.pct)}</span><span class="nm">${ly.name}</span><span class="note">${ly.note}${ly.cut ? ` · <u>${UI.seeOnAnimal}</u>` : ''}</span>`;
      const line = document.createElementNS(NS, 'line');
      const dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('r', 3);
      if (!ly.product) M.svg.append(line, dot);
      M.box.append(el, lab);
      return { ly, el, lab, line, dot };
    });
    prepLayout();
    if (animate && !reduce) { M.swap = 0; M.swapT0 = performance.now(); kick(); }
  }
  function prepLayout() {
    if (!M.cur) return;
    const W = M.stage.clientWidth, H = M.stage.clientHeight;
    const mobile = innerWidth < 760;
    const n = M.items.length;
    const burst = M.cur.mode === 'burst';
    const step = (H - 28) / n;
    const size = Math.min(mobile ? W * 0.28 : W * 0.22, step * 1.18, 190);
    const cx = mobile ? W * 0.26 : W * 0.5;
    const zig = mobile ? W * 0.045 : Math.min(W * 0.07, 60);
    const labW = mobile ? W * 0.5 : Math.min(W * 0.3, 250);
    const pos = [], pile = [];
    M.items.forEach((it, i) => {
      const prod = !!it.ly.product;
      const side = i % 2 ? 1 : -1;
      const s = prod ? Math.min(size * 1.3, step * 1.4, mobile ? W * 0.4 : W * 0.3) : size;
      const y = 14 + step * (i + 0.5) + (prod ? step * 0.12 : 0);
      pos.push({ x: cx + (prod ? 0 : side * zig), y, s, r: prod ? 0 : side * (3 + (i * 7) % 5) });
      const big = Math.min(W * (mobile ? 0.9 : 0.62), H * 0.62, 560);
      if (burst) pile.push({ x: W / 2, y: H / 2, s: prod ? big : size * 0.35, r: prod ? -4 : ((i * 29) % 30) - 15 });
      else pile.push({ x: W / 2 + (((i * 67) % 90) - 45) * (mobile ? .6 : 1), y: H / 2 + (((i * 41) % 70) - 35) * (mobile ? .6 : 1), s: Math.min(size * 1.55, big * 0.62), r: ((i * 53) % 40) - 20 });
    });
    const lab = pos.map((q, i) => {
      const right = mobile || (i % 2 === 0);
      const x = right ? Math.max(q.x + q.s * 0.5 + (mobile ? 10 : 40), mobile ? W * 0.5 : cx + zig + size * 0.5 + 40) : Math.min(q.x - q.s * 0.5 - (mobile ? 10 : 40), cx - zig - size * 0.5 - 40) - labW;
      return { x, right };
    });
    M.items.forEach((it, i) => {
      it.lab.classList.toggle('r', !lab[i].right);
      it.lab.style.width = labW + 'px';
      it.lab.style.zIndex = 3;
      it.el.style.zIndex = it.ly.product ? 1 : 2 + i;
    });
    M.L = { W, H, mobile, pos, pile, lab, labW };
    M.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    M.top = M.sec.getBoundingClientRect().top + scrollY;
    M.len = M.sec.offsetHeight - M.pin.offsetHeight;
    renderPrep(M.p);
  }
  function renderPrep(q) {
    const L = M.L;
    if (!L) return;
    const sw = easeOut(M.swap);
    const e = easeInOut(ss(.03, .4, q)) * sw;
    const n = M.items.length;
    const burst = M.cur.mode === 'burst';
    M.items.forEach((it, i) => {
      const order = it.ly.product ? 0 : (n - 1 - i);
      const t = clamp((e - order * 0.025) / Math.max(.5, 1 - 0.025 * (n - 1)));
      const k = easeOut(t);
      const a = L.pile[i], b = L.pos[i];
      const x = lerp(a.x, b.x, k), y = lerp(a.y, b.y, k) - Math.sin(k * Math.PI) * 22;
      const s = lerp(a.s, b.s, k), r = lerp(a.r, b.r, k);
      it.el.style.transform = `translate3d(${(x - 100).toFixed(1)}px, ${(y - 100).toFixed(1)}px, 0) scale(${(s / 200).toFixed(4)}) rotate(${r.toFixed(2)}deg)`;
      it.el.style.opacity = burst && !it.ly.product ? clamp(k * 3).toFixed(3) : 1;
      it.el.style.pointerEvents = k > .95 ? 'auto' : 'none';
      if (it.ly.product) return;
      const lo = ss(.35, .8, k);
      const lb = L.lab[i];
      const ly = b.y;
      it.lab.style.opacity = lo.toFixed(3);
      it.lab.style.transform = `translate3d(${(lb.x + (lb.right ? 1 : -1) * 14 * (1 - lo)).toFixed(1)}px, ${(ly - 30).toFixed(1)}px, 0)`;
      const x1 = x + (lb.right ? 1 : -1) * s * 0.38, x2 = lb.right ? lb.x - 8 : lb.x + L.labW + 8;
      it.line.setAttribute('x1', x1.toFixed(1)); it.line.setAttribute('y1', y.toFixed(1));
      it.line.setAttribute('x2', x2.toFixed(1)); it.line.setAttribute('y2', (ly - 12).toFixed(1));
      it.line.style.opacity = lo;
      it.dot.setAttribute('cx', x1.toFixed(1)); it.dot.setAttribute('cy', y.toFixed(1));
      it.dot.style.opacity = lo;
    });
  }
  setPrep('merguez', false);

  /* ---------- 4. Maturation ---------- */
  const age = $('#age-range');
  const coteImg = $('#cote img'), crust = $('#cote .crust');
  const NOTES = AGE_NOTES;
  function setAge(d) {
    const t = d / 60;
    $('#age-out').textContent = UI.day(d);
    const loss = 22 * (1 - Math.exp(-d / 35));
    const tender = 1 - Math.exp(-d / 12);
    const price = Math.round(38.9 + 0.6333 * d) - 0.1;
    const note = NOTES.filter(n => d >= n[0]).pop();
    $('#st-loss').textContent = '≈ ' + UI.pct(Math.round(loss));
    $('#st-tender').textContent = note[2];
    $('#st-taste').textContent = note[3];
    $('#st-price').textContent = `${euro(Math.max(price, 38.9))}/kg`;
    $('#bar-loss').style.width = (loss / 22 * 100) + '%';
    $('#bar-tender').style.width = (tender * 100) + '%';
    $('#bar-taste').style.width = (15 + 85 * t) + '%';
    $('#bar-price').style.width = ((price - 38.9) / (76.9 - 38.9) * 100) + '%';
    const nt = $('#age-note');
    if (nt.textContent !== note[1]) {
      nt.textContent = note[1];
      if (!reduce) nt.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'ease-out' });
    }
    coteImg.style.filter = `brightness(${(1.04 - .3 * t).toFixed(3)}) saturate(${(1.05 - .25 * t).toFixed(3)}) contrast(${(1 + .1 * t).toFixed(3)}) hue-rotate(${(-7 * t).toFixed(1)}deg) drop-shadow(0 30px 30px rgba(60, 20, 20, .22))`;
    crust.style.opacity = (.08 + .8 * t).toFixed(3);
  }
  age.addEventListener('input', () => setAge(+age.value));
  setAge(+age.value);

  /* ---------- 5. Vitrine ---------- */
  const V = { track: $('#vit-track'), chips: $('#vit-chips'), bar: $('#vit-bar'), f: 'tout' };
  VIT_FILTERS.forEach(([id, label]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.f = id;
    b.textContent = label;
    b.setAttribute('aria-pressed', id === 'tout');
    b.addEventListener('click', () => {
      V.f = id;
      $$('.chip', V.chips).forEach(c => c.setAttribute('aria-pressed', c.dataset.f === id));
      $$('.card', V.track).forEach(card => card.classList.toggle('out', id !== 'tout' && card.dataset.tag !== id));
      V.track.scrollTo({ left: 0, behavior: reduce ? 'auto' : 'smooth' });
      setTimeout(vitProgress, 60);
    });
    V.chips.appendChild(b);
  });
  PRODUCTS.forEach(p => {
    const a = document.createElement('article');
    a.className = 'card';
    a.dataset.tag = p.tag;
    const tagSmall = p.kit ? UI.perKitCaps : UI.perKiloCaps;
    a.innerHTML = `<div class="card-ph"><img src="assets/img/${p.img}.webp" alt="${p.name}" loading="lazy" decoding="async" draggable="false"></div>
      <span class="pique" aria-label="${euro(p.prix)} ${p.kit ? UI.perKit : UI.perKilo}"><b>${euro(p.prix)}<small>${tagSmall}</small></b></span>
      <p class="orig">${p.origin}</p>
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <div class="card-foot"><span class="unit">${p.unit[1]}${p.kit ? '' : '<br>≈ ' + euro(p.prix * p.unit[0] / 1000)}</span><button type="button" class="add" data-add="${p.id}"><span class="plus" aria-hidden="true">+</span> ${UI.add}</button></div>`;
    if (p.cut) {
      const ph = $('.card-ph', a);
      ph.style.cursor = 'pointer';
      ph.title = UI.showOnAnimal;
      ph.addEventListener('click', () => { if (!V.moved) openDrawer(p.cut); });
    }
    V.track.appendChild(a);
  });
  const end = document.createElement('div');
  end.className = 'card-end';
  end.innerHTML = UI.cardEnd;
  V.track.appendChild(end);
  function vitProgress() {
    const max = V.track.scrollWidth - V.track.clientWidth;
    const vis = V.track.clientWidth / V.track.scrollWidth;
    V.bar.style.width = (Math.max(vis, max > 0 ? vis + (1 - vis) * V.track.scrollLeft / max : 1) * 100) + '%';
  }
  V.track.addEventListener('scroll', vitProgress, { passive: true });
  const step = () => (V.track.querySelector('.card:not(.out)') || end).offsetWidth + 20;
  $('#vit-prev').addEventListener('click', () => V.track.scrollBy({ left: -step() * 2, behavior: reduce ? 'auto' : 'smooth' }));
  $('#vit-next').addEventListener('click', () => V.track.scrollBy({ left: step() * 2, behavior: reduce ? 'auto' : 'smooth' }));
  V.track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); V.track.scrollBy({ left: step(), behavior: 'smooth' }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); V.track.scrollBy({ left: -step(), behavior: 'smooth' }); }
  });
  (function drag() {
    let down = false, sx = 0, sl = 0;
    V.track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.target.closest('button, a')) return;
      down = true; V.moved = false; sx = e.clientX; sl = V.track.scrollLeft;
    });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 4 && !V.moved) { V.moved = true; V.track.classList.add('drag'); }
      if (V.moved) V.track.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      V.track.classList.remove('drag');
      setTimeout(() => { V.moved = false; }, 0);
    });
  })();

  /* ---------- 6. Colis ---------- */
  const C = { list: $('#colis-list'), crate: $('#crate-inner'), empty: $('#crate-empty'), q: store.get('mb-colis', {}), rows: {}, nodes: {}, slot: null };
  const unitPrice = it => (it.kit ? it.prix : it.prix * it.unit[0] / 1000);
  function itemOf(id) {
    if (PRODUCT[id]) return PRODUCT[id];
    const cut = CUT[id.replace(/^c-/, '')];
    if (!cut) return null;
    return { id, name: cut.name, img: cut.img, prix: cut.prix, unit: cut.portion, cut: cut.id };
  }
  Object.keys(C.q).forEach(k => { if (!itemOf(k) || !Number.isInteger(C.q[k]) || C.q[k] < 1 || C.q[k] > 99) delete C.q[k]; });
  function listIds() {
    const extra = Object.keys(C.q).filter(k => !PRODUCT[k]);
    return PRODUCTS.map(p => p.id).concat(extra);
  }
  function renderColisList() {
    const ids = listIds();
    ids.forEach(id => {
      if (C.rows[id]) return;
      const it = itemOf(id);
      const li = document.createElement('li');
      li.innerHTML = `<span class="th"><img src="assets/img/${it.img}.webp" alt="" loading="lazy" decoding="async"></span>
        <span class="nm"><b>${it.name}</b><span>${it.unit[1]} · ${it.kit ? euro(it.prix) + ' ' + UI.perKit : euro(it.prix) + '/kg'}</span></span>
        <span class="stepper"><button type="button" data-d="-1" aria-label="${UI.removeNamed(it.name)}">−</button><output aria-live="polite">0</output><button type="button" data-d="1" aria-label="${UI.addNamed(it.name)}">+</button></span>
        <span class="px"></span>`;
      $$('.stepper button', li).forEach(b => b.addEventListener('click', () => addItem(id, +b.dataset.d, true)));
      C.list.appendChild(li);
      C.rows[id] = li;
    });
    ids.forEach(id => {
      const q = C.q[id] || 0, it = itemOf(id), li = C.rows[id];
      $('output', li).textContent = q;
      $('[data-d="-1"]', li).disabled = q === 0;
      li.classList.toggle('on', q > 0);
      $('.px', li).textContent = q ? euro(q * unitPrice(it)) : '';
    });
  }
  function renderCrate(changed) {
    const ids = Object.keys(C.q).filter(k => C.q[k] > 0);
    Object.keys(C.nodes).forEach(id => { if (!ids.includes(id)) { C.nodes[id].remove(); delete C.nodes[id]; } });
    ids.forEach(id => {
      let n = C.nodes[id];
      if (!n) {
        const it = itemOf(id);
        n = document.createElement('div');
        n.className = 'crate-item';
        n.innerHTML = `<img src="assets/img/${it.img}.webp" alt="${it.name}">`;
        C.crate.appendChild(n);
        C.nodes[id] = n;
      } else if (id === changed && !reduce) {
        n.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12) rotate(-3deg)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
      }
      n.dataset.q = '×' + C.q[id];
    });
    C.empty.hidden = ids.length > 0;
    const cols = ids.length > 12 ? 5 : 4;
    C.crate.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  }
  let shown = 0;
  function tweenTotal(to) {
    const el = $('#tot-price');
    const from = shown;
    shown = to;
    if (reduce) { el.textContent = euro(to); return; }
    const t0 = performance.now();
    const f = now => {
      const k = clamp((now - t0) / 500);
      el.textContent = euro(lerp(from, to, easeOut(k)));
      if (k < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }
  function renderTotals() {
    let g = 0, e = 0, n = 0;
    Object.entries(C.q).forEach(([id, q]) => { const it = itemOf(id); g += q * it.unit[0]; e += q * unitPrice(it); n += q; });
    $('#tot-weight').textContent = g >= 1000 ? `≈ ${NF.format(g / 1000).replace(/[.,]?0+$/, '')} kg` : `${g} g`;
    tweenTotal(e);
    const cnt = $('#nav-count');
    if (cnt.textContent !== String(n)) {
      cnt.textContent = n;
      cnt.classList.remove('bump'); void cnt.offsetWidth; cnt.classList.add('bump');
    }
    $('#colis-go').disabled = n === 0 || !C.slot;
    $('#recap').hidden = true;
  }
  function addItem(id, d, quiet) {
    const it = itemOf(id);
    if (!it) return;
    C.q[id] = Math.max(0, (C.q[id] || 0) + d);
    if (!C.q[id]) delete C.q[id];
    store.set('mb-colis', C.q);
    renderColisList();
    renderCrate(id);
    renderTotals();
    if (!quiet && d > 0) toast(UI.addedTo(it.name));
  }
  $$('[data-add]').forEach(b => b.addEventListener('click', () => addItem(b.dataset.add, 1)));
  PRESETS.forEach(pr => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'preset';
    b.innerHTML = `<b>${pr.name}</b><small>${pr.note} · ${UI.pieces(Object.values(pr.items).reduce((a, v) => a + v, 0))}</small>`;
    b.addEventListener('click', () => {
      Object.entries(pr.items).forEach(([id, q]) => { C.q[id] = (C.q[id] || 0) + q; });
      store.set('mb-colis', C.q);
      renderColisList(); renderCrate(); renderTotals();
      toast(UI.presetAdded(pr.name));
    });
    $('#presets').appendChild(b);
  });
  // créneaux de retrait : prochaines ouvertures
  (function slots() {
    const box = $('#slot-list');
    const now = new Date();
    const out = [];
    for (let dd = 0; dd < 8 && out.length < 5; dd++) {
      const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dd);
      HOURS[day.getDay()].forEach(([a, b]) => {
        const start = a + 60;
        const when = new Date(day.getTime() + start * 60000);
        if (when - now > 2 * 3600000 && out.length < 5 && start < b) out.push(when);
      });
    }
    out.forEach((when, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      const today = when.toDateString() === now.toDateString();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toDateString() === when.toDateString();
      const dayLabel = today ? UI.today : tomorrow ? UI.tomorrow : when.toLocaleDateString(LOCALE, { weekday: 'short', day: 'numeric' });
      const hh = when.getHours(), mm = when.getMinutes();
      b.textContent = `${dayLabel} · ${UI.time(hh, mm)}`;
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => {
        C.slot = b.textContent;
        $$('.chip', box).forEach(c => c.setAttribute('aria-pressed', c === b));
        renderTotals();
      });
      box.appendChild(b);
    });
  })();
  $('#colis-go').addEventListener('click', () => {
    const lines = Object.entries(C.q).map(([id, q]) => { const it = itemOf(id); return `- ${q} × ${it.name} (${it.unit[1]}) ≈ ${euro(q * unitPrice(it))}`; });
    $('#recap-text').textContent = UI.recap(C.slot, lines.join('\n'), $('#tot-price').textContent);
    const rc = $('#recap');
    rc.hidden = false;
    if (!reduce) rc.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: 'ease-out' });
  });
  function copyText(text, btn, done) {
    const ok = () => { const t = btn.textContent; btn.textContent = done; setTimeout(() => { btn.textContent = t; }, 1800); };
    try {
      navigator.clipboard.writeText(text).then(ok, () => fallback());
    } catch (e) { fallback(); }
    function fallback() {
      const pre = $('#recap-text');
      const sel = getSelection(); const range = document.createRange();
      range.selectNodeContents(btn.id === 'copy-phone' ? $('.phone') : pre);
      sel.removeAllRanges(); sel.addRange(range);
      btn.textContent = UI.selected;
    }
  }
  $('#recap-copy').addEventListener('click', e => copyText($('#recap-text').textContent, e.currentTarget, UI.copiedRecap));
  $('#copy-phone').addEventListener('click', e => copyText(PHONE, e.currentTarget, UI.copiedPhone));
  renderColisList(); renderCrate(); renderTotals();

  /* ---------- Toast ---------- */
  let toastT = 0;
  function toast(msg) {
    const t = $('#toast');
    t.innerHTML = `<span>${msg}</span><a href="#colis">${UI.seeOrder}</a>`;
    t.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('on'), 2800);
  }
  $('#toast').addEventListener('click', e => { if (e.target.closest('a')) $('#toast').classList.remove('on'); });

  /* ---------- Fiche morceau ---------- */
  const D = { el: $('#drawer'), body: $('#d-body'), scrim: $('#scrim'), id: null, back: null };
  function dots(n) { return `<span class="dots" aria-label="${UI.outOf5(n)}">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`; }
  function openDrawer(id) {
    const cut = CUT[id];
    if (!cut) return;
    if (!D.id) D.back = document.activeElement;
    D.id = id;
    const r = COW.regions[id];
    D.body.innerHTML = `
      <div class="d-head"><span class="num">${UI.no} ${pad2(cut.n)} · ${ZONES[cut.zone]}</span><h3 id="d-name">${cut.name}</h3><span class="aka">${cut.aka}</span></div>
      <div class="d-photo"><img src="assets/img/${cut.img}.webp" alt="${UI.rawPhoto(cut.name)}">
        <div class="mini-cow" aria-label="${UI.location}"><img src="assets/img/cow.webp" alt=""><svg viewBox="0 0 1640 1067"><polygon class="reg" points="${r.poly.map(q => q.join(',')).join(' ')}" style="--rc:${catVar(cut.cat)};--fo:.9;--so:1;stroke-dasharray:none;stroke-width:8"/></svg></div>
      </div>
      <div class="d-tags"><span class="d-tag"><i style="background:${catVar(cut.cat)}"></i>${CAT[cut.cat].label}</span><span class="d-tag">${cut.temps}</span></div>
      <div class="d-sec"><h4>${UI.where}</h4><p>${cut.where}</p></div>
      <div class="d-sec meters"><div class="meter"><span>${UI.tender}</span>${dots(cut.tendre)}</div><div class="meter"><span>${UI.marbling}</span>${dots(cut.persille)}</div><div class="meter"><span>${UI.taste}</span>${dots(cut.gout)}</div></div>
      <div class="d-sec"><h4>${UI.cooking}</h4><ul class="d-list">${cut.cuissons.map(x => `<li>${x}</li>`).join('')}</ul></div>
      <div class="d-sec"><h4>${UI.dishes}</h4><ul class="d-list">${cut.plats.map(x => `<li>${x}</li>`).join('')}</ul></div>
      <blockquote class="conseil">${UI.quote(cut.conseil)}<cite>${UI.tip}</cite></blockquote>
      <div class="d-buy"><div><span class="tag-price"><b>${euro(cut.prix)}</b><small>${UI.perKiloIndicative}</small></span></div><div style="text-align:right;display:grid;gap:6px;justify-items:end"><button class="btn btn-red" type="button" id="d-add">${UI.addToOrder}</button><span class="unit">${cut.portion[1]}</span></div></div>`;
    $('#d-add').addEventListener('click', () => addItem('c-' + id, 1));
    D.scrim.hidden = false;
    D.el.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => { D.scrim.classList.add('on'); D.el.classList.add('on'); });
    D.body.scrollTop = 0;
    $('#d-close').focus({ preventScroll: true });
  }
  function closeDrawer() {
    if (!D.id) return;
    D.id = null;
    D.scrim.classList.remove('on');
    D.el.classList.remove('on');
    document.documentElement.style.overflow = '';
    setTimeout(() => { if (!D.id) { D.el.hidden = true; D.scrim.hidden = true; } }, 450);
    if (D.back && D.back.focus) D.back.focus({ preventScroll: true });
  }
  const shift = k => { const i = CUTS.findIndex(c => c.id === D.id); openDrawer(CUTS[(i + k + CUTS.length) % CUTS.length].id); };
  $('#d-close').addEventListener('click', closeDrawer);
  $('#d-prev').addEventListener('click', () => shift(-1));
  $('#d-next').addEventListener('click', () => shift(1));
  D.scrim.addEventListener('click', closeDrawer);
  addEventListener('keydown', e => {
    if (!D.id) return;
    if (e.key === 'Escape') closeDrawer();
    else if (e.key === 'ArrowRight') shift(1);
    else if (e.key === 'ArrowLeft') shift(-1);
    else if (e.key === 'Tab') {
      const f = $$('button, a[href]', D.el).filter(x => !x.disabled && x.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- 7. Infos ---------- */
  (function infos() {
    const now = new Date();
    const dow = now.getDay(), mins = now.getHours() * 60 + now.getMinutes();
    const fmtT = m => UI.time(Math.floor(m / 60), m % 60);
    const ul = $('#hours');
    [1, 2, 3, 4, 5, 6, 0].forEach(d => {
      const li = document.createElement('li');
      if (d === dow) li.className = 'today';
      li.innerHTML = `<span>${DAYS[d]}</span><span>${HOURS[d].length ? HOURS[d].map(([a, b]) => `${fmtT(a)}–${fmtT(b)}`).join(' · ') : UI.closed}</span>`;
      ul.appendChild(li);
    });
    const st = $('#open-status');
    const open = HOURS[dow].find(([a, b]) => mins >= a && mins < b);
    if (open) { st.textContent = UI.openUntil(fmtT(open[1])); st.style.setProperty('--dot', '#7fbf7f'); }
    else {
      let label = '';
      for (let k = 0; k < 8 && !label; k++) {
        const d = (dow + k) % 7;
        const nxt = HOURS[d].find(([a]) => k > 0 || a > mins);
        if (nxt) label = UI.nextOpen(k, DAYS[d], fmtT(nxt[0]));
      }
      st.textContent = UI.opens(label);
      st.style.setProperty('--dot', '#d98c7a');
    }
    $('#credits').innerHTML = CREDITS.map(([w, a, l]) => `<li>${UI.credit(w, a, l)}</li>`).join('');
  })();

  /* ---------- Boucle de rendu ---------- */
  let raf = 0;
  let target = sec => (sec.len > 0 ? clamp((scrollY - sec.top) / sec.len) : 0);
  function near(sec) { return scrollY > sec.top - innerHeight * 1.2 && scrollY < sec.top + sec.len + innerHeight * 1.2; }
  function tick() {
    raf = 0;
    let again = false;
    if (M.swap < 1) { M.swap = clamp((performance.now() - M.swapT0) / 900); again = true; if (near(M)) renderPrep(M.p); }
    [[A, renderAnat], [M, renderPrep]].forEach(([S, render]) => {
      if (S.len == null) return;
      S.pT = target(S);
      const dp = S.pT - S.p;
      if (Math.abs(dp) > .0004) { S.p += reduce ? dp : dp * (Math.abs(dp) > .1 ? .34 : .2); again = true; } else S.p = S.pT;
      if (near(S)) render(S.p);
    });
    if (again) raf = requestAnimationFrame(tick);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
  addEventListener('scroll', kick, { passive: true });
  let rt = 0;
  function fitFacade() {
    const f = $('#facade');
    if (!f) return;
    f.style.fontSize = '100px';
    const w = f.scrollWidth, max = f.parentElement.clientWidth * 0.94;
    f.style.fontSize = Math.min(250, 100 * max / w) + 'px';
  }
  function relayout() { anatLayout(); prepLayout(); vitProgress(); fitFacade(); kick(); }
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(relayout, 120); });
  // la hauteur de la page peut changer après coup (polices, images) : on recalcule les repères de scroll
  if ('ResizeObserver' in window) {
    let lastH = 0;
    new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (Math.abs(h - lastH) > 2) { lastH = h; clearTimeout(rt); rt = setTimeout(relayout, 150); }
    }).observe(document.body);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  addEventListener('load', relayout);
  relayout();
  A.p = A.pT = target(A); M.p = M.pT = target(M);
  renderAnat(A.p); renderPrep(M.p);

})();
