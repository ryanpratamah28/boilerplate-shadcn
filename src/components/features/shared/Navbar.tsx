import { useState } from "react";

// Routing
import { Link } from "@tanstack/react-router";

// Icons
import { Menu, X, ShoppingCart } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";

// ShadCN UI Components
import { Button } from "@/components/ui/button";

// Custom Components
import { ProfileDropdown } from "@/components/ProfileDropdown";

// Store
import { useAuthStore } from "@/store/useAuthStore";

const navLinks = [
	{ label: "Home", href: "/" },
	{ label: "Product", href: "/product" },
];

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { user } = useAuthStore((state) => state);

	return (
		<>
			{/* Navbar Desktop */}
			<nav className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="flex items-center justify-between h-20">
						{/* Logo */}
						<Link to="/" className="flex items-center gap-2 group">
							<span className="text-xl font-semibold tracking-tight text-foreground">
								App
							</span>

							<span className="text-xs tracking-widest text-muted-foreground uppercase">
								Inc.
							</span>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center gap-8">
							{navLinks.map((link) => (
								<a
									key={link.label}
									href={link.href}
									className="text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-200 relative group"
								>
									{link.label}
									<span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
								</a>
							))}
						</div>

						{/* Right Actions */}
						<div className="flex items-center gap-4">
							<button
								className="relative p-2 hover:bg-accent rounded-full transition-colors"
								aria-label="Shopping cart"
							>
								<ShoppingCart className="w-5 h-5 text-foreground" />
								<span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-xs flex items-center justify-center rounded-full">
									0
								</span>
							</button>

							{user ? (
								<ProfileDropdown />
							) : (
								<Button
									variant="default"
									className="hidden md:inline-flex border-foreground text-white hover:bg-foreground hover:text-background transition-all duration-300"
								>
									<Link to="/login">Login</Link>
								</Button>
							)}

							{/* Mobile Menu Button */}
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
								aria-label="Toggle menu"
							>
								{isMenuOpen ? (
									<X className="w-6 h-6 text-foreground" />
								) : (
									<Menu className="w-6 h-6 text-foreground" />
								)}
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Menu */}
			<div
				className={cn(
					"fixed inset-0 z-40 bg-background/95 backdrop-blur-lg transition-all duration-300 md:hidden",
					isMenuOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				)}
			>
				<div className="flex flex-col items-center justify-center h-full gap-8 px-6">
					{navLinks.map((link, index) => (
						<a
							key={link.label}
							href={link.href}
							onClick={() => setIsMenuOpen(false)}
							className={cn(
								"text-3xl font-light tracking-wide text-foreground hover:text-foreground/70 transition-all duration-300",
								isMenuOpen && "animate-fade-in-up"
							)}
							style={{
								animationDelay: `${index * 50}ms`,
							}}
						>
							{link.label}
						</a>
					))}
				</div>
			</div>
		</>
	);
};

export default Navbar;
