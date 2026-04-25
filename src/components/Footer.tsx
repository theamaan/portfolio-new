import { Container } from "./primitives";

export function Footer() {
  return (
    <footer className="border-t border-[var(--rule)] py-10">
      <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
        <div>© {new Date().getFullYear()} aman ullah · chennai</div>
        <div className="flex items-center gap-5">
          <span>writing — soon</span>
          <span>·</span>
          <a href="https://github.com/theamaan" target="_blank" rel="noreferrer" className="hover:text-[var(--fg)]">
            github
          </a>
          <a
            href="https://linkedin.com/in/amaanullah13"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--fg)]"
          >
            linkedin
          </a>
          <a href="mailto:theamaan13@gmail.com" className="hover:text-[var(--fg)]">
            email
          </a>
        </div>
      </Container>
    </footer>
  );
}
