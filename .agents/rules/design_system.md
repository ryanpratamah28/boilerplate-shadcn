# Design System Guidelines

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: pattern-rules.md, Tailwind CSS v4 docs_

This document governs visual, typography, spacing, and styling tokens for the boilerplate web application.

---

## 📱 Breakpoint Configuration (Tailwind CSS v4)

Always develop using a mobile-first approach, using responsive prefixes to scale layouts for larger screens:

| Breakpoint | Min Width | Target Devices | Usage Layout |
|---|---|---|---|
| `sm` | 640px | Large phones, small tablets | Stacked columns collapse to 2 columns |
| `md` | 768px | Standard tablets | Form layouts split, navigation menu toggles |
| `lg` | 1024px | Small laptops | Full sidebar or horizontal nav visible |
| `xl` | 1280px | Desktops | Max-container limits (`max-w-7xl`) |
| `2xl` | 1536px | Large monitors | Grid spreads and increased card margins |

---

## 🎨 Typography & Colors

1. **Typography**:
   - Primary font family: Rethink Sans (`font-sans`) from `@fontsource/rethink-sans`.
   - Scale sizes: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.
2. **Colors**:
   - Backgrounds: `bg-background`, `bg-card`, `bg-popover`.
   - Typography: `text-foreground`, `text-muted-foreground`, `text-primary`.
   - Borders: `border-border`, `border-input`, `ring-ring`.

---

## 🧩 UI Components & ShadCN Conventions

- **Component Primitives**: Always prefer importing existing primitives from `src/components/ui/` (e.g. `Button`, `Input`, `Dialog`, `Select`). Do not build these from scratch.
- **Modifying Primitives**: Do not modify files in `src/components/ui/` directly unless extending them. Instead, pass custom styles using `className` combined with the class-merging utility:
  ```typescript
  import { cn } from "@/lib/utils";
  
  // Example component wrapper
  export function CustomCard({ className, ...props }) {
    return <div className={cn("rounded-lg border bg-card p-6 shadow-sm", className)} {...props} />;
  }
  ```

---

## 🔍 Icons (Lucide React)

Use Lucide React (`lucide-react`) as the primary icon set. Adopt the following sizing standards:
- **Default/Small Icons** (inline buttons, links): `className="h-4 w-4" aria-hidden="true"`
- **Medium Icons** (dashboard stats, settings sections): `className="h-5 w-5" aria-hidden="true"`
- **Large Icons** (empty state illustrations, page headers): `className="h-6 w-6" aria-hidden="true"`
- *Note*: Always attach `aria-hidden="true"` or use `<span className="sr-only">Label</span>` for screen readers.
