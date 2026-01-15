/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (e.g., 'IDR', 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})
		.format(amount)
		.replace("Rp", "Rp");
}

/**
 * Format bytes
 * @param bytes - The amount to format
 * @param decimals - The number of decimal places
 * @returns Formatted currency string
 */
export function formatBytes(bytes: number, decimals = 2): string {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getStorageUrl(path: string) {
	if (path.startsWith("http")) return path;
	return `${import.meta.env.VITE_STORAGE_URL}/${path}`;
}
