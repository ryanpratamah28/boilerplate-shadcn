---
description: Generate TanStack Router file-based route files for the admin section of a module (list + form).
---

# Workflow: `/create-routes-admin`

> Generate TanStack Router file-based route files for the admin section of a module (list + form).

---

## Context

This project uses **TanStack Router** with file-based routing. Route files are co-located in `src/router/` and follow the folder/filename convention. Admin routes sit under the `(dashboard)` layout group. Routes use `loader` functions to pre-fetch data from services before the component renders.

---

## Trigger

Run this workflow after `/create-table-list`, `/create-form`, and `/create-services`. You need:

1. Module name and its plural form (e.g. `faq` → `faqs`)
2. The UUID param name (e.g. `$faqId`, `$userId`)
3. The `QueryParams` type from `/create-types`
4. The service object from `/create-services`

---

## Output Files

```
src/router/(dashboard)/admin/{module-name}s/index.tsx       ← List route
src/router/(dashboard)/admin/{module-name}s/${module-name}Id.tsx  ← Form route (create + edit)
```

---

## File-by-File Instructions

---

### File 1: `index.tsx` — Admin list route

This file:

- Defines the route with `createFileRoute`
- Sets `staleTime` and `gcTime` for loader caching
- Validates and types URL search params via `validateSearch`
- Declares `loaderDeps` to trigger re-fetch on search/filter/page changes
- Loads data with `loader` calling the service `getAll` function
- Renders the `{ModuleName}List` feature component with enriched search

```tsx
// Routing
import { createFileRoute } from "@tanstack/react-router";

// Components
import {ModuleName}List from "@/features/{module-name}s/list";

// Types
import type { {ModuleName}, {ModuleName}QueryParams } from "@/types/pages/{module-name}";

// API
import {module-name}AdminService from "@/services/api/admin/{module-name}";

export const Route = createFileRoute("/(dashboard)/admin/{module-name}s/")({
  component: RouteComponent,
  staleTime: 1000 * 60 * 5,    // 5 minutes
  gcTime: 1000 * 60 * 30,       // 30 minutes
  validateSearch: (search: Record<string, unknown>) => {
    return {
      search: search?.search as string,         // or "keyword" if API uses that
      is_active: search?.is_active as boolean,
      page: Number(search?.page) || 1,
      per_page: Number(search?.per_page) || 10,
      // add extra validated params here (e.g. role, sort_by, sort_order)
    } as {ModuleName}QueryParams;
  },
  loaderDeps: ({ search }) => ({
    search: search.search,
    is_active: search.is_active,
    page: search.page,
    per_page: search.per_page,
    // mirror all validateSearch fields here
  }),
  loader: async ({ deps }) => {
    const result = await {module-name}AdminService.getAll(deps);
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
    <{ModuleName}List
      {module-name}s={loaderData?.data as {ModuleName}[]}
      search={enrichedSearch}
      navigate={navigate}
      basePath="/admin/{module-name}s"
    />
  );
}
```

---

### File 2: `${module-name}Id.tsx` — Form route (create + edit)

This file:

- Handles both create (`params.{module-name}Id === "create"`) and edit (UUID) modes in a single route
- `loader` returns `{ mode: "create", data: null }` or `{ mode: "edit", data: {entity} }`
- Renders `{ModuleName}Form` with the resolved mode and defaultValues

```tsx
// Routing
import { createFileRoute } from "@tanstack/react-router";

// Components
import {ModuleName}Form from "@/features/{module-name}s/form/{module-name}-form";

// Types
import type { {ModuleName}, {ModuleName}FormData } from "@/types/pages/{module-name}";

// API
import {module-name}AdminService from "@/services/api/admin/{module-name}";

export const Route = createFileRoute("/(dashboard)/admin/{module-name}s/${{module-name}Id}")({
  component: RouteComponent,
  loader: async ({ params }) => {
    if (params.{module-name}Id === "create") {
      return { mode: "create" as const, data: null };
    }

    const response = await {module-name}AdminService.getByUuid(params.{module-name}Id);
    const data = response as {ModuleName};

    return { mode: "edit" as const, data };
  },
});

function RouteComponent() {
  const { mode, data } = Route.useLoaderData();

  return (
    <section id="{module-name}-form">
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
        <{ModuleName}Form mode={mode} defaultValues={data as {ModuleName}FormData} />
      </div>
    </section>
  );
}
```

---

## Route Path Conventions

| Layout group      | Route path prefix    | Use case                                  |
| ----------------- | -------------------- | ----------------------------------------- |
| `(dashboard)`     | `/admin/...`         | Admin/staff authenticated pages           |
| `(guest)/_guest`  | `/...`               | Public unauthenticated pages              |
| `(private)`       | `/...`               | Authenticated user (buyer/supplier) pages |
| `(seller-centre)` | `/seller-centre/...` | Seller portal pages                       |

---

## Rules

| Rule                   | Detail                                                                        |
| ---------------------- | ----------------------------------------------------------------------------- |
| `staleTime` + `gcTime` | Always set on list routes for loader caching                                  |
| `validateSearch`       | Must return a typed object matching `{ModuleName}QueryParams`                 |
| `loaderDeps`           | Must mirror all fields from `validateSearch` — this triggers re-fetch         |
| `enrichedSearch`       | Merge `meta` pagination values into `search` before passing to list component |
| `"create"` check       | Always guard `params.{module-name}Id === "create"` before calling `getByUuid` |
| `as const` on mode     | Use `"create" as const` and `"edit" as const` for discriminated union safety  |
| No business logic      | Route components are thin — all logic lives in feature components             |

---

## Real Example — FAQ Module

See:

- `src/router/(dashboard)/admin/faqs/index.tsx`
- `src/router/(dashboard)/admin/faqs/$faqId.tsx`
