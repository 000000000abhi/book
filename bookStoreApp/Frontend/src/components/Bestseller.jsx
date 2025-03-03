import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Cards from "../components/Cards";

function BestSeller() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading
  const [error, setError] = useState(null); // New state for error

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:2345/book");
        const data = res.data.filter((item) => item.category === "free");

        // Check if data is valid before setting it
        if (data.length > 0) {
          setBook(data);
        } else {
          setError("No free books available.");
        }
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 md:px-20 py-10">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
          Best Seller
        </h1>
        <div className="relative">
          <Slider {...settings}>
            {book.map((item) => (
              <div key={item.id} className="px-2">
                <Cards item={item} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
