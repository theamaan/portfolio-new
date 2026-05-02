/**
 * Snippets streamed behind the hero headline.
 * Different snippets per role to signal what this engineer works on.
 */

export const tokenSnippets = {
  ai: [
    `> system\nYou are a healthcare translator. Preserve all ICD-10 codes,\nmember IDs, drug names, and provider information verbatim.\nReturn JSON: { protected: [...], translation: "..." }`,

    `def route(paragraph: str) -> Model:\n    if is_clinical(paragraph) or has_legalese(paragraph):\n        return cerebras_qwen_235b\n    return ollama_local`,

    `// retrieved chunks\n[0] policy.pdf  p.42  score=0.91\n[1] policy.pdf  p.43  score=0.88\n[2] guidelines.pdf p.07 score=0.71\n→ answer grounded in [0], [1]`,

    `agent.analyze(doc) ─▶ {\n  protected: ["MEM-883219", "ICD J45.909", "Molina Healthcare"],\n  segments: 14,\n  flagged_clinical: 3\n}`,

    `# standup → report\nfor speaker, lines in transcript.groupby("speaker"):\n    yield extract(lines, schema=DailyUpdate)`,

    `> reduce_hallucinations()\n  ✓ ground every claim in source\n  ✓ refuse if confidence < 0.6\n  ✓ cite page numbers, not vibes`,
  ],

  backend: [
    `// clean architecture\nnamespace Domain {\n  public class Employee {\n    public int Id { get; set; }\n    public string Name { get; set; }\n  }\n}`,

    `public interface IEmployeeRepository {\n  Task<Employee> GetById(int id);\n  Task Save(Employee employee);\n}`,

    `// http adapter\n[HttpPost("weather/search")]\npublic async Task<IActionResult> SearchCity(string query) {\n  var result = await _weatherService.GetByCity(query);\n  return Ok(new WeatherResponse { ... });\n}`,

    `// proxy pattern\napp.Use(async (context, next) => {\n  context.Request.Headers.Add("X-API-Key", _config["OpenWeather:Key"]);\n  var response = await _httpClient.SendAsync(context.Request);\n  context.Response = response;\n});`,

    `// responsive grid\n@media (max-width: 768px) {\n  .hero { grid-template-columns: 1fr; }\n  .card { transform: none; }\n}\n@media (prefers-reduced-motion) { ... }`,

    `// state machine\nswitch (employee.Status) {\n  case EmployeeStatus.Active:\n    return employee.IsAvailable ? Available : Busy;\n  case EmployeeStatus.OnLeave:\n    return OnLeave;\n}`,
  ],

  data: [
    `SELECT\n  raw_claims.claim_id,\n  clean_members.member_name,\n  enriched_claims.risk_score\nFROM raw_claims\nINNER JOIN clean_members\n  ON raw_claims.member_id = clean_members.id`,

    `-- lineage: raw_claims → clean_claims\n-- impact: score 1.0 (direct)\n-- affected: silver.enriched_claims, gold.claims_summary\nCREATE OR REPLACE TABLE clean_claims AS\nSELECT *, CURRENT_TIMESTAMP() as loaded_at\nFROM raw_claims\nWHERE is_valid = true`,

    `# impact analysis\ngraph = lineage_extractor.parse_sql(transformations)\nimpacted = graph.bfs(start="raw_claims")\nfor table, score in impacted:\n  print(f"{table}: {score:.2f}")`,

    `CREATE EXTERNAL TABLE schema.provider_performance\nUSING PARQUET\nLOCATION 's3://data-lake/gold/provider_performance/'`,

    `-- column lineage\nraw_claims.amount → clean_claims.claim_amount\n  → enriched_claims.total_amount\n  → gold.claims_summary.monthly_total\n  → gold.provider_performance.provider_revenue`,

    `with recursive lineage as (\n  select table_name, 1 as depth from base_tables\n  union all\n  select child_table, depth + 1\n  from lineage\n  where depth < 5\n)\nselect * from lineage order by depth;`,
  ],
} as const;

export type RoleType = "ai" | "backend" | "data";
