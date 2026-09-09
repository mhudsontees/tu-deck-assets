# SAMPLE CONTENT — bracket-format test payload for tu-deck-template.md
# Version: 1.5  |  Updated: September 2026
# Paste the master template first, then this whole block beneath it, then send the build instruction.
# Every [BRACKET: value] maps to that block's "Content fields" table in the template.
#
# NOTE: slides 01–12 below (up to and including "Summer Ai Lessons") are Matt's REAL content
# for the AI Working Group Meeting 2 deck. Everything from the Section Cover "The Landscape"
# onward is unedited placeholder/reference content, carried over from the master sample file —
# replace it with real content, or delete it, before this becomes the final deck.

VARIABLES:
  DECK_TITLE:     Prompt Harder - AI Working Group Meeting #2
  DECK_SUBTITLE:  Teesside University — Student Recruitment & Marketing · 2026
  DECK_EYEBROW:   SRM AI Working Group
  AUTHOR_NAME:    Matt Hudson
  DECK_VERSION:   v1 · Sept 2026

-------------------------------------------------
[SLIDE: 01]
[TYPE: TITLE]

[ABOVE TITLE: SRM AI Working Group]
[TITLE: Prompt Harder]
[PARAGRAPH: Teesside University — Student Recruitment & Marketing · 2026]

-------------------------------------------------
[SLIDE: 02]
[TYPE: AGENDA]

[ABOVE TITLE: Agenda]
[TITLE: What we'll cover]

[ITEM NUMBER: 01][ITEM TITLE: Snakes & Ladders][ITEM TIME: 5 min]
[ITEM NUMBER: 02][ITEM TITLE: Headlines][ITEM TIME: 5 min]
[ITEM NUMBER: 03][ITEM TITLE: Game Zero][ITEM TIME: 5 min]
[ITEM NUMBER: 04][ITEM TITLE: Current flex][ITEM TIME: 5 min]
[ITEM NUMBER: 05][ITEM TITLE: Next steps][ITEM TIME: 1 min]


-------------------------------------------------
[SLIDE: ADV-1]
[TYPE: CUSTOM HTML]
// Advanced block — embeds raw HTML/CSS/JS you supply, inserted exactly as written.
// Not one of the 27 tested blocks. Not for general use — only reach for this if nothing
// in the block library can do what you need. Custom class names MUST use a unique prefix
// (e.g. cx-yourtopic) and must never reuse a class already in tu-styles.css or target
// .slide / .slide-content / #deck / body directly — doing so can break the rest of the deck.
// EDIT AND COPY THIS FILE IN A PLAIN TEXT EDITOR, not a markdown-rendering app — those turn
// the fence below into a pretty "Code" card, and copying from that card usually drops the
// [CODE BLOCK: / ``` / ``` / ] wrapper silently. Select all, don't copy from inside the card.

[ABOVE TITLE: Section 01 - Snakes & Ladders]
[TITLE: Ai Adoptation Ladder]
[PARAGRAPH: Approximate levels of Ai adoptation]

[CODE BLOCK:
```
<style>
  /* ============================================================
     BLOCK 21 — AI ADOPTION LADDER (independent block)
     Prefix: .adoption-*  — never .slide-*
     No images. Uses existing tokens only — no new colours.
     Desktop: 5-step staircase (CSS grid offset).
     Mobile (≤768px): collapses to a single-column stack.
     ============================================================ */
  .adoption-ladder { display: flex; align-items: stretch; gap: 14px; max-width: 900px; margin-top: 8px; }

  .adoption-axis {
    flex: 0 0 auto; width: 28px; position: relative;
    display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 2px 0;
  }
  .adoption-axis::before {
    content: ''; position: absolute; top: 0; bottom: 0; left: 50%; width: 2px;
    background: linear-gradient(to top, rgb(var(--gold-rgb) / .12), var(--gold));
    transform: translateX(-50%);
  }
  .adoption-axis-arrow { position: relative; z-index: 1; color: var(--gold-lt); font-size: 13px; line-height: 1; background: var(--bg); padding-bottom: 4px; }
  .adoption-axis-label {
    position: relative; z-index: 1; writing-mode: vertical-rl; transform: rotate(180deg);
    font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
    color: var(--gold-lt); background: var(--bg); padding: 6px 0;
  }

  .adoption-rungs { flex: 1 1 auto; display: grid; grid-template-columns: repeat(10,1fr); gap: 10px; }
  .adoption-rung {
    grid-column: 1 / span 6; display: flex; align-items: flex-start; gap: 14px;
    background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 14px 18px;
  }
  .adoption-rung.adoption-tier-2 { grid-column: 2 / span 6; background: rgb(var(--gold-rgb) / .05); border-color: rgb(var(--gold-rgb) / .18); }
  .adoption-rung.adoption-tier-3 { grid-column: 3 / span 6; background: rgb(var(--gold-rgb) / .07); border-color: rgb(var(--gold-rgb) / .28); }
  .adoption-rung.adoption-tier-4 { grid-column: 4 / span 6; background: rgb(var(--gold-rgb) / .09); border-color: rgb(var(--gold-rgb) / .40); }
  .adoption-rung.adoption-tier-5 { grid-column: 5 / span 6; background: rgb(var(--gold-rgb) / .12); }

  /* optional flourish — add to ANY rung to spotlight it; leave it off a rung with no CSS edit needed */
  .adoption-emphasis { border-color: var(--gold-lt); }
  .adoption-emphasis .adoption-rung-num { background: var(--gold); color: var(--bg); border-color: var(--gold-lt); }

  .adoption-rung-num {
    flex-shrink: 0; width: 30px; height: 30px; border-radius: 50%;
    background: var(--surface2); border: 2px solid var(--gold); color: var(--gold-lt);
    font-family: var(--font-title); font-weight: var(--weight-heading); font-size: 13px;
    display: flex; align-items: center; justify-content: center;
  }
  .adoption-rung-title { font-family: var(--font-title); font-size: clamp(14px,1.5vw,17px); font-weight: 700; color: #fff; margin-bottom: 3px; line-height: 1.25; }
  .adoption-rung-desc { font-size: clamp(12px,1.3vw,14px); color: var(--muted); line-height: 1.45; }

  .adoption-rung.adoption-current { border-color: var(--gold-lt); box-shadow: 0 0 0 1px rgb(var(--gold-lt-rgb) / .5); }

  @media (max-width: 768px) {
    .adoption-ladder { flex-direction: column; gap: 10px; }
    .adoption-axis { display: none; }
    .adoption-rungs { grid-template-columns: 1fr; gap: 10px; }
    .adoption-rung,
    .adoption-rung.adoption-tier-2,
    .adoption-rung.adoption-tier-3,
    .adoption-rung.adoption-tier-4,
    .adoption-rung.adoption-tier-5 { grid-column: 1 / -1; }
  }
</style>
<div class="adoption-ladder">
    <div class="adoption-axis" aria-hidden="true">
      <span class="adoption-axis-arrow">&#9650;</span>
      <span class="adoption-axis-label">More capability</span>
    </div>
    <div class="adoption-rungs">
      <div class="adoption-rung adoption-tier-5">
        <span class="adoption-rung-num">5</span>
        <div>
          <div class="adoption-rung-title">Autonomous agents</div>
          <div class="adoption-rung-desc">Plans and runs multi-step tasks with minimal supervision, retaining context over time.</div>
        </div>
      </div>
      <div class="adoption-rung adoption-tier-4">
        <span class="adoption-rung-num">4</span>
        <div>
          <div class="adoption-rung-title">Connected workflows</div>
          <div class="adoption-rung-desc">AI plugged into real systems and data — multi-step pipelines, minimal manual handling.</div>
        </div>
      </div>
      <div class="adoption-rung adoption-tier-3">
        <span class="adoption-rung-num">3</span>
        <div>
          <div class="adoption-rung-title">Structured &amp; repeatable</div>
          <div class="adoption-rung-desc">Saved prompts, templates and reference files — consistent quality, less reinventing the wheel.</div>
        </div>
      </div>
      <div class="adoption-rung adoption-tier-2">
        <span class="adoption-rung-num">2</span>
        <div>
          <div class="adoption-rung-title">Ad-hoc prompting</div>
          <div class="adoption-rung-desc">One-off prompts for isolated tasks — no reuse, output copied and pasted by hand.</div>
        </div>
      </div>
      <div class="adoption-rung">
        <span class="adoption-rung-num">1</span>
        <div>
          <div class="adoption-rung-title">Not using AI yet</div>
          <div class="adoption-rung-desc">Research, writing and admin done fully manually, without AI assistance.</div>
        </div>
      </div>
    </div>
  </div>
```
]
-------------------------------------------------
-------------------------------------------------
[SLIDE: ADV-1]
[TYPE: CUSTOM HTML]
// Advanced block — embeds raw HTML/CSS/JS you supply, inserted exactly as written.
// Not one of the 27 tested blocks. Not for general use — only reach for this if nothing
// in the block library can do what you need. Custom class names MUST use a unique prefix
// (e.g. cx-yourtopic) and must never reuse a class already in tu-styles.css or target
// .slide / .slide-content / #deck / body directly — doing so can break the rest of the deck.
// EDIT AND COPY THIS FILE IN A PLAIN TEXT EDITOR, not a markdown-rendering app — those turn
// the fence below into a pretty "Code" card, and copying from that card usually drops the
// [CODE BLOCK: / ``` / ``` / ] wrapper silently. Select all, don't copy from inside the card.

[ABOVE TITLE: Section 01 - Snakes & Ladders]
[TITLE: Snakes & Ladders]
[PARAGRAPH: Breakthroughs and errors in ai adoptation]

[CODE BLOCK:
```
<style>
  /* ============================================================
     BLOCK 22 — LADDER / SNAKE STORY MOMENT
     Prefix: .adoption-*  — extends the same family as the ladder diagram
     Inline SVG only — tokens drive colour, no external file references.
     ============================================================ */
  .adoption-story { display: flex; gap: 48px; margin-top: 12px; }
  .adoption-moment { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
  .adoption-moment-icon { width: 76px; height: auto; }
  .adoption-moment-tag { font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
  .adoption-moment.is-ladder .adoption-moment-tag { color: var(--pos); }
  .adoption-moment.is-snake  .adoption-moment-tag { color: var(--neg); }
  .adoption-moment-label { font-family: var(--font-title); font-size: clamp(15px,1.6vw,19px); font-weight: 700; color: #fff; }

  @media (max-width: 768px) {
    .adoption-story { gap: 28px; }
    .adoption-moment-icon { width: 60px; }
  }
</style>
<div class="adoption-story">
    <div class="adoption-moment is-ladder">
      <svg class="adoption-moment-icon" viewBox="0 0 60 100" fill="none">
        <line x1="14" y1="6" x2="14" y2="94" stroke="var(--pos)" stroke-width="3" stroke-linecap="round"/>
        <line x1="46" y1="6" x2="46" y2="94" stroke="var(--pos)" stroke-width="3" stroke-linecap="round"/>
        <line x1="14" y1="22" x2="46" y2="22" stroke="var(--pos)" stroke-width="3" stroke-linecap="round"/>
        <line x1="14" y1="42" x2="46" y2="42" stroke="var(--pos)" stroke-width="3" stroke-linecap="round"/>
        <line x1="14" y1="62" x2="46" y2="62" stroke="var(--pos)" stroke-width="3" stroke-linecap="round"/>
        <line x1="14" y1="82" x2="46" y2="82" stroke="var(--pos)" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <span class="adoption-moment-tag">Ladder</span>
      <span class="adoption-moment-label">Switched to Opus</span>
    </div>
    <div class="adoption-moment is-snake">
      <svg class="adoption-moment-icon" viewBox="0 0 100 60" fill="none">
        <path d="M6,30 C20,10 32,50 46,30 C60,10 72,50 84,30" stroke="var(--neg)" stroke-width="3" stroke-linecap="round"/>
        <polygon points="84,30 92,25 92,35" fill="var(--neg)"/>
      </svg>
      <span class="adoption-moment-tag">Snake</span>
      <span class="adoption-moment-label">Stuck on it too long</span>
    </div>
  </div>
```
]
-------------------------------------------------
[SLIDE: 13]
[TYPE: LESSON + TAKEAWAY]

[ABOVE TITLE: Section 01 - Snakes & Ladders]
[LESSON NUMBER: 01]
[TITLE: Watch your model 1/2]
[PARAGRAPH: Higher models and higher 'effort' give superior reasoning and outputs but will burn your token limits.  Learn the models main use/recommended effort level, then you can switch intelligently.  Note: Claude/Chat GPT models can be used within paid Co-Pilot licenses]
[TAKEAWAY: Switch-a-roo for maximum token efficeny.]

-------------------------------------------------
[SLIDE: 12]
[TYPE: PROJECT CARDS]

[ABOVE TITLE: Section 01 - Snakes & Ladders]
[TITLE: Watch your model 2/2]

[CARD STAGE: SONNET 5][CARD TITLE: Everyday workhorse][CARD BODY: Cost-efficient default for day-to-day coding, writing, analysis and multi-step agentic work.  Default Level: 'Medium'.  Use 'High' for deeper analysis.]
[CARD STAGE: OPUS 5][CARD TITLE: Deep reasoning/analysis][CARD BODY: High stakes complex problems.  Default Level: 'High'.  Use 'xHigh/Max' for the hardest, most consquential task]
[CARD STAGE: FABLE 5.1][CARD TITLE: Frontier model][CARD BODY: Model reserved for long horizon complex tasks where Opus struggles.  Requires credits to use.  Default Level: 'Medium'.]
-------------------------------------------------
[SLIDE: 13]
[TYPE: LESSON + TAKEAWAY]

[ABOVE TITLE: Section 01 - Snakes & Ladders]
[LESSON NUMBER: 02]
[TITLE: Future focus]
[PARAGRAPH: An authoriative handoff is critical to finish a chat, but it pays to prepare your next session.  Optimise the next chat adding the handoff/all assets to the project files and preparing a referencing focus new chat intro.  This will eliminate needless back and forth in your new session.]
[TAKEAWAY: Post handoff, prep your first chat message for referenced focus.]
-------------------------------------------------
[SLIDE: 13]
[TYPE: LESSON + TAKEAWAY]

[ABOVE TITLE: Section 01 - Snakes & Ladders]
[LESSON NUMBER: 03]
[TITLE: The collab Ai toolkit]
[PARAGRAPH: Beyond handoffs there is value in sharing account/project instructions, 'mastermind/library' files and document compilers.  Having an updated single source of truth for these toolkit items can supercharge ai sessions.]
[TAKEAWAY: Ai is only as good it's instructions.  A team is only as efficient as it's prep.]

-------------------------------------------------
[SLIDE: 20]
[TYPE: ACTION POINTS]

[ABOVE TITLE: Section 01 - Snakes & Ladders]
[TITLE: Be C.L.E.A.R]

[ACTION NUMBER: C][ACTION: Context: why you need it, who it's for][OWNER: ]
[ACTION NUMBER: L][ACTION: Length & detail: enough to work with, not just a one-liner][OWNER: ]
[ACTION NUMBER: E][ACTION: Examples: show it what "good" looks like, don't just describe it][OWNER: ]
[ACTION NUMBER: A][ACTION: Ask precisely: concrete numbers/names/format, plus what to avoid][OWNER: ]
[ACTION NUMBER: R][ACTION: Role: tell it who to be][OWNER: ]
-------------------------------------------------
[SLIDE: 12]
[TYPE: PROJECT CARDS]

[ABOVE TITLE: Section 01 - Snakes & Ladders]
[TITLE: Summer Ai Lessons]

[CARD STAGE: Watch your model][CARD TITLE: Switch-a-roo][CARD BODY: High end models often superior reasonings and outputs but will burn your token limits.  Learn to ]
[CARD STAGE: Power focus][CARD TITLE: Focus handoff][CARD BODY: Post handoff, prep your first chat message for referened focus.]
[CARD STAGE: Project bible][CARD TITLE: Collab toolkit][CARD BODY: Shared account/project instructions, compilers and masterminds expand Ai's team impact.]

-------------------------------------------------
[SLIDE: 03]
[TYPE: SECTION COVER]

[ABOVE TITLE: Section 01]
[TITLE: The Landscape]
[PARAGRAPH: Where the sector has moved, and what that means for us.]
[SECTION NUMBER: 01]

-------------------------------------------------
[SLIDE: 04]
[TYPE: DONUT CHART]

[ABOVE TITLE: Section 01 — The Landscape]
[TITLE: Staff AI usage]
[PERCENT: 68]
[PERCENT LABEL: weekly users]
[LEGEND ON: Use an AI tool at least weekly]
[LEGEND OFF: Occasional or non-users]
[SOURCE: Illustrative figures — replace with your own source.]

-------------------------------------------------
[SLIDE: 05]
[TYPE: STAT CARDS]

[ABOVE TITLE: Section 01 — The Landscape]
[TITLE: Where we stand]

[STAT NUMBER: 92%][STAT LABEL: of UK undergraduates use generative AI][STAT SOURCE: HEPI, 2025]
[STAT NUMBER: 3][STAT LABEL: competitor universities with institution-wide AI tools][STAT SOURCE: Oxford, Liverpool, South Wales]
[STAT NUMBER: 1][STAT LABEL: approved tool for University data][STAT SOURCE: Copilot, basic licence]
[STAT NUMBER: 2,000+][STAT LABEL: staff covered by any policy decision][STAT SOURCE: ]

-------------------------------------------------
[SLIDE: 06]
[TYPE: BODY + STAT CARDS]

[ABOVE TITLE: Section 01 — The Landscape]
[TITLE: The gap in context]

[PARAGRAPH: Adoption among students has outpaced institutional policy by a wide margin. That gap is not unique to us — it is a sector-wide pattern that policy has not yet resolved.]
[PARAGRAPH: The practical question is not whether staff use these tools, but whether they do so with support and guardrails.]

[STAT NUMBER: 4×][STAT LABEL: growth in staff AI queries year on year]
[STAT NUMBER: 18mo][STAT LABEL: typical lag between tool release and approval]

-------------------------------------------------
[SLIDE: 07]
[TYPE: TIMELINE]

[ABOVE TITLE: Section 02 — Capability]
[TITLE: How fast this is moving]

[YEAR: 2023][STEP TITLE: Generative AI goes mainstream][STEP BODY: Public tools reach classrooms and workplaces faster than policy can respond.]
[YEAR: 2024][STEP TITLE: Agents and automation mature][STEP BODY: Workflow tools move from novelty to genuine time savings.]
[YEAR: 2025][STEP TITLE: Institution-wide adoption][STEP BODY: Competitor universities deploy AI tools and qualifications at scale.]
[YEAR: 2026][STEP TITLE: North East AI Growth Zone][STEP BODY: Regional designation raises the stakes for local institutions.]

-------------------------------------------------
[SLIDE: 08]
[TYPE: LESSON + MISTAKE]

[ABOVE TITLE: Section 02 — Capability]
[LESSON NUMBER: 01]
[TITLE: Start with the workflow]
[PARAGRAPH: The tools that stick are the ones that remove a step someone already resents. Begin with a task the team already does every week, not with the technology.]
[MISTAKE: Choosing a tool first and then hunting for a problem it might solve. This produces impressive demos and very little adoption.]

-------------------------------------------------
[SLIDE: 09]
[TYPE: NEWS CARDS]

[ABOVE TITLE: Section 02 — Capability]
[TITLE: What others are doing]

[CARD SOURCE: Oxford][CARD TITLE: Institution-wide assistant rollout][CARD BODY: Deployed to all staff and students with a supporting training programme.][CARD DATE: Reported 2025]
[CARD LINK: https://www.ox.ac.uk]
[CARD SOURCE: Liverpool][CARD TITLE: Credit-bearing AI qualification][CARD BODY: Embedded AI literacy into the curriculum rather than treating it as an add-on.][CARD DATE: Reported 2025]
[CARD LINK: https://www.liverpool.ac.uk]
[CARD SOURCE: South Wales][CARD TITLE: Staff AI skills framework][CARD BODY: Defined competency levels so training can be targeted by role.][CARD DATE: Reported 2025]
[CARD LINK: https://www.southwales.ac.uk]

-------------------------------------------------
[SLIDE: 10]
[TYPE: ROLE CARDS]

[ABOVE TITLE: Section 03 — People]
[TITLE: Who does what]

[CARD ROLE: Chair][CARD NAME: University AI Working Group][CARD REMIT: Sets direction across the institution and owns escalation to director level.][CARD DEPT: Cross-department]
[CARD ROLE: Facilitators][CARD NAME: SRM representation][CARD REMIT: Run departmental sessions, gather use cases and feed them upward.][CARD DEPT: Marketing / SRM]
[CARD ROLE: Contributors][CARD NAME: Professional services staff][CARD REMIT: Bring real workflows and test proposals against day-to-day practice.][CARD DEPT: All grades]

-------------------------------------------------
[SLIDE: 11]
[TYPE: STANDARD BULLETS]

[ABOVE TITLE: Section 03 — People]
[TITLE: Principles we agreed]

[BULLET: Approved tools first — University data stays within policy.]
[BULLET: Start with workflows that already cause friction.]
[BULLET: Document use cases properly so investment requests have evidence.]
[BULLET: Share what works across departments rather than rebuilding it.]
[BULLET: Keep a human check on anything that reaches a student or applicant.]

-------------------------------------------------
[SLIDE: 12]
[TYPE: PROJECT CARDS]

[ABOVE TITLE: Section 04 — Projects]
[TITLE: Live and proposed work]

[CARD STAGE: Alpha][CARD TITLE: Course search chatbot][CARD BODY: Sandboxed prototype answering course queries.]
[CARD STAGE: Beta][CARD TITLE: Improved course search][CARD BODY: Rebuilt search with better matching and fallbacks.]
[CARD STAGE: Beta][CARD TITLE: Events filter][CARD BODY: Restructured data and rebuilt filtering.]
[CARD STAGE: Proposed][CARD TITLE: Web copy proofing][CARD BODY: Automated first-pass check before human review.]

-------------------------------------------------
[SLIDE: 13]
[TYPE: LESSON + TAKEAWAY]

[ABOVE TITLE: Section 04 — Projects]
[LESSON NUMBER: 02]
[TITLE: Prove it small]
[PARAGRAPH: Every project above began as a contained test with a defined success measure. None required new budget to reach a demonstrable stage — which is precisely what makes the case for the next stage credible.]
[TAKEAWAY: A working prototype is a stronger business case than a proposal document.]

-------------------------------------------------
[SLIDE: 14]
[TYPE: DISCUSSION CARDS]

[ABOVE TITLE: Section 05 — Discussion]
[TITLE: Questions for the group]

[Q NUMBER: Q1][QUESTION: Which weekly task would you most like to hand over?][HINT: Think about repetition, not complexity.]
[Q NUMBER: Q2][QUESTION: Where does the current toolset genuinely block you?][HINT: Specific examples help build the case.]
[Q NUMBER: Q3][QUESTION: What would make you confident using an AI tool at work?][HINT: Training, guardrails, or clearer policy?]
[Q NUMBER: Q4][QUESTION: What should we bring to the next session?][HINT: One concrete item each.]

-------------------------------------------------
[SLIDE: 15]
[TYPE: OPPORTUNITIES & BLOCKERS]

[ABOVE TITLE: Section 05 — Position]
[TITLE: Opportunities and blockers]

[OPPORTUNITY: Upgrade Copilot licences for defined roles]
[OPPORTUNITY: Build documented use cases for investment requests]
[OPPORTUNITY: Adopt low-risk complementary tools]
[OPPORTUNITY: Automate departmental workflows with Power Automate]

[BLOCKER: ICT cannot assess alternative tools at present]
[BLOCKER: Director-level sign-off needed for new tooling]
[BLOCKER: Personal data processing requires extra scrutiny]
[BLOCKER: Budget cycles slow adoption regardless of merit]

-------------------------------------------------
[SLIDE: 16]
[TYPE: TWO COLUMN]

[ABOVE TITLE: Section 05 — Position]
[TITLE: Now versus next year]

[COLUMN LEFT HEADING: Where we are]
[LEFT BULLET: Basic Copilot licences only]
[LEFT BULLET: No version control across the team]
[LEFT BULLET: Use cases held informally]
[LEFT BULLET: Training arranged case by case]

[COLUMN RIGHT HEADING: Where we want to be]
[RIGHT BULLET: Licences matched to actual need]
[RIGHT BULLET: GitHub in place with team conventions]
[RIGHT BULLET: A documented, reusable use-case library]
[RIGHT BULLET: A defined route to funded training]

-------------------------------------------------
[SLIDE: 17]
[TYPE: FLOWCHART]

[ABOVE TITLE: Section 04 — Projects]
[TITLE: Web copy proposed automation]

[STEP: EMS submission received with accessible linked document][STEP NOTE: ]
[STEP: Document passed to Power Automate][STEP NOTE: Trigger on submission]
[STEP: Trained AI agent runs spelling, grammar and style check {highlight}][STEP NOTE: Copilot agent — within policy]
[STEP: Corrected version returned with tracked changes listed][STEP NOTE: Human reviews output]

[MODIFIER: ATTRIBUTION on SLIDE 17]
[CREDIT TITLE: Web Copy Workflow Automation]
[CREDIT META: Matt Hudson | SRM AI Working Group · 2026]

-------------------------------------------------
[SLIDE: 18]
[TYPE: FEATURE CARD]

[ABOVE TITLE: Section 06 — Development]
[TITLE: Upskilling route]
[ICON: lightbulb]
[FEATURE TITLE: Funded AI training]
[PARAGRAPH: A monthly external programme, University funded, feeding material directly back into this group. The first example of sanctioned, budgeted AI training — and a useful precedent for future proposals.]
[POINT: Material brought back to each working group session]
[POINT: Directly transferable to departmental projects]

-------------------------------------------------
[SLIDE: 19]
[TYPE: END / CLOSING]

[ABOVE TITLE: Thank you]
[TITLE: Questions?]
[PARAGRAPH: Next session dates and materials will follow in the Teams channel.]
[CONTACT LINE: SRM AI Working Group]
[CONTACT LINE: Student Recruitment & Marketing]
[CONTACT LINE: Teesside University]

-------------------------------------------------
[SLIDE: 20]
[TYPE: ACTION POINTS]

[ABOVE TITLE: Section 05 — Discussion]
[TITLE: Agreed actions]

[ACTION NUMBER: 1][ACTION: Collect one candidate workflow from each attendee][OWNER: All · 2 weeks]
[ACTION NUMBER: 2][ACTION: Draft the licence upgrade use case for director review][OWNER: Facilitators]
[ACTION NUMBER: 3][ACTION: Demo the web copy automation prototype][OWNER: Next session]
[ACTION NUMBER: 4][ACTION: Share the working group notes in the Teams channel][OWNER: This week]

-------------------------------------------------
[SLIDE: 21]
[TYPE: PULL QUOTE]

[ABOVE TITLE: Section 06 — Voices]
[QUOTE: The tools were never the hard part. Agreeing what good looks like was.]
[QUOTE NAME: Working group participant]
[QUOTE ROLE: Professional services · Teesside University]

-------------------------------------------------
[SLIDE: 22]
[TYPE: COMPARISON TABLE]

[ABOVE TITLE: Section 03 — Tooling]
[TITLE: Tooling comparison]

[COLUMNS: Criterion | Copilot (basic) | Copilot (upgraded) | Unapproved tools]
[ROW: University data | Approved {yes} | Approved {yes} | Not permitted {no}]
[ROW: Cost | Included | Per-seat uplift | Varies]
[ROW: Agent building | Limited {no} | Available {yes} | Varies]
[ROW: Support route | ICT | ICT | None {no}]
[ROW: Sign-off needed | None | Director level | Not available {no}]
[SOURCE: Illustrative — confirm current licensing before circulating.]

-------------------------------------------------
[SLIDE: 23]
[TYPE: BAR CHART]

[ABOVE TITLE: Section 01 — The Landscape]
[TITLE: Weekly AI use by team]

[BAR: Digital, 81%]
[BAR: Content, 64%]
[BAR: Recruitment, 54%]
[BAR: Events, 36%]
[BAR: Admissions, 34%]

-------------------------------------------------
[SLIDE: 24]
[TYPE: ROADMAP]

[ABOVE TITLE: Section 06 — Direction]
[TITLE: Roadmap]

[NOW WHEN: This term]
[NOW ITEM: Collect departmental use cases]
[NOW ITEM: Run the web copy prototype]
[NOW ITEM: Establish the working group rhythm]

[NEXT WHEN: Next two terms]
[NEXT ITEM: Submit the licence upgrade case]
[NEXT ITEM: Adopt GitHub with team conventions]
[NEXT ITEM: Publish a shared use-case library]

[LATER WHEN: Beyond 2026]
[LATER ITEM: Departmental workflow automation at scale]
[LATER ITEM: Role-based AI skills framework]
[LATER ITEM: Cross-department shared tooling]

-------------------------------------------------
[SLIDE: 25]
[TYPE: MATRIX]

[ABOVE TITLE: Section 06 — Direction]
[TITLE: Effort versus impact]
[Y AXIS: Impact]
[X AXIS: Effort]

[QUADRANT: top-left {priority}][LABEL: High impact · Low effort][ITEMS: Web copy proofing · Shared prompt library · Events filter]
[QUADRANT: top-right][LABEL: High impact · High effort][ITEMS: Institution-wide assistant · Skills framework]
[QUADRANT: bottom-left][LABEL: Low impact · Low effort][ITEMS: Meeting summaries · Template tidying]
[QUADRANT: bottom-right][LABEL: Low impact · High effort][ITEMS: Bespoke internal tooling with narrow use]

-------------------------------------------------
[SLIDE: 26]
[TYPE: IMAGE]

[ABOVE TITLE: Section 06 — Campus]
[TITLE: Digital Life Building]
[IMAGE URL: https://www.tees.ac.uk/images/commonimages/campus/digital_life_night.jpg]
[ALT TEXT: The Digital Life Building on the Teesside University campus, illuminated at night]
[CAPTION: The Digital Life Building — home to digital and computing teaching on campus.]
[CREDIT: Image hosted on the University CDN. Requires a network connection; offline decks will show a gap.]

-------------------------------------------------
[SLIDE: 27]
[TYPE: BIG STATEMENT]

[ABOVE TITLE: Section 06 — Direction]
[STATEMENT: The gap is not {em}capability{/em}. It is {em}permission{/em}.]
[PARAGRAPH: Staff are already doing the work. Our job is to make the supported route the easy one.]

-------------------------------------------------
[SLIDE: ADV-1]
[TYPE: CUSTOM HTML]
// Advanced block — embeds raw HTML/CSS/JS you supply, inserted exactly as written.
// Not one of the 27 tested blocks. Not for general use — only reach for this if nothing
// in the block library can do what you need. Custom class names MUST use a unique prefix
// (e.g. cx-yourtopic) and must never reuse a class already in tu-styles.css or target
// .slide / .slide-content / #deck / body directly — doing so can break the rest of the deck.
// EDIT AND COPY THIS FILE IN A PLAIN TEXT EDITOR, not a markdown-rendering app — those turn
// the fence below into a pretty "Code" card, and copying from that card usually drops the
// [CODE BLOCK: / ``` / ``` / ] wrapper silently. Select all, don't copy from inside the card.

[ABOVE TITLE: Section 06 — Direction]
[TITLE: Custom visual example]
[PARAGRAPH: A hand-built, self-contained progress indicator — proving the code below passes through unchanged.]

[CODE BLOCK:
```
<div class="cx-example">
  <style>
    .cx-example { padding: 20px 0; }
    .cx-example .cx-track { width: 100%; height: 10px; background: var(--surface2); border-radius: 6px; overflow: hidden; }
    .cx-example .cx-fill { height: 100%; width: 0%; background: var(--gold); border-radius: 6px; transition: width 1.4s ease; }
    .cx-example .cx-caption { margin-top: 10px; font-size: 13px; color: var(--muted); }
  </style>
  <div class="cx-track"><div class="cx-fill" id="cx-example-fill"></div></div>
  <div class="cx-caption">72% — fills on load, proving custom JS runs</div>
  <script>
    (function(){
      var el = document.getElementById('cx-example-fill');
      setTimeout(function(){ if (el) el.style.width = '72%'; }, 150);
    })();
  </script>
</div>
```
]
