import Link from "next/link";
import { Container } from "./primitives";
import type { CaseStudySlug } from "@/lib/case-studies";
import { caseStudies } from "@/lib/case-studies";

type EvidenceRow = { metric: string; proof: string; confidence: string };
type FailureRow  = { what: string; changed: string; learned: string };
type CaseStudyWithExtras = (typeof caseStudies)[CaseStudySlug] & {
  evidence?: EvidenceRow[];
  failureLog?: FailureRow[];
};

export function CaseStudy({ slug }: { slug: CaseStudySlug }) {
  const cs = caseStudies[slug];

  return (
    <article className="pb-32">
      {/* Header */}
      <header className="border-b border-[var(--rule)] py-20 md:py-28">
        <Container>
          <Link
            href="/#work"
            className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
          >
            ← back to work
          </Link>
          <div className="mt-10 flex items-center gap-4 mono text-[12px] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
            <span>{cs.number}</span>
            <span className="h-px w-10 bg-[var(--rule)]" />
            <span>{cs.year}</span>
            <span className="h-px w-10 bg-[var(--rule)]" />
            <span>{cs.role}</span>
          </div>
          <h1 className="mt-6 display text-[44px] md:text-[80px] leading-[1.02] tracking-[-0.02em] max-w-[18ch]">
            {cs.title}
          </h1>
          <p className="mt-8 text-[18px] md:text-[22px] leading-[1.5] max-w-[58ch] text-[var(--fg)]">
            {cs.oneLiner}
          </p>

          <div className="mt-10 flex flex-wrap gap-x-3 gap-y-2 mono text-[11px] uppercase tracking-[0.08em] text-[var(--fg-muted)]">
            {cs.stack.map((s) => (
              <span key={s} className="border border-[var(--rule)] px-2 py-1">
                {s}
              </span>
            ))}
          </div>
        </Container>
      </header>

      {/* Metrics strip */}
      <section className="border-b border-[var(--rule)]">
        <Container className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--rule)]">
          {cs.metrics.map((m) => (
            <div key={m.label} className="py-10 md:py-12 px-0 md:px-8 first:pl-0 last:pr-0">
              <div className="display text-[28px] md:text-[40px] tracking-[-0.01em]">{m.value}</div>
              <div className="mono text-[11px] uppercase tracking-[0.12em] text-[var(--fg-muted)] mt-2">
                {m.label}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Body */}
      <Container className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Side label="01 the problem" />
        <Body>{cs.sections.problem}</Body>

        <Side label="02 the constraint" />
        <Body>{cs.sections.constraint}</Body>

        <Side label="03 the approach" />
        <Body>{cs.sections.approach}</Body>

        <Side label="04 key decisions" />
        <div className="lg:col-span-9 space-y-10">
          {cs.sections.decisions.map((d, i) => (
            <div
              key={d.title}
              className="border-l border-[var(--rule)] pl-6 md:pl-8 hover:border-[var(--accent)] transition-colors"
            >
              <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                decision {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="display text-[22px] md:text-[28px] mt-2">{d.title}</h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.65] max-w-[64ch] text-[var(--fg)]">
                {d.body}
              </p>
            </div>
          ))}
        </div>

        <Side label="05 what i'd do differently" />
        <Body>{cs.sections.different}</Body>

        {/* Evidence panel */}
        <Side label="06 evidence" />
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-3 border border-[var(--rule)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--rule)]">
            {(cs as CaseStudyWithExtras).evidence?.map((e) => (
              <div key={e.metric} className="p-5 space-y-2">
                <div className="display text-[22px] md:text-[26px] leading-tight">{e.metric}</div>
                <div className="text-[13px] text-[var(--fg-muted)]">{e.proof}</div>
                <div className={`mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 inline-block ${
                  e.confidence === "Verified" || e.confidence === "Measured"
                    ? "bg-[var(--accent)] text-[var(--bg)]"
                    : "border border-[var(--rule)] text-[var(--fg-muted)]"
                }`}>{e.confidence}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Failure log */}
        <Side label="07 failure log" />
        <div className="lg:col-span-9 space-y-6">
          <p className="mono text-[12px] text-[var(--fg-muted)] mb-2">What broke, what changed, what I learned.</p>
          {(cs as CaseStudyWithExtras).failureLog?.map((f, i) => (
            <div key={i} className="border border-[var(--rule)] p-5 md:p-6 space-y-3">
              <div className="flex gap-3">
                <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)] shrink-0 pt-[3px]">broke</span>
                <p className="text-[15px] text-[var(--fg)]">{f.what}</p>
              </div>
              <div className="flex gap-3">
                <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-muted)] shrink-0 pt-[3px]">fixed</span>
                <p className="text-[15px] text-[var(--fg)]">{f.changed}</p>
              </div>
              <div className="flex gap-3 border-t border-[var(--rule)] pt-3">
                <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-muted)] shrink-0 pt-[3px]">lesson</span>
                <p className="text-[14px] italic text-[var(--fg-muted)]">{f.learned}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Footer next-link */}
      <Container className="mt-28">
        <div className="border-t border-[var(--rule)] pt-10 flex items-center justify-between">
          <Link
            href="/#work"
            className="mono text-[12px] uppercase tracking-[0.14em] hover:text-[var(--accent)] transition-colors"
          >
            ← all work
          </Link>
          <Link
            href="/#contact"
            className="mono text-[12px] uppercase tracking-[0.14em] hover:text-[var(--accent)] transition-colors"
          >
            get in touch →
          </Link>
        </div>
      </Container>
    </article>
  );
}

function Side({ label }: { label: string }) {
  return (
    <div className="lg:col-span-3">
      <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-muted)] sticky top-24">
        {label}
      </div>
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:col-span-9 reading text-[17px] md:text-[19px] leading-[1.65] text-[var(--fg)] whitespace-pre-line space-y-5">
      {children}
    </div>
  );
}
