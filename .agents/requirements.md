# Requirements (MVP)

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: README.md, Roles & Permissions, Codebase_

This document specifies the core functional and non-functional requirements for the initial MVP boilerplate setup of the project.

---

## 📋 Functional Requirements (FR)

| ID | Module | Requirement | Priority | Source / Notes |
|---|---|---|---|---|
| **FR-01** | Auth | User must be able to log in using a username and password. | High | `src/services/api/auth.ts` |
| **FR-02** | Auth | User must be able to register a new account. | High | `src/features/auth/register.tsx` |
| **FR-03** | Auth | Application must load and verify active tokens on startup via getProfile. | High | `src/store/useAuthStore.ts` |
| **FR-04** | Products | User must be able to view a list of products. | High | `src/services/api/products.ts` |
| **FR-05** | Products | Admin must be able to delete products based on role check. | High | `src/features/products/product-list.tsx` |
| **FR-06** | Products | Authorized user must be able to add/edit products. | Medium | `src/features/products/product-form.tsx` |
| **FR-07** | Theme | System must support theme switching (Dark & Light modes). | Medium | `next-themes` dependency |
| **FR-08** | Real-time | System must support live WebSocket channels for event notifications and real-time chat. | Medium | Laravel Echo / Pusher JS |
| **FR-09** | PWA | System must check environment and store PWA installment states (IOS, standalone). | Low | `src/store/usePwaStore.ts` |

---

## ⚡ Non-Functional Requirements (NFR)

| ID | Category | Requirement | Target Metric |
|---|---|---|---|
| **NFR-01** | Localization | All user-facing text must follow KBBI Bahasa Indonesia rules. | 100% compliance in UI views |
| **NFR-02** | Performance | Bundle loading and page transition must be fast. | Vite development server startup < 500ms |
| **NFR-03** | Styling | Strict styling using ShadCN UI and Tailwind CSS v4. | Zero inline styles (`style={{ }}`) |
| **NFR-04** | Form Validation | All forms must use React Hook Form + Zod resolvers. | No form submissions without Zod validations |
| **NFR-05** | Type Safety | End-to-end type safety for API requests and page props. | Zero `any` types in newly generated files |
| **NFR-06** | Responsive Design | The layout must scale beautifully on mobile, tablet, and desktop. | Mobile-first breakpoints (sm/md/lg/xl/2xl) |
| **NFR-07** | Routing | Strict file-based routing with TanStack Router. | No manual window.location modifications |

---

## 📌 Assumptions

1. **API Endpoints**: The base API path will be injected via `VITE_API_URL` into an Axios client.
2. **Access Token Lifespan**: Access tokens are stored in secure cookies (`access_token`) and expire in 1 day; refresh tokens expire in 7 days.
3. **Roles and Permissions**: Permission keys (`view_profile`, `view_dashboard`, `view_products`, `edit_products`, `delete_products`) are returned as strings in the user session object and validated on the client side using the Zustand store method `hasPermission(permission)`.

---

## 🔍 Unresolved Questions

1. Is there an active backend server for this boilerplate, or will we rely purely on a mock API/json-server for testing?
2. What are the specific WebSocket event names and payloads for Laravel Echo integration?
