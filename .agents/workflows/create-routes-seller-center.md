---
description: Generate TanStack Router route files for the Seller Centre section of a module.
---

# Workflow: `/create-routes-seller-centre`

> Generate TanStack Router route files for the Seller Centre section of a module.

---

## Context

The Seller Centre is a separate portal for suppliers/sellers. It lives under the `(seller-centre)` layout group and mirrors the admin CRUD structure but scoped to the authenticated seller's own data. Routes sit under `src/router/(seller-centre)/seller-centre/{module-name}s/`.

---

## Trigger

Run this workflow when a module needs seller-facing CRUD pages. You need:

1. Module name and plural form
2. The UUID param name (e.g. `$quotationId`)
3. The service for seller-facing API (may differ from admin service — check API collection for `/seller-centre/` prefixed endpoints)
4. The `QueryParams` type from `/create-types`

---

## Output Files

```
src/router/(seller-centre)/seller-centre/{module-name}s/index.tsx
src/router/(seller-centre)/seller-centre/{module-name}s/${module-name}Id.tsx
```

---

## Step-by-Step Instructions

### Step 1 — Check the API collection for seller endpoints

Seller endpoints typically have a different path prefix, e.g.:

```
/api/v1/seller-centre/{module-name}s          ← list + create
/api/v1/seller-centre/{module-name}s/{uuid}   ← get, update, delete
```

If a separate seller service exists, use it. If the module is admin-only and sellers see a read-only view, omit create/edit buttons from the table actions.

### Step 2 — Generate `index.tsx` (seller list route)

Follow the exact same structure as the admin list route from `/create-routes-admin`, with these differences:

```tsx
export const Route = createFileRoute(
  "/(seller-centre)/seller-centre/{module-name}s/"
)({
  // ...same loader, validateSearch, loaderDeps pattern
});

function RouteComponent() {
  // ...
  return (
    <{ModuleName}List
      {module-name}s={loaderData?.data as {ModuleName}[]}
      search={enrichedSearch}
      navigate={navigate}
      basePath="/seller-centre/{module-name}s"  // ← different basePath
    />
  );
}
```

### Step 3 — Generate `${module-name}Id.tsx` (seller form route)

```tsx
export const Route = createFileRoute(
  "/(seller-centre)/seller-centre/{module-name}s/${{module-name}Id}"
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    if (params.{module-name}Id === "create") {
      return { mode: "create" as const, data: null };
    }
    const response = await {module-name}SellerService.getByUuid(params.{module-name}Id);
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

## basePath Convention

The `basePath` prop is the key differentiator between admin and seller routes:

| Context       | basePath value                  |
| ------------- | ------------------------------- |
| Admin         | `/admin/{module-name}s`         |
| Seller Centre | `/seller-centre/{module-name}s` |
| Private user  | `/{module-name}s`               |

All `Link` navigation inside list and form components use `basePath` — never hardcoded paths.

---

## When to Create a Separate Seller Service

Create a separate `src/services/api/seller/{module-name}.ts` when:

- The API collection has `/seller-centre/` prefixed endpoints
- The seller API returns different fields than the admin API
- Seller has different permissions (e.g. cannot delete, only view own records)

Otherwise, reuse the admin service if the endpoints are the same.

---

## Rules

- `basePath` must always point to `/seller-centre/{module-name}s` — never admin paths
- Follow identical loader/validateSearch/loaderDeps patterns as admin routes
- If seller cannot create items, omit `{ModuleName}TableActions` from the list component or pass a `readonly` prop
- Seller routes must always be inside `(seller-centre)` layout group — never `(dashboard)`
