---
description: Generate an enum file containing all API endpoint constants for a module.
---

# Workflow: `/create-enum-endpoints`

> Generate an enum file containing all API endpoint constants for a module.

---

## Context

All API endpoint paths are centralized as string enums or const objects in `src/lib/enum/{module-name}.ts`. Services import from here — never hardcode URL strings in service files.

---

## Trigger

Run this workflow after `/create-types`. You need:

1. The **module name**
2. The **API collection** showing all endpoint paths and HTTP methods

---

## Output File

```
src/lib/enum/{module-name}.ts
```

---

## Step-by-Step Instructions

### Step 1 — Identify all endpoints from the API collection

For each endpoint, note:

- HTTP method (GET, POST, PUT, PATCH, DELETE)
- Path pattern (e.g. `/api/v1/admin/users`, `/api/v1/admin/users/{uuid}`)
- Whether it requires a dynamic segment (e.g. `{uuid}`, `{id}`)

### Step 2 — Determine the base path prefix

Extract the repeated prefix from all endpoints:

```
/api/{{api_version}}/admin/{module-name}
```

The `{{api_version}}` and `{{base_url}}` are handled by the `apiInstance` axios config — do NOT include them in the enum.

### Step 3 — Generate the enum constant

Use an **object `as const`** pattern (not a TypeScript `enum`):

```ts
export const {MODULE_NAME}_ADMIN_ENDPOINTS = {
  // List all items — GET /admin/{module-name}
  {MODULE_NAME}S: "/admin/{module-name}",

  // Create — POST /admin/{module-name}
  CREATE_{MODULE_NAME}: "/admin/{module-name}",

  // Get by UUID — GET /admin/{module-name}/{uuid}
  {MODULE_NAME}_BY_UUID: (uuid: string) => `/admin/{module-name}/${uuid}`,

  // Update — PUT /admin/{module-name}/{uuid}
  UPDATE_{MODULE_NAME}: (uuid: string) => `/admin/{module-name}/${uuid}`,

  // Delete — DELETE /admin/{module-name}/{uuid}
  DELETE_{MODULE_NAME}: (uuid: string) => `/admin/{module-name}/${uuid}`,

  // Statistics — GET /admin/{module-name}/statistics (if exists)
  {MODULE_NAME}_STATISTICS: "/admin/{module-name}/statistics",
} as const;
```

### Step 4 — Add public endpoints (if applicable)

If the module has public-facing endpoints (no auth required):

```ts
export const {MODULE_NAME}_PUBLIC_ENDPOINTS = {
  {MODULE_NAME}S: "/public/{module-name}",
  {MODULE_NAME}_BY_UUID: (uuid: string) => `/public/{module-name}/${uuid}`,
} as const;
```

---

## Naming Conventions

| Pattern          | Convention                                 |
| ---------------- | ------------------------------------------ |
| Constant name    | `SCREAMING_SNAKE_CASE`                     |
| List endpoint    | `{MODULE_NAME}S` (plural)                  |
| Single item      | `{MODULE_NAME}_BY_UUID`                    |
| Create           | `CREATE_{MODULE_NAME}`                     |
| Update           | `UPDATE_{MODULE_NAME}`                     |
| Delete           | `DELETE_{MODULE_NAME}`                     |
| Statistics       | `{MODULE_NAME}_STATISTICS`                 |
| Dynamic segments | Arrow function `(uuid: string) => \`...\`` |

---

## Rules

- **Never** include `{{base_url}}` or `{{api_version}}` — handled by axios instance
- Create and List share the same path (only method differs) — one constant is fine
- Update and Delete share the same path — use the same arrow function pattern
- If two methods share a path with different semantics, keep separate constants for clarity
- Use `as const` — never TypeScript `enum` keyword

---

## Real Example — User Management Module

```ts
// src/lib/enum/user.ts

export const USER_ADMIN_ENDPOINTS = {
	USERS: "/admin/users",
	CREATE_USER: "/admin/users",
	USER_STATISTICS: "/admin/users/statistics",
	USER_BY_UUID: (uuid: string) => `/admin/users/${uuid}`,
	UPDATE_USER: (uuid: string) => `/admin/users/${uuid}`,
	DELETE_USER: (uuid: string) => `/admin/users/${uuid}`,
} as const;
```

---

## Reference Pattern

See `src/lib/enum/faq.ts` which exports `FAQ_ADMIN_ENDPOINTS` used by `src/services/api/admin/faq.ts`.
