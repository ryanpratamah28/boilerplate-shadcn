import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

type DateInput = string | Date | null | undefined;

/**
 * Converts a date string or Date object into a valid Date object.
 * Uses `parseISO` for ISO-formatted strings and includes validation.
 * @param dateInput - The date input (string, Date, null, or undefined).
 * @returns A valid Date object or null if the input is invalid.
 */
const getDateObject = (dateInput: DateInput): Date | null => {
	if (!dateInput) return null;

	if (typeof dateInput === "string" && dateInput.includes("T")) {
		return parseISO(dateInput);
	}

	const date = new Date(dateInput);

	if (isNaN(date.getTime())) {
		return null;
	}

	return date;
};

/**
 * Formats a date to 'dd MMMM yyyy' (e.g., 24 November 2025).
 * @param dateString - The date input.
 * @returns Formatted date string or '-' if invalid.
 */
export const formatDate = (dateString: DateInput): string => {
	const date = getDateObject(dateString);
	if (!date) return "-";

	return format(date, "dd MMMM yyyy", { locale: id });
};

/**
 * Formats a date to 'MMMM yyyy' (e.g., November 2025).
 * @param dateString - The date input.
 * @returns Formatted month and year string or '-' if invalid.
 */
export const formatDateMonthYear = (dateString: DateInput): string => {
	const date = getDateObject(dateString);
	if (!date) return "-";

	return format(date, "MMMM yyyy");
};

/**
 * Formats a date to 'M/d/yyyy' (e.g., 11/24/2025).
 * A compact, standard numeric format.
 * @param dateString - The date input.
 * @returns Formatted date string or '-' if invalid.
 */
export const formatDateShort = (dateString: DateInput): string => {
	const date = getDateObject(dateString);
	if (!date) return "-";

	return format(date, "M/d/yyyy");
};

/**
 * Formats a date to 'yyyy-MM-dd' (ISO Date Only format).
 * Best practice for API requests, hidden inputs, and data sorting.
 * @param dateString - The date input.
 * @returns Formatted date string or '-' if invalid.
 */
export const formatDateISO = (dateString: DateInput): string => {
	const date = getDateObject(dateString);
	if (!date) return "-";

	return format(date, "yyyy-MM-dd");
};

/**
 * Formats a date and time to 'dd MMM yyyy, h:mm a' (e.g., 24 Nov 2025, 1:44 PM).
 * @param dateString - The date input.
 * @returns Formatted date and time string or '-' if invalid.
 */
export const formatDateTime = (dateString: DateInput): string => {
	const date = getDateObject(dateString);
	if (!date) return "-";

	return format(date, "dd MMM yyyy, h:mm a", { locale: id });
};

/**
 * Formats the time only to 'h:mm a' (e.g., 1:44 PM).
 * @param dateString - The date input.
 * @returns Formatted time string or '-' if invalid.
 */
export const formatTime = (dateString: DateInput): string => {
	const date = getDateObject(dateString);
	if (!date) return "-";

	return format(date, "h:mm a");
};

/**
 * Formats a date including the full day and time: 'EEEE, MMMM dd, yyyy h:mm a' (e.g., Monday, November 24, 2025 1:44 PM).
 * @param dateString - The date input.
 * @returns Formatted date, day, and time string or '-' if invalid.
 */
export const formatDateWithDay = (dateString: DateInput): string => {
	const date = getDateObject(dateString);
	if (!date) return "-";

	return format(date, "EEEE, MMMM dd, yyyy h:mm a");
};

/**
 * Formats a date and time to 'yyyy-MM-ddTHH:mm' (e.g., 2025-11-24T01:44).
 * Best practice for API requests, hidden inputs, and data sorting.
 * @param dateInput - The date input.
 * @returns Formatted date and time string or '-' if invalid.
 */
export const formatDateForInput = (dateInput?: string | Date | null) => {
	if (!dateInput) return "";

	const date = new Date(dateInput);
	if (isNaN(date.getTime())) return "";

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}`;
};
