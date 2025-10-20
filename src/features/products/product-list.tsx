// React Imports
import { useCallback } from "react";

// Routing
import { Link, useNavigate } from "@tanstack/react-router";

// ShadCN UI Components
import { Button } from "@/components/ui/button";

// Store
import { useAuthStore } from "@/store/useAuthStore";

// API
import { remove } from "@/services/api/products";

// Types & Enums
import { PERMISSIONS } from "@/lib/enum/roles";
import type { Product } from "@/types/pages/product";

type Props = {
	products: Product[] | null;
};

const Products = (props: Props) => {
	// State
	const navigate = useNavigate();
	const { products } = props;

	// Hooks
	// const { hasPermission } = useAuth();
	const { hasPermission } = useAuthStore((state) => state);

	// Handler
	const handleDelete = useCallback(
		async (id: number) => {
			if (!hasPermission(PERMISSIONS.DELETE_PRODUCTS))
				return navigate({ to: "/401" });

			try {
				await remove(id);
			} catch (error) {
				console.log(error);
			} finally {
				products?.filter((product) => product.id !== id);
			}
		},
		[products, hasPermission, navigate]
	);

	return (
		<div className=" min-h-svh p-2">
			{products &&
				products.map((product: Product) => (
					<li key={product.id} className="mb-3">
						{product.name}

						<span className="flex gap-2">
							<Link
								to={"/product/$productId"}
								params={{ productId: product.id }}
							>
								<Button variant="default" size={"sm"}>
									Edit
								</Button>
							</Link>

							<Button
								variant="destructive"
								size={"sm"}
								onClick={() => handleDelete(product.id)}
							>
								Delete
							</Button>
						</span>
					</li>
				))}
		</div>
	);
};

export default Products;
