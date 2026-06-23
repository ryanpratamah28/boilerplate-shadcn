# Assumptions

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: Codebase analysis, README.md_

This document details the architectural, environment, styling, and data-handling assumptions made during the bootstrap phase of the project.

---

## 🏛️ Architectural Assumptions

1. **SPA Client Routing**: The project is designed as a Single Page Application (SPA). The host environment must route all non-file queries (fallback) to `/index.html` to support client-side routing.
2. **Server State Caching**: React Query (`@tanstack/react-query`) is assumed to handle server caching, mutation, and synchronizations, whereas Zustand is used only for global UI states and persistent client tokens (e.g., auth, PWA, layouts).
3. **API Contracts**: The backend endpoints will follow REST conventions, returning JSON responses that correspond to our TypeScript declarations in `src/types/api/`.

---

## 🔐 Security & Auth Assumptions

1. **Token Persistence**: User access tokens are stored in a cookie named `access_token` with `secure: true` and `sameSite: Lax` to prevent cross-site scripting vulnerabilities while maintaining ease of API interceptor inclusion.
2. **Permission Guarding**: Navigation guards are checked dynamically during routing using TanStack Router's validation checks and verified before component actions (e.g., Delete action in product lists).
3. **SSL/HTTPS**: Production deployments will be served entirely over HTTPS to secure cookie transmissions and support Progressive Web App features.

---

## 🎨 UI & UX Assumptions

1. **Modern Browser Support**: The application is built using advanced CSS (Tailwind v4 features) and React 19 features, and is targeted for modern, evergreen browsers. No support is planned for legacy browsers (e.g. Internet Explorer).
2. **Bahasa Indonesia KBBI**: All user-facing copies (validation error messages, buttons, alerts, text labels) must comply with Kamus Besar Bahasa Indonesia (KBBI) translation. Code elements (variables, classes) will remain in English.

---

## 🌐 Environment Assumptions

1. **Environment Variables**: The workspace assumes that variables listed in `.env.example` (`VITE_API_URL`, `VITE_REVERB_APP_KEY`, etc.) are declared both in local development files (`.env`) and defined in the production CI/CD settings.
2. **WebSocket Host**: WebSockets will connect to a Laravel Echo / Pusher compatible server (configured through Reverb host variables).
