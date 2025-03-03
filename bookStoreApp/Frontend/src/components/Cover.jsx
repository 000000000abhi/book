import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 2,
    src: "https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2024/09/03/30295_Quote_B1_The_Life_Impossible_09_03_24r2.jpg",

    alt: "Slide 2",
  },
  {
    id: 1,
    src: "https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2024/09/03/30295_Quote_B2_Blue_Sisters_09_03_24.jpg",

    alt: "Slide 1",
  },
  {
    id: 3,
    src: "https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2024/08/30/30292_BB_D_SepOMP_08_30_24.jpg",
    alt: "Slide 3",
  },
  {
    id: 4,
    src: "https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2024/09/03/30295_Quote_A2_Whale_Fall_09_03_24.jpg",
    alt: "Slide 4",
  },
];

export default function Cover() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  const intervalTime = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const handleNavigation = (direction) => {
    setCurrentSlide((prevSlide) => {
      if (direction === "prev") return (prevSlide - 1 + totalSlides) % totalSlides;
      return (prevSlide + 1) % totalSlides;
    });
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto overflow-hidden my-20">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s forwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      <div className="carousel relative w-full h-64">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100 z-10 animate-fadeIn" : "opacity-0 z-0"
            }`}
          >
            <div className="relative flex justify-center items-center h-full">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover rounded-lg animate-float"
              />
            </div>
          </div>
        ))}
        <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
          <button
            onClick={() => handleNavigation("prev")}
            className="btn btn-circle bg-gray-800 text-white hover:bg-gray-700 p-3 rounded-full"
            aria-label="Previous Slide"
          >
            ❮
          </button>
          <button
            onClick={() => handleNavigation("next")}
            className="btn btn-circle bg-gray-800 text-white hover:bg-gray-700 p-3 rounded-full"
            aria-label="Next Slide"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}
