import { Container, SectionLabel } from "./primitives";
import { capabilities } from "@/lib/capabilities";

export function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-[var(--rule)] py-24 md:py-32">
      <Container>
        <SectionLabel>05 — capabilities</SectionLabel>

        <div className="mt-12 flex items-end justify-between flex-wrap gap-6">
          <h2 className="display text-[32px] md:text-[44px] max-w-[20ch]">
            Tools I reach for first.
            <br />
            <span className="text-[var(--fg-muted)]">I’ll learn the rest when the work asks.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {capabilities.map((group) => (
            <div key={group.heading}>
              <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-muted)] pb-3 border-b border-[var(--rule)]">
                {group.heading}
              </div>
              <ul className="mt-5 space-y-2.5 text-[15px]">
                {group.items.map((item) => (
                  <li key={item} className="text-[var(--fg)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
