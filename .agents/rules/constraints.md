# Constraints

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: pattern-rules.md, package.json_

This document specifies the technical and design constraints that must be adhered to at all times.

---

## 💻 Tech Stack Constraints

### 1. React 19
- Must utilize React 19 features (e.g., cleanup functions returning from `useEffect`, proper use of `use` hook, simplified ref forwarding).
- Avoid legacy patterns (e.g. `defaultProps` on function components, which React 19 deprecates).

### 2. Tailwind CSS v4
- Must use Tailwind v4 utility syntax.
- All styles must be handled via utility classes or custom CSS tokens in `src/assets/` or `src/styles/`. No inline styles (`style={{ ... }}`) allowed unless calculating dynamic coordinates.
- Colors must reference theme variables (e.g. `bg-background`, `text-primary`) rather than hardcoded tailwind values (e.g. `bg-white`, `text-blue-500`) unless specifying status decorations.

### 3. TypeScript Strict Mode
- Strict mode is enabled (`tsconfig.json`).
- Avoid using the `any` type. If absolutely unavoidable, document the exception with `// eslint-disable-next-line @typescript-eslint/no-explicit-any` and a detailed justification.
- Avoid casting with `as` unless typing API response arrays or testing assertions.

---

## 🇮🇩 Localization Constraints (KBBI)

- All UI text displayed to the user must be in **Bahasa Indonesia (KBBI)**.
- Form inputs, validation alerts, toast notifications, confirmation headers, loading text, and titles must use the approved translations from the **[Glossary](file:///.agents/facts/glossary.md)**.
- Validation message formatting rules:
  - *Required field*: `"{Field} wajib diisi"`
  - *Min length*: `"{Field} minimal {n} karakter"`
  - *Max length*: `"{Field} maksimal {n} karakter"`
  - *Invalid format*: `"{Field} tidak valid"`

---

## 🏗️ Architectural Constraints

- **No direct window.location manipulations**: Route navigation must use TanStack Router `Link` components or the `useNavigate` hook to ensure correct route tree states.
- **Form validation**: All form submissions must route through React Hook Form using Zod resolver schemes. Uncontrolled raw input submissions are prohibited.
