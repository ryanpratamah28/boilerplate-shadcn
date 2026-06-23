# Backlog Tasks

This backlog tracks tasks for future technical debt management, optimization, and code scalability as the project grows.

## 📈 Scalability & Refactoring Backlog

- [ ] **Refactor Zustand stores to be feature-scoped**
  - [ ] Relocate feature-specific stores (e.g., product filters, list page sizes) from the central `src/store/` directory to their corresponding module directory: `src/features/{module}/store/`.
  - [ ] Retain only core cross-cutting stores (such as `useAuthStore` and `usePwaStore`) in the global `src/store/` folder.

- [ ] **Refactor API service layers to be feature-scoped**
  - [ ] Relocate feature-specific API service clients (e.g., `src/services/api/products.ts`) into their respective feature directories: `src/features/products/services/`.
  - [ ] Maintain only the core axios client configuration and global request/response interceptors in `src/lib/axios.ts`.

- [ ] **Refactor Zod validation schemas to be feature-scoped**
  - [ ] Identify Zod schemas that are only utilized by a single feature module's forms and move them into `src/features/{module}/schemas/`.
  - [ ] Retain only shared, multi-module validation schemas in the global `src/schemas/` directory.
