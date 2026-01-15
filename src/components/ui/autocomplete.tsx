import { useEffect, useState } from "react";

// Hooks
import { useMediaQuery } from "@/hooks/use-media-query";

// ShadCN UI Components
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

// Icons
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

// Lib
import { cn } from "@/lib/utils";

export interface CustomAutocompleteProps<T> {
	options: T[];
	value?: T | null;

	onChange: (value: T | null) => void;
	getOptionLabel: (option: T) => string;
	isOptionEqualToValue: (option: T, value: T) => boolean;
	onSearch?: (query: string) => void;
	debounceTime?: number;

	placeholder?: string;
	searchPlaceholder?: string;
	emptyMessage?: string;
	width?: string;
	disabled?: boolean;
	isLoading?: boolean;
	className?: string;
}

export function CustomAutocomplete<T>({
	options,
	value,
	onChange,
	getOptionLabel,
	isOptionEqualToValue,

	onSearch,
	debounceTime = 500,

	placeholder = "Pilih opsi...",
	searchPlaceholder = "Cari data...",
	emptyMessage = "Data tidak ditemukan.",
	width = "w-full",
	disabled = false,
	isLoading = false,
	className,
}: CustomAutocompleteProps<T>) {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		if (!onSearch) return;

		const timer = setTimeout(() => {
			onSearch(searchQuery);
		}, debounceTime);

		return () => clearTimeout(timer);
	}, [searchQuery, onSearch, debounceTime]);

	const handleSelect = (option: T) => {
		if (value && isOptionEqualToValue(option, value as T)) {
			onChange(null);
		} else {
			onChange(option);
		}
		setOpen(false);
	};

	const renderTrigger = () => (
		<Button
			variant="outline"
			role="combobox"
			aria-expanded={open}
			disabled={disabled}
			className={cn("justify-between", width, className)}
		>
			{value ? (
				<span className="truncate">{getOptionLabel(value as T)}</span>
			) : (
				<span className="text-muted-foreground">{placeholder}</span>
			)}
			{isLoading ? (
				<Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
			) : (
				<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
			)}
		</Button>
	);

	const renderContent = () => (
		<Command shouldFilter={!onSearch}>
			<CommandInput
				placeholder={searchPlaceholder}
				value={searchQuery}
				onValueChange={setSearchQuery}
			/>

			<CommandList>
				{isLoading ? (
					<div className="py-6 text-center text-sm text-muted-foreground flex justify-center items-center gap-2">
						<Loader2 className="h-4 w-4 animate-spin" /> Memuat
						data...
					</div>
				) : (
					<>
						{options.length === 0 && (
							<CommandEmpty>{emptyMessage}</CommandEmpty>
						)}

						<CommandGroup>
							{options.map((option, index) => {
								const isSelected = value
									? isOptionEqualToValue(option, value as T)
									: false;
								const label = getOptionLabel(option);

								return (
									<CommandItem
										key={index}
										value={label}
										onSelect={() => handleSelect(option)}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												isSelected
													? "opacity-100"
													: "opacity-0"
											)}
										/>
										{label}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</>
				)}
			</CommandList>
		</Command>
	);

	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>{renderTrigger()}</PopoverTrigger>
				<PopoverContent className={cn("p-0", width)} align="start">
					{renderContent()}
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{renderTrigger()}</DrawerTrigger>
			<DrawerContent>
				<div className="mt-4 border-t">{renderContent()}</div>
			</DrawerContent>
		</Drawer>
	);
}
