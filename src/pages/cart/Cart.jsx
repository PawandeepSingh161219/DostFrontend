import styles from "./Cart.module.scss";
import { FiTrash2 } from "react-icons/fi";
import useCartContext from "../../hooks/useCartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems ,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCartContext();
  
  const navigate = useNavigate();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>Shopping Cart</h1>

      <div className={styles.container}>
        <div className={styles.itemsSection}>
          {cartItems.length === 0 ? (
            <p className={styles.empty}>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.cartItemId} className={styles.cartItem}>
                <img src={item.product_image} alt={item.product_name} />
                <div className={styles.info}>
                  <h3>{item.product_name}</h3>
                  <p>${item.price}</p>
                </div>

                <div className={styles.quantity}>
                  <button onClick={() => {decreaseQuantity(
                    // item.id ,
                     item)
                    // console.log(`onclick - decreaseQuantity called for item id: ${item}  item: ${JSON.stringify(item)}`)
                  }}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item)}>
                    +
                  </button>
                </div>

                <div className={styles.subtotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className={styles.remove}
                  onClick={() => removeFromCart(item.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.summary}>
            <h2>Order Summary</h2>

            <div className={styles.row}>
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className={styles.row}>
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className={styles.checkoutBtn} 
             onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
















































































































































































































































































// import styles from "./Cart.module.scss";
// import { FiTrash2 } from "react-icons/fi";

// export default function Cart({ cartItems = [], setCartItems }) {
//   const increaseQty = (id) => {
//     const updated = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCartItems(updated);
//   };

//   const decreaseQty = (id) => {
//     const updated = cartItems.map((item) =>
//       item.id === id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );
//     setCartItems(updated);
//   };

//   const removeItem = (id) => {
//     const updated = cartItems.filter((item) => item.id !== id);
//     setCartItems(updated);
//   };

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className={styles.cartPage}>
//       <h1 className={styles.title}>Shopping Cart</h1>

//       <div className={styles.container}>
//         <div className={styles.itemsSection}>
//           {cartItems.length === 0 ? (
//             <p className={styles.empty}>Your cart is empty.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item.id} className={styles.cartItem}>
//                 <img src={item.image} alt={item.name} />

//                 <div className={styles.info}>
//                   <h3>{item.name}</h3>
//                   <p>${item.price}</p>
//                 </div>

//                 <div className={styles.quantity}>
//                   <button onClick={() => decreaseQty(item.id)}>-</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => increaseQty(item.id)}>+</button>
//                 </div>

//                 <div className={styles.subtotal}>
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </div>

//                 <button
//                   className={styles.remove}
//                   onClick={() => removeItem(item.id)}
//                 >
//                   <FiTrash2 />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {cartItems.length > 0 && (
//           <div className={styles.summary}>
//             <h2>Order Summary</h2>
//             <div className={styles.row}>
//               <span>Items</span>
//               <span>{cartItems.length}</span>
//             </div>

//             <div className={styles.row}>
//               <span>Total</span>
//               <span>${totalPrice.toFixed(2)}</span>
//             </div>

//             <button className={styles.checkoutBtn}>
//               Proceed to Checkout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

























































































































































































































































// // import { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { FiArrowLeft, FiTrash2, FiMinus, FiPlus, FiShoppingCart, FiTruck, FiCreditCard, FiCheck } from "react-icons/fi";
// // import styles from "./Cart.module.scss";
 
// // // ── Mock data – replace with your real cartItems state/context ──
// // const MOCK_ITEMS = [
// //   { id: 1, name: "Wireless Headphones", variant: "Midnight Black", price: 129.99, qty: 1, image: "https://placehold.co/100x100/1a1a2e/ffffff?text=🎧" },
// //   { id: 2, name: "Mechanical Keyboard", variant: "TKL / RGB",       price: 89.95,  qty: 2, image: "https://placehold.co/100x100/1a1a2e/ffffff?text=⌨️" },
// //   { id: 3, name: "USB-C Hub 7-in-1",   variant: "Space Grey",       price: 49.00,  qty: 1, image: "https://placehold.co/100x100/1a1a2e/ffffff?text=🔌" },
// // ];
 
// // const STEPS = ["Cart", "Shipping", "Payment", "Confirmation"];
 
// // export default function CartPage() {
// //   const [items, setItems]     = useState(MOCK_ITEMS);
// //   const [step, setStep]       = useState(0);
// //   const [shipping, setShipping] = useState({
// //     firstName: "", lastName: "", email: "",
// //     address: "", city: "", state: "", zip: "", country: "US",
// //   });
// //   const [payment, setPayment] = useState({
// //     cardName: "", cardNumber: "", expiry: "", cvv: "",
// //   });
// //   const [shippingMethod, setShippingMethod] = useState("standard");
 
// //   // ── Cart helpers ──
// //   const updateQty = (id, delta) =>
// //     setItems(prev =>
// //       prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
// //     );
// //   const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
 
// //   const subtotal   = items.reduce((s, i) => s + i.price * i.qty, 0);
// //   const shippingCost = shippingMethod === "express" ? 12.99 : shippingMethod === "overnight" ? 24.99 : 0;
// //   const tax        = subtotal * 0.08;
// //   const total      = subtotal + shippingCost + tax;
 
// //   // ── Shipping form handler ──
// //   const handleShippingChange = e =>
// //     setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }));
 
// //   const handlePaymentChange = e => {
// //     let { name, value } = e.target;
// //     if (name === "cardNumber") value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
// //     if (name === "expiry")     value = value.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");
// //     if (name === "cvv")        value = value.replace(/\D/g, "").slice(0, 4);
// //     setPayment(prev => ({ ...prev, [name]: value }));
// //   };
 
// //   const canProceedShipping = Object.values(shipping).every(v => v.trim() !== "");
// //   const canProceedPayment  = Object.values(payment).every(v => v.trim() !== "");
 
// //   // ── Render helpers ──
// //   const StepIndicator = () => (
// //     <div className={styles.stepper}>
// //       {STEPS.map((s, i) => (
// //         <div key={s} className={`${styles.stepItem} ${i <= step ? styles.active : ""} ${i < step ? styles.done : ""}`}>
// //           <div className={styles.stepCircle}>
// //             {i < step ? <FiCheck /> : <span>{i + 1}</span>}
// //           </div>
// //           <span className={styles.stepLabel}>{s}</span>
// //           {i < STEPS.length - 1 && <div className={styles.stepLine} />}
// //         </div>
// //       ))}
// //     </div>
// //   );
 
// //   // ──────────────────────────────────────────────────────────────
// //   //  STEP 0 – Cart
// //   // ──────────────────────────────────────────────────────────────
// //   const CartStep = () => (
// //     <div className={styles.stepContent}>
// //       {items.length === 0 ? (
// //         <div className={styles.empty}>
// //           <FiShoppingCart size={56} />
// //           <h2>Your cart is empty</h2>
// //           <p>Looks like you haven't added anything yet.</p>
// //           <Link to="/" className={styles.btn}>Continue Shopping</Link>
// //         </div>
// //       ) : (
// //         <div className={styles.cartGrid}>
// //           {/* Items */}
// //           <div className={styles.itemsList}>
// //             <h2 className={styles.sectionTitle}>Your Items <span>({items.length})</span></h2>
// //             {items.map(item => (
// //               <div key={item.id} className={styles.cartItem}>
// //                 <img src={item.image} alt={item.name} className={styles.itemImg} />
// //                 <div className={styles.itemInfo}>
// //                   <h3>{item.name}</h3>
// //                   <p className={styles.variant}>{item.variant}</p>
// //                   <div className={styles.itemBottom}>
// //                     <div className={styles.qtyControl}>
// //                       <button onClick={() => updateQty(item.id, -1)}><FiMinus /></button>
// //                       <span>{item.qty}</span>
// //                       <button onClick={() => updateQty(item.id, +1)}><FiPlus /></button>
// //                     </div>
// //                     <span className={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</span>
// //                   </div>
// //                 </div>
// //                 <button className={styles.removeBtn} onClick={() => removeItem(item.id)}><FiTrash2 /></button>
// //               </div>
// //             ))}
// //           </div>
 
// //           {/* Summary */}
// //           <OrderSummary>
// //             <button className={styles.btnPrimary} onClick={() => setStep(1)}>
// //               Proceed to Shipping →
// //             </button>
// //           </OrderSummary>
// //         </div>
// //       )}
// //     </div>
// //   );
 
// //   // ──────────────────────────────────────────────────────────────
// //   //  STEP 1 – Shipping
// //   // ──────────────────────────────────────────────────────────────
// //   const ShippingStep = () => (
// //     <div className={styles.stepContent}>
// //       <div className={styles.cartGrid}>
// //         <div className={styles.formBlock}>
// //           <h2 className={styles.sectionTitle}>Shipping Details</h2>
 
// //           <div className={styles.formRow}>
// //             <div className={styles.field}>
// //               <label>First Name</label>
// //               <input name="firstName" value={shipping.firstName} onChange={handleShippingChange} placeholder="Jane" />
// //             </div>
// //             <div className={styles.field}>
// //               <label>Last Name</label>
// //               <input name="lastName" value={shipping.lastName} onChange={handleShippingChange} placeholder="Doe" />
// //             </div>
// //           </div>
 
// //           <div className={styles.field}>
// //             <label>Email</label>
// //             <input name="email" type="email" value={shipping.email} onChange={handleShippingChange} placeholder="jane@example.com" />
// //           </div>
 
// //           <div className={styles.field}>
// //             <label>Address</label>
// //             <input name="address" value={shipping.address} onChange={handleShippingChange} placeholder="123 Main Street" />
// //           </div>
 
// //           <div className={styles.formRow}>
// //             <div className={styles.field}>
// //               <label>City</label>
// //               <input name="city" value={shipping.city} onChange={handleShippingChange} placeholder="New York" />
// //             </div>
// //             <div className={styles.field}>
// //               <label>State</label>
// //               <input name="state" value={shipping.state} onChange={handleShippingChange} placeholder="NY" />
// //             </div>
// //             <div className={styles.field} style={{ flex: "0 0 120px" }}>
// //               <label>ZIP</label>
// //               <input name="zip" value={shipping.zip} onChange={handleShippingChange} placeholder="10001" />
// //             </div>
// //           </div>
 
// //           {/* Shipping Methods */}
// //           <h3 className={styles.subTitle}><FiTruck /> Shipping Method</h3>
// //           <div className={styles.shippingMethods}>
// //             {[
// //               { id: "standard",  label: "Standard",  sub: "5–7 business days", price: "Free" },
// //               { id: "express",   label: "Express",   sub: "2–3 business days", price: "$12.99" },
// //               { id: "overnight", label: "Overnight", sub: "Next business day",  price: "$24.99" },
// //             ].map(m => (
// //               <label key={m.id} className={`${styles.methodCard} ${shippingMethod === m.id ? styles.selected : ""}`}>
// //                 <input type="radio" name="shippingMethod" value={m.id} checked={shippingMethod === m.id} onChange={() => setShippingMethod(m.id)} />
// //                 <div className={styles.methodInfo}>
// //                   <strong>{m.label}</strong>
// //                   <span>{m.sub}</span>
// //                 </div>
// //                 <span className={styles.methodPrice}>{m.price}</span>
// //               </label>
// //             ))}
// //           </div>
// //         </div>
 
// //         <OrderSummary>
// //           <button className={styles.btnSecondary} onClick={() => setStep(0)}>← Back</button>
// //           <button className={styles.btnPrimary} disabled={!canProceedShipping} onClick={() => setStep(2)}>
// //             Continue to Payment →
// //           </button>
// //         </OrderSummary>
// //       </div>
// //     </div>
// //   );
 
// //   // ──────────────────────────────────────────────────────────────
// //   //  STEP 2 – Payment
// //   // ──────────────────────────────────────────────────────────────
// //   const PaymentStep = () => (
// //     <div className={styles.stepContent}>
// //       <div className={styles.cartGrid}>
// //         <div className={styles.formBlock}>
// //           <h2 className={styles.sectionTitle}><FiCreditCard /> Payment</h2>
 
// //           <div className={styles.field}>
// //             <label>Name on Card</label>
// //             <input name="cardName" value={payment.cardName} onChange={handlePaymentChange} placeholder="Jane Doe" />
// //           </div>
 
// //           <div className={styles.field}>
// //             <label>Card Number</label>
// //             <input name="cardNumber" value={payment.cardNumber} onChange={handlePaymentChange} placeholder="1234 5678 9012 3456" maxLength={19} />
// //           </div>
 
// //           <div className={styles.formRow}>
// //             <div className={styles.field}>
// //               <label>Expiry</label>
// //               <input name="expiry" value={payment.expiry} onChange={handlePaymentChange} placeholder="MM/YY" maxLength={5} />
// //             </div>
// //             <div className={styles.field}>
// //               <label>CVV</label>
// //               <input name="cvv" value={payment.cvv} onChange={handlePaymentChange} placeholder="123" maxLength={4} type="password" />
// //             </div>
// //           </div>
 
// //           <div className={styles.secureNote}>
// //             🔒 Your payment info is encrypted and never stored.
// //           </div>
// //         </div>
 
// //         <OrderSummary>
// //           <button className={styles.btnSecondary} onClick={() => setStep(1)}>← Back</button>
// //           <button className={styles.btnPrimary} disabled={!canProceedPayment} onClick={() => setStep(3)}>
// //             Place Order · ${total.toFixed(2)}
// //           </button>
// //         </OrderSummary>
// //       </div>
// //     </div>
// //   );
 
// //   // ──────────────────────────────────────────────────────────────
// //   //  STEP 3 – Confirmation
// //   // ──────────────────────────────────────────────────────────────
// //   const ConfirmationStep = () => (
// //     <div className={styles.confirmation}>
// //       <div className={styles.confIcon}><FiCheck /></div>
// //       <h2>Order Confirmed!</h2>
// //       <p>Thank you, <strong>{shipping.firstName}</strong>! We've sent a confirmation to <strong>{shipping.email}</strong>.</p>
// //       <div className={styles.confDetails}>
// //         <div><span>Order #</span><strong>#ORD-{Math.floor(Math.random() * 90000) + 10000}</strong></div>
// //         <div><span>Total</span><strong>${total.toFixed(2)}</strong></div>
// //         <div><span>Delivery</span><strong>{shippingMethod === "standard" ? "5–7 days" : shippingMethod === "express" ? "2–3 days" : "Tomorrow"}</strong></div>
// //       </div>
// //       <Link to="/" className={styles.btnPrimary}>Continue Shopping</Link>
// //     </div>
// //   );
 
// //   // ──────────────────────────────────────────────────────────────
// //   //  Shared Order Summary sidebar
// //   // ──────────────────────────────────────────────────────────────
// //   const OrderSummary = ({ children }) => (
// //     <aside className={styles.summary}>
// //       <h2 className={styles.sectionTitle}>Order Summary</h2>
// //       <div className={styles.summaryLines}>
// //         {items.map(i => (
// //           <div key={i.id} className={styles.summaryItem}>
// //             <span>{i.name} × {i.qty}</span>
// //             <span>${(i.price * i.qty).toFixed(2)}</span>
// //           </div>
// //         ))}
// //       </div>
// //       <div className={styles.divider} />
// //       <div className={styles.summaryRow}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
// //       <div className={styles.summaryRow}><span>Shipping</span><span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span></div>
// //       <div className={styles.summaryRow}><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
// //       <div className={styles.divider} />
// //       <div className={`${styles.summaryRow} ${styles.totalRow}`}><span>Total</span><span>${total.toFixed(2)}</span></div>
// //       <div className={styles.summaryActions}>{children}</div>
// //     </aside>
// //   );
 
// //   // ──────────────────────────────────────────────────────────────
// //   //  Root render
// //   // ──────────────────────────────────────────────────────────────
// //   return (
// //     <div className={styles.cartPage}>
// //       <div className={styles.container}>
 
// //         {/* Back link */}
// //         {step < 3 && (
// //           <Link to="/" className={styles.backLink}>
// //             <FiArrowLeft /> Back to Shop
// //           </Link>
// //         )}
 
// //         <StepIndicator />
 
// //         {step === 0 && <CartStep />}
// //         {step === 1 && <ShippingStep />}
// //         {step === 2 && <PaymentStep />}
// //         {step === 3 && <ConfirmationStep />}
// //       </div>
// //     </div>
// //   );
// // }
 