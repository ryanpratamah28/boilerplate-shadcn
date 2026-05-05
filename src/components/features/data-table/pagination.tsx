// ShadCN UI Components
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Libs
import { cn } from "@/lib/utils";
import { getPageNumbers } from "@/lib/helpers/page-number";

// Icons
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";

// Types
import { type Table } from "@tanstack/react-table";

type DataTablePaginationProps<TData> = {
	table: Table<TData>;
	totalData?: number;
};

export function DataTablePagination<TData>({
	table,
	totalData,
}: DataTablePaginationProps<TData>) {
	const currentPage = table.getState().pagination.pageIndex + 1;
	const pageSize = table.getState().pagination.pageSize;
	const totalPages = table.getPageCount();
	const pageNumbers = getPageNumbers(currentPage, totalPages);

	const startItem = totalData ? (currentPage - 1) * pageSize + 1 : 0;
	const endItem = totalData ? Math.min(currentPage * pageSize, totalData) : 0;

	return (
		<div
			className={cn(
				"flex items-center justify-between overflow-clip px-2",
				"@max-2xl/content:flex-col-reverse @max-2xl/content:gap-4"
			)}
			style={{ overflowClipMargin: 1 }}
		>
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-2 @max-2xl/content:flex-row-reverse">
					<Select
						value={`${pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={pageSize} />
						</SelectTrigger>

						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((size) => (
								<SelectItem key={size} value={`${size}`}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<p className="hidden text-sm font-medium sm:block">
						Baris per halaman
					</p>
				</div>

				{totalData && totalData > 0 ? (
					<div className="hidden text-sm text-muted-foreground sm:block">
						Menampilkan {startItem}-{endItem} dari {totalData} data
					</div>
				) : null}
			</div>

			<div className="flex items-center sm:space-x-6 lg:space-x-8">
				<div className="flex w-[130px] items-center justify-center text-sm font-medium @max-3xl/content:hidden m-0">
					Halaman {currentPage} dari {totalPages}
				</div>

				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="size-8 p-0 @max-md/content:hidden"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Ke halaman pertama</span>
						<ArrowLeftIcon className="h-4 w-4" />
					</Button>

					<Button
						variant="outline"
						className="size-8 p-0"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Ke halaman sebelumnya</span>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>

					{pageNumbers.map((pageNumber, index) => (
						<div
							key={`${pageNumber}-${index}`}
							className="flex items-center"
						>
							{pageNumber === "..." ? (
								<span className="text-muted-foreground px-1 text-sm">
									...
								</span>
							) : (
								<Button
									variant={
										currentPage === pageNumber
											? "default"
											: "outline"
									}
									className="h-8 min-w-8 px-2"
									onClick={() =>
										table.setPageIndex(
											(pageNumber as number) - 1
										)
									}
								>
									<span className="sr-only">
										Ke halaman {pageNumber}
									</span>

									{pageNumber}
								</Button>
							)}
						</div>
					))}

					<Button
						variant="outline"
						className="size-8 p-0"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Ke halaman berikutnya</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>

					<Button
						variant="outline"
						className="size-8 p-0 @max-md/content:hidden"
						onClick={() =>
							table.setPageIndex(table.getPageCount() - 1)
						}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Ke halaman terakhir</span>
						<ArrowRightIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
