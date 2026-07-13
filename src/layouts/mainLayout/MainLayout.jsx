import { Outlet } from "react-router-dom";

import Header from "../../components/header/Header";

import Footer from "../../components/footer/Footer";

import styles from "./MainLayout.module.scss";


export default function MainLayout() {

  return (

    <div className={styles.layout}>


      {/* ======================
          HEADER
      ====================== */}

      <header className={styles.header}>

        <div className={styles.container}>

          <Header />

        </div>

      </header>



      {/* ======================
          MAIN CONTENT
      ====================== */}

      <main className={styles.main}>

        <div className={styles.pageWrapper}>

          <Outlet />

        </div>

      </main>



      {/* ======================
          FOOTER
      ====================== */}

      <footer className={styles.footer}>

        <div className={styles.container}>

          <Footer />

        </div>

      </footer>

    </div>
  );
}








































// import Header from "../../components/header/Header";
// import { Outlet } from "react-router-dom"
// import Footer from "../../components/footer/Footer";
// import styles from "./MainLayout.module.scss"


// export default function MainLayout() {
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