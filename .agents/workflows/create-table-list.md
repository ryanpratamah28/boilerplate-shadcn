---
description: Generate the full table list feature for a module's admin page (index, table, column headers, column actions, table actions).
---

# Workflow: `/create-table-list`

> Generate the full table list feature for a module's admin page (index, table, column headers, column actions, table actions).

---

## Context

List pages use **TanStack Table** with server-side pagination. All filter/search/pagination state is synced to the URL via a custom `useTableUrlState` hook. The feature folder structure lives under `src/features/{module-name}s/list/`.

---

## Trigger

Run this workflow after `/create-types`, `/create-services`, and `/create-enum-endpoints`. You need:

1. Module name
2. Entity type fields (to determine which columns to show)
3. Filter fields (from `QueryParams` type)

---

## Output Files

```
src/features/{module-name}s/list/index.tsx
src/features/{module-name}s/list/{module-name}-table.tsx
src/features/{module-name}s/list/{module-name}-table-actions.tsx
src/features/{module-name}s/list/{module-name}-column-header.tsx
src/features/{module-name}s/list/{module-name}-column-action.tsx
```

---

## File-by-File Instructions

---

### File 1: `index.tsx` — List page wrapper

This is the top-level component passed to the route. It renders the page header, table actions button, and the table itself.

```tsx
// Components
import {ModuleName}Table from "./{module-name}-table";
import {ModuleName}TableActions from "./{module-name}-table-actions";

// Types
import type { {ModuleName}, {ModuleName}QueryParams } from "@/types/pages/{module-name}";

interface {ModuleName}ListProps {
  {module-name}s: {ModuleName}[];
  search: {ModuleName}QueryParams;
  navigate: any;
  basePath: string;
}

const {ModuleName}List = ({ {module-name}s, search, navigate, basePath }: {ModuleName}ListProps) => {
  return (
    <main id="{module-name}-list" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Daftar {ModuleName}</h2>
          <p className="text-muted-foreground mt-1">Kelola data {module-name} di sini.</p>
        </div>
        <{ModuleName}TableActions basePath={basePath} />
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1">
        <{ModuleName}Table data={{module-name}s} search={search} navigate={navigate} basePath={basePath} />
      </div>
    </main>
  );
};

export default {ModuleName}List;
```

---

### File 2: `{module-name}-table-actions.tsx` — Add new button

```tsx
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface {ModuleName}TableActionsProps {
  basePath: string;
}

const {ModuleName}TableActions = ({ basePath }: {ModuleName}TableActionsProps) => {
  return (
    <div className="w-full flex justify-end items-end md:w-fit">
      <Link to={`${basePath}/${{module-name}Id`} as string} params={{ {module-name}Id: "create" }}>
        <Button variant="default">
          <PlusIcon />
          <span>Tambah {ModuleName}</span>
        </Button>
      </Link>
    </div>
  );
};

export default {ModuleName}TableActions;
```

---

### File 3: `{module-name}-column-action.tsx` — Row-level Edit/Delete buttons

```tsx
import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/features/dialog/ConfirmationDialog";
import OpenDialogOnElementClick from "@/components/features/dialog/OpenDialogOnElementClick";
import { Pen, Trash2 } from "lucide-react";
import type { {ModuleName} } from "@/types/pages/{module-name}";
import {module-name}AdminService from "@/services/api/admin/{module-name}";

interface ActionCellProps {
  row: {ModuleName};
  basePath: string;
}

export const {ModuleName}ActionCell = ({ row, basePath }: ActionCellProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await {module-name}AdminService.delete(row.uuid);
    if (result?.status) {
      toast.success(result.message || "{ModuleName} berhasil dihapus");
      router.invalidate();
    } else {
      toast.error(result?.message || "Gagal menghapus {module-name}");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-start gap-1">
      <Button variant="outline" size="icon" className="h-8 w-8" asChild>
        <Link to={`${basePath}/${{module-name}Id`} as string} params={{ {module-name}Id: row.uuid }}>
          <Pen className="h-4 w-4" />
          <span className="sr-only">Edit {ModuleName}</span>
        </Link>
      </Button>
      <OpenDialogOnElementClick
        element={Button}
        elementProps={{
          variant: "outline",
          size: "icon",
          children: <><Trash2 className="h-4 w-4" /><span className="sr-only">Hapus</span></>,
          className: "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10",
        }}
        dialog={ConfirmationDialog}
        dialogProps={{
          title: "Hapus {ModuleName} ini?",
          content: "Tindakan ini tidak dapat dibatalkan.",
          confirmText: isLoading ? "Menghapus..." : "Hapus",
          confirmButtonColor: "error",
          handleConfirm: handleDelete,
        }}
      />
    </div>
  );
};
```

---

### File 4: `{module-name}-column-header.tsx` — Column definitions

Build columns from entity fields. Always include:

- Identifier/order column (if `display_order` exists)
- Main content column (the primary text field, with `enableHiding: false`)
- `is_active` status badge column
- `created_at` and `updated_at` date columns
- `actions` column (sticky right, `enableSorting: false`)

```tsx
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { {ModuleName}ActionCell } from "./{module-name}-column-action";
import { DataTableColumnHeader } from "@/components/features/data-table";
import { formatDate } from "@/lib/helpers/date";
import type { {ModuleName} } from "@/types/pages/{module-name}";
import { type ColumnDef } from "@tanstack/react-table";

export const {module-name}Columns = (basePath: string): ColumnDef<{ModuleName}>[] => [
  // ... columns
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
    cell: ({ row }) => <{ModuleName}ActionCell row={row.original} basePath={basePath} />,
    enableSorting: false,
    enableHiding: false,
    meta: { className: "sticky end-0 z-10 bg-background" },
  },
];
```

**Column patterns by field type:**

| Field type                        | Render pattern                                           |
| --------------------------------- | -------------------------------------------------------- |
| `display_order`                   | `<Badge variant="outline">` centered                     |
| Long text (header/content)        | Two-line `flex-col` with `line-clamp-2` / `line-clamp-3` |
| `is_active`                       | Green/red `Badge` with "Aktif" / "Nonaktif"              |
| Date (`created_at`, `updated_at`) | `formatDate(new Date(value))`                            |
| Enum/role                         | Colored `Badge` mapped from value                        |

---

### File 5: `{module-name}-table.tsx` — TanStack Table wiring

Key setup requirements:

- `manualPagination: true` (server-side)
- `pageCount: search.total_pages ?? -1`
- Use `useTableUrlState` hook for URL-synced filters and pagination
- Initial `sorting` state should default to the module's natural sort field
- Include `DataTableToolbar` with `searchKey` and `filters` array
- Include `DataTablePagination` at bottom
- Empty state uses a relevant icon from `lucide-react` with Bahasa Indonesia copy

```tsx
const STATUS_OPTIONS: FilterOption[] = [
  { value: true, name: "Aktif" },
  { value: false, name: "Nonaktif" },
];

// useTableUrlState column filters must match QueryParams field names:
columnFilters: [
  { columnId: "header", searchKey: "search", type: "string" },   // or "keyword"
  {
    columnId: "is_active",
    searchKey: "is_active",
    type: "boolean",
    deserialize: (v) => v === "true" ? true : v === "false" ? false : undefined,
    serialize: (v) => typeof v === "boolean" ? String(v) : "",
  },
],
```

---

## Rules

- All UI copy (labels, empty state, toasts) in **Bahasa Indonesia**
- All imports use `@/` path aliases — no relative `../../`
- `Link` for navigation, never `<a>` tags
- `router.invalidate()` after successful delete to refresh loader data
- `basePath` prop threaded through all components — never hardcode `/admin/{module-name}`

---

## Reference Pattern

See all files in `src/features/faqs/list/` as the complete working reference.
