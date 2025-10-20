import type { User } from "@/types/pages/user";

export type AuthContextType = {
	user: User | null;
	login: (userData: User) => void;
	logout: () => void;
	hasPermission: (permission: string) => boolean;
};
