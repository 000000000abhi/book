import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:2345/book/programming");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  // Filter programming courses that are free
  const freeProgrammingCourses = book.filter(
    (item) => item.category === "programming" && item.type === "free"
  );

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 py-12">
      <div className="text-center mt-28">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
          We're delighted to have you{" "}
          <span className="text-pink-500">Here!</span>
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          Explore our free programming courses tailored to help you build a
          strong foundation in coding and development. Our expert-led content
          ensures a comprehensive learning experience for both beginners and
          professionals.
        </p>
        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-300">
            Back
          </button>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {freeProgrammingCourses.length > 0 ? (
          freeProgrammingCourses.map((item) => (
            <Cards key={item.id} item={item} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600 dark:text-gray-300">
            No free programming courses available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Course;
