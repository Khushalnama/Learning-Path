import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Hardcoded valid credentials for demonstration
  const validEmail = "student@example.com";
  const validPassword = "password123";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // Validate email and password
    if (email === validEmail && password === validPassword) {
      // Navigate to Student page on successful login
      navigate("/Student");
    } else {
      setMessage("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // You can get user info from result.user
      navigate("/Student");
    } catch (error) {
      setMessage("Google sign-in failed. Please try again.");
      console.error("Google sign-in error:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterStudent = () => {
    navigate("/Signup?userType=student");
  };

  const handleRegisterInstructor = () => {
    navigate("/Signup?userType=instructor");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full mb-4 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-md hover:from-cyan-600 hover:to-blue-600 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M24 9.5c3.54 0 6.72 1.22 9.2 3.22l6.87-6.87C34.3 2.7 29.5 1 24 1 14.8 1 6.9 6.9 3.5 15.7l7.98 6.2C13.9 15.1 18.5 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.5 24c0-1.6-.15-3.13-.43-4.6H24v9.2h12.7c-.55 3-2.2 5.5-4.7 7.2l7.2 5.6c4.2-3.9 6.6-9.6 6.6-17.4z"/>
            <path fill="#FBBC05" d="M11.48 28.1c-.3-1-.5-2-.5-3.1s.2-2.1.5-3.1l-7.98-6.2C1.5 19.3 0 21.5 0 24s1.5 4.7 3.5 6.3l7.98-6.2z"/>
            <path fill="#EA4335" d="M24 46.5c6.5 0 11.9-2.1 15.9-5.7l-7.2-5.6c-2 1.3-4.5 2-7 2-5.5 0-10.1-3.6-11.7-8.5l-8 6.2C6.9 41.1 14.8 46.5 24 46.5z"/>
          </svg>
          Sign In using Google
        </button>
        <p className="text-center mb-4">or sign in with your email</p>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-11 text-gray-600 hover:text-gray-900 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z" />
                <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.458 12C3.732 15.943 7.523 19 10 19c2.477 0 6.268-3.057 7.542-7-.73-2.89-4-7-9-7-1.21 0-2.35.3-3.38.82l1.45 1.45A3 3 0 0110 7a3 3 0 013 3c0 .34-.07.66-.19.95l1.45 1.45c.52-1.03.82-2.17.82-3.38 0-5-4.11-9-9-9-1.21 0-2.35.3-3.38.82l1.45 1.45z" />
                <path d="M3 3l14 14" />
              </svg>
            )}
          </button>
          <p className="text-right text-sm text-blue-600 hover:underline cursor-pointer mt-1">
            Forget password?
          </p>
        </div>
        <div className="flex justify-center gap-4 mb-4">
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-center bg-blue-600 text-white py-2 px-6 sm:px-10 md:px-16 lg:px-28 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
};

export default Login;
