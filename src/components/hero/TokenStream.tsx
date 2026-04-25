"use client";

import { useEffect, useRef, useState } from "react";
import { tokenSnippets } from "@/lib/tokens";

/**
 * Behind-the-headline streaming "model output".
 * Looks like real tokens being emitted. Pauses on hover. Loops.
 * Respects prefers-reduced-motion.
 */
export function TokenStream() {
  const [text, setText] = useState("");
  const [snippetIndex, setSnippetIndex] = useState(() =>
    Math.floor(Math.random() * tokenSnippets.length),
  );
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mql.matches;

    if (reducedRef.current) {
      setText(tokenSnippets[snippetIndex]);
      return;
    }

    let cancelled = false;
    const snippet = tokenSnippets[snippetIndex];
    let i = 0;
    let raf = 0;
    let last = performance.now();
    // characters per second — tuned to feel like a real model
    const CPS = 65;
    const HOLD_AFTER_SNIPPET_MS = 2400;

    const tick = (now: number) => {
      if (cancelled) return;
      if (pausedRef.current) {
        last = now;
        raf = requestAnimationFrame(tick);
        return;
      }
      const dt = now - last;
      const advance = Math.floor((dt / 1000) * CPS);
      if (advance > 0) {
        i = Math.min(snippet.length, i + advance);
        setText(snippet.slice(0, i));
        last = now;
      }
      if (i >= snippet.length) {
        setTimeout(() => {
          if (cancelled) return;
          // pick next, avoid repeats
          setSnippetIndex((prev) => {
            let next = prev;
            while (next === prev && tokenSnippets.length > 1) {
              next = Math.floor(Math.random() * tokenSnippets.length);
            }
            return next;
          });
        }, HOLD_AFTER_SNIPPET_MS);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    setText("");
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [snippetIndex]);

  return (
    <pre
      aria-hidden
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      className="mono pointer-events-auto select-none whitespace-pre-wrap text-[12px] md:text-[13px] leading-relaxed text-[var(--fg-muted)] opacity-70"
    >
      {text}
      <span className="inline-block w-[1ch] -mb-[2px] bg-[var(--accent)] opacity-80 animate-[blink_1.05s_steps(2,end)_infinite]">
        &nbsp;
      </span>
      <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
    </pre>
  );
}
