import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import api from "../api/api";
import useAuth from "../hooks/useAuthContext";


// ======================
// CONTEXT
// ======================

export const CartContext = createContext();


// ======================
// PROVIDER
// ======================

export function CartProvider({ children }) {

  // ======================
  // AUTH
  // ======================

  const {
    isAuthenticated,
    loading: authLoading,
  } = useAuth();


  // ======================
  // STATE
  // ======================

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);


  // ======================
  // FORMAT CART
  // ======================

  const formatCartItems =
    useCallback((items = []) => {

      return items
        .filter((item) => item?.products)
        .map((item) => ({

          cartItemId: item.id,

          productId: item.products.id,

          product_name:
            item.products.product_name,

          product_image:
            item.products.product_image,

          price:
            Number(item.products.price) || 0,

          quantity:
            Number(item.quantity) || 1,

          totalPrice:
            Number(item.totalPrice) || 0,
        }));

    }, []);


  // ======================
  // FETCH CART
  // ======================

  const fetchCart = useCallback(
    async () => {

      try {

        setLoading(true);

        setError(null);

        const response =  await api.get("/cart");
        // console.log("CART RESPONSE:", response.data.data);
        // console.log("GET CART RESPONSE:", response.data);
        const rawCart = response.data?.data || [];
        // console.log("RAW CART:", rawCart);
        const formattedCart = formatCartItems(rawCart);
        // console.log("FORMATTED CART:", formattedCart);
        setCartItems(formattedCart);

      }

      catch (error) {

        console.error(
          "Fetch cart failed:",
          error
        );

        setError(

          error.response?.data?.message ||

          error.message ||

          "Failed to fetch cart"
        );
      }

      finally {

        setLoading(false);
      }
    },

    [formatCartItems]
  );


  // ======================
  // INITIAL LOAD
  // ======================

  useEffect(() => {

    if (
      authLoading ||
      !isAuthenticated
    ) {
      return;
    }

    fetchCart();

  }, [
    authLoading,
    isAuthenticated,
    fetchCart,
  ]);


  // ======================
  // ADD TO CART
  // ======================

  const addToCart =
    useCallback(async (product) => {

      try {

        setError(null);

        const payload =
          new URLSearchParams();

        payload.append(
          "productId",
          product.id
        );

        payload.append(
          "quantity",
          1
        );

        await api.post(
          "/cart/addCart",
          payload
        );

        // REFRESH CART
        await fetchCart();

      }

      catch (error) {

        console.error(
          "Add to cart failed:",
          error
        );

        setError(

          error.response?.data?.message ||

          error.message ||

          "Failed to add item"
        );
      }

    }, [fetchCart]);


  // ======================
  // REMOVE ITEM
  // ======================

  const removeFromCart =
    useCallback(async (cartItemId) => {

      try {

        setError(null);

        await api.delete(
          `/cart/${cartItemId}`
        );

        await fetchCart();

      }

      catch (error) {

        console.error(
          "Remove item failed:",
          error
        );

        setError(

          error.response?.data?.message ||

          error.message ||

          "Failed to remove item"
        );
      }

    }, [fetchCart]);


  // ======================
  // UPDATE QUANTITY
  // ======================

  const updateQuantity =
    useCallback(

      async (
        // item,
        cartItemId,
        action
      ) => {

        try {
           console.log("Cart ID:", cartItemId);
      console.log("Action:", action);
          // console.log("Y H RES K STRUCTURE IN UPDATEQUANTITY",item);
          // console.log("Y H CART ID PAYLOAD IN UPDATEQUANTITY",cartItemId)
          // console.log("Y H CART K PAYLOAD IN UPDATEQUANTITY",action)
          setError(null);

          await api.put(
            `/cart/${cartItemId}`,
            // { quantity }
             { action }
          );

          await fetchCart();

        }

        catch (error) {

          console.error(
            "Update quantity failed:",
            error
          );

          setError(

            error.response?.data?.message ||

            error.message ||

            "Failed to update quantity"
          );
        }

      },

      [fetchCart]
    );


  // ======================
  // INCREASE QUANTITY
  // ======================

  const increaseQuantity =
    useCallback(

      async (item) => {
        console.log(
      "Increase Item:",
      item
    );
// console.log("Y H RES K STRUCTURE IN INCREASEQUANTITY",item);
        await updateQuantity(
          item.cartItemId,
          // item.quantity + 1
          "increment"
        );

      },

      [updateQuantity]
    );


  // ======================
  // DECREASE QUANTITY
  // ======================

const decreaseQuantity = useCallback(

  async (
    item,
    // cartItemId,
    // currentQuantity
  ) => {

    try {
       console.log(
        "Decrease Item:",
        item
      );
// console.log("Y H RES K STRUCTURE IN DECREASEQUANTITY",item);
//  console.log("Y H CART ID PAYLOAD IN DECREASEQUANTITY",cartItemId)
          // console.log("Y H CART K PAYLOAD IN DECREASEQUANTITY",action)
          // console.log("Y H CART K CURRENTQUANTITY IN DECREASEQUANTITY",currentQuantity)
      if (item.quantity <= 1) {
        return;
      }

      await updateQuantity(
        item.cartItemId,
        // item.quantity - 1
         "decrement"
      );

      // Refresh backend state
      await fetchCart();

    }

    catch (error) {

      console.error(
        "Decrease quantity failed:",
        error
      );
    }

  },

  [
    updateQuantity,
    fetchCart,
  ]
);








  // const decreaseQuantity =
  //   useCallback(

  //     async (item) => {

  //       if (item.quantity <= 1) {

  //         return;
  //       }

  //       await updateQuantity(
  //         item.cartItemId,
  //         item.quantity - 1
  //       );

  //     },

  //     [updateQuantity]
  //   );


  // ======================
  // CLEAR CART
  // ======================

  const clearCart =
    useCallback(async () => {

      try {

        await api.delete(
          "/cart/clear"
        );

        setCartItems([]);

      }

      catch (error) {

        console.error(
          "Clear cart failed:",
          error
        );

        setError(

          error.response?.data?.message ||

          error.message ||

          "Failed to clear cart"
        );
      }

    }, []);


  // ======================
  // TOTAL ITEMS
  // ======================

  const totalItems =
    useMemo(() => {

      return cartItems.reduce(

        (total, item) =>

          total + item.quantity,

        0
      );

    }, [cartItems]);


  // ======================
  // TOTAL PRICE
  // ======================

  const totalPrice =
    useMemo(() => {

      return cartItems.reduce(

        (total, item) =>

          total + item.totalPrice,

        0
      );

    }, [cartItems]);


  // ======================
  // CONTEXT VALUE
  // ======================

  const value = {

    cartItems,

    loading,

    error,

    totalItems,

    totalPrice,

    fetchCart,

    addToCart,

    removeFromCart,

    increaseQuantity,

    decreaseQuantity,

    clearCart,
  };


  // ======================
  // PROVIDER
  // ======================

  return (

    <CartContext.Provider value={value}>

      {children}

    </CartContext.Provider>
  );
}




























































// import {
//   createContext,
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import api from "../api/api";

// import useAuth from "../hooks/useAuthContext";



// // ======================
// // CREATE CONTEXT
// // ======================

// export const CartContext = createContext();



// // ======================
// // CART PROVIDER
// // ======================

// export function CartProvider({ children }) {

//   // ======================
//   // AUTH
//   // ======================

//   const {
//     isAuthenticated,
//     loading: authLoading,
//   } = useAuth();



//   // ======================
//   // STATE
//   // ======================

//   const [cartItems, setCartItems] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState(null);



//   // ======================
//   // FETCH CART
//   // ======================

//   const fetchCart = useCallback(async () => {

//     try {

//       setLoading(true);

//       setError(null);

//       const response = await api.get("/cart");

//       const formattedCart = response.data.data.map((item) => ({

//         id: item.product.id,

//         product_name:
//           item.product.product_name,

//         product_image:
//           item.product.product_image,

//         price: item.product.price,

//         quantity: item.quantity,

//         totalPrice: item.totalPrice,
//       }));

//       setCartItems(formattedCart);

//     }

//     catch (error) {

//       console.error(
//         "Failed to fetch cart:",
//         error
//       );

//       setError(

//         error.response?.data?.message ||

//         error.message ||

//         "Failed to load cart"
//       );
//     }

//     finally {

//       setLoading(false);
//     }

//   }, []);




//   // ======================
//   // INITIAL CART LOAD
//   // ======================

//   useEffect(() => {

//     if (

//       !authLoading &&

//       isAuthenticated

//     ) {

//       fetchCart();
//     }

//   }, [

//     authLoading,

//     isAuthenticated,

//     fetchCart,
//   ]);



//   // ======================
//   // ADD TO CART
//   // ======================

//   const addToCart = useCallback(

//     async (product) => {

//       try {

//         const data =
//           new URLSearchParams();

//         data.append(
//           "productId",
//           product.id
//         );

//         data.append(
//           "quantity",
//           1
//         );



//         await api.post(
//           "/cart/addCart",
//           data
//         );



//         setCartItems((prev) => {

//           const existingProduct =
//             prev.find(
//               (item) =>
//                 item.id === product.id
//             );



//           if (existingProduct) {

//             return prev.map((item) =>

//               item.id === product.id

//                 ? {

//                     ...item,

//                     quantity:
//                       item.quantity + 1,

//                     totalPrice:
//                       (item.quantity + 1) *
//                       item.price,
//                   }

//                 : item
//             );
//           }



//           return [

//             ...prev,

//             {

//               id: product.id,

//               product_name:
//                 product.product_name,

//               product_image:
//                 product.product_image,

//               price: product.price,

//               quantity: 1,

//               totalPrice:
//                 product.price,
//             },
//           ];
//         });

//       }

//       catch (error) {

//         console.error(
//           "Failed to add to cart:",
//           error
//         );

//         setError(

//           error.response?.data?.message ||

//           error.message ||

//           "Failed to add item"
//         );
//       }

//     },

//     []
//   );



//   // ======================
//   // REMOVE FROM CART
//   // ======================

//   const removeFromCart = useCallback(

//     async (id) => {

//       try {

//         await api.delete(
//           `/cart/${id}`
//         );

//         setCartItems((prev) =>

//           prev.filter(
//             (item) => item.id !== id
//           )
//         );

//       }

//       catch (error) {

//         console.error(
//           "Failed to remove item:",
//           error
//         );

//         setError(

//           error.response?.data?.message ||

//           error.message ||

//           "Failed to remove item"
//         );
//       }

//     },

//     []
//   );



//   // ======================
//   // INCREASE QUANTITY
//   // ======================

//   const increaseQuantity =
//     useCallback((id) => {

//       setCartItems((prev) =>

//         prev.map((item) =>

//           item.id === id

//             ? {

//                 ...item,

//                 quantity:
//                   item.quantity + 1,

//                 totalPrice:
//                   (item.quantity + 1) *
//                   item.price,
//               }

//             : item
//         )
//       );

//     }, []);




//   // ======================
//   // DECREASE QUANTITY
//   // ======================

//   const decreaseQuantity =
//     useCallback((id) => {

//       setCartItems((prev) =>

//         prev.map((item) =>

//           item.id === id &&
//           item.quantity > 1

//             ? {

//                 ...item,

//                 quantity:
//                   item.quantity - 1,

//                 totalPrice:
//                   (item.quantity - 1) *
//                   item.price,
//               }

//             : item
//         )
//       );

//     }, []);




//   // ======================
//   // CLEAR CART
//   // ======================

//   const clearCart = useCallback(() => {

//     setCartItems([]);

//   }, []);




//   // ======================
//   // TOTAL PRICE
//   // ======================

//   const totalPrice = useMemo(() => {

//     return cartItems.reduce(

//       (total, item) =>

//         total +
//         item.price * item.quantity,

//       0
//     );

//   }, [cartItems]);




//   // ======================
//   // TOTAL ITEMS
//   // ======================

//   const totalItems = useMemo(() => {

//     return cartItems.reduce(

//       (total, item) =>

//         total + item.quantity,

//       0
//     );

//   }, [cartItems]);




//   // ======================
//   // CONTEXT VALUE
//   // ======================

//   const value = {

//     cartItems,

//     loading,

//     error,

//     totalPrice,

//     totalItems,

//     fetchCart,

//     addToCart,

//     removeFromCart,

//     increaseQuantity,

//     decreaseQuantity,

//     clearCart,
//   };



//   // ======================
//   // PROVIDER
//   // ======================

//   return (

//     <CartContext.Provider value={value}>

//       {children}

//     </CartContext.Provider>
//   );
// }









































































// import { createContext, useEffect, useState } from "react";
// import useContextUiData from "../hooks/useContextUiData";
// import api from "../api/api"
// import { getDataInfo } from "../utils/storage";
// // import useContextData from "../hooks/useContext";

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCart = localStorage.getItem("cart_items");
//     return storedCart ? JSON.parse(storedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart_items", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // const { loginInfo } = useContextUiData();
//   // console.log("CartContext loginInfo:#####", loginInfo);
//   // const token = loginInfo?.token;
//   // console.log("CartContext token:#####", token);


//   useEffect(() => {
//     if (!token) return;
//     const getCartItems = async () => {
//       try {
//         const res = await api.get(`/cart/`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setCartItems(
//           res.data.data.map((item) => ({
//             id: item.product.id,
//             product_name: item.product.product_name,
//             product_image: item.product.product_image,
//             price: item.product.price,
//             quantity: item.quantity,
//             totalPrice: item.totalPrice,
//           }))
//         );
//         // setCartItems(res.data.data);
//         console.log("Cart items loaded:", res.data.data);
//         console.log("Cart items state updated:#########", cartItems);
//       } catch (error) {
//         console.error("Failed to load cart:", error);
//       }
//     };

//     if (token) {
//       getCartItems();
//     }
//   }, [token]);

//   // const userDetails = getDataInfo();
//   // console.log("User details from storage:#####", userDetails);





//   const addToCart =async (product) => {
//     console.log("Adding to cart:#######################", product);
//     const productId = product.id;
//     const quantity = 1;
// const data = new URLSearchParams();
// data.append("productId", productId);
// data.append("quantity", quantity);



// // console.log(res.data);

//     responseAddToCart = await api.post("/cart/addCart", data
//       // productId: product.id,
//       // quantity: 1
      
     
    
//     // , {
//     //   headers: {
//     //     Authorization: `Bearer ${token}`
//     //   }
//     // }
//   );

//     console.log("Incoming product:", product);
//     console.log(JSON.stringify(product, null, 2));
//     setCartItems((prev) => {
//       const existingProduct = prev.find(
//         (item) => item.id === product.id
//       );

//       if (existingProduct) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? {
//               ...item,
//               quantity: item.quantity + 1
//             }
//             : item
//         );
//       }

//       return [
//         ...prev,
//         {
//           ...product,
//           quantity: 1
//         }
//       ];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prev) =>
//       prev.filter((item) => item.id !== id)
//     );
//   };

//   const increaseQuantity = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//             ...item,
//             quantity: item.quantity + 1
//           }
//           : item
//       )
//     );
//   };

//   const decreaseQuantity = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id && item.quantity > 1
//           ? {
//             ...item,
//             quantity: item.quantity - 1
//           }
//           : item
//       )
//     );
//   };

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         totalPrice
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }






























































































































// import { createContext, useEffect, useState } from "react";
// import useContextUiData from "../hooks/useContextUiData";
// import api from "../api/api";

// export const CartContext = createContext();

// export function CartProvider({ children }) {

//   const { loginInfo } = useContextUiData();
//   const token = loginInfo?.token;

//   const [cartItems, setCartItems] = useState([]);

//   // ✅ Fetch cart from backend
//   useEffect(() => {
//     if (!token) return;

//     const getCartItems = async () => {
//       try {
//         const res = await api.get("/cart", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("API RESPONSE:", res.data);

//         // ✅ Normalize backend data → single structure
//         const normalizedCart = res.data.data.map((item) => ({
//           id: item.product.id,
//           name: item.product.name,
//           price: item.product.price,
//           image: item.product.image,
//           quantity: item.quantity,
//         }));

//         setCartItems(normalizedCart);

//       } catch (error) {
//         console.error("Failed to load cart:", error);
//       }
//     };

//     getCartItems();
//   }, [token]);

//   // ✅ Debug updated state (correct way)
//   useEffect(() => {
//     console.log("Updated cartItems:", cartItems);
//   }, [cartItems]);

//   // ✅ Add to cart
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.id === product.id);

//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }

//       return [
//         ...prev,
//         {
//           id: product.id,
//           name: product.name,
//           price: product.price,
//           image: product.image,
//           quantity: 1,
//         },
//       ];
//     });
//   };

//   // ✅ Remove item
//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   // ✅ Increase quantity
//   const increaseQuantity = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   // ✅ Decrease quantity
//   const decreaseQuantity = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   // ✅ Total price (no more NaN 🚀)
//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         totalPrice,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }






















































































// 