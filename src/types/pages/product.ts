export type Badge =
	| { type: "new" }
	| { type: "bestseller" }
	| { type: "discount"; value: number };

export type Product = {
	id: number;

	imageUrl: string;
	name: string;
	price: number;
	originalPrice?: number;

	location: string;
	rating: number;
	reviewCount: number;

	badge?: Badge;
	stock?: number;
	totalStock?: number;
};
