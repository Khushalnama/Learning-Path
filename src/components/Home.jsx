import React from 'react'

const Home = () => {
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

    </div>
    </>
  )
}

export default Home
