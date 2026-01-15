export const encodePayload = (data: unknown): string => {
	try {
		const jsonString = JSON.stringify(data);

		// 1. Encode URI Component untuk menangani Unicode (Emoji, dll)
		// 2. btoa untuk base64
		// 3. (Opsional) Replace karakter agar URL-safe
		return btoa(encodeURIComponent(jsonString))
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=+$/, "");
	} catch (e) {
		console.error("Failed to encode payload", e);
		return "";
	}
};

export const decodePayload = <T>(encodedString: string): T | null => {
	try {
		// 1. (Opsional) Kembalikan karakter URL-safe ke standar Base64
		let base64 = encodedString.replace(/-/g, "+").replace(/_/g, "/");

		// Padding ulang '=' jika perlu (penting untuk decoding yang ketat)
		while (base64.length % 4) {
			base64 += "=";
		}

		// 2. atob untuk decode base64
		// 3. decodeURIComponent untuk mengembalikan Unicode
		const jsonString = decodeURIComponent(atob(base64));

		return JSON.parse(jsonString) as T;
	} catch (e) {
		console.error("Failed to decode payload", e);
		return null;
	}
};
