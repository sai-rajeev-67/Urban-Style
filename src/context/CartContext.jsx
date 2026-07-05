import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const updateStorage = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const addToCart = (product) => {
    const existing = cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize === product.selectedSize
    );

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id &&
        item.selectedSize === product.selectedSize
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    updateStorage(updatedCart);
  };

  const increaseQuantity = (id, size) => {
    const updatedCart = cart.map((item) =>
      item.id === id &&
      item.selectedSize === size
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    updateStorage(updatedCart);
  };

  const decreaseQuantity = (id, size) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id &&
        item.selectedSize === size
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateStorage(updatedCart);
  };

  const removeFromCart = (id, size) => {
    const updatedCart = cart.filter(
      (item) =>
        !(
          item.id === id &&
          item.selectedSize === size
        )
    );

    updateStorage(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;