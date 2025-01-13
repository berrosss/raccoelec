"use client";
import React, { useEffect } from "react";
import { BiSupport } from "react-icons/bi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoMdPaper } from "react-icons/io";
import { IoFolderOpenOutline } from "react-icons/io5";
import { LuFileCheck2 } from "react-icons/lu";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Timeline = () => {

  useEffect(() => {
    AOS.init();
  }, []);

  // Timeline Items
  const timelineItems = [
    {
      title: "Étude de votre Demande",
      description: "Nos experts analysent votre demande de raccordement et assurent sa conformité, vous offrant un accompagnement personnalisé à chaque étape.",
      icon: IoMdPaper,
      isCompleted: true,
    },
    {
      title: "Dépôt du dossier ",
      description: "Vous constituez votre dossier avec l'aide de nos équipes. ",
      icon: IoFolderOpenOutline,
      isCompleted: true,
    },
    {
      title: "Appel d'un Expert Enedis",
      description: "Nous organisons un rendez-vous dans les meilleurs délais avec un expert du gestionnaire de réseau pour accélérer votre démarche de raccordement et garantir une prise en charge rapide de votre projet.",
      icon: BiSupport,
      isCompleted: true,
    },
    {
      title: "Réalisation des Travaux",
      description : "Nous vérifions avec le gestionnaire si des informations ou documents supplémentaires sont nécessaires afin d'accélérer la réalisation du raccordement et garantir un déroulement rapide et efficace.",
      icon: FaRegPenToSquare,
      isCompleted: true,
    },
    {
      title: "Mise en Service",
      description: "représente la dernière étape avant que vous ne puissiez signer votre contrat avec le fournisseur d'électricité de votre choix.",
      icon: LuFileCheck2,
      isCompleted: false,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen mb-20 px-5 lg:px-0 mt-16">
      <div className="w-full max-w-6xl "  >
        <h1 className="text-4xl font-bold py-16">
            <span className="text-zinc-950">Nous <span className="text-[#203edc]">raccordons</span> votre projet en illuminant vos <span className="text-green-500">démarches.</span></span>
        </h1>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-gray-200" />

          {/* Timeline Items */}
          {timelineItems.map((item, index) => (
            <div
              id={`timeline-item-${index}`}
              className="flex items-center mb-8"
              key={index}
            >
              {index % 2 === 0 ? (
                <>
                  <div  data-aos="fade-up" className="w-1/2 pr-8">
                    <div className="timeline-card bg-white p-4 rounded-lg shadow-md">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div
                      className={`timeline-icon ${
                        item.isCompleted ? "bg-green-500" : "bg-gray-400"
                      } w-8 h-8 rounded-full flex items-center justify-center`}
                    >
                      <item.icon className="text-white size-5" />
                    </div>
                  </div>
                  <div className="w-1/2" />
                </>
              ) : (
                <>
                  <div  className="w-1/2" />
                  <div className="relative z-10">
                    <div
                      className={`timeline-icon ${
                        item.isCompleted ? "bg-green-500" : "bg-gray-400"
                      } w-8 h-8 rounded-full flex items-center justify-center`}
                    >
                      <item.icon className="text-white size-5" />
                    </div>
                  </div>
                  <div className="w-1/2 pl-8" data-aos="fade-up">
                    <div className="timeline-card bg-white p-4 rounded-lg shadow-md">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
