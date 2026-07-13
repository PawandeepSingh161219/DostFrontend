import React, { useMemo, useState, useEffect } from "react";
import styles from "./Checkout.module.scss";
import api from "../../api/api";
import useCartContext from "../../hooks/useCartContext";
import useAuth from "../../hooks/useAuthContext";



const Checkout = () => {
  const { cartItems = [], clearCart } = useCartContext();
  const { isAuthenticated, token } = useAuth()

  //   console.log(  "Cart Items:In Checkout JSX" , cartItems);

  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  // const [token, setToken] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState("RAZORPAY");

  const [address, setAddress] = useState({
    Order_address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone_number: "",
  });



  // const {isAuthenticated , token}=useAuth()
  // console.log( "y h authenticated token in checkout page", isAuthenticated)
  // console.log( "y h  token in checkout page", token)

  useEffect(() => {
    const storedToken = token;
    console.log("StoredToken ####",storedToken)

    const response= fetch("")


  }, []);

  console.log(token);

  const handleInputChange = (
    field,
    value
  ) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price =
        item.price ||
        item.product?.price ||
        0;

      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const shipping = subtotal > 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.18);

  const total =
    subtotal + shipping + gst - discount;

  const applyCoupon = async () => {
    if (!coupon.trim()) return;

    try {
      const { data } = await api.post(
        "/coupon/apply",
        {
          couponCode: coupon,
          subtotal,
        }
      );

      setDiscount(
        data.discountAmount || 0
      );
    } catch (error) {
      setDiscount(0);
      alert("Invalid coupon");
    }
  };

  const createOrder = async () => {
    const { data } = await api.post(
      "/orders/create",
      {
        items: cartItems,
        address,
        subtotal,
        shipping,
        gst,
        discount,
        total,
      }
    );

    return data;
  };

  const handleRazorpay = async () => {
    try {
      setLoading(true);

      const order = await createOrder();

      const options = {
        key: import.meta.env
          .VITE_RAZORPAY_KEY,

        amount: order.amount,
        currency: "INR",

        order_id:
          order.razorpayOrderId,

        name: "My Store",

        description:
          "Secure Checkout",

        prefill: {
          name: address.fullName,
          email: address.email,
          contact: address.phone,
        },

        handler: async (
          response
        ) => {
          await api.post(
            "/payment/verify",
            {
              ...response,
              orderId:
                order.orderId,
            }
          );

          clearCart();

          window.location.href =
            "/order-success";
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCOD = async () => {
    try {
      setLoading(true);

      await api.post("/orders/cod", {
        items: cartItems,
        address,
        total,
      });

      clearCart();

      window.location.href =
        "/order-success";
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(address,"kam ho gya")
  
  const payload = {
    Order_address:address.Order_address,
    city:address.city,
    state:address.state,
    zip_code:address.zip_code,
    country:address.country,
    Phone_number:address.phone_number
    }

  const handlePlaceOrder = async() => {
    try{
    // console.log("this is state in checkout page by name 'address",address)
      const response = await fetch(
  "http://localhost:8000/api/v1/order/createOrder",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  }
);
console.log("Status:", response.status); // 201

const result = await response.json();
if(result.success === true){
  
}

    // if (!address.fullName) {
    //   return alert(
    //     "Please enter full name"
    //   );
    // }

    // if (!address.phone) {
    //   return alert(
    //     "Please enter phone number"
    //   );
    // }

    // if (!address.addressLine1) {
    //   return alert(
    //     "Please enter address"
    //   );
    // }

    // if (!cartItems.length) {
    //   return alert(
    //     "Cart is empty"
    //   );
    // }

    // if (
    //   paymentMethod === "RAZORPAY"
    // ) {
    //   handleRazorpay();
    // } else {
    //   handleCOD();
    // }
    }catch (error) {
    console.log("Network error:", error);
  }
  };

  return (
    <div className={styles.checkout}>
      {/* LEFT SECTION */}

      <div className={styles.leftSection}>
        {/* ADDRESS */}

        <div className={styles.card}>
          <h2>Shipping Address</h2>

          <input
            type="text"
            placeholder="Order Address"
            value={address.Order_address}
            onChange={(e) =>
              handleInputChange(
                "Order_address",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) =>
              handleInputChange(
                "city",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) =>
              handleInputChange(
                "state",
                e.target.value
              )
            }
          />

          {/* <textarea
            placeholder="House No, Street, Area"
            value={
              address.addressLine1
            }
            onChange={(e) =>
              handleInputChange(
                "addressLine1",
                e.target.value
              )
            }
          /> */}

          <div className={styles.row}>
            <input
              type="text"
              placeholder="zip_code"
              value={address.zip_code}
              onChange={(e) =>
                handleInputChange(
                  "zip_code",
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Country"
              value={address.country}
              onChange={(e) =>
                handleInputChange(
                  "country",
                  e.target.value
                )
              }
            />
          </div>

          <input
            type="text"
            placeholder="Phone Number"
            value={address.phone_number}
            onChange={(e) =>
              handleInputChange(
                "phone_number",
                e.target.value
              )
            }
          />
        </div>

        {/* COUPON */}

        <div className={styles.card}>
          <h2>Coupon</h2>

          <div className={styles.couponBox}>
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) =>
                setCoupon(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              onClick={applyCoupon}
            >
              Apply
            </button>
          </div>
        </div>

        {/* PAYMENT */}

        <div className={styles.card}>
          <h2>Payment Method</h2>

          <div
            className={
              styles.paymentOptions
            }
          >
            <div
              className={`${styles.paymentCard} ${paymentMethod ===
                "RAZORPAY"
                ? styles.activePayment
                : ""
                }`}
              onClick={() =>
                setPaymentMethod(
                  "RAZORPAY"
                )
              }
            >
              <h4>
                Online Payment
              </h4>

              <p>
                UPI, Cards,
                NetBanking,
                Wallets
              </p>
            </div>

            <div
              className={`${styles.paymentCard} ${paymentMethod ===
                "COD"
                ? styles.activePayment
                : ""
                }`}
              onClick={() =>
                setPaymentMethod("COD")
              }
            >
              <h4>
                Cash On Delivery
              </h4>

              <p>
                Pay after delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}

      <div className={styles.rightSection}>
        <div className={styles.summaryCard}>
          <h2>Order Summary</h2>

          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const productName = item.product_name
              const productImage = item.product_image
              const price = item.price

              return (
                <div
                  key={item._id}
                  className={
                    styles.cartItem
                  }
                >
                  <img
                    src={productImage}
                    alt={productName}
                    className={
                      styles.productImage
                    }
                  />

                  <div
                    className={
                      styles.productInfo
                    }
                  >
                    <h4
                      className={
                        styles.productName
                      }
                    >
                      {productName}
                    </h4>

                    <div
                      className={
                        styles.productMeta
                      }
                    >
                      <span
                        className={
                          styles.quantityBadge
                        }
                      >
                        Qty{" "}
                        {item.quantity}
                      </span>

                      <span
                        className={
                          styles.productUnitPrice
                        }
                      >
                        ₹
                        {price.toLocaleString(
                          "en-IN"
                        )}
                        /item
                      </span>
                    </div>

                    <div
                      className={
                        styles.productPrice
                      }
                    >
                      ₹
                      {(
                        price *
                        item.quantity
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className={
                styles.emptyCart
              }
            >
              <h3>
                Your cart is empty
              </h3>

              <p>
                Add products to
                continue shopping
              </p>
            </div>
          )}

          <div className={styles.divider} />

          <div className={styles.priceRow}>
            <span>Subtotal</span>

            <span>
              ₹
              {subtotal.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>

          <div className={styles.priceRow}>
            <span>Shipping</span>

            <span>
              {shipping === 0
                ? "FREE"
                : `₹${shipping}`}
            </span>
          </div>

          <div className={styles.priceRow}>
            <span>GST (18%)</span>

            <span>
              ₹
              {gst.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>

          {discount > 0 && (
            <div
              className={
                styles.priceRow
              }
            >
              <span>Discount</span>

              <span>
                -₹
                {discount.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
          )}

          <div className={styles.total}>
            <span>Total</span>

            <span>
              ₹
              {total.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>

          <button
            className={styles.orderBtn}
            disabled={loading}
            onClick={
              handlePlaceOrder
            }
          >
            {loading
              ? "Processing..."
              : paymentMethod ===
                "RAZORPAY"
                ? `Pay ₹${total.toLocaleString(
                  "en-IN"
                )}`
                : "Place COD Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;