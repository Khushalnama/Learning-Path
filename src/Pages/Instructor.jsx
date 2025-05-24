import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  FiUpload,
  FiTrash2,
  FiEdit2,
  FiUsers,
  FiDollarSign,
  FiPlus,
} from "react-icons/fi";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Smaller components for Instructor page

const CourseCard = ({ course, onEdit, onDelete }) => (
  <div
    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium text-lg">{course.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{course.description}</p>
        <div className="flex items-center mt-2 space-x-4">
          <span className="text-sm text-gray-500">${course.price}</span>
          <span className="text-sm text-gray-500">{course.students} students</span>
          <span className="text-sm text-gray-500">{course.videos.length} videos</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(course)}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(course.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  </div>
);

const QuizQuestion = ({ quiz, index }) => (
  <div key={index} className="border border-gray-200 rounded-lg p-4">
    <p className="font-medium">{quiz.question}</p>
    <ul className="list-disc list-inside mt-2">
      {quiz.options.map((option, i) => (
        <li
          key={i}
          className={i === quiz.correctAnswer ? "font-bold text-green-600" : ""}
        >
          {option}
        </li>
      ))}
    </ul>
  </div>
);

const StudentRow = ({ student }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-600 font-medium">{student.name.charAt(0)}</span>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{student.name}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.enrolled}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex flex-wrap gap-1">
        {student.courses.map((course, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800"
          >
            {course}
          </span>
        ))}
      </div>
    </td>
  </tr>
);

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: 0,
    category: "Programming",
  });
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [students, setStudents] = useState([]);
  const [revenueData, setRevenueData] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  useEffect(() => {
    setCourses([
      {
        id: 1,
        title: "React Fundamentals",
        description: "Learn the core concepts of React",
        price: 49.99,
        category: "Programming",
        students: 125,
        revenue: 6248.75,
        videos: ["intro.mp4", "components.mp4"],
      },
      {
        id: 2,
        title: "Advanced JavaScript",
        description: "Deep dive into modern JavaScript",
        price: 39.99,
        category: "Programming",
        students: 89,
        revenue: 3559.11,
        videos: ["es6-features.mp4"],
      },
    ]);

    setStudents([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        enrolled: "2023-01-15",
        courses: ["React Fundamentals"],
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        enrolled: "2023-02-20",
        courses: ["React Fundamentals", "Advanced JavaScript"],
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        enrolled: "2023-03-10",
        courses: ["Advanced JavaScript"],
      },
    ]);

    setRevenueData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue ($)",
          data: [1200, 1900, 1500, 2000, 1800, 2200],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
        },
      ],
    });
  }, []);

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (editingCourseId) {
      setCourses(
        courses.map((course) =>
          course.id === editingCourseId
            ? { ...newCourse, id: editingCourseId }
            : course
        )
      );
      setEditingCourseId(null);
    } else {
      const newCourseWithId = {
        ...newCourse,
        id: courses.length + 1,
        students: 0,
        revenue: 0,
        videos: [],
      };
      setCourses([...courses, newCourseWithId]);
    }
    setNewCourse({
      title: "",
      description: "",
      price: 0,
      category: "Programming",
    });
  };

  const handleEditCourse = (course) => {
    setNewCourse({
      title: course.title,
      description: course.description,
      price: course.price,
      category: course.category,
    });
    setEditingCourseId(course.id);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  const handleVideoUpload = (e) => {
    e.preventDefault();
    if (!videoFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          if (courses.length > 0) {
            setCourses(
              courses.map((course, index) =>
                index === 0
                  ? { ...course, videos: [...course.videos, videoFile.name] }
                  : course
              )
            );
          }
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const addQuizQuestion = () => {
    setQuizQuestions([...quizQuestions, newQuestion]);
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
  };

  const updateOptionText = (optionIndex, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[optionIndex] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Instructor Dashboard
        </h1>

        <Tabs>
          <TabList className="flex border-b border-gray-200">
            <Tab className="py-2 px-4 font-medium text-gray-600 hover:text-indigo-600 focus:outline-none cursor-pointer">
              My Courses
            </Tab>
            <Tab className="py-2 px-4 font-medium text-gray-600 hover:text-indigo-600 focus:outline-none cursor-pointer">
              Upload Videos
            </Tab>
            <Tab className="py-2 px-4 font-medium text-gray-600 hover:text-indigo-600 focus:outline-none cursor-pointer">
              Quizzes
            </Tab>
            <Tab className="py-2 px-4 font-medium text-gray-600 hover:text-indigo-600 focus:outline-none cursor-pointer">
              Students
            </Tab>
            <Tab className="py-2 px-4 font-medium text-gray-600 hover:text-indigo-600 focus:outline-none cursor-pointer">
              Revenue
            </Tab>
          </TabList>

          <TabPanel>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">My Courses</h2>
                  {courses.length === 0 ? (
                    <p className="text-gray-500">
                      No courses yet. Create your first course!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {courses.map((course) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          onEdit={handleEditCourse}
                          onDelete={handleDeleteCourse}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {editingCourseId ? "Edit Course" : "Create New Course"}
                </h2>
                <form onSubmit={handleCourseSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newCourse.title}
                        onChange={(e) =>
                          setNewCourse({ ...newCourse, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={newCourse.description}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows="3"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        value={newCourse.price}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={newCourse.category}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Programming">Programming</option>
                        <option value="Design">Design</option>
                        <option value="Business">Business</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {editingCourseId ? "Update Course" : "Create Course"}
                    </button>
                    {editingCourseId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCourseId(null);
                          setNewCourse({
                            title: "",
                            description: "",
                            price: 0,
                            category: "Programming",
                          });
                        }}
                        className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Upload Videos</h2>
                  <form onSubmit={handleVideoUpload}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Course
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          disabled={courses.length === 0}
                        >
                          {courses.length === 0 ? (
                            <option>No courses available</option>
                          ) : (
                            courses.map((course) => (
                              <option key={course.id} value={course.id}>
                                {course.title}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Video File
                        </label>
                        <div className="mt-1 flex items-center">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setVideoFile(e.target.files[0])}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                        </div>
                      </div>
                      {isUploading && (
                        <div className="pt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-indigo-600 h-2.5 rounded-full"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Uploading: {uploadProgress}%
                          </p>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={!videoFile || isUploading}
                        className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          !videoFile || isUploading
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <FiUpload className="mr-2" />
                          Upload Video
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Quizzes</h2>
              <div className="space-y-4">
                {quizQuestions.length === 0 ? (
                  <p className="text-gray-500">No quizzes added yet.</p>
                ) : (
                  quizQuestions.map((quiz, index) => (
                    <QuizQuestion key={index} quiz={quiz} index={index} />
                  ))
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Add New Quiz Question</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={newQuestion.question}
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          question: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Options
                    </label>
                    <div className="space-y-2">
                      {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={newQuestion.correctAnswer === index}
                            onChange={() =>
                              setNewQuestion({
                                ...newQuestion,
                                correctAnswer: index,
                              })
                            }
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOptionText(index, e.target.value)}
                            className="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-grow"
                            placeholder={`Option ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addQuizQuestion}
                    disabled={
                      !newQuestion.question || newQuestion.options.some((opt) => !opt)
                    }
                    className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      !newQuestion.question || newQuestion.options.some((opt) => !opt)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <FiPlus className="mr-2" />
                      Add Question
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="mt-6">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Enrolled Students</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Enrolled Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Courses
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => (
                          <StudentRow key={student.id} student={student} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Student Enrollment</h2>
                  <div className="h-64">
                    <Bar
                      data={{
                        labels: courses.map((course) => course.title),
                        datasets: [
                          {
                            label: "Number of Students",
                            data: courses.map((course) => course.students),
                            backgroundColor: "rgba(79, 70, 229, 0.6)",
                            borderColor: "rgba(79, 70, 229, 1)",
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              precision: 0,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Top Courses by Enrollment</h2>
                  <div className="space-y-3">
                    {[...courses]
                      .sort((a, b) => b.students - a.students)
                      .map((course, index) => (
                        <div key={course.id} className="flex items-center">
                          <span className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full mr-3">
                            {index + 1}
                          </span>
                          <div className="flex-grow">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{course.title}</span>
                              <span>{course.students} students</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div
                                className="bg-indigo-600 h-1.5 rounded-full"
                                style={{
                                  width: `${
                                    (course.students /
                                      Math.max(...courses.map((c) => c.students))) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2 mt-6">
              <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
              <div className="h-80">
                <Line
                  data={revenueData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: function (value) {
                            return "$" + value;
                          },
                        },
                      },
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            return "$" + context.parsed.y;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default InstructorDashboard;
