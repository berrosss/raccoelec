"use client";
import React, { useState } from "react";
import Tab1 from "./Features/Tab1";
import Tab2 from "./Features/Tab2";
import Tab3 from "./Features/Tab3";

const Features = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
      <div className="flex justify-center items-center flex-col mb-20 px-5 lg:px-0" id="commencer-ma-demande">
        <h2 className="text-3xl sm:text-3xl text-zinc-950 font-bold text-center mb-2">
          Les demandes de <span className="text-[#1623dc]">raccordement Enedis</span>
        </h2>
        <p className="text-zinc-700 text-[16px] sm:text-lg max-w-[800px] text-center">
          Un seul portail raccordement.
        </p>
        <p className="text-zinc-700 mb-10 text-[16px] sm:text-lg max-w-[800px] text-center">
          pour toutes vos demandes de raccordement Enedis.
        </p>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setActiveTab(1)}
              className={`py-4 px-6 rounded-lg font-semibold transition-all duration-100 ease-in-out text-sm sm:text-base
                ${
                  activeTab === 1
                    ? "bg-gradient-to-r from-[#2575fc] to-[#6a11cb] text-white"
                    : "bg-white border border-gray-300 text-[#1523dc] hover:bg-gray-50"
                }`}
            >
              Raccordement électrique
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`py-4 px-6 rounded-lg font-semibold transition-all duration-100 ease-in-out text-sm sm:text-base
                ${
                  activeTab === 2
                    ? "bg-gradient-to-r from-[#2575fc] to-[#6a11cb] text-white"
                    : "bg-white border border-gray-300 text-[#1523dc] hover:bg-gray-50"
                }`}
            >
              Modification de branchement
            </button>
            <button
              onClick={() => setActiveTab(3)}
              className={`py-4 px-6 rounded-lg font-semibold transition-all duration-100 ease-in-out text-sm sm:text-base
                ${
                  activeTab === 3
                    ? "bg-gradient-to-r from-[#2575fc] to-[#6a11cb] text-white"
                    : "bg-white border border-gray-300 text-[#1523dc] hover:bg-gray-50"
                }`}
            >
              Mise en service
            </button>
          </div>

          <div className="relative">
            <div className={`transition-all duration-300 ease-in-out transform ${activeTab === 1 ? "block opacity-100 translate-y-0 scale-100" : "hidden opacity-0"}`}>
              <Tab1 />
            </div>

            <div className={`transition-all duration-300 ease-in-out transform ${activeTab === 2 ? "block opacity-100 translate-y-0 scale-100" : "hidden opacity-0"}`}>
              {/* <Tab2 /> */}
            </div>

            <div className={`transition-all duration-300 ease-in-out transform ${activeTab === 3 ? "block opacity-100 translate-y-0 scale-100" : "hidden opacity-0"}`}>
              {/* <Tab3 /> */}
            </div>
          </div>
        </div>

      </div>
  );
};

export default Features;
