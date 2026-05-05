// React
import { useEffect, useMemo, useState } from "react";

// ShadCN UI Components
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Libs
import { cn } from "@/lib/utils";

// Icons
import { CheckIcon, CircleIcon, PlusCircleIcon } from "lucide-react";

// Types
import { type Column } from "@tanstack/react-table";

export type FilterOption = {
	id?: number;
	value?: string | boolean;
	name: string;
	total?: number;
	icon?: React.ComponentType<{ className?: string }>;
};

type DataTableFilterProps<TData, TValue> = {
	column?: Column<TData, TValue>;
	title?: string;
	mode?: "single" | "multi";
	options: FilterOption[];
	onSearch?: (query: string) => void;
};

function getOptionKey(option: FilterOption): string | number | boolean {
	if (option.value !== undefined) return option.value;
	if (option.id !== undefined) return option.id;
	return option.name;
}

function getFilterValue(option: FilterOption): string | number | boolean {
	if (option.value !== undefined) return option.value;
	if (option.id !== undefined) return option.id;
	return option.name;
}

function isBooleanOptions(options: FilterOption[]): boolean {
	return (
		options.length > 0 &&
		options.every((opt) => typeof opt.value === "boolean")
	);
}

export function DataTableFilter<TData, TValue>({
	column,
	title,
	mode,
	options,
	onSearch,
}: DataTableFilterProps<TData, TValue>) {
	const [searchQuery, setSearchQuery] = useState("");
	const rawFilterValue = column?.getFilterValue();
	const isSingleSelect =
		mode !== undefined ? mode === "single" : isBooleanOptions(options);

	const selectedValues = useMemo(() => {
		if (isSingleSelect) {
			return new Set(
				rawFilterValue !== undefined ? [rawFilterValue] : [],
			);
		}
		return new Set(rawFilterValue as (string | number | boolean)[]);
	}, [rawFilterValue, isSingleSelect]);

	const handleSelect = (filterVal: string | number | boolean) => {
		if (isSingleSelect) {
			const currentVal = rawFilterValue;
			column?.setFilterValue(
				currentVal === filterVal ? undefined : filterVal,
			);
		} else {
			const isSelected = selectedValues.has(filterVal);
			const next = new Set(selectedValues);
			if (isSelected) {
				next.delete(filterVal);
			} else {
				next.add(filterVal);
			}
			const filterValues = Array.from(next);
			column?.setFilterValue(
				filterValues.length ? filterValues : undefined,
			);
		}
	};

	useEffect(() => {
		if (!onSearch) return;

		const timer = setTimeout(() => {
			onSearch(searchQuery);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchQuery, onSearch]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-8 border-dashed"
				>
					<PlusCircleIcon className="size-4" />

					{title}

					{selectedValues?.size > 0 && (
						<>
							<Separator
								orientation="vertical"
								className="mx-2 h-4"
							/>

							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal lg:hidden"
							>
								{selectedValues.size}
							</Badge>

							<div className="hidden space-x-1 lg:flex">
								{!isSingleSelect && selectedValues.size > 2 ? (
									<Badge
										variant="secondary"
										className="rounded-sm px-1 font-normal"
									>
										{selectedValues.size} dipilih
									</Badge>
								) : (
									options
										.filter((option) =>
											selectedValues.has(
												getFilterValue(option),
											),
										)
										.map((option) => (
											<Badge
												variant="secondary"
												key={String(
													getOptionKey(option),
												)}
												className="rounded-sm px-1 font-normal"
											>
												{option.name}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[230px] p-0" align="start">
				<Command shouldFilter={!onSearch}>
					{!isSingleSelect && (
						<CommandInput
							placeholder={title}
							value={searchQuery}
							onValueChange={setSearchQuery}
						/>
					)}

					<CommandList>
						<CommandEmpty>Tidak ada hasil.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const filterVal = getFilterValue(option);
								const optionKey = String(getOptionKey(option));
								const isSelected =
									selectedValues.has(filterVal);

								return (
									<CommandItem
										key={optionKey}
										onSelect={() => handleSelect(filterVal)}
									>
										{isSingleSelect ? (
											<div
												className={cn(
													"border-primary flex size-4 items-center justify-center rounded-full border",
													isSelected
														? "bg-primary"
														: "opacity-50",
												)}
											>
												{isSelected && (
													<CircleIcon className="fill-primary-foreground text-primary-foreground size-2" />
												)}
											</div>
										) : (
											<div
												className={cn(
													"border-primary flex size-4 items-center justify-center rounded-sm border",
													isSelected
														? "bg-primary text-primary-foreground"
														: "opacity-50 [&_svg]:invisible",
												)}
											>
												<CheckIcon className="text-background h-4 w-4" />
											</div>
										)}

										{option.icon && (
											<option.icon className="text-muted-foreground size-4" />
										)}

										<span>
											{option.name}

											{option.total !== undefined && (
												<Badge
													variant="default"
													className="font-mono rounded-sm ml-2 py-0.3 px-1 text-xs"
												>
													{option.total}
												</Badge>
											)}
										</span>
									</CommandItem>
								);
							})}
						</CommandGroup>

						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() =>
											column?.setFilterValue(undefined)
										}
										className="justify-center text-center"
									>
										Hapus filter
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
