import path from "path";
import fs from "fs/promises";

export default async function handler(req, res) {
	const { key } = req.query;

	try {
		const jsonFilePath = path.resolve(
			process.cwd(),
			"src/services/data/db.json",
		);
		const fileContents = await fs.readFile(jsonFilePath, "utf8");

		const data = JSON.parse(fileContents);

		res.setHeader(
			"Cache-Control",
			"no-store, no-cache, must-revalidate, proxy-revalidate",
		);

		if (data[key]) {
			res.status(200).json(data[key]);
		} else {
			res.status(404).json({
				message: `Data untuk key '${key}' tidak ditemukan.`,
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error reading data file" });
	}
}
