import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Slider from "react-slick";
import Cards from "../components/Cards";

function Freebook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:2345/book/");
        const data = res.data.filter((item) => item.category === "free");
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBooks();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 md:px-20 py-10 ">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
        Free Books
      </h1>
      <Slider {...settings}>
        {books.map((item) => (
          <div key={item.id} className="px-2">
            <Cards item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Freebook;
