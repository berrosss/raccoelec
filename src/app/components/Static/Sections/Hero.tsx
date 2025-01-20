"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {

  const images = [
    "/assets/hero/1.jpg",
    "/assets/hero/2.jpeg",
    "/assets/hero/3.jpeg",
    "/assets/hero/4.png",
  ];

  return (
    <header className="bg-[#1523dc] overflow-hidden items-center flex">
      <div className="container mx-auto relative top-20 sm:top-40 md:top-30 lg:top-10 xl:top-20">
        <div className="flex flex-col xl:flex-row xl:items-center">
          
          <div className="xl:w-4/5 mb-8 xl:mb-0 xl:absolute xl:z-10 xl:left-10 xl:pb-20">
            
            <h1 className="px-6 text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white leading-tight mb-0 xl:pr-12" style={{ textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}>
              Votre raccordement Enedis.
            </h1>
            <h1 className="px-6 text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white leading-tight mb-10 xl:pr-12" style={{ textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}>
              Un accompagnement sous tension.
            </h1>
            <p className="text-2xl text-white mb-10 px-6" style={{ textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}>
              Confiez vos démarches au nº 1 du marché : zéro stress, rapide et
              économique.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 mt-8 px-6">
              <Link
                href="/raccordement-electrique"
                className="bg-white text-black w-full text-center lg:w-auto font-bold hover:bg-[#149163] hover:text-white transition-all px-6 py-3 rounded-full"
              >
                Raccordement électrique
              </Link>
              <Link
                href="/modification-de-branchement"
                className="bg-white text-black w-full text-center lg:w-auto font-bold hover:bg-[#149163] hover:text-white transition-all px-6 py-3 rounded-full"
              >
                Modification de branchement
              </Link>
              <Link
                href="/mise-en-service"
                className="bg-white text-black w-full text-center lg:w-auto font-bold hover:bg-[#149163] hover:text-white transition-all px-16 py-3 rounded-full"
              >
                Mise en service
              </Link>
            </div>

            <div className="flex justify-center lg:justify-start items-center space-x-8 mt-10 relative">
              <div className="flex space-x-4 px-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 rounded-full p-1">
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#18a974" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-white">Experts de confiance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 rounded-full p-1">
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#18a974" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  </div>
                  <span className="text-white">Simple et fluide</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 rounded-full p-1">
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#18a974" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  </div>
                  <span className="text-white">Support 7j/7</span>
                </div>
              </div>

            </div>

          </div>

          <div className="xl:w-[68%] xl:h-[100%] xl:ml-auto">
            <div className="relative h-96 xl:h-[680px] overflow-hidden xl:left-[22%] rounded-none">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 4000 }}
                loop={true}
                className="h-full rounded-none"
              >
                {images.map((src, index) => (
                  <SwiperSlide
                    key={index}
                    className="w-full h-full rounded-none"
                  >
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      className="object-cover rounded-none h-full w-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Hero;
