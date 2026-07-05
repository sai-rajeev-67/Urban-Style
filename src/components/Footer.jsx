import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row">

          <div className="col-md-4 mb-4">

            <h3 className="footer-title">
              UrbanStyle
            </h3>

            <p>
              Discover trendy fashion,
              premium collections and
              modern lifestyle products.
            </p>

          </div>

          <div className="col-md-4 mb-4">

            <h5>
              Quick Links
            </h5>

            <div className="footer-links">

              <Link to="/">
                Home
              </Link>

              <Link to="/products">
                Products
              </Link>

              <Link to="/wishlist">
                Wishlist
              </Link>

              <Link to="/orders">
                Orders
              </Link>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <h5>
              Contact
            </h5>

            <p>
              📧 support@urbanstyle.com
            </p>

            <p>
              📞 +91 9876543210
            </p>

            <p>
              📍 Hyderabad, India
            </p>

          </div>

        </div>

        <div className="footer-bottom">

          © 2026 UrbanStyle.
          All Rights Reserved.

        </div>

      </div>

    </footer>
  );
};

export default Footer;