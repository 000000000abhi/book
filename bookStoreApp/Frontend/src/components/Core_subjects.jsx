import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Core_subjects() {
  const [osCourses, setOsCourses] = useState([]);

  useEffect(() => {
    const getOsCourses = async () => {
      try {
        const res = await axios.get("http://localhost:2345/book/os-courses");
        console.log(res.data);
        setOsCourses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOsCourses();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 py-12">
      <div className="text-center mt-28">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Operating System Courses <span className="text-pink-500">Free!</span>
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          Explore a range of free Operating System courses that cover everything from basic OS concepts to advanced system management and kernel programming. Elevate your skills and dive into the heart of system software with our expertly curated content.
        </p>
        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-300">
            Back
          </button>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {osCourses.map((course) => (
          <Cards key={course.id} item={course} />
        ))}
      </div>
    </div>
  );
}

export default Core_subjects;
