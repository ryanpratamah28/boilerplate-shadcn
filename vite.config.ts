import { defineConfig } from "vite";

import path from "path";
import tailwindcss from "@tailwindcss/vite";

import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: "./src/router",
		}),
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["smesco.ico", "smesco.png", "smesco.svg"],
			manifest: {
				name: "Boilerplate PWA",
				short_name: "Boilerplate PWA",
				description: "Boilerplate PWA",
				theme_color: "#ffffff",
				background_color: "#ffffff",
				display: "standalone",
				scope: "/",
				start_url: "/",
				orientation: "portrait",
				icons: [
					{
						src: "/assets/dummy/placeholder.svg",
						sizes: "192x192",
						type: "image/svg",
					},
					{
						src: "/assets/dummy/placeholder.svg",
						sizes: "512x512",
						type: "image/svg",
					},
					{
						src: "/assets/dummy/placeholder.svg",
						sizes: "512x512",
						type: "image/svg",
						purpose: "any",
					},
					{
						src: "/assets/dummy/placeholder.svg",
						sizes: "512x512",
						type: "image/svg",
						purpose: "maskable",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
				cleanupOutdatedCaches: true,
				navigateFallback: "index.html",
				maximumFileSizeToCacheInBytes: 6000000,
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
