export const caseStudies = {
  "ai-letter-translator": {
    number: "01",
    title: "AI Letter Translator",
    year: "2026",
    role: "AI Engineer · Infinite Computer Solutions",
    oneLiner:
      "An agentic, two-step pipeline that translates Molina Healthcare letters across 18+ languages without ever corrupting a member ID, ICD-10 code, or drug name.",
    stack: [
      "Python",
      "Ollama (local)",
      "Cerebras Cloud · Qwen 3 235B",
      "Agent orchestration",
      "python-docx",
    ],
    metrics: [
      { value: "24h → minutes", label: "manual translation turnaround" },
      { value: "18+", label: "languages supported" },
      { value: "0", label: "protected fields touched" },
    ],
    sections: {
      problem: `Molina Healthcare serves members who speak more than 18 languages. Every day, clinical teams generate denial letters, prior authorization notices, and other healthcare correspondence — all in English. Getting those letters into Spanish, Vietnamese, Somali, Hmong, or Chinese, accurately and quickly, was a real bottleneck.

The old way was manual translation. Slow turnaround. High cost. And a quiet, recurring risk: a translator accidentally changing a medical code, a member ID, or a drug name. In healthcare, those changes have consequences.`,
      constraint: `The system had to do two contradictory things at once. Translate fluently — and refuse to touch anything clinically or legally identifying. Names, member IDs, ICD-10 codes, CPT codes, dates, phone numbers, "Molina Healthcare" itself. None of it could drift. Pure prompt-and-pray translation was a non-starter.

It also had to preserve the document's exact formatting — Word styles, tables, line breaks. Recipients should not be able to tell a machine touched it.`,
      approach: `I built it as a two-agent pipeline.

Step one is **Analyze**. Before a single word is translated, an agent reads the document and returns a structured list of protected items: member IDs, codes, names, addresses, organization references. This list becomes the guardrail.

Step two is **Translate**. A second agent translates the content paragraph-by-paragraph, carrying the protected list as a hard constraint. Anything on the list gets emitted verbatim.

Formatting is preserved by walking the .docx tree directly rather than going through an intermediate format that strips styles.`,
      decisions: [
        {
          title: "Two agents instead of one mega-prompt",
          body: `One agent doing both extraction and translation kept hallucinating "helpful" rewrites of member IDs. Splitting the responsibilities — one agent that only extracts, one that only translates — collapsed the failure rate. The protected list is data, not a suggestion in a prompt.`,
        },
        {
          title: "Hybrid LLM routing: local + frontier",
          body: `Most paragraphs in a healthcare letter are routine prose. We route those to a local Ollama model — fast, free per call, and good enough. Clinical criteria, utilization review language, and adverse determinations get routed to Cerebras Cloud running Qwen 3 235B. Right tool for the right paragraph; cost stays low without sacrificing accuracy on the parts that matter.`,
        },
        {
          title: "Walk the .docx, don't flatten it",
          body: `Going via Markdown or plain text was tempting and would have made the LLM's job easier. It would also have destroyed every table, header style, and inline format the recipient expects to see. Translating in-place at the run level was harder to engineer but kept the document looking exactly like the original.`,
        },
        {
          title: "Caching and batching, not threading",
          body: `Repeated boilerplate paragraphs (footers, disclaimers, standard rights notices) are cached after first translation per language. Batched calls to the local model amortize startup cost. This is what turned a slow demo into something that actually felt like minutes, not hours.`,
        },
      ],
      different: `If I were starting over, I would invest in evals from day one — a small held-out set of real letters per language, with human-graded translations, run on every model and prompt change. We built evals reactively after a few near-misses. They should have been the first commit.`,
    },
    evidence: [
      { metric: "24h → ~5 minutes", proof: "Internal workflow benchmark", confidence: "Measured" },
      { metric: "18+ languages",     proof: "Language config matrix",        confidence: "Verified" },
      { metric: "0 protected fields corrupted", proof: "QA review of 50+ real letters", confidence: "Verified" },
    ],
    failureLog: [
      { what: "Single-agent approach corrupted member IDs", changed: "Split into analyze + translate agents", learned: "Protecting structured data needs to be its own step, not a prompt instruction." },
      { what: "Plain-text extraction broke Word formatting", changed: "Switched to in-place .docx tree traversal", learned: "Flattening a document to translate it destroys the contract with the end user." },
      { what: "No evals until production near-misses", changed: "Added a QA review round per language", learned: "Evals should be the first commit, not a patch after the first scare." },
    ],
  },

  "healthcare-rag-assistant": {
    number: "02",
    title: "Healthcare RAG Document Assistant",
    year: "2026",
    role: "Personal project",
    oneLiner:
      "A fully local, open-source RAG system for healthcare documents. Upload an insurance policy or care guideline, ask contextual questions, and get answers grounded in the document with page-level citations.",
    stack: ["Python", "Local open-source LLM", "Vector retrieval", "Streamlit", "PDF parsing"],
    metrics: [
      { value: "0", label: "API keys required" },
      { value: "100%", label: "local inference" },
      { value: "page-level", label: "citations, every answer" },
    ],
    sections: {
      problem: `Most "chat with your PDF" tools confidently hallucinate, send the document to a third-party API, or both. For healthcare documents — policies, care guidelines, member records — neither is acceptable. You cannot upload a member's medical record to a public API to ask it a question.`,
      constraint: `Three constraints at once: it had to run entirely on a laptop, it had to refuse to make things up, and every answer had to be traceable to a specific page of a specific document. No cloud, no key, no excuses.`,
      approach: `Documents are parsed page-by-page so each chunk carries a real page number, not a synthetic one. Chunks get embedded with a local embedding model and stored in a small vector index. At query time, the top-k chunks are retrieved, packed into the prompt with their page numbers, and the local LLM is told — in plain terms — that it must cite or refuse.

The UI is intentionally boring: upload, ask, read the answer with [p.42]-style citations next to each claim.`,
      decisions: [
        {
          title: "Local-only, even though it's slower",
          body: `Frontier-model RAG would be more fluent. It would also defeat the entire point. The premise of the project is that healthcare documents do not leave the machine. That constraint shaped every other decision.`,
        },
        {
          title: "Citations as a hard requirement, not a feature",
          body: `The model is instructed to refuse rather than guess if no retrieved chunk supports the answer. Refusal is cheaper than a wrong answer with confident phrasing.`,
        },
        {
          title: "Page-level chunks, not paragraph-level",
          body: `Paragraph-level chunking gave better recall but worse citations — users could not find the source. Page-level chunks lost a little recall and made the citations actually useful. The right trade for the audience.`,
        },
      ],
      different: `I would add a small evaluation harness — a fixed set of questions per document with known correct page citations — so I can tell when a model swap or a chunking change quietly regresses retrieval. Right now the feedback loop is "try it and see," which does not scale.`,
    },
    evidence: [
      { metric: "0 API keys required",   proof: "Runs fully offline",                confidence: "Verified" },
      { metric: "Page-level citations",   proof: "Every answer links to source page", confidence: "By design" },
      { metric: "100% local inference",   proof: "No outbound network calls in demo", confidence: "Measured" },
    ],
    failureLog: [
      { what: "Paragraph-level chunks produced citations users couldn't find", changed: "Switched to page-level chunking", learned: "Citations are only useful if a human can act on them." },
      { what: "Model answered confidently with no supporting chunk", changed: "Added refuse-if-confidence-low instruction", learned: "A wrong answer with confident phrasing is worse than a refusal." },
    ],
  },

  "ai-meeting-automation-guide": {
    number: "03",
    title: "AI Meeting Intelligence System",
    year: "2026",
    role: "Personal project",
    oneLiner:
      "A local-first, enterprise-grade meeting automation system that converts Teams recordings into per-person MOM, sends interactive Adaptive Cards to Teams, and dispatches formatted HTML email summaries.",
    stack: ["Python", "Ollama", "watchdog", "Adaptive Cards", "SQLite", "Jinja2"],
    metrics: [
      { value: "5 min", label: "sync-safe processing delay" },
      { value: "3", label: "input formats (.vtt, .docx, .mp4)" },
      { value: "local-first", label: "no cloud dependency" },
    ],
    sections: {
      problem: `Teams meetings create a lot of operational knowledge, but most teams lose it within hours. Notes are inconsistent, action items disappear in chat scrollback, and reporting still depends on someone manually summarizing transcripts. I wanted a system that could turn raw recordings into structured MOM without adding another SaaS dependency.`,
      constraint: `The system had to run locally, tolerate enterprise environments, and handle messy real-world inputs. Files arrive through OneDrive and can remain incomplete while syncing. Transcript quality varies across .vtt, .docx, and raw .mp4 sources. Output had to be deterministic JSON suitable for downstream notifications and audit storage.`,
      approach: `I built a modular pipeline around a file watcher and strict structured output. New files in the OneDrive folder are held with a delay timer to avoid partial reads. Parser logic chooses the best available source (.vtt first, then .docx, then Whisper on .mp4). The LLM layer enforces JSON-only MOM per person, then fans out to Teams Adaptive Cards, HTML email, and SQLite audit logging.`,
      decisions: [
        {
          title: "Delay-and-reset file ingestion",
          body: `OneDrive sync made immediate processing unreliable. A 5-minute delay with reset-on-change avoided parsing half-written recordings and cut flaky runs during upload windows.`,
        },
        {
          title: "Strict JSON enforcement around LLM output",
          body: `I treated model output as untrusted text until validated. The pipeline strips fences, finds JSON boundaries, repairs minor syntax drift, validates required keys, retries with backoff, and falls back safely if needed.`,
        },
        {
          title: "Interactive delivery, not static summaries",
          body: `Teams Adaptive Cards with Action.ToggleVisibility let users expand per-person updates directly in channel without extra backend calls. This made the output actionable where teams already work.`,
        },
      ],
      different: `I would add a first-class evaluation suite for long meetings and noisy transcripts from day one, including regression fixtures for participant normalization and JSON validity under stress. The recovery logic is strong, but automated quality gates would make model or prompt upgrades safer.`,
    },
    evidence: [
      { metric: "Idempotent processing",        proof: "SQLite + INSERT OR IGNORE duplicate protection", confidence: "Verified" },
      { metric: "Real-time channel delivery",   proof: "Teams webhook Adaptive Card notifier",             confidence: "Demonstrated" },
      { metric: "Multi-format ingestion",       proof: "Parser priority: .vtt -> .docx -> .mp4",          confidence: "By design" },
    ],
    failureLog: [
      { what: "File watcher triggered while OneDrive upload was still in progress", changed: "Added delayed processing with reset-on-change behavior", learned: "Sync-aware ingestion is non-negotiable in enterprise file flows." },
      { what: "LLM occasionally returned malformed JSON wrappers", changed: "Added boundary extraction, repair step, and retry/fallback pipeline", learned: "Production LLM systems need post-processing contracts, not blind parsing." },
    ],
  },

  "employee-management-system": {
    number: "04",
    title: "Employee Management System",
    year: "2025",
    role: "Personal project",
    oneLiner:
      "A production-grade employee management system — not glamorous, but layered, tested, and shipped. Replaces manual HR record-keeping with attendance, analytics, and reporting.",
    stack: ["C#", ".NET", "SQL Server", "Clean Architecture", "Layered services"],
    metrics: [
      { value: "4", label: "layers (domain, app, infra, web)" },
      { value: "production-grade", label: "validation, logging, errors" },
      { value: "full repo", label: "on GitHub with README" },
    ],
    sections: {
      problem: `Plenty of teams still run HR on spreadsheets. The cost is not the spreadsheet — it is the slow drift, the lost records, and the inability to answer simple questions like "who was on leave last quarter."`,
      constraint: `I wanted this to be a real demonstration of clean architecture in .NET, not a CRUD demo wearing the costume of one. That meant honest layering, dependency inversion that was actually useful, and tests that protected behaviour rather than line coverage.`,
      approach: `The codebase is split into Domain, Application, Infrastructure, and Web layers. Domain holds entities and rules. Application holds use-cases and contracts. Infrastructure implements persistence and external concerns. Web is just a delivery mechanism. The dependency arrows all point inward.`,
      decisions: [
        {
          title: 'Clean architecture, not "clean" architecture',
          body: `It is easy to draw the four boxes and still leak EF Core types into the domain. The discipline was making domain code framework-free and proving it by swapping the persistence layer in tests.`,
        },
        {
          title: "Boring stack on purpose",
          body: `C#, .NET, SQL Server. Nothing experimental. The point of this project was to prove I can deliver the kind of system most companies actually run, not to chase a trend.`,
        },
        {
          title: "README as a first-class artifact",
          body: `The repository's README walks through the architecture and trade-offs in plain English. If a recruiter never opens the code, the README still does the job.`,
        },
      ],
      different: `I would add an end-to-end integration test suite earlier, and I would push the analytics out of the main app into a small read model. Most reporting pain in EMS-style systems comes from running queries against the same tables the app writes to.`,
    },
    evidence: [
      { metric: "4 clean layers (Domain/App/Infra/Web)", proof: "Code review — no framework leakage into domain", confidence: "Verified" },
      { metric: "Full repo on GitHub with README",       proof: "Architecture walkthrough in README",            confidence: "Public" },
      { metric: "Production-grade validation + errors",  proof: "Middleware + response model design",            confidence: "By design" },
    ],
    failureLog: [
      { what: "EF Core types leaking into domain early on", changed: "Enforced strict dependency rule via interfaces", learned: "Clean architecture only works if the boundary is a hard constraint, not a guideline." },
      { what: "Analytics queries hitting write tables directly", changed: "Flagged for read-model refactor in next iteration", learned: "Read and write models should diverge early; retrofitting later is painful." },
    ],
  },

  "atmos-cinematic-weather": {
    number: "05",
    title: "Atmos — Cinematic Weather",
    year: "2024",
    role: "Personal project",
    oneLiner:
      "A vanilla JavaScript weather dashboard with adaptive atmospheric theming, real-time data visualization, interactive cards, and a zero-dependency Node proxy server for secure API key handling.",
    stack: ["Vanilla JavaScript", "Node.js", "OpenWeather API", "CSS motion", "Responsive design"],
    metrics: [
      { value: "zero deps", label: "frontend, no build step" },
      { value: "secure proxy", label: "API key server-side only" },
      { value: "cinematic UX", label: "motion, theme, interactivity" },
    ],
    sections: {
      problem: `Most weather dashboards are either generic web interfaces or mobile-only. I wanted something that felt genuinely beautiful — adaptive atmospheric theming, smooth micro-interactions, responsive across devices — without a massive framework or slow builds. And critically, the OpenWeather API key had to never ship to the browser.`,
      constraint: `Zero npm dependencies for the frontend. The app had to build instantly, run from any server, and render perfectly on phones, tablets, and desktops. Real-time weather data with visual feedback, but the API secret stays locked on the server. Every interaction had to feel responsive.`,
      approach: `I built the frontend in vanilla JavaScript with modern CSS (Grid, custom properties, backdrop-filter). The server is a simple Node.js proxy that exposes a /api/weather endpoint — the browser calls that, never OpenWeather directly. The UI is event-driven: geolocation triggers a request, city search is debounced, data arrival updates the DOM with transitions. CSS custom properties let the theme adapt to weather conditions — darker skies, warmer tones for heat, cooler blues for cold. Pointer events on the background add subtle parallax motion.`,
      decisions: [
        {
          title: "Vanilla JavaScript, not a framework",
          body: `React or Vue would have made state management easier but would have added a build step and bloat. For a dashboard with a flat state model (current conditions + forecast), vanilla was faster, cleaner, and genuinely more performant.`,
        },
        {
          title: "Adaptive theming via CSS variables",
          body: `Instead of hard-coded colors, every visual property — background gradients, text colors, card shadows — comes from a CSS custom property set by JavaScript based on temperature, cloud cover, and time of day. Same DOM, different theme. No repaint overhead.`,
        },
        {
          title: "Server-side API proxy, not CORS",
          body: `Putting the API key in the browser is a security anti-pattern. The server proxies all requests. The frontend talks to /api/weather, the server talks to OpenWeather. Cleaner, safer, and easier to rate-limit or cache.`,
        },
        {
          title: "Local storage for recent searches",
          body: `Users want to quickly re-check weather for places they visit often. localStorage keeps a history without a backend database. Simple, persistent, fast.`,
        },
      ],
      different: `I would add offline fallback with cached data, and push harder on the air quality integration — right now it's a gauge, but it could be tied to visual severity indicators (card color, motion intensity) to make the data more visceral.`,
    },
    evidence: [
      { metric: "Instant load, no build", proof: "Plain HTML + CSS + JS, zero transpilation", confidence: "By design" },
      { metric: "Adaptive theme per weather", proof: "CSS variables updated on data arrival", confidence: "Demonstrated" },
      { metric: "API key server-side only", proof: "Node proxy, browser never touches secret", confidence: "Verified" },
    ],
    failureLog: [
      { what: "CORS errors when calling OpenWeather directly from browser", changed: "Added Node server as API proxy", learned: "Never expose API keys to the client, even if CORS would technically work." },
      { what: "Hard-coded theme felt static in bad weather", changed: "Switched to dynamic CSS variables tied to conditions", learned: "Theme should respond to data, not preconfigure it." },
    ],
  },

  "data-lineage-impact-analysis": {
    number: "06",
    title: "Data Lineage & Impact Analysis",
    year: "2024",
    role: "Personal project",
    oneLiner:
      "An open-source tool that auto-parses SQL transformations into a lineage graph, calculates impact scores for changes, and provides an interactive Streamlit dashboard with optional AI-powered SQL explanations.",
    stack: ["Python", "sqlglot", "NetworkX", "SQLite", "Streamlit", "Graphviz"],
    metrics: [
      { value: "100% open", label: "no premium tiers, no licenses" },
      { value: "column-level", label: "lineage tracking" },
      { value: "impact scoring", label: "BFS traversal, depth weighting" },
    ],
    sections: {
      problem: `Data teams spend way too much time asking "if I change this table, what breaks?" Usually they answer by grepping logs or asking colleagues who also don't know. When a schema change hits production, half the team scrambles. I wanted a tool that answers the question automatically, at scale, with no premium tier or API key.`,
      constraint: `The tool had to work entirely offline. No cloud database, no external service calls (except optional Ollama). It had to parse real SQL dialects (Spark, T-SQL, BigQuery flavors), build a fast in-memory graph, and explain impact in human terms. Most importantly, it had to be so easy to use that data teams would actually adopt it — point it at a SQL file, get a dashboard, done.`,
      approach: `The pipeline uses sqlglot to parse SQL statements into an AST, extracting table and column dependencies. Each transformation becomes a node in a directed graph built with NetworkX. When you ask "what breaks if I change raw_claims?" the system does a breadth-first search from that table, scoring each dependent table by its depth in the DAG. Closer dependencies score higher (1.0 for direct, 0.5 for one hop, 0.333 for two hops). The score becomes the basis for impact urgency. The Streamlit dashboard visualizes the graph with Graphviz, lets you drill into any table, and optionally calls Ollama to generate human-readable SQL explanations.`,
      decisions: [
        {
          title: "sqlglot for dialect-agnostic parsing",
          body: `Different teams use different SQL dialects (Spark SQL, BigQuery, T-SQL). Instead of building n parsers, sqlglot abstracts them into a common AST. Write the logic once, works everywhere.`,
        },
        {
          title: "Impact scoring by depth, not just presence",
          body: `Saying "this table depends on raw_claims" is useful. Saying "it depends directly (score 1.0) vs. through two intermediates (score 0.25)" is critical for prioritization. Teams fix high-impact breaks first.`,
        },
        {
          title: "Streamlit for the dashboard, not a custom web app",
          body: `Streamlit makes interactive Python dashboards with 10 lines of code. The alternative is Flask templates, React, etc. For data teams already in Python/Jupyter, Streamlit is the path of least resistance.`,
        },
        {
          title: "Optional Ollama for SQL explanation",
          body: `Not every team has an LLM running locally. The tool works fully without Ollama. But if Ollama is running, asking "explain what this SQL does in plain English" becomes free. It's a nice-to-have, not a requirement.`,
        },
      ],
      different: `I would add versioning — track how lineage changes over time, so you can answer "when did this column stop flowing to the risk model?" Currently it's a point-in-time snapshot. Time-series lineage would unlock so much debugging.`,
    },
    evidence: [
      { metric: "Column-level lineage", proof: "sqlglot AST extracts columns, not just tables", confidence: "By design" },
      { metric: "Multi-dialect SQL support", proof: "Tested on Spark, BigQuery, T-SQL sample", confidence: "Verified" },
      { metric: "Zero external dependencies for core", proof: "Only Python stdlib + sqlglot + NetworkX + sqlite3", confidence: "Verified" },
    ],
    failureLog: [
      { what: "Table-level lineage only missed column-level impact", changed: "Extended sqlglot parsing to track SELECT columns", learned: "Impact analysis at table granularity is coarse; columns matter more than whole tables." },
      { what: "Graph could get huge, slow traversal", changed: "Added scoring cutoff (only show impact > 0.1)", learned: "Not all dependencies matter equally; weighting by depth filters noise." },
    ],
  },
} as const;

export type CaseStudySlug = keyof typeof caseStudies;
