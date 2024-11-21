import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import bgImage from "../assets/images/allbg.jpeg";
import hey from "../assets/images/hey.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);
  console.log(userDetails, "==userDetails==");

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.userData));
      notifySuccess("Login successful!");
       setTimeout(() => {
      navigate("/"); 
    }, 500);

    } catch (error) {
      setError("Login failed. Please check your credentials.");
      notifyError("Login failed!");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.userData));
      notifySuccess("Signup successful! Redirecting...");
       setTimeout(() => {
      navigate("/profile");
    }, 500);
    } catch (error) {
      setError("Signup failed. Please try again.");
      notifyError("Signup failed!");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "92vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      <div className="bg-opacity-80 bg-gray-900 text-white flex justify-center shadow-xl rounded-lg">
        <div className="m-0 sm:m-10 flex justify-center flex-1 w-[600px]">
          <div className="lg:w-1/2 xl:w-5/12 p-3 sm:p-6" style={{paddingLeft:'0px'}}>
            <div className="flex flex-col items-center">
              <h1 className="text-xl xl:text-2xl font-extrabold mb-5">
                {isLoginForm ? "Login" : "Sign Up"}
              </h1>
              <div className="w-full flex-1">
                <div className="mx-auto max-w-xs">
                  {!isLoginForm && (
                    <>
                      <input
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-800 border border-gray-600 text-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500 my-2"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-800 border border-gray-600 text-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500 my-2"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </>
                  )}
                  <input
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-800 border border-gray-600 text-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500 my-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                  <input
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-800 border border-gray-600 text-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500 my-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    className="mt-5 tracking-wide font-semibold bg-[#3a4b7a] text-white shadow-lg hover:bg-[#4c5d94] transition duration-300 w-full py-2.5 rounded-lg ease-in-out flex items-center justify-center focus:outline-none"
                    onClick={isLoginForm ? handleLogin : handleSignUp}
                  >
                    {isLoginForm ? "Login" : "Sign Up"}
                  </button>
                  <p className="mt-4 text-sm text-center">
                    {isLoginForm ? "New user?" : "Already have an account?"}{" "}
                    <span
                      className="underline cursor-pointer text-indigo-400"
                      onClick={() => setIsLoginForm((prev) => !prev)}
                    >
                      {isLoginForm ? "Sign up here" : "Login here"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex w-[400px]">
            <div
              className="w-full bg-contain bg-center bg-no-repeat rounded-r-lg"
              style={{
                backgroundImage: `url(${hey})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



// import axios from "axios";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constant";
// import bgImage from "../assets/images/allbg.jpeg";
// import hey from "../assets/images/hey.jpg";
// import { ToastContainer, toast } from "react-toastify";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import "react-toastify/dist/ReactToastify.css";

// function Login() {
//   const [isLoginForm, setIsLoginForm] = React.useState(true);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userDetails = useSelector((state) => state.user);

//   const notifySuccess = (message) => toast.success(message);
//   const notifyError = (message) => toast.error(message);

//   // Validation schema for Login and SignUp
//   const loginValidationSchema = Yup.object({
//     email: Yup.string().email("Invalid email format").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const signupValidationSchema = Yup.object({
//     firstName: Yup.string().required("First name is required"),
//     lastName: Yup.string().required("Last name is required"),
//     email: Yup.string().email("Invalid email format").required("Email is required"),
//     password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   });

//   const handleLogin = async (values) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         values,
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data.userData));
//       notifySuccess("Login successful!");
//       setTimeout(() => {
//         navigate("/");
//       }, 500);
//     } catch (error) {
//       notifyError("Login failed. Please check your credentials.");
//     }
//   };

//   const handleSignUp = async (values) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/signup",
//         values,
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data.userData));
//       notifySuccess("Signup successful! Redirecting...");
//       setTimeout(() => {
//         navigate("/profile");
//       }, 500);
//     } catch (error) {
//       notifyError("Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         height: "92vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <ToastContainer />
//       <div className="bg-opacity-80 bg-gray-900 text-white flex justify-center shadow-xl rounded-lg">
//         <div className="m-0 sm:m-10 flex justify-center flex-1 w-[600px]">
//           <div
//             className="lg:w-1/2 xl:w-5/12 p-3 sm:p-6"
//             style={{ paddingLeft: "0px" }}
//           >
//             <h1 className="text-xl xl:text-2xl font-extrabold mb-5">
//               {isLoginForm ? "Login" : "Sign Up"}
//             </h1>
//             <Formik
//               initialValues={{
//                 firstName: "",
//                 lastName: "",
//                 email: "",
//                 password: "",
//               }}
//               validationSchema={
//                 isLoginForm ? loginValidationSchema : signupValidationSchema
//               }
//               onSubmit={(values) => {
//                 if (isLoginForm) {
//                   handleLogin(values);
//                 } else {
//                   handleSignUp(values);
//                 }
//               }}
//             >
//               {({ isSubmitting }) => (
//                 <Form>
//                   {!isLoginForm && (
//                     <>
//                       <div className="mb-4">
//                         <Field
//                           name="firstName"
//                           placeholder="First Name"
//                           className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500"
//                         />
//                         <ErrorMessage
//                           name="firstName"
//                           component="div"
//                           className="text-red-500 text-sm mt-1"
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <Field
//                           name="lastName"
//                           placeholder="Last Name"
//                           className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500"
//                         />
//                         <ErrorMessage
//                           name="lastName"
//                           component="div"
//                           className="text-red-500 text-sm mt-1"
//                         />
//                       </div>
//                     </>
//                   )}
//                   <div className="mb-4">
//                     <Field
//                       name="email"
//                       type="email"
//                       placeholder="Email"
//                       className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500"
//                     />
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <Field
//                       name="password"
//                       type="password"
//                       placeholder="Password"
//                       className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-500"
//                     />
//                     <ErrorMessage
//                       name="password"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="mt-5 tracking-wide font-semibold bg-[#3a4b7a] text-white shadow-lg hover:bg-[#4c5d94] transition duration-300 w-full py-2.5 rounded-lg ease-in-out flex items-center justify-center focus:outline-none"
//                   >
//                     {isLoginForm ? "Login" : "Sign Up"}
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//             <p className="mt-4 text-sm text-center">
//               {isLoginForm ? "New user?" : "Already have an account?"}{" "}
//               <span
//                 className="underline cursor-pointer text-indigo-400"
//                 onClick={() => setIsLoginForm((prev) => !prev)}
//               >
//                 {isLoginForm ? "Sign up here" : "Login here"}
//               </span>
//             </p>
//           </div>
//           <div className="hidden lg:flex w-[400px]">
//             <div
//               className="w-full bg-contain bg-center bg-no-repeat rounded-r-lg"
//               style={{
//                 backgroundImage: `url(${hey})`,
//                 backgroundSize: "cover",
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
