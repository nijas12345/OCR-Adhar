import axios, { AxiosError } from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response, // ✅ Successful response
    (error: AxiosError<{ error?: string }>) => { // 🔹 Type the error properly
      console.error("API Error:", error); // Log the error for debugging

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data?.error || `Server Error: ${error.response.status}`;
          return Promise.reject(new Error(errorMessage));
        }
        if (error.request) {
          return Promise.reject(new Error("Network error: No response received from the server."));
        }
      }

      return Promise.reject(new Error("An unexpected error occurred."));
    }
  );

export default axiosInstance;
