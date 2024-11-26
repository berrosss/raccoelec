"use client";
import React, { useState } from "react";
import Tab1 from "./Features/Tab1";
import Tab2 from "./Features/Tab2";
import Tab3 from "./Features/Tab3";

const Features = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex justify-center items-center flex-col mb-20 px-5 lg:px-0" id="commencer-ma-demande">
      <h2 className="text-2xl sm:text-3xl text-zinc-950 font-bold text-center mb-2">
        Nous sommes là pour vous accompagner
      </h2>
      <p className="text-zinc-700 mb-10 text-[16px] sm:text-lg max-w-[800px] text-center">
        Découvrez nos services complets de raccordement électrique, comprenant
        l&#39;installation, la maintenance préventive, le dépannage
        d&ldquo;urgence et la conformité aux normes en vigueur. Nos électriciens
        certifiés sont là pour vous garantir une tranquillité d&#39;esprit
        totale.
      </p>

      {/* Tabs Container */}
      <div className="w-full max-w-[1200px]">
        {/* Tab Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setActiveTab(1)}
            className={`py-4 px-6 rounded-lg font-semibold transition-all duration-500 ease-in-out text-sm sm:text-base
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
            className={`py-4 px-6 rounded-lg font-semibold transition-all duration-500 ease-in-out text-sm sm:text-base
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
            className={`py-4 px-6 rounded-lg font-semibold transition-all duration-500 ease-in-out text-sm sm:text-base
              ${
                activeTab === 3
                  ? "bg-gradient-to-r from-[#2575fc] to-[#6a11cb] text-white"
                  : "bg-white border border-gray-300 text-[#1523dc] hover:bg-gray-50"
              }`}
          >
            Mise en service
          </button>
        </div>

        {/* Tab Content */}
        <div className="relative">
          {/* Content for Tab 1 */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              activeTab === 1
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-4 scale-95 absolute"
            }`}
          >
            <Tab1 />
          </div>

          {/* Content for Tab 2 */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              activeTab === 2
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-4 scale-95 absolute"
            }`}
          >
            <Tab2 />
          </div>

          {/* Content for Tab 3 */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              activeTab === 3
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-4 scale-95 absolute"
            }`}
          >
            <Tab3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
