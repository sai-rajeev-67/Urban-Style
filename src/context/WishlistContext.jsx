import { createContext, useState } from "react";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(
    JSON.parse(
      localStorage.getItem("wishlist")
    ) || []
  );

  const updateWishlist = (
    updatedWishlist
  ) => {
    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const addToWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      alert(
        "Already added to wishlist"
      );
      return;
    }

    updateWishlist([
      ...wishlist,
      product,
    ]);
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist =
      wishlist.filter(
        (item) => item.id !== id
      );

    updateWishlist(updatedWishlist);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;