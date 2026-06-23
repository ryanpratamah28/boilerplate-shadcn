# Onboarding Guide

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: README.md, workspace_

Welcome! This guide is designed to get developers and AI agents up to speed quickly on the React + ShadCN UI Boilerplate.

---

## 🏛️ Project Context & Architecture

This application is built as a single-page application (SPA) using React 19 and Vite. The codebase adheres strictly to a **Feature-Based Folder Structure**, grouping code by feature module (e.g. `auth`, `products`, `users`) instead of file type.

```
Request -> TanStack Router -> Loader (Data Fetch) -> Zustand / React Query -> React Page Components -> Zod Validated Forms
```

---

## 🛠️ The Tech Stack

| Technology | Purpose | How to Learn |
|---|---|---|
| **React 19** | UI Rendering & Hooks | [React 19 Docs](https://react.dev) |
| **Vite** | Dev Server & Bundling | [Vite Guide](https://vitejs.dev/guide/) |
| **Tailwind CSS v4** | Utility CSS Styling | [Tailwind v4 Docs](https://tailwindcss.com) |
| **ShadCN UI** | Modular UI Primitives | [ShadCN Components](https://ui.shadcn.com) |
| **TanStack Router** | Type-safe Routing | [TanStack Router Learn](https://tanstack.com/router/v1/docs/guide/introduction) |
| **Zustand** | Global UI Client State | [Zustand Guide](https://zustand-demo.pmnd.rs) |
| **React Query** | API Data Caching | [TanStack Query Quickstart](https://tanstack.com/query/v5/docs/framework/react/quick-start) |
| **Zod** | Validation Schemas | [Zod Github](https://github.com/colinhacks/zod) |

---

## 🚀 Getting Started (Setup Steps)

Follow these steps exactly to run the local development environment:

### 1. Prerequisites
- **Node.js**: >= 20.0.0
- **pnpm**: installed globally (`npm i -g pnpm`)

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone <your-repository-url>
cd boilerplate-shadcn
pnpm install
```

### 3. Setup Environment Variables
Copy the template file to configure your local variables:
```bash
cp .env.example .env
```
Edit the `.env` file to reference your backend server URL (default local mock or remote):
```env
VITE_API_URL=http://localhost:3000/api
VITE_REVERB_APP_KEY=your_app_key
VITE_REVERB_HOST=127.0.0.1
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

### 4. Start the Dev Server
Launch Vite's hot-reloading development server:
```bash
pnpm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗺️ Project Map

The project maps specific development files and AI workflows as follows:

```text
boilerplate-shadcn/
├── .agents/                    # AI Agent Workspaces
│   ├── facts/                  # Glossary, maps, defaults
│   ├── reference/              # Technical drawings & ERDs
│   ├── rules/                  # constraints.md, pattern-rules.md, design_system.md
│   └── workflows/              # Slash commands (/create-form, etc.)
├── src/                        # Source Code
│   ├── components/ui/          # Shared ShadCN UI atoms
│   ├── features/               # Feature-based pages
│   │   ├── auth/               # Login & Register views
│   │   └── products/           # Product CRUD views
│   ├── router/                 # TanStack Routes
│   ├── services/api/           # Axios service clients
│   └── store/                  # Zustand client stores
```

---

## 🌿 Git Flow & Branching Rules

- **Branch Name Schema**:
  - New features: `feature/feature-name`
  - Hotfixes: `hotfix/bug-desc`
  - Refactoring: `refactor/change-desc`
- **Pull Request Rules**:
  - Branch off `main`.
  - All linting must pass before pushing: `pnpm run lint`.
  - Compile-check typescript assets: `pnpm run build` must run without typescript compile errors.

---

## 🧱 Module Ownership

Feature modules under `src/features/{module}/` are isolated self-contained units.
- **Rules**:
  - Avoid importing internal feature components of a module from another module.
  - Shared atomic items should be placed in `src/components/` or `src/components/ui/`.
  - Always use shared stores in `src/store/` for cross-feature notifications or states.

---

## 🤖 AI Vibe-coding Rules

When working with an AI coding agent:
1. **Always reference the workflows**: Start the prompt with one of the available workflow commands (e.g. `Use /create-form to create...`).
2. **Strictly mention styling guides**: Remind the agent to style exclusively with Tailwind CSS v4 variables and ShadCN UI.
3. **Language warning**: Emphasize that all output UI text must follow **Bahasa Indonesia (KBBI)** guidelines.

---

## 🔧 Getting Unstuck & Troubleshooting

### 1. TanStack Route Tree Compilation Issues
If you add a new route in `src/router/` and it doesn't resolve or errors, run:
```bash
npx tsr watch
```
This forces the router generator to rebuild `src/routeTree.gen.ts`.

### 2. Cookie Authorization Failures
If you get unexpected `401 Unauthorized` responses from the api:
- Open browser devtools -> Application -> Cookies.
- Verify `access_token` exists and is formatted correctly.
- Ensure the API baseUrl matches your backend's host.
