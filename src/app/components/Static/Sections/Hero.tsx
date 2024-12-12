'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = () => {

  const images = [
    "/assets/hero/1.jpg", 
    "/assets/hero/2.jpeg",
    "/assets/hero/3.jpg",
  ];
 
  return (
    <header className="bg-[#1523dc] pt-6 overflow-hidden mb-20">
      <div className="container mx-auto px-4 py-12 pb-0 relative">
        <div className="flex flex-col xl:flex-row xl:items-center">
          <div className="xl:w-4/5 mb-8 xl:mb-0 xl:absolute xl:z-10 xl:top-32 xl:left-10">
            <h1
              className=" text-4xl md:text-5xl xl:text-5xl font-bold text-white leading-tight mb-10 xl:pr-12"
              style={{ textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}
            >
              Votre projet est unique.
              <br />
              Notre accompagnement aussi.
            </h1>
            <p
              className="text-2xl text-white mb-20"
              style={{ textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}
            >
              Confiez vos démarches au nº 1 du marché : zéro stress, rapide et
              économique.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 mt-8">
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
              <Link href="/mise-en-service" className="bg-white text-black w-full text-center lg:w-auto font-bold hover:bg-[#149163] hover:text-white transition-all px-16 py-3 rounded-full">
                Mise en service
              </Link>
            </div>

            {/* <div className="flex justify-center lg:justify-start items-center space-x-8 mt-20 relative xl:left-28">
              <div className="flex justify-center items-center flex-col">
                <Image
                  src="https://raccoelec.fr/wp-content/uploads/2024/06/Google_logo-svg.png"
                  alt="Google"
                  className="w-[100px]"
                  height={100}
                  width={100}
                />
                <div className="flex items-center">
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-yellow-400 text-2xl">★</span>
                </div>
                <p className="font-bold text-white text-md text-center">
                  4.4/5 | 10000+ reviews
                </p>
              </div>
              <div className="flex justify-center items-center flex-col">
                <Image
                  src="https://raccoelec.fr/wp-content/uploads/2024/06/Avis_Verifies-1.webp"
                  alt="Google"
                  className="w-[130px]"
                  height={100}
                  width={130}
                />
                <div className="flex items-center">
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-yellow-400 text-2xl">★</span>
                </div>
                <p className="font-bold text-white text-md text-center">
                  4.4/5 | 10000+ reviews
                </p>
              </div>
            </div> */}

          </div>

          <div className="xl:w-[68%] xl:ml-auto">
            {/* Carousel placeholder */}
            <div className="relative h-96 xl:h-[600px] overflow-hidden xl:left-[22%] rounded-none">
              

            
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 4000 }}
              loop={true}
              className="h-full rounded-none"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index} className="w-full h-full rounded-none">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="object-cover rounded-none"
                    fill
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
