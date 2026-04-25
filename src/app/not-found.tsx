import { Container } from "@/components/primitives";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-32 md:py-48">
      <Container>
        <div className="mono text-[12px] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
          404 · not found
        </div>
        <h1 className="display text-[48px] md:text-[88px] mt-6 max-w-[18ch]">
          That page doesn’t exist. <span className="text-[var(--fg-muted)]">Yet.</span>
        </h1>
        <Link
          href="/"
          className="mt-10 inline-flex mono text-[12px] uppercase tracking-[0.16em] hover:text-[var(--accent)] transition-colors"
        >
          ← back to home
        </Link>
      </Container>
    </section>
  );
}
