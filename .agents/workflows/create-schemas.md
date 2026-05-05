---
description: Generate Zod validation schemas for a module's form, driven by API collection requirements.
---

# Workflow: `/create-schemas`

> Generate Zod validation schemas for a module's form, driven by API collection requirements.

---

## Context

This project uses **Zod** with `react-hook-form` via `@hookform/resolvers/zod`. Schemas live in `src/schemas/{module-name}.schemas.ts` and are imported into both the form component and (optionally) the service layer for payload validation.

---

## Trigger

Run this workflow after `/create-types`. You need:

1. Module name
2. API collection body parameters for POST/PUT endpoints (field names, types, constraints)
3. Validation rules (required fields, min/max length, format, etc.)

---

## Output File

```
src/schemas/{module-name}.schemas.ts
```

---

## Step-by-Step Instructions

### Step 1 — Identify form fields from the API collection

From the POST/PUT body parameters, extract:

- Field name
- Type (string, number, boolean, enum, etc.)
- Required or optional
- Min/max length constraints
- Format (email, phone, URL, etc.)
- Enum values (e.g. roles: `"admin" | "super-admin" | "kemenkop_staff"`)

### Step 2 — Map API constraints to Zod validators

| API Constraint      | Zod Equivalent                                                |
| ------------------- | ------------------------------------------------------------- |
| required string     | `z.string().min(1, "Field wajib diisi")`                      |
| max length          | `.max(500, "Maksimal 500 karakter")`                          |
| email format        | `z.string().email("Format email tidak valid")`                |
| phone number        | `z.string().regex(/^\+?62\|^0/, "Format nomor tidak valid")`  |
| boolean             | `z.boolean()`                                                 |
| positive integer    | `z.coerce.number().int().min(0, "Tidak boleh negatif")`       |
| optional string     | `z.string().optional()` or `z.string().nullable().optional()` |
| enum                | `z.enum(["value1", "value2"])`                                |
| password min 8      | `z.string().min(8, "Password minimal 8 karakter")`            |
| nullable + optional | `z.number().nullable().optional()`                            |

### Step 3 — Write the Zod schema

```ts
// Third-party imports
import { z } from "zod";

export const {ModuleName}FormSchema = z.object({
  id: z.number().nullable().optional(),
  // ... all form fields with their validators
});

export type {ModuleName}FormValues = z.infer<typeof {ModuleName}FormSchema>;
```

### Step 4 — Handle conditional validation (if needed)

Use `.superRefine()` or `.refine()` for cross-field validation:

```ts
export const {ModuleName}FormSchema = z.object({
  password: z.string().min(8).optional(),
  confirm_password: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.password && data.password !== data.confirm_password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password tidak cocok",
      path: ["confirm_password"],
    });
  }
});
```

---

## Error Message Language

- Use **Bahasa Indonesia** for all error messages (matches existing FAQ module pattern)
- Pattern: `"[Field] wajib diisi"`, `"[Field] maksimal [N] karakter"`, `"Format [field] tidak valid"`

---

## Rules

| Rule                 | Detail                                                                           |
| -------------------- | -------------------------------------------------------------------------------- |
| `id` field           | Always `z.number().nullable().optional()` — present in edit mode                 |
| `is_active`          | Always `z.boolean()` — never optional                                            |
| `display_order`      | Use `z.coerce.number()` so HTML number inputs (which return strings) are coerced |
| Required text fields | Use `.min(1, ...)` not just `.nonempty()` for consistent error messages          |
| Enums                | Use `z.enum([...])` with literal values from API                                 |
| Export               | Export both the schema AND the inferred type                                     |
| No default export    | Only named exports                                                               |

---

## Real Example — User Management Module

Based on the API collection (POST `/admin/users`):

- `name`: required, min 2, max 255
- `email`: required, valid email, unique
- `password`: required, min 8 chars
- `phone`: optional, Indonesian format
- `role`: required, enum: `super-admin`, `admin`, `kemenkop_staff`

```ts
// src/schemas/user.schemas.ts

import { z } from "zod";

export const UserFormSchema = z.object({
	id: z.number().nullable().optional(),

	name: z
		.string()
		.min(2, "Nama minimal 2 karakter")
		.max(255, "Nama maksimal 255 karakter"),

	email: z
		.string()
		.min(1, "Email wajib diisi")
		.email("Format email tidak valid"),

	password: z
		.string()
		.min(8, "Password minimal 8 karakter")
		.optional()
		.or(z.literal("")),

	phone: z
		.string()
		.regex(/^(\+62|62|0)[0-9]{8,13}$/, "Format nomor telepon tidak valid")
		.optional()
		.or(z.literal("")),

	role: z.enum(["super-admin", "admin", "kemenkop_staff"], {
		errorMap: () => ({ message: "Role wajib dipilih" }),
	}),

	is_active: z.boolean(),
});

export type UserFormValues = z.infer<typeof UserFormSchema>;
```

---

## Reference Pattern

See `src/schemas/faq.schemas.ts` which exports `FAQFormSchema` and `FAQFormValues`.
