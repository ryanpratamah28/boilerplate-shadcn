---
trigger: always_on
---

# Workspace Rules

## Overview

These rules define the coding standards, design guidelines, and development conventions for this project. All contributors and AI agents must follow these rules consistently.

---

## 1. Responsive Design

All UI components and pages **must be responsive** across all device breakpoints.

### Breakpoint Reference (Tailwind CSS v4)

| Breakpoint | Min Width | Usage                       |
| ---------- | --------- | --------------------------- |
| `sm`       | 640px     | Small tablets, large phones |
| `md`       | 768px     | Tablets                     |
| `lg`       | 1024px    | Small laptops               |
| `xl`       | 1280px    | Desktops                    |
| `2xl`      | 1536px    | Large screens               |

### Rules

- **Mobile-first approach**: Write base styles for mobile, then use responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) to scale up.
- **No fixed widths** on layout containers — use `w-full`, `max-w-*`, or `flex`/`grid` utilities.
- **Touch targets**: Interactive elements (buttons, links) must have a minimum size of `44px × 44px` on mobile.
- **Typography scaling**: Use responsive font sizes (e.g., `text-sm md:text-base lg:text-lg`).
- **Grid and flex layouts**: Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` patterns for multi-column content.
- **Navigation**: Mobile navigation must use a collapsible menu (hamburger or bottom nav pattern).
- **Tables**: Wrap all `<Table>` components inside a horizontal scroll container (`overflow-x-auto`).
- **Images**: Always use `w-full h-auto` or constrain with `object-cover` and aspect-ratio utilities.
- **Form layouts**: Stack form fields vertically on mobile, use grid on desktop (`grid-cols-1 md:grid-cols-2`).
- **Test on**: 375px (mobile), 768px (tablet), 1280px (desktop) before marking a task complete.

---

## 2. UI Components & Styling

All visual components must use **ShadCN UI** as the primary component library, styled with **Tailwind CSS v4** utility classes.

### ShadCN UI

- **Always prefer ShadCN components** over building from scratch: `Button`, `Input`, `Select`, `Dialog`, `Card`, `Badge`, `Table`, `Form`, `Switch`, `Textarea`, `Tooltip`, `DropdownMenu`, etc.
- **Do not override ShadCN component internals** directly — extend via `className` prop using `cn()` utility.
- Use the `cn()` helper from `@/lib/utils` for conditional and merged class names.
- ShadCN form components must always be used with `react-hook-form` via the `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>` pattern.

### Tailwind CSS v4

- **No inline styles** (`style={{ }}`) — always use Tailwind utility classes.
- **No arbitrary magic numbers** — use spacing scale (`p-4`, `mt-6`, `gap-2`) not `p-[13px]` unless there is no alternative.
- **Dark mode**: Support dark mode using the `dark:` prefix for all color-related classes.
- **Color tokens**: Use semantic CSS variable colors (`bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `ring`, `primary`, `destructive`) instead of raw color classes like `bg-white` or `text-gray-700` except for decorative/status-only elements.
- **Avoid redundant classes**: Do not combine conflicting utilities (e.g., `flex block`).
- **Component-level spacing**: Use `space-y-*` and `gap-*` for consistent internal spacing.

### Icon Usage

- Use **Lucide React** (`lucide-react`) as the sole icon library.
- Icon size convention: `h-4 w-4` (default), `h-5 w-5` (medium), `h-6 w-6` (large).
- Always add `aria-hidden="true"` or `<span className="sr-only">` for accessibility.

---

## 3. Scalability & Maintainability

Code must be written to be **easy to extend, refactor, and understand** by other developers.

### Component Architecture

- **Single Responsibility**: Each component should do one thing. Split large components into smaller, focused sub-components.
- **Feature-based folder structure**:

```
src/
├── components/          # Shared/reusable UI components
│   ├── ui/              # ShadCN UI primitives
│   └── features/        # Domain-specific reusable components
├── features/            # Page-level feature modules
│   └── {module}/
│       ├── list/        # List/table view components
│       └── form/
│           ├── {module}-form.tsx
│           └── sections/ # Sub-sections of the form
├── services/api/        # API service functions
├── types/pages/         # TypeScript types per module
├── schemas/             # Zod validation schemas
├── lib/enum/            # API endpoint enums
├── store/               # Zustand global stores
├── hooks/               # Custom React hooks
└── router/              # TanStack Router file-based routes
```

- **Props typing**: Always define explicit TypeScript `interface` or `type` for component props. Never use `any` for prop types.
- **No prop drilling beyond 2 levels** — use Zustand store or React Context for shared state.
- **Export consistency**: Use named exports for components; default export only for route-level page components.

### TypeScript

- **Strict mode** must be enabled. No `any` unless absolutely unavoidable (document with `// eslint-disable-next-line @typescript-eslint/no-explicit-any` and a reason).
- Always type API responses using the shared `ApiResponse<T>` generic type.
- Use `type` for data shapes and `interface` for component props and extensible objects.
- Prefer `Partial<T>` and `Pick<T, K>` over redefining subset types manually.

### Reusability

- Common table patterns (column headers, action cells, pagination) must follow the existing `DataTable*` component conventions.
- Form patterns must use `react-hook-form` + Zod via `zodResolver`. Do not use uncontrolled inputs.
- API services must be grouped as a named service object (e.g., `faqAdminService`) with `.getAll`, `.getByUuid`, `.create`, `.update`, `.delete` methods.

### State Management

- **Server state** (API data): Use TanStack Router `loader` functions. Do not use `useEffect` + `useState` for initial data fetching.
- **Global client state**: Use **Zustand** stores in `src/store/`. Keep stores small and purpose-specific.
- **Form state**: Managed exclusively by `react-hook-form`.
- **URL state**: Pagination, filters, and search params must be synced to the URL using TanStack Router's `validateSearch` + `loaderDeps`.

### Code Quality

- **No dead code**: Remove commented-out blocks before committing.
- **Consistent naming**:
    - Files: `kebab-case` (e.g., `faq-table.tsx`)
    - Components: `PascalCase` (e.g., `FAQTable`)
    - Functions/hooks: `camelCase` (e.g., `useTableUrlState`)
    - Types/interfaces: `PascalCase` (e.g., `FAQFormData`)
    - Enums: `SCREAMING_SNAKE_CASE` for values (e.g., `FAQ_ADMIN_ENDPOINTS`)
- **Avoid magic strings**: All API endpoint paths must be declared in the corresponding enum file under `src/lib/enum/`.

---

## 4. Language: Bahasa Indonesia (KBBI)

All **user-facing text** must be written in **Bahasa Indonesia** following KBBI (Kamus Besar Bahasa Indonesia) spelling conventions.

### Scope

This rule applies to:

- UI labels, headings, and page titles
- Button text and call-to-action text
- Form field labels, placeholders, and descriptions
- Toast/notification messages (success, error, loading)
- Empty state messages
- Confirmation dialog text
- Table column headers
- Error messages and validation feedback

### Does NOT apply to

- Code identifiers (variable names, function names, file names — use English)
- TypeScript types and interfaces (use English)
- API endpoint paths (use English)
- Comments in code (English preferred for consistency)
- Technical configuration files

### Glossary of Standard Terms

Use these approved translations consistently across the entire codebase:

| English         | Bahasa Indonesia |
| --------------- | ---------------- |
| Add / Create    | Tambah / Buat    |
| Edit / Update   | Ubah / Perbarui  |
| Delete / Remove | Hapus            |
| Save            | Simpan           |
| Cancel          | Batalkan         |
| Search          | Cari             |
| Filter          | Filter           |
| Status          | Status           |
| Active          | Aktif            |
| Inactive        | Nonaktif         |
| Loading         | Memuat...        |
| Submit          | Kirim            |
| Back            | Kembali          |
| Detail          | Detail           |
| List            | Daftar           |
| Name            | Nama             |
| Description     | Deskripsi        |
| Date            | Tanggal          |
| Action          | Aksi             |
| Confirm         | Konfirmasi       |
| Yes             | Ya               |
| No              | Tidak            |
| Success         | Berhasil         |
| Failed          | Gagal            |
| Error           | Kesalahan        |
| Required field  | Wajib diisi      |
| Invalid         | Tidak valid      |
| Upload          | Unggah           |
| Download        | Unduh            |
| Preview         | Pratinjau        |
| Settings        | Pengaturan       |
| Sort            | Urutkan          |
| Order           | Urutan           |
| Page            | Halaman          |
| Per page        | Per halaman      |
| Total           | Total            |
| Created at      | Dibuat pada      |
| Updated at      | Diperbarui pada  |

### Validation Message Patterns

```
Required:     "{Field} wajib diisi"
Min length:   "{Field} minimal {n} karakter"
Max length:   "{Field} maksimal {n} karakter"
Min value:    "{Field} tidak boleh kurang dari {n}"
Invalid:      "{Field} tidak valid"
```

### Toast Message Patterns

```
Loading:   "Memuat {noun}..." / "Menyimpan {noun}..." / "Menghapus {noun}..."
Success:   "{Noun} berhasil {verb}" (e.g., "FAQ berhasil dihapus")
Error:     "Gagal {verb} {noun}" (e.g., "Gagal menghapus FAQ")
```

---

## 5. Project Dependencies Reference

| Package                  | Version   | Usage                             |
| ------------------------ | --------- | --------------------------------- |
| `react`                  | ^19.1.1   | Core UI library                   |
| `typescript`             | ~5.8.3    | Static typing                     |
| `vite`                   | ^7.1.7    | Build tool                        |
| `tailwindcss`            | ^4.1.14   | Utility-first CSS                 |
| `@tanstack/react-router` | ^1.132.31 | File-based routing + data loading |
| `react-hook-form`        | ^7.64.0   | Form state management             |
| `zod`                    | ^3.25.76  | Schema validation                 |
| `lucide-react`           | ^0.544.0  | Icon library                      |
| `recharts`               | ^3.4.1    | Charts and data visualization     |
| `swiper`                 | ^12.0.2   | Carousel/slider component         |
| `date-fns`               | ^4.1.0    | Date formatting utilities         |
| `react-datepicker`       | 8.9.0     | Date picker input                 |

### Dependency Usage Rules

- **Charts**: Always use `recharts` — do not install alternative charting libraries.
- **Carousels/Sliders**: Use `swiper` — do not use CSS-only custom sliders for complex cases.
- **Dates**: Format all dates using `date-fns`. Use `react-datepicker` for date picker form inputs.
- **Routing**: All navigation must use TanStack Router's `<Link>` and `useNavigate` — no direct `window.location` manipulation.
- **Validation**: All form schemas must use `zod`. Do not use `yup` or manual validation logic.
- **Do not add new dependencies** without team discussion. Prefer extending existing libraries first.
