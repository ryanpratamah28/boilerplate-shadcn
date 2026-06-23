# Business Process MVP

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: auth.ts, products.ts, useAuthStore.ts_

This document details the core lifecycles of the application using styled Mermaid diagrams and detailed process explanations.

---

## 🔑 1. User Authentication Lifecycle

This flowchart describes the path of a user attempting to log in, from request verification to storing session cookies and initializing navigation states.

```mermaid
flowchart TD
    %% Node Styling Definitions
    classDef startEnd fill:#f9f,stroke:#333,stroke-width:2px;
    classDef decision fill:#ff9,stroke:#333,stroke-width:2px;
    classDef action fill:#bbf,stroke:#333,stroke-width:1px;
    classDef success fill:#bfb,stroke:#333,stroke-width:2px;
    classDef failure fill:#fbb,stroke:#333,stroke-width:2px;

    Start([Mulai]) --> InputForm[Input Username & Password]:::action
    InputForm --> CheckFields{Apakah kolom diisi?}:::decision
    CheckFields -- Tidak --> ErrorFields[Tampilkan error: Wajib diisi]:::failure
    CheckFields -- Ya --> SubmitAPI[Kirim POST ke /users API]:::action
    
    SubmitAPI --> APIResponse{Apakah data cocok?}:::decision
    APIResponse -- Tidak --> ErrorAuth[Tampilkan Toast: Gagal Masuk]:::failure
    APIResponse -- Ya --> SetState[Simpan user state di Zustand & Cookie]:::success
    
    SetState --> RedirectHome[Navigasi ke Beranda]:::action
    RedirectHome --> End([Selesai])
```

### System Decisions & Integration Seams
- **Cookie Setup**: The access token is saved in secure cookies on the client side, allowing subsequent Axios requests to be intercepted and injected with `Authorization: Bearer <token>`.
- **Zustand Auth Sync**: The `useAuthStore` status is updated to `isAuthenticated = true` and `user` profile is loaded.

---

## 📦 2. Product Deletion Lifecycle

This flowchart details how product deletion requests are validated against permission tables before deleting resources.

```mermaid
flowchart TD
    %% Node Styling Definitions
    classDef startEnd fill:#f9f,stroke:#333,stroke-width:2px;
    classDef decision fill:#ff9,stroke:#333,stroke-width:2px;
    classDef action fill:#bbf,stroke:#333,stroke-width:1px;
    classDef success fill:#bfb,stroke:#333,stroke-width:2px;
    classDef failure fill:#fbb,stroke:#333,stroke-width:2px;

    Start([Mulai]) --> ClickDelete[Klik tombol Hapus]:::action
    ClickDelete --> PermCheck{Apakah user punya izin delete_products?}:::decision
    
    PermCheck -- Tidak --> BlockAction[Navigasi ke /401 Unauthorized]:::failure
    PermCheck -- Ya --> CallAPI[Kirim DELETE request ke /products/:id]:::action
    
    CallAPI --> APIStatus{Status Respons 200/204?}:::decision
    APIStatus -- Tidak --> ErrorToast[Tampilkan Toast: Gagal menghapus produk]:::failure
    APIStatus -- Ya --> UpdateUI[Filter produk dari UI state & Tampilkan Toast Berhasil]:::success
    
    UpdateUI --> End([Selesai])
```

### System Decisions & Integration Seams
- **Zustand Guard Checks**: The application leverages `hasPermission(PERMISSIONS.DELETE_PRODUCTS)` dynamically from the global auth store state before initiating the Axios request.
- **Optimistic UI Update**: Upon receiving an HTTP 200/204 status code, the React state is updated to filter out the deleted ID to reflect the change immediately in the viewport.
