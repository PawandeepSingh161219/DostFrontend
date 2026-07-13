import styles from "./Header.module.scss";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiClock,
  FiX,
} from "react-icons/fi";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import useCartContext from "../../hooks/useCartContext";
import useAuth from "../../hooks/useAuthContext";
import useSearchContext from "../../hooks/useSearchContext";

import useDebounce from "../../hooks/useDebounce";

import api from "../../api/api";

export default function Header() {

  // ======================
  // HOOKS
  // ======================

  const navigate = useNavigate();

  const {
    auth,
    isAuthenticated,
    logout,
  } = useAuth();

  const { cartItems } =
    useCartContext();

  const {

    setSearchResults,

    setSearchQuery,

    recentSearches,

    addRecentSearch,

  } = useSearchContext();

  // ======================
  // STATE
  // ======================

  const [search, setSearch] =
    useState("");

  const [
    searchLoading,
    setSearchLoading,
  ] = useState(false);

  const [
    searchError,
    setSearchError,
  ] = useState("");

  const [
    showRecentSearches,
    setShowRecentSearches,
  ] = useState(false);

  // ======================
  // REFS
  // ======================

  const searchRef =
    useRef(null);

  // ======================
  // DEBOUNCE
  // ======================

  const debouncedSearch =
    useDebounce(search, 500);

  // ======================
  // TOTAL CART ITEMS
  // ======================

  const totalItems = useMemo(() => {

    return cartItems.reduce(

      (acc, item) =>

        acc +
        (item.quantity || 1),

      0
    );

  }, [cartItems]);

  // ======================
  // SEARCH EFFECT
  // ======================

  useEffect(() => {

    const query =
      debouncedSearch.trim();

    // ======================
    // RESET SEARCH
    // ======================

    if (!query) {

      setSearchResults(null);

      setSearchQuery("");

      setSearchError("");

      return;
    }

    // ======================
    // ABORT CONTROLLER
    // ======================

    const controller =
      new AbortController();

    async function searchProducts() {

      try {

        setSearchLoading(true);

        setSearchError("");

        const { data } =
          await api.get(

            "/product/search",

            {
              params: {
                q: query,
              },

              signal:
                controller.signal,
            }
          );

        // ======================
        // VALIDATE RESPONSE
        // ======================

        if (
          data?.status !==
          "success"
        ) {

          throw new Error(

            data?.message ||

            "Search failed"
          );
        }

        // ======================
        // EXTRACT PRODUCTS
        // ======================

        const products =
          data?.data?.items ||
          [];

        // ======================
        // UPDATE CONTEXT
        // ======================

        setSearchResults(
          products
        );

        setSearchQuery(query);

        // ======================
        // RECENT SEARCHES
        // ======================

        addRecentSearch(query);

      }

      catch (error) {

        // Ignore cancelled requests

        if (
          error.name ===
          "CanceledError"
        ) {

          return;
        }

        console.error(
          "Search error:",
          error
        );

        setSearchError(

          error.response?.data
            ?.message ||

          error.message ||

          "Unable to search products"
        );
      }

      finally {

        setSearchLoading(false);
      }
    }

    searchProducts();

    // ======================
    // CLEANUP
    // ======================

    return () => {

      controller.abort();
    };

  }, [

    debouncedSearch,

    setSearchResults,

    setSearchQuery,

    addRecentSearch,
  ]);

  // ======================
  // CLOSE RECENT SEARCHES
  // ======================

  useEffect(() => {

    function handleClickOutside(
      e
    ) {

      if (
        searchRef.current &&
        !searchRef.current.contains(
          e.target
        )
      ) {

        setShowRecentSearches(
          false
        );
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // ======================
  // LOGOUT
  // ======================

  function handleLogout() {

    logout();

    navigate("/login");
  }

  // ======================
  // CLEAR SEARCH
  // ======================

  function handleClearSearch() {

    setSearch("");

    setSearchResults(null);

    setSearchQuery("");

    setSearchError("");
  }

  // ======================
  // UI
  // ======================

  return (

    <header className={styles.header}>

      <div className={styles.container}>

        {/* ======================
            LOGO
        ====================== */}

        <Link
          to="/"
          className={styles.logo}
        >

          <span
            className={
              styles.logoMark
            }
          >
            G
          </span>

          <div>

            <h2>
              Grocerix
            </h2>

            <p>
              Commerce Platform
            </p>

          </div>

        </Link>

        {/* ======================
            NAVIGATION
        ====================== */}

        <nav className={styles.nav}>

          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/products">
            Products
          </NavLink>

          <NavLink to="/categories">
            Categories
          </NavLink>

          <NavLink to="/deals">
            Deals
          </NavLink>

        </nav>

        {/* ======================
            SEARCH
        ====================== */}

        <div
          className={
            styles.searchWrapper
          }
          ref={searchRef}
        >

          <form
            className={
              styles.search
            }
            onSubmit={(e) =>
              e.preventDefault()
            }
          >

            <FiSearch />

            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              onFocus={() =>
                setShowRecentSearches(
                  true
                )
              }
            />

            {/* ======================
                CLEAR INPUT
            ====================== */}

            {search && (

              <button
                type="button"
                className={
                  styles.clearInputBtn
                }
                onClick={
                  handleClearSearch
                }
              >

                <FiX />

              </button>
            )}

            {/* ======================
                SEARCH LOADING
            ====================== */}

            {searchLoading && (

              <span
                className={
                  styles.searchLoading
                }
              >

                Searching...

              </span>
            )}

          </form>

          {/* ======================
              RECENT SEARCHES
          ====================== */}

          {showRecentSearches &&
            recentSearches.length >
              0 &&
            !search.trim() && (

              <div
                className={
                  styles.recentSearches
                }
              >

                <div
                  className={
                    styles.recentHeader
                  }
                >

                  <h4>
                    Recent Searches
                  </h4>

                </div>

                {recentSearches.map(
                  (item) => (

                    <button
                      key={item}
                      type="button"
                      className={
                        styles.recentItem
                      }
                      onClick={() => {

                        setSearch(
                          item
                        );

                        setShowRecentSearches(
                          false
                        );

                      }}
                    >

                      <FiClock />

                      <span>
                        {item}
                      </span>

                    </button>
                  )
                )}

              </div>
            )}

          {/* ======================
              SEARCH ERROR
          ====================== */}

          {searchError && (

            <p
              className={
                styles.searchError
              }
            >

              {searchError}

            </p>
          )}

        </div>

        {/* ======================
            ACTIONS
        ====================== */}

        <div className={styles.actions}>

          {/* ======================
              CART
          ====================== */}

          <Link
            to="/cart"
            className={styles.cart}
          >

            <FiShoppingCart />

            {totalItems > 0 && (

              <span>
                {totalItems}
              </span>
            )}

          </Link>

          {/* ======================
              AUTH
          ====================== */}

          {!isAuthenticated
            ? (

              <div
                className={
                  styles.auth
                }
              >

                <Link to="/login">
                  Login
                </Link>

                <Link
                  to="/signup"
                  className={
                    styles.primaryBtn
                  }
                >

                  Get Started

                </Link>

              </div>
            )
            : (

              <div
                className={
                  styles.profile
                }
              >

                <div
                  className={
                    styles.avatar
                  }
                >

                  <FiUser />

                </div>

                <div
                  className={
                    styles.userInfo
                  }
                >

                  <small>
                    Signed in as
                  </small>

                  <h5>

                    {auth.user ||
                      "User"}

                  </h5>

                </div>

                <button
                  onClick={
                    handleLogout
                  }
                  className={
                    styles.logoutBtn
                  }
                >

                  <FiLogOut />

                </button>

              </div>
            )}

        </div>

      </div>

    </header>
  );
}































































// import styles from "./Header.module.scss";

// import {
//   Link,
//   NavLink,
//   useNavigate,
// } from "react-router-dom";

// import {
//   FiSearch,
//   FiShoppingCart,
//   FiUser,
//   FiLogOut,
// } from "react-icons/fi";

// import {
//   useEffect,
//   useMemo,
//   useState,
//   useRef,
// } from "react";

// import useCartContext from "../../hooks/useCartContext";
// import useAuth from "../../hooks/useAuthContext";
// import useSearchContext from "../../hooks/useSearchContext";

// import useDebounce from "../../hooks/useDebounce";

// import api from "../../api/api";

// export default function Header() {
  
//   // ======================
//   // HOOKS
//   // ======================

//   const navigate = useNavigate();
  
//   const {
//     auth,
//     user,
//     isAuthenticated,
//     logout,
//   } = useAuth();

//   const { cartItems } = useCartContext();

//   const {

//    setSearchResults,

//    setSearchQuery,

//    recentSearches,
 
//    addRecentSearch,

//   } = useSearchContext();


//    // ======================
//    // STATE
//    // ======================

//   const [search, setSearch] =
//     useState("");

//   // const debouncedSearch = useDebounce(search, 500);

//   const [
//     searchLoading,
//     setSearchLoading,
//   ] = useState(false);

//   const [
//     searchError,
//     setSearchError,
//   ] = useState("");

//   const [
//     showRecentSearches,
//     setShowRecentSearches,
//   ] = useState(false);

//    // ======================
//   // REFS
//   // ======================

//   const searchRef = useRef(null);


//   // ======================
//   // DEBOUNCED SEARCH
//   // ======================

//   const debouncedSearch =

//     useDebounce(search, 500);


//   // const {

//   //   setSearchResults,

//   //   setSearchQuery,

//   // } = useSearchContext();

//   // const {
//   //   auth,
//   //   user,
//   //   isAuthenticated,
//   //   logout,
//   // } = useAuth();
//   // console.log("Auth in Header:", auth);
//   // console.log("User in Header:", user);
//   // console.log("Is Authenticated in Header:", isAuthenticated);
//   // console.log("Logout function in Header:", logout);
//   // const { cartItems } = useCartContext();
//   // console.log("Cart Items in Header:", cartItems);
//   // const [search, setSearch] =  useState("");

  
  
  
//   // ======================
//   // TOTAL CART ITEMS
//   // ======================

//   const totalItems = useMemo(() => {

//     return cartItems.reduce(
//       (acc, item) =>
//         acc + (item.quantity || 1),
//       0
//     );

//   }, [cartItems]);

//   // ======================
//   // SEARCH
//   // ======================

//   // ======================
//   // SEARCH EFFECT
//   // ======================

//    useEffect(() => {

//     const query =
//       debouncedSearch.trim();

//       // ======================
//     // RESET SEARCH
//     // ======================

//     if (!query) {

//       setSearchResults(null);

//       setSearchQuery("");

//       return;
//     }

//      // ======================
//     // ABORT CONTROLLER
//     // ======================

//     const controller =
//       new AbortController();

//     async function searchProducts() {

//       try {

//         setSearchLoading(true);

//         setSearchError("");

//         const { data } =
//           await api.get(

//             "/product/search",

//             {
//               params: {
//                 q: query,
//               },

//               signal:
//                 controller.signal,
//             }
//           );


//           // ======================
//         // VALIDATE RESPONSE
//         // ======================

//         if (
//           data?.status !== "success"
//         ) {

//           throw new Error(

//             data?.message ||

//             "Search failed"
//           );
//         }


//         // ======================
//         // EXTRACT PRODUCTS
//         // ======================

//         const products =
//           data?.data?.items || [];


//            // ======================
//         // UPDATE CONTEXT
//         // ======================

//         setSearchResults(
//           products
//         );

//         setSearchQuery(query);

//       }

//       catch (error) {

//         // Ignore cancelled requests

//         if (
//           error.name ===
//           "CanceledError"
//         ) {

//           return;
//         }

//         console.error(
//           "Search error:",
//           error
//         );

//         setSearchError(

//           error.response?.data
//             ?.message ||

//           error.message ||

//           "Unable to search products"
//         );
//       }

//       finally {

//         setSearchLoading(false);
//       }
//     }

//     searchProducts();

//      // ======================
//     // CLEANUP
//     // ======================

//     return () => {

//       controller.abort();
//     };

//   }, [

//     debouncedSearch,

//     setSearchResults,

//     setSearchQuery,
//   ]);

//   // ======================
//   // LOGOUT
//   // ======================

//   function handleLogout() {

//     logout();

//     navigate("/login");
//   }


//   // async function handleSearch(e) {

//   // e.preventDefault();

//   // ======================
//   // SANITIZE INPUT
//   // ======================

//   // const query = search.trim();

//   // prevent empty searches
//   // if (!query) return;

//   // prevent duplicate requests
//   // if (searchLoading) return;

//   // try {

//     // ======================
//     // LOADING START
//     // ======================

//     // setSearchLoading(true);

//     // setSearchError("");

//     // ======================
//     // API REQUEST
//     // ======================

//     // const { data } =
//     //   await api.get(

//     //     "/product/search",

//     //     {
//     //       params: {
//     //         q: query,
//     //       },
//     //     }
//     //   );

//     // console.log(
//     //   "Search response:",
//     //   data
//     // );

//     // ======================
//     // VALIDATE RESPONSE
//     // ======================

//     // if (
//     //   data?.status !== "success"
//     // ) {

//     //   throw new Error(

//     //     data?.message ||

//     //     "Search failed"
//     //   );
//     // }

//     // ======================
//     // EXTRACT DATA
//     // ======================

//     // const products =
//     //   data?.data?.items || [];

//     // const total =
//     //   data?.data?.total || 0;


//       // ======================
//     // UPDATE UI
//     // ======================

//     // setSearchResults(products);
//     // setSearchQuery(query);

//     // ======================
//     // NAVIGATE
//     // ======================

//     // navigate(

//     //   `/search?q=${encodeURIComponent(
//     //     query
//     //   )}`,

//     //   {
//     //     state: {

//     //       products,

//     //       total,

//     //       query,
//     //     },
//     //   }
//     // );

//   // }

//   // catch (error) {

//   //   console.error(
//   //     "Search error:",
//   //     error
//   //   );

//     // ======================
//     // CLEAN ERROR MESSAGE
//     // ======================

//     // const message =

//     //   error.response?.data?.message ||

//     //   error.message ||

//     //   "Unable to search products";

//     // setSearchError(message);

//     // optional:
//     // toast.error(message);
//   // }

//   // finally {

//     // ======================
//     // LOADING END
//     // ======================

// //     setSearchLoading(false);
// //   }
// // }

 



//   //  async function handleSearch(e) {

//   //   e.preventDefault();

//   //   const query = search.trim();

//   //   if (!query) return;

//   //   try {
//   //     // You can also add more complex search logic here,
//   //     // like searching by category, brand, etc.

//   //      // ======================
//   //   // API REQUEST
//   //   // ======================
//   //     const response = await api.get(
//   //       `/product/search?q=${encodeURIComponent(query)}`
//   //     );

//   //      const data = response.data;

//   //   // ======================
//   //   // ERROR
//   //   // ======================

//   //   if (!response.ok) {

//   //     throw new Error(
//   //       data.message ||
//   //       "Search failed"
//   //     );
//   //   }




//   //   } catch (error) {

//   //     console.error("Search error:", error);
//   //     // Optionally show a toast or notification about the error
//   //     return;

//   //   }

//   //   // navigate(
//   //   //   `/search?q=${encodeURIComponent(
//   //   //     query
//   //   //   )}`
//   //   // );
//   // }

//   // ======================
//   // LOGOUT
//   // ======================

//   // function handleLogout() {

//   //   logout();

//   //   navigate("/login");
//   // }


//   // ======================
//   // UI
//   // ======================
  
//   return (

//     <header className={styles.header}>

//       <div className={styles.container}>

//         {/* ======================
//             LOGO
//         ====================== */}

//         <Link
//           to="/"
//           className={styles.logo}
//         >

//           <span className={styles.logoMark}>
//             G
//           </span>

//           <div>
//             <h2>
//               Grocerix
//             </h2>

//             <p>
//               Commerce Platform
//             </p>
//           </div>

//         </Link>

//         {/* ======================
//             NAVIGATION
//         ====================== */}

//         <nav className={styles.nav}>

//           <NavLink to="/">
//             Home
//           </NavLink>

//           <NavLink to="/products">
//             Products
//           </NavLink>

//           <NavLink to="/categories">
//             Categories
//           </NavLink>

//           <NavLink to="/deals">
//             Deals
//           </NavLink>

//         </nav>

//         {/* ======================
//             SEARCH
//         ====================== */}

//         <form
//           className={styles.search}
//           // onSubmit={handleSearch}
//           onSubmit={(e)=> e.preventDefault()}
//         >

//           <FiSearch />

//           <input
//             type="text"
//             placeholder="Search products, brands, categories..."
//             value={search}
//             onChange={(e) =>
//               setSearch(
//                 e.target.value
//               )
//             }
//           />

//           {/* ======================
//               SEARCH LOADING
//           ====================== */}

//           {
//             searchLoading && (

//               <span
//                 className={
//                   styles.searchLoading
//                 }
//               >

//                 Searching...

//               </span>
//             )
//           }


//         </form>

//          {/* ======================
//             SEARCH ERROR
//         ====================== */}

//         {
//           searchError && (

//             <p
//               className={
//                 styles.searchError
//               }
//             >

//               {searchError}

//             </p>
//           )
//         }

//         {/* ======================
//             ACTIONS
//         ====================== */}

//         <div className={styles.actions}>

//           <Link
//             to="/cart"
//             className={styles.cart}
//           >

//             <FiShoppingCart />

//             {
//               totalItems > 0 &&
//               (
//                 <span>
//                   {totalItems}
//                 </span>
//               )
//             }

//           </Link>

//           {
//             !isAuthenticated
//               ? (
//                 <div className={styles.auth}>

//                   <Link to="/login">
//                     Login
//                   </Link>

//                   <Link
//                     to="/signup"
//                     className={
//                       styles.primaryBtn
//                     }
//                   >
//                     Get Started
//                   </Link>

//                 </div>
//               )
//               : (
//                 <div className={styles.profile}>

//                   <div className={styles.avatar}>
//                     <FiUser />
//                   </div>

//                   <div
//                     className={
//                       styles.userInfo
//                     }
//                   >

//                     <small>
//                       Signed in as
//                     </small>

//                     <h5>
//                       {
//                         // user?.name ||
//                         // user?.username ||
//                         auth.user || "User"
//                         // "User"
//                       }
//                     </h5>

//                   </div>

//                   <button
//                     onClick={handleLogout}
//                     className={
//                       styles.logoutBtn
//                     }
//                   >

//                     <FiLogOut />

//                   </button>

//                 </div>
//               )
//           }

//         </div>

//       </div>

//     </header>
//   );
// }



























































// Header.jsx

// import styles from "./Header.module.scss";

// import {
//   Link,
//   NavLink,
//   useNavigate,
// } from "react-router-dom";

// import {
//   FiSearch,
//   FiShoppingCart,
//   FiUser,
//   FiMenu,
//   FiX,
//   FiLogOut,
// } from "react-icons/fi";

// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import useContextUiData from "../../hooks/useContextUiData";
// import useCartContext from "../../hooks/useCartContext";

// // const public_images =
// //   import.meta.env.VITE_PUBLIC_IMAGES;

// export default function Header() {

//   const navigate = useNavigate();

//   const {
//     isLogin,
//     loginInfo,
//     setIsLogin,
//     toast,
//   } = useContextUiData();

//   const { cartItems } =   useCartContext();
//   // console.log("Cart Items in Header:", cartItems);
//   const [mobileMenuOpen, setMobileMenuOpen] =  useState(false);

//   const [searchOpen, setSearchOpen] = useState(false);

//   const [searchQuery, setSearchQuery] =  useState("");

//   const searchInputRef = useRef(null);

//   // ======================
//   // AUTO FOCUS SEARCH
//   // ======================

//   useEffect(() => {

//     if (
//       searchOpen &&
//       searchInputRef.current
//     ) {

//       searchInputRef.current.focus();
//     }

//   }, [searchOpen]);

//   // ======================
//   // LOGOUT
//   // ======================

//   const handleLogout = () => {

//     localStorage.clear();

//     setIsLogin(false);

//     toast("Logout Successfully");

//     navigate("/login");
//   };

//   // ======================
//   // SEARCH
//   // ======================

//   const handleSearch = () => {

//     if (!searchQuery.trim()) return;

//     navigate(
//       `/search?q=${encodeURIComponent(
//         searchQuery
//       )}`
//     );

//     setSearchOpen(false);
//   };

//   return (

//     <>
//       <header className={styles.header}>

//         <div className={styles.wrapper}>

//           {/* ======================
//               LEFT
//           ====================== */}

//           <div className={styles.left}>

//             {/* <button
//               className={styles.mobileToggle}
//               onClick={() =>
//                 setMobileMenuOpen(
//                   !mobileMenuOpen
//                 )
//               }
//             >

//               {
//                 mobileMenuOpen
//                   ? <FiX />
//                   : <FiMenu />
//               }

//             </button> */}

//             <Link
//               to="/"
//               className={styles.logo}
//             >

//               {/* <img
//                 src={`${public_images}logoKaPhoto.png`}
//                 alt="Company Logo"
//               /> */}
//               <h1>
//               <span>
//                 Grocerix
//               </span>
//               </h1>
//             </Link>

//           </div>

//           {/* ======================
//               CENTER NAV
//           ====================== */}

//           <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ""}`}>

//             {/* <NavLink to="/">
//               Home
//             </NavLink> */}

//             {/* <NavLink to="/products">
//               Products
//             </NavLink>

//             <NavLink to="/categories">
//               Categories
//             </NavLink> */}
// {/* 
//             {
//               isLogin &&
//               (
//                 <NavLink to="/dashboard">
//                   Dashboard
//                 </NavLink>
//               )
//             } */}

//           </nav>

//           {/* ======================
//               RIGHT ACTIONS
//           ====================== */}

//           <div className={styles.actions}>

//             {/* SEARCH */}

//             <button
//               className={styles.iconButton}
//               onClick={() =>
//                 setSearchOpen(true)
//               }
//             >

//               <FiSearch />

//             </button>

//             {/* CART */}

//             <Link
//               to="/cart"
//               className={styles.cart}
//             >

//               <FiShoppingCart />

//               {
//                 cartItems.length > 0 &&
//                 (
//                   <span className={styles.badge}>
//                     {cartItems.length}
//                   </span>
//                 )
//               }

//             </Link>

//             {/* AUTH */}

//             {
//               !isLogin
//                 ? (
//                   <div className={styles.authButtons}>

//                     <Link
//                       to="/login"
//                       className={styles.loginBtn}
//                     >
//                       Login
//                     </Link>

//                     <Link
//                       to="/signup"
//                       className={styles.signupBtn}
//                     >
//                       Get Started
//                     </Link>

//                   </div>
//                 )
//                 : (
//                   <div className={styles.profileSection}>

//                     <div className={styles.profileInfo}>

//                       <div className={styles.avatar}>
//                         <FiUser />
//                       </div>

//                       <div>

//                         <p>
//                           Welcome
//                         </p>

//                         <h5>
//                           {
//                             loginInfo?.user ||
//                             "User"
//                           }
//                         </h5>

//                       </div>

//                     </div>

//                     <button
//                       className={styles.logoutBtn}
//                       onClick={handleLogout}
//                     >

//                       <FiLogOut />

//                       Logout

//                     </button>

//                   </div>
//                 )
//             }

//           </div>

//         </div>

//       </header>

//       {/* ======================
//           SEARCH OVERLAY
//       ====================== */}

//       {
//         searchOpen &&
//         (
//           <div className={styles.searchOverlay}>

//             <div className={styles.searchModal}>

//               <button
//                 className={styles.closeSearch}
//                 onClick={() =>
//                   setSearchOpen(false)
//                 }
//               >

//                 <FiX />

//               </button>

//               <h2>
//                 Search Products
//               </h2>

//               <p>
//                 Search across products,
//                 categories and brands.
//               </p>

//               <div className={styles.searchInputWrapper}>

//                 <FiSearch />

//                 <input
//                   ref={searchInputRef}
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchQuery}
//                   onChange={(e) =>
//                     setSearchQuery(
//                       e.target.value
//                     )
//                   }
//                   onKeyDown={(e) => {

//                     if (e.key === "Enter") {
//                       handleSearch();
//                     }

//                   }}
//                 />

//               </div>

//               <button
//                 className={styles.searchBtn}
//                 onClick={handleSearch}
//               >

//                 Search Now

//               </button>

//             </div>

//           </div>
//         )
//       }

//     </>
//   );
// }
























































































// import styles from "./Header.module.scss";
// import { Link, useNavigate } from "react-router-dom";
// import { FiShoppingCart, FiSearch, FiX } from "react-icons/fi";
// import { useState } from "react";
// import useContextUiData from "../../hooks/useContextUiData";
// import useCartContext from "../../hooks/useCartContext";

// const public_images = import.meta.env.VITE_PUBLIC_IMAGES;

// export default function Header() {
//   const navigate = useNavigate();

//   const { isLogin, loginInfo, setIsLogin, toast } = useContextUiData();
//   const { cartItems } = useCartContext();

//   const [showSearch, setShowSearch] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("all");

//   const handleLogout = () => {
//     setIsLogin(false);
//     localStorage.clear();
//     navigate("/login");
//     toast("Logout Successfully");
//   };

//   const handleSearch = () => {
//     navigate(`/search?q=${searchValue}&filter=${selectedFilter}`);
//     setShowSearch(false);
//   };

//   return (
//     <>
//       <header className={styles.header}>
//         <div className={styles.container}>
//           <Link to="/" className={styles.logo}>
//             <img src={`${public_images}logoKaPhoto.png`} alt="Logo" />
//           </Link>

//           <nav className={styles.nav}>
//             <Link to="/">Home</Link>
//             {isLogin && <Link to="/dashboard">Dashboard</Link>}
//           </nav>

//           <div className={styles.actions}>
//             <button
//               className={styles.iconButton}
//               onClick={() => setShowSearch(true)}
//             >
//               <FiSearch />
//             </button>

//             <Link to="/cart" className={styles.cart}>
//               <FiShoppingCart />
//               {cartItems.length > 0 && (
//                 <span className={styles.badge}>
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>

//             {!isLogin ? (
//               <>
//                 <Link to="/login" className={styles.loginBtn}>
//                   Login
//                 </Link>

//                 <Link to="/signup" className={styles.signupBtn}>
//                   Signup
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <span className={styles.userName}>
//                   {loginInfo?.user || "Profile"}
//                 </span>

//                 <button
//                   className={styles.logoutBtn}
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </header>

//       {showSearch && (
//         <div className={styles.searchOverlay}>
//           <div className={styles.searchModal}>
//             <button
//               className={styles.closeBtn}
//               onClick={() => setShowSearch(false)}
//             >
//               <FiX />
//             </button>

//             <h3>Search Products</h3>

//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//             />

//             <div className={styles.filters}>
//               {["all", "electronics", "fashion", "books"].map((filter) => (
//                 <button
//                   key={filter}
//                   className={
//                     selectedFilter === filter
//                       ? styles.activeFilter
//                       : ""
//                   }
//                   onClick={() => setSelectedFilter(filter)}
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>

//             <button
//               className={styles.searchBtn}
//               onClick={handleSearch}
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


































































































// import styles from "./Header.module.scss";
// import { Link, useNavigate } from "react-router-dom";
// import { FiShoppingCart, FiSearch, FiX } from "react-icons/fi";
// import { useState } from "react";
// import useContextData from "../../hooks/useContext";
// import { getDataInfo, setDataInfo } from "../../utils/storage";

// const public_images = import.meta.env.VITE_PUBLIC_IMAGES;

// export default function Header() {
//   const navigate = useNavigate();
//   const getuser = getDataInfo()|| null;
//   const { isLogin,loginInfo, setIsLogin, toast, cartItems = [] } = useContextData();
//   console.log(loginInfo)
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("all");

//   const handleLogout = () => {
//     setIsLogin(false);
//     // setDataInfo({ login: false });
//     localStorage.clear()
//     navigate("/login");
//     toast("Logout Successfully");
//   };

//   const handleSearch = () => {
//     navigate(`/search?q=${searchValue}&filter=${selectedFilter}`);
//     setShowSearch(false);
//   };

//   return (
//     <>
//       <header className={styles.header}>
//         <div className={styles.container}>
//           <Link to="/" className={styles.logo}>
//             <img src={`${public_images}logoKaPhoto.png`} alt="logo" />
//           </Link>

//           <nav className={styles.nav}>
//             <Link to="/">Home</Link>
//             {/* <Link to="#">{loginInfo?.user || "Profile"}</Link> */}
            
//             {isLogin && <Link to="/dashboard">Dashboard</Link>}
//           </nav>

//           <div className={styles.actions}>
//             <button
//               className={styles.iconButton}
//               onClick={() => setShowSearch(true)}
//             >
//               <FiSearch />
//             </button>

//             <Link to="/cart" className={styles.cart}>
//               <FiShoppingCart />
//               {cartItems.length > 0 && (
//                 <span className={styles.badge}>{cartItems.length}</span>
//               )}
//             </Link>

//             {!isLogin ? (
//               <>
//                 <Link to="/login" className={styles.loginBtn}>
//                   Login
//                 </Link>
//                 <Link to="/signup" className={styles.signupBtn}>
//                   Signup
//                 </Link>
//                  {/* <Link to="#">{loginInfo?.user || "Profile"}</Link> */}
//               </>
//             ) : (
//               <>
//                <Link to="#">{loginInfo?.user || "Profile"}</Link>
//               <button className={styles.logoutBtn} onClick={handleLogout}>
//                 Logout
//               </button>
//               </>
//             )}
//           </div>
//         </div>
//       </header>

//       {showSearch && (
//         <div className={styles.searchOverlay}>
//           <div className={styles.searchModal}>
//             <button
//               className={styles.closeBtn}
//               onClick={() => setShowSearch(false)}
//             >
//               <FiX />
//             </button>

//             <h3>Search Products</h3>

//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//             />

//             <div className={styles.filters}>
//               {["all", "electronics", "fashion", "books"].map((filter) => (
//                 <button
//                   key={filter}
//                   className={
//                     selectedFilter === filter ? styles.activeFilter : ""
//                   }
//                   onClick={() => setSelectedFilter(filter)}
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>

//             <button className={styles.searchBtn} onClick={handleSearch}>
//               Search
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }