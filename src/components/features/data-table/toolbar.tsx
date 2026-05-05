// ShadCN UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Icons
import { CircleX } from "lucide-react";

// Components
import { DataTableFilter, type FilterOption } from "./filter";
import { DataTableViewOptions } from "./options";

// Types
import { type Table } from "@tanstack/react-table";

type DataTableToolbarProps<TData> = {
	table: Table<TData>;
	searchPlaceholder?: string;
	searchKey?: string;
	filters?: {
		columnId: string;
		title: string;
		options: FilterOption[];
		mode?: "single" | "multi";
		onSearch?: (query: string) => void;
	}[];
};

export function DataTableToolbar<TData>({
	table,
	searchPlaceholder = "Filter...",
	searchKey,
	filters = [],
}: DataTableToolbarProps<TData>) {
	const isFiltered =
		table.getState().columnFilters.length > 0 ||
		table.getState().globalFilter;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
				{searchKey ? (
					<Input
						placeholder={searchPlaceholder}
						value={
							(table
								.getColumn(searchKey)
								?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table
								.getColumn(searchKey)
								?.setFilterValue(event.target.value)
						}
						className="h-8 w-full md:w-[150px] lg:w-[250px]"
					/>
				) : (
					<Input
						placeholder={searchPlaceholder}
						value={table.getState().globalFilter ?? ""}
						onChange={(event) =>
							table.setGlobalFilter(event.target.value)
						}
						className="h-8 w-full md:w-[150px] lg:w-[250px]"
					/>
				)}

				<div className="flex gap-x-2">
					{filters.map((filter) => {
						const column = table.getColumn(filter.columnId);

						if (!column) return null;

						return (
							<DataTableFilter
								key={filter.columnId}
								column={column}
								title={filter.title}
								options={filter.options}
								mode={filter.mode}
								onSearch={filter.onSearch}
							/>
						);
					})}
				</div>

				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => {
							table.resetColumnFilters();
							table.setGlobalFilter("");
						}}
						className="h-8 px-2 lg:px-3"
					>
						Reset Filter
						<CircleX className="ms-2 h-4 w-4" />
					</Button>
				)}
			</div>

			<DataTableViewOptions table={table} />
		</div>
	);
}
