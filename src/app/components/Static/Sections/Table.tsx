"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import Image from "next/image";

// Define the type for your table data
interface TableData {
  id: number;
  img: string;
  name: string;
  date: string;
  age: number;
  dpts: string;
  chifreAffaire: string;
  dateChifreAffaire: string;
  resultNet: string;
  dateResultNet: string;
  delaiPaiment: string;
  colorDelaiPaiment: string;
  dateDelaiPaiment: string;
  svg1: boolean;
  svg2: boolean;
}

const Table = () => {
  const initialData: TableData[] = [
    { id: 1, img: '/assets/tablebrands/1.webp', name:"TOTALENERGIES SE", date: "01/01/1954", age: 70, dpts:"92", chifreAffaire: "237.1", dateChifreAffaire:"2023", resultNet:"87.9", dateResultNet: "2022", delaiPaiment: "104", colorDelaiPaiment: "bg-amber-700", dateDelaiPaiment: "103", svg1: true, svg2: false },
    { id: 2, img: '/assets/tablebrands/2.webp', name:"ELECTRICITE DE FRANCE", date: "01/01/1955", age: 69, dpts:"75", chifreAffaire: "90.5", dateChifreAffaire:"2023", resultNet:"7.7", dateResultNet: "2023", delaiPaiment: "76", colorDelaiPaiment: "bg-rose-700", dateDelaiPaiment: "76", svg1: false, svg2: false },
    { id: 3, img: '/assets/tablebrands/3.webp', name:"ENGIE", date: "01/01/1954", age: 20, dpts:"92", chifreAffaire: "509", dateChifreAffaire:"2022", resultNet:"9.6", dateResultNet: "2023", delaiPaiment: "76", colorDelaiPaiment: "bg-lime-500", dateDelaiPaiment: "46", svg1: false, svg2: true },
    { id: 4, img: '/assets/tablebrands/1.webp', name:"TOTALENERGIES MARKETING FRANCE", date: "25/03/2011", age: 20, dpts:"24", chifreAffaire: "670", dateChifreAffaire:"2015", resultNet:"77.8", dateResultNet: "2022", delaiPaiment: "70", colorDelaiPaiment: "bg-rose-700", dateDelaiPaiment: "37", svg1: true, svg2: false },
    { id: 5, img: '/assets/tablebrands/5.webp', name:"ENEDIS", date: "18/12/2002", age: 20, dpts:"92", chifreAffaire: "280", dateChifreAffaire:"2020", resultNet:"9.3", dateResultNet: "2010", delaiPaiment: "55", colorDelaiPaiment: "bg-lime-500", dateDelaiPaiment: "76", svg1: true, svg2: false },
    { id: 6, img: '/assets/tablebrands/6.webp', name:"RTE RESEAU DE TRANSPORT D ELECTRICITE", date: "19/12/2002", age: 20, dpts:"92", chifreAffaire: "670", dateChifreAffaire:"2022", resultNet:"88.5", dateResultNet: "2020", delaiPaiment: "88", colorDelaiPaiment: "bg-rose-700", dateDelaiPaiment: "99", svg1: true, svg2: true },
  ];

  const [shuffledData, setShuffledData] = useState<TableData[]>(initialData);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [tableSectionRef, isTableSectionRefVisible] = useIntersectionObserver({
    threshold: 0.5,
  });
  
  // Wrap animateShuffle in useCallback
  const animateShuffle = useCallback((newData: TableData[]) => {
    if (!tableRef.current) return;
  
    const rows = Array.from(tableRef.current.querySelectorAll("tbody.tr"));
    const initialPositions = rows.map((row) => (row as HTMLElement).getBoundingClientRect());
  
    setShuffledData(newData);
  
    setTimeout(() => {
      const newPositions = rows.map((row) => (row as HTMLElement).getBoundingClientRect());
  
      rows.forEach((row, i) => {
        const deltaY = initialPositions[i].top - newPositions[i].top;
  
        gsap.fromTo(
          row as HTMLElement,
          { y: deltaY },
          { y: 0, duration: 3, ease: "power2.inOut" }
        );
      });
    }, 0);
  }, []);
  
  // Shuffle and animate
  const shuffleData = useCallback(() => {
    setShuffledData((prevShuffledData) => {
      const newData = [...prevShuffledData].sort(() => Math.random() - 0.5);
      animateShuffle(newData);
      return newData;
    });
  }, [animateShuffle]);
  
  useEffect(() => {
    if (isTableSectionRefVisible) {
      shuffleData();
    }
  }, [isTableSectionRefVisible, shuffleData]);

  return (
    <section className="mb-20" ref={tableSectionRef}>
      <div className="mt-3 mb-20 overflow-x-auto">
        <div className="max-w-7xl mx-auto">
        <div className="container mx-auto p-0" >
          <table ref={tableRef}  className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-[#1523dc]">
              <tr>
                <th scope="col" className="p-4 hidden sm:table-cell"></th>
                <th scope="col" className="px-6 py-2 text-center text-xs tracking-wider">
                  Entreprises
                  <div className="text-xs text-green-300 mb-1">au total</div>
                  <b className="px-2 py-[2px] rounded text-white bg-[#000000] uppercase font-semibold text-xs w-auto mt-1 tracking-wide">
                    <svg
                      fill="#047857"
                      height="13px"
                      className="inline mr-0.5"
                      width="13px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 315.424 315.424"
                      xmlSpace="preserve"
                      transform="rotate(90)"
                      stroke="#047857"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="M311.929,222.266l-96.119-67.342c-1.413-0.99-2.783-1.513-4.307-1.513c-3.307,0-6.471,2.512-6.471,7.313v41.05H19.886 c-4.962,0-8.854,4.132-8.854,9.094v35.563c0,4.962,3.892,9.343,8.854,9.343h185.146v40.81c0,4.801,3.167,7.19,6.474,7.19 c0.001,0-0.089,0-0.089,0c1.524,0,3.032-0.461,4.445-1.451l96.09-67.306c2.214-1.55,3.473-3.864,3.473-6.375 S314.142,223.815,311.929,222.266z"></path>
                          <path d="M104.073,162.136L104.073,162.136c2.082,0,4.137-0.958,5.371-2.63c0.939-1.271,1.588-2.891,1.588-4.683v-41.05h184.476 c4.963,0,8.524-4.132,8.524-9.094V69.117c0-4.962-3.561-9.343-8.524-9.343H111.032v-40.81c0-4.801-3.502-7.313-6.809-7.313 c-1.524,0-3.154,0.523-4.567,1.513L3.502,80.5C1.289,82.051,0,84.38,0,86.891c0,2.511,1.26,4.84,3.473,6.391l96.115,67.342 C101.001,161.613,102.549,162.136,104.073,162.136z"></path>
                        </g>
                      </g>
                    </svg>
                    11.7 m
                  </b>
                </th>
                <th scope="col" className="px-6 py-2 text-center text-xs tracking-wider hidden sm:table-cell">
                  Creation
                  <div className="text-xs text-green-300 mb-1">en moyenne</div>
                  <b className="px-2 py-[2px] rounded text-white bg-[#000] uppercase font-semibold text-xs w-auto mt-1 tracking-wide">
                    <svg
                      fill="#047857"
                      height="13px"
                      className="inline mr-0.5"
                      width="13px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 315.424 315.424"
                      xmlSpace="preserve"
                      transform="rotate(90)"
                      stroke="#047857"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="M311.929,222.266l-96.119-67.342c-1.413-0.99-2.783-1.513-4.307-1.513c-3.307,0-6.471,2.512-6.471,7.313v41.05H19.886 c-4.962,0-8.854,4.132-8.854,9.094v35.563c0,4.962,3.892,9.343,8.854,9.343h185.146v40.81c0,4.801,3.167,7.19,6.474,7.19 c0.001,0-0.089,0-0.089,0c1.524,0,3.032-0.461,4.445-1.451l96.09-67.306c2.214-1.55,3.473-3.864,3.473-6.375 S314.142,223.815,311.929,222.266z"></path>
                          <path d="M104.073,162.136L104.073,162.136c2.082,0,4.137-0.958,5.371-2.63c0.939-1.271,1.588-2.891,1.588-4.683v-41.05h184.476 c4.963,0,8.524-4.132,8.524-9.094V69.117c0-4.962-3.561-9.343-8.524-9.343H111.032v-40.81c0-4.801-3.502-7.313-6.809-7.313 c-1.524,0-3.154,0.523-4.567,1.513L3.502,80.5C1.289,82.051,0,84.38,0,86.891c0,2.511,1.26,4.84,3.473,6.391l96.115,67.342 C101.001,161.613,102.549,162.136,104.073,162.136z"></path>
                        </g>
                      </g>
                    </svg>
                    2011
                  </b>
                </th>
                <th scope="col" className="px-6 py-2 text-center text-xs tracking-wider hidden sm:table-cell">
                  Dpts
                  <div className="text-xs text-green-300 mb-1">au total</div>
                  <b className="px-2 py-[2px] rounded text-white bg-[#000] uppercase font-semibold text-xs w-auto mt-1 tracking-wide">
                    <svg
                      fill="#047857"
                      height="13px"
                      className="inline mr-0.5"
                      width="13px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 315.424 315.424"
                      xmlSpace="preserve"
                      transform="rotate(90)"
                      stroke="#047857"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="M311.929,222.266l-96.119-67.342c-1.413-0.99-2.783-1.513-4.307-1.513c-3.307,0-6.471,2.512-6.471,7.313v41.05H19.886 c-4.962,0-8.854,4.132-8.854,9.094v35.563c0,4.962,3.892,9.343,8.854,9.343h185.146v40.81c0,4.801,3.167,7.19,6.474,7.19 c0.001,0-0.089,0-0.089,0c1.524,0,3.032-0.461,4.445-1.451l96.09-67.306c2.214-1.55,3.473-3.864,3.473-6.375 S314.142,223.815,311.929,222.266z"></path>
                          <path d="M104.073,162.136L104.073,162.136c2.082,0,4.137-0.958,5.371-2.63c0.939-1.271,1.588-2.891,1.588-4.683v-41.05h184.476 c4.963,0,8.524-4.132,8.524-9.094V69.117c0-4.962-3.561-9.343-8.524-9.343H111.032v-40.81c0-4.801-3.502-7.313-6.809-7.313 c-1.524,0-3.154,0.523-4.567,1.513L3.502,80.5C1.289,82.051,0,84.38,0,86.891c0,2.511,1.26,4.84,3.473,6.391l96.115,67.342 C101.001,161.613,102.549,162.136,104.073,162.136z"></path>
                        </g>
                      </g>
                    </svg>
                    105
                  </b>
                </th>
                <th scope="col" className="px-6 py-2 text-center text-xs tracking-wider hidden sm:table-cell">
                  Chiffre D&lsquo;affaires
                  <div className="text-xs text-green-300 mb-1">en moyenne</div>
                  <b className="px-2 py-[2px] rounded text-white bg-[#000000] uppercase font-semibold text-xs w-auto mt-1 tracking-wide">
                    <svg
                      fill="#047857"
                      height="13px"
                      className="inline mr-0.5"
                      width="13px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 315.424 315.424"
                      xmlSpace="preserve"
                      transform="rotate(90)"
                      stroke="#047857"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="M311.929,222.266l-96.119-67.342c-1.413-0.99-2.783-1.513-4.307-1.513c-3.307,0-6.471,2.512-6.471,7.313v41.05H19.886 c-4.962,0-8.854,4.132-8.854,9.094v35.563c0,4.962,3.892,9.343,8.854,9.343h185.146v40.81c0,4.801,3.167,7.19,6.474,7.19 c0.001,0-0.089,0-0.089,0c1.524,0,3.032-0.461,4.445-1.451l96.09-67.306c2.214-1.55,3.473-3.864,3.473-6.375 S314.142,223.815,311.929,222.266z"></path>
                          <path d="M104.073,162.136L104.073,162.136c2.082,0,4.137-0.958,5.371-2.63c0.939-1.271,1.588-2.891,1.588-4.683v-41.05h184.476 c4.963,0,8.524-4.132,8.524-9.094V69.117c0-4.962-3.561-9.343-8.524-9.343H111.032v-40.81c0-4.801-3.502-7.313-6.809-7.313 c-1.524,0-3.154,0.523-4.567,1.513L3.502,80.5C1.289,82.051,0,84.38,0,86.891c0,2.511,1.26,4.84,3.473,6.391l96.115,67.342 C101.001,161.613,102.549,162.136,104.073,162.136z"></path>
                        </g>
                      </g>
                    </svg>
                    12.7m€
                  </b>
                </th>
                <th scope="col" className="px-6 py-2 text-center text-xs tracking-wider hidden sm:table-cell">
                &nbsp; Resultat Net &nbsp;
                  <div className="text-xs text-green-300 mb-1">en moyenne</div>
                  <b className="px-2 py-[2px] rounded text-white bg-[#000000] uppercase font-semibold text-xs w-auto mt-1 tracking-wide">
                    <svg
                      fill="#047857"
                      height="13px"
                      className="inline mr-0.5"
                      width="13px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 315.424 315.424"
                      xmlSpace="preserve"
                      transform="rotate(90)"
                      stroke="#047857"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="M311.929,222.266l-96.119-67.342c-1.413-0.99-2.783-1.513-4.307-1.513c-3.307,0-6.471,2.512-6.471,7.313v41.05H19.886 c-4.962,0-8.854,4.132-8.854,9.094v35.563c0,4.962,3.892,9.343,8.854,9.343h185.146v40.81c0,4.801,3.167,7.19,6.474,7.19 c0.001,0-0.089,0-0.089,0c1.524,0,3.032-0.461,4.445-1.451l96.09-67.306c2.214-1.55,3.473-3.864,3.473-6.375 S314.142,223.815,311.929,222.266z"></path>
                          <path d="M104.073,162.136L104.073,162.136c2.082,0,4.137-0.958,5.371-2.63c0.939-1.271,1.588-2.891,1.588-4.683v-41.05h184.476 c4.963,0,8.524-4.132,8.524-9.094V69.117c0-4.962-3.561-9.343-8.524-9.343H111.032v-40.81c0-4.801-3.502-7.313-6.809-7.313 c-1.524,0-3.154,0.523-4.567,1.513L3.502,80.5C1.289,82.051,0,84.38,0,86.891c0,2.511,1.26,4.84,3.473,6.391l96.115,67.342 C101.001,161.613,102.549,162.136,104.073,162.136z"></path>
                        </g>
                      </g>
                    </svg>
                    8.8m€
                  </b>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center text-xs tracking-wider"
                >
                  Delai de paiement
                  <div className="text-xs text-green-300 mb-1">en moyenne</div>
                  <b className="px-2 py-[2px] rounded text-white bg-[#000000] uppercase font-semibold text-xs w-auto mt-1 tracking-wide">
                    <svg
                      fill="#047857"
                      height="13px"
                      className="inline mr-0.5"
                      width="13px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 315.424 315.424"
                      xmlSpace="preserve"
                      transform="rotate(90)"
                      stroke="#047857"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="M311.929,222.266l-96.119-67.342c-1.413-0.99-2.783-1.513-4.307-1.513c-3.307,0-6.471,2.512-6.471,7.313v41.05H19.886 c-4.962,0-8.854,4.132-8.854,9.094v35.563c0,4.962,3.892,9.343,8.854,9.343h185.146v40.81c0,4.801,3.167,7.19,6.474,7.19 c0.001,0-0.089,0-0.089,0c1.524,0,3.032-0.461,4.445-1.451l96.09-67.306c2.214-1.55,3.473-3.864,3.473-6.375 S314.142,223.815,311.929,222.266z"></path>
                          <path d="M104.073,162.136L104.073,162.136c2.082,0,4.137-0.958,5.371-2.63c0.939-1.271,1.588-2.891,1.588-4.683v-41.05h184.476 c4.963,0,8.524-4.132,8.524-9.094V69.117c0-4.962-3.561-9.343-8.524-9.343H111.032v-40.81c0-4.801-3.502-7.313-6.809-7.313 c-1.524,0-3.154,0.523-4.567,1.513L3.502,80.5C1.289,82.051,0,84.38,0,86.891c0,2.511,1.26,4.84,3.473,6.391l96.115,67.342 C101.001,161.613,102.549,162.136,104.073,162.136z"></path>
                        </g>
                      </g>
                    </svg>
                    68 jrs
                  </b>
                </th>
              </tr>
            </thead>
            <tbody>
              {shuffledData.map((item, index) => (
                <tr className={` bg-[#ffffff] fade-in border-b-2 border-gray-300 `} key={item.id} >
                  <td className="border-b-2 border-gray-300 w-4 p-2 text-center hidden sm:table-cell">
                    <div className="w-6 h-6 bg-[#203edc] rounded-full flex justify-center items-center text-white text-center">
                      {index + 1}
                    </div>
                  </td>
                  <td
                      scope="row"
                      className="flex items-center px-6 py-6 whitespace-nowrap dark:text-white truncate w-50"
                    >
                      <Image
                        decoding="async"
                        className="w-10 h-10 object-contain"
                        src={item.img}
                        alt="Jese image"
                        height={100}
                        width={100}
                      />
                      <div className="ps-3 flex-1 min-w-0">
                        <div className="text-black text-xs font-semibold uppercase truncate">{item.name}
                        </div>
                      </div>
                  </td>
                  <td className=" sm:pl-2 py-2 hidden hidden sm:table-cell">
                    <div className="flex items-center justify-center flex-col">
                      <div className="text-black text-xs font-semibold">
                        {item.date}
                      </div>
                      <div className="text-black text-xs font-normal">
                        {item.age}
                      </div>
                    </div>
                  </td>
                  <td className=" sm:pl-2 py-2 hidden sm:table-cell">
                    <div className="flex items-center justify-center flex-col">
                      <div className="text-black text-xs font-semibold">
                      {item.dpts}
                      </div>
                      <div className="text-black text-xs font-normal">Fr</div>
                    </div>
                  </td>
                  <td className=" sm:pl-2 py-2 hidden sm:table-cell">
                    <div className="flex items-center justify-center flex-col">
                      <div className="text-black text-xs font-semibold">
                      {item.chifreAffaire} md€
                        {(item.svg1) ? <svg
                            viewBox="0 0 24 24"
                            className="w-6 h-6 inline"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M7 7L17 17M17 17H8M17 17V8"
                                stroke="#ef4444"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                          </svg> : <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 inline"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M7 17L17 7M17 7H8M17 7V16"
                              stroke="#16a34a"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </svg>}
                      </div>
                      <div className="text-black text-xs font-normal">
                      {item.dateChifreAffaire}
                      </div>
                    </div>
                  </td>
                  <td className=" sm:pl-2 py-2 hidden sm:table-cell">
                    <div className="flex items-center justify-center flex-col">
                      <div className="text-black text-xs font-semibold">
                      {item.resultNet} md€
                      {(item.svg2) ? <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 inline"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M7 17L17 7M17 7H8M17 7V16"
                              stroke="#16a34a"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </svg> : <svg
                            viewBox="0 0 24 24"
                            className="w-6 h-6 inline"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M7 7L17 17M17 17H8M17 17V8"
                                stroke="#ef4444"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                          </svg>}
                      </div>
                      <div className="text-black text-xs font-normal">
                      {item.dateChifreAffaire}
                      </div>
                    </div>
                  </td>
                  <td className=" sm:pl-2 py-2">
                    <div className="flex items-center justify-center flex-col">
                      <div className={`text-white text-xs font-semibold ${item.colorDelaiPaiment} px-3 rounded`}>
                      {item.delaiPaiment} Jrs
                      </div>
                      <div className="text-black text-xs font-normal">
                        {item.dateDelaiPaiment}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
