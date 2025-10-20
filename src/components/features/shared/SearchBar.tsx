// React & Third Party
import { Link } from "@tanstack/react-router";

// Libs & Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons
import {
	IconChevronDown,
	IconSearch,
	IconShoppingCart,
} from "@tabler/icons-react";

const logoImageUrl = "/src/assets/brand/kriava.png";

const SearchBar = () => {
	return (
		<header className="bg-background shadow-sm py-4">
			<div className="container mx-auto px-4 flex items-center justify-between gap-x-6">
				{/* Logo */}
				<Link to="/">
					<img
						src={logoImageUrl}
						alt="Kriava"
						className="h-10 w-auto"
					/>
				</Link>

				{/* Search Bar with Category Dropdown */}
				<div className="flex-grow flex items-center border rounded-full shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="rounded-l-full border-r h-11"
							>
								<span>All</span>
								<IconChevronDown size={16} className="ml-1" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="start">
							<DropdownMenuItem>Products</DropdownMenuItem>
							<DropdownMenuItem>Services</DropdownMenuItem>
							<DropdownMenuItem>Tenders</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Input
						type="text"
						placeholder="Cari Gulaku 100kg..."
						className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-11 text-base"
					/>

					<Button
						variant="ghost"
						size="icon"
						className="rounded-r-full h-11 w-12"
					>
						<IconSearch
							size={22}
							strokeWidth={2.5}
							className="text-primary"
						/>
					</Button>
				</div>

				<div className="flex items-center gap-x-3">
					{/* Cart Icon Button */}
					<Button variant="ghost" size="icon" asChild>
						<Link to="/">
							<IconShoppingCart size={24} />
						</Link>
					</Button>

					{/* Divider */}
					<div className="h-8 w-px bg-border" />

					{/* Action Buttons */}
					<nav className="flex items-center gap-x-3">
						<Button variant="outline" asChild>
							<Link to="/login">Log In</Link>
						</Button>

						<Button asChild>
							<Link to="/register">Register</Link>
						</Button>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default SearchBar;
