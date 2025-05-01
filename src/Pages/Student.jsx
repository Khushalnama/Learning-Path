import React from 'react';
import course1 from '../assets/course_1.png';
import course2 from '../assets/course_2.png';
import course3 from '../assets/course_3.png';
import course4 from '../assets/course_4.png';

const courses = [
  {
    id: 1,
    title: 'Introduction to React',
    image: course1,
    description: 'Learn the basics of React.js and build interactive UIs.',
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    image: course2,
    description: 'Deep dive into JavaScript concepts and best practices.',
  },
  {
    id: 3,
    title: 'UI/UX Design Fundamentals',
    image: course3,
    description: 'Understand the principles of user interface and experience design.',
  },
  {
    id: 4,
    title: 'Web Development Bootcamp',
    image: course4,
    description: 'Become a full-stack web developer with hands-on projects.',
  },
];

const Student = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300"
                onClick={() => alert(`Accessing course: ${course.title}`)}
              >
                Access Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;
