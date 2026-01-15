import { useRef } from "react";

export function useSearchHandler(
	setParams: (params: { keyword: string }) => void,
	fetchData: () => void
) {
	const searchQueryRef = useRef<string>("");

	const handleSearch = (query: string) => {
		if (query.trim() === searchQueryRef.current) {
			return;
		}

		if (query.trim()) {
			setParams({ keyword: query });
			searchQueryRef.current = query.trim();
		} else {
			setParams({ keyword: "" });
			searchQueryRef.current = "";
		}

		fetchData();
	};

	return [handleSearch, searchQueryRef] as const;
}

export function useSearchHandlerWithDependency<T>(
	setParams: (params: { keyword: string }) => void,
	fetchData: (dependency: T) => void,
	dependency: T
) {
	const searchQueryRef = useRef<string>("");

	const handleSearch = (query: string) => {
		if (query.trim() === searchQueryRef.current) {
			return;
		}

		if (query.trim()) {
			setParams({ keyword: query });
			searchQueryRef.current = query.trim();
		} else {
			setParams({ keyword: "" });
			searchQueryRef.current = "";
		}

		if (dependency) {
			fetchData(dependency);
		}
	};

	return [handleSearch, searchQueryRef] as const;
}

export function findSelectedItem<T extends { id?: number }>(
	items: T[],
	selectedId?: number | null
): T | null {
	if (!selectedId) return null;
	return items.find((item) => item.id === selectedId) || null;
}
