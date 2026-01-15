export type ApiResponse<T = undefined> = {
	status: boolean | string | "success" | "error" | number;
	data?: T;
	items?: T;
	meta?: {
		// Version 1
		current_page: number;
		last_page: number;
		total: number;

		// Version 2
		page: number;
		per_page: number;
		total_data: number;
		total_pages: number;
	};
	message: string;
	errors?: Record<string, string[]>;
};

export type PaginatedData<T> = {
	data: T[];
	meta?: {
		current_page: number;
		last_page: number;
		per_page: number;
		total: number;
	};
};

export type GoogleRedirectResponse = {
	success: boolean;
	data: {
		redirect_url: string;
	};
};
