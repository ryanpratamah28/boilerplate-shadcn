---
description: Generate TypeScript type definitions for a new module based on API collection input.
---

# Workflow: `/create-types`

> Generate TypeScript type definitions for a new module based on API collection input.

---

## Context

This project uses **TanStack Router** with a React + TypeScript frontend. All module-specific types live in `src/types/pages/{module-name}.ts`. Types are consumed by services, schemas, components, and route loaders.

---

## Trigger

Run this workflow when starting a new module. You need:

1. The **module name** (e.g. `user`, `banner`, `product`)
2. The **API collection** or response shape (JSON fields, types, pagination)

---

## Output File

```
src/types/pages/{module-name}.ts
```

---

## Step-by-Step Instructions

### Step 1 — Analyze the API collection

From the API collection or response payload, identify:

- All **entity fields** returned by GET endpoints
- All **writable fields** accepted by POST/PUT endpoints
- All **query/filter params** accepted by the list endpoint
- Whether responses are **paginated** (has `meta` with `current_page`, `per_page`, `total`, `total_pages`)

### Step 2 — Generate types in this exact order

#### 1. Form Mode Union

```ts
export type {ModuleName}FormMode = "create" | "edit";
```

#### 2. Query Params

Used by the list page and URL search params:

```ts
export type {ModuleName}QueryParams = {
  search?: string;         // or `keyword` if API uses that field name
  is_active?: boolean;
  page?: number;
  per_page?: number;
  total?: number;          // used locally for pagination UI, not sent to API
  total_pages?: number;    // used locally for pagination UI, not sent to API
  // Add any additional filter fields from the API collection
  role?: string;           // example: for user management
  sort_by?: string;
  sort_order?: "asc" | "desc";
};
```

#### 3. List Response Wrapper

```ts
export type {ModuleName}ListResponse = {
  data: {ModuleName}[];
  meta: {
    current_page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
  };
};
```

#### 4. Form Props (passed into `<{ModuleName}Form />`)

```ts
export type {ModuleName}FormProps = {
  mode: {ModuleName}FormMode;
  defaultValues?: Partial<{ModuleName}FormData>;
};
```

#### 5. Main Entity Type (mirrors GET response exactly)

```ts
export type {ModuleName} = {
  id?: number;
  uuid: string;
  // All fields returned by the API GET response
  // Use exact field names from API
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
```

#### 6. Form Data Type (used inside React Hook Form)

```ts
export type {ModuleName}FormData = {
  id?: number | null;
  uuid?: string;
  // Only fields the user fills in the form
};
```

#### 7. Payload Type (sent to API on create/update)

```ts
export type {ModuleName}Payload = {
  // Only writable fields — no id, uuid, created_at, updated_at
};
```

---

## Rules

| Rule              | Detail                                            |
| ----------------- | ------------------------------------------------- |
| Date fields       | Always `string` (ISO format from API)             |
| Boolean fields    | Always `boolean`, never `0 \| 1`                  |
| IDs               | Use `number` for `id`, `string` for `uuid`        |
| Optional fields   | Use `?` suffix — never explicit `undefined` union |
| No default export | Only named exports                                |
| No React import   | Unless a field type is `React.ReactNode`          |
| Field names       | Match API response exactly (snake_case)           |

---

## Real Example — User Management Module

Based on the provided API collection:

```ts
// src/types/pages/user.ts

export type UserFormMode = "create" | "edit";

export type UserQueryParams = {
	keyword?: string;
	role?: string;
	is_active?: boolean;
	sort_by?: string;
	sort_order?: "asc" | "desc";
	page?: number;
	per_page?: number;
	total?: number;
	total_pages?: number;
};

export type UserListResponse = {
	data: AdminUser[];
	meta: {
		current_page?: number;
		per_page?: number;
		total?: number;
		total_pages?: number;
	};
};

export type UserFormProps = {
	mode: UserFormMode;
	defaultValues?: Partial<UserFormData>;
};

export type AdminUser = {
	id?: number;
	uuid: string;
	name: string;
	email: string;
	phone?: string;
	role: "super-admin" | "admin" | "kemenkop_staff";
	is_active: boolean;
	created_at: string;
	updated_at: string;
};

export type UserFormData = {
	id?: number | null;
	uuid?: string;
	name: string;
	email: string;
	password?: string;
	phone?: string;
	role: string;
	is_active?: boolean;
};

export type UserPayload = {
	name: string;
	email: string;
	password: string;
	phone?: string;
	role: string;
};
```

---

## Reference Pattern

See `src/types/pages/faq.ts` for a working example of this exact structure.
