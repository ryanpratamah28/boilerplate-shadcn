// React
import React, { useEffect } from "react";

// Routing
import { useNavigate } from "@tanstack/react-router";

// Context
import { useAuthStore } from "@/store/useAuthStore";

interface ProtectedRoutesProps {
	children: React.ReactNode;
	permission?: string[];
	allowGuest?: boolean;
	redirectIfAuth?: boolean;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
	children,
	permission,
	allowGuest = false,
	redirectIfAuth = false,
}) => {
	const navigate = useNavigate();
	const { user, hasPermission } = useAuthStore((state) => state);

	useEffect(() => {
		// Skenario 1: User belum login & halaman tidak boleh diakses tamu
		if (!user && !allowGuest) {
			navigate({ to: "/login" });
			return;
		}

		if (user) {
			// Skenario 2: User sudah login tapi mencoba akses halaman login/register
			if (redirectIfAuth) {
				navigate({ to: "/", replace: true });
				return;
			}

			// Skenario 3: User tidak punya izin (permission) yang dibutuhkan
			if (permission && !permission.every((p) => hasPermission(p))) {
				navigate({ to: "/401" });
				return;
			}
		}
	}, [user, navigate, permission, allowGuest, redirectIfAuth, hasPermission]);

	// Jika halaman hanya untuk tamu dan user sudah login, render null
	if (redirectIfAuth && user) {
		return null;
	}

	// Jika user belum login dan halaman bukan untuk tamu, render null.
	if (!user && !allowGuest) {
		return null;
	}

	// Jika user tidak punya izin, render null.
	if (user && permission && !permission.every((p) => hasPermission(p))) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoutes;
