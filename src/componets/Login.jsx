import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import bgImage from "../assets/images/bg.jpg";
import hey from "../assets/images/hey.jpg";

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

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res.data.userData));
      navigate("/");
    } catch (error) {
      setError(error.message);

      console.log(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      console.log(res, "==signupres==");
      dispatch(addUser(res.data.userData));
      return navigate("/profile");
    } catch (error) {
      setError(error.message);
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
      <div className="bg-gray-100 text-gray-900 flex justify-center">
        <div className="m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 w-[600px]">
          <div className="lg:w-1/2 xl:w-5/12 p-3 sm:p-6">
            <div className="flex flex-col items-center">
              <h1 className="text-xl xl:text-2xl font-extrabold">
                {isLoginForm ? "Login" : "Sign Up"}
              </h1>
              <div className="w-full flex-1 mt-4">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      {/* SVG for Google Icon */}
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">
                      {isLoginForm
                        ? "Login with Google"
                        : "Sign Up with Google"}
                    </span>
                  </button>
                </div>

                <div className="my-4 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or {isLoginForm ? "login" : "sign up"} with email
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  {!isLoginForm && (
                    <>
                      <input
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </>
                  )}
                  <input
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                  <input
                    className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={isLoginForm ? handleLogin : handleSignUp}
                  >
                    {isLoginForm ? "Login" : "Sign Up"}
                  </button>
                  <p className="mt-4 text-xs text-gray-600 text-center">
                    I agree to abide by templatana's
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>{" "}
                  <p className="mt-4 text-xs text-gray-600 text-center">
                    {isLoginForm ? "New user?" : "Already have an account?"}{" "}
                    <span
                      className="border-b border-gray-500 border-dotted cursor-pointer"
                      onClick={() => setIsLoginForm((prev) => !prev)}
                    >
                      {isLoginForm ? "Sign up here" : "Login here"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex w-[600px]">
            <div
              className="w-full bg-contain bg-center bg-no-repeat"
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
