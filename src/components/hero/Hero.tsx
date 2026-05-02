"use client";

import { Container } from "../primitives";
import { TokenStream } from "./TokenStream";
import { useSite, type Role } from "@/lib/site-context";

const ROLES: { key: Role; label: string }[] = [
  { key: "ai",      label: "AI / LLM" },
  { key: "backend", label: "Backend" },
  { key: "data",    label: "Data" },
];

const ROLE_META: Record<Role, { headline: string; second: string; sub: string; tag: string }> = {
  ai: {
    headline: "Most AI demos break in production.",
    second:   "I build the ones that don't.",
    sub: "AI / LLM engineer who ships agentic pipelines, RAG systems, and multi-model routers into messy real-world workflows. Currently at Infinite Computer Solutions, Chennai.",
    tag: "AI / LLM Engineer",
  },
  backend: {
    headline: "Most backend systems are held together with duct tape.",
    second:   "I prefer layers.",
    sub: "Backend engineer with production experience in Python, .NET, FastAPI, Spring Boot, and SQL Server. Automation reflex — if I do it twice, it becomes a script.",
    tag: "Backend Engineer",
  },
  data: {
    headline: "Most data pipelines break silently.",
    second:   "I instrument mine.",
    sub: "Data engineer certified in Microsoft Fabric, hands-on with Databricks, Spark SQL, Delta Lake, and Azure Data Factory. I build pipes that tell you when they leak.",
    tag: "Data Engineer",
  },
};

export function Hero() {
  const { role, setRole } = useSite();
  const meta = ROLE_META[role];

  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--rule)]">
      <Container className="relative pt-24 pb-28 md:pt-36 md:pb-40 min-h-[88vh] flex flex-col justify-between">
        {/* Top meta */}
        <div className="relative flex items-center gap-3 mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          <span className="inline-block h-[6px] w-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
          <span>currently · {meta.tag} @ infinite computer solutions</span>
        </div>

        {/* Headline + right rail stream */}
        <div className="relative mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-8 xl:col-span-9 relative z-10">

            {/* Role toggle */}
            <div className="mb-8 flex items-center gap-1 border border-[var(--rule)] w-fit bg-[var(--bg-elev)] p-1">
              {ROLES.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  aria-pressed={role === r.key}
                  className={`mono text-[11px] uppercase tracking-[0.12em] px-4 py-1.5 transition-colors ${
                    role === r.key
                      ? "bg-[var(--accent)] text-[var(--bg)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <h1 className="display text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] max-w-[14ch] leading-[1.02]">
              {meta.headline}
              <br />
              <span className="text-[var(--fg-muted)]">{meta.second}</span>
            </h1>

            <p className="mono text-[12px] md:text-[13px] text-[var(--fg-muted)] mt-8 max-w-[60ch] leading-relaxed">
              {meta.sub}
            </p>
          </div>

          {/* Token stream is pinned to the right rail to avoid headline overlap */}
          <aside
            aria-hidden
            className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:pl-6 lg:border-l lg:border-[var(--rule)] self-stretch"
          >
            <div className="sticky top-24">
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-muted)] mb-4 flex items-center gap-2">
                <span className="inline-block h-[6px] w-[6px] rounded-full bg-[var(--accent)]" />
                live · model output
              </div>
              <div className="max-h-[260px] overflow-hidden opacity-80">
                <TokenStream />
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom hint */}
        <div className="relative mt-16 md:mt-24 flex items-end justify-between">
          <a
            href="#work"
            className="mono text-[12px] uppercase tracking-[0.16em] text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-3"
          >
            <span className="h-px w-12 bg-current" />
            see selected work
          </a>
          <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-muted)] hidden sm:block">
            press <kbd className="border border-[var(--rule)] px-1">/</kbd> for commands · scroll ↓
          </div>
        </div>
      </Container>
    </section>
  );
}
