---
description: Generate a Zustand store for client-side caching of module data.
---

# Workflow: `/create-stores`

> Generate a Zustand store for client-side caching of module data.

---

## Context

Zustand is used for lightweight global state — primarily for caching frequently-accessed data that doesn't need to be re-fetched on every navigation (e.g. dropdowns, reference lists, user session data). Stores live in `src/store/` and follow a consistent slice pattern.

---

## Trigger

Run this workflow when a module's data needs to be:

- Shared across multiple unrelated components without prop drilling
- Cached client-side after initial fetch (e.g. a list used in dropdowns across many pages)
- Persisted across route navigations without re-fetching

Do **not** create a store if:

- Data is already handled by TanStack Router's loader caching (`staleTime`/`gcTime`)
- Data is only used in a single route tree

---

## Output File

```
src/store/{module-name}.store.ts
```

---

## Step-by-Step Instructions

### Step 1 — Define the store shape

```ts
import { create } from "zustand";
import type { {ModuleName} } from "@/types/pages/{module-name}";

type {ModuleName}StoreState = {
  // Cached data
  {module-name}s: {ModuleName}[];
  selected{ModuleName}: {ModuleName} | null;
  isLoading: boolean;
  isFetched: boolean;  // prevents redundant re-fetches

  // Actions
  set{ModuleName}s: (items: {ModuleName}[]) => void;
  setSelected{ModuleName}: (item: {ModuleName} | null) => void;
  setLoading: (loading: boolean) => void;
  fetch{ModuleName}s: () => Promise<void>;
  reset: () => void;
};
```

### Step 2 — Write the store

```ts
import { create } from "zustand";
import type { {ModuleName} } from "@/types/pages/{module-name}";
import {module-name}AdminService from "@/services/api/admin/{module-name}";

type {ModuleName}StoreState = { /* as above */ };

const initialState = {
  {module-name}s: [],
  selected{ModuleName}: null,
  isLoading: false,
  isFetched: false,
};

export const use{ModuleName}Store = create<{ModuleName}StoreState>((set, get) => ({
  ...initialState,

  set{ModuleName}s: (items) => set({ {module-name}s: items }),
  setSelected{ModuleName}: (item) => set({ selected{ModuleName}: item }),
  setLoading: (loading) => set({ isLoading: loading }),

  fetch{ModuleName}s: async () => {
    // Guard: skip if already fetched
    if (get().isFetched) return;

    set({ isLoading: true });
    const result = await {module-name}AdminService.getAll({ page: 1, per_page: 100 });

    if (result) {
      set({
        {module-name}s: result.data,
        isFetched: true,
      });
    }

    set({ isLoading: false });
  },

  reset: () => set(initialState),
}));
```

### Step 3 — Use the store in a component

```tsx
import { use{ModuleName}Store } from "@/store/{module-name}.store";
import { useEffect } from "react";

export function SomeComponent() {
  const { {module-name}s, fetch{ModuleName}s, isLoading } = use{ModuleName}Store();

  useEffect(() => {
    fetch{ModuleName}s();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <select>
      {{module-name}s.map((item) => (
        <option key={item.uuid} value={item.uuid}>{item.header}</option>
      ))}
    </select>
  );
}
```

---

## Advanced: Persist to localStorage

If the data should survive page refresh (e.g. user preferences):

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const use{ModuleName}Store = create<{ModuleName}StoreState>()(
  persist(
    (set, get) => ({
      // ... store definition
    }),
    {
      name: "{module-name}-store",  // localStorage key
      partialize: (state) => ({ {module-name}s: state.{module-name}s }),  // only persist data, not loading state
    }
  )
);
```

---

## Store Naming Conventions

| Item              | Convention                                        |
| ----------------- | ------------------------------------------------- |
| File name         | `{module-name}.store.ts`                          |
| Export name       | `use{ModuleName}Store`                            |
| State type        | `{ModuleName}StoreState`                          |
| Setter actions    | `set{Field}` (e.g. `setUsers`, `setSelectedUser`) |
| Fetch action      | `fetch{ModuleName}s`                              |
| Reset action      | `reset`                                           |
| `isFetched` guard | Always include to prevent redundant API calls     |

---

## Rules

| Rule                    | Detail                                                               |
| ----------------------- | -------------------------------------------------------------------- |
| `isFetched` guard       | Always gate `fetch*` actions with `if (get().isFetched) return`      |
| `initialState` const    | Define separately so `reset()` can restore it cleanly                |
| No router coupling      | Stores must NOT import from `@tanstack/react-router`                 |
| Avoid over-storing      | Don't store data already cached by route loaders                     |
| `partialize` on persist | Only persist serializable data — exclude functions and loading flags |

---

## Reference Pattern

See `src/store/msme.store.ts` for an existing example of this pattern in the codebase.
