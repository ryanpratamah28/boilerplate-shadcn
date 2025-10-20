// React
import { useEffect, useState } from "react";

// Routing
import { Link } from "@tanstack/react-router";

// Icons
import { ChevronRight } from "lucide-react";

// ShadCN UI Components
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
} from "@/components/ui/sidebar";

// Types
import type { MenuItem } from "@/types/menu";

type CollapsibleMenuItemProps = {
	item: MenuItem;
	currentPath: string;
	level?: number;
};

const isMenuActive = (item: MenuItem, currentPath: string): boolean => {
	if (item.url === currentPath) {
		return true;
	}
	if (item.items && item.items.length > 0) {
		return item.items.some((child) => isMenuActive(child, currentPath));
	}
	return false;
};

export default function CollapsibleMenuItem({
	item,
	currentPath,
	level = 0,
}: CollapsibleMenuItemProps) {
	const { label, icon: Icon, items, url } = item;

	const isFolder = items && items.length > 0;
	const isActive = isMenuActive(item, currentPath);
	const isDirectlyActive = item.url === currentPath;

	const [isOpen, setIsOpen] = useState(isActive);

	useEffect(() => {
		setIsOpen(isActive);
	}, [currentPath, isActive]);

	if (isFolder) {
		return (
			<SidebarMenuItem>
				<Collapsible
					open={isOpen}
					onOpenChange={setIsOpen}
					className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
				>
					<CollapsibleTrigger asChild>
						<Link to={url}>
							<SidebarMenuButton
								isActive={isDirectlyActive}
								className="data-[active=true]:bg-transparent"
							>
								<Icon />
								<span>{label}</span>
								<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
							</SidebarMenuButton>
						</Link>
					</CollapsibleTrigger>

					<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
						<SidebarMenuSub>
							{items.map((subItem, index) => (
								<CollapsibleMenuItem
									key={index}
									item={subItem}
									currentPath={currentPath}
									level={level + 1}
								/>
							))}
						</SidebarMenuSub>
					</CollapsibleContent>
				</Collapsible>
			</SidebarMenuItem>
		);
	}

	return (
		<Link to={url}>
			<SidebarMenuButton
				isActive={isDirectlyActive}
				className="data-[active=true]:bg-transparent"
			>
				<Icon />
				{label}
			</SidebarMenuButton>
		</Link>
	);
}
