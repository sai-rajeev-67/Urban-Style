import { useContext, useState } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Wishlist = () => {
  const {
    wishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const { addToCart } =
    useContext(CartContext);

  const [selectedSizes, setSelectedSizes] =
    useState({});

  const handleAddToCart = (item) => {
    const size =
      selectedSizes[item.id];

    if (!size) {
      alert("Please select a size");
      return;
    }

    addToCart({
      ...item,
      selectedSize: size,
    });

    alert("Added To Cart");
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4">
          My Wishlist ❤️
        </h2>

        {wishlist.length === 0 ? (
          <h4>
            Wishlist is Empty
          </h4>
        ) : (
          <div className="row">

            {wishlist.map((item) => (
              <div
                key={item.id}
                className="col-md-4 mb-4"
              >
                <div className="card h-100 shadow">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                  />

                  <div className="card-body">

                    <h5>
                      {item.name}
                    </h5>

                    <p>
                      ₹{item.price}
                    </p>

                    <p>
                      <strong>
                        Size:
                      </strong>
                    </p>

                    <div className="d-flex gap-2 mb-3">

                      {[
                        "S",
                        "M",
                        "L",
                        "XL",
                      ].map(
                        (size) => (
                          <button
                            key={size}
                            className={`btn btn-sm ${
                              selectedSizes[
                                item.id
                              ] === size
                                ? "btn-dark"
                                : "btn-outline-dark"
                            }`}
                            onClick={() =>
                              setSelectedSizes(
                                {
                                  ...selectedSizes,
                                  [item.id]:
                                    size,
                                }
                              )
                            }
                          >
                            {size}
                          </button>
                        )
                      )}

                    </div>

                    <div className="d-grid gap-2">

                      <button
                        className="btn btn-dark"
                        onClick={() =>
                          handleAddToCart(
                            item
                          )
                        }
                      >
                        Add To Cart
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          removeFromWishlist(
                            item.id
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
};

export default Wishlist;