"use client";

import Link from "next/link";
import { useSite } from "@/lib/site-context";
import { projects } from "@/lib/projects";

/**
 * Recruiter Mode — a compact summary that floats over the full page.
 * Shows role, top 3 projects, core stack, and a direct contact CTA.
 * Toggle with the Nav button or Ctrl+R.
 */
export function RecruiterMode() {
  const { recruiterMode, toggleRecruiterMode } = useSite();

  if (!recruiterMode) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Recruiter summary view"
      className="fixed inset-0 z-40 overflow-y-auto bg-[var(--bg)]"
    >
      <div className="max-w-[860px] mx-auto px-6 py-16 md:py-24 space-y-12">

        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
              ⚡ recruiter mode — 60-second brief
            </div>
            <h1 className="display text-[44px] md:text-[64px] leading-[1.02]">
              Aman Ullah
            </h1>
            <p className="mono text-[13px] text-[var(--fg-muted)] mt-2">
              AI / LLM Engineer · Backend · Data · Chennai, India · Open to SDE-2 roles
            </p>
          </div>
          <button
            onClick={toggleRecruiterMode}
            aria-label="Exit recruiter mode"
            className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-muted)] hover:text-[var(--fg)] border border-[var(--rule)] px-3 py-2 transition-colors shrink-0"
          >
            ✕ exit
          </button>
        </div>

        <div className="rule" />

        {/* One-liner positioning */}
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-muted)] mb-3">
            what he does
          </div>
          <p className="text-[18px] md:text-[22px] leading-[1.5] max-w-[58ch]">
            Builds production LLM systems — agentic pipelines, RAG, multi-model routers — for
            real healthcare and enterprise problems. Not demos. Things that ship.
          </p>
        </div>

        <div className="rule" />

        {/* Top 3 projects */}
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-muted)] mb-5">
            top projects
          </div>
          <ul className="space-y-0 border-t border-[var(--rule)]">
            {projects.slice(0, 3).map((p) => (
              <li key={p.slug} className="border-b border-[var(--rule)]">
                <Link
                  href={`/work/${p.slug}`}
                  onClick={toggleRecruiterMode}
                  className="group flex items-center justify-between gap-4 py-4 hover:text-[var(--accent)] transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="mono text-[11px] text-[var(--fg-muted)]">{p.number}</span>
                    <span className="text-[17px] font-medium">{p.title}</span>
                    <span className="mono text-[12px] text-[var(--accent)] hidden md:inline">
                      {p.pullQuote.split(".")[0]}.
                    </span>
                  </div>
                  <span className="mono text-[12px] text-[var(--fg-muted)] group-hover:text-[var(--accent)] shrink-0 transition-colors">
                    read →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rule" />

        {/* Core stack */}
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-muted)] mb-5">
            core stack
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Python", "LLMs / Agents", "RAG", "FastAPI", ".NET / C#",
              "Databricks", "Spark SQL", "Azure Data Factory", "Microsoft Fabric",
              "Selenium", "SQL Server", "Git",
            ].map((s) => (
              <span
                key={s}
                className="mono text-[12px] border border-[var(--rule)] px-3 py-1 text-[var(--fg)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="rule" />

        {/* Contact strip */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:theamaan13@gmail.com"
            className="flex-1 border border-[var(--accent)] px-6 py-4 mono text-[13px] uppercase tracking-[0.12em] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors text-center"
          >
            Email Aman →
          </a>
          <a
            href="/aman-ullah-resume.pdf"
            download
            className="flex-1 border border-[var(--rule)] px-6 py-4 mono text-[13px] uppercase tracking-[0.12em] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors text-center"
          >
            Download Resume
          </a>
          <a
            href="https://linkedin.com/in/amaanullah13"
            target="_blank"
            rel="noreferrer"
            className="flex-1 border border-[var(--rule)] px-6 py-4 mono text-[13px] uppercase tracking-[0.12em] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors text-center"
          >
            LinkedIn →
          </a>
        </div>

        <div className="mono text-[11px] text-[var(--fg-muted)] text-center pt-4">
          Exit recruiter mode to explore the full portfolio, case studies, and architecture walk-throughs.
        </div>
      </div>
    </div>
  );
}
