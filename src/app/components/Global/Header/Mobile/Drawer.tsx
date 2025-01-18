"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";

const drawemenu = [
  {
    label: "Raccordement Electrique",
    href: "/raccordement-electrique",
  },
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
      <div className="block lg:hidden flex gap-2">
          <a href='tel:0970707070' className="w-12 h-12 flex items-center justify-center rounded-full border-[1px] border-slate-700">
            <FaPhoneAlt className="text-slate-700 size-5 relative top-[1px]" />
          </a>
          <button onClick={toggleDrawer} className="w-12 h-12 flex items-center justify-center rounded-full border-[1px] border-slate-700">
            {isOpen ? (
              <MdOutlineClose className="text-slate-700 size-7 relative top-[1px]" />
            ) : (
              <LuMenu className="text-slate-700 size-7 relative top-[1px]" />
            )}
          </button>
      </div>

      <div
        className={`fixed inset-0 top-[60px] bg-white bg-opacity-40 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-x-0 z-50 w-full bg-white ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div>
            <nav className="">
              <div
                className={`text-white text-2xl font-bold flex justify-between items-center border-b-[1px] border-slate-200 pb-8`}
              >
                
              </div>
              <div className="">
                <ul>
                  {drawemenu.map((item, index) => (
                    <li className="border-b-[1px] py-4 px-8" key={index}>
                      <Link
                        href={item.href}
                        onClick={toggleDrawer}
                        className={`${item.label == "Nouveautés" ? "text-[#dabd1f]" : "text-slate-950"} hover:text-black text-lg font-semibold`}
                      >
                        {item.label}
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
