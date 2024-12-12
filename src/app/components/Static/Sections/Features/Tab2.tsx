import React from "react";
import Image from "next/image";

// Define a type for the service object
interface Service {
  id: React.Key | null | undefined;
  imgSrc: string;
  title: string;
  description: string;
  buttonLink: string;
  buttonText: string;
  animation: string;
}

const Tab1 = () => {
  const services: Service[] = [
    {
      id: 1,
      imgSrc:
        "/assets/services/deplacement de compteur.jpg",
      title: "Déplacement de compteur",
      description:
        "Déplacement d’un compteur Linky et/ou de son disjoncteur.",
      buttonText: "Faire ma demande",
      buttonLink: "/modification-de-branchement",
      animation: "fade-right"
    },
    {
      id: 2,
      imgSrc:
        "/assets/services/modification de branchement.jpg",
      title: "Modification de branchement",
      description:
        "Déplacement d\’un branchement électrique (aérien ou sous-terrain).",
      buttonText: "Faire ma demande",
      buttonLink: "/modification-de-branchement",
      animation: "fade-up"
    },
    {
      id: 3,
      imgSrc:
        "/assets/services/supression de branchement electrique.jpg",
      title: "Suppression de branchement électrique",
      description:
        "Retrait ou suppression d\’un compteur Linky",
      buttonText: "Faire ma demande",
      buttonLink: "/modification-de-branchement",
      animation: "fade-left"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {services.map((service) => (
        <div
          data-aos={service.animation}
          data-aos-duration="20"
          data-aos-once="true"
          key={service.id}
          className="w-full p-4 border-[1px] border-[#1523dc] rounded-2xl group-hover:scale-105 group-focus:scale-105 transition-transform duration-[700ms] delay-[100ms] taos:opacity-0 taos:translate-y-[100px] [animation-iteration-count:infinite] taos-init"
          data-taos-class="w-full p-4 border-[1px] border-[#1523dc] rounded-2xl group-hover:scale-105 group-focus:scale-105 transition-transform duration-[700ms] delay-[100ms] taos:opacity-0 taos:translate-y-[100px] [animation-iteration-count:infinite] taos-init"
        >
          <Image
            className="rounded-2xl img-tabs"
            src={service.imgSrc}
            alt={service.title}  // You may want to uncomment this and provide a meaningful alt text.
            width={500}
            height={500}
          />
          <h3 className="text-zinc-900 text-center mt-3 text-[20px] font-[700] mb-3">
            {service.title}
          </h3>
          <p className="text-[#69798d] text-[15px] text-center mb-5">
            {service.description}
          </p>
          <div className="flex justify-center items-center">
            <a href={service.buttonLink}>
              <button className="text-white font-semibold text-md bg-[#1523dc] py-3.5 px-8 rounded-md">
                {service.buttonText}
              </button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tab1;
