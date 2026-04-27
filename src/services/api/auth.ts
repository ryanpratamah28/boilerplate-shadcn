// Libraries
import axios from "axios";
import apiInstance from "@/lib/axios";

// Types
import type { User } from "@/types/pages/user";

// Login
export const login = async (
	username: string,
	password: string,
): Promise<User | null> => {
	try {
		const response = await apiInstance.get<User[]>("/users", {
			data: {
				username,
				password,
			},
		});

		return (
			response.data.find(
				(u) => u.username === username && u.password === password,
			) || null
		);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return null;
		}

		throw error;
	}
};

// Check User
export const getProfile = async (): Promise<User | null> => {
	try {
		const response = await apiInstance.get<User>("/profile");

		return response.data || null;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return null;
		}

		throw error;
	}
};
