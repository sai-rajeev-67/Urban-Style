import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../services/api";
import { toast } from "react-toastify";

const RazorpayPayment = () => {

  const payNow = async () => {

    const pendingOrder =
      JSON.parse(
        sessionStorage.getItem(
          "pendingOrder"
        )
      );

    if (!pendingOrder) {

      alert(
        "No order found"
      );

      return;

    }

    const options = {

      key:
        "rzp_test_T9S75PiceIMx0V",

      amount:
        pendingOrder.total * 100,

      currency: "INR",

      name: "UrbanStyle",

      description:
        "Fashion Purchase",

      handler: async function (
        response
      ) {

        try {

          await API.post(
            "/orders",
            pendingOrder
          );

          await API.post(
            "/payments",
            {
              id:
                response.razorpay_payment_id,

              orderId:
                pendingOrder.id,

              amount:
                pendingOrder.total,

              method:
                "Razorpay",

              status:
                "Success",

              date:
                new Date().toLocaleDateString(),
            }
          );

          sessionStorage.removeItem(
            "pendingOrder"
          );

          localStorage.removeItem(
            "cart"
          );

          toast.success(
  "Payment Successful"
);

          window.location.href =
            "/order-success";

        } catch (error) {

          console.log(
            error
          );

          alert(
            "Failed To Save Order"
          );

        }

      },

      prefill: {

        name:
          pendingOrder.customer
            ?.name || "",

        contact:
          pendingOrder.customer
            ?.phone || "",

      },

      theme: {
        color: "#212529",
      },

    };

    const razor =
      new window.Razorpay(
        options
      );

    razor.open();

  };

  const pendingOrder =
    JSON.parse(
      sessionStorage.getItem(
        "pendingOrder"
      )
    );

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card p-4 shadow">

          <h2>
            Razorpay Payment
          </h2>

          <hr />

          <h5>
            Amount:
            ₹
            {pendingOrder
              ? pendingOrder.total
              : 0}
          </h5>

          <button
            className="btn btn-dark mt-3"
            onClick={payNow}
          >
            Pay Now
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default RazorpayPayment;