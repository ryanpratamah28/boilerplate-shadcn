import axios from "axios";
import { getCookie } from "./cookie";

// Create Axios Instance
const apiInstance = axios.create({
	baseURL:
		import.meta.env.VITE_API_URL +
		"/api/" +
		import.meta.env.VITE_API_VERSION,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request Interceptor
apiInstance.interceptors.request.use(
	(config) => {
		const accessToken = getCookie("access_token");

		if (accessToken && !config.headers.Authorization) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		if (config.data instanceof FormData) {
			config.headers["Content-Type"] = "multipart/form-data";
		} else if (typeof config.data === "object") {
			config.headers["Content-Type"] = "application/json";
		} else if (typeof config.data === "string") {
			config.headers["Content-Type"] = "text/plain";
		}

		if (import.meta.env.MODE === "development") {
			console.log("Axios Request =====================");
			console.log("🛑 Endpoint:", config.url);
			console.log("🛑 Method:", config.method);

			if (config.data) {
				console.log("Data:", config.data);
			}
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response Interceptor
apiInstance.interceptors.response.use(
	(response) => {
		if (import.meta.env.MODE === "development") {
			console.log("Axios Response ====================");
			console.log(`🛒 API Status: ${response.status}`);
			console.log("🛒 API Data:", response.data);
		}

		return response;
	},
	async (error) => {
		if (import.meta.env.MODE === "development") {
			console.error("Axios Error Response ==============");
			console.error(`🛒 Endpoint: ${error.config?.url}`);
			console.error(`🛒 Status: ${error.response?.status}`);
			console.error(`🛒 Message: ${error.message}`);
			console.error("🛒 Response Data:", error.response?.data);
		}

		return Promise.reject(error);
	}
);

export default apiInstance;
