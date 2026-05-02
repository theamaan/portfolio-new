"use client";

import { Container, SectionLabel } from "./primitives";
import { useSite } from "@/lib/site-context";

const ABOUT_CONTENT = {
  ai: {
    intro: "I'm Aman. I write Python for a living and build LLM systems for the parts of the job nobody wants to do twice.",
    body1: "Most of my work starts the same way: someone shows me a workflow that takes hours and three humans, and I go quiet for a week. What comes back is usually a pipeline, sometimes a model, occasionally an opinion about why the original problem shouldn't have existed.",
    body2: "Right now I'm at Infinite Computer Solutions in Chennai, building an AI letter translator for healthcare documents — the kind of system where a wrong translation has consequences, so it has to be right and explainable. Before that I was automating .NET workflows and writing Selenium scripts that refused to break.",
    body3: "I read a lot. I think Julia Evans is right about almost everything. I believe most 'AI products' are prompts in a trench coat, and I'd rather build the boring 90% that makes them actually work.",
    nowRole: "AI Engineer · Infinite Computer Solutions",
    nowBuilding: "An agentic letter translator for 18+ languages without ever touching a member ID.",
    nowLearning: "Eval pipelines for LLMs · diarization-first standup tooling",
  },
  backend: {
    intro: "I'm Aman. I write clean code that runs for years without catching on fire. I build the plumbing: APIs, databases, layers, patterns.",
    body1: "My philosophy: boring beats clever. If your code needs a whiteboard explanation, you've lost. I design systems that are testable, observable, and predictable. Dependency inversion isn't abstract — it means swapping out your database in unit tests and it working.",
    body2: "I've shipped production systems in .NET, Python, and Go. Currently at Infinite Computer Solutions, but I've built inventory systems, healthcare workflows, and employee management systems that are still running without panic pages. I care about auth, validation, logging, and error recovery — the invisible stuff that makes reliability possible.",
    body3: "I read a lot. I believe most performance problems are architecture problems wearing performance hats. I'd rather spend two hours designing the right layers than two weeks debugging a tangled mess.",
    nowRole: "Backend Engineer · Infinite Computer Solutions",
    nowBuilding: "Production systems that don't rely on luck or monitoring heroics.",
    nowLearning: "Distributed tracing · event sourcing patterns",
  },
  data: {
    intro: "I'm Aman. I build data pipelines and instruments to know when they break. I think in DAGs, schemas, and impact scoring.",
    body1: "Most data teams fly blind. They deploy a transformation, and nobody knows what downstream depends on it. I build systems that answer 'if I change this table, what breaks?' before production finds out the hard way. Lineage isn't optional — it's infrastructure.",
    body2: "I'm certified in Microsoft Fabric and hands-on with Databricks, Spark SQL, Delta Lake, and Azure Data Factory. I've designed medallion architectures, built lineage graphs, and instrumented pipelines so teams can act instead of react. Currently at Infinite Computer Solutions, supporting healthcare data warehouses that have to be right.",
    body3: "I read a lot. I think dbt is the best thing to happen to analytics engineering because it made lineage legible. I believe a good data model beats a good query every time, and I'd rather refactor the schema than paper over it with a view.",
    nowRole: "Data Engineer · Infinite Computer Solutions",
    nowBuilding: "Lineage systems that make impact visible. Pipelines that alert when they leak.",
    nowLearning: "Column-level lineage · cost optimization on medallion layers",
  },
} as const;

export function About() {
  const { role } = useSite();
  const content = ABOUT_CONTENT[role as keyof typeof ABOUT_CONTENT];

  return (
    <section id="about" className="border-b border-[var(--rule)] py-24 md:py-32">
      <Container>
        <SectionLabel>02 — about</SectionLabel>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6 reading text-[17px] md:text-[19px] leading-[1.6] text-[var(--fg)]">
            <p>{content.intro}</p>
            <p>{content.body1}</p>
            <p>{content.body2}</p>
            <p>{content.body3}</p>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-[var(--rule)] p-6 md:p-7 bg-[var(--bg-elev)]">
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-muted)] mb-5 flex items-center gap-2">
                <span className="inline-block h-[6px] w-[6px] rounded-full bg-[var(--accent)]" />
                now
              </div>
              <dl className="space-y-4 text-[14px]">
                <NowRow term="role" desc={content.nowRole} />
                <NowRow term="city" desc="Chennai, India" />
                <NowRow term="building" desc={content.nowBuilding} />
                <NowRow term="learning" desc={content.nowLearning} />
                <NowRow term="reading" desc="Designing Data-Intensive Applications · Julia Evans zines" />
                <NowRow term="status" desc="Open to SDE-2 / roles across India" />
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
