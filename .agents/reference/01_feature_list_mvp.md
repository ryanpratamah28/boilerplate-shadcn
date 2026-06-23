# Feature List (MVP)

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: Codebase routes, feature pages_

This document details the granular, screen-level feature list grouped by functional modules.

---

## 🔐 Auth Module

### 1. Login Screen
- **Path**: `/login` (Guest Route)
- **Features**:
  - Fields for Username and Password.
  - Client-side validation: Username and Password fields are required.
  - Submission handler: Invokes API login service, updates `useAuthStore` with access/refresh tokens and user attributes, stores cookies, and redirects the user to the homepage/dashboard.
  - Error Toast: Displays dynamic error messages (in Bahasa Indonesia) on validation or server failures.

### 2. Register Screen
- **Path**: `/register` (Guest Route)
- **Features**:
  - Fields for Username, Name, Email, Role, Password, and Password Confirmation.
  - Role selection: Allows selecting between BUYER and SELLER.
  - Client-side validation: Validates email formatting, ensures passwords match and meet minimum lengths.
  - Submission handler: Submits registration payload to the server.

---

## 📦 Product Module

### 1. Product List Screen
- **Path**: `/products` (Private/Dashboard Route)
- **Features**:
  - Display list of product entries showing card attributes (Image, Name, Price, Location, Rating, Badges, Stock).
  - Action column: Offers Edit and Delete buttons.
  - Permission guard: Verifies `delete_products` permission before firing the deletion request.

### 2. Product Detail Screen
- **Path**: `/product/$productId`
- **Features**:
  - Full attribute display (including location, ratings, review count, original price).
  - Responsive details cards showing stock levels.

### 3. Product Create/Edit Form Screen
- **Path**: `/product/$productId/edit` or `/product/create`
- **Features**:
  - Input fields for product details (Name, Price, Location, Stock).
  - Validation: Form submission managed by React Hook Form using a Zod schema resolver.

---

## 👥 User Module

### 1. Profile View
- **Path**: `/profile` (Private Route)
- **Features**:
  - Basic placeholder displaying logged-in user profile details (Avatar, Name, Email, Role).

---

## ⏳ Deferred Features

| Feature | Target Phase | Rationale |
|---|---|---|
| **Multi-currency formatting** | Phase 2 | React Number Format is installed, but only IDR is supported in the current MVP phase. |
| **Advanced Search & Category Filter** | Phase 2 | Simple listing pagination is in scope; complex multi-category search filters are deferred. |
| **Stripe / Midtrans Payments** | Phase 3 | Payments are out of scope for the MVP boilerplate skeleton. |
