import { Container, SectionLabel } from "./primitives";

export function Contact() {
  return (
    <section id="contact" className="py-28 md:py-40">
      <Container>
        <SectionLabel>06 — contact</SectionLabel>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <h2 className="display text-[44px] sm:text-[64px] md:text-[88px] leading-[0.98] tracking-[-0.02em]">
              Got a hard problem
              <br />
              <span className="text-[var(--fg-muted)]">that should already be automated?</span>
            </h2>
            <p className="mt-8 mono text-[13px] text-[var(--fg-muted)] max-w-[58ch]">
              I read everything. I reply to most things.
            </p>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <ContactRow label="email" value="theamaan13@gmail.com" href="mailto:theamaan13@gmail.com" />
            <ContactRow label="github" value="github.com/theamaan" href="https://github.com/theamaan" external />
            <ContactRow
              label="linkedin"
              value="linkedin.com/in/amaanullah13"
              href="https://linkedin.com/in/amaanullah13"
              external
            />
            <ContactRow label="resume" value="download · pdf" href="/aman-ullah-resume.pdf" external />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group flex items-baseline justify-between gap-4 border-t border-[var(--rule)] py-3 hover:text-[var(--accent)] transition-colors"
    >
      <span className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors">
        {label}
      </span>
      <span className="text-[15px] inline-flex items-center gap-2">
        {value}
        <span aria-hidden className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  );
}
