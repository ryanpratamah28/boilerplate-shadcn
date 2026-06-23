# Project Scope

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: Codebase structure, README.md_

This document specifies the exact functional boundaries of the current boilerplate project, distinguishing in-scope items from deferred out-of-scope requirements.

---

## 🎯 In-Scope Features (MVP)

### 1. Authentication & Security
- Username-password validation against the backend API.
- Secure cookie-based token persistence (`access_token`, `refresh_token`).
- Private and Guest route guards using TanStack Router.
- Dynamic permission queries using `hasPermission(permission)` checks.

### 2. Product Management
- List view showing product cards (name, rating, price, badges, stock).
- Detail view showing comprehensive product attributes.
- CRUD action integration (delete product permission verification, form submission).

### 3. Progressive Web App (PWA)
- PWA compatibility checks (detect iOS Safari, Android standalone wrapper).
- Client store tracking for installer prompts.

### 4. Language & Styling
- Full Bahasa Indonesia (KBBI) translation compliance on all user-visible components.
- Responsive designs supporting Mobile, Tablet, and Desktop screen widths.
- Theme toggles (System, Light, Dark).

---

## 🚫 Out-of-Scope (Deferred / Future Phase)

### 1. Payment Integration
- No checkout flows, payment gateways (Xendit, Midtrans, Stripe), or invoice generation are in-scope.

### 2. Multi-Vendor Logistics
- Complex shipping calculations, real-time courier tracking integrations (JNE, J&T), and warehouse stock routing.

### 3. Advanced Dashboard Reporting
- Recharts visualizations are supported by dependencies but building extensive, dynamic admin analytics dashboard panels is out-of-scope for the MVP boilerplate.

### 4. Native Applications
- Mobile native packages (React Native, Capacitor wrapper build steps) are out-of-scope. The app will be served exclusively as a responsive PWA.
