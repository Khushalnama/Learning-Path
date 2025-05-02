import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import course1 from '../assets/course_1.png';
import course2 from '../assets/course_2.png';
import course3 from '../assets/course_3.png';
import course4 from '../assets/course_4.png';

const allCourses = [
  {
    id: 1,
    title: 'Introduction to React',
    image: course1,
    description: 'Learn the basics of React.js and build interactive UIs.',
    topic: 'React',
    price: 0,
    lessons: [
      { id: 1, title: 'React Basics', videoUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { id: 2, title: 'React State', videoUrl: 'https://www.youtube.com/watch?v=35lXWvCuM8o' },
    ],
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    image: course2,
    description: 'Deep dive into JavaScript concepts and best practices.',
    topic: 'JavaScript',
    price: 49,
    lessons: [
      { id: 1, title: 'Closures', videoUrl: 'https://www.youtube.com/watch?v=1JsJx1x35c0' },
      { id: 2, title: 'Async/Await', videoUrl: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU' },
    ],
  },
  {
    id: 3,
    title: 'UI/UX Design Fundamentals',
    image: course3,
    description: 'Understand the principles of user interface and experience design.',
    topic: 'Design',
    price: 0,
    lessons: [
      { id: 1, title: 'Design Principles', videoUrl: 'https://www.youtube.com/watch?v=Ovj4hFxko7c' },
      { id: 2, title: 'User Research', videoUrl: 'https://www.youtube.com/watch?v=Q6p6k0b6v6k' },
    ],
  },
  {
    id: 4,
    title: 'Web Development Bootcamp',
    image: course4,
    description: 'Become a full-stack web developer with hands-on projects.',
    topic: 'Web Development',
    price: 99,
    lessons: [
      { id: 1, title: 'HTML & CSS', videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE' },
      { id: 2, title: 'JavaScript Basics', videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
    ],
  },
];

const topics = ['All', 'React', 'JavaScript', 'Design', 'Web Development'];

const StudentNew = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonProgress, setLessonProgress] = useState({});
  const [comments, setComments] = useState({});
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    let filtered = allCourses;

    if (selectedTopic !== 'All') {
      filtered = filtered.filter((course) => course.topic === selectedTopic);
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedTopic]);

  const handleEnroll = (course) => {
    if (!enrolledCourses.find((c) => c.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, course]);
      alert(`Enrolled in course: ${course.title}`);
    } else {
      alert(`Already enrolled in course: ${course.title}`);
    }
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setCurrentLesson(course.lessons[0]);
  };

  const handleLessonComplete = (lessonId) => {
    setLessonProgress((prev) => ({ ...prev, [lessonId]: true }));
  };

  const handleAddComment = (lessonId, comment) => {
    setComments((prev) => {
      const lessonComments = prev[lessonId] || [];
      return { ...prev, [lessonId]: [...lessonComments, comment] };
    });
  };

  const handleRateCourse = (courseId, rating) => {
    setRatings((prev) => ({ ...prev, [courseId]: rating }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Browse Courses</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 flex-grow"
        />
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => {
          const isEnrolled = enrolledCourses.find((c) => c.id === course.id);
          const rating = ratings[course.id] || 0;
          return (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-2">{course.description}</p>
                <p className="text-gray-700 font-semibold mb-2">
                  Price: {course.price === 0 ? 'Free' : `$${course.price}`}
                </p>
                <button
                  className={`px-4 py-2 rounded text-white ${
                    isEnrolled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                  } transition-colors duration-300`}
                  onClick={() => handleEnroll(course)}
                  disabled={isEnrolled}
                >
                  {isEnrolled ? 'Enrolled' : 'Enroll'}
                </button>
                {isEnrolled && (
                  <button
                    className="mt-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
                    onClick={() => handleSelectCourse(course)}
                  >
                    Start Learning
                  </button>
                )}
                <div className="mt-2">
                  <p>Rating: {rating} / 5</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Player and Details */}
      {selectedCourse && currentLesson && (
        <div className="mt-10 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">{selectedCourse.title}</h2>
          <h3 className="text-xl mb-2">{currentLesson.title}</h3>
          <ReactPlayer
            url={currentLesson.videoUrl}
            controls
            width="100%"
            height="360px"
            onEnded={() => handleLessonComplete(currentLesson.id)}
          />
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Lessons Progress</h4>
            <ul>
              {selectedCourse.lessons.map((lesson) => (
                <li key={lesson.id} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={!!lessonProgress[lesson.id]}
                    readOnly
                    className="mr-2"
                  />
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Comments Section */}
          <CommentsSection
            lessonId={currentLesson.id}
            comments={comments[currentLesson.id] || []}
            onAddComment={handleAddComment}
          />

          {/* Rating Section */}
          <RatingSection
            courseId={selectedCourse.id}
            rating={ratings[selectedCourse.id] || 0}
            onRate={handleRateCourse}
          />
        </div>
      )}
    </div>
  );
};

const CommentsSection = ({ lessonId, comments, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim() !== '') {
      onAddComment(lessonId, commentText.trim());
      setCommentText('');
    }
  };

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-2">Comments</h4>
      <ul className="mb-2 max-h-40 overflow-y-auto border border-gray-300 rounded p-2">
        {comments.length === 0 && <li>No comments yet.</li>}
        {comments.map((comment, index) => (
          <li key={index} className="mb-1 border-b border-gray-200 pb-1">
            {comment}
          </li>
        ))}
      </ul>
      <textarea
        className="w-full border border-gray-300 rounded p-2 mb-2"
        rows={3}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300"
        onClick={handleSubmit}
      >
        Submit Comment
      </button>
    </div>
  );
};

const RatingSection = ({ courseId, rating, onRate }) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleRatingChange = (newRating) => {
    setCurrentRating(newRating);
    onRate(courseId, newRating);
  };

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-2">Rate this Course</h4>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= currentRating}
            onClick={() => handleRatingChange(star)}
          />
        ))}
      </div>
    </div>
  );
};

const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? 'gold' : 'none'}
    viewBox="0 0 24 24"
    stroke="gold"
    strokeWidth={2}
    className="w-6 h-6 cursor-pointer"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.98 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"
    />
  </svg>
);

export default StudentNew;
