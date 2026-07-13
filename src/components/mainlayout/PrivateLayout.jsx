// import Header from "../header/Header";
// import { Outlet } from "react-router-dom"
// import Footer from "../footer/Footer";
// import styles from "./MainLayout.module.scss"


// export default function PrivateLayout() {
//     //  const token = localStorage.getItem("accessToken");
//     // if (!token) {
//     //     return <Navigate to="/login" replace />;
//     // }
//     return (
//         <div className={styles.app}>
//             <div className={styles.header}>
//                 <div className={styles.headerContainer}>
//                     <Header />
//                 </div>
//             </div>
//             <main className={styles.main}>
//                 {/* wrapper around Outlet so you can style pages consistently */}
//                 <div className={styles.pageWrapper}>
//                     <Outlet />
//                 </div>
//             </main>
//             <div className={styles.footer}>
//             <Footer />
//             </div>
//         </div>
//     )
// }