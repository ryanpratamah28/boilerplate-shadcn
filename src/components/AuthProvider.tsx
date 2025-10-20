import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const initializeAuth = useAuthStore((state) => state.initializeAuth);

	useEffect(() => {
		initializeAuth();
	}, [initializeAuth]);

	return <>{children}</>;
};

export default AuthProvider;
