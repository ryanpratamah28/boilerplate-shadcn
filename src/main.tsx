// React
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Routing
import router from "./router";
import { RouterProvider } from "@tanstack/react-router";

// Providers
import AuthProvider from "./components/AuthProvider";

import "./styles/index.css";
import "./styles/swiper.css";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</StrictMode>
	);
}
