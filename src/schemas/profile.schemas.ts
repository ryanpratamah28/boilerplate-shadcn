import * as z from "zod";

export const ProfileFormSchema = z.object({
	name: z
		.string()
		.min(3, "Nama minimal 3 karakter")
		.max(100, "Nama maksimal 100 karakter"),

	email: z
		.string()
		.min(1, "Email wajib diisi")
		.email("Format email tidak valid"),

	phone: z
		.string()
		.min(10, "Nomor telepon minimal 10 digit")
		.max(15, "Nomor telepon maksimal 15 digit")
		.regex(/^[0-9+\-\s()]+$/, "Nomor telepon tidak valid"),

	gender: z.enum(["male", "female"], {
		required_error: "Jenis kelamin wajib dipilih",
	}),

	address: z
		.string()
		.min(10, "Alamat minimal 10 karakter")
		.max(200, "Alamat maksimal 200 karakter"),

	birth_date: z
		.string()
		.min(1, "Tanggal lahir wajib diisi")
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD"),
});

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export const EmailUpdateSchema = z.object({
	email: z
		.string()
		.min(1, "Email wajib diisi")
		.email("Format email tidak valid"),
});

export const PhoneUpdateSchema = z.object({
	phone: z
		.string()
		.min(10, "Nomor telepon minimal 10 digit")
		.max(15, "Nomor telepon maksimal 15 digit")
		.regex(/^[0-9+\-\s()]+$/, "Nomor telepon tidak valid"),
});

export const PasswordUpdateSchema = z
	.object({
		current_password: z.string().optional().or(z.literal("")),

		new_password: z
			.string()
			.min(6, "Kata sandi minimal 6 karakter")
			.max(100, "Kata sandi maksimal 100 karakter")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Kata sandi harus mengandung huruf besar, huruf kecil, dan angka",
			),

		new_password_confirmation: z
			.string()
			.min(1, "Konfirmasi kata sandi wajib diisi"),
	})
	.refine((data) => data.new_password === data.new_password_confirmation, {
		message: "Kata sandi tidak cocok",
		path: ["new_password_confirmation"],
	});

export type EmailUpdateValues = z.infer<typeof EmailUpdateSchema>;
export type PhoneUpdateValues = z.infer<typeof PhoneUpdateSchema>;
export type PasswordUpdateValues = z.infer<typeof PasswordUpdateSchema>;
