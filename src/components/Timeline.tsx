import { Container, SectionLabel } from "./primitives";
import { timeline } from "@/lib/timeline";

export function Timeline() {
  return (
    <section id="experience" className="border-b border-[var(--rule)] py-24 md:py-32">
      <Container>
        <SectionLabel>04 — experience</SectionLabel>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-4 display text-[32px] md:text-[44px] leading-[1.05] max-w-[16ch]">
            A short career, <br />
            <span className="text-[var(--fg-muted)]">but a deliberate one.</span>
          </h2>

          <ol className="lg:col-span-8 space-y-10">
            {timeline.map((t) => (
              <li
                key={t.range + t.company}
                className="grid grid-cols-12 gap-4 border-t border-[var(--rule)] pt-6"
              >
                <div className="col-span-12 md:col-span-3 mono text-[12px] uppercase tracking-[0.08em] text-[var(--fg-muted)] pt-1">
                  {t.range}
                </div>
                <div className="col-span-12 md:col-span-9 space-y-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="display text-[22px] md:text-[26px]">{t.role}</span>
                    <span className="mono text-[12px] text-[var(--fg-muted)]">·</span>
                    <span className="text-[16px] md:text-[18px]">{t.company}</span>
                    <span className="mono text-[11px] text-[var(--fg-muted)]">{t.location}</span>
                  </div>
                  <p className="text-[15px] md:text-[16px] leading-relaxed max-w-[62ch] text-[var(--fg)]">
                    {t.line}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
