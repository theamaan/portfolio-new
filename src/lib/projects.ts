export type Project = {
  number: string;
  slug: string;
  title: string;
  year: string;
  blurb: string;
  pullQuote: string;
  stack: string[];
  github?: string;
  role: "ai" | "backend" | "data";
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
    role: "ai",
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
    role: "ai",
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
    role: "ai",
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
    github: "https://github.com/theamaan/Employee-Management-System",    role: "backend",
  },
  {
    number: "05",
    slug: "atmos-cinematic-weather",
    title: "Atmos — Cinematic Weather",
    year: "2024",
    blurb:
      "A vanilla JavaScript weather dashboard with adaptive atmospheric theming, real-time data visualization, and a zero-dependency Node server as API proxy. Responsive, interactive, and production-hardened.",
    pullQuote: "Interactive frontend design. Secure API proxy. The weather, with motion.",
    stack: ["javascript", "node.js", "openweather api", "responsive ui"],
    github: "https://github.com/theamaan/Atmos-Cinematic-Weather",
    role: "backend",
  },
  {
    number: "06",
    slug: "data-lineage-impact-analysis",
    title: "Data Lineage & Impact Analysis",
    year: "2024",
    blurb:
      "100% open-source tool that auto-parses SQL transformations and builds an interactive lineage graph. Answers: if I change this table, what breaks? Impact scoring, column-level tracking, Streamlit dashboard, optional Ollama AI explanations.",
    pullQuote: "No license keys. No premium tiers. Just SQL lineage and honest impact analysis.",
    stack: ["python", "sqlglot", "networkx", "sqlite", "streamlit", "graphviz"],
    github: "https://github.com/theamaan/data_lineage",
    role: "data",  },
];
