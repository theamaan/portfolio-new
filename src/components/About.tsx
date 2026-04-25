import { Container, SectionLabel } from "./primitives";

export function About() {
  return (
    <section id="about" className="border-b border-[var(--rule)] py-24 md:py-32">
      <Container>
        <SectionLabel>02 — about</SectionLabel>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6 reading text-[17px] md:text-[19px] leading-[1.6] text-[var(--fg)]">
            <p>
              I’m Aman. I write Python for a living and build LLM systems for the parts of the
              job nobody wants to do twice.
            </p>
            <p>
              Most of my work starts the same way: someone shows me a workflow that takes hours
              and three humans, and I go quiet for a week. What comes back is usually a pipeline,
              sometimes a model, occasionally an opinion about why the original problem shouldn’t
              have existed.
            </p>
            <p>
              Right now I’m at Infinite Computer Solutions in Chennai, building an AI letter
              translator for healthcare documents — the kind of system where a wrong translation
              has consequences, so it has to be right <em>and</em> explainable. Before that I
              was automating .NET workflows and writing Selenium scripts that refused to break.
            </p>
            <p>
              I read a lot. I think Julia Evans is right about almost everything. I believe most
              "AI products" are prompts in a trench coat, and I’d rather build the boring 90%
              that makes them actually work.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-[var(--rule)] p-6 md:p-7 bg-[var(--bg-elev)]">
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-muted)] mb-5 flex items-center gap-2">
                <span className="inline-block h-[6px] w-[6px] rounded-full bg-[var(--accent)]" />
                now
              </div>
              <dl className="space-y-4 text-[14px]">
                <NowRow term="role" desc="AI Engineer · Infinite Computer Solutions" />
                <NowRow term="city" desc="Chennai, India" />
                <NowRow
                  term="building"
                  desc="An agentic letter translator for 18+ languages without ever touching a member ID."
                />
                <NowRow
                  term="learning"
                  desc="Eval pipelines for LLMs · diarization-first standup tooling"
                />
                <NowRow term="reading" desc="Designing Data-Intensive Applications · Julia Evans zines" />
                <NowRow term="status" desc="Open to SDE-2 / AI Engineer roles across India" />
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function NowRow({ term, desc }: { term: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <dt className="mono text-[11px] uppercase tracking-[0.12em] text-[var(--fg-muted)] w-20 shrink-0 pt-[3px]">
        {term}
      </dt>
      <dd className="text-[var(--fg)] leading-snug">{desc}</dd>
    </div>
  );
}
