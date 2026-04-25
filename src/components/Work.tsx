import Link from "next/link";
import { Container, SectionLabel } from "./primitives";
import { projects } from "@/lib/projects";

export function Work() {
  return (
    <section id="work" className="border-b border-[var(--rule)] py-24 md:py-32">
      <Container>
        <SectionLabel>03 — selected work</SectionLabel>

        <div className="mt-12 flex items-end justify-between flex-wrap gap-6">
          <h2 className="display text-[36px] md:text-[56px] max-w-[18ch]">
            Four projects. <span className="text-[var(--fg-muted)]">All shipped, or shipping.</span>
          </h2>
          <p className="mono text-[12px] text-[var(--fg-muted)] max-w-[28ch]">
            Pick one. Each row opens into a case study with the trade-offs, not the brochure.
          </p>
        </div>

        <ul className="mt-16 border-t border-[var(--rule)]">
          {projects.map((p) => (
            <li key={p.slug} className="border-b border-[var(--rule)]">
              <Link
                href={`/work/${p.slug}`}
                className="group block py-7 md:py-9 transition-colors hover:bg-[var(--bg-elev)]"
              >
                <div className="grid grid-cols-12 gap-6 items-start">
                  <div className="col-span-2 md:col-span-1 mono text-[12px] text-[var(--fg-muted)] pt-1">
                    {p.number}
                  </div>
                  <div className="col-span-10 md:col-span-7">
                    <h3 className="display text-[24px] md:text-[36px] leading-tight tracking-[-0.01em] group-hover:text-[var(--accent)] transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[15px] md:text-[16px] text-[var(--fg)] max-w-[58ch] leading-relaxed">
                      {p.blurb}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 mono text-[11px] uppercase tracking-[0.08em] text-[var(--fg-muted)]">
                      {p.stack.map((s) => (
                        <span key={s}>· {s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:flex col-span-3 items-start justify-end">
                    <p className="mono text-[12px] text-[var(--fg-muted)] italic max-w-[22ch] text-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      “{p.pullQuote}”
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-1 flex md:justify-end items-center">
                    <span className="mono text-[12px] text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors">
                      {p.year} →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
