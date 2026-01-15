# Boilerplate

Boilerplate modern, cepat, dan _type-safe_ untuk memulai pengembangan aplikasi web. Proyek ini dikonfigurasi menggunakan **React 19**, **TypeScript**, **Vite**, dan **Tailwind CSS v4** terbaru.

## Tech Stack

This project is built using a robust set of libraries and tools:

### Core & Framework

-   **React 19:** The latest version of the library for web and native user interfaces.
-   **TypeScript:** Strictly typed JavaScript for better code quality.
-   **Vite:** Next-generation frontend tooling.
-   **@tailwindcss/vite:** High-performance tooling for Tailwind CSS v4.

### UI Components & Styling

-   **Tailwind CSS 4:** Utility-first CSS framework for rapid UI development.
-   **ShadCN UI (Radix Primitives):**
    -   Built on top of **@radix-ui** (Dialog, Dropdown, Accordion, etc.) for accessible, unstyled components.
    -   Uses **class-variance-authority (CVA)**, **clsx**, and **tailwind-merge** for dynamic styling.
-   **Icons:**
    -   **Lucide React:** Beautiful & consistent icons.
    -   **Tabler Icons:** Additional icon set for broader visual options.
-   **Typography:** **@fontsource/rethink-sans** for the primary font family.
-   **Interactive Components:**
    -   **Sonner:** For clean and responsive toast notifications.
    -   **Swiper:** Modern touch slider for carousels.
    -   **Vaul:** Drawer component for mobile-friendly interactions.
    -   **CMDK:** Fast, composable command menu.
    -   **Recharts:** Composable charting library for data visualization.
    -   **React Day Picker / Datepicker:** Flexible date picking components.

### State Management & Data Fetching

-   **@tanstack/react-query:** Powerful asynchronous state management for server data caching and synchronization.
-   **Zustand:** A small, fast, and scalable bearbones state-management solution for global client state.
-   **Axios:** Promise-based HTTP client for making API requests.

### Routing

-   **@tanstack/react-router:** Type-safe routing for React applications, including DevTools and CLI integration.

### Forms & Validation

-   **React Hook Form:** Performant, flexible, and extensible forms with easy-to-use validation.
-   **Zod:** TypeScript-first schema declaration and validation library.
-   **@hookform/resolvers:** Bridges Zod schemas with React Hook Form validation.

### Real-Time & Integrations

-   **Laravel Echo & Pusher JS:** WebSocket integration used for **Real-time Live Chat** and event broadcasting.
-   **Firebase:** Integrated for cloud services (e.g., Push Notifications/FCM).

### Utilities

-   **date-fns:** Modern JavaScript date utility library.
-   **js-cookie:** Simple, lightweight JavaScript API for handling cookies.
-   **react-number-format:** Component to format numbers (currency, etc.) in input fields.
-   **next-themes:** abstraction for handling dark/light mode themes.

## Getting Started

Follow the steps below to set up the project locally and build for production.

### 1. Prerequisites

Ensure you have **[pnpm](https://pnpm.io/installation)** installed on your system.

### 2. Installation

Clone the repository and install all necessary dependencies.

```bash
# Replace <your-repository-url> with your repo URL
git clone <your-repository-url>
cd <your-project-folder>

# Install dependencies
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root directory based on `.env.example`. You will need to configure your Backend URL and WebSocket credentials here:

```env
VITE_API_URL=[http://your-laravel-backend.test/api](http://your-laravel-backend.test/api)
VITE_REVERB_APP_KEY=your_app_key
VITE_REVERB_HOST=your_host
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http

```

### 4. Development Server

To start the application in development mode with Hot Module Replacement (HMR):

```bash
pnpm run dev

```

Your application will now be available at `http://localhost:5173`.

### 5. Prepare for Production (Important)

Before building for production, **you must comment out or remove the `server.proxy` configuration** in `vite.config.ts`. The proxy is only intended for the local development environment to handle CORS and is not used in the production build.

Open `vite.config.ts` and comment out the `server` block:

```typescript
// vite.config.ts

export default defineConfig(({ mode }) => {
    // ...
    return {
        plugins: [ ... ],
        resolve: { ... },

        // Comment this section out for production
        /*
        server: {
            proxy: {
                "/api": {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    secure: false,
                },
                "/ws": {
                    target: "wss://[api.com/ws](https://api.com/ws)",
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                    rewrite: (path) => path.replace(/^\/ws/, ""),
                },
            },
        },
        */
    };
});

```

### 6. Building for Production

Once the configuration is ready, build the application:

```bash
pnpm run build

```

This command generates the static files in the `dist` directory.

### 7. Preview Production Build

After building, you can preview the production build locally to ensure everything works as expected:

```bash
pnpm run preview

```

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			// Other configs...

			// Remove tseslint.configs.recommended and replace with this
			tseslint.configs.recommendedTypeChecked,
			// Alternatively, use this for stricter rules
			tseslint.configs.strictTypeChecked,
			// Optionally, add this for stylistic rules
			tseslint.configs.stylisticTypeChecked,

			// Other configs...
		],
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			// Other configs...
			// Enable lint rules for React
			reactX.configs["recommended-typescript"],
			// Enable lint rules for React DOM
			reactDom.configs.recommended,
		],
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
]);
```
