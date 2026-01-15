import { ROLES_PERMISSIONS } from "@/lib/enum/roles";

/**
 * Retrieves a list of unique permissions based on the provided user roles.
 * It normalizes role names (replacing hyphens with underscores) before lookup.
 *
 * @param userRoles - An array of strings representing the user's roles.
 * @returns An array of unique permission strings.
 *
 * @example
 * getPermissionsFromRoles(["admin", "super-admin"]);
 * // returns -> ["view_dashboard", "manage_users", "delete_records"]
 */
export const getPermissionsFromRoles = (userRoles: string[]): string[] => {
	const permissions = new Set<string>();

	userRoles.forEach((_role) => {
		const role = _role.replace(/-/g, "_");
		const rolePermissions = ROLES_PERMISSIONS[role];

		if (rolePermissions) {
			rolePermissions.forEach((p) => permissions.add(p));
		}
	});

	return Array.from(permissions);
};
