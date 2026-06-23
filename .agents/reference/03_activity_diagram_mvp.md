# Activity Diagram MVP

_Version: 1.0 | Last Updated: 2026-06-22 | Sources: login.tsx, axios.ts, useAuthStore.ts_

This document presents a step-by-step activity diagram showing control flows across different application layers, illustrating validation loops and integrations.

---

## 🔒 Login Session Initialization Flow

The diagram below details the swimlanes representing the **User (UI)**, the **Browser Router**, the **Zustand Auth Store / Axios Interceptors**, and the **Remote API**.

```mermaid
sequenceDiagram
    autonumber
    actor User as User (Client View)
    participant UI as Form / Router (UI)
    participant Store as Auth Store (Zustand)
    participant HTTP as Axios Client
    participant API as Backend API

    User->>UI: Mengisi form Login & submit
    UI->>UI: Zod Validation check
    Note over UI: Jika gagal, tampilkan pesan kesalahan input

    UI->>Store: Panggil action login(userData)
    Store->>HTTP: POST /users/login (Credentials)
    
    HTTP->>API: Mengirim API Request
    API->>API: Validasi Kredensial (Database)
    
    alt Kredensial Benar (HTTP 200)
        API-->>HTTP: Mengembalikan Token & Profil User
        HTTP-->>Store: Mengembalikan data respons
        Note over Store: Transaksi Atomis: Simpan token di Cookie & simpan user di state
        Store->>UI: Berhasil
        UI->>User: Toast: Berhasil masuk & Navigasi ke Beranda
    else Kredensial Salah (HTTP 401)
        API-->>HTTP: Mengembalikan status 401
        HTTP-->>Store: Tangkap Error (Axios Interceptor)
        Store->>UI: Gagal
        UI->>User: Toast: Gagal Masuk (Username/Password salah)
    end
```

### Key Validation & Integration Details
1. **Client-Side Zod Check**: Before hitting the store actions, form data is validated against the login schema. Invalid fields prevent any network requests.
2. **Atomic Session Initialization**: The cookie saving step and store setting step execute together. If cookie writing fails, the state is cleared, preventing a half-logged-in application state.
3. **Axios Interception**: The Axios response interceptor logs responses in development mode and forwards authentication failures cleanly to the UI layer.
