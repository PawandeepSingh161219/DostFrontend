const CART_KEY = "shopping_cart";

export const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error(error);
  }
};