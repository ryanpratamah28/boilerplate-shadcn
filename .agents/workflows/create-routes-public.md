---
description: Generate TanStack Router route files for public (guest) and private (authenticated user) facing module pages.
---

# Workflow: `/create-routes-public`

> Generate TanStack Router route files for public (guest) and private (authenticated user) facing module pages.

---

## Context

Public and private user-facing pages follow the same TanStack Router file-based pattern but live under different layout groups. Public pages require no auth; private pages are behind authentication. Feature components are reused from `src/features/{module-name}s/`.

---

## Trigger

Run this workflow when a module needs a **non-admin** facing page. You need:

1. Module name
2. Whether the page is public (no auth) or private (requires auth)
3. What data to display (list only, detail, or both)

---

## Output Files

**Public (no auth required):**

```
src/router/(guest)/_guest/{module-name}.tsx
```

**Private (authenticated user):**

```
src/router/(private)/{module-name}/index.tsx
```

**Seller Centre:**

```
src/router/(seller-centre)/seller-centre/{module-name}s/index.tsx
src/router/(seller-centre)/seller-centre/{module-name}s/${module-name}Id.tsx
```

---

## Route Group Reference

| Group         | Folder                           | Auth        | Audience                 |
| ------------- | -------------------------------- | ----------- | ------------------------ |
| Guest         | `(guest)/_guest/`                | ❌ None     | Visitors, public         |
| Private       | `(private)/`                     | ✅ Required | Buyers, registered users |
| Seller Centre | `(seller-centre)/seller-centre/` | ✅ Required | Sellers/suppliers        |
| Dashboard     | `(dashboard)/admin/`             | ✅ Required | Admin/staff              |

---

## File Instructions

---

### Public Guest Route (e.g. `/faq`, `/help-center`)

```tsx
// src/router/(guest)/_guest/faq.tsx

import { createFileRoute } from "@tanstack/react-router";
import FAQPublicList from "@/features/faqs/public/list";
import faqPublicService from "@/services/api/public/faq"; // or admin service

export const Route = createFileRoute("/(guest)/_guest/faq")({
	component: RouteComponent,
	staleTime: 1000 * 60 * 10,
	loader: async () => {
		const result = await faqPublicService.getAll({
			page: 1,
			per_page: 100,
		});
		return result;
	},
});

function RouteComponent() {
	const loaderData = Route.useLoaderData();

	return <FAQPublicList faqs={loaderData?.data ?? []} />;
}
```

---

### Private User Route (e.g. `/onboarding-member`)

```tsx
// src/router/(private)/{module-name}/index.tsx

import { createFileRoute } from "@tanstack/react-router";
import {ModuleName}Page from "@/features/{module-name}s/private";
import {module-name}Service from "@/services/api/private/{module-name}";
import type { {ModuleName}QueryParams } from "@/types/pages/{module-name}";

export const Route = createFileRoute("/(private)/{module-name}/")({
  component: RouteComponent,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search?.page) || 1,
    per_page: Number(search?.per_page) || 10,
  }) as {ModuleName}QueryParams,
  loaderDeps: ({ search }) => ({ page: search.page, per_page: search.per_page }),
  loader: async ({ deps }) => {
    const result = await {module-name}Service.getAll(deps);
    return result;
  },
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const enrichedSearch = {
    ...search,
    page: loaderData?.meta?.current_page ?? 1,
    total: loaderData?.meta?.total ?? 0,
    total_pages: loaderData?.meta?.total_pages ?? 1,
  };

  return (
    <{ModuleName}Page
      data={loaderData?.data ?? []}
      search={enrichedSearch}
      navigate={navigate}
    />
  );
}
```

---

### Seller Centre Route

Follows the exact same pattern as the admin route (`/create-routes-admin`) but placed under:

```
src/router/(seller-centre)/seller-centre/{module-name}s/
```

The `basePath` passed to list/form components should be `/seller-centre/{module-name}s`.

---

## When to Use Each Route Group

- **Public FAQ / Help Center** → `(guest)/_guest/` — no auth, high cache TTL (`staleTime: 1000 * 60 * 10`)
- **User onboarding / profile** → `(private)/` — auth required, user-specific data
- **Seller manage products/quotations** → `(seller-centre)/seller-centre/` — seller auth, mirrors admin CRUD structure
- **Admin management** → `(dashboard)/admin/` — see `/create-routes-admin`

---

## Rules

| Rule                 | Detail                                                                           |
| -------------------- | -------------------------------------------------------------------------------- |
| Public routes        | Use higher `staleTime` (10+ minutes) since data changes infrequently             |
| No `validateSearch`  | Omit if the page has no filter/pagination URL state                              |
| Loader null safety   | Always use `?? []` or `?? null` when spreading loader data to components         |
| Layout group folders | Never mix route files across layout groups — each group has its own auth wrapper |
| Feature reuse        | Public and private pages can reuse feature components from `src/features/`       |
