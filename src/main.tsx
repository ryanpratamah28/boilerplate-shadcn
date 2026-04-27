// React
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Routing
import router from "./router";
import { RouterProvider } from "@tanstack/react-router";

// Providers
import AuthProvider from "./components/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Components
import { Toaster } from "@/components/ui/sonner";

// Store
import { usePwaStore } from "./store/usePwaStore";

import "./styles/index.css";
import "./styles/swiper.css";

// Query Client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

// Initialize PWA
usePwaStore.getState().checkEnvironment();

// Event listeners
window.addEventListener("beforeinstallprompt", (e) => {
	e.preventDefault();
	usePwaStore.getState().setDeferredPrompt(e);
});

window.addEventListener("appinstalled", () => {
	usePwaStore.getState().clearPrompt();
});

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<RouterProvider router={router} />
					<Toaster />
				</AuthProvider>
			</QueryClientProvider>
		</StrictMode>,
	);
}
