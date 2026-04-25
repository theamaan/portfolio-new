import Link from "next/link";
import type { ComponentProps } from "react";

export function SectionLabel({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="section-label flex items-center gap-3">
      <span>{children}</span>
      <span className="h-px flex-1 bg-[var(--rule)]" />
    </div>
  );
}

export function Rule() {
  return <div className="rule" />;
}

export function ArrowLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const Comp: React.ElementType = external ? "a" : Link;
  const extra = external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <Comp
      href={href}
      {...extra}
      className={`group inline-flex items-center gap-2 text-[var(--fg)] hover:text-[var(--accent)] transition-colors ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </Comp>
  );
}

export function Container({ children, className = "" }: ComponentProps<"div">) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-6 md:px-10 ${className}`}>{children}</div>
  );
}
