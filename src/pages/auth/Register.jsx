import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../services/api";
import { toast } from "react-toastify";
import { sendOTPEmail } from "../../services/email";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [generatedOTP, setGeneratedOTP] =
    useState("");

  const [enteredOTP, setEnteredOTP] =
    useState("");

  const [otpVerified, setOtpVerified] =
    useState(false);

  const [timer, setTimer] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [sendingOTP, setSendingOTP] =
    useState(false);

  useEffect(() => {

    if (timer <= 0)
      return;

    const interval =
      setInterval(() => {

        setTimer((prev) => prev - 1);

      }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const generateOTP = () => {

    return Math.floor(
      100000 + Math.random() * 900000
    ).toString();

  };

  const handleSendOTP = async () => {

    if (
      !formData.name ||
      !formData.email
    ) {

      toast.warning(
        "Enter Name and Email First"
      );

      return;

    }

    try {

      setSendingOTP(true);

      const response =
        await API.get("/users");

      const exists =
        response.data.find(
          (user) =>
            user.email ===
            formData.email
        );

      if (exists) {

        toast.error(
          "Email already registered"
        );

        setSendingOTP(false);

        return;

      }

      const otp =
        generateOTP();

      setGeneratedOTP(
        otp
      );

      await sendOTPEmail(
        formData.name,
        formData.email,
        otp
      );

      setTimer(60);

      toast.success(
        "OTP Sent Successfully"
      );

    } catch (error) {

  console.log("Status:", error.status);
  console.log("Text:", error.text);
  console.log(error);


      toast.error(
        "Failed to Send OTP"
      );

    } finally {

      setSendingOTP(false);

    }

  };

  const verifyOTP = () => {

    if (!enteredOTP) {

      toast.warning(
        "Enter OTP"
      );

      return;

    }

    if (
      enteredOTP ===
      generatedOTP
    ) {

      setOtpVerified(true);

      toast.success(
        "OTP Verified Successfully"
      );

    } else {

      toast.error(
        "Invalid OTP"
      );

    }

  };

  const handleSubmit = async () => {

    if (!otpVerified) {

      toast.warning(
        "Please Verify OTP"
      );

      return;

    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {

      toast.warning(
        "Fill All Fields"
      );

      return;

    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!?])[A-Za-z\d@#$%^&*!?]{8,}$/;

    if (
      !passwordRegex.test(
        formData.password
      )
    ) {

      toast.warning(
        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
      );

      return;

    }

    try {

      setLoading(true);

      await API.post(
        "/users",
        formData
      );

      toast.success(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };



    return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card p-4 shadow">

          <h2 className="mb-4">
            Register
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control mb-3"
            value={formData.name}
            onChange={handleChange}
          />

          <div className="row">

            <div className="col-md-8">

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                disabled={
                  timer > 0 ||
                  otpVerified
                }
              />

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-primary w-100"
                onClick={handleSendOTP}
                disabled={
                  sendingOTP ||
                  timer > 0 ||
                  otpVerified
                }
              >

                {sendingOTP
                  ? "Sending..."
                  : "Send OTP"}

              </button>

            </div>

          </div>

          {timer > 0 && !otpVerified && (

            <small className="text-success d-block mt-2">

              OTP Sent Successfully.

              <br />

              Resend OTP in {timer}s

            </small>

          )}

          {timer === 0 &&
            generatedOTP &&
            !otpVerified && (

            <button
              className="btn btn-link mt-2 p-0"
              onClick={handleSendOTP}
            >

              Resend OTP

            </button>

          )}

          <hr />

          <div className="row">

            <div className="col-md-8">

              <input
                type="text"
                placeholder="Enter OTP"
                className="form-control"
                value={enteredOTP}
                onChange={(e) =>
                  setEnteredOTP(
                    e.target.value
                  )
                }
                disabled={
                  otpVerified
                }
              />

            </div>

            <div className="col-md-4">

              <button
                className={`btn w-100 ${
                  otpVerified
                    ? "btn-success"
                    : "btn-warning"
                }`}
                onClick={verifyOTP}
                disabled={
                  otpVerified
                }
              >

                {otpVerified
                  ? "Verified ✓"
                  : "Verify OTP"}

              </button>

            </div>

          </div>

          <hr />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-2"
            value={formData.password}
            onChange={handleChange}
          />

          <small className="text-muted d-block mb-4">

            Password must contain
            at least
            <br />

            • 8 Characters

            <br />

            • One Uppercase Letter

            <br />

            • One Lowercase Letter

            <br />

            • One Number

            <br />

            • One Special Character

          </small>

          <button
            className="btn btn-dark w-100"
            onClick={handleSubmit}
            disabled={
              !otpVerified ||
              loading
            }
          >

            {loading
              ? "Creating Account..."
              : "Register"}

          </button>

          {!otpVerified && (

            <small className="text-danger mt-3 d-block">

              Verify OTP before
              creating your account.

            </small>

          )}

          <p className="mt-4 text-center">

            Already have an account?

            <Link
              to="/login"
              className="ms-2"
            >

              Login

            </Link>

          </p>

        </div>

      </div>

      <Footer />

    </>
  );

};

export default Register;

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import API from "../../services/api";
// import { toast } from "react-toastify";

// const Register = () => {

//   const navigate =
//     useNavigate();

//   const [formData, setFormData] =
//     useState({
//       name: "",
//       email: "",
//       password: "",
//       role: "user",
//     });

//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value,
//     });

//   };

//   const handleSubmit = async () => {

//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.password
//     ) {

//       toast.warning(
//         "Fill all fields"
//       );

//       return;
//     }

//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!?])[A-Za-z\d@#$%^&*!?]{8,}$/;

//     if (
//       !passwordRegex.test(
//         formData.password
//       )
//     ) {

//       toast.warning(
//         "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
//       );

//       return;
//     }

//     try {

//       const response =
//         await API.get(
//           "/users"
//         );

//       const users =
//         response.data;

//       const exists =
//         users.find(
//           (user) =>
//             user.email ===
//             formData.email
//         );

//       if (exists) {

//         toast.error(
//           "Email already registered"
//         );

//         return;

//       }

//       await API.post(
//         "/users",
//         formData
//       );

//       toast.success(
//         "Registration Successful"
//       );

//       navigate(
//         "/login"
//       );

//     } catch (error) {

//       console.log(error);

//       toast.error(
//         "Registration Failed"
//       );

//     }

//   };

//   return (
//     <>
//       <Navbar />

//       <div className="container mt-5">

//         <div className="card p-4 shadow">

//           <h2>
//             Register
//           </h2>

//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             className="form-control mb-3"
//             onChange={
//               handleChange
//             }
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="form-control mb-3"
//             onChange={
//               handleChange
//             }
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="form-control mb-2"
//             onChange={
//               handleChange
//             }
//           />

//           <small className="text-muted d-block mb-3">
//             Password must contain
//             at least 8 characters,
//             1 uppercase letter,
//             1 lowercase letter,
//             1 number and
//             1 special character.
//           </small>

//           <button
//             className="btn btn-dark"
//             onClick={
//               handleSubmit
//             }
//           >
//             Register
//           </button>

//           <p className="mt-3">

//             Already have an account?

//             <Link
//               to="/login"
//               className="ms-2"
//             >
//               Login
//             </Link>

//           </p>

//         </div>

//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Register;