import axios, { AxiosResponse, AxiosRequestConfig } from "axios"

export const makeApi = async (
	endpoint: string,
	method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
	data?: any
): Promise<AxiosResponse> => {
	try {
		const token = localStorage.getItem("token")

		if (!token && endpoint.includes("/auth-required")) {
			window.location.href = "/Signup"
			throw new Error("Please login to access this resource.")
		}

		const headers = {
			"Content-Type": "application/json",
			Authorization: token ? `Bearer ${token}` : "",
		}

		const config: AxiosRequestConfig = {
			method,
			// url: `http://localhost:7000${endpoint}`,
			url: `https://pajiweb.onrender.com${endpoint}`,
			// url: `https://new-palji-backend-1.onrender.com${endpoint}`,
			// url: `https://sk-backend-uvv5.onrender.com${endpoint}`,

			headers,
			data,
		}

		const response = await axios(config)
		return response
	} catch (error: any) {
		// if(error.response.data.error === "Unauthorized access"){
		// 	console.log("------------------------------")
		// 	window.location.href = "/Signup";
		// }
		console.error("API request failed:", error.response.data)
		throw error
	}
}
