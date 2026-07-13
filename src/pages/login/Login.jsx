import styles from "../login/Login.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuthContext";
import api from "../../api/api";
export default function Login() {
 // ======================
  // HOOKS
  // ======================
  const navigate = useNavigate();
  const { login } = useAuth();
  // ======================
  // STATE
  // ======================
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // ======================
  // HANDLE INPUT CHANGE
  // ======================
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  // ======================
  // HANDLE SUBMIT
  // ======================
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      // ======================
      // LOGIN API REQUEST
      // ======================
      const response = await api.post(
        "/auth/login",
        loginData
      );
      console.log("Login response:", response);
      
      // ======================
      // VALIDATE RESPONSE
      // ======================
      if (response.data.status !== "success") {
        throw new Error(
          response.data.message ||
          "Login failed"
        );
      }
      const data = response.data.data;
      if (!data?.token) {
        throw new Error(
          "Token not received from server"
        );
      }
      // ======================
      // CREATE AUTH OBJECT
      // ======================
      const authData = {
        token: data.token,
        user: data.name,
      };

console.log("Auth data to be stored:", authData);
      // ======================
      // UPDATE AUTH CONTEXT
      // ======================
      login(authData);
      // ======================
      // STORE AUTH DATA
      // ======================
      // localStorage.setItem(
      //   "auth",
      //   JSON.stringify(authData)
      // );
      console.log("Login successful");
  
// );
    }
    catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    }
    finally {
      setLoading(false);
    }
  }
  // ======================
  // UI
  // ======================
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          {/* PASSWORD */}
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          {/* ERROR MESSAGE */}
          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}
          {/* BUTTON */}
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              type="submit"
              disabled={loading}
            >
              {
                loading
                  ? "Logging in..."
                  : "Login"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// import styles from "../login/Login.module.scss";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import useContextUiData from "../../hooks/useContextUiData";
// import api from "../../api/api";
// export default function Login() {
//   const navigate = useNavigate();
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   // const { loginUser, toast, setLoader } = useContextUiData();
  
//   const handleChange = (e) => {
//     setLoginData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };
//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError("");
//       // setLoader(true);
//       const response = await api.post("/auth/login", loginData);
//       // const data = response.data.data
//        if (response.data.status !== "success") {
//         throw new Error(response.data.message || "Login failed");
//       }
//       const data = response.data.data;
//       if (!data?.token) {
//         throw new Error("Token not received");
//       }
//       // STORE TOKEN
//       localStorage.setItem("token", data.token);
//       // STORE USER
//       localStorage.setItem("user", JSON.stringify(data.user));
//       console.log("Login successful");
//     //   if (!data || !data.token) {
//     //   throw new Error("Invalid login response");
//     // }
//     //   if(response.data.status !== "success"){
//     //     throw new Error(data.message || "Login failed");
//     //   }
//     //   console.log("Login successful:", data);
//       console.log("FULL RESPONSE:", response);
// console.log("DATA:", response.data);
// console.log("INNER DATA:", response.data.data);
//       // loginUser(data);
//      // toast.success("Login successful");
//       navigate("/dashboard");
//     } catch (error) {
//       // toast.error("Login failed");
//       console.error(error);
//       setError(
//         error.response?.data?.message ||
//         error.message ||
//         "Something went wrong"
//       );
//     } finally {
//       // setLoader(false);
//       setLoading(false);
//     }
//   }
//   return (
//     <div className={styles.loginPage}>
//       <div className={styles.loginBox}>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.inputGroup}>
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={loginData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className={styles.inputGroup}>
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={loginData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//             />
//           </div>
//            {error && <p>{error}</p>}
//           <div className={styles.buttonContainer}>
//             {/* <button className={styles.button} type="submit">
//               Login
//             </button> */}
//             <button
//               className={styles.button}
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// import styles from "../login/Login.module.scss"
// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom";
// import useContextUiData from "../../hooks/useContext";
// import { setDataInfo } from "../../utils/storage";
// import api from "../../api/api";
// export default function Login() {
//   const [loginData, setloginData] = useState({
//     email: "",
//     password: ""
//   })
//   const handleChange = (e) => {
//     setloginData({
//       ...loginData,
//       [e.target.name]: e.target.value
//     });
//   };
//   const { setIsLogin, toast, setLoaderInfo } = useContextUiData();
//   const navigate = useNavigate();
//   async function handleSubmit(event) {
//     event.preventDefault();
//     console.log("Login data:", loginData);
//     try {
//       setLoaderInfo(true);
//       // Simulate API call for login
//       // Replace this with actual API call and authentication logic
//       const response = await api.post("/auth/login", loginData);
//       const token = response.data.token;
//       setDataInfo({ login: true, token });
//       setIsLogin(true);
//       console.log("Login successful:", response.data);
//       toast.success("Login successful");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Login error:", error.response ? error.response.data : error.message);
//     } finally {
//       setLoaderInfo(false);
//     }
//     // Ab hum real API pr work kr rahe hn tou simulate karne ki zarurat nhi 
//     // setTimeout(()=>{
//     //    setIsLogin(true);
//     //    navigate('/dashboard')
//     // },3000)
//   }
//   useEffect(() => {
//     console.log("Login page loaded");
//   }, [])
//   return (
//     <div className={styles.loginPage}>
//       <div className={styles.loginBox}>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.inputGroup}>
//             <label>Email</label>
//             <input type="email" placeholder="Enter your email" name="email" value={loginData.email} onChange={handleChange} />
//           </div>
//           <div className={styles.inputGroup}>
//             <label>Password</label>
//             <input type="password" placeholder="Enter your password" name="password" value={loginData.password} onChange={handleChange} />
//           </div>
//           <div className={styles.buttonContainer}  >
//             <button className={styles.button} type="submit">Login</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }