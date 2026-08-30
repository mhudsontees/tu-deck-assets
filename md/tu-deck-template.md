# Teesside University — HTML Deck Authoring Template
**Version:** 1.0  ·  **Updated:** August 2026  ·  **Mode:** Linked (hosted CSS/JS/font)

> **Always download a fresh copy of this template for each new deck** — don't reuse an old one, or you'll miss new blocks and fixes.
> Keep this file's name (`tu-deck-template.md`). When you fill it in, **Save As** under your presentation's name (e.g. `open-day-review.md`).

---

## HOW TO USE THIS FILE

1. Open a **new** Claude chat.
2. Paste in **this whole file**, then paste **your content** beneath it (fill in the VARIABLES and write your slides using the BLOCK PATTERNS below).
3. Send this instruction:
   > *"Using the attached template, build a linked HTML deck. Fill the variables with my content below and create one slide per item using the block types specified. Output the complete HTML file. Do not add or change any CSS."*
4. Save the HTML file Claude returns under your presentation's name (e.g. `open-day-review.html`).

**After generating, quick-check the file:** search it for `<style` (should appear **zero** times) and `http` (only `tees.ac.uk` and `mhudsontees.github.io` links should appear). If either fails, regenerate.

---

## ⚙️ VARIABLES — fill these in

```
DECK_TITLE:      [e.g. AI Working Group]
DECK_SUBTITLE:   [e.g. Teesside University — Student Recruitment & Marketing · 2026]
DECK_EYEBROW:    [small label above the title, e.g. SRM AI Working Group]
AUTHOR_NAME:     [recommended — your name, shown in the footer, e.g. Matt Hudson]
DECK_VERSION:    [optional — footer version/date, e.g. v1 · Sept 2026. Leave blank to omit.]
```

> **Footer fields self-heal.** The slide counter (`N / TOTAL`) is always shown. `AUTHOR_NAME` and `DECK_VERSION` appear only if filled — leave either blank and it's removed cleanly, with no gap or misalignment. Fill what you want; the layout adjusts.

---

## 📋 INSTRUCTIONS FOR CLAUDE

- Output **one complete, valid HTML file**. Nothing before `<!DOCTYPE html>` or after `</html>`.
- Use the exact `<head>` given in HTML SHELL below **verbatim** — it links the hosted design system and font. **Do not** add a `<style>` block, inline styles, or any external resource (no CDNs, no Google Fonts, no icon libraries).
- Build one `<section class="slide">` per slide the author specifies, in order, using the BLOCK PATTERNS.
- The **first** slide gets `class="slide title-slide active"`; every other slide gets `class="slide"` plus any modifier shown in its pattern.
- Give each slide a **semantic id** based on its content (e.g. `id="landscape-stats"`), never positional.
- Set every slide's footer counter to `N / TOTAL`.
- British English throughout. Use `&mdash;`, `&amp;`, `&middot;` entities.
- Icons: use only the `<use href="#i-...">` ids listed in ICON VOCABULARY. The icon sprite is included in the shell — do not add icons from anywhere else.
- Do not invent data. Where the author leaves a placeholder, keep it as written.

---

## 🏗️ HTML SHELL — use verbatim

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[DECK_TITLE] — Teesside University</title>
<link rel="icon" type="image/png" href="https://www.tees.ac.uk/favicon-32x32.png">
<link rel="stylesheet" href="https://www.tees.ac.uk/sections/staff/ai/css/tu-fonts.css">
<link rel="stylesheet" href="https://mhudsontees.github.io/tu-deck-assets/tu-styles.css">
</head>
<body>
<!-- ICON SPRITE — paste the sprite from ICON SPRITE section here, once, first thing in body -->
<div id="deck">
  <!-- SLIDES HERE — one <section class="slide"> per slide -->
</div>
<button class="nav-btn nav-disabled" id="nav-prev" aria-label="Previous slide"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
<button class="nav-btn nav-active" id="nav-next" aria-label="Next slide"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
<div id="mobile-counter"></div>
<script>
  const slides=Array.from(document.querySelectorAll('.slide'));
  const prev=document.getElementById('nav-prev'),next=document.getElementById('nav-next'),mc=document.getElementById('mobile-counter');
  let cur=0;
  function render(){ slides.forEach((s,i)=>{ s.classList.remove('active','exit-left','exit-right','enter-reverse'); if(i===cur) s.classList.add('active'); });
    prev.classList.toggle('nav-disabled',cur===0); prev.classList.toggle('nav-active',cur!==0);
    next.classList.toggle('nav-disabled',cur===slides.length-1); next.classList.toggle('nav-active',cur!==slides.length-1);
    if(mc) mc.textContent=(cur+1)+' / '+slides.length; if(location.hash!=='#'+slides[cur].id) history.replaceState(null,'','#'+slides[cur].id); }
  function go(n){ if(n<0||n>=slides.length) return; const back=n<cur; slides[cur].classList.add(back?'exit-right':'exit-left'); cur=n; if(back) slides[cur].classList.add('enter-reverse'); render(); }
  next.addEventListener('click',()=>go(cur+1)); prev.addEventListener('click',()=>go(cur-1));
  document.addEventListener('keydown',e=>{ if(e.key==='ArrowRight'||e.key===' ')go(cur+1); if(e.key==='ArrowLeft')go(cur-1); if(e.key==='Home')go(0); if(e.key==='End')go(slides.length-1); });
  let tsx=null; document.addEventListener('touchstart',e=>{tsx=e.changedTouches[0].clientX;},{passive:true});
  document.addEventListener('touchend',e=>{ if(tsx===null)return; const dx=e.changedTouches[0].clientX-tsx; tsx=null; if(Math.abs(dx)>60){go(dx<0?cur+1:cur-1);} },{passive:true});
  const idx=slides.findIndex(s=>'#'+s.id===location.hash); if(idx>0) cur=idx;
  window.downloadPDF=function(){ setTimeout(()=>window.print(),200); };
  // footer self-heal: drop any optional field left empty so the grid recloses (counter always stays)
  document.querySelectorAll('.footer-author, .footer-version').forEach(el=>{ if(!el.textContent.trim()) el.remove(); });
  render();
</script>
</body>
</html>
```

**Every slide uses this frame** (the footer is identical on every slide — only `N / TOTAL` changes):

```html
<section class="slide [MODIFIER]" id="[semantic-id]">
  <img class="client-logo" src="https://www.tees.ac.uk/depts/srm/templates/Teesside%20University%20White.png" alt="Teesside University">
  <div class="slide-scroll"><div class="slide-content">
    [BLOCK CONTENT GOES HERE]
  </div></div>
  <div class="digiful-footer">
    <img class="footer-logo" src="https://www.tees.ac.uk/depts/srm/templates/Teesside%20University%20White.png" alt="Teesside University">
    <span class="slide-counter">[N] / [TOTAL]</span>
    <span class="footer-author">[AUTHOR_NAME]</span>
    <a class="pdf-link" onclick="window.downloadPDF()">&#8595; Save as PDF (Chrome)</a>
    <span class="footer-version">[DECK_VERSION]</span>
  </div>
</section>
```

---

## 🎯 ICON VOCABULARY

Use only these ids, as `<svg class="icon" aria-hidden="true"><use href="#i-NAME"/></svg>`. Add `class="icon icon-gold"` to tint gold.

`i-circle-check` · `i-warning` · `i-bolt` · `i-lightbulb` · `i-arrow-right` · `i-chart` · `i-target` · `i-users` · `i-calendar` · `i-folder` · `i-pen` · `i-robot` · `i-gear`

---

## 📑 BLOCK PATTERNS

> Replace every `[...]` with real content. Omit optional lines you don't need. Choose the block that fits each slide; **Block 11 (Standard bullets) is the default** for a heading + body points.

### Block 01 — Title  ·  modifier: `title-slide`
```html
<span class="title-eyebrow">[DECK_EYEBROW]</span>
<h1 class="slide-h1">[DECK_TITLE]</h1>
<p class="title-meta">[DECK_SUBTITLE]</p>
```

### Block 02 — Agenda
```html
<span class="slide-label">[Agenda]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<ul class="agenda-list">
  <li class="agenda-item"><span class="agenda-num">01</span><span class="agenda-text">[Item]</span><span class="agenda-meta">[e.g. 10 min]</span></li>
  <!-- repeat li per agenda item -->
</ul>
```

### Block 03 — Section cover  ·  modifier: `section-cover`
```html
<span class="slide-label">[Section 01]</span>
<h1 class="slide-h1">[Section title]</h1>
<p class="slide-sub">[One-line intro]</p>
<div class="section-num">[01]</div>
```

### Block 04 — Donut chart (single %)
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="donut-wrap">
  <svg class="donut" viewBox="0 0 220 220" role="img" aria-label="[NN percent ...]">
    <circle class="donut-track" cx="110" cy="110" r="80"></circle>
    <!-- stroke-dasharray: value = 5.0265 × percentage ; second number = 502.65 − first -->
    <circle class="donut-value" cx="110" cy="110" r="80" stroke-dasharray="[VALUE] [REMAINDER]"></circle>
    <text class="donut-centre" x="110" y="112" text-anchor="middle" dominant-baseline="middle">[NN%]</text>
    <text class="donut-centre-sub" x="110" y="140" text-anchor="middle">[label]</text>
  </svg>
  <div class="donut-legend">
    <div class="legend-item"><span class="legend-swatch on"></span>[On label]</div>
    <div class="legend-item"><span class="legend-swatch off"></span>[Off label]</div>
    <p class="src-note">[Source]</p>
  </div>
</div>
```

### Block 05 — Stat cards (up to 4)
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="stat-grid">
  <div class="stat-card"><div class="stat-number">[92%]</div><div class="stat-label">[what it means]</div><div class="stat-source">[source]</div></div>
  <!-- repeat stat-card, 2 to 4 total -->
</div>
```

### Block 06 — Body text + stat cards (2-up)
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="split-2">
  <div>
    <p class="slide-sub">[Paragraph]</p>
    <p class="slide-sub" style="margin-top:16px;">[Optional second paragraph]</p>
  </div>
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-number">[4&times;]</div><div class="stat-label">[label]</div></div>
    <div class="stat-card"><div class="stat-number">[18mo]</div><div class="stat-label">[label]</div></div>
  </div>
</div>
```

### Block 07 — Timeline
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="timeline">
  <div class="timeline-item"><div class="timeline-dot">1</div><div class="timeline-content"><div class="timeline-year">[2023]</div><div class="timeline-title">[Title]</div><div class="timeline-desc">[Description]</div></div></div>
  <!-- repeat timeline-item -->
</div>
```

### Block 08 — Lesson + mistake callout
```html
<span class="slide-label">[Section label]</span>
<div class="lesson-num">[01]</div>
<h2 class="slide-h2">[Lesson heading]</h2>
<div class="gold-rule"></div>
<p class="lesson-body">[Lesson text]</p>
<div class="mistake-block">
  <div class="mistake-label"><svg class="icon" aria-hidden="true"><use href="#i-warning"/></svg> Common mistake</div>
  <div class="mistake-text">[The pitfall]</div>
</div>
```

### Block 09 — News / competitor cards
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="card-grid cols-3">
  <div class="info-card"><span class="card-src">[Source]</span><div class="card-title">[Title]</div><div class="card-body">[Body]</div><div class="card-meta">[Meta]</div></div>
  <!-- repeat info-card (cols-2 / cols-3 / cols-4 on the grid) -->
</div>
<p class="src-note">[Optional source note]</p>
```

### Block 10 — Role cards
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="card-grid cols-3">
  <div class="info-card"><span class="card-src">[Role]</span><div class="card-title">[Title]</div><div class="card-body">[Remit]</div><div class="card-meta">[Area]</div></div>
  <!-- repeat -->
</div>
```

### Block 11 — Standard bullets  ·  DEFAULT
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<ul class="slide-list">
  <li>[Point]</li>
  <!-- up to ~5 -->
</ul>
```

### Block 12 — Project cards (up to 4)
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="card-grid cols-4">
  <div class="info-card"><span class="project-badge">[Stage]</span><div class="card-title">[Project]</div><div class="card-body">[Description]</div></div>
  <!-- repeat -->
</div>
```

### Block 13 — Lesson + takeaway
```html
<span class="slide-label">[Section label]</span>
<div class="lesson-num">[02]</div>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<p class="lesson-body">[Lesson text]</p>
<div class="takeaway">
  <div class="takeaway-label">Key takeaway</div>
  <div class="takeaway-text">[The takeaway]</div>
</div>
```

### Block 14 — Discussion cards (2×2)
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="card-grid cols-2">
  <div class="discuss-card"><span class="discuss-num">Q1</span><div class="discuss-q">[Question]</div><div class="discuss-hint">[Hint]</div></div>
  <!-- repeat, usually 4 -->
</div>
```

### Block 15 — Opportunities & blockers
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="opp-blocker">
  <div class="opp-col">
    <div class="ob-label"><svg class="icon" aria-hidden="true"><use href="#i-bolt"/></svg> Opportunities</div>
    <ul class="ob-list"><li>[Point]</li></ul>
  </div>
  <div class="blocker-col">
    <div class="ob-label"><svg class="icon" aria-hidden="true"><use href="#i-warning"/></svg> Blockers</div>
    <ul class="ob-list"><li>[Point]</li></ul>
  </div>
</div>
```

### Block 16 — Two-column bullets
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="two-col">
  <div><div class="col-head">[Left heading]</div><ul class="slide-list"><li>[Point]</li></ul></div>
  <div><div class="col-head">[Right heading]</div><ul class="slide-list"><li>[Point]</li></ul></div>
</div>
```

### Block 17 — Flowchart
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="flow-chart">
  <div class="flow-step"><div class="flow-box">[Step]</div></div>
  <div class="flow-arrow">&#8595;</div>
  <div class="flow-step"><div class="flow-box">[Step]</div><div class="flow-note">[Side note]</div></div>
  <div class="flow-arrow">&#8595;</div>
  <div class="flow-step"><div class="flow-box highlight">[Highlighted step]</div><div class="flow-note">[Side note]</div></div>
  <!-- add class "highlight" to the flow-box you want emphasised -->
</div>
```

### Block 18 — Feature card
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="feature-card">
  <div class="feature-icon"><svg class="icon" aria-hidden="true"><use href="#i-lightbulb"/></svg></div>
  <div>
    <div class="feature-title">[Title]</div>
    <div class="feature-body">[Body]</div>
    <ul class="slide-list"><li style="font-size:clamp(14px,1.5vw,17px)">[Optional point]</li></ul>
  </div>
</div>
```

### Block 19 — End / closing  ·  modifier: `end-slide`
```html
<span class="slide-label">[Thank you]</span>
<h1 class="slide-h1">[Questions?]</h1>
<div class="gold-rule"></div>
<p class="slide-sub">[Closing line]</p>
<div class="end-contact">
  <span><strong>[Name / group]</strong></span>
  <span>[Line 2]</span>
  <span>[Line 3]</span>
</div>
```

### Block 20 — Action points
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<ul class="action-list">
  <li class="action-item"><span class="action-num">1</span><span class="action-text">[Action]</span><span class="action-owner">[Owner · when]</span></li>
  <!-- repeat -->
</ul>
```

### Block 21 — Attribution overlay  ·  MODIFIER (add inside any slide, before the footer)
```html
<div class="attr-block">
  <div class="attr-title">[Project / topic]</div>
  <div class="attr-meta">[Name] | [Group] &middot; [Year]</div>
  <hr class="attr-divider">
</div>
```

### Block 22 — Pull quote  ·  modifier: `quote-slide`
```html
<span class="slide-label">[Section label]</span>
<div class="quote-mark">&ldquo;</div>
<blockquote class="quote-text">[The quotation]</blockquote>
<div class="quote-attr">
  <span class="quote-name">[Name]</span>
  <span class="quote-role">[Role · organisation]</span>
</div>
```

### Block 23 — Comparison table
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="cmp-scroll">
  <table class="cmp-table">
    <thead><tr><th>[Criterion]</th><th>[Option A]</th><th>[Option B]</th><th>[Option C]</th></tr></thead>
    <tbody>
      <tr><th>[Row label]</th><td class="cmp-yes">[Yes]</td><td>[value]</td><td class="cmp-no">[No]</td></tr>
      <!-- repeat rows; use class cmp-yes / cmp-no for positive/negative cells -->
    </tbody>
  </table>
</div>
<p class="src-note">[Optional note]</p>
```

### Block 24 — Bar chart (SVG, up to ~5 bars)
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="chart-wrap">
  <svg class="chart-svg" viewBox="0 0 820 300" role="img" aria-label="[describe the chart]">
    <line class="chart-grid" x1="60" y1="240" x2="800" y2="240"></line>
    <line class="chart-grid" x1="60" y1="180" x2="800" y2="180"></line>
    <line class="chart-grid" x1="60" y1="120" x2="800" y2="120"></line>
    <line class="chart-grid" x1="60" y1="60"  x2="800" y2="60"></line>
    <text class="chart-axis-label" x="46" y="245" text-anchor="end">0</text>
    <text class="chart-axis-label" x="46" y="185" text-anchor="end">25</text>
    <text class="chart-axis-label" x="46" y="125" text-anchor="end">50</text>
    <text class="chart-axis-label" x="46" y="65"  text-anchor="end">75</text>
    <!-- per bar: y = 240 − (value × 2.4) ; height = value × 2.4 . Add class "alt" to lower bars. -->
    <rect class="chart-bar" x="90" y="[Y]" width="86" height="[H]"></rect>
    <text class="chart-value" x="133" y="[Y−9]" text-anchor="middle">[NN%]</text>
    <text class="chart-axis-label" x="133" y="264" text-anchor="middle">[Label]</text>
    <!-- repeat bars at x = 90, 230, 370, 510, 650 -->
  </svg>
</div>
```

### Block 25 — Roadmap (Now / Next / Later)
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="roadmap">
  <div class="roadmap-col now"><div class="roadmap-phase">Now</div><div class="roadmap-when">[When]</div><ul class="roadmap-list"><li>[Item]</li></ul></div>
  <div class="roadmap-col next"><div class="roadmap-phase">Next</div><div class="roadmap-when">[When]</div><ul class="roadmap-list"><li>[Item]</li></ul></div>
  <div class="roadmap-col later"><div class="roadmap-phase">Later</div><div class="roadmap-when">[When]</div><ul class="roadmap-list"><li>[Item]</li></ul></div>
</div>
```

### Block 26 — 2×2 matrix
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<div class="matrix-wrap">
  <div class="matrix-y">[Y axis label] &rarr;</div>
  <div>
    <div class="matrix">
      <div class="matrix-cell priority"><div class="matrix-cell-label">[Top-left]</div><div class="matrix-cell-items">[Items]</div></div>
      <div class="matrix-cell"><div class="matrix-cell-label">[Top-right]</div><div class="matrix-cell-items">[Items]</div></div>
      <div class="matrix-cell"><div class="matrix-cell-label">[Bottom-left]</div><div class="matrix-cell-items">[Items]</div></div>
      <div class="matrix-cell"><div class="matrix-cell-label">[Bottom-right]</div><div class="matrix-cell-items">[Items]</div></div>
    </div>
    <div class="matrix-x">[X axis label] &rarr;</div>
  </div>
</div>
```

### Block 27 — Image / media  ·  requires network; keep images small; alt text mandatory
```html
<span class="slide-label">[Section label]</span>
<h2 class="slide-h2">[Heading]</h2>
<div class="gold-rule"></div>
<figure class="media-figure">
  <img class="media-img" src="[HOSTED IMAGE URL]" alt="[describe the image — required]" loading="lazy">
  <figcaption class="media-caption">[Caption]</figcaption>
  <span class="media-credit">[Credit / note]</span>
</figure>
```

### Block 28 — Big statement  ·  modifier: `statement-slide`
```html
<span class="slide-label">[Section label]</span>
<div class="statement">[The <em>statement</em>, with emphasis on key words.]</div>
<p class="statement-sub">[Supporting line]</p>
```

---

## 🎨 ICON SPRITE — paste verbatim at the top of `<body>`

Paste the entire block below immediately after `<body>`, before `<div id="deck">`. It is invisible; it only defines the icons.

```html
<!-- Icons: Font Awesome Free, CC BY 4.0 -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <symbol id="i-circle-check" viewBox="0 0 512 512"><path d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z"/></symbol>
  <symbol id="i-warning" viewBox="0 0 512 512"><path d="M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"/></symbol>
  <symbol id="i-bolt" viewBox="0 0 448 512"><path d="M338.8-9.9c11.9 8.6 16.3 24.2 10.9 37.8L271.3 224 416 224c13.5 0 25.5 8.4 30.1 21.1s.7 26.9-9.6 35.5l-288 240c-11.3 9.4-27.4 9.9-39.3 1.3s-16.3-24.2-10.9-37.8L176.7 288 32 288c-13.5 0-25.5-8.4-30.1-21.1s-.7-26.9 9.6-35.5l288-240c11.3-9.4 27.4-9.9 39.3-1.3z"/></symbol>
  <symbol id="i-lightbulb" viewBox="0 0 384 512"><path d="M292.9 384c7.3-22.3 21.9-42.5 38.4-59.9 32.7-34.4 52.7-80.9 52.7-132.1 0-106-86-192-192-192S0 86 0 192c0 51.2 20 97.7 52.7 132.1 16.5 17.4 31.2 37.6 38.4 59.9l201.7 0zM288 432l-192 0 0 16c0 44.2 35.8 80 80 80l32 0c44.2 0 80-35.8 80-80l0-16zM184 112c-39.8 0-72 32.2-72 72 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-66.3 53.7-120 120-120 13.3 0 24 10.7 24 24s-10.7 24-24 24z"/></symbol>
  <symbol id="i-arrow-right" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></symbol>
  <symbol id="i-chart" viewBox="0 0 512 512"><path d="M32 32c17.7 0 32 14.3 32 32l0 336c0 8.8 7.2 16 16 16l400 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 480c-44.2 0-80-35.8-80-80L0 64C0 46.3 14.3 32 32 32zM144 224c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm144-64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32s32 14.3 32 32zm80 32c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32zM512 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-224c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></symbol>
  <symbol id="i-target" viewBox="0 0 512 512"><path d="M448 256a192 192 0 1 0 -384 0 192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></symbol>
  <symbol id="i-users" viewBox="0 0 640 512"><path d="M320 16a104 104 0 1 1 0 208 104 104 0 1 1 0-208zM96 88a72 72 0 1 1 0 144 72 72 0 1 1 0-144zM0 416c0-70.7 57.3-128 128-128 12.8 0 25.2 1.9 36.9 5.4-32.9 36.8-52.9 85.4-52.9 138.6l0 16c0 11.4 2.4 22.2 6.7 32L32 480c-17.7 0-32-14.3-32-32l0-32zm521.3 64c4.3-9.8 6.7-20.6 6.7-32l0-16c0-53.2-20-101.8-52.9-138.6 11.7-3.5 24.1-5.4 36.9-5.4 70.7 0 128 57.3 128 128l0 32c0 17.7-14.3 32-32 32l-86.7 0zM472 160a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zM160 432c0-88.4 71.6-160 160-160s160 71.6 160 160l0 16c0 17.7-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32l0-16z"/></symbol>
  <symbol id="i-calendar" viewBox="0 0 448 512"><path d="M128 0C110.3 0 96 14.3 96 32l0 32-32 0C28.7 64 0 92.7 0 128l0 48 448 0 0-48c0-35.3-28.7-64-64-64l-32 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32-128 0 0-32c0-17.7-14.3-32-32-32zM0 224L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192-448 0z"/></symbol>
  <symbol id="i-folder" viewBox="0 0 512 512"><path d="M64 448l384 0c35.3 0 64-28.7 64-64l0-240c0-35.3-28.7-64-64-64L298.7 80c-6.9 0-13.7-2.2-19.2-6.4L241.1 44.8C230 36.5 216.5 32 202.7 32L64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64z"/></symbol>
  <symbol id="i-pen" viewBox="0 0 512 512"><path d="M352.9 21.2L308 66.1 445.9 204 490.8 159.1C504.4 145.6 512 127.2 512 108s-7.6-37.6-21.2-51.1L455.1 21.2C441.6 7.6 423.2 0 404 0s-37.6 7.6-51.1 21.2zM274.1 100L58.9 315.1c-10.7 10.7-18.5 24.1-22.6 38.7L.9 481.6c-2.3 8.3 0 17.3 6.2 23.4s15.1 8.5 23.4 6.2l127.8-35.5c14.6-4.1 27.9-11.8 38.7-22.6L412 237.9 274.1 100z"/></symbol>
  <symbol id="i-robot" viewBox="0 0 640 512"><path d="M352 0c0-17.7-14.3-32-32-32S288-17.7 288 0l0 64-96 0c-53 0-96 43-96 96l0 224c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-224c0-53-43-96-96-96l-96 0 0-64zM160 368c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zM224 176a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm144 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM64 224c0-17.7-14.3-32-32-32S0 206.3 0 224l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96zm544-32c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32z"/></symbol>
  <symbol id="i-gear" viewBox="0 0 512 512"><path d="M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"/></symbol>
</svg>
```

---

## NOTES

- **Linked mode:** this deck references the hosted design system and font. It shows the current house style automatically and needs a connection to `tees.ac.uk` and `mhudsontees.github.io` when opened. Off the TU VPN and off-campus, `tees.ac.uk` assets may be blocked in the browser — present from a normal network, or ask Matt for an offline copy.
- **To change a deck later:** edit your content file and regenerate — don't hand-edit the HTML.
- **Reusable slide?** If you build something colleagues would reuse, flag it to Matt for the shared library.
