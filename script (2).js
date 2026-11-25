/* =====================================================================
   CAMPAIGN WEBSITE SCRIPT (vanilla JavaScript, ES6+)

   HOW TO EDIT CONTENT
   -------------------
   Candidate name and position are read from the HTML's data-bind text.
   Other campaign content lives in the `campaignData` object below.

   Sections of this file:
     1. Campaign data (EDIT ME)
     2. Small helper functions
     3. Page content renderers
     4. Navigation (hamburger, scroll effects, active link)
     5. Countdown timer
     6. Manifesto tabs
     7. Manifesto reader modal + copy
     8. Manifesto download (Blob)
     9. Events filter + RSVP
    10. Get-involved form
    11. Start-up
   ===================================================================== */


/* =====================================================================
   1. CAMPAIGN DATA  (EDIT ME)
   NOTE: The identity fields below are fallbacks when their HTML bindings
   are blank. Replace the remaining placeholder content before going live.
   ===================================================================== */
const campaignData = {

  /* ---- Core details ---- */
  candidateName: "Candidate Name",             // e.g. "Chief Opakunle Joseph"
  officeShort: "For President",                 // Shown under the logo
  officeFull: "Candidate for President, Progressive Cooperative CICS, LAUTECH Ogbomoso",
  slogan: "Together For A Greater Tomorrow",
  societyName: "Progressive Cooperative CICS, LAUTECH Ogbomoso",      // Used inside the manifesto text
  /* Election date: ISO format with timezone. +01:00 = Nigerian time (WAT).
     Format: "YYYY-MM-DDTHH:MM:SS+01:00" */
  electionDate: "2026-12-03T00:00:00+01:00",

  /* ---- Biography ---- */
  biography: {
    paragraphs: [
      "Candidate Name has been a committed member of the cooperative for over a decade. He joined as an ordinary member saving small amounts monthly, and he understands first-hand how a fair loan or a well-run society can change a family's story.",
      "Over the years he has served on committees, mediated member disputes and helped recover funds that were stalled for years. He is known in the community for listening first, speaking plainly and keeping his promises.",
      "Rooted in this community, he is not seeking office for status. He is seeking it to make the cooperative work harder for every single member."
    ],
    values: ["Trust", "Reliabilty", "Responsiveness", "Fairness", "Accountability"],

    /* 3-4 measurable milestones: `value` is the big number, `label` explains it. */
    achievements: [
      { value: "19 Years",   label: "Of continuous membership and volunteer service" },
      { value: "200+",       label: "New members recruited through community outreach" },
      { value: "100%",       label: "Commitment to the activities of the society" },
      { value: "Member Welfare", label: "Member welfare initiatives launched and supported" }
    ]
  },

  /* ---- Manifesto pillars (shown as tabs) ----
     Add or remove objects to change the number of tabs (4-5 works best). */
  pillars: [
    {
      id: "welfare",
      title: "Member Welfare & Loans",
      summary: "Credit that is fast, fair and affordable, so members can build businesses and handle emergencies without desperation.",
      points: [
        "Cut loan processing time to a maximum of 7 working days.",
        "Introduce a low-interest emergency loan window for medical and school-fees needs.",
        "Publish clear loan criteria so every member knows exactly how to qualify.",
        "Create a hardship support fund for members facing unexpected crises."
      ]
    },
    {
      id: "transparency",
      title: "Transparency & Governance",
      summary: "Your money, your society, your right to know. Open books, open meetings, open doors.",
      points: [
        "Present audited accounts to all members at least twice a year.",
        "Publish a plain-language quarterly financial summary on notice boards and the group chat.",
        "Open all general meetings to proposals submitted in advance by any member.",
        "Set up an independent complaints and suggestions channel with a 14-day response guarantee."
      ]
    },
    {
      id: "dividends",
      title: "Savings Growth & Dividends",
      summary: "Make every naira saved work harder through disciplined investment and fair returns.",
      points: [
        "Review the interest rate on savings annually and report the outcome to members.",
        "Aim to pay a competitive annual dividend, announced early so members can plan.",
        "Introduce flexible target-savings plans for school fees, rent and festive seasons.",
        "Establish an investment committee with clear risk limits and member oversight."
      ]
    },
    {
      id: "enterprise",
      title: "Cooperative Enterprise & Investment",
      summary: "Move beyond saving and lending by building income-generating ventures owned by members.",
      points: [
        "Explore a cooperative consumer store to buy staple goods in bulk at lower prices.",
        "Pilot a members' business directory and bulk-purchase scheme for traders and artisans.",
        "Seek partnerships with banks, NGOs and government agencies for grants and low-cost capital.",
        "Develop a land or housing scheme with transparent, member-approved terms."
      ]
    },
    {
      id: "digital",
      title: "Member Education & Digital Services",
      summary: "Modern tools and real knowledge, so every member can participate with confidence.",
      points: [
        "Launch a simple member portal or mobile-friendly page to check balances and loan status.",
        "Hold free quarterly workshops on budgeting, record-keeping and business planning.",
        "Introduce a mentorship programme pairing young members with experienced ones.",
        "Run a clear onboarding session for every new member within their first month."
      ]
    }
  ],

  /* ---- Full manifesto text ----
     Lines starting with "## " become headings in the reader modal.
     Lines starting with "- " become bullet points.
     Blank lines separate paragraphs.
     The same text is used for the "Copy" button and the .txt download. */
  manifestoFullText: `

Fellow members, a cooperative is not a distant bank; it is our shared financial table. Most of the headaches members face do not come from bad intentions—they come from slow paperwork, unclear rules, last-minute surprises, and poor communication.

I am running for President with a practical, achievable plan focused on what we can realistically deliver within our tenure: faster service, plain-English accountability, smarter savings options, and steady improvements that make everyday cooperative life easier.

1. Welfare & Practical Support
Fixing the slow approvals and sudden financial shocks that stress members out.

Predictable Loan Timelines: Introduce a clear internal workflow with defined review stages so standard loans are processed promptly, paired with a simple tracking update so applicants are not left guessing where their file sits.

Defined Emergency & School-Fees Facility: Establish a dedicated, capped emergency/school-fees loan tier with straightforward documentation and clear repayment rules, helping members handle urgent needs without resorting to predatory outside lenders.

Published Eligibility Checklist: Print and share a one-page loan qualification guide (covering savings history, guarantor rules, maximum limits, and repayment terms) so every member knows the exact requirements before applying.

Structured Welfare / Distress Relief: Review and streamline how member welfare/bereavement/hardship support is funded and disbursed within existing bye-laws, ensuring help reaches affected members without bureaucratic delay.

2. Finance, Savings & Sustainable Growth
Helping members plan ahead while protecting the cooperative’s liquidity.

Goal-Based Target Savings: Introduce optional, structured savings buckets (such as school fees, rent, or end-of-year/festive savings) with clear rules on deposits and maturity dates, helping members build discipline without straining monthly cash flow.

Transparent Rate & Dividend Communication: Clearly explain how interest, loan charges, and annual surpluses/dividends are calculated after statutory reserves and expenses—setting realistic expectations rather than promising fixed payouts regardless of performance.

Prudent Liquidity & Risk Guardrails: Maintain strict lending-to-savings balance checks and overdue-loan recovery discipline so funds remain available for active borrowers and withdrawals.

Member Bulk-Buying / Group Negotiation: Before committing funds to a full brick-and-mortar store, test low-risk group bulk purchasing or vendor discounts for high-demand items based on actual member demand surveys.

3. Transparency & Governance
Ending guesswork and closed-door confusion.

Plain-Language Quarterly Snapshots: Alongside formal statutory/audited reports presented at general meetings, publish an easy-to-read quarterly summary (total savings, total loans disbursed, repayment health, major expenses, and key resolutions) on notice boards and official member channels.

Clear Rules & Bye-Law Visibility: Ensure members have easy access to cooperative bye-laws, standing committee decisions, and executive minutes (excluding sensitive personal data) so policies do not feel arbitrary.

Advance Agenda & Member Motion Window: Allow members to submit agenda items or questions ahead of general meetings so pressing concerns get real floor time instead of being rushed at the end.

Tracked Complaint & Inquiry Desk: Create a single, logged channel for member complaints and account inquiries with clear response timelines and escalation steps if an issue stalls.

4. Innovation & Member Empowerment
Using simple, low-cost tools and practical training to cut daily friction.

Digital Account & Loan Status Updates: Roll out practical, low-cost digital statements and status notifications (via email, spreadsheet/portal access, or structured periodic updates) so members can verify balances and loan progress without unnecessary trips to the secretariat.

New-Member Induction & Financial Clinics: Host a concise onboarding guide for new members and practical, peer-led sessions on personal budgeting, loan management, and cooperative rights and responsibilities.

Member Skills & Trade Directory: Compile an opt-in directory of members’ businesses, technical skills, and services within the cooperative community to encourage trusted peer patronage and referrals.

Paperwork & Process Simplification: Audit existing forms and approval steps in the first 60 days to eliminate duplicate signatures, ambiguous wording, and avoidable bottlenecks.

Accountability Pledge
I will not measure this administration by how many big slogans we print, but by how smoothly the cooperative runs for you each quarter. Every quarter, I will give a straightforward report on what was completed, what is in progress, and what hit a roadblock—and why.

Let’s build a cooperative that is steady, fair, and dependable for every member.
`,

  /* ---- Events ----
     type must be "town-hall" or "rally".
     date: ISO string with timezone. Past events are greyed out automatically. */
  events: [
    {
      id: "evt-1", type: "town-hall",
      title: "Members' Town Hall: Loans & Welfare",
      date: "2026-11-28T16:00:00+01:00",
      venue: "Cooperative Secretariat Hall",
      description: "Open Q&A on loan reform and the hardship support fund."
    },
    {
      id: "evt-2", type: "rally",
      title: "Community Rally & Meet-the-Candidate",
      date: "2026-12-02T15:00:00+01:00",
      venue: "Central Market Square",
      description: "Music, refreshments and a chance to meet the campaign team."
    },
    {
      id: "evt-3", type: "town-hall",
      title: "Transparency Forum: Open Books Session",
      date: "2026-12-06T14:00:00+01:00",
      venue: "Community Town Hall",
      description: "A walk-through of how audited accounts will be shared with members."
    },
    {
      id: "evt-4", type: "town-hall",
      title: "Women & Youth Members' Roundtable",
      date: "2026-12-10T17:00:00+01:00",
      venue: "Youth Development Centre",
      description: "Listening session on enterprise support and mentorship."
    },
    {
      id: "evt-5", type: "rally",
      title: "Grand Campaign Rally",
      date: "2026-12-13T15:00:00+01:00",
      venue: "Township Stadium",
      description: "Our biggest gathering yet. Bring family and fellow members."
    },
    {
      id: "evt-6", type: "town-hall",
      title: "Final Town Hall: Your Questions Answered",
      date: "2026-12-16T17:00:00+01:00",
      venue: "Cooperative Secretariat Hall",
      description: "One last chance to question the candidate before voting day."
    }
  ],

  /* ---- Endorsements ---- */
  endorsements: [
    { quote: "He helped me get my loan sorted when nobody else would pick my calls. He treats every member the same.", name: "Member Name", role: "Trader, Market Road" },
    { quote: "What I like most is that he shows you the figures. No hiding, no excuses.", name: "Member Name", role: "Retired Teacher" },
    { quote: "He has the experience and the patience this society needs right now.", name: "Elder Name", role: "Community Elder" }
  ],

};


/* =====================================================================
   2. SMALL HELPER FUNCTIONS
   ===================================================================== */

/** Shorthand for document.querySelector. */
function $(selector, scope = document) {
  return scope.querySelector(selector);
}

/** Shorthand for document.querySelectorAll, returned as a real array. */
function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/** Create an element with optional class and text. Uses textContent (safe from HTML injection). */
function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

/** Pad a number to two digits: 7 -> "07". */
function padTwo(number) {
  return String(number).padStart(2, "0");
}

/** Get initials from a name for the logo badge: "Chief Adewale Johnson" -> "CJ". */
function getInitials(fullName) {
  const words = fullName.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/** Turn "Candidate Name" into "candidate-name" (used for the download file name). */
function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Show a short message in a status element, then clear it after a delay. */
function flashStatus(element, message, duration = 3500) {
  element.textContent = message;
  window.clearTimeout(element._timer);
  element._timer = window.setTimeout(function () {
    element.textContent = "";
  }, duration);
}

/** Format a date like "Sat, 28 Nov 2026". */
function formatLongDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short", day: "numeric", month: "long", year: "numeric"
  }).format(date);
}

/** Format a time like "4:00 PM". */
function formatTime(date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric", minute: "2-digit", hour12: true
  }).format(date).toUpperCase();
}

/** Safe localStorage read (some browsers block storage in private mode). */
function readStorage(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored === null) {
      return fallback;
    }
    return JSON.parse(stored);
  } catch (error) {
    return fallback;
  }
}

/** Safe localStorage write. */
function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    /* Storage unavailable: the UI still works for this visit. */
  }
}


/* =====================================================================
   3. PAGE CONTENT RENDERERS
   ===================================================================== */

/** Read the identity from HTML, then keep every bound display in sync. */
function renderBoundText() {
  ["candidateName", "officeShort", "officeFull", "slogan"].forEach(function (key) {
    const source = $('[data-bind="' + key + '"]');
    const value = source ? source.textContent.trim() : "";
    if (value) {
      campaignData[key] = value;
    }
  });

  $$("[data-bind]").forEach(function (element) {
    const key = element.dataset.bind;
    if (campaignData[key] !== undefined) {
      element.textContent = campaignData[key];
    }
  });

  $("#brandBadge").textContent = getInitials(campaignData.candidateName);
  const candidateImage = $(".photo-frame img");
  if (candidateImage) {
    candidateImage.alt = "Portrait of " + campaignData.candidateName;
  }
  $("#year").textContent = new Date().getFullYear();
  document.title = campaignData.candidateName + " | " + campaignData.officeShort;
}

/** Biography paragraphs, value chips and achievement cards. */
function renderBiography() {
  const bioContainer = $("#bioParagraphs");
  campaignData.biography.paragraphs.forEach(function (paragraph) {
    const personalizedParagraph = paragraph.replace(/\bCandidate Name\b/g, campaignData.candidateName);
    bioContainer.appendChild(createElement("p", "", personalizedParagraph));
  });

  const valuesList = $("#valuesList");
  campaignData.biography.values.forEach(function (value) {
    valuesList.appendChild(createElement("li", "", value));
  });

  const achievementList = $("#achievementList");
  campaignData.biography.achievements.forEach(function (item) {
    const listItem = createElement("li", "achievement");
    listItem.appendChild(createElement("div", "achievement__value", item.value));
    listItem.appendChild(createElement("div", "achievement__label", item.label));
    achievementList.appendChild(listItem);
  });
}

/** Endorsement cards. */
function renderEndorsements() {
  const grid = $("#quoteGrid");
  if (!grid) {
    return;
  }

  campaignData.endorsements.forEach(function (item) {
    const figure = createElement("figure", "quote");
    figure.appendChild(createElement("blockquote", "quote__text", item.quote));

    const caption = createElement("figcaption");
    caption.appendChild(createElement("span", "quote__name", item.name));
    caption.appendChild(createElement("span", "quote__role", item.role));
    figure.appendChild(caption);

    grid.appendChild(figure);
  });
}

/* =====================================================================
   4. NAVIGATION
   ===================================================================== */

/** Open or close the mobile menu and keep ARIA attributes in sync. */
function setMenuOpen(isOpen) {
  const menu = $("#navMenu");
  const toggle = $("#navToggle");

  menu.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

function initNavigation() {
  const menu = $("#navMenu");
  const toggle = $("#navToggle");
  const header = $("#siteHeader");

  // Hamburger click
  toggle.addEventListener("click", function () {
    const isCurrentlyOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isCurrentlyOpen);
  });

  // Close the menu after choosing a link
  $$("a", menu).forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  // Close with Escape (and return focus to the button)
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  // Close when clicking outside the header
  document.addEventListener("click", function (event) {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen && !header.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  // Reset when the window grows to desktop size
  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) {
      setMenuOpen(false);
    }
  });

  // Add a shadow once the page has scrolled
  function updateHeaderShadow() {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  updateHeaderShadow();

  highlightActiveSectionLink();
}

/** Highlight the nav link of the section currently in view. */
function highlightActiveSectionLink() {
  const links = $$(".nav__link");
  const sections = links
    .map(function (link) { return $(link.getAttribute("href")); })
    .filter(function (section) { return section !== null; });

  if (!("IntersectionObserver" in window)) {
    return; // Older browsers simply skip the highlight.
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (link) {
          const isMatch = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("is-active", isMatch);
          if (isMatch) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(function (section) { observer.observe(section); });
}


/* =====================================================================
   5. COUNTDOWN TIMER
   ===================================================================== */
function initCountdown() {
  const targetTime = new Date(campaignData.electionDate).getTime();
  const grid = $("#countdownGrid");
  const doneMessage = $("#countdownDone");
  const electionCallout = $("#electionCallout");

  if (Number.isNaN(targetTime)) {
    // Bad date format in campaignData: fail gracefully.
    grid.hidden = true;
    $("#electionDateText").textContent = "Date to be announced";
    return;
  }

  $("#electionDateText").textContent = formatLongDate(new Date(targetTime));

  function tick() {
    const remaining = targetTime - Date.now();

    if (remaining <= 0) {
      grid.hidden = true;
      doneMessage.hidden = false;
      electionCallout.textContent = "It's Election Day! Go out and vote.";
      window.clearInterval(intervalId);
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    $("#cdDays").textContent = padTwo(days);
    $("#cdHours").textContent = padTwo(hours);
    $("#cdMinutes").textContent = padTwo(minutes);
    $("#cdSeconds").textContent = padTwo(seconds);
  }

  const intervalId = window.setInterval(tick, 1000);
  tick(); // Run once immediately so there is no 1-second blank.
}

function initPhotoSlideshow() {
  const slideshow = $("#campaignSlideshow");
  const slides = Array.from(slideshow.querySelectorAll(".slideshow__slide"));
  const indicators = Array.from(slideshow.querySelectorAll(".slideshow__indicator"));
  let currentIndex = 0;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach(function (slide, slideIndex) {
      slide.hidden = slideIndex !== currentIndex;
    });
    indicators.forEach(function (indicator, slideIndex) {
      indicator.setAttribute("aria-pressed", String(slideIndex === currentIndex));
    });
  }

  $("#photoPrevious", slideshow).addEventListener("click", function () {
    showSlide(currentIndex - 1);
  });
  $("#photoNext", slideshow).addEventListener("click", function () {
    showSlide(currentIndex + 1);
  });
  indicators.forEach(function (indicator, index) {
    indicator.addEventListener("click", function () {
      showSlide(index);
    });
  });
}


/* =====================================================================
   6. MANIFESTO TABS
   ===================================================================== */
function renderManifestoTabs() {
  const tabList = $("#tabList");
  const panelWrap = $("#tabPanels");

  campaignData.pillars.forEach(function (pillar, index) {
    // Tab button
    const tab = createElement("button", "tab");
    tab.type = "button";
    tab.id = "tab-" + pillar.id;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "panel-" + pillar.id);
    tab.appendChild(createElement("span", "tab__num", String(index + 1)));
    tab.appendChild(createElement("span", "", pillar.title));
    tabList.appendChild(tab);

    // Tab panel
    const panel = createElement("div", "tab-panel");
    panel.id = "panel-" + pillar.id;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = 0;
    panel.appendChild(createElement("h3", "tab-panel__title", pillar.title));
    panel.appendChild(createElement("p", "tab-panel__summary", pillar.summary));

    const pointList = createElement("ul", "tab-panel__points");
    pillar.points.forEach(function (point) {
      pointList.appendChild(createElement("li", "", point));
    });
    panel.appendChild(pointList);
    panelWrap.appendChild(panel);
  });

  selectTab(0);
}

/** Show the tab at `index`, hide the others, and update ARIA state. */
function selectTab(index, shouldFocus = false) {
  const tabs = $$("#tabList .tab");
  const panels = $$("#tabPanels .tab-panel");

  tabs.forEach(function (tab, tabIndex) {
    const isSelected = tabIndex === index;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1; // Roving tabindex
    panels[tabIndex].hidden = !isSelected;
  });

  if (shouldFocus) {
    tabs[index].focus();
  }
}

function initManifestoTabs() {
  const tabs = $$("#tabList .tab");

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      selectTab(index);
    });

    // Arrow keys / Home / End move between tabs (standard tab pattern)
    tab.addEventListener("keydown", function (event) {
      let newIndex = null;

      if (event.key === "ArrowRight") {
        newIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        newIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        newIndex = 0;
      } else if (event.key === "End") {
        newIndex = tabs.length - 1;
      }

      if (newIndex !== null) {
        event.preventDefault();
        selectTab(newIndex, true);
      }
    });
  });
}


/* =====================================================================
   7. MANIFESTO READER MODAL + COPY
   ===================================================================== */

/** Return the full manifesto as clean plain text, trimmed. */
function getManifestoPlainText() {
  return campaignData.manifestoFullText.trim();
}

/** Convert the manifesto text markers into HTML elements inside the modal. */
function renderManifestoReader() {
  const body = $("#readerBody");
  const lines = getManifestoPlainText().split("\n");
  let currentList = null;

  lines.forEach(function (rawLine) {
    const line = rawLine.trim();

    if (line === "") {
      currentList = null; // A blank line ends any open bullet list.
      return;
    }

    if (line.startsWith("## ")) {
      currentList = null;
      body.appendChild(createElement("h3", "", line.slice(3)));
    } else if (line.startsWith("- ")) {
      if (currentList === null) {
        currentList = createElement("ul");
        body.appendChild(currentList);
      }
      currentList.appendChild(createElement("li", "", line.slice(2)));
    } else {
      currentList = null;
      body.appendChild(createElement("p", "", line));
    }
  });
}

/** Copy text to the clipboard, with a fallback for older browsers. */
async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback: temporary textarea + execCommand
  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.select();
  const succeeded = document.execCommand("copy");
  document.body.removeChild(helper);

  if (!succeeded) {
    throw new Error("Copy command failed");
  }
}

function initReaderModal() {
  const modal = $("#readerModal");
  const openButton = $("#openReaderBtn");
  const closeButton = $("#closeReaderBtn");
  const copyButton = $("#copyBtn");
  const copyStatus = $("#copyStatus");

  renderManifestoReader();

  function openModal() {
    if (typeof modal.showModal === "function") {
      modal.showModal(); // Native: traps focus and handles the Escape key.
    } else {
      modal.setAttribute("open", ""); // Very old browsers
    }
    document.body.classList.add("is-locked");
    $("#readerBody").scrollTop = 0;
    closeButton.focus();
  }

  function closeModal() {
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
  }

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);

  // Fires on Escape, close button, and modal.close(): unlock scrolling and restore focus.
  modal.addEventListener("close", function () {
    document.body.classList.remove("is-locked");
    copyStatus.textContent = "";
    openButton.focus();
  });

  // Outside-click close: the modal is full screen, so "outside" means the dialog
  // element itself being the click target (e.g. the empty area beside the text).
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Also close if the user clicks the empty margin around the reading column.
  $("#readerBody").addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  });

  // Copy button
  copyButton.addEventListener("click", async function () {
    try {
      await copyTextToClipboard(getManifestoPlainText());
      flashStatus(copyStatus, "Manifesto copied to clipboard.");
    } catch (error) {
      flashStatus(copyStatus, "Could not copy automatically. Please select the text and copy it manually.", 5000);
    }
  });
}


/* =====================================================================
   8. MANIFESTO DOWNLOAD (Blob)
   ===================================================================== */

/** Build the file contents: a header, then the manifesto text with markers cleaned up. */
function buildManifestoFileContent() {
  const divider = "=".repeat(60);
  const header = [
    divider,
    campaignData.candidateName.toUpperCase(),
    campaignData.officeFull,
    '"' + campaignData.slogan + '"',
    "Election Date: " + formatLongDate(new Date(campaignData.electionDate)),
    divider,
    ""
  ].join("\r\n");

  // Convert "## Heading" lines into uppercase headings with an underline.
  const formattedBody = getManifestoPlainText()
    .split("\n")
    .map(function (line) {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) {
        const title = trimmed.slice(3).toUpperCase();
        return "\n" + title + "\n" + "-".repeat(title.length);
      }
      return trimmed;
    })
    .join("\r\n");

  return header + "\r\n" + formattedBody + "\r\n";
}

function downloadManifesto() {
  const fileContent = buildManifestoFileContent();
  const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(blob);

  // Create a temporary link, click it, then clean up.
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = slugify(campaignData.candidateName) + "-manifesto.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Free memory shortly after the download starts.
  window.setTimeout(function () {
    URL.revokeObjectURL(downloadUrl);
  }, 1000);

  flashStatus($("#manifestoStatus"), "Your manifesto download has started.");
}

function initDownload() {
  $("#downloadBtn").addEventListener("click", downloadManifesto);
}


/* =====================================================================
   9. EVENTS: FILTER + RSVP / REMIND ME
   ===================================================================== */
const RSVP_STORAGE_KEY = "campaign-rsvp-events";

let activeEventFilter = "all";
let rsvpEventIds = readStorage(RSVP_STORAGE_KEY, []);

/** Human-readable label for each event type. */
function getEventTypeLabel(type) {
  if (type === "town-hall") {
    return "Town Hall";
  }
  return "Community Rally";
}

/** Build one event list item. */
function buildEventItem(eventData) {
  const eventDate = new Date(eventData.date);
  const isPast = eventDate.getTime() < Date.now();
  const hasRsvp = rsvpEventIds.includes(eventData.id);

  const item = createElement("li", "event" + (isPast ? " is-past" : ""));

  // Date badge
  const dateBox = createElement("div", "event__date");
  dateBox.appendChild(createElement("span", "event__day", String(eventDate.getDate())));
  dateBox.appendChild(createElement("span", "event__month",
    new Intl.DateTimeFormat("en-GB", { month: "short" }).format(eventDate)));
  item.appendChild(dateBox);

  // Details
  const details = createElement("div", "event__info");
  details.appendChild(createElement("span", "event__tag event__tag--" + eventData.type, getEventTypeLabel(eventData.type)));
  details.appendChild(createElement("h3", "event__title", eventData.title));
  details.appendChild(createElement("p", "event__meta",
    formatLongDate(eventDate) + " · " + formatTime(eventDate) + " · " + eventData.venue));
  details.appendChild(createElement("p", "event__desc", eventData.description));
  item.appendChild(details);

  // RSVP toggle
  const actionWrap = createElement("div", "event__action");
  const button = createElement("button", "rsvp");
  button.type = "button";
  button.dataset.eventId = eventData.id;

  if (isPast) {
    button.disabled = true;
    button.textContent = "Event ended";
  } else {
    button.setAttribute("aria-pressed", String(hasRsvp));
    button.textContent = hasRsvp ? "✓ Reminder set" : "RSVP / Remind Me";
  }

  actionWrap.appendChild(button);
  item.appendChild(actionWrap);

  return item;
}

/** Re-draw the events list based on the active filter. */
function renderEvents() {
  const list = $("#eventsList");
  const counter = $("#eventsCount");
  list.replaceChildren();

  const sortedEvents = campaignData.events
    .slice()
    .sort(function (a, b) { return new Date(a.date) - new Date(b.date); });

  const visibleEvents = sortedEvents.filter(function (eventData) {
    if (activeEventFilter === "all") {
      return true;
    }
    return eventData.type === activeEventFilter;
  });

  if (visibleEvents.length === 0) {
    const empty = createElement("li", "events__empty", "No events in this category yet. Check back soon.");
    list.appendChild(empty);
  } else {
    visibleEvents.forEach(function (eventData) {
      list.appendChild(buildEventItem(eventData));
    });
  }

  const reminderCount = rsvpEventIds.length;
  counter.textContent = "Showing " + visibleEvents.length + " event" + (visibleEvents.length === 1 ? "" : "s") +
    (reminderCount > 0 ? " · You have " + reminderCount + " reminder" + (reminderCount === 1 ? "" : "s") + " set" : "");
}

/** Add or remove an event from the RSVP list. */
function toggleRsvp(eventId) {
  if (rsvpEventIds.includes(eventId)) {
    rsvpEventIds = rsvpEventIds.filter(function (id) { return id !== eventId; });
  } else {
    rsvpEventIds = rsvpEventIds.concat(eventId);
  }
  writeStorage(RSVP_STORAGE_KEY, rsvpEventIds);
}

function initEvents() {
  const eventsList = $("#eventsList");
  if (!eventsList) {
    return;
  }

  const filterButtons = $$(".filters .chip");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeEventFilter = button.dataset.filter;

      filterButtons.forEach(function (other) {
        const isActive = other === button;
        other.classList.toggle("is-active", isActive);
        other.setAttribute("aria-pressed", String(isActive));
      });

      renderEvents();
    });
  });

  // One listener on the list handles every RSVP button (event delegation).
  eventsList.addEventListener("click", function (event) {
    const button = event.target.closest(".rsvp");
    if (button === null || button.disabled) {
      return;
    }

    const eventId = button.dataset.eventId;
    toggleRsvp(eventId);
    renderEvents();

    // Restore keyboard focus to the same button after the list re-renders.
    const newButton = $('.rsvp[data-event-id="' + eventId + '"]');
    if (newButton) {
      newButton.focus();
    }
  });

  renderEvents();
}


/* =====================================================================
   10. GET-INVOLVED FORM
   (Front-end only. Opens the selected email or WhatsApp app with a prepared message.)
   ===================================================================== */

/** Validate one field; show or clear its error message. Returns true if valid. */
function validateField(inputId, errorId, validator, message) {
  const input = $("#" + inputId);
  const error = $("#" + errorId);
  const wrapper = input.closest(".field");
  const isValid = validator(input.value.trim());

  wrapper.classList.toggle("has-error", !isValid);
  error.textContent = isValid ? "" : message;
  input.setAttribute("aria-invalid", String(!isValid));
  return isValid;
}

function isValidContact(value) {
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const looksLikePhone = /^[+]?[\d\s-]{7,15}$/.test(value);
  return looksLikeEmail || looksLikePhone;
}

function initInvolvedForm() {
  const form = $("#involvedForm");
  const status = $("#formStatus");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameOk = validateField("fName", "fNameError",
      function (value) { return value.length >= 2; }, "Please enter your full name.");
    const contactOk = validateField("fContact", "fContactError",
      isValidContact, "Enter a valid phone number or email address.");
    const messageOk = validateField("fRole", "fRoleError",
      function (value) { return value.length > 0; }, "Please enter your question or message.");

    if (!nameOk || !contactOk || !messageOk) {
      status.textContent = "";
      return;
    }

    const values = new FormData(form);
    const message = [
      "Website message for Engr. Opakunle J.A.",
      "Name: " + values.get("name").trim(),
      "Phone or email: " + values.get("contact").trim(),
      "Cooperative member ID: " + (values.get("memberId").trim() || "Not provided"),
      "Question or message: " + values.get("role").trim()
    ].join("\n");
    const channel = event.submitter && event.submitter.dataset.channel;

    if (channel === "email") {
      status.textContent = "Opening your email app with your message addressed to josephopakunle7@gmail.com.";
      window.location.href = "mailto:josephopakunle7@gmail.com?subject="
        + encodeURIComponent("Website message for Engr. Opakunle J.A.")
        + "&body=" + encodeURIComponent(message);
      return;
    }

    status.textContent = "Opening WhatsApp with your message addressed to 08136064328.";
    window.location.href = "https://wa.me/2348136064328?text=" + encodeURIComponent(message);
  });
}


/* =====================================================================
   11. START-UP
   ===================================================================== */
document.addEventListener("DOMContentLoaded", function () {
  renderBoundText();
  renderBiography();
  renderEndorsements();
  renderManifestoTabs();

  initNavigation();
  initCountdown();
  initPhotoSlideshow();
  initManifestoTabs();
  initReaderModal();
  initDownload();
  initEvents();
  initInvolvedForm();
});
