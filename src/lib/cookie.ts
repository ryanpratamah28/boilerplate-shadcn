/**
 * @function setCookie - Membuat atau menimpa cookie.
 * @function getCookie - Mengambil nilai dari sebuah cookie.
 * @function removeCookie - Menghapus sebuah cookie.
 */

import Cookies from "js-cookie";

/**
 * Membuat atau menimpa sebuah cookie.
 *
 * @param {string} name - Nama cookie yang akan dibuat.
 * @param {string} value - Nilai yang akan disimpan. Jika Anda ingin menyimpan objek, gunakan JSON.stringify() terlebih dahulu.
 * @param {number} days - Jumlah hari sebelum cookie kedaluwarsa.
 */
export const setCookie = (name: string, value: string, days: number): void => {
	Cookies.set(name, value, {
		expires: days,
		path: "/",
		sameSite: "Lax",
		// secure: import.meta.env.MODE === 'production' // Aktifkan untuk HTTPS di production
	});
};

/**
 * Mengambil nilai dari sebuah cookie berdasarkan namanya.
 *
 * @param {string} name - Nama cookie yang ingin dibaca.
 * @returns {string | undefined} Nilai dari cookie, atau undefined jika tidak ditemukan.
 */
export const getCookie = (name: string): string | undefined => {
	return Cookies.get(name);
};

/**
 * Menghapus sebuah cookie berdasarkan namanya.
 *
 * @param {string} name - Nama cookie yang akan dihapus.
 */
export const removeCookie = (name: string): void => {
	Cookies.remove(name, { path: "/" });
};
