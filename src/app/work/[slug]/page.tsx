import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { caseStudies, type CaseStudySlug } from "@/lib/case-studies";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const cs = (caseStudies as Record<string, (typeof caseStudies)[CaseStudySlug]>)[slug];
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.oneLiner,
    openGraph: { title: cs.title, description: cs.oneLiner },
  };
}

export default async function WorkPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!(slug in caseStudies)) notFound();
  return <CaseStudy slug={slug as CaseStudySlug} />;
}
