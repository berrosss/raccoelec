import React from "react";
import Image from "next/image";

interface Service {
  id: React.Key | null | undefined;
  imgSrc: string;
  title: string;
  description: string;
  buttonLink: string;
  buttonText: string;
  animation: string;
  class?: string;
}

const Tab2 = () => {
  const services: Service[] = [
    {
      id: 1,
      imgSrc: "/assets/services/deplacement de compteur.jpg",
      title: "Déplacement de compteur",
      description: "Déplacement d'un compteur Linky et/ou de son disjoncteur.",
      buttonText: "Faire ma demande",
      buttonLink: "/modification-de-branchement",
      animation: "fade-right",
      class: "animate-fromLeft",
    },
    {
      id: 2,
      imgSrc: "/assets/services/modification de branchement.jpg",
      title: "Modification de branchement",
      description:
        "Déplacement d'un branchement électrique (aérien ou sous-terrain).",
      buttonText: "Faire ma demande",
      buttonLink: "/modification-de-branchement",
      animation: "fade-up",
    },
    {
      id: 3,
      imgSrc: "/assets/services/supression de branchement electrique.jpg",
      title: "Suppression de branchement électrique",
      description: "Retrait ou suppression d'un compteur Linky",
      buttonText: "Faire ma demande",
      buttonLink: "/modification-de-branchement",
      animation: "fade-left",
      class: "animate-fromRight",
    },
  ];

  return (
    <div className="max-w-7xl">
      <div className="w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {services.map((service) => (
            <div
              key={service.id}
              data-aos={service.animation}
              data-aos-duration="20"
              data-aos-once="true"
              className={`
              relative bg-white rounded-2xl border border-[#1523dc]
              transform transition-transform duration-300 hover:scale-105
              p-4 flex flex-col
              ${service.class || ""}
            `}
            >
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src={service.imgSrc}
                  alt={service.title}
                  fill
                  className="rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>

              <h3 className="text-zinc-900 text-center text-xl font-bold mb-3">
                {service.title}
              </h3>

              <p className="text-[#69798d] text-sm text-center mb-6 flex-grow">
                {service.description}
              </p>

              <div className="flex justify-center">
                <a
                  href={service.buttonLink}
                  className="inline-block text-white font-semibold text-md bg-[#1523dc] py-3 px-8 rounded-md hover:bg-[#1219a5] transition-colors"
                >
                  {service.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tab2;
