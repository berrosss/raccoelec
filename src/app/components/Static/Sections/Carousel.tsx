"use client";
import Link from "next/link";
import React, { useRef } from "react";

const Carousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Scroll the carousel to the next item
  const scrollNext = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      const childWidth = carousel.firstElementChild?.clientWidth || 150; // Default width fallback
      carousel.scrollBy({ left: childWidth, behavior: "smooth" });
    }
  };

  // Scroll the carousel to the previous item
  const scrollPrev = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      console.log("dasd")
      const childWidth = carousel.firstElementChild?.clientWidth || 150; // Default width fallback
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
          {name:"#compteur de chantier", link:"/raccordement-electrique"},
           {name:"#coffret électrique", link:"/raccordement-electrique"},
           {name:"#compteur provisoire", link:"/raccordement-electrique"},
           {name:"#déplacement de compteur", link:"/modification-de-branchement"},
           {name:"#branchement aérien", link:"/modification-de-branchement"},
           {name:"#branchement sous terrain", link:"/modification-de-branchement"},
           {name:"#compteur linky", link:"/raccordement-electrique"},
           {name:"#contrat EDF", link:"/mise-en-service"},
           {name:"#panneaux solaire ", link:"/mise-en-service"},
           {name:"#compteur définitive ", link:"/raccordement-electrique"}
        ].map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="w-full mt-1 px-2 py-3 text-[#1623dc] focus:outline-none  "
          >
            <p className="bg-[#e1e4ff] p-1 px-4 rounded-sm text-xs">{item.name}</p>
          </Link>
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
