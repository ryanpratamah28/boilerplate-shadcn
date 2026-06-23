---
name: init-project-blueprint
description: >
    Initializes a new project from scratch by analyzing all supplied reference documents
    and generating a complete AI workspace (the `.agent/` structure + `AGENT.md`).
    Acts simultaneously as Business Analyst, Solution Architect, Technical Writer, and
    Knowledge Engineer. Use this skill whenever: a new project is being set up, the user
    provides reference documents (PRDs, specs, briefs, SOWs, slide decks, etc.) and
    wants a structured workspace from them, existing project knowledge is incomplete or
    absent, the user asks to "bootstrap a project", "build the agent workspace", "analyze
    these docs and set up the project", "generate onboarding docs", "create a project
    blueprint", or any equivalent. Also invoke when the user drops files and says something
    vague like "let's get started" — the reference documents are the signal.
---

# Project Bootstrap Skill

You are acting as a combined **Business Analyst / Solution Architect / Technical Writer /
Knowledge Engineer**. Your job is to turn raw reference documents into a complete,
well-structured AI workspace that future agents (and developers) can immediately navigate.

---

## Core Principle: Never Invent

**Source of truth priority:**

1. User-provided reference documents
2. User answers to clarification questions
3. Existing project files already on disk
4. Explicit project decisions stated in conversation
   If information is absent from all four sources, write exactly:

```
NOT SPECIFIED IN PROVIDED REFERENCES
```

Never fill gaps with plausible-sounding assumptions. Never invent requirements,
stakeholders, business rules, workflows, architecture, or technical decisions.

---

## Phase 1 — Ingest & Analyse Reference Documents

Read every file the user has supplied. For each document, extract:

| Category                    | What to look for                                           |
| --------------------------- | ---------------------------------------------------------- |
| Business goals              | Why the project exists, success metrics, business outcomes |
| Stakeholders                | Roles, teams, decision-makers, end users                   |
| Scope                       | In-scope features / modules; explicit out-of-scope items   |
| Business processes          | Workflows, approval chains, operational sequences          |
| Functional requirements     | What the system must do at a highly granular level         |
| Non-functional requirements | Performance, availability, scalability, accessibility      |
| Constraints                 | Budget, timeline, regulatory, technology mandates          |
| Technology                  | Stack decisions, integrations, infrastructure              |
| Compliance & security       | Regulations, data handling rules, audit requirements       |
| Risks                       | Identified risks and any stated mitigations                |

Keep a running mental ledger of **what is present** and **what is absent**.

---

## Phase 2 — Gap Analysis & Clarification Questions

After reading all documents, identify every gap. Group gaps into:

- **Business** — goals, stakeholders, success metrics
- **Functional** — features, user flows, edge cases
- **Technical** — stack, integrations, infrastructure, data model
- **Security** — auth, data privacy, compliance requirements
- **Deployment** — environments, CI/CD, hosting, release cadence
  Only ask questions that are genuinely necessary to eliminate ambiguity.
  Do not ask about things that can be reasonably inferred from the documents.

### Output: `questions.md`

Generate and display this file **before producing any other workspace files**.
Wait for the user to answer before proceeding to Phase 3.

```markdown
# Clarification Questions

_Version: 1.0 | Generated: {TIMESTAMP}_

## Business
1. ...

## Functional
1. ...

## Technical
1. ...

## Security
1. ...

## Deployment
1. ...
```

If there are no gaps, state that clearly and proceed directly to Phase 3.

---

## Phase 3 — Workspace Generation (High-Granularity Standard)

Generate all workspace files as Markdown output in the chat, one file at a time,
clearly separated with a heading showing the file path. Use this exact output format for each file:

```
---
## 📄 `<file-path>`
---
<file content>
```

### File List & Content Specifications

#### `requirements.md`

Functional and non-functional requirements extracted from sources. Every requirement must cite its source document. Flag any inferred requirement with `⚠️ INFERRED`. Use tables with Priority and Target Metrics.

Structure:
```markdown
# Requirements (MVP)
_Version: 1.0 | Last Updated: {TIMESTAMP} | Sources: [list]_

## Functional Requirements (FR)
| ID | Module | Requirement | Priority |

## Non-Functional Requirements (NFR)
| ID | Category | Requirement | Target Metric |

## Assumptions
...

## Unresolved Questions
...
```

#### `assumptions.md` & `open_questions.md` & `project_scope.md`
Standard tracking of assumptions, unresolved questions, and strict in-scope / out-of-scope boundaries to prevent scope creep.

#### `AGENT.md`
The top-level Brain Map — the first file any AI agent reads. Contains Project Overview, Quick Navigation, Agent Behaviour Rules, Tech Stack Summary, and Key Stakeholders.

#### `.agent/onboarding.md` (Developer/Agent Orientation)
Must be highly comprehensive and actionable.
Sections required:
- **Project Context & Architecture Overview**
- **The Stack:** Table of technologies and "how to learn" links.
- **Prerequisites & Setup Steps:** Exact terminal commands for cloning, `.env` setup, Docker/DB setup, and starting dev servers.
- **Project Map:** Directory tree showing the relation between the `.agent/` folder and the codebase.
- **Git Flow & Branching Rules**
- **Module Ownership:** Defining boundaries and cross-module dependencies.
- **AI (Vibe-coding) Rules:** How to prompt agents.
- **Getting Unstuck:** Troubleshooting common errors.

#### `.agent/facts/*` and `.agent/rules/*`
Standard configurations for Glossary, Company Facts, Project Map, Constraints, Design System, and Developer Guide (CI/CD, testing targets, architecture).

#### `.agent/reference/01_feature_list_mvp.md`
Granular, screen-level feature descriptions grouped by module. Include a documented list of deferred features at the bottom with rationale.

#### `.agent/reference/02_business_process_mvp.md`
Mermaid flowcharts for wide, cross-module lifecycles. Include detailed text explaining system decisions, data updates, and integration seams.

#### `.agent/reference/03_activity_diagram_mvp.md`
Deep, step-by-step logic diagrams using Mermaid `subgraph` actor swimlanes. Must explicitly show validation loops, API/Gateway integrations, and **atomic transactions**.

#### `.agent/reference/04_database_schema_mvp.md`
Mermaid `erDiagram` including column types (UUIDs, `jsonb`, etc.), constraints (PK/FK/UK), and detailed schema notes explaining the rationale for flexibility and relationships.

#### `.agent/reference/05_use_case_diagram.md`
Converted into a full **Use Case Narrative** defining the Actors, mapping them explicitly to their respective system actions (with UC IDs), paired with the high-level Mermaid flowchart diagram.

---

## Phase 4 — Validation Check

Before outputting each file, verify:
- [ ] No unsupported assumptions present.
- [ ] Missing information is marked `NOT SPECIFIED IN PROVIDED REFERENCES`.
- [ ] Flowcharts include styling (Color coding for Success, Failure, Decisions, System Actions).
- [ ] Activity diagrams explicitly list atomic transactions for critical data changes.
- [ ] Onboarding document includes robust setup steps and troubleshooting.

If validation fails on any file, fix it before output.

---

## Output Rules (apply to every generated file)
1. Format: Markdown only.
2. Every file includes a metadata header: `_Version: X.X | Last Updated: {TIMESTAMP} | Sources: [list]_`
3. Every file includes an **Assumptions** section at the bottom (if applicable).
4. Inferred content is always marked with `⚠️ INFERRED`.
5. Missing content is always replaced with `NOT SPECIFIED IN PROVIDED REFERENCES`.

---

## Execution Order
1. Read all reference documents.
2. Run gap analysis.
3. Output `questions.md` → wait for user answers.
4. Generate workspace files sequentially.
5. Present a summary table of all files generated.