// Routing
import { Link, useNavigate } from "@tanstack/react-router";

// ShadCN UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Store
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials } from "@/lib/helpers/string";

export function ProfileDropdown() {
	const navigate = useNavigate();

	const { user, logout } = useAuthStore((state) => state);

	const handleLogout = () => {
		logout();
		navigate({ to: "/login" });
	};

	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="relative h-8 w-8 rounded-full"
					>
						<Avatar className="h-8 w-8">
							<AvatarImage src="/avatars/01.png" alt="@shadcn" />
							<AvatarFallback>
								{getInitials(user?.name ?? null)}
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col gap-1.5">
							<p className="text-sm leading-none font-medium">
								{user?.name}
							</p>

							<p className="text-muted-foreground text-xs leading-none">
								{user?.email}
							</p>
						</div>
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link to="/admin/dashboard">
								Dashboard
								<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem asChild>
							<Link to="/">
								Profile
								<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem asChild>
							<Link to="/">
								Settings
								<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem>New Team</DropdownMenuItem>
					</DropdownMenuGroup>

					<DropdownMenuSeparator />

					<DropdownMenuItem>
						<Button
							variant="ghost"
							className="p-0 w-full"
							onClick={() => handleLogout()}
						>
							Log out
							<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
