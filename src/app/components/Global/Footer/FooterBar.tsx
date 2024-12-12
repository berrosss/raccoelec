import React from "react";
import Image from 'next/image'

const FooterBar = () => {
  return (
    <div className="bg-gray-100 py-4">
      <div className="max-w-6xl mx-auto px-5 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start">
          <span className="text-gray-600 font-semibold text-md mb-4 lg:mb-0 mr-8">
            Dans les médias :
          </span>
          {/* Scrollable image container */}
          <div className="flex space-x-5 overflow-x-auto max-w-full">
            <Image
              src="https://raccoelec.fr/wp-content/uploads/2024/06/logo-lepoint.webp"
              alt="Le Point"
              className="h-6 opacity-75"
              width={90}
              height={100}
            />
            <Image
              src="https://raccoelec.fr/wp-content/uploads/2024/06/logo-lemonde.webp"
              alt="Le Monde"
              className="h-6 opacity-75"
              width={90}
              height={100}
            />
            <Image
              src="https://raccoelec.fr/wp-content/uploads/2024/06/logo-lefigaro.webp"
              alt="Le Figaro"
              className="h-6 opacity-75"
              width={90}
              height={100}
            />
            <Image
              src="https://raccoelec.fr/wp-content/uploads/2024/06/logo-laprovence.webp"
              alt="La Provence"
              className="h-6 opacity-75"
              width={90}
              height={100}
            />
            <Image
              src="https://raccoelec.fr/wp-content/uploads/2024/06/logo-francesoir.webp"
              alt="France Soir"
              className="h-6 opacity-75"
              width={90}
              height={100}
            />
            <Image
              src="https://raccoelec.fr/wp-content/uploads/2024/06/logo-forbes.webp"
              alt="Forbes"
              className="h-6 opacity-75"
              width={90}
              height={100}
            />
            <Image
              src="https://raccoelec.fr/wp-content/uploads/2024/06/logo-entreprendre.webp"
              alt="Entreprendre"
              className="h-6 opacity-75"
              width={90}
              height={100}
            />
            <Image
              src="https://raccoelec.fr/wp-content/uploads/2024/06/logo-challenges.webp"
              alt="Challenges"
              className="h-6 opacity-75"
              width={90}
              height={100}
            />
            <Image
              src="https://raccoelec.fr/wp-content/uploads/2024/06/logo-cadreetdirigeant.webp"
              alt="Cadre & Dirigeant"
              className="h-6 opacity-75"
              width={90}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
