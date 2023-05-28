import axios from "axios";
export const URL = "http://localhost:3001";

export const api = axios.create({
  withCredentials: true,
  baseURL: URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${JSON.parse(
    localStorage.getItem("accessToken") || ""
  )}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios({
          method: "POST",
          url: `${URL}/auth/refresh`,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("refreshToken") || ""
            )}`,
          },
        });
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.data.accessToken)
        );
        return api.request(originalRequest);
      } catch (e) {
        console.log("Unauthorized");
      }
    }
    throw error;
  }
);
