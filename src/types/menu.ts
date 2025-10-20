import type { LucideIcon } from "lucide-react";

export type MenuItem = {
	id: number;
	menu_id: number;
	parent_id: number | null;
	label: string;
	icon: LucideIcon;
	order: number;
	is_active: boolean;
	url?: string;
	items?: MenuItem[];
};
