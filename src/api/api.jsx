import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:8000/api/v1",

  timeout: 10000,
});


// ======================
// REQUEST INTERCEPTOR
// ======================

api.interceptors.request.use(
  (config) => {

    // Ensure headers object exists
    config.headers = config.headers || {};

    // ======================
    // GET AUTH DATA
    // ======================

    const authData = localStorage.getItem("auth");

    // Parse safely
    const parsedAuth = authData
      ? JSON.parse(authData)
      : null;

    const token = parsedAuth?.token;

    // ======================
    // ATTACH TOKEN
    // ======================

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ======================
    // CONTENT TYPE HANDLING
    // ======================

    // FormData
    if (config.data instanceof FormData) {

      // Let browser automatically add multipart boundary
      delete config.headers["Content-Type"];
    }

    // URL Encoded
    else if (config.data instanceof URLSearchParams) {

      config.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
    }

    return config;
  },

  (error) => Promise.reject(error)
);



// ======================
// RESPONSE INTERCEPTOR
// ======================

api.interceptors.response.use(

  (response) => response,

  (error) => {

    // ======================
    // AUTO LOGOUT ON 401
    // ======================

    if (error.response?.status === 401) {

      // Clear auth storage
      localStorage.removeItem("auth");

      // Redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;



















































































// import axios from "axios";
// import { getDataInfo } from "../utils/storage";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
//   timeout: 10000,
// });

// api.interceptors.request.use(
//   (config) => {
//     // ✅ Ensure headers object exists
//     config.headers = config.headers || {};

//     // ✅ Token handling (optional but useful)
//     // const userToken=getDataInfo()
//     // console.log("Token from storage:#####", userToken.token);

//     const token = localStorage.getItem("token");
//     // if (userToken) {
//     //   config.headers.Authorization = `Bearer ${userToken.token}`;
//     // }

//     if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//     // 🔥 Smart Content-Type handling
//     if (config.data instanceof FormData) {
//       // ❌ Don't manually set → browser adds correct boundary
//       delete config.headers["Content-Type"];
//     }
//     else if (config.data instanceof URLSearchParams) {
//       config.headers["Content-Type"] = "application/x-www-form-urlencoded";
//     }
//     else if (config.data) {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;














































































































// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1" , // Meta environment URL
//   timeout: 10000,
// });

// api.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem("token");

//     // if (token && config.headers) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }

//     // 🔥 Dynamic Content-Type handling
//     if (config.data instanceof FormData) {
//       delete config.headers["Content-Type"];
//       // Let browser set multipart with boundary automatically
//     }
//     else if (config.data instanceof URLSearchParams) {
//       config.headers["Content-Type"] = "application/x-www-form-urlencoded";
//     }
//     else {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// export default api;
