import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState('student');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('userType');
    if (type === 'instructor') {
      setUserType('instructor');
    } else {
      setUserType('student');
    }
  }, [location.search]);

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:3001/signup-instructor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Instructor created successfully. Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error connecting to server. Please try again later.');
      console.error('Signup error:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // You can get user info from result.user
      navigate('/Student');
    } catch (error) {
      setMessage('Google sign-up failed. Please try again.');
      console.error('Google sign-up error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Sign Up As a Instructor</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-6 rounded-lg shadow-md">
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full mb-4 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-md hover:from-cyan-600 hover:to-blue-600 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M24 9.5c3.54 0 6.72 1.22 9.2 3.22l6.87-6.87C34.3 2.7 29.5 1 24 1 14.8 1 6.9 6.9 3.5 15.7l7.98 6.2C13.9 15.1 18.5 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.5 24c0-1.6-.15-3.13-.43-4.6H24v9.2h12.7c-.55 3-2.2 5.5-4.7 7.2l7.2 5.6c4.2-3.9 6.6-9.6 6.6-17.4z"/>
            <path fill="#FBBC05" d="M11.48 28.1c-.3-1-.5-2-.5-3.1s.2-2.1.5-3.1l-7.98-6.2C1.5 19.3 0 21.5 0 24s1.5 4.7 3.5 6.3l7.98-6.2z"/>
            <path fill="#34A853" d="M46.5 24c0-1.6-.15-3.13-.43-4.6H24v9.2h12.7c-.55 3-2.2 5.5-4.7 7.2l7.2 5.6c4.2-3.9 6.6-9.6 6.6-17.4z"/>
            <path fill="#FBBC05" d="M11.48 28.1c-.3-1-.5-2-.5-3.1s.2-2.1.5-3.1l-7.98-6.2C1.5 19.3 0 21.5 0 24s1.5 4.7 3.5 6.3l7.98-6.2z"/>
            <path fill="#EA4335" d="M24 46.5c6.5 0 11.9-2.1 15.9-5.7l-7.2-5.6c-2 1.3-4.5 2-7 2-5.5 0-10.1-3.6-11.7-8.5l-8 6.2C6.9 41.1 14.8 46.5 24 46.5z"/>
          </svg>
          Sign Up using Google
        </button>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
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
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      <p className='p-2 font-bold'>If already register??</p>
      <button
        type="button"
        onClick={handleSignInClick}
        className="mt-4 w-full sm:w-50 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    </div>
  );
};

export default Signup;
