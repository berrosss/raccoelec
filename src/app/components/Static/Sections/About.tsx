import React from "react";
import { IoPlay } from "react-icons/io5";

const About = () => {
  return (
    <div
    data-aos="fade-up"
    className="mb-20 px-5 lg:px-0 max-w-7xl mx-auto duration-[700ms] delay-[100ms] taos:opacity-0 taos:translate-y-[100px] [animation-iteration-count:infinite] taos-init"
    data-taos-class="mt-[100px] mb-[70px] max-w-7xl mx-auto duration-[700ms] delay-[100ms] taos:opacity-0 taos:translate-y-[100px] [animation-iteration-count:infinite] taos-init"
  >
    <div className="bg-[#1523dc21] flex justify-between flex-col md:flex-row-reverse items-center p-[30px] rounded-[16px] gap-5 sm:gap-8 md:gap-10">
      <div className="max-w-[600px] order-2 sm:order-1">
      <h3 className="sm:text-2xl lg:text-4xl xl:text-4xl text-zinc-950 font-bold mb-3 flex flex-col w-full text-justify sm:text-left block">
        À propos de <span className="text-[#1523dc]">Raccoelec</span>
      </h3>
        <p className="text-zinc-500 text-lg">
          Raccoelec est un spécialiste reconnu dans le domaine, offrant des services sur mesure pour accompagner particuliers et professionnels dans leurs démarches administratives et le suivi de leurs demandes de raccordement électrique à travers toute la France.
        </p>
      </div>
      <div
        className="order-1 sm:order-2 w-full h-64 bg-cover bg-center rounded-[16px] flex justify-center items-center"
        style={{ backgroundImage: 'url("/assets/about.webp")' }}
      >
        <button className="playbtn relative z-10 flex justify-center items-center h-28 w-28 bg-white rounded-full shadow-md">
          <IoPlay className="text-[#1523dc] size-14" />
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default About;
