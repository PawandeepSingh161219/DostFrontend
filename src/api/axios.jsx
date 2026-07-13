import axios from "axios";

let axiosInstance = null;

export const getAxiosInstance = () => {
  if (axiosInstance) return axiosInstance;

  axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL || "http://localhost:3000/api/v1",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.log("Unauthorized. Please login again.");
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
















// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// // Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor
// api.interceptors.response.use(
//   (response) => response.data, // return only data
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error.response?.data || error.message);
//   }
// );

// export default api;























































// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request Interceptor (For Token)
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor (Error Handling)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log("Unauthorized - Please login again");
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;