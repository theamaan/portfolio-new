"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Command = {
  id: string;
  label: string;
  hint: string;
  action: () => void;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commands: Command[] = [
    { id: "work",       label: "Go to Work",         hint: "Selected projects",       action: () => scrollTo("work") },
    { id: "about",      label: "Go to About",         hint: "Who I am",               action: () => scrollTo("about") },
    { id: "experience", label: "Go to Experience",    hint: "Career timeline",         action: () => scrollTo("experience") },
    { id: "contact",    label: "Go to Contact",       hint: "Email + links",           action: () => scrollTo("contact") },
    { id: "p1",         label: "Open: AI Letter Translator",     hint: "Case study 01", action: () => router.push("/work/ai-letter-translator") },
    { id: "p2",         label: "Open: Healthcare RAG Assistant", hint: "Case study 02", action: () => router.push("/work/healthcare-rag-assistant") },
    { id: "p3",         label: "Open: AI Meeting Intelligence",  hint: "Case study 03", action: () => router.push("/work/ai-meeting-automation-guide") },
    { id: "p4",         label: "Open: Employee Management",      hint: "Case study 04", action: () => router.push("/work/employee-management-system") },
    {
      id: "email",
      label: "Copy email address",
      hint: "theamaan13@gmail.com",
      action: () => {
        navigator.clipboard.writeText("theamaan13@gmail.com").catch(() => {});
        setOpen(false);
      },
    },
    {
      id: "resume",
      label: "Download resume",
      hint: "PDF",
      action: () => {
        const a = document.createElement("a");
        a.href = "/aman-ullah-resume.pdf";
        a.download = "Aman-Ullah-Resume.pdf";
        a.click();
        setOpen(false);
      },
    },
    {
      id: "github",
      label: "Open GitHub",
      hint: "github.com/theamaan",
      action: () => { window.open("https://github.com/theamaan", "_blank", "noreferrer"); setOpen(false); },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      hint: "linkedin.com/in/amaanullah13",
      action: () => { window.open("https://linkedin.com/in/amaanullah13", "_blank", "noreferrer"); setOpen(false); },
    },
  ];

  const filtered = query.trim() === ""
    ? commands
    : commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.hint.toLowerCase().includes(query.toLowerCase()),
      );

  const run = useCallback(
    (cmd: Command) => {
      setOpen(false);
      setQuery("");
      setSelected(0);
      cmd.action();
    },
    [],
  );

  // Open with / or Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setSelected(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setQuery(""); }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && filtered[selected]) { run(filtered[selected]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, run]);

  // Auto-focus input
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  // Reset selected on query change
  useEffect(() => { setSelected(0); }, [query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--bg)] opacity-80 backdrop-blur-sm"
        onClick={() => { setOpen(false); setQuery(""); }}
      />

      {/* Panel */}
      <div className="relative w-full max-w-[600px] mx-4 bg-[var(--bg-elev)] border border-[var(--rule)] shadow-2xl overflow-hidden">
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--rule)]">
          <span className="mono text-[13px] text-[var(--accent)]">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent mono text-[14px] text-[var(--fg)] placeholder:text-[var(--fg-muted)] outline-none"
          />
          <kbd className="mono text-[10px] text-[var(--fg-muted)] border border-[var(--rule)] px-1.5 py-0.5">
            esc
          </kbd>
        </div>

        {/* Results */}
        <ul className="max-h-[360px] overflow-y-auto py-1" role="listbox">
          {filtered.length === 0 && (
            <li className="px-4 py-4 mono text-[12px] text-[var(--fg-muted)] text-center">
              No results for &quot;{query}&quot;
            </li>
          )}
          {filtered.map((cmd, i) => (
            <li
              key={cmd.id}
              role="option"
              aria-selected={i === selected}
              onMouseEnter={() => setSelected(i)}
              onClick={() => run(cmd)}
              className={`flex items-center justify-between gap-4 px-4 py-2.5 cursor-pointer transition-colors ${
                i === selected
                  ? "bg-[var(--rule)] text-[var(--fg)]"
                  : "text-[var(--fg)]"
              }`}
            >
              <span className="text-[14px]">{cmd.label}</span>
              <span className="mono text-[11px] text-[var(--fg-muted)] shrink-0">{cmd.hint}</span>
            </li>
          ))}
        </ul>

        {/* Footer hint */}
        <div className="border-t border-[var(--rule)] px-4 py-2 flex items-center gap-4 mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
          <span><kbd className="border border-[var(--rule)] px-1">↑↓</kbd> navigate</span>
          <span><kbd className="border border-[var(--rule)] px-1">↵</kbd> select</span>
          <span><kbd className="border border-[var(--rule)] px-1">esc</kbd> close</span>
          <span className="ml-auto">press <kbd className="border border-[var(--rule)] px-1">/</kbd> anytime</span>
        </div>
      </div>
    </div>
  );
}
