/**
 * Gets the initials from a string.
 
 * @param string - The input string to extract initials from.
 * @returns "JD" - A string containing the initials.
 
 * @example
 * getInitials("John Doe");
 * returns -> "JD"
*/
export const getInitials = (string: string | null | undefined) => {
	if (!string) return "";

	return string
		.split(/\s/)
		.reduce((response, word) => (response += word.slice(0, 1)), "");
};

/**
 * Converts a string to a slug.
 
 * @param text - The input string to extract initials from.
 * @returns "aneka-rasa" - Converted string to slug.
 
 * @example
 * formatSlug("Aneka Rasa ");
 * returns -> "aneka-rasa"
*/
export function formatSlug(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "") // Remove non-word chars
		.replace(/[\s_-]+/g, "-") // Replace spaces with -
		.replace(/^-+|-+$/g, ""); // Remove leading/trailing -
}
