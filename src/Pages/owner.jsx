import React from 'react';
import { useNavigate } from 'react-router-dom';

const Owner = () => {
  const navigate = useNavigate();

  const handleStudentRegisterClick = () => {
    navigate('/signup');
  };

  const handleInstructorRegisterClick = () => {
    navigate('/Signupinstructor');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Register Yourself</h1>
      <div className="space-x-6">
        <button
          onClick={handleStudentRegisterClick}
          className="px-6 py-3 cursor-pointer bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300"
        >
          Register as a Student
        </button>
        <button
          onClick={handleInstructorRegisterClick}
          className="px-6 py-3 cursor-pointer bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-500 hover:via-blue-600 hover:to-purple-700 transition duration-300"
        >
          Register as a Instructor
        </button>
      </div>
    </div>
  );
};

export default Owner;
