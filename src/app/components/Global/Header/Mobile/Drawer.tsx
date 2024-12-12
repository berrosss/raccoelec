"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LuMenu } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";

const drawemenu = [
  {
    label: "Demander estimation",
    href: "/demander-estimation",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Nouveautés",
    href: "/blog",
  },
];

const drawemenu_bottom = [
  {
    label: "0970707070",
    href: "tel:0970707070",
    style:
      "py-2 px-4 rounded-full border-2 border-slate-300 font-medium text-slate-500 w-full",
  },
  {
    label: "Commencer ma demande",
    href: "#commencer-ma-demande",
    style:
      "py-2 pb-2.5 px-4 rounded-full bg-[#1523dc] font-medium border-2 border-[#1523dc] text-white w-full",
  },
];

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match this with the transition duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div>
      <button className="block lg:hidden" onClick={toggleDrawer}>
        <LuMenu className="text-slate-700 size-8 relative top-[1px]" />
      </button>
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-95 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-y-0 left-0 z-50 w-full bg-white p-8 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <nav className="">
              <div
                className={`text-white text-2xl font-bold flex justify-between items-center border-b-[1px] border-slate-200 pb-8`}
              >
                <Link href="/" aria-label="Raccoelec Logo">
                  <Image
                    src="/assets/logo2.png"
                    alt="Reccoelec Logo"
                    width={190}
                    height={0}
                  />
                </Link>
                <button onClick={toggleDrawer} className="">
                  <MdOutlineClose className={`text-gray-900 size-8`} />
                </button>
              </div>
              <div className="mt-10">
                <ul>
                  {drawemenu.map((item, index) => (
                    <li className="mb-2.5" key={index}>
                      <Link
                        href={item.href}
                        onClick={toggleDrawer}
                        className="text-slate-600 hover:text-slate-800 text-lg font-semibold"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="border-b-[1px] border-slate-200 my-5"></div>
                <ul>
                  {drawemenu_bottom.map((item, index) => (
                    <li className="mb-2.5" key={index}>
                      <Link href={item.href}>
                        <button onClick={toggleDrawer} className={item.style}>
                          {item.label}
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
