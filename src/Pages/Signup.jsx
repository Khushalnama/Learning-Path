import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <p className='p-2 font-bold'>If already register??</p>
      <button
        type="button"
        onClick={handleSignInClick}
        className="mt-4 w-50 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    </div>
  );
};

export default Signup;
