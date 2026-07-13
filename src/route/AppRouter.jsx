import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// ======================
// LAYOUTS
// ======================
import MainLayout from "../layouts/mainLayout/MainLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
// ======================
// ROUTE GUARDS
// ======================
import ProtectedRoute from "../route/ProtectedRoute/ProtectedRoute";
import GuestRoute from "../route/GuestRoute/GuestRoute";
// ======================
// PAGES
// ======================
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import NotFound from "../pages/notfound/404";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ======================
            PUBLIC WEBSITE
        ====================== */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
           path="/checkout"
            element={<Checkout />}
             />
        </Route>
        {/* ======================
            AUTH ROUTES
        ====================== */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />
        </Route>
        {/* ======================
            PRIVATE DASHBOARD
        ====================== */}
        {/* <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route> */}
        {/* ======================
            404
        ====================== */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
// import Login from '../pages/login/Login'
// import Signup from '../pages/signup/Signup'
// import Dashboard from '../pages/dashboard/Dashboard'
// import Home from '../pages/home/Home'
// import NotFound from '../pages/notfound/404'
// import MainLayout from '../components/mainlayout/MainLayout'
// import PrivateLayout from '../components/mainlayout/PrivateLayout'
// import useContextUiData from '../hooks/useContextUiData'
// import ProductDetails from '../pages/productDetails/ProductDetails'
// import Cart from '../pages/cart/Cart'
// function AppRouter() {
//     const { isLogin } = useContextUiData();
//     console.log("AppRouter isLogin:#####", isLogin);
//     return (
//         <BrowserRouter>
//             <Routes>
//                 {/* 🌐 Public Routes */}
//                 <Route path='/' element={<MainLayout />}>
//                     <Route index element={<Home />} />
//                     <Route path='login' element={<Login />} />
//                     <Route path='signup' element={<Signup />} />
//                     <Route path='product/:id' element={<ProductDetails />} />
//                     <Route path='cart' element={<Cart />} /> {/* ✅ always available */}
//                 </Route>
//                 {/* 🔒 Private Routes */}
//                 <Route
//                     path='/dashboard'
//                     element={
//                         isLogin ? <PrivateLayout /> : <Navigate to="/login" />
//                     }
//                 >
//                     <Route index element={<Dashboard />} />
//                 </Route>
//                 {/* ❌ 404 */}
//                 <Route path='*' element={<NotFound />} />
//             </Routes>
//         </BrowserRouter>
//     )
// }
// export default AppRouter
// // import { BrowserRouter, Route, Routes, } from 'react-router-dom'
// // import Login from '../pages/login/Login'
// // import Signup from '../pages/signup/Signup'
// // import Dashboard from '../pages/dashboard/Dashboard'
// // import Home from '../pages/home/Home'
// // import NotFound from '../pages/notfound/404'
// // import MainLayout from '../components/mainlayout/MainLayout'
// // import PrivateLayout from '../components/mainlayout/PrivateLayout'
// // import useContextUiData from '../hooks/useContextUiData'
// // import ProductDetails from '../pages/productDetails/ProductDetails'
// // import Cart from '../pages/cart/Cart'
// // function AppRouter() {
// //     const { isLogin , setLoaderInfo } = useContextUiData();
// //     console.log("AppRouter isLogin:#####", isLogin);
// //     return (
// //         <>
// //             <BrowserRouter>
// //                 <Routes>
// //                     {
// //                         isLogin ?
// //                             <Route path='' element={<PrivateLayout />}>
// //                                 <Route path='dashboard' element={<Dashboard />}></Route>
// //                                 <Route path='/cart' element={<Cart />} ></Route>
// //                             </Route>
// //                             :
// //                             <Route path='' element={<MainLayout />}>
// //                                 <Route index element={<Home />}></Route>
// //                                 <Route path='login' element={<Login />}></Route>
// //                                 <Route path='signup' element={<Signup />}></Route>
// //                                 <Route path="/product/:id" element={<ProductDetails />} ></Route>
// //                                 <Route path='/cart' element={<Cart />} ></Route>
// //                             </Route>
// //                     }
// //                     <Route path='*' element={<NotFound />}></Route>
// //                 </Routes>
// //             </BrowserRouter>
// //         </>
// //     )
// // }
// // export default AppRouter
