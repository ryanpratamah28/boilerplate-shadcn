# Company & Project Facts

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: package.json, README.md_

This document captures standard configurations, naming schemas, brand rules, and core defaults for the boilerplate application.

---

## 🏢 Project Identity

- **Project Code Name**: `boilerplate-shadcn`
- **Owner Workspace**: `ryanpratamah28/boilerplate-shadcn`
- **Primary Technology Stack**: React 19 + Vite + Tailwind CSS v4 + ShadCN UI + TanStack Router
- **Target Platform**: Desktop and Mobile Responsive Web (served via PWA)
- **Primary Target Audience**: Merchants (Sellers), Consumers (Buyers), and Administrators (System Admins) in Indonesia.

---

## 🎨 Branding & Theme Default Rules

1. **Typography**:
   - **Primary Font**: Rethink Sans (`@fontsource/rethink-sans`)
   - **Fallback**: System sans-serif fonts
2. **Colors**:
   - Standard semantic variables:
     - `background` / `foreground` (General content backgrounds)
     - `primary` / `primary-foreground` (Core interaction branding)
     - `muted` / `muted-foreground` (Subtle text or borders)
     - `destructive` / `destructive-foreground` (Errors & deletion actions)
3. **Theme Settings**:
   - Supported options: `system`, `light`, `dark`
   - Managed via the `next-themes` utility layer
   - Defaults on fresh loads to the user's OS preference (`system`)

---

## 🍪 Auth Session Settings

- **Access Token Duration**: 1 Day (configured in cookie `access_token` expiration)
- **Refresh Token Duration**: 7 Days (configured in cookie `refresh_token` expiration)
- **Auth Storage Provider**: `js-cookie` helper, enabling seamless browser session transmission to the Axios API request client
