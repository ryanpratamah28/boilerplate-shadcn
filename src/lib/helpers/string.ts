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
