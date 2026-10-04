# AGENTS.md — Lexora (English Learning System)

## Project Overview

**Lexora** is a personal English vocabulary learning system built on a 5-step cognitive methodology: **Context > Understand > Recall > Output > Review Rating**. It uses spaced repetition (SM-2) and 3D knowledge scoring (Recognition, Recall, Production) to track mastery across vocabulary items.

**Product name**: Lexora
**Monorepo name**: `lexora` (v0.1.0)
**Brand colors**: Indigo `#4F46E5` (primary), Amber `#F59E0B` (accent)

---

## Repository Structure

```
english-learning-system/          # Monorepo root (pnpm workspaces)
├── apps/
│   ├── backend/                  # @lexora/backend — Fastify + SQLite API
│   │   ├── src/
│   │   │   ├── db/               # Schema (Drizzle ORM) + connection client
│   │   │   ├── domain/           # Pure business logic (no I/O)
│   │   │   │   ├── spaced-repetition/  # SM-2 algorithm
│   │   │   │   ├── knowledge/          # 3D assessment + state machine
│   │   │   │   └── text/               # Normalization, cloze, typo checking
│   │   │   ├── repositories/     # Database query layer (Drizzle)
│   │   │   ├── schemas/          # Zod request/response validation
│   │   │   ├── services/         # Business orchestration layer
│   │   │   └── routes/           # Fastify route plugins
│   │   └── tests/                # Vitest tests (unit + integration)
│   └── frontend/                 # @lexora/frontend — React + Vite SPA
│       └── (scaffolding pending)
├── docs/
│   ├── architecture/             # DB schema, diagrams, brand brief, system prompt
│   ├── modules/                  # PRD specs for modules 01-07
│   └── plans/                    # Implementation roadmap
├── .agents/
│   ├── rules/                    # Always-on coding rules
│   └── skills/                   # Specialized agent skill packs
├── package.json                  # Workspace root
├── pnpm-workspace.yaml           # pnpm workspace definition
├── tsconfig.base.json            # Shared TypeScript config
└── AGENTS.md                     # This file
```

---

## Tech Stack

| Layer      | Technology                                                         |
| ---------- | ------------------------------------------------------------------ |
| Runtime    | Node.js, ES Modules (`"type": "module"`)                           |
| Language   | TypeScript 5.5+ (`strict: true`, target `ES2022`, `Bundler` mode)  |
| Backend    | Fastify 4, `@fastify/cors`                                        |
| Database   | SQLite via `better-sqlite3`, Drizzle ORM, `drizzle-kit`           |
| Validation | Zod 3                                                              |
| Logging    | Pino 9                                                             |
| Frontend   | React 18, Vite 5, TailwindCSS 3, React Router 6                   |
| State      | Zustand 4 (client/UI), TanStack React Query 5 (server/cache)      |
| Charts     | Recharts 2                                                         |
| Icons      | Lucide React                                                       |
| Testing    | Vitest 2, `@testing-library/react`, `jsdom`                       |
| Monorepo   | pnpm workspaces (`apps/*`)                                         |

---

## Commands

```bash
# From monorepo root
pnpm dev          # Start all workspaces in dev mode
pnpm build        # Build all workspaces
pnpm test         # Run all workspace tests

# Backend only
pnpm --filter @lexora/backend dev    # tsx watch src/server.ts
pnpm --filter @lexora/backend test   # vitest run

# Frontend only
pnpm --filter @lexora/frontend dev   # vite dev server
pnpm --filter @lexora/frontend test  # vitest run --passWithNoTests
```

---

## Graphify (Knowledge Graph)

Use Graphify first for codebase questions, architecture exploration, dependency tracing, and change-impact analysis. The project graph lives in `graphify-out/`; it maps code and documentation, not learner vocabulary or runtime database records.

### Entry Points

- Read `.agents/skills/graphify/SKILL.md` before using Graphify. Load `references/query.md` for traversal and `references/update.md` for incremental updates.
- `graphify-out/GRAPH_REPORT.md`: architecture overview, communities, hubs, and graph freshness.
- `graphify-out/graph.json`: queryable nodes and edges, with source references and confidence tags.
- `graphify-out/graph.html`: interactive visualization; open only when visual exploration is useful.
- Run CLI commands from the monorepo root so they find `graphify-out/graph.json`.

### Research Workflow

1. Check whether `graphify-out/graph.json` exists. Reuse the existing graph; do not rebuild it for every question.
2. Read the report's freshness information. A matching commit does not guarantee freshness when working files have changed. Treat stale graph results as navigation hints and verify against current files.
3. Expand the question using actual node-label vocabulary, following `references/query.md`. Queries use literal matching, not synonyms or cross-language matching: map Vietnamese questions to relevant English labels present in the graph.
4. Query the relevant neighborhood, then read only the referenced source sections and affected callers. Use LSP references when available for exact symbol/caller analysis; the graph does not replace code intelligence or tests.
5. Cite `source_file` / `source_location` for concrete claims. Preserve `EXTRACTED`, `INFERRED`, and `AMBIGUOUS` distinctions; never present inferred relationships as verified facts. Missing edges do not prove absence of dependencies.

```bash
# Terminal CLI; these labels/tokens exist in the Lexora graph
graphify query "vocabulary service repository" --budget 1500
graphify query "review service" --dfs --budget 1500
graphify path "VocabularyService" "VocabularyRepository"
graphify explain "VocabularyService"
```

BFS (default) explores nearby context; `--dfs` traces deeper relationships; `path` finds a shortest connection. Check the JSON `directed` flag before interpreting direction: an undirected path shows connectivity, not a verified call chain.

### Keeping the Graph Current

```bash
# Terminal CLI: refresh code structure after code changes
graphify update .
```

- After code changes, refresh the graph before relying on it for further analysis. The code update uses local AST extraction and needs no LLM API key.
- For documentation or other semantic-content changes, invoke `/graphify . --update` through the agent skill. Do not assume the code-only CLI update refreshes semantic relationships.
- If the graph is missing, invoke `/graphify .` through the skill to build it when graph exploration is needed. Slash commands are agent invocations, not shell commands.
- If the CLI is unavailable, use the JSON/NetworkX fallback in `references/query.md`. If graph tooling cannot run, continue with targeted source/LSP research and report the limitation.
- Do not manually edit generated nodes/edges, force past shrink guards, install Git hooks, or add graph exports unless requested.

---

## Architecture Layers (Backend)

The backend follows strict layered separation. Dependencies flow **downward only** — routes never import repositories directly, services never import routes.

```
Routes  ->  Services  ->  Repositories  ->  DB (Drizzle/SQLite)
                |
            Domain (pure functions, no I/O)
```

| Layer          | Directory       | Responsibility                                                      |
| -------------- | --------------- | ------------------------------------------------------------------- |
| **Routes**     | `src/routes/`   | HTTP parsing, Zod validation, status codes, error mapping           |
| **Schemas**    | `src/schemas/`  | Zod schemas for request/response shapes, type inference             |
| **Services**   | `src/services/` | Business logic orchestration, domain error throwing                 |
| **Repositories** | `src/repositories/` | Drizzle ORM queries, raw data access                          |
| **Domain**     | `src/domain/`   | Pure algorithmic logic (SM-2, scoring, text processing) — no DB/HTTP |
| **DB**         | `src/db/`       | Table definitions (`schema.ts`), connection management (`client.ts`) |

---

## Domain Invariants

These rules are non-negotiable. Any code that violates them is a bug.

### API Response Envelope

All REST endpoints return a uniform envelope:

```typescript
// Success
{ success: true, data: T }

// Error
{ success: false, error: { code: string, message: string, details?: unknown } }
```

### Database Constraints

- Primary keys are `TEXT` (UUID/string).
- Timestamps stored as ISO 8601 strings (`TEXT`).
- Foreign keys enforce `ON DELETE CASCADE`.
- Every connection must enable `PRAGMA foreign_keys = ON`.
- Persistent (non-memory) databases use WAL mode.
- Indexes required on all foreign keys, lookup terms (`word`), and query filters (`due_at`, `created_at`).

### Spaced Repetition (SM-2)

- Ease Factor (EF) initialized at **2.5**, clamped to minimum **1.3**.
- First interval: 1 day. Second interval: 6 days. Subsequent: `I(n) = I(n-1) * EF`.
- Rating AGAIN (grade < 3) resets repetitions to 0, interval to 1, and increments lapses.
- Implementation: `apps/backend/src/domain/spaced-repetition/sm2.ts`

### 3D Knowledge Scoring

- Three dimensions: **Recognition** (0-100%), **Recall** (0-100%), **Production** (0-100%).
- State progression: `NEW` -> `LEARNING` -> `FAMILIAR` -> `MASTERED` -> `MAINTENANCE`.
- Transitions are strictly one-directional (no skipping states).
- Implementation: `apps/backend/src/domain/knowledge/assessment.ts`

### Learning Session Pipeline

The cognitive flow is strictly sequential — steps cannot be skipped:

```
Context -> Understand -> Recall -> Output -> Review Rating
```

---

## Error Handling

Routes catch and map domain errors to HTTP responses:

| Error Class       | HTTP Status | Error Code          |
| ----------------- | ----------- | ------------------- |
| `ZodError`        | 400         | `VALIDATION_ERROR`  |
| `BadRequestError` | 400         | `BAD_REQUEST`       |
| `NotFoundError`   | 404         | `NOT_FOUND`         |
| `ConflictError`   | 409         | `CONFLICT`          |
| Unhandled         | 500         | `INTERNAL_ERROR`    |

All custom errors extend `AppError` (defined in `apps/backend/src/services/vocabulary.service.ts`).

---

## Naming Conventions

| Target                 | Convention       | Example                                    |
| ---------------------- | ---------------- | ------------------------------------------ |
| Files                  | kebab-case       | `vocabulary.routes.ts`, `context.schema.ts` |
| Classes & Types        | PascalCase       | `VocabularyService`, `AssessmentResult`     |
| Variables & Functions  | camelCase        | `calculateDimensionScores`, `getDb`         |
| Constants & Enums      | UPPER_SNAKE_CASE | `MIN_EASE_FACTOR`, `DEFAULT_EASE_FACTOR`    |
| Database tables        | snake_case       | `learning_progress`, `review_states`        |
| API routes             | kebab-case       | `/api/words`, `/api/contexts`               |

---

## File Size Limits

| File Type           | Max Lines | Action When Exceeded                          |
| ------------------- | --------- | --------------------------------------------- |
| Components (tsx/jsx) | 200-300  | Split into smaller components or extract hooks |
| Utilities            | 150-200  | Group by domain, split into focused modules    |
| Route handlers       | 100-150  | Extract business logic to services             |
| Test files           | 300-400  | Group by feature with `describe` blocks        |
| Config files         | 100      | Split into separate config files               |

Every new file must include a `@file` / `@description` header comment.

---

## Testing Patterns

- **Framework**: Vitest (`describe`, `it`, `expect`, `beforeEach`, `afterEach`).
- **Database isolation**: Each integration test creates an in-memory SQLite via `getDb(':memory:')`, runs DDL in `beforeEach`, closes in `afterEach`.
- **HTTP testing**: Fastify `app.inject()` — no real TCP binding.
- **Domain testing**: Pure function tests with boundary conditions, edge cases, and deterministic mock dates.

### Test file locations

```
apps/backend/tests/
├── sanity.test.ts                    # Harness sanity check
├── db/schema.test.ts                 # Schema, FK, WAL mode constraints
├── domain/
│   ├── sm2.test.ts                   # SM-2 algorithm unit tests
│   ├── assessment.test.ts            # 3D knowledge scoring tests
│   └── text.test.ts                  # Normalization, Levenshtein, cloze
└── routes/
    ├── vocabulary.routes.test.ts     # /api/words CRUD integration
    └── context.routes.test.ts        # /api/contexts CRUD + word linking
```

---

## Business Modules

The system is built around 7 functional modules. Each has a detailed PRD in `docs/modules/`:

| #  | Module                     | Status       | Spec                                        |
| -- | -------------------------- | ------------ | ------------------------------------------- |
| 01 | Vocabulary Management      | Implemented  | `docs/modules/01-vocabulary-management.md`   |
| 02 | Context Management         | Implemented  | `docs/modules/02-context-management.md`      |
| 03 | Learning Session           | Domain only  | `docs/modules/03-learning-session.md`        |
| 04 | Spaced Repetition Review   | Domain only  | `docs/modules/04-spaced-repetition-review.md`|
| 05 | Knowledge Progress         | Domain only  | `docs/modules/05-vocabulary-knowledge-progress.md` |
| 06 | Statistics & Analytics     | Not started  | `docs/modules/06-statistics-analytics.md`    |
| 07 | Import/Export              | Not started  | `docs/modules/07-import-export-data-management.md` |

"Implemented" = has routes, services, repositories, and integration tests.
"Domain only" = pure logic exists in `src/domain/` but no routes/services/repos yet.

---

## Frontend Architecture (Prescribed)

The frontend is not yet scaffolded but follows these prescribed patterns:

- **Server state**: TanStack React Query 5 (fetching, caching, mutations).
- **Client state**: Zustand 4 (UI-only ephemeral state like modals, filters).
- **Routing**: React Router 6.
- **Styling**: TailwindCSS 3 with brand tokens from `docs/architecture/03-brand-design-system.md`.
- **No `useEffect` for data fetching** — use React Query hooks.
- **No derived state in `useEffect`** — compute inline or with `useMemo`.
- **Semantic HTML** — a `<div>` with `onClick` is a bug. Use `<button>`.
- **Component file max**: 200-300 lines. Extract hooks and sub-components early.

---

## Agent Rules (Always Active)

Rules in `.agents/rules/` are enforced on every code change:

| Rule                    | File                               | Trigger      | Summary                                              |
| ----------------------- | ---------------------------------- | ------------ | ---------------------------------------------------- |
| Clean Code Standards    | `.agents/rules/clean-code.md`       | All code files | SOLID, DRY, KISS, YAGNI, file size limits, headers  |
| Code Change Quality Gate | `.agents/rules/code-change-quality-gate.md` | Always on | Read context first, smallest safe change, run tests |
| Deep Research           | `.agents/rules/research.md`         | Model decision | Search before building, document insights           |

---

## Agent Skills

Skills in `.agents/skills/` are loaded on demand for specialized work:

| Skill               | Directory                              | Use When                                          |
| -------------------- | -------------------------------------- | ------------------------------------------------- |
| Backend Developer    | `.agents/skills/backend-developer/`     | API design, architecture, security, DB decisions   |
| Frontend Developer   | `.agents/skills/frontend-developer/`    | UI implementation, performance, accessibility      |
| Business Analysis    | `.agents/skills/business-analysis/`     | Requirements, PRDs, user stories, diagramming      |
| Commit Convention    | `.agents/skills/commit-convention/`     | Git commits, grouping changes, message formatting  |
| Graphify             | `.agents/skills/graphify/`              | Knowledge graph queries, architecture, dependencies, change impact |

Each skill directory contains a `SKILL.md` with detailed instructions and may include `references/`, `templates/`, and `scripts/` subdirectories.

---

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <summary>
```

**Types**: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `style`, `build`, `ci`, `chore`, `revert`

**Scopes**: `api`, `db`, `domain`, `web`, `docs`, `skills`, `tests`, `deps`

**Rules**:
- Imperative mood (`add`, `fix`, `remove` — not `added`, `fixes`).
- First line under 72 characters.
- Lowercase after scope.
- No trailing period.
- Stage explicit paths only — never `git add .` blindly.
- Combine code + tests in one commit when tests validate that code.

---

## Key Documentation

| Document                       | Path                                                    |
| ------------------------------ | ------------------------------------------------------- |
| Implementation Roadmap         | `docs/plans/2026-09-06-english-learning-system-implementation.md` |
| System Overview                | `docs/architecture/01-system-overview.md`             |
| Database Schema                | `docs/architecture/02-database-schema.md`             |
| Brand & Design System          | `docs/architecture/03-brand-design-system.md`        |
| Engineering Brief              | `docs/architecture/04-engineering-brief.md`           |
| Module PRDs                    | `docs/modules/01-*.md` through `docs/modules/08-*.md`  |

---

## Quality Gate Checklist

Before completing any code change:

1. Read relevant project context (`docs/`, existing code paths) before editing.
2. Prefer existing patterns, helpers, and service boundaries over new abstractions.
3. Identify the smallest safe change that fixes the requested behavior.
4. Do not hardcode business logic — use validation, configuration, or reusable helpers.
5. Run the narrowest relevant test command after the change.
6. Run broader tests when shared services, persistence, or API contracts are touched.
7. Verify the implementation solves the root cause, not just the symptom.
8. Confirm regression test coverage exists for fixed bugs.
9. Report exact test commands and results.
