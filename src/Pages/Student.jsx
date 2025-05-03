import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { FiSearch, FiBookmark, FiCheckCircle, FiMessageSquare, FiStar, FiPlay, FiLock } from 'react-icons/fi';
import { RiProgress4Line } from 'react-icons/ri';
import course1 from '../assets/course_1.png';

const Student = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('all');
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for selected course
  const [selectedCourse, setSelectedCourse] = useState(null);
  // State for current video URL
  const [currentVideo, setCurrentVideo] = useState('');
  // State for comments
  const [comment, setComment] = useState('');
  // State for course ratings
  const [rating, setRating] = useState(0);
  // State for enrolled courses
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // State for course progress
  const [courseProgress, setCourseProgress] = useState({});

  // Sample course data
  const courses = [
    {
      id: 1,
      title: 'Introduction to React',
      instructor: 'Jane Smith',
      category: 'Web Development',
      price: 0,
      thumbnail: 'https://via.placeholder.com/300x200?text=React',
      rating: 4.5,
      enrolled: true,
      lessons: [
        { id: 1, title: 'React Basics', duration: '12:34', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', completed: true },
        { id: 2, title: 'Components & Props', duration: '15:20', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', completed: true },
        { id: 3, title: 'State & Lifecycle', duration: '18:45', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', completed: false },
      ]
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      instructor: 'John Doe',
      category: 'Programming',
      price: 49.99,
      thumbnail: 'https://via.placeholder.com/300x200?text=JavaScript',
      rating: 4.8,
      enrolled: true,
      lessons: [
        { id: 1, title: 'ES6 Features', duration: '22:10', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', completed: true },
        { id: 2, title: 'Async/Await', duration: '19:30', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', completed: false },
        { id: 3, title: 'Design Patterns', duration: '25:15', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', completed: false },
      ]
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Alex Johnson',
      category: 'Design',
      price: 29.99,
      thumbnail: 'https://via.placeholder.com/300x200?text=UI/UX',
      rating: 4.3,
      enrolled: false,
      lessons: [
        { id: 1, title: 'Design Principles', duration: '14:25', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', completed: false },
        { id: 2, title: 'Color Theory', duration: '16:40', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', completed: false },
      ]
    },
    {
      id: 4,
      title: 'Python for Beginners',
      instructor: 'Sarah Williams',
      category: 'Programming',
      price: 0,
      thumbnail: 'https://via.placeholder.com/300x200?text=Python',
      rating: 4.7,
      enrolled: false,
      lessons: [
        { id: 1, title: 'Python Basics', duration: '20:00', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', completed: false },
        { id: 2, title: 'Functions & Modules', duration: '18:15', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', completed: false },
      ]
    },
  ];

  // Filter courses based on active tab and search term
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'free') return course.price === 0 && matchesSearch;
    if (activeTab === 'enrolled') return course.enrolled && matchesSearch;
    return course.category.toLowerCase() === activeTab.toLowerCase() && matchesSearch;
  });

  // Calculate progress for a course
  const calculateProgress = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    
    const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
    return Math.round((completedLessons / course.lessons.length) * 100);
  };

  // Handle course selection
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    if (course.lessons.length > 0) {
      setCurrentVideo(course.lessons[0].videoUrl);
    }
  };

  // Handle lesson selection
  const handleLessonSelect = (lesson) => {
    setCurrentVideo(lesson.videoUrl);
  };

  // Handle marking lesson as complete
  const toggleLessonComplete = (courseId, lessonId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map(lesson => {
          if (lesson.id === lessonId) {
            return { ...lesson, completed: !lesson.completed };
          }
          return lesson;
        });
        return { ...course, lessons: updatedLessons };
      }
      return course;
    });
    
    // In a real app, you would update the state or make an API call here
    console.log('Updated courses:', updatedCourses);
  };

  // Handle course enrollment
  const handleEnroll = (courseId) => {
    // In a real app, you would make an API call here
    alert(`Enrolled in course ${courseId}`);
    setEnrolledCourses([...enrolledCourses, courseId]);
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() && selectedCourse) {
      // In a real app, you would make an API call here
      alert(`Comment submitted for ${selectedCourse.title}: ${comment}`);
      setComment('');
    }
  };

  // Handle rating submission
  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && selectedCourse) {
      // In a real app, you would make an API call here
      alert(`Rating submitted for ${selectedCourse.title}: ${rating} stars`);
      setRating(0);
    }
  };

  // Get unique categories for filter tabs
  const categories = [...new Set(courses.map(course => course.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Learning Platform</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar - Course list */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 rounded-full text-sm ${activeTab === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('free')}
                  className={`px-3 py-1 rounded-full text-sm ${activeTab === 'free' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  Free
                </button>
                <button
                  onClick={() => setActiveTab('enrolled')}
                  className={`px-3 py-1 rounded-full text-sm ${activeTab === 'enrolled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  My Courses
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-3 py-1 rounded-full text-sm ${activeTab === category ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Course list */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map(course => (
                    <div 
                      key={course.id} 
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedCourse?.id === course.id ? 'bg-blue-50' : ''}`}
                      onClick={() => handleCourseSelect(course)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                          <img className="h-full w-full object-cover" src={course1} alt="" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{course.title}</h3>
                            {course.enrolled && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Enrolled
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{course.instructor}</p>
                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FiStar
                                  key={star}
                                  className={`h-4 w-4 ${star <= Math.round(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                              <span className="ml-1 text-xs text-gray-500">{course.rating}</span>
                            </div>
                            <span className={`text-sm font-medium ${course.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                              {course.price === 0 ? 'Free' : `$${course.price}`}
                            </span>
                          </div>
                          {course.enrolled && (
                            <div className="mt-2">
                              <div className="flex items-center">
                                <RiProgress4Line className="text-blue-500 mr-2" />
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${calculateProgress(course.id)}%` }}
                                  ></div>
                                </div>
                                <span className="ml-2 text-xs text-gray-500">{calculateProgress(course.id)}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No courses found matching your criteria.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right content area - Course details */}
          <div className="lg:w-2/3">
            {selectedCourse ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Course header */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedCourse.title}</h2>
                      <p className="text-sm text-gray-500">Instructor: {selectedCourse.instructor}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar
                            key={star}
                            className={`h-5 w-5 ${star <= Math.round(selectedCourse.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-500">{selectedCourse.rating}</span>
                      </div>
                      {!selectedCourse.enrolled ? (
                        <button
                          onClick={() => handleEnroll(selectedCourse.id)}
                          className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCourse.price === 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                        >
                          {selectedCourse.price === 0 ? 'Enroll for Free' : `Enroll for $${selectedCourse.price}`}
                        </button>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Enrolled
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600">{selectedCourse.description || 'No description available.'}</p>
                </div>

                {/* Video player */}
                <div className="bg-black">
                  <div className="aspect-w-16 aspect-h-9">
                    <ReactPlayer
                      url={currentVideo}
                      width="100%"
                      height="100%"
                      controls={true}
                    />
                  </div>
                </div>

                {/* Lessons list */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Lessons</h3>
                  <div className="space-y-2">
                    {selectedCourse.lessons.map(lesson => (
                      <div 
                        key={lesson.id} 
                        className={`p-3 rounded-md border ${currentVideo === lesson.videoUrl ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} hover:bg-gray-50 cursor-pointer`}
                        onClick={() => handleLessonSelect(lesson)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLessonComplete(selectedCourse.id, lesson.id);
                              }}
                              className="mr-3"
                            >
                              {lesson.completed ? (
                                <FiCheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                              )}
                            </button>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{lesson.title}</h4>
                              <p className="text-xs text-gray-500">{lesson.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {!selectedCourse.enrolled && (
                              <FiLock className="h-4 w-4 text-gray-400 mr-2" />
                            )}
                            <FiPlay className="h-4 w-4 text-blue-500" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments section */}
                <div className="p-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>
                  <form onSubmit={handleCommentSubmit} className="mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/40" alt="User" />
                      </div>
                      <div className="flex-1">
                        <textarea
                          rows={3}
                          className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Add a comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="mt-2 flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Sample comments */}
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/40" alt="User" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">John Doe</h4>
                            <span className="text-xs text-gray-500">2 days ago</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-700">This course is amazing! I learned so much about React components.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating section */}
                {selectedCourse.enrolled && (
                  <div className="p-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Rate this course</h3>
                    <form onSubmit={handleRatingSubmit}>
                      <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <FiStar
                              className={`h-8 w-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                          </button>
                        ))}
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={rating === 0}
                      >
                        Submit Rating
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <FiBookmark className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Select a course</h3>
                <p className="mt-1 text-sm text-gray-500">Choose a course from the list to view details and start learning.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Student;