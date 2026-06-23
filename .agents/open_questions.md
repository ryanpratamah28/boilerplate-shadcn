# Open Questions

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: Codebase analysis, README.md_

This document tracks unresolved items and questions that require clarification before final production implementation.

---

## 🛠️ Technical Questions

1. **Authentication Token Refresh Mechanism**: 
   - *Question*: How should token refresh (`refresh_token`) be handled when `access_token` expires?
   - *Current Implementation*: Axios interceptor handles request validation but does not currently include a silent-refresh loop or a retry queue on 401 response status codes.

2. **WebSocket Broadcasting Events**:
   - *Question*: What channels and events will be broadcast? How should message listeners be wired in components (e.g., standard layout-level listener or dynamic page-level hooks)?
   - *Current Implementation*: Laravel Echo and Pusher client libraries are installed, but no channels are currently subscribed to.

3. **Testing Suite Selection**:
   - *Question*: Which testing framework should be installed (e.g., Vitest for unit testing, Playwright or Cypress for E2E testing)?
   - *Current Implementation*: No unit/E2E testing dependencies are defined in `package.json`.

---

## 💼 Business & Scope Questions

1. **User Role Administration**:
   - *Question*: Can an Admin create other Admins, or is this role restricted to a predefined list or managed through a console script?
   - *Current Implementation*: Permissions are mapped statically in `src/lib/enum/roles.ts`.

2. **Product Media Management**:
   - *Question*: How are product images uploaded? Do we upload directly to S3/Cloudinary using pre-signed URLs, or send `multipart/form-data` requests directly to the API?
   - *Current Implementation*: Axios interceptor handles `FormData` header conversion automatically, indicating backend multipart uploads are planned.
