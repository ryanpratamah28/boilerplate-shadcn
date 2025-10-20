// Types & Enums
import type { Product } from "@/types/pages/product";

type Props = {
	product: Product | null;
};

const ProductDetail = (props: Props) => {
	// State
	const { product } = props;

	return <div className="min-h-svh p-2">{product?.name}</div>;
};

export default ProductDetail;
