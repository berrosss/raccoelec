import Link from "next/link";
import React from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import FooterBar from "./FooterBar";

const menuItems = [
  {
    label: "Demander estimation",
    href: "/demander-estimation",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Contact",
    href: "/contact",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Nouveautés",
    href: "/blog",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
];

const menuItems2 = [
  {
    label: "Raccordement électrique",
    href: "/raccordement-electrique",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Modification de branchement",
    href: "/modification-de-branchement",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Mise en service",
    href: "/mise-en-service",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
];

const menuItems3 = [
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Terms of Use",
    href: "/terms-of-use",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Cookies Policy",
    href: "/cookies-policy",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
];

const Footer = () => {
  return (
    <>
      <FooterBar />
      <div className="py-10 bg-[#283136] pb-5 px-5 lg:px-0">
        <div className="max-w-7xl lg:max-w-6xl mx-auto">
          <div className="lg:flex gap-10">
            <div className="lg:w-3/12">
              <Link href="/">
                <img
                  src="https://raccoelec.fr/wp-content/uploads/2024/06/template-2-1-1024x164.png"
                  alt="Logo"
                  className="w-[200px] mb-5"
                />
              </Link>
              <p className="text-white text-sm mb-1">
                Raccoelec est un portail d&lsquo;informations légales et financières
                sur les entreprises françaises inscrites au registre du commerce
                et des sociétés. Consultez les bilans, les dirigeants et les
                données publiques des entreprises en toute simplicité.
              </p>
            </div>
            <div className="lg:w-2/12">
              <ul className="space-y-2 mt-10 lg:mt-0">
                {menuItems.map((item, index) => (
                  <li key={index} className="flex justify-start items-center">
                    <Link
                      href={item.href}
                      className="text-white text-[13px] uppercase hover:text-[#18a974] transition-all"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-2/12">
              <ul className="space-y-2 mt-10 lg:mt-0">
                {menuItems2.map((item, index) => (
                  <li key={index} className="flex justify-start items-center">
                    <Link
                      href={item.href}
                      className="text-white text-xs uppercase hover:text-[#18a974] transition-all"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-2/12">
              <ul className="space-y-2 mt-10 lg:mt-0">
                {menuItems3.map((item, index) => (
                  <li key={index} className="flex justify-start items-center">
                    <Link
                      href={item.href}
                      className="text-white text-[13px] uppercase hover:text-[#18a974] transition-all"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-3/12 mt-10 lg:mt-0">
              <a href="tel:+212707029991">
                <button className="bg-white rounded-full text-sm font-semibold py-2 px-5 flex justify-center items-center">
                  <p className="inline-block text-xl">
                    {" "}
                    <span>+212 7 07 02 99 91</span>
                  </p>
                </button>
              </a>
              <p className="text-gray-300 text-sm max-w-[150px] mt-8">
                Du lundi au vendredi De 9h à 19h
              </p>
              {/* <div className="mt-8 flex justify-start items-center gap-1">
              <a href="https://www.facebook.com/raccoelec">
                <fafacebooksquare className="text-white text-3xl cursor-pointer hover:text-[#18a974] transition-all"></fafacebooksquare>
              </a>
              <a href="https://www.twitter.com/raccoelec">
                <fatwittersquare className="text-white text-3xl cursor-pointer hover:text-[#18a974] transition-all"></fatwittersquare>
              </a>
              <a href="https://www.facebook.com/raccoelec">
                <fafacebooksquare className="text-white text-3xl cursor-pointer hover:text-[#18a974] transition-all"></fafacebooksquare>
              </a>
              <a href="https://www.twitter.com/raccoelec">
                <fatwittersquare className="text-white text-3xl cursor-pointer hover:text-[#18a974] transition-all"></fatwittersquare>
              </a>
              <a href="https://www.facebook.com/raccoelec">
                <fafacebooksquare className="text-white text-3xl cursor-pointer hover:text-[#18a974] transition-all"></fafacebooksquare>
              </a>
              <a href="https://www.twitter.com/raccoelec">
                <fatwittersquare className="text-white text-3xl cursor-pointer hover:text-[#18a974] transition-all"></fatwittersquare>
              </a>
            </div> */}
            </div>
          </div>
        </div>
        <div className="text-zinc-50 text-xs font-semibold uppercase text-center mt-12">
          ©️ Copyright Raccoeleec 2024. by berros
        </div>
      </div>
    </>
  );
};

export default Footer;
