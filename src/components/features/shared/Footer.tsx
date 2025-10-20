// React & Third Party
import React from "react";
import { Link } from "@tanstack/react-router";

// Libs & Components
import { Button } from "@/components/ui/button";

// Icons
import {
	IconBrandInstagram,
	IconBrandTwitter,
	IconBrandFacebook,
	IconBrandYoutube,
} from "@tabler/icons-react";

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<div>
		<h3 className="text-base font-semibold text-foreground">{children}</h3>
		<div className="mt-2 w-12 h-0.5 bg-primary" />
	</div>
);

type FooterLinkItem = {
	href: string;
	label: string;
};

const FooterLinkColumn: React.FC<{
	title: string;
	links: FooterLinkItem[];
}> = ({ title, links }) => (
	<div className="space-y-4">
		<SectionTitle>{title}</SectionTitle>
		<ul className="space-y-3">
			{links.map((link) => (
				<li key={link.label}>
					<Link
						to={link.href}
						className="text-sm text-muted-foreground transition-colors hover:text-primary"
					>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	</div>
);

const footerSections = [
	{
		title: "Customer Service",
		links: [
			{ href: "/help-center", label: "Help Center" },
			{ href: "/payment-methods", label: "Payment Methods" },
			{ href: "/guarantee", label: "App Guarantee" },
			{ href: "/contact", label: "Contact Us" },
		],
	},
	{
		title: "About",
		links: [
			{ href: "/about", label: "About Us" },
			{ href: "/careers", label: "App Careers" },
			{ href: "/policies", label: "App Policies" },
			{ href: "/privacy", label: "Privacy Policy" },
			{ href: "/news", label: "App News" },
		],
	},
];

const socialLinks = [
	{ href: "#", label: "Instagram", icon: IconBrandInstagram },
	{ href: "#", label: "Twitter", icon: IconBrandTwitter },
	{ href: "#", label: "Facebook", icon: IconBrandFacebook },
	{ href: "#", label: "YouTube", icon: IconBrandYoutube },
];

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-background border-t">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{footerSections.map((section) => (
						<FooterLinkColumn
							key={section.title}
							title={section.title}
							links={section.links}
						/>
					))}

					<div className="space-y-8">
						<div>
							<SectionTitle>Follow Us</SectionTitle>
							<div className="flex items-center gap-2 mt-4">
								{socialLinks.map(
									({ href, label, icon: Icon }) => (
										<Button
											key={label}
											variant="ghost"
											size="icon"
											asChild
										>
											<a
												href={href}
												aria-label={label}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Icon size={20} />
											</a>
										</Button>
									)
								)}
							</div>
						</div>

						<div>
							<SectionTitle>Download Our App</SectionTitle>
							<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
								<a
									href="#"
									aria-label="Get it on Google Play"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
										alt="Google Play Store badge"
										className="h-12"
									/>
								</a>
								<a
									href="#"
									aria-label="Download on the App Store"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
										alt="Apple App Store badge"
										className="h-10 p-1"
									/>
								</a>
							</div>
						</div>
					</div>

					<div className="bg-muted rounded-lg flex flex-col items-center justify-center text-center p-8 h-full">
						<p className="text-muted-foreground">App Logo</p>
						<p className="text-2xl font-bold text-foreground mt-1">
							APP
						</p>
					</div>
				</div>

				<div className="py-6 border-t">
					<p className="text-center text-xs text-muted-foreground">
						&copy; {currentYear} App | All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
