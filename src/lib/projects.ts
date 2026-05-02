export type Project = {
  number: string;
  slug: string;
  title: string;
  year: string;
  blurb: string;
  pullQuote: string;
  stack: string[];
  github?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "ai-letter-translator",
    title: "AI Letter Translator",
    year: "2026",
    blurb:
      "Agentic, two-step pipeline that translates healthcare letters across 18+ languages without ever touching a member ID, ICD-10 code, or drug name.",
    pullQuote: "24-hour manual translation → minutes. Hybrid local + frontier routing.",
    stack: ["python", "ollama", "cerebras · qwen 3 235b", "agents", "docx"],
  },
  {
    number: "02",
    slug: "healthcare-rag-assistant",
    title: "Healthcare RAG Document Assistant",
    year: "2026",
    blurb:
      "Fully local, open-source RAG over insurance policies and medical records. Page-level citations. No cloud, no API keys, no hallucinated drug names.",
    pullQuote: "Private by construction. Every answer carries its receipts.",
    stack: ["python", "local llm", "vector search", "streamlit"],
    github: "https://github.com/theamaan",
  },
  {
    number: "03",
    slug: "ai-meeting-automation-guide",
    title: "AI Meeting Intelligence System",
    year: "2026",
    blurb:
      "Local-first meeting automation pipeline that processes Teams recordings into per-person MOM JSON, posts interactive Adaptive Cards to Teams, and sends clean HTML summaries by email.",
    pullQuote: "No cloud dependency. No data leaves your machine.",
    stack: ["python", "ollama", "adaptive cards", "sqlite"],
    github: "https://github.com/theamaan/AI-Meeting-Automation-Guide",
  },
  {
    number: "04",
    slug: "employee-management-system",
    title: "Employee Management System",
    year: "2025",
    blurb:
      "Production-grade EMS replacing manual HR record-keeping. Clean architecture, attendance, analytics, reporting. The ‘range proof’ project.",
    pullQuote: "Not glamorous. Just solid, layered, and shipped.",
    stack: ["c#", ".net", "sql server", "clean architecture"],
    github: "https://github.com/theamaan/Employee-Management-System",
  },
];
