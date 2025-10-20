// Zustand
import { create } from "zustand";

// Cookies
import Cookies from "js-cookie";

// API
import { getProfile } from "@/services/api/auth";

// Types
import type { User } from "@/types/pages/user";

type safeUser = Omit<User, "access_token" | "refresh_token">;

interface AuthState {
	user: safeUser | null;
	accessToken: string | null;
	isAuthenticated: boolean;
	login: (userData: User) => void;
	logout: () => void;
	initializeAuth: () => Promise<void>;
	hasPermission: (permission: string) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	// State
	user: null,
	accessToken: null,
	isAuthenticated: false,

	// Actions
	login: (userData) => {
		const { access_token, refresh_token, ...safeUser } = userData;

		Cookies.set("access_token", access_token, {
			expires: 1,
			secure: true,
			sameSite: "Lax",
		}); // Expired in 1 day

		Cookies.set("refresh_token", refresh_token, {
			expires: 7,
			secure: true,
			sameSite: "Lax",
		}); // Expired in 7 days

		set({
			user: safeUser,
			accessToken: access_token,
			isAuthenticated: true,
		});
	},

	logout: () => {
		Cookies.remove("access_token");
		Cookies.remove("refresh_token");

		set({
			user: null,
			accessToken: null,
			isAuthenticated: false,
		});
	},

	initializeAuth: async () => {
		const token = Cookies.get("access_token");

		if (token) {
			try {
				const userProfile = await getProfile();

				if (userProfile) {
					const { ...safeUser } = userProfile;

					set({
						user: safeUser,
						accessToken: token,
						isAuthenticated: true,
					});
				} else {
					get().logout();
				}
			} catch (error) {
				console.error("Session expired or invalid", error);
				get().logout();
			}
		}
	},

	hasPermission: (permission: string) => {
		const { user } = get();
		if (!user || !user.permissions) return false;
		return user.permissions.includes(permission);
	},
}));
