// Icons
import {
	BookOpen,
	Frame,
	Map,
	PieChart,
	Folder,
	MoreHorizontal,
	Forward,
	Trash2,
	LayoutDashboard,
	Users,
	Package,
	ShoppingBag,
	FolderKanban,
	FileText,
	Newspaper,
	BarChart3,
	Settings,
	User,
	CreditCard,
	Users2,
	ShieldCheck,
	Component,
	Book,
} from "lucide-react";

// ShadCN UI Components
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Components
import UserDropdown from "./UserDropdown";
import CollapsibleMenuItem from "./SidebarMenuItem";

// Types
import type { MenuItem } from "@/types/menu";
import { useLocation } from "@tanstack/react-router";

const data = {
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: Map,
		},
	],
};

const navigationData: MenuItem[] = [
	{
		id: 1,
		menu_id: 1,
		parent_id: null,
		label: "Dashboard",
		icon: LayoutDashboard,
		order: 10,
		is_active: true,
		url: "/admin/dashboard",
	},
	{
		id: 2,
		menu_id: 1,
		parent_id: null,
		label: "E-commerce",
		icon: ShoppingBag,
		order: 20,
		is_active: true,
		items: [
			{
				id: 3,
				menu_id: 1,
				parent_id: 2,
				label: "Products",
				icon: Package,
				order: 10,
				is_active: true,
				url: "/admin/ecommerce/products",
			},
			{
				id: 4,
				menu_id: 1,
				parent_id: 2,
				label: "Categories",
				icon: FolderKanban,
				order: 20,
				is_active: true,
				url: "/admin/ecommerce/categories",
			},
			{
				id: 5,
				menu_id: 1,
				parent_id: 2,
				label: "Orders",
				icon: FileText,
				order: 30,
				is_active: true,
				url: "/admin/ecommerce/orders",
			},
		],
	},
	{
		id: 6,
		menu_id: 1,
		parent_id: null,
		label: "User Management",
		icon: Users,
		order: 30,
		is_active: true,
		items: [
			{
				id: 7,
				menu_id: 1,
				parent_id: 6,
				label: "User List",
				icon: Users2,
				order: 10,
				is_active: true,
				url: "/admin/users/list",
			},
			{
				id: 8,
				menu_id: 1,
				parent_id: 6,
				label: "Roles & Permissions",
				icon: ShieldCheck,
				order: 20,
				is_active: true,
				url: "/admin/users/roles",
			},
		],
	},
	{
		id: 9,
		menu_id: 1,
		parent_id: null,
		label: "Content",
		icon: Newspaper,
		order: 40,
		is_active: true,
		items: [
			{
				id: 10,
				menu_id: 1,
				parent_id: 9,
				label: "Blog Posts",
				icon: FileText,
				order: 10,
				is_active: true,
				url: "/admin/content/blog",
			},
			{
				id: 11,
				menu_id: 1,
				parent_id: 9,
				label: "Pages",
				icon: FileText,
				order: 20,
				is_active: true,
				url: "/admin/content/pages",
			},
		],
	},
	{
		id: 12,
		menu_id: 1,
		parent_id: null,
		label: "Analytics",
		icon: BarChart3,
		order: 50,
		is_active: true,
		url: "/admin/analytics",
	},

	// Menu Group 2: Settings & More
	{
		id: 13,
		menu_id: 2,
		parent_id: null,
		label: "Settings",
		icon: Settings,
		order: 60,
		is_active: true,
		items: [
			{
				id: 14,
				menu_id: 2,
				parent_id: 13,
				label: "My Profile",
				icon: User,
				order: 10,
				is_active: true,
				url: "/admin/settings/profile",
			},
			{
				id: 15,
				menu_id: 2,
				parent_id: 13,
				label: "Billing",
				icon: CreditCard,
				order: 20,
				is_active: true,
				url: "/admin/settings/billing",
			},
			{
				id: 16,
				menu_id: 2,
				parent_id: 13,
				label: "UI Components",
				icon: Component,
				order: 30,
				is_active: true,
				url: "/admin/settings/components",
			},
		],
	},

	// Documentation Group
	{
		id: 17,
		menu_id: 3,
		parent_id: null,
		label: "Documentation",
		icon: Book,
		order: 70,
		is_active: true,
		items: [
			{
				id: 18,
				menu_id: 3,
				parent_id: 17,
				label: "Introduction",
				icon: BookOpen,
				order: 10,
				is_active: true,
				url: "/admin/docs/introduction",
			},
			{
				id: 19,
				menu_id: 3,
				parent_id: 17,
				label: "Getting Started",
				icon: BookOpen,
				order: 20,
				is_active: true,
				url: "/admin/docs/getting-started",
			},
			{
				id: 20,
				menu_id: 3,
				parent_id: 17,
				label: "Tutorials",
				icon: BookOpen,
				order: 30,
				is_active: true,
				url: "/admin/docs/tutorials",
			},
			{
				id: 21,
				menu_id: 3,
				parent_id: 17,
				label: "Changelog",
				icon: BookOpen,
				order: 40,
				is_active: true,
				url: "/admin/docs/changelog",
			},
		],
	},
];

export default function AppSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { isMobile } = useSidebar();
	const path = useLocation();

	return (
		<Sidebar {...props}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>General</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{navigationData.map((item, index) => (
								<CollapsibleMenuItem
									key={index}
									item={item}
									currentPath={path.pathname}
								/>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Projects</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{data.projects.map((item) => (
								<SidebarMenuItem key={item.name}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.name}</span>
										</a>
									</SidebarMenuButton>

									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<SidebarMenuAction showOnHover>
												<MoreHorizontal />
												<span className="sr-only">
													More
												</span>
											</SidebarMenuAction>
										</DropdownMenuTrigger>

										<DropdownMenuContent
											className="w-48 rounded-lg"
											side={isMobile ? "bottom" : "right"}
											align={isMobile ? "end" : "start"}
										>
											<DropdownMenuItem>
												<Folder className="text-muted-foreground" />
												<span>View Project</span>
											</DropdownMenuItem>

											<DropdownMenuItem>
												<Forward className="text-muted-foreground" />
												<span>Share Project</span>
											</DropdownMenuItem>

											<DropdownMenuSeparator />

											<DropdownMenuItem>
												<Trash2 className="text-muted-foreground" />
												<span>Delete Project</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<UserDropdown />
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
