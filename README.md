# React + ShadCN UI Boilerplate

Modern, fast, and type-safe boilerplate for starting web applications. This project is configured with React 19, TypeScript, Vite, TanStack Router, and Tailwind CSS v4, built around ShadCN UI conventions and an AI-driven pattern generation workflow.

## Key Features

- **Component-Driven UI:** Built with ShadCN UI and Radix Primitives for accessible, customizable components.
- **Strict Typing:** End-to-end type safety using TypeScript and Zod schemas.
- **Robust Routing:** File-based routing with `@tanstack/react-router`.
- **Form Management:** `react-hook-form` coupled with `zod` for performant, validated forms.
- **AI-Powered Workflows:** Built-in AI generation patterns via the `.agents` folder for rapid and consistent feature scaffolding.

---

## Tech Stack

This project is built using a robust set of libraries and tools:

### Core & Framework

- **React 19:** The latest version of the library for web and native user interfaces.
- **TypeScript:** Strictly typed JavaScript for better code quality.
- **Vite:** Next-generation frontend tooling.
- **@tailwindcss/vite:** High-performance tooling for Tailwind CSS v4.

### UI Components & Styling

- **Tailwind CSS 4:** Utility-first CSS framework for rapid UI development.
- **ShadCN UI (Radix Primitives):**
    - Built on top of **@radix-ui** (Dialog, Dropdown, Accordion, etc.) for accessible, unstyled components.
    - Uses **class-variance-authority (CVA)**, **clsx**, and **tailwind-merge** for dynamic styling.
- **Icons:**
    - **Lucide React:** Beautiful & consistent icons.
    - **Tabler Icons:** Additional icon set for broader visual options.
- **Typography:** **@fontsource/rethink-sans** for the primary font family.
- **Interactive Components:**
    - **Sonner:** For clean and responsive toast notifications.
    - **Swiper:** Modern touch slider for carousels.
    - **Vaul:** Drawer component for mobile-friendly interactions.
    - **CMDK:** Fast, composable command menu.
    - **Recharts:** Composable charting library for data visualization.
    - **React Day Picker / Datepicker:** Flexible date picking components.

### State Management & Data Fetching

- **@tanstack/react-query:** Powerful asynchronous state management for server data caching and synchronization.
- **Zustand:** A small, fast, and scalable bearbones state-management solution for global client state.
- **Axios:** Promise-based HTTP client for making API requests.

### Routing

- **@tanstack/react-router:** Type-safe routing for React applications, including DevTools and CLI integration.

### Forms & Validation

- **React Hook Form:** Performant, flexible, and extensible forms with easy-to-use validation.
- **Zod:** TypeScript-first schema declaration and validation library.
- **@hookform/resolvers:** Bridges Zod schemas with React Hook Form validation.

### Real-Time & Integrations

- **Laravel Echo & Pusher JS:** WebSocket integration used for **Real-time Live Chat** and event broadcasting.
- **Firebase:** Integrated for cloud services (e.g., Push Notifications/FCM).

### Utilities

- **date-fns:** Modern JavaScript date utility library.
- **js-cookie:** Simple, lightweight JavaScript API for handling cookies.
- **react-number-format:** Component to format numbers (currency, etc.) in input fields.
- **next-themes:** abstraction for handling dark/light mode themes.

---

## Prerequisites

- Node.js 20 or higher
- [pnpm](https://pnpm.io/installation) (recommended package manager)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Configure the following variables in your `.env`:

| Variable              | Description                         | Example                       |
| --------------------- | ----------------------------------- | ----------------------------- |
| `VITE_API_URL`        | Your backend API URL                | `http://your-backend-app/api` |
| `VITE_REVERB_APP_KEY` | Reverb/Pusher app key for WebSocket | `your_app_key`                |
| `VITE_REVERB_HOST`    | Reverb/Pusher host                  | `your_host`                   |
| `VITE_REVERB_PORT`    | Reverb/Pusher port                  | `8080`                        |
| `VITE_REVERB_SCHEME`  | WebSocket connection scheme         | `http` or `https`             |

### 4. Start Development Server

```bash
pnpm run dev
```

Your application will now be available at [http://localhost:5173](http://localhost:5173). The TanStack Router devtools will be available automatically in development.

---

## Architecture Overview

### Directory Structure

```text
src/
├── assets/                 # Static assets like images and global CSS
├── components/             # Shared components
│   ├── features/           # Domain-specific reusable components
│   ├── layouts/            # Page layouts (e.g., AuthLayout, DashboardLayout)
│   └── ui/                 # ShadCN UI primitives
├── features/               # Page-level feature modules
│   └── {module}/           # Example: users, products
│       ├── form/           # Form components (e.g., user-form.tsx)
│       │   └── sections/   # Form sub-sections
│       └── list/           # Table and list view components
├── hooks/                  # Reusable custom React hooks
├── lib/                    # Utilities and configurations
│   ├── enum/               # API endpoint enums
│   └── helpers/            # Helper functions
├── router/                 # TanStack Router file-based routes
│   ├── (dashboard)/        # Admin/Dashboard routes
│   ├── (guest)/            # Public routes (e.g., login, register)
│   └── (private)/          # Authenticated user routes
├── schemas/                # Zod validation schemas
├── services/               # API service functions
│   └── api/                # Axios-based API calls
├── store/                  # Zustand global state stores
├── styles/                 # Global stylesheets
└── types/                  # TypeScript interfaces and types
    ├── api/                # API response types
    └── pages/              # Module-specific prop and form types
```

### Request & Data Flow

1. **Routing:** Request hits TanStack Router (`src/router`).
2. **Data Fetching:** Route `loader` functions or TanStack Query fetches data via `src/services`.
3. **State:** Global client state is accessed via Zustand (`src/store`).
4. **Rendering:** React components in `src/features` render the UI.
5. **Forms:** Data mutations use `react-hook-form` + `zod` schemas (`src/schemas`).

---

## The Pattern Folder (`.agents/`)

This project embraces an **AI-driven development approach**. To maintain architectural consistency, we use the `.agents` folder, which contains standardized workflows and rules for generating new code.

### Using Workflow Patterns (`.agents/workflows/`)

The workflows directory contains Markdown files designed as "slash commands" for AI coding assistants. These workflows ensure that any AI-generated code strictly follows the boilerplate's conventions.

**Available Patterns:**

- `/create-schemas`: Generate Zod validation schemas based on API definitions.
- `/create-types`: Generate TypeScript type definitions.
- `/create-services`: Generate the API service layer with CRUD operations.
- `/create-form`: Generate a create/edit form feature wrapper and detail sections.
- `/create-table-list`: Generate a full data table list with headers and actions.
- `/create-routes-admin`: Scaffolds TanStack Router files for admin views.
- `/create-routes-public`: Scaffolds public/private user-facing routes.
- `/create-routes-seller-center`: Scaffolds routes for the Seller Centre.
- `/create-stores`: Scaffolds Zustand client-side caching stores.
- `/create-enum-endpoints`: Creates enum files for API endpoints.

**How to Use:**
When prompting your AI agent, explicitly mention a workflow to trigger code generation.
_Example:_ `"Use /create-form to build the User form. The schema has name, email, and role."\*

### Enforced Rules (`.agents/rules/`)

This directory contains `pattern-rules.md`, defining the unbreakable constraints of this workspace:

- **Language**: All user-facing text must be in **Bahasa Indonesia (KBBI)**.
- **Styling**: Strict use of Tailwind CSS v4 and ShadCN UI. No inline styles.
- **Components**: Single responsibility, split large components into sub-components.
- **File Organization**: Follow the **Feature-Based Architecture** with separate files for forms, tables, types, schemas, services, hooks, and routes within each feature.
- **Configuration**: All environment variables and API configurations are centralized in `src/lib/config.ts`.
- **API Services**: All API services must be implemented using Axios and centralized in `src/services/api/api.ts`.
- **Real-Time**: All WebSocket implementations must use Laravel Echo and Pusher JS, with configurations in `src/lib/config.ts` and integration with Zustand stores or context.

---

## Available Scripts

| Command            | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `pnpm run dev`     | Start development server with Vite & TanStack Router watcher |
| `pnpm run build`   | Build for production (`tsc -b && vite build`)                |
| `pnpm run preview` | Preview production build locally                             |
| `pnpm run lint`    | Run ESLint to analyze code quality                           |

---

## Testing & Quality Assurance

This boilerplate relies on TypeScript strict mode and ESLint for code quality.

```bash
# Run TypeScript compilation check and ESLint
pnpm run lint
```

When building forms or making changes, ensure your `zod` schemas cover all validation edges before submitting forms.

---

## Deployment

The application is built as a static site (SPA) that can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, S3, etc.).

1. Create a production build:
    ```bash
    pnpm run build
    ```
2. The generated output will be in the `dist/` directory.
3. Configure your hosting provider to route all unresolved paths to `index.html` (Client-Side Routing fallback).

_Note: If you have a proxy configured in `vite.config.ts` for local development CORS, ensure it does not interfere with your production build process._
