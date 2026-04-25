export type TimelineEntry = {
  range: string;
  role: string;
  company: string;
  location: string;
  line: string;
};

export const timeline: TimelineEntry[] = [
  {
    range: "2024 — now",
    role: "AI / Backend Engineer",
    company: "Infinite Computer Solutions",
    location: "Chennai",
    line: "Built a healthcare document-generation system in .NET; cut a 24-hour manual letter-translation workflow to a couple of minutes with an agentic Python + LLM pipeline.",
  },
  {
    range: "2024",
    role: "Frontend Engineer (Intern)",
    company: "OneBanc",
    location: "Gurugram",
    line: "Wrote PowerShell automation that halved release-prep time and shipped UI work that survived code review.",
  },
  {
    range: "2019 — 2023",
    role: "B.Tech, Computer Science",
    company: "Babu Banarasi Das ITM",
    location: "Lucknow",
    line: "Spent more time on side projects than coursework. Worth it.",
  },
];
