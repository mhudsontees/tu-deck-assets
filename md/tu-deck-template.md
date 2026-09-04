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
- Give each slide a **semantic id** based on its content, in kebab-case, unique within the deck (e.g. `id="landscape-stats"`), never positional (never `id="slide-4"`). **This id is what deep-links to the slide** — `deck.html#landscape-stats` jumps straight to it.
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

> Each block below shows the **exact class** to put on its `<section>` and a **filled example** you can copy and edit. `default` means just `class="slide"` with no modifier. Block 11 is the default choice for a normal heading + points slide.

### Block 01 — Title  ·  class: **title-slide**
`<section class="slide title-slide" id="[semantic-id]">`
```html
<span class="title-eyebrow">SRM AI Working Group</span>
<h1 class="slide-h1">Block Style Guide</h1>
<p class="title-meta">Teesside University &mdash; Student Recruitment &amp; Marketing &middot; 2026</p>
```

### Block 02 — Agenda  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Agenda</span>
<h2 class="slide-h2">What we&rsquo;ll cover</h2>
<div class="gold-rule"></div>
<ul class="agenda-list">
  <li class="agenda-item"><span class="agenda-num">01</span><span class="agenda-text">Where we stand</span><span class="agenda-meta">10 min</span></li>
  <li class="agenda-item"><span class="agenda-num">02</span><span class="agenda-text">Sector context and capability</span><span class="agenda-meta">10 min</span></li>
  <li class="agenda-item"><span class="agenda-num">03</span><span class="agenda-text">Opportunities and blockers</span><span class="agenda-meta">15 min</span></li>
  <li class="agenda-item"><span class="agenda-num">04</span><span class="agenda-text">Proposed projects</span><span class="agenda-meta">15 min</span></li>
  <li class="agenda-item"><span class="agenda-num">05</span><span class="agenda-text">Discussion and actions</span><span class="agenda-meta">10 min</span></li>
</ul>
```

### Block 03 — Section cover  ·  class: **section-cover**
`<section class="slide section-cover" id="[semantic-id]">`
```html
<span class="slide-label">Section 01</span>
<h1 class="slide-h1">The Landscape</h1>
<p class="slide-sub">Where the sector has moved, and what that means for us.</p>
<div class="section-num">01</div>
```

### Block 04 — Donut chart  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 01 &mdash; The Landscape</span>
<h2 class="slide-h2">Staff AI usage</h2>
<div class="gold-rule"></div>
<div class="donut-wrap">
  <svg class="donut" viewBox="0 0 220 220" role="img" aria-label="68 percent of staff use AI tools weekly">
    <circle class="donut-track" cx="110" cy="110" r="80"></circle>
    <circle class="donut-value" cx="110" cy="110" r="80" stroke-dasharray="341.8 160.9"></circle>
    <text class="donut-centre" x="110" y="112" text-anchor="middle" dominant-baseline="middle">68%</text>
    <text class="donut-centre-sub" x="110" y="140" text-anchor="middle">weekly users</text>
  </svg>
  <div class="donut-legend">
    <div class="legend-item"><span class="legend-swatch on"></span>Use an AI tool at least weekly</div>
    <div class="legend-item"><span class="legend-swatch off"></span>Occasional or non-users</div>
    <p class="src-note">Illustrative figures &mdash; replace with your own source.</p>
  </div>
</div>
```

### Block 05 — Stat cards (up to 4)  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 01 &mdash; The Landscape</span>
<h2 class="slide-h2">Where we stand</h2>
<div class="gold-rule"></div>
<div class="stat-grid">
  <div class="stat-card"><div class="stat-number">92%</div><div class="stat-label">of UK undergraduates use generative AI</div><div class="stat-source">HEPI, 2025</div></div>
  <div class="stat-card"><div class="stat-number">3</div><div class="stat-label">competitor universities with institution-wide AI tools</div><div class="stat-source">Oxford, Liverpool, South Wales</div></div>
  <div class="stat-card"><div class="stat-number">1</div><div class="stat-label">approved tool for University data</div><div class="stat-source">Copilot, basic licence</div></div>
  <div class="stat-card"><div class="stat-number">2,000+</div><div class="stat-label">staff covered by any policy decision</div></div>
</div>
```

### Block 06 — Body text + stat cards (2-up)  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 01 &mdash; The Landscape</span>
<h2 class="slide-h2">The gap in context</h2>
<div class="gold-rule"></div>
<div class="split-2">
  <div>
    <p class="slide-sub">Adoption among students has outpaced institutional policy by a wide margin. That gap is not unique to us &mdash; it is a sector-wide pattern that policy has not yet resolved.</p>
    <p class="slide-sub" style="margin-top:16px;">The practical question is not whether staff use these tools, but whether they do so with support and guardrails.</p>
  </div>
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-number">4&times;</div><div class="stat-label">growth in staff AI queries year on year</div></div>
    <div class="stat-card"><div class="stat-number">18mo</div><div class="stat-label">typical lag between tool release and approval</div></div>
  </div>
</div>
```

### Block 07 — Timeline  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 02 &mdash; Capability</span>
<h2 class="slide-h2">How fast this is moving</h2>
<div class="gold-rule"></div>
<div class="timeline">
  <div class="timeline-item"><div class="timeline-dot">1</div><div class="timeline-content"><div class="timeline-year">2023</div><div class="timeline-title">Generative AI goes mainstream</div><div class="timeline-desc">Public tools reach classrooms and workplaces faster than policy can respond.</div></div></div>
  <div class="timeline-item"><div class="timeline-dot">2</div><div class="timeline-content"><div class="timeline-year">2024</div><div class="timeline-title">Agents and automation mature</div><div class="timeline-desc">Workflow tools move from novelty to genuine time savings.</div></div></div>
  <div class="timeline-item"><div class="timeline-dot">3</div><div class="timeline-content"><div class="timeline-year">2025</div><div class="timeline-title">Institution-wide adoption</div><div class="timeline-desc">Competitor universities deploy AI tools and qualifications at scale.</div></div></div>
  <div class="timeline-item"><div class="timeline-dot">4</div><div class="timeline-content"><div class="timeline-year">2026</div><div class="timeline-title">North East AI Growth Zone</div><div class="timeline-desc">Regional designation raises the stakes for local institutions.</div></div></div>
</div>
```

### Block 08 — Lesson + mistake callout  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 02 &mdash; Capability</span>
<div class="lesson-num">01</div>
<h2 class="slide-h2">Start with the workflow</h2>
<div class="gold-rule"></div>
<p class="lesson-body">The tools that stick are the ones that remove a step someone already resents. Begin with a task the team already does every week, not with the technology.</p>
<div class="mistake-block">
  <div class="mistake-label"><svg class="icon" aria-hidden="true"><use href="#i-warning"/></svg> Common mistake</div>
  <div class="mistake-text">Choosing a tool first and then hunting for a problem it might solve. This produces impressive demos and very little adoption.</div>
</div>
```

### Block 09 — News / competitor cards  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 02 &mdash; Capability</span>
<h2 class="slide-h2">What others are doing</h2>
<div class="gold-rule"></div>
<div class="card-grid cols-3">
  <div class="info-card"><span class="card-src">Oxford</span><div class="card-title">Institution-wide assistant rollout</div><div class="card-body">Deployed to all staff and students with a supporting training programme.</div><div class="card-meta">Reported 2025</div></div>
  <div class="info-card"><span class="card-src">Liverpool</span><div class="card-title">Credit-bearing AI qualification</div><div class="card-body">Embedded AI literacy into the curriculum rather than treating it as an add-on.</div><div class="card-meta">Reported 2025</div></div>
  <div class="info-card"><span class="card-src">South Wales</span><div class="card-title">Staff AI skills framework</div><div class="card-body">Defined competency levels so training can be targeted by role.</div><div class="card-meta">Reported 2025</div></div>
</div>
<p class="src-note">Illustrative summaries &mdash; verify before external use.</p>
```

### Block 10 — Role cards  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 03 &mdash; People</span>
<h2 class="slide-h2">Who does what</h2>
<div class="gold-rule"></div>
<div class="card-grid cols-3">
  <div class="info-card"><span class="card-src">Chair</span><div class="card-title">University AI Working Group</div><div class="card-body">Sets direction across the institution and owns escalation to director level.</div><div class="card-meta">Cross-department</div></div>
  <div class="info-card"><span class="card-src">Facilitators</span><div class="card-title">SRM representation</div><div class="card-body">Run departmental sessions, gather use cases and feed them upward.</div><div class="card-meta">Marketing / SRM</div></div>
  <div class="info-card"><span class="card-src">Contributors</span><div class="card-title">Professional services staff</div><div class="card-body">Bring real workflows and test proposals against day-to-day practice.</div><div class="card-meta">All grades</div></div>
</div>
```

### Block 11 — Standard bullets  ·  class: **default**  ·  **DEFAULT — use this unless another block fits**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 03 &mdash; People</span>
<h2 class="slide-h2">Principles we agreed</h2>
<div class="gold-rule"></div>
<ul class="slide-list">
  <li>Approved tools first &mdash; University data stays within policy.</li>
  <li>Start with workflows that already cause friction.</li>
  <li>Document use cases properly so investment requests have evidence.</li>
  <li>Share what works across departments rather than rebuilding it.</li>
  <li>Keep a human check on anything that reaches a student or applicant.</li>
</ul>
```

### Block 12 — Project cards (up to 4)  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 04 &mdash; Projects</span>
<h2 class="slide-h2">Live and proposed work</h2>
<div class="gold-rule"></div>
<div class="card-grid cols-4">
  <div class="info-card"><span class="project-badge">Alpha</span><div class="card-title">Course search chatbot</div><div class="card-body">Sandboxed prototype answering course queries.</div></div>
  <div class="info-card"><span class="project-badge">Beta</span><div class="card-title">Improved course search</div><div class="card-body">Rebuilt search with better matching and fallbacks.</div></div>
  <div class="info-card"><span class="project-badge">Beta</span><div class="card-title">Events filter</div><div class="card-body">Restructured data and rebuilt filtering.</div></div>
  <div class="info-card"><span class="project-badge">Proposed</span><div class="card-title">Web copy proofing</div><div class="card-body">Automated first-pass check before human review.</div></div>
</div>
```

### Block 13 — Lesson + takeaway  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 04 &mdash; Projects</span>
<div class="lesson-num">02</div>
<h2 class="slide-h2">Prove it small</h2>
<div class="gold-rule"></div>
<p class="lesson-body">Every project above began as a contained test with a defined success measure. None required new budget to reach a demonstrable stage &mdash; which is precisely what makes the case for the next stage credible.</p>
<div class="takeaway">
  <div class="takeaway-label">Key takeaway</div>
  <div class="takeaway-text">A working prototype is a stronger business case than a proposal document.</div>
</div>
```

### Block 14 — Discussion cards (2x2)  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 05 &mdash; Discussion</span>
<h2 class="slide-h2">Questions for the group</h2>
<div class="gold-rule"></div>
<div class="card-grid cols-2">
  <div class="discuss-card"><span class="discuss-num">Q1</span><div class="discuss-q">Which weekly task would you most like to hand over?</div><div class="discuss-hint">Think about repetition, not complexity.</div></div>
  <div class="discuss-card"><span class="discuss-num">Q2</span><div class="discuss-q">Where does the current toolset genuinely block you?</div><div class="discuss-hint">Specific examples help build the case.</div></div>
  <div class="discuss-card"><span class="discuss-num">Q3</span><div class="discuss-q">What would make you confident using an AI tool at work?</div><div class="discuss-hint">Training, guardrails, or clearer policy?</div></div>
  <div class="discuss-card"><span class="discuss-num">Q4</span><div class="discuss-q">What should we bring to the next session?</div><div class="discuss-hint">One concrete item each.</div></div>
</div>
```

### Block 15 — Opportunities & blockers  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 05 &mdash; Position</span>
<h2 class="slide-h2">Opportunities and blockers</h2>
<div class="gold-rule"></div>
<div class="opp-blocker">
  <div class="opp-col">
    <div class="ob-label"><svg class="icon" aria-hidden="true"><use href="#i-bolt"/></svg> Opportunities</div>
    <ul class="ob-list">
      <li>Upgrade Copilot licences for defined roles</li>
      <li>Build documented use cases for investment requests</li>
      <li>Adopt low-risk complementary tools</li>
      <li>Automate departmental workflows with Power Automate</li>
    </ul>
  </div>
  <div class="blocker-col">
    <div class="ob-label"><svg class="icon" aria-hidden="true"><use href="#i-warning"/></svg> Blockers</div>
    <ul class="ob-list">
      <li>ICT cannot assess alternative tools at present</li>
      <li>Director-level sign-off needed for new tooling</li>
      <li>Personal data processing requires extra scrutiny</li>
      <li>Budget cycles slow adoption regardless of merit</li>
    </ul>
  </div>
</div>
```

### Block 16 — Two-column bullets  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 05 &mdash; Position</span>
<h2 class="slide-h2">Now versus next year</h2>
<div class="gold-rule"></div>
<div class="two-col">
  <div>
    <div class="col-head">Where we are</div>
    <ul class="slide-list">
      <li>Basic Copilot licences only</li>
      <li>No version control across the team</li>
      <li>Use cases held informally</li>
      <li>Training arranged case by case</li>
    </ul>
  </div>
  <div>
    <div class="col-head">Where we want to be</div>
    <ul class="slide-list">
      <li>Licences matched to actual need</li>
      <li>GitHub in place with team conventions</li>
      <li>A documented, reusable use-case library</li>
      <li>A defined route to funded training</li>
    </ul>
  </div>
</div>
```

### Block 17 — Flowchart  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 04 &mdash; Projects</span>
<h2 class="slide-h2">Web copy proposed automation</h2>
<div class="gold-rule"></div>
<div class="flow-chart">
  <div class="flow-step"><div class="flow-box">EMS submission received with accessible linked document</div></div>
  <div class="flow-arrow">&#8595;</div>
  <div class="flow-step"><div class="flow-box">Document passed to Power Automate</div><div class="flow-note">Trigger on submission</div></div>
  <div class="flow-arrow">&#8595;</div>
  <div class="flow-step"><div class="flow-box highlight">Trained AI agent runs spelling, grammar and style check</div><div class="flow-note">Copilot agent &mdash; within policy</div></div>
  <div class="flow-arrow">&#8595;</div>
  <div class="flow-step"><div class="flow-box">Corrected version returned with tracked changes listed</div><div class="flow-note">Human reviews output</div></div>
</div>
```

### Block 18 — Feature card  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 06 &mdash; Development</span>
<h2 class="slide-h2">Upskilling route</h2>
<div class="gold-rule"></div>
<div class="feature-card">
  <div class="feature-icon"><svg class="icon" aria-hidden="true"><use href="#i-lightbulb"/></svg></div>
  <div>
    <div class="feature-title">Funded AI training</div>
    <div class="feature-body">A monthly external programme, University funded, feeding material directly back into this group. The first example of sanctioned, budgeted AI training &mdash; and a useful precedent for future proposals.</div>
    <ul class="slide-list">
      <li style="font-size:clamp(14px,1.5vw,17px)">Material brought back to each working group session</li>
      <li style="font-size:clamp(14px,1.5vw,17px)">Directly transferable to departmental projects</li>
    </ul>
  </div>
</div>
```

### Block 19 — End / closing  ·  class: **end-slide**
`<section class="slide end-slide" id="[semantic-id]">`
```html
<span class="slide-label">Thank you</span>
<h1 class="slide-h1">Questions?</h1>
<div class="gold-rule"></div>
<p class="slide-sub">Next session dates and materials will follow in the Teams channel.</p>
<div class="end-contact">
  <span><strong>SRM AI Working Group</strong></span>
  <span>Student Recruitment &amp; Marketing</span>
  <span>Teesside University</span>
</div>
```

### Block 20 — Action points  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 05 &mdash; Discussion</span>
<h2 class="slide-h2">Agreed actions</h2>
<div class="gold-rule"></div>
<ul class="action-list">
  <li class="action-item"><span class="action-num">1</span><span class="action-text">Collect one candidate workflow from each attendee</span><span class="action-owner">All &middot; 2 weeks</span></li>
  <li class="action-item"><span class="action-num">2</span><span class="action-text">Draft the licence upgrade use case for director review</span><span class="action-owner">Facilitators</span></li>
  <li class="action-item"><span class="action-num">3</span><span class="action-text">Demo the web copy automation prototype</span><span class="action-owner">Next session</span></li>
  <li class="action-item"><span class="action-num">4</span><span class="action-text">Share the working group notes in the Teams channel</span><span class="action-owner">This week</span></li>
</ul>
```

### Block 21 — Attribution overlay  ·  class: **overlay**
> Not a slide on its own — add this `<div>` **inside any content slide**, just before the `<div class="digiful-footer">`.
```html
<div class="attr-block">
  <div class="attr-title">Web Copy Workflow Automation</div>
  <div class="attr-meta">Matt Hudson | SRM AI Working Group &middot; 2026</div>
  <hr class="attr-divider">
</div>
```

### Block 22 — Pull quote  ·  class: **quote-slide**
`<section class="slide quote-slide" id="[semantic-id]">`
```html
<span class="slide-label">Section 06 &mdash; Voices</span>
<div class="quote-mark">&ldquo;</div>
<blockquote class="quote-text">The tools were never the hard part. Agreeing what good looks like was.</blockquote>
<div class="quote-attr">
  <span class="quote-name">Working group participant</span>
  <span class="quote-role">Professional services &middot; Teesside University</span>
</div>
```

### Block 23 — Comparison table  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 03 &mdash; Tooling</span>
<h2 class="slide-h2">Tooling comparison</h2>
<div class="gold-rule"></div>
<div class="cmp-scroll">
  <table class="cmp-table">
    <thead>
      <tr><th>Criterion</th><th>Copilot (basic)</th><th>Copilot (upgraded)</th><th>Unapproved tools</th></tr>
    </thead>
    <tbody>
      <tr><th>University data</th><td class="cmp-yes">Approved</td><td class="cmp-yes">Approved</td><td class="cmp-no">Not permitted</td></tr>
      <tr><th>Cost</th><td>Included</td><td>Per-seat uplift</td><td>Varies</td></tr>
      <tr><th>Agent building</th><td class="cmp-no">Limited</td><td class="cmp-yes">Available</td><td>Varies</td></tr>
      <tr><th>Support route</th><td>ICT</td><td>ICT</td><td class="cmp-no">None</td></tr>
      <tr><th>Sign-off needed</th><td>None</td><td>Director level</td><td class="cmp-no">Not available</td></tr>
    </tbody>
  </table>
</div>
<p class="src-note">Illustrative &mdash; confirm current licensing before circulating.</p>
```

### Block 24 — Bar chart  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 01 &mdash; The Landscape</span>
<h2 class="slide-h2">Weekly AI use by team</h2>
<div class="gold-rule"></div>
<div class="chart-wrap">
  <svg class="chart-svg" viewBox="0 0 820 300" role="img" aria-label="Bar chart of weekly AI use by team, ranging from 34 to 81 percent">
    <line class="chart-grid" x1="60" y1="240" x2="800" y2="240"></line>
    <line class="chart-grid" x1="60" y1="180" x2="800" y2="180"></line>
    <line class="chart-grid" x1="60" y1="120" x2="800" y2="120"></line>
    <line class="chart-grid" x1="60" y1="60"  x2="800" y2="60"></line>
    <text class="chart-axis-label" x="46" y="245" text-anchor="end">0</text>
    <text class="chart-axis-label" x="46" y="185" text-anchor="end">25</text>
    <text class="chart-axis-label" x="46" y="125" text-anchor="end">50</text>
    <text class="chart-axis-label" x="46" y="65"  text-anchor="end">75</text>

    <rect class="chart-bar" x="90"  y="45"  width="86" height="195"></rect>
    <text class="chart-value" x="133" y="36" text-anchor="middle">81%</text>
    <text class="chart-axis-label" x="133" y="264" text-anchor="middle">Digital</text>

    <rect class="chart-bar" x="230" y="86"  width="86" height="154"></rect>
    <text class="chart-value" x="273" y="77" text-anchor="middle">64%</text>
    <text class="chart-axis-label" x="273" y="264" text-anchor="middle">Content</text>

    <rect class="chart-bar" x="370" y="110" width="86" height="130"></rect>
    <text class="chart-value" x="413" y="101" text-anchor="middle">54%</text>
    <text class="chart-axis-label" x="413" y="264" text-anchor="middle">Recruitment</text>

    <rect class="chart-bar alt" x="510" y="153" width="86" height="87"></rect>
    <text class="chart-value" x="553" y="144" text-anchor="middle">36%</text>
    <text class="chart-axis-label" x="553" y="264" text-anchor="middle">Events</text>

    <rect class="chart-bar alt" x="650" y="158" width="86" height="82"></rect>
    <text class="chart-value" x="693" y="149" text-anchor="middle">34%</text>
    <text class="chart-axis-label" x="693" y="264" text-anchor="middle">Admissions</text>
  </svg>
</div>
<p class="src-note">Hand-built SVG &mdash; no chart library, prints as vector.</p>
```

### Block 25 — Roadmap  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 06 &mdash; Direction</span>
<h2 class="slide-h2">Roadmap</h2>
<div class="gold-rule"></div>
<div class="roadmap">
  <div class="roadmap-col now">
    <div class="roadmap-phase">Now</div>
    <div class="roadmap-when">This term</div>
    <ul class="roadmap-list">
      <li>Collect departmental use cases</li>
      <li>Run the web copy prototype</li>
      <li>Establish the working group rhythm</li>
    </ul>
  </div>
  <div class="roadmap-col next">
    <div class="roadmap-phase">Next</div>
    <div class="roadmap-when">Next two terms</div>
    <ul class="roadmap-list">
      <li>Submit the licence upgrade case</li>
      <li>Adopt GitHub with team conventions</li>
      <li>Publish a shared use-case library</li>
    </ul>
  </div>
  <div class="roadmap-col later">
    <div class="roadmap-phase">Later</div>
    <div class="roadmap-when">Beyond 2026</div>
    <ul class="roadmap-list">
      <li>Departmental workflow automation at scale</li>
      <li>Role-based AI skills framework</li>
      <li>Cross-department shared tooling</li>
    </ul>
  </div>
</div>
```

### Block 26 — 2x2 matrix  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 06 &mdash; Direction</span>
<h2 class="slide-h2">Effort versus impact</h2>
<div class="gold-rule"></div>
<div class="matrix-wrap">
  <div class="matrix-y">Impact &rarr;</div>
  <div>
    <div class="matrix">
      <div class="matrix-cell priority"><div class="matrix-cell-label">High impact &middot; Low effort</div><div class="matrix-cell-items">Web copy proofing &middot; Shared prompt library &middot; Events filter</div></div>
      <div class="matrix-cell"><div class="matrix-cell-label">High impact &middot; High effort</div><div class="matrix-cell-items">Institution-wide assistant &middot; Skills framework</div></div>
      <div class="matrix-cell"><div class="matrix-cell-label">Low impact &middot; Low effort</div><div class="matrix-cell-items">Meeting summaries &middot; Template tidying</div></div>
      <div class="matrix-cell"><div class="matrix-cell-label">Low impact &middot; High effort</div><div class="matrix-cell-items">Bespoke internal tooling with narrow use</div></div>
    </div>
    <div class="matrix-x">Effort &rarr;</div>
  </div>
</div>
```

### Block 27 — Image / media  ·  class: **default**
`<section class="slide" id="[semantic-id]">` — no modifier.
```html
<span class="slide-label">Section 06 &mdash; Campus</span>
<h2 class="slide-h2">Digital Life Building</h2>
<div class="gold-rule"></div>
<figure class="media-figure">
  <img class="media-img" src="https://www.tees.ac.uk/images/commonimages/campus/digital_life_night.jpg" alt="The Digital Life Building on the Teesside University campus, illuminated at night" loading="lazy">
  <figcaption class="media-caption">The Digital Life Building &mdash; home to digital and computing teaching on campus.</figcaption>
  <span class="media-credit">Image hosted on the University CDN. Requires a network connection; offline decks will show a gap.</span>
</figure>
```

### Block 28 — Big statement  ·  class: **statement-slide**
`<section class="slide statement-slide" id="[semantic-id]">`
```html
<span class="slide-label">Section 06 &mdash; Direction</span>
<div class="statement">The gap is not <em>capability</em>. It is <em>permission</em>.</div>
<p class="statement-sub">Staff are already doing the work. Our job is to make the supported route the easy one.</p>
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
