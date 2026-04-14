import axios from "axios";

export const apiClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Глобальная ошибка API:", error);
    return Promise.reject(error);
  },
);
