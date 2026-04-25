import { Container } from "../primitives";
import { TokenStream } from "./TokenStream";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--rule)]">
      <Container className="relative pt-24 pb-28 md:pt-36 md:pb-40 min-h-[88vh] flex flex-col justify-between">
        {/* Background token stream */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-end pr-6 md:pr-16"
        >
          <div className="w-full max-w-[640px] opacity-90">
            <TokenStream />
          </div>
        </div>

        {/* Top meta */}
        <div className="relative flex items-center gap-3 mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          <span className="inline-block h-[6px] w-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
          <span>currently · ai engineer @ infinite computer solutions</span>
        </div>

        {/* Headline */}
        <div className="relative mt-12 md:mt-16">
          <h1 className="display text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] max-w-[14ch]">
            Most AI demos break <br className="hidden md:block" />
            in production.
            <br />
            <span className="text-[var(--fg-muted)]">I build the ones that don’t.</span>
          </h1>
          <p className="mono text-[12px] md:text-[13px] text-[var(--fg-muted)] mt-8 max-w-[60ch] leading-relaxed">
            Aman Ullah · AI / LLM Engineer · Chennai · Backend brain, automation reflex.
            <br />
            Currently shipping a healthcare letter translator that turned a 24-hour workflow
            into a couple of minutes.
          </p>
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
            scroll ↓
          </div>
        </div>
      </Container>
    </section>
  );
}
