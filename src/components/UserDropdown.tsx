// Routing
import { Link, useNavigate } from "@tanstack/react-router";

// Icons
import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	HomeIcon,
	LogOut,
} from "lucide-react";

// ShadCN UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

// Utils
import { getInitials } from "@/lib/helpers/string";

// Store
import { useAuthStore } from "@/store/useAuthStore";

export default function UserDropdown() {
	const navigate = useNavigate();
	const { user, logout } = useAuthStore((state) => state);
	const { isMobile } = useSidebar();

	const handleLogout = () => {
		logout();
		navigate({ to: "/login" });
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={user?.avatar}
									alt={user?.name}
								/>

								<AvatarFallback className="rounded-lg">
									{getInitials(user?.name ?? null)}
								</AvatarFallback>
							</Avatar>

							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{user?.name}
								</span>

								<span className="truncate text-xs">
									{user?.email}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={user?.avatar}
										alt={user?.name}
									/>
									<AvatarFallback className="rounded-lg">
										{getInitials(user?.name ?? null)}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{user?.name}
									</span>
									<span className="truncate text-xs">
										{user?.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Link to="/" className="flex  gap-2">
									<HomeIcon />
									Home
								</Link>
							</DropdownMenuItem>

							<DropdownMenuItem>
								<BadgeCheck />
								Account
							</DropdownMenuItem>

							<DropdownMenuItem>
								<Bell />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuItem className="p-0">
							<Button
								className="cursor-pointer"
								variant="ghost"
								onClick={() => handleLogout()}
							>
								<LogOut />
								Log out
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
