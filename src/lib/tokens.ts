/**
 * Snippets streamed behind the hero headline.
 * Looks like real model output. Implies "this person works with models"
 * without ever saying so.
 */
export const tokenSnippets: string[] = [
  `> system\nYou are a healthcare translator. Preserve all ICD-10 codes,\nmember IDs, drug names, and provider information verbatim.\nReturn JSON: { protected: [...], translation: "..." }`,

  `def route(paragraph: str) -> Model:\n    if is_clinical(paragraph) or has_legalese(paragraph):\n        return cerebras_qwen_235b\n    return ollama_local`,

  `// retrieved chunks\n[0] policy.pdf  p.42  score=0.91\n[1] policy.pdf  p.43  score=0.88\n[2] guidelines.pdf p.07 score=0.71\n→ answer grounded in [0], [1]`,

  `agent.analyze(doc) ─▶ {\n  protected: ["MEM-883219", "ICD J45.909", "Molina Healthcare"],\n  segments: 14,\n  flagged_clinical: 3\n}`,

  `# standup → report\nfor speaker, lines in transcript.groupby("speaker"):\n    yield extract(lines, schema=DailyUpdate)`,

  `> reduce_hallucinations()\n  ✓ ground every claim in source\n  ✓ refuse if confidence < 0.6\n  ✓ cite page numbers, not vibes`,
];
