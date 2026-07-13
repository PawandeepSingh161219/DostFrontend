import {

  useCallback,

  useEffect,

  useMemo,

  useState,

} from "react";

import { useNavigate } from "react-router-dom";

import Card from "../../components/card/Card";

import api from "../../api/api";

import styles from "./Home.module.scss";

import useSearchContext from "../../hooks/useSearchContext";



const PAGE_SIZE = 10;



export default function Home() {

  // ======================
  // HOOKS
  // ======================

  const navigate = useNavigate();
  const { searchResults, searchQuery, setSearchResults, setSearchQuery, } = useSearchContext();

  // ======================
  // STATE
  // ======================

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ======================
  // DISPLAY PRODUCTS
  // ======================
  const displayProducts = useMemo(() => {

    return searchResults !== null
      ? searchResults
      : products;

  }, [searchResults, products]);
  // const displayProducts =

  //   // searchResults || products;
  //   searchResults !== null

  //     ? searchResults

  //     : products;

  // ======================
  // SEARCH MODE
  // ======================

  // const isSearchMode =

  //   searchResults !== null;

  const isSearchMode =
    searchQuery.trim().length > 0;

  // ======================
  // FETCH PRODUCTS
  // ======================

  const fetchProducts = useCallback(

    async (signal) => {

      try {
        // show loader only on first load
        if (!products.length) {

          setLoading(true);
        }

        setError("");



        const response = await api.get(

          "/product/getproducts",

          {

            params: {

              page,

              limit: PAGE_SIZE,

            },

            signal,
          }
        );



        const data = response?.data?.data;



        if (!data) {

          throw new Error(
            "Invalid product response"
          );
        }



        const {

          items = [],

          total = 0,

        } = data;



        setProducts(items);

        setTotalPages(

          Math.ceil(total / PAGE_SIZE)
        );

      }

      catch (error) {

        // Ignore cancelled requests
        if (
          error.name === "CanceledError"
        ) {
          return;
        }



        console.error(
          "Failed to fetch products",
          error
        );



        setError(

          error.response?.data?.message ||

          error.message ||

          "Failed to load products"
        );
      }

      finally {

        setLoading(false);
      }
    },

    [page]
  );



  // ======================
  // LOAD PRODUCTS
  // ======================

  // useEffect(() => {

  //   const controller =
  //     new AbortController();



  //   fetchProducts(
  //     controller.signal
  //   );



  //   return () => {

  //     controller.abort();
  //   };

  // }, [fetchProducts]);

  useEffect(() => {

    // Skip fetching
    // while search is active

    if (isSearchMode) {
      return;
    }

    const controller =
      new AbortController();

    fetchProducts(
      controller.signal
    );

    return () => {

      controller.abort();
    };

  }, [

    fetchProducts,

    isSearchMode,
  ]);


  // ======================
  // HANDLE CARD CLICK
  // ======================

  const handleCardClick =
    useCallback(

      (product) => {

        navigate(
          `/product/${product.id}`
        );

      },

      [navigate]
    );



  // ======================
  // PAGINATION
  // ======================

  const pageNumbers = useMemo(() => {

    return Array.from(

      { length: totalPages },

      (_, index) => index + 1
    );

  }, [totalPages]);



  // ======================
  // PAGE CHANGE
  // ======================

  const handlePrevPage =
    useCallback(() => {

      setPage((prev) =>

        Math.max(prev - 1, 1)
      );

    }, []);



  const handleNextPage =
    useCallback(() => {

      setPage((prev) =>

        Math.min(
          prev + 1,
          totalPages
        )
      );

    }, [totalPages]);



  const handlePageSelect =
    useCallback((number) => {

      setPage(number);

    }, []);



  // ======================
  // LOADING STATE
  // ======================

  if (loading &&
    !products.length) {

    return (

      <div className={styles.status}>

        Loading products...

      </div>
    );
  }



  // ======================
  // ERROR STATE
  // ======================

  if (error) {

    return (

      <div className={styles.statusError}>

        {error}

      </div>
    );
  }



  // ======================
  // EMPTY STATE
  // ======================

  // if (!products.length) {

  //   return (

  //     <div className={styles.status}>

  //       No products found.

  //     </div>
  //   );
  // }


  if (!displayProducts?.length) {

    return (

      <section
        className={
          styles.pageWrapper
        }
      >

        <div
          className={styles.empty}
        >

          <h2>

            No products found

          </h2>

          {
            isSearchMode && (

              <p>

                No results found for
                "
                {searchQuery}
                "

              </p>
            )
          }

        </div>

      </section>
    );
  }


  // ======================
  // UI
  // ======================

  return (

    <section
      className={styles.pageWrapper}
    >
      {/* ======================
          SEARCH INFO
      ====================== */}

      {
        isSearchMode && (

          <div
            className={
              styles.searchInfo
            }
          >
            <div
              className={
                styles.searchContent
              }
            >
              <h3>

                Search Results

              </h3>

              <p>

                Showing{" "}
                
                  <strong>
                    {displayProducts.length}
                  </strong>
                
                {" "}
                results for
                {" "}
                "
                <span>
                  {searchQuery}
                </span>
                "

              </p>
            </div>
            <button
              type="button"

              className={styles.clearSearchBtn}

              onClick={() => {

                setSearchResults(null);

                setSearchQuery("");
                setPage(1);
              }}
            >

              Clear Search

            </button>

          </div>
        )
      }


      {/* ======================
          PRODUCT GRID
      ====================== */}

      <div className={styles.grid}>

        {displayProducts.map((product) => (

          <Card
            key={product.id}
            product={product}
            onCardClick={
              handleCardClick
            }
          />

        ))}

      </div>



      {/* ======================
          PAGINATION
      ====================== */}

      {!isSearchMode && (
        <div className={styles.pagination}>

          {/* PREV */}

          <button
            type="button"
            onClick={handlePrevPage}
            disabled={page === 1}
          >

            Prev

          </button>



          {/* PAGE NUMBERS */}

          {pageNumbers.map((number) => (

            <button
              key={number}
              type="button"
              className={
                page === number
                  ? styles.activePage
                  : ""
              }
              onClick={() =>
                handlePageSelect(number)
              }
            >

              {number}

            </button>

          ))}



          {/* NEXT */}

          <button
            type="button"
            onClick={handleNextPage}
            disabled={
              page === totalPages
            }
          >

            Next

          </button>

        </div>
      )}

    </section>
  );
}



































































// import Card from "../../components/card/Card";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import styles from "./Home.module.scss";
// import useCartContext from "../../hooks/useCartContext";

// export default function Home() {
//   const navigate = useNavigate();

//   const { addToCart }= useCartContext();

//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);


//   const handleCardClick = (product) => {
//     navigate(`/product/${product.id}`);
//     console.log("Open product:", product.product_name);
//   };

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     console.log("Add to cart:", product.product_name);
//   };

//   const pageSize = 10;

//   const getProducts = async () => {
//     try {
//       const response = await api.get("/product/getproducts", {
//         params: { page }
//       });
//       // console.log("API RESPONSE JSON:", JSON.stringify(response, null, 2)); // Log the entire response as JSON
//       // console.log("API Response####:", response); // Log the entire response object
//       // console.log("Response data items#####:", response.data.data.items);
//       // console.log("Get products successfully###:", response.data);

//       const { items, total } = response.data.data;
//       setProducts(items); // save response in state

//       setTotalPages(Math.ceil(total / pageSize));

//     } catch (error) {
//       // console.log("FULL ERROR:", error);
//       // console.log("ERROR RESPONSE:", error.response);
//       // console.log("ERROR DATA:", error.response?.data);
//       console.log(error.response?.data || error.message);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, [page]);

//   const pageNumbers = Array.from(
//     { length: totalPages },
//     (_, index) => index + 1
//   );

//   return (
//     <>
//       <div className={styles.pageWrapper}>
//         <div className={styles.grid}>
//           {products.map((product) => (
//             <Card
//               key={product.id}
//               product={product}
//               onCardClick={() => handleCardClick(product)}
//               onAddToCart={() => handleAddToCart(product)} />
//           ))}
//         </div>

//         <div className={styles.pagination}>
//           <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
//             Prev
//           </button>

//           {/* <span>Page {page}</span> */}
//           {pageNumbers.map((number) => (
//             <button
//               key={number}
//               className={page === number ? styles.activePage : ""}
//               onClick={() => setPage(number)}
//             >
//               {number}
//             </button>
//           ))}

//           <button onClick={() => setPage((prev) => prev + 1)}>
//             Next
//           </button>
//         </div>
//       </div>
//       {/* <Card products={products} /> */}
//       {/* <Card name={product.product_name} /> */}
//       {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
//     </>
//     // <div className={styles.home}>

//     //   {/* HERO SECTION */}
//     //   <section className={styles.heroSection}>
//     //     <h1>Build Your Skills with Confidence</h1>
//     //     <p>
//     //       Learn modern web development, enhance your coding skills, and grow
//     //       your career with structured guidance.
//     //     </p>
//     //     <button className={styles.heroBtn}>Explore Courses</button>
//     //   </section>

//     //   {/* CONTENT SECTION */}
//     //   <section className={styles.contentSection}>
//     //     <div className={styles.card}>
//     //       <h3>Frontend Development</h3>
//     //       <p>
//     //         Master HTML, CSS, JavaScript, React, and UI frameworks with
//     //         real-world projects and expert guidance.
//     //       </p>
//     //     </div>

//     //     <div className={styles.card}>
//     //       <h3>Backend Development</h3>
//     //       <p>
//     //         Learn Node.js, Express, MongoDB, and API development to build
//     //         scalable server-side applications.
//     //       </p>
//     //     </div>

//     //     <div className={styles.card}>
//     //       <h3>UI/UX Design</h3>
//     //       <p>
//     //         Explore design fundamentals, wireframing, prototyping, and
//     //         creating aesthetic user interfaces.
//     //       </p>
//     //     </div>
//     //   </section>
//     // </div>

//   );
// }


