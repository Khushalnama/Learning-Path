import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/owner");
  };

  const handleLearningPathClick = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span
            className="self-center text-2xl cursor-pointer font-semibold whitespace-nowrap dark:text-white"
            onClick={handleLearningPathClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleLearningPathClick();
              }
            }}
          >
            Learning-Path
          </span>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button className="text-white p-2 cursor-pointer" onClick={() => navigate("/login")}>Log In</button>
            <button
              type="button"
              onClick={handleGetStartedClick}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
            >
              Get started
            </button>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
