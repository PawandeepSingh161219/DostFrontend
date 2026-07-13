import { memo, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./Card.module.scss";

import useAuth from "../../hooks/useAuthContext";

import useCartContext from "../../hooks/useCartContext";



function Card({

  product,

  onCardClick,

}) {

  // ======================
  // HOOKS
  // ======================

  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const { addToCart } = useCartContext();



  // ======================
  // PRODUCT DATA
  // ======================

  const {

    id,

    product_image,

    product_name,

    description,

    price,

    product_unit,

  } = product;



  // ======================
  // HANDLE ADD TO CART
  // ======================

  const handleAddToCart = useCallback(

    async (event) => {

      // Prevent card click navigation
      event.stopPropagation();

      // Prevent accidental form submit
      event.preventDefault();



      // ======================
      // AUTH CHECK
      // ======================

      if (!isAuthenticated) {

        navigate("/login", {
          replace: true,
        });

        return;
      }



      try {

        await addToCart(product);

      }

      catch (error) {

        console.error(
          "Failed to add product to cart",
          error
        );
      }
    },

    [
      addToCart,
      isAuthenticated,
      navigate,
      product,
    ]
  );



  // ======================
  // HANDLE CARD CLICK
  // ======================

  const handleCardClick = useCallback(() => {

    if (onCardClick) {

      onCardClick(product);
    }

  }, [onCardClick, product]);



  // ======================
  // RENDER
  // ======================

  return (

    <article
      className={styles.card}
      onClick={handleCardClick}
    >


      {/* ======================
          PRODUCT IMAGE
      ====================== */}

      <div className={styles.imageWrapper}>

        <img
          src={product_image}
          alt={product_name}
          className={styles.image}
          loading="lazy"
        />

      </div>



      {/* ======================
          PRODUCT CONTENT
      ====================== */}

      <div className={styles.content}>


        {/* UNIT */}

        <span className={styles.category}>

          {product_unit}

        </span>



        {/* TITLE */}

        <h3 className={styles.name}>

          {product_name}

        </h3>



        {/* DESCRIPTION */}

        <p className={styles.description}>

          {description}

        </p>



        {/* FOOTER */}

        <div className={styles.footer}>


          {/* PRICE */}

          <div className={styles.priceBlock}>

            <span className={styles.price}>

              ${price}

            </span>

          </div>



          {/* ADD TO CART */}

          <button
            type="button"
            className={styles.addToCart}
            onClick={handleAddToCart}
            aria-label={`Add ${product_name} to cart`}
          >

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />

              <circle cx="20" cy="21" r="1" />

              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            Add to Cart

          </button>

        </div>

      </div>

    </article>
  );
}



export default memo(Card);











































// import styles from './Card.module.scss';
// import useCartContext from '../../hooks/useCartContext';
// import useContextUiData from '../../hooks/useContextUiData';
// import { useNavigate } from 'react-router-dom';

// const Card = ({ product, onCardClick, onAddToCart
//   // image = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
//   // badge = 'New Arrival',
//   // category = 'Accessories',
//   // name = 'Minimalist Watch',
//   // description = 'Precision-crafted timepiece with sapphire crystal glass and Swiss movement.',
//   // price = 299,
//   // originalPrice = 399,
//   // rating = 4.8,
//   // reviewCount = 124,
//   // onAddToCart = () => {},
//   // onWishlist = () => {},
// }) => {
//   // const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
//   const {
//     product_image,
//     product_name,
//     description,
//     price,
//     product_unit,
//   } = product;

//   const { addToCart } = useCartContext();
//   const { isLogin, loginUser } = useContextUiData();
//   const navigate = useNavigate();

//   //  const handleAddToCart = () => {
//   //   addToCart(product);
//   //   onAddToCart();
//   // };

//   return (
//     <div className={styles.card} onClick={onCardClick}>
//       {/* Image Container */}
//       <div className={styles.imageWrapper}>
//         <img src={product_image} alt={product_name} className={styles.image} />

//         {/* Badges */}
//         {/* <div className={styles.badges}>
//           {badge && <span className={styles.badge}>{badge}</span>}
//           {discount > 0 && (
//             <span className={styles.discountBadge}>-{discount}%</span>
//           )}
//         </div> */}

//         {/* Wishlist Button */}
//         {/* <button
//           className={styles.wishlistBtn}
//           onClick={onWishlist}
//           aria-label="Add to wishlist"
//         >
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//           </svg>
//         </button> */}

//         {/* Quick View Overlay */}
//         {/* <div className={styles.overlay}>
//           <button className={styles.quickView}>Quick View</button>
//         </div> */}
//       </div>

//       {/* Content */}
//       <div className={styles.content}>
//         <span className={styles.category}>{product_unit}</span>

//         <h3 className={styles.name}>{product_name}</h3>

//         <p className={styles.description}>{description}</p>

//         {/* Rating */}
//         {/* <div className={styles.rating}>
//           <div className={styles.stars}>
//             {[1, 2, 3, 4, 5].map((star) => (
//               <svg
//                 key={star}
//                 viewBox="0 0 24 24"
//                 className={`${styles.star} ${star <= Math.floor(rating) ? styles.starFilled : star - 0.5 <= rating ? styles.starHalf : ''}`}
//               >
//                 <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
//               </svg>
//             ))}
//           </div>
//           <span className={styles.ratingText}>
//             {rating} <em>({reviewCount} reviews)</em>
//           </span>
//         </div> */}

//         {/* Price & CTA */}
//         <div className={styles.footer}>
//           <div className={styles.priceBlock}>
//             <span className={styles.price}>${price}</span>
//             {/* {originalPrice > price && (
//               <span className={styles.originalPrice}>${originalPrice}</span>
//             )} */}
//           </div>

//           <button
//             className={styles.addToCart}
//             onClick={(e) => {
//               e.stopPropagation();
//               console.log(isLogin)
//               // loginUser();

//               if (isLogin) {
//                 onAddToCart(); // ✅ add to cart
//               } else {
//                 // 👉 redirect to login
//                 navigate("/login");
//               }
//             }
//             }>
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <circle cx="9" cy="21" r="1" />
//               <circle cx="20" cy="21" r="1" />
//               <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
//             </svg>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div >
//   );
// };

// export default Card;