"use client";
import React, { useRef } from "react";

const Carousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollNext = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      const childWidth = carousel.firstElementChild?.clientWidth || 0;
      carousel.scrollBy({ left: childWidth, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      // Scroll back the width of one child element
      const childWidth = carousel.firstElementChild?.clientWidth || 0;
      carousel.scrollBy({ left: -childWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="relative max-w-7xl overflow-hidden mx-auto">
      {/* Previous Button */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 bg-slate-50 p-2 z-40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="carousel flex overflow-x-scroll no-scrollbar whitespace-nowrap"
      >
        {[
          "#TOP50 IFOP",
          "#FINTECH100 2024",
          "#NEXT40",
          "#TOP20 LINKEDIN",
          "#CAC40",
          "#FW SCALE UP 2024",
          "#RUGBY TOP14",
          "#John Doe",
          "#MEDIAS",
        ].map((item, index) => (
          <span
            key={index}
            className="bg-[#f4f5f6] py-1 px-4 mx-2 text-sm rounded hover:bg-[#dfe2e5] cursor-pointer"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 bg-slate-50 p-2 z-40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
