// Routing
import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoutes from "@/components/ProtectedRoutes";

// Components
import RootLayout from "@/components/layouts/RootLayout";
import Products from "@/features/products/product-list";

// API
import { findAll } from "@/services/api/products";

// Enums
import { PERMISSIONS } from "@/lib/enum/roles";

export const Route = createFileRoute("/(private)/product/")({
	component: () => (
		<ProtectedRoutes permission={[PERMISSIONS.VIEW_PRODUCTS]}>
			<RootLayout>
				<RouteComponent />
			</RootLayout>
		</ProtectedRoutes>
	),
	// validateSearch: (search) => {
	// 	return {
	// 		page: search.page || 1,
	// 	};
	// },
	// loaderDeps: ({ search: { page } }) => page,
	loader: async ({ deps: page }) => {
		return await findAll();
	},
});

function RouteComponent() {
	const products = Route.useLoaderData();

	return <Products products={products} />;
}
