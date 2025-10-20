// Routing
import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoutes from "@/components/ProtectedRoutes";

// Components
import RootLayout from "@/components/layouts/RootLayout";
import ProductDetail from "@/features/products/product-detail";

// API
import { findOne } from "@/services/api/products";

// Types & Enums
import { PERMISSIONS } from "@/lib/enum/roles";

export const Route = createFileRoute("/(private)/product/$productId")({
	component: () => (
		<ProtectedRoutes permission={[PERMISSIONS.EDIT_PRODUCTS]}>
			<RootLayout>
				<RouteComponent />
			</RootLayout>
		</ProtectedRoutes>
	),
	loader: async ({ params: { productId } }) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));

		return await findOne(productId);
	},
	pendingComponent: () => <div className="min-h-svh p-2">Loading...</div>,
	errorComponent: () => (
		<div className="min-h-svh p-2">Error Fetching Data</div>
	),
});

function RouteComponent() {
	const product = Route.useLoaderData();

	return <ProductDetail product={product} />;
}
