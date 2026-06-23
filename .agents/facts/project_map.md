# Project Map

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: Workspace exploration, README.md_

This file maps the codebase paths to their architectural role in the boilerplate.

---

## 📂 Source Code Structure (`src/`)

### 🧭 Routing Configuration (`src/router/`)
The routing structure utilizes file-based routes in TanStack Router:
- **`src/router.tsx`**: Sets up and exports the TanStack Router instance.
- **`src/routeTree.gen.ts`**: The generated route tree mapping (automatically compiled by the compiler).
- **`src/router/(dashboard)`**: Contains admin dashboard views and layouts.
- **`src/router/(guest)`**: Public pages (e.g. login, register).
- **`src/router/(private)`**: Authenticated-only views.

### 🧩 Feature Modules (`src/features/`)
Self-contained folders grouping layout structure, views, and actions by domain:
- **`auth/`**: Core registration and login components.
- **`products/`**: Products dashboard, list table, details page, and form modification sheets.
- **`users/`**: Profile edit panels and account credentials fields.
- **`errors/`**: Clean boundary handlers for 401, 404, and 500 error pages.

### 🌐 State & Storage (`src/store/`)
Zustand persistent client-side states:
- **`useAuthStore.ts`**: Manages current user session attributes, auth status check, token storage in cookies, and permission filters.
- **`usePwaStore.ts`**: Handles installation prompts, client platform context (isIos / isStandalone), and app loading states.

### 🤝 API & Integrations (`src/services/api/`)
Http Axios configurations:
- **`auth.ts`**: Auth service calls (login, profile details fetch).
- **`products.ts`**: Product CRUD services (findall, findone, delete product).

### 🛠️ Common Libraries (`src/lib/`)
General utilities:
- **`axios.ts`**: Instantiates Axios, injects header headers, manages error catching.
- **`cookie.ts`**: Lightweight wrappers for `js-cookie`.
- **`utils.ts`**: Shared class merging helper `cn()`.
- **`enum/`**: Shared static configs (roles, permissions, paths).
