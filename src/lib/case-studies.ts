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
  },

  "standup-report-generator": {
    number: "03",
    title: "Standup Report Generator",
    year: "2025",
    role: "Personal project",
    oneLiner:
      "Paste a messy standup transcript, get a clean per-speaker report — yesterday, today, blockers, action items.",
    stack: ["Python", "Open-source LLM", "Web UI", "Clipboard export"],
    metrics: [
      { value: "1", label: "paste, no formatting required" },
      { value: "per-speaker", label: "structured output" },
      { value: "auto", label: "action-item extraction" },
    ],
    sections: {
      problem: `Daily standups produce a lot of words and very little structure. Someone, usually the same someone, ends up turning the recording into a written report. It is the least loved task on the team.`,
      constraint: `The transcript is unstructured, names are inconsistent ("John", "John D.", "JD"), people interrupt each other, and the output has to be skimmable at the end of a long day. A naive summary loses the per-person detail that makes a standup report useful in the first place.`,
      approach: `The pipeline first identifies speakers and groups their turns, then asks the model to extract a small structured schema per person — yesterday, today, blockers — and a separate pass for action items and an executive summary. The UI is a single textarea and a copy-to-clipboard button. That is the entire product.`,
      decisions: [
        {
          title: "Schema first, prose second",
          body: `Asking for structured fields per speaker before any free-form summary made the output dramatically more reliable. The summary is a derived view over the structure, not the other way around.`,
        },
        {
          title: "Speaker grouping is its own step",
          body: `Trying to do speaker identification, extraction, and summarization in a single prompt was a coin flip. Splitting them made each step debuggable and made model swaps cheap.`,
        },
        {
          title: "Open-source LLM by default",
          body: `Standup transcripts often contain things people would not want in a third-party log. Defaulting to a local or open-source model removes the question.`,
        },
      ],
      different: `Speaker diarization is the weakest link. Next iteration would either ingest properly diarized transcripts directly from the meeting tool or use a small specialised model for that step instead of leaning on the LLM to guess.`,
    },
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
          title: "Clean architecture, not "clean" architecture",
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
  },
} as const;

export type CaseStudySlug = keyof typeof caseStudies;
