import React from 'react'
import course1 from '../assets/course_1.png'
import course2 from '../assets/course_2.png'
import course3 from '../assets/course_3.png'
import course4 from '../assets/course_4.png'

const Home = () => {
  const demoCourses = [
    {
      id: 1,
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming using Python.',
      image: course1,
    },
    {
      id: 2,
      title: 'Web Development Bootcamp',
      description: 'Master HTML, CSS, and JavaScript to build modern websites.',
      image: course2,
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      description: 'Explore data analysis, visualization, and machine learning.',
      image: course3,
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      description: 'Design user-friendly and visually appealing interfaces.',
      image: course4,
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      description: 'Design user-friendly and visually appealing interfaces.',
      image: course4,
    },
    {
      id: 6,
      title: 'UI/UX Design Principles',
      description: 'Design user-friendly and visually appealing interfaces.',
      image: course4,
    },
  ]

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center p-10 bg-white">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4">
          Unlock Your Learning Journey
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl">
          Join thousands of learners and master new skills anytime, anywhere with our online courses.
        </p>
        <div>
          <a href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition">
            Browse Courses
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            High-quality content, expert instructors, and flexible learning at your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-blue-600 mb-4 text-5xl">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Skill-Based Learning</h3>
            <p className="text-gray-600">
              Focus on real-world skills with curated courses and practical assignments.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-green-500 mb-4 text-5xl">🌍</div>
            <h3 className="text-xl font-semibold mb-2">Learn Anywhere</h3>
            <p className="text-gray-600">
              Access courses from your laptop, tablet, or smartphone at your own pace.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-purple-600 mb-4 text-5xl">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Earn Certificates</h3>
            <p className="text-gray-600">
              Complete courses and get certificates to boost your resume and career profile.
            </p>
          </div>

        </div>
      </section>

      {/* Demo Courses Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Demo Courses</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            Explore some of our popular demo courses to get started.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {demoCourses.map(course => (
              <div key={course.id} className="bg-gray-100 rounded-2xl shadow p-6 hover:shadow-lg transition cursor-pointer">
                <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
    </>
  )
}

export default Home
