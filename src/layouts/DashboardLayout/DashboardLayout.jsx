import { Outlet } from "react-router-dom";

import styles from "./DashboardLayout.module.scss";


// Temporary placeholders
// Replace later with real components

function Sidebar() {

  return (

    <aside className={styles.sidebar}>

      <h2>Dashboard</h2>

    </aside>
  );
}


function Topbar() {

  return (

    <header className={styles.topbar}>

      <h2>Welcome</h2>

    </header>
  );
}



export default function DashboardLayout() {

  return (

    <div className={styles.layout}>


      {/* ======================
          SIDEBAR
      ====================== */}

      <Sidebar />



      {/* ======================
          MAIN DASHBOARD AREA
      ====================== */}

      <div className={styles.content}>


        {/* TOPBAR */}

        <Topbar />


        {/* PAGE CONTENT */}

        <main className={styles.main}>

          <Outlet />

        </main>

      </div>

    </div>
  );
}