# AGENT.md

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: README.md, workspace_

Welcome to the React + ShadCN UI Boilerplate! This file serves as the top-level Brain Map and entry point for any AI agent or developer interacting with this codebase.

---

## 📋 Project Overview

This project is a modern, high-performance web application boilerplate designed for React 19, TypeScript, Vite, TanStack Router, and Tailwind CSS v4, built around ShadCN UI component conventions. It features structured state management (Zustand + React Query), robust validation (Zod + React Hook Form), Laravel Echo WebSocket integration, and a localized UI system.

- **Primary Goal**: Maintain high-quality code consistency while accelerating feature development through structured AI workflow patterns.
- **Language Policy**: **All user-facing UI text must be in Bahasa Indonesia (KBBI)**. Code structure, enums, variables, and documentation must remain in English.

---

## 🧭 Quick Navigation

Use the links below to access relevant files in the workspace:

### Workspace & Setup
- **[Onboarding Guide](file:///.agents/onboarding.md)**: Workspace orientation, installation steps, and developer prerequisites.
- **[Requirements Document](file:///.agents/requirements.md)**: Functional and non-functional specifications.
- **[Project Scope](file:///.agents/project_scope.md)**: Boundary definitions (In-Scope and Out-of-Scope).

### Rules & Design Standards
- **[Constraints Rules](file:///.agents/rules/constraints.md)**: Technical limitations and architectural boundaries.
- **[Design System Guidelines](file:///.agents/rules/design_system.md)**: Styling tokens, custom theme rules, and responsive design guidelines.
- **[Developer Guide](file:///.agents/rules/developer_guide.md)**: Feature architecture, state management, directory conventions, and coding patterns.
- **[Pattern Rules (Core)](file:///.agents/rules/pattern-rules.md)**: Root configuration file detailing strict workspace rules (Bahasa Indonesia KBBI translation tables, component isolation rules, etc.).

### Context & Facts
- **[Glossary of Terms](file:///.agents/facts/glossary.md)**: Approved translation vocabulary.
- **[Company/Project Facts](file:///.agents/facts/company_facts.md)**: Branding rules, default options, and metadata facts.
- **[Project Directory Map](file:///.agents/facts/project_map.md)**: Folder tree structure and routing organization.

### Technical Blueprints (MVP)
- **[01 Feature List](file:///.agents/reference/01_feature_list_mvp.md)**: Screen-level detail and feature groupings.
- **[02 Business Process Flow](file:///.agents/reference/02_business_process_mvp.md)**: Main user lifecycles mapped via Mermaid diagrams.
- **[03 Activity Diagram](file:///.agents/reference/03_activity_diagram_mvp.md)**: Swimlane workflow diagrams including API gateways and validation cycles.
- **[04 Database Schema](file:///.agents/reference/04_database_schema_mvp.md)**: Entity relationships and TypeScript data schema mapping.
- **[05 Use Case Narratives](file:///.agents/reference/05_use_case_diagram.md)**: Actor system boundaries and interaction descriptions.

---

## ⚙️ Tech Stack Summary

| Technology | Purpose | Documentation / Guide |
|---|---|---|
| **React 19** | UI Library | [React Docs](https://react.dev) |
| **Vite & TS** | Build Tool & Static Typing | [ViteJS](https://vitejs.dev) / [TypeScript](https://www.typescriptlang.org) |
| **Tailwind CSS v4** | CSS Utility Styling | [Tailwind v4](https://tailwindcss.com) |
| **ShadCN UI** | Core Component Library | [ShadCN](https://ui.shadcn.com) |
| **TanStack Router** | File-based Routing | [TanStack Router Docs](https://tanstack.com/router) |
| **Zustand** | Global Client State | [Zustand Github](https://github.com/pmndrs/zustand) |
| **React Query** | Async Server State / Cache | [TanStack Query Docs](https://tanstack.com/query) |
| **Zod & React Hook Form** | Form validation & Management | [React Hook Form](https://react-hook-form.com) / [Zod](https://zod.dev) |
| **Laravel Echo / Pusher** | WebSocket Live Chat | [Laravel Echo](https://laravel.com/docs/broadcasting) |

---

## 👥 Key Stakeholders

- **Admin**: Has permissions to view dashboards, products, delete products, and manage system resources.
- **Buyer**: Regular guest/customer who browses and purchases products.
- **Seller**: Merchant who uploads and sells products, using Seller Center routes.
- **Guest**: Non-authenticated user who can access public landing pages.

---

## 🤖 Agent Behaviour Rules

1. **Be strictly KBBI compliant**: Ensure any UI labels, toast notifications, confirmation popups, form inputs, validation messages, or titles are translated to standard Bahasa Indonesia according to the glossary.
2. **Prioritize CLI & Workflows**: Execute work sequentially. When asked to generate pages or services, use the workflow slash commands located in `.agents/workflows/` (e.g., `/create-form`, `/create-table-list`).
3. **Respect feature-based structure**: Never bundle everything into a single file. Keep components separated under their corresponding feature folders (e.g., `src/features/{module}/form`, `src/features/{module}/list`).
4. **Never bypass router conventions**: Always register new routes in `src/router` following the TanStack Router structure and update `routeTree.gen.ts` as needed.
