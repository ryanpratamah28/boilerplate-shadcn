// Libraries
import axios from "axios";
import apiInstance from "@/lib/axios";

// Types
import type { Product } from "@/types/pages/product";

// Find All
export const findAll = async (): Promise<Product[] | null> => {
	try {
		const response = await apiInstance.get<Product[]>("/products");

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return null;
		}

		console.error("Failed to fetch products", error);

		throw error;
	}
};

// Find One
export const findOne = async (id: number): Promise<Product | null> => {
	try {
		const response = await apiInstance.get<Product[]>("/products");

		return (
			response.data.find((product) => product.id === Number(id)) || null
		);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return null;
		}

		console.error("Failed to fetch products", error);

		throw error;
	}
};

// Delete
export const remove = async (id: number): Promise<Product | null> => {
	try {
		const response = await apiInstance.delete("/products/" + id);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return null;
		}

		console.error("Failed to remove products", error);

		throw error;
	}
};
