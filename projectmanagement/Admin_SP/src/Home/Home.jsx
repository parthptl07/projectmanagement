import React from 'react';
import Navbar from './Navbar';
import img from '../../public/th.jpeg';

function Homes() {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center" style={{ backgroundImage: `url(${img})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Extra Track</h1>
          <p className="text-lg max-w-xl mx-auto">Manage your tasks, collaborate with teams, and keep track of your project progress with ease. Join us today and streamline your workflow!</p>
          <div className="mt-6">
            <a href="/signup" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Get Started</a>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Why Choose Extra Track?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Collaboration Made Easy</h3>
            <p>Work together with your team members in real-time, share updates, and track progress in a unified space.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Task Management</h3>
            <p>Easily create, assign, and monitor tasks to ensure your projects stay on track and deadlines are met.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Reports & Analytics</h3>
            <p>Gain insights into your projects with in-depth reports and analytics to make better-informed decisions.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Homes;
