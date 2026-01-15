/**
 * File Configuration Constants
 * ----------------------------
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_FILE_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

export const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

export const ACCEPTED_VIDEO_IMAGE_TYPES = [
	...ACCEPTED_IMAGE_TYPES,
	"video/mp4",
	"video/quicktime", // .mov
	"video/webm",
];

/**
 * Extracts a single File object from various input types.
 * Handles: File, FileList, or Array of Files.
 *
 * @param value - The input value to check.
 * @returns The File object or null if invalid.
 */
export const getFile = (value: unknown): File | null => {
	if (value instanceof File) return value;

	// Handle HTML FileList (e.g., from <input type="file">)
	if (value instanceof FileList && value.length > 0) {
		return value[0];
	}

	// Handle Array of Files (e.g., from Drag & Drop libraries)
	if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
		return value[0];
	}

	return null;
};

/**
 * Extracts the file extension from a URL or filename.
 * Safely handles query parameters and hashes.
 *
 * @param url - The URL or filename string.
 * @returns The extension (without dot) or empty string.
 *
 * @example
 * getFileExtension("image.png?token=123") // returns "png"
 * getFileExtension("image.jpg") // returns "jpg"
 */
export const getFileExtension = (url: string): string => {
	if (!url || typeof url !== "string") return "";

	// 1. Remove query params (?) and hashes (#)
	// "image.png?t=123" -> "image.png"
	const cleanUrl = url.split(/[?#]/)[0];

	// 2. Extract extension
	const parts = cleanUrl.split(".");

	// Handle case where there is no extension (e.g., "makefile" or ".gitignore")
	if (parts.length < 2 || (parts.length === 2 && parts[0] === "")) {
		return "";
	}

	return parts.pop()?.toLowerCase() || "";
};

/**
 * (Optional) Helper to format bytes into readable string
 * Useful for displaying error messages like "Max size 5MB"
 */
export const formatBytes = (bytes: number, decimals = 2) => {
	if (!+bytes) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
