---
description: Generate the create/edit form feature for a module (form wrapper + detail section components).
---

# Workflow: `/create-form`

> Generate the create/edit form feature for a module (form wrapper + detail section components).

---

## Context

Forms use **React Hook Form** with Zod validation via `@hookform/resolvers/zod`. The form wrapper handles mode switching (create/edit), submit logic with `toast.promise`, and navigation. Detail sections are split into sub-components inside a `sections/` folder.

---

## Trigger

Run this workflow after `/create-schemas`, `/create-types`, and `/create-services`. You need:

1. Module name
2. Schema from `/create-schemas`
3. Form fields and their input types (textarea, number, switch, select, etc.)
4. Whether the form has multiple logical sections (e.g. "Content", "Settings")

---

## Output Files

```
src/features/{module-name}s/form/{module-name}-form.tsx
src/features/{module-name}s/form/sections/detail-form.tsx
src/features/{module-name}s/form/sections/{other-section}-form.tsx  (if needed)
```

---

## File-by-File Instructions

---

### File 1: `{module-name}-form.tsx` — Main form wrapper

Responsibilities:

- Initialize `useForm` with `zodResolver` and `defaultValues`
- `useEffect` to `reset()` form when `mode === "edit"` and `defaultValues` change
- `onSubmit` calls service create or update based on mode
- Uses `toast.promise()` for async feedback
- Sticky top header bar with title + Cancel / Save buttons
- Body wraps `<{ModuleName}DetailsForm form={form} />` inside a `<Card>`

```tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import {ModuleName}DetailsForm from "./sections/detail-form";
import { ValidationErrorList } from "@/components/features/errors/ValidationError";
import { {ModuleName}FormSchema, type {ModuleName}FormValues } from "@/schemas/{module-name}.schemas";
import type { {ModuleName}FormProps, {ModuleName}FormData } from "@/types/pages/{module-name}";
import {module-name}AdminService from "@/services/api/admin/{module-name}";

const {ModuleName}Form = ({ mode, defaultValues }: {ModuleName}FormProps) => {
  const router = useRouter();
  const navigate = useNavigate();

  const form = useForm<{ModuleName}FormValues>({
    resolver: zodResolver({ModuleName}FormSchema),
    defaultValues: {
      id: defaultValues?.id || null,
      // ... map all schema fields to defaultValues or empty/default value
    },
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      reset({
        id: defaultValues?.id || null,
        // ... same mapping as above
      });
    }
  }, [mode, defaultValues, reset]);

  const onSubmit = async (data: {ModuleName}FormValues) => {
    try {
      const payload: {ModuleName}FormData = {
        // ... map schema values to payload
      };

      const actionPromise =
        mode === "create"
          ? {module-name}AdminService.create(payload)
          : {module-name}AdminService.update(defaultValues!.uuid!, payload);

      toast.promise(actionPromise, {
        loading: mode === "create" ? "Menambahkan {ModuleName}..." : "Memperbarui {ModuleName}...",
        success: (response) => {
          if (!response.status) throw new Error(response.message);
          navigate({ to: "/admin/{module-name}s" });
          router.invalidate();
          return response.message || "Berhasil menyimpan data {ModuleName}";
        },
        error: (err) => err.message || "Terjadi kesalahan saat menyimpan data",
      });
    } catch (error: any) {
      if (error?.errors) {
        toast.error(error?.message || "Gagal menyimpan data", {
          description: <ValidationErrorList errors={error?.errors} />,
          duration: 10000,
          closeButton: true,
        });
      } else {
        toast.error(error.message || "Terjadi kesalahan sistem");
      }
    }
  };

  const onError = (errors: any) => {
    console.error("Form Validation Error:", errors);
    toast.error("Mohon lengkapi formulir dengan benar");
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6 pb-8">
        {/* Sticky header */}
        <div className="sticky top-0 z-40 bg-background border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                {mode === "create" ? "Tambah {ModuleName} Baru" : "Edit {ModuleName}"}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {/* Contextual subtitle */}
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button type="button" variant="outline" className="flex-1 sm:flex-none"
                onClick={() => navigate({ to: "/admin/{module-name}s" })} disabled={isSubmitting}>
                Batalkan
              </Button>
              <Button type="submit" disabled={isSubmitting}
                className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                {isSubmitting ? "Menyimpan..." : "Simpan Data"}
              </Button>
            </div>
          </div>
        </div>

        {/* Form body */}
        <div className="max-w-7xl mx-auto px-4">
          <Card className="rounded-lg shadow-sm mb-10">
            <CardContent>
              <{ModuleName}DetailsForm form={form} />
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default {ModuleName}Form;
```

---

### File 2: `sections/detail-form.tsx` — Field inputs

Responsibilities:

- Renders all form fields using `<Controller>` from `react-hook-form`
- Organizes fields into logical visual sections with `border-b` divider headers
- Each field wrapped in `<FormItem>` → `<FormLabel>` → `<FormControl>` → `<FormDescription>` → `<FormMessage>`

**Input component mapping by field type:**

| Field type     | Component                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------- |
| Long text      | `<Textarea className="min-h-[80px] resize-y" />`                                            |
| Short text     | `<Input />`                                                                                 |
| Number         | `<NumberInput>` with `onValueChange={(v) => field.onChange(v.floatValue)}`                  |
| Boolean toggle | `<Switch checked={field.value} onCheckedChange={field.onChange} />` wrapped in a border box |
| Enum / role    | `<Select>` with `<SelectTrigger>` + `<SelectContent>` + `<SelectItem>` for each option      |
| Email          | `<Input type="email" />`                                                                    |
| Password       | `<Input type="password" />`                                                                 |

**Section grouping pattern:**

```tsx
<div className="space-y-4">
	<div className="flex items-center gap-2 pb-2 border-b">
		<h3 className="text-sm font-semibold text-gray-700">Section Title</h3>
	</div>
	<div className="grid grid-cols-1 md:grid-cols-2 gap-4">{/* Fields */}</div>
</div>
```

**Required field label pattern:**

```tsx
<FormLabel>
	Field Name <span className="text-red-500">*</span>
</FormLabel>
```

**Switch field invisible label trick** (for grid alignment):

```tsx
<FormLabel className="invisible">Status</FormLabel>
<div className="flex items-center justify-between p-3 bg-white rounded-lg border shadow-sm h-[42px]">
  ...
</div>
```

---

## Rules

| Rule                  | Detail                                                                                |
| --------------------- | ------------------------------------------------------------------------------------- |
| `toast.promise`       | Always use for async submit — never `toast.success` + `toast.error` in try/catch      |
| `router.invalidate()` | Call after successful save to refresh the list route's loader                         |
| UUID guard            | In `update` mode, throw if `defaultValues?.uuid` is missing                           |
| `useEffect` reset     | Always sync form to `defaultValues` in edit mode — needed when data loads after mount |
| Section headers       | Group related fields visually with `border-b` title rows                              |
| Bahasa Indonesia      | All labels, descriptions, error messages, and toasts                                  |
| `Controller`          | Always use `<Controller>` — never `register()` for custom input components            |

---

## Reference Pattern

See `src/features/faqs/form/faq-form.tsx` and `src/features/faqs/form/sections/detail-form.tsx` for complete working examples.
