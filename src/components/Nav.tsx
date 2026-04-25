import Link from "next/link";
import { Container } from "./primitives";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--bg)_80%,transparent)] border-b border-[var(--rule)]">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="mono text-[13px] tracking-tight">
          aman<span className="text-[var(--accent)]">·</span>ullah
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 mono text-[12px] tracking-[0.04em] text-[var(--fg-muted)]">
          <a href="/#work" className="hover:text-[var(--fg)] transition-colors">work</a>
          <a href="/#about" className="hover:text-[var(--fg)] transition-colors">about</a>
          <a href="/#experience" className="hover:text-[var(--fg)] transition-colors">experience</a>
          <a href="/#contact" className="hover:text-[var(--fg)] transition-colors">contact</a>
        </nav>
        <ThemeToggle />
      </Container>
    </header>
  );
}
