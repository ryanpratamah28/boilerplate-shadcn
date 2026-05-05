---
description: Generate the API service layer for a module with full CRUD operations.
---

# Workflow: `/create-services`

> Generate the API service layer for a module with full CRUD operations.

---

## Context

Services are the data-fetching layer. They wrap `apiInstance` (a pre-configured Axios instance) and always return safe, typed responses — never throwing errors to the caller. All service functions follow a consistent try/catch pattern with typed return shapes.

---

## Trigger

Run this workflow after `/create-enum-endpoints`. You need:

1. Module name
2. The enum file from `/create-enum-endpoints`
3. The types file from `/create-types`
4. API collection (to know which endpoints need which HTTP methods and payloads)

---

## Output File

```
src/services/api/admin/{module-name}.ts
```

---

## Step-by-Step Instructions

### Step 1 — Set up imports

```ts
// Libraries
import axios from "axios";
import apiInstance from "@/lib/axios";

// Types
import type { ApiResponse } from "@/types/api/api";
import type {
  {ModuleName},
  {ModuleName}QueryParams,
  {ModuleName}FormData,
  {ModuleName}ListResponse,
} from "@/types/pages/{module-name}";

// Enums
import { {MODULE_NAME}_ADMIN_ENDPOINTS } from "@/lib/enum/{module-name}";
```

### Step 2 — Generate each service function

#### `getAll` — Paginated list

```ts
export const getAll{ModuleName}s = async (
  params: {ModuleName}QueryParams = { page: 1, per_page: 10 }
): Promise<{ModuleName}ListResponse | null> => {
  try {
    const response = await apiInstance.get<ApiResponse<{ModuleName}[]>>(
      {MODULE_NAME}_ADMIN_ENDPOINTS.{MODULE_NAME}S,
      { params }
    );
    return {
      data: response.data.data || [],
      meta: response.data.meta || {
        current_page: 1,
        per_page: 10,
        total: 0,
        total_pages: 0,
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to fetch {ModuleName}s:", error.response?.data);
    }
    return null;
  }
};
```

#### `create` — POST new item

```ts
export const create{ModuleName} = async (payload: {ModuleName}FormData) => {
  try {
    const response = await apiInstance.post<ApiResponse<{ModuleName}>>(
      {MODULE_NAME}_ADMIN_ENDPOINTS.CREATE_{MODULE_NAME},
      payload
    );
    return {
      data: response.data.data,
      message: response.data.message,
      status: true,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as any;
      return {
        message: errorData?.message || "Failed to create {ModuleName}!",
        status: false,
        errors: errorData?.errors,
      };
    }
    return { message: "Failed to create {ModuleName}!", status: false };
  }
};
```

#### `getByUuid` — GET single item

```ts
export const get{ModuleName}ByUuid = async (uuid: string) => {
  try {
    const response = await apiInstance.get<ApiResponse<{ModuleName}>>(
      {MODULE_NAME}_ADMIN_ENDPOINTS.{MODULE_NAME}_BY_UUID(uuid)
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Failed to fetch {ModuleName} with UUID: ${uuid}`, error.response?.data);
      return null;
    }
    return { message: "Something went wrong, try again later.", status: false };
  }
};
```

#### `update` — PUT existing item

```ts
export const update{ModuleName} = async (uuid: string, payload: {ModuleName}FormData) => {
  try {
    const response = await apiInstance.put<ApiResponse<{ModuleName}>>(
      {MODULE_NAME}_ADMIN_ENDPOINTS.UPDATE_{MODULE_NAME}(uuid),
      payload
    );
    return {
      data: response.data.data,
      message: response.data.message,
      status: true,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as any;
      return {
        message: errorData?.message || "Failed to save {ModuleName}!",
        status: false,
        errors: errorData?.errors,
      };
    }
    return { message: "Failed to update {ModuleName}!", status: false };
  }
};
```

#### `delete` — DELETE item

```ts
export const delete{ModuleName} = async (uuid: string) => {
  try {
    const response = await apiInstance.delete<ApiResponse>(
      {MODULE_NAME}_ADMIN_ENDPOINTS.DELETE_{MODULE_NAME}(uuid)
    );
    return {
      data: response.data.data,
      message: response.data.message,
      status: true,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as any;
      return {
        message: errorData?.message || "Failed to delete {ModuleName}!",
        status: false,
        errors: errorData?.errors,
      };
    }
    return { message: "Something went wrong, try again later.", status: false };
  }
};
```

#### Add extra endpoints if present in API collection

If the API has additional endpoints (e.g. `/statistics`, `/export`, `/bulk-delete`), add them as separate named functions following the same try/catch pattern.

### Step 3 — Export service object + default export

```ts
export const {moduleName}AdminService = {
  getAll: getAll{ModuleName}s,
  create: create{ModuleName},
  getByUuid: get{ModuleName}ByUuid,
  update: update{ModuleName},
  delete: delete{ModuleName},
  // add additional functions here
} as const;

export default {moduleName}AdminService;
```

---

## Rules

| Rule                         | Detail                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------- |
| Never throw                  | All functions return safe objects — never let errors propagate               |
| `status: true/false`         | All mutation functions return `{ status: boolean, message: string }`         |
| `getAll` returns `null`      | On error, list functions return `null` (checked in route loaders)            |
| `getByUuid` returns `null`   | On error, single-fetch functions return `null`                               |
| Error shape                  | Always include `errors` field from `errorData?.errors` for validation errors |
| `as const` on service object | Ensures method names are narrowly typed                                      |

---

## Real Example — User Management Module

```ts
// src/services/api/admin/user.ts

import axios from "axios";
import apiInstance from "@/lib/axios";
import type { ApiResponse } from "@/types/api/api";
import type {
	AdminUser,
	UserQueryParams,
	UserFormData,
	UserListResponse,
} from "@/types/pages/user";
import { USER_ADMIN_ENDPOINTS } from "@/lib/enum/user";

export const getAllUsers = async (
	params: UserQueryParams = { page: 1, per_page: 15 },
): Promise<UserListResponse | null> => {
	try {
		const response = await apiInstance.get<ApiResponse<AdminUser[]>>(
			USER_ADMIN_ENDPOINTS.USERS,
			{ params },
		);
		return {
			data: response.data.data || [],
			meta: response.data.meta || {
				current_page: 1,
				per_page: 15,
				total: 0,
				total_pages: 0,
			},
		};
	} catch (error) {
		if (axios.isAxiosError(error))
			console.error("Failed to fetch users:", error.response?.data);
		return null;
	}
};

export const getUserStatistics = async () => {
	try {
		const response = await apiInstance.get<ApiResponse<unknown>>(
			USER_ADMIN_ENDPOINTS.USER_STATISTICS,
		);
		return { data: response.data.data, status: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return { message: "Failed to fetch statistics", status: false };
		}
		return { message: "Something went wrong.", status: false };
	}
};

// ... createUser, getUserByUuid, updateUser, deleteUser follow the same pattern

export const userAdminService = {
	getAll: getAllUsers,
	getStatistics: getUserStatistics,
	// create, getByUuid, update, delete...
} as const;

export default userAdminService;
```

---

## Reference Pattern

See `src/services/api/admin/faq.ts` for the complete working implementation of this pattern.
