import React from "react";
import Navbar from "../components/Navbar";
import Course from "../components/Course";
import Footer from "../components/Footer";

function Courses() {
  // Sample course data
  const courses = [
    { id: 1, title: "Web Development", description: "Learn HTML, CSS, and JavaScript." },
    { id: 2, title: "Data Science", description: "Introduction to Python and Machine Learning." },
    { id: 3, title: "Digital Marketing", description: "Master SEO, SEM, and Social Media Marketing." },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-4">Our Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Course key={course.id} title={course.title} description={course.description} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Courses;
