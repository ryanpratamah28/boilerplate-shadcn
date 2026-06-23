# Developer Guide

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: pattern-rules.md_

This guide outlines code architecture, state management rules, folder layout guidelines, and naming conventions to maintain codebase readability.

---

## 🏛️ Codebase Architecture

The project follows a **Feature-Based Folder Structure**. Keep feature logic isolated under `src/features/{module}`.

### Directory Mapping
- **`src/features/{module}/form/`**: Contains the form components (e.g. `product-form.tsx`) and sub-components (e.g. `sections/product-info.tsx`).
- **`src/features/{module}/list/`**: Contains index tables, filters, and list views.
- **`src/services/api/`**: Module-specific Axios API connectors.
- **`src/types/pages/`**: Module-specific interfaces (e.g. `product.ts`).
- **`src/schemas/`**: Zod validation schemas.
- **`src/store/`**: Zustand global client-side caches.

---

## 🏷️ Naming Conventions

Maintain strict name cases across all modules:

- **Files & Directories**: `kebab-case` (e.g. `product-list.tsx`, `use-auth-store.ts`)
- **React Components**: `PascalCase` (e.g. `ProductList`, `LoginForm`)
- **Functions & Hooks**: `camelCase` (e.g. `getProfile`, `useAuthStore`)
- **TypeScript Types & Interfaces**: `PascalCase` (e.g. `Product`, `AuthState`)
- **Enums & Constants**: `SCREAMING_SNAKE_CASE` (e.g. `PERMISSIONS`, `ROLES`)

---

## 📈 State Management Boundaries

1. **Server State (API Cache)**:
   - Use TanStack Query (`@tanstack/react-query`) for fetching, caching, and updating server data.
   - Use TanStack Router `loader` functions to pre-fetch required data before navigating. Do not use standard `useEffect` + `useState` blocks for initial page loading.
2. **Global Client State**:
   - Use **Zustand** stores inside `src/store/` for globally shared client states (e.g. auth status, active tokens, PWA environment facts, layout flags).
3. **Form State**:
   - Managed exclusively by `react-hook-form`. Do not store active text input values in global stores or parent state.

---

## 🌐 API Service Layer

- All API calls must utilize the shared Axios instance `apiInstance` from `@/lib/axios`.
- Declare all API endpoints in the corresponding enum file under `src/lib/enum/`. Do not write raw endpoint strings inside components.
- Group service methods inside objects (e.g. `authService` or export named async functions).
