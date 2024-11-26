import React from "react";
import Image from "next/image";
import HeroImage from "../../../../../public/assets/hero_image.jpg"
import Link from "next/link";

const Hero = () => {
  return (
    <header className="bg-[#1523dc] pt-6 overflow-hidden mb-20">
      <div className="container mx-auto px-4 py-12 pb-0 relative">
        <div className="flex flex-col xl:flex-row xl:items-center">
          <div className="xl:w-3/5 mb-8 xl:mb-0 xl:absolute xl:z-10 xl:top-32 xl:left-10">
            <h1
              className="text-4xl md:text-5xl xl:text-5xl font-bold text-white leading-tight mb-4 xl:pr-12"
              style={{ textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}
            >
              Votre projet est unique.
              <br />
              Notre accompagnement aussi.
            </h1>
            <p
              className="text-2xl text-white mb-6"
              style={{ textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}
            >
              Confiez vos démarches au nº 1 du marché : zéro stress, rapide et
              économique.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
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
            <div className="flex justify-center lg:justify-start items-center space-x-8 mt-20 relative xl:left-28">
              <div className="flex justify-center items-center flex-col">
                <img
                  src="https://raccoelec.fr/wp-content/uploads/2024/06/Google_logo-svg.png"
                  alt="Google"
                  className="w-[100px]"
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
                <img
                  src="https://raccoelec.fr/wp-content/uploads/2024/06/Avis_Verifies-1.webp"
                  alt="Google"
                  className="w-[130px]"
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
            </div>
          </div>
          <div className="xl:w-[68%] xl:ml-auto">
            {/* Carousel placeholder */}
            <div className="relative h-96 xl:h-[600px] overflow-hidden xl:left-[22%]">
              <Image
                src={HeroImage}
                height={0}
                width={0}
                alt="Concert crowd"
                className="w-full h-full object-cover"
              />
              {/* Add carousel controls here if needed */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
