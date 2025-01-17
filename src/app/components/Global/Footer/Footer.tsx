import Link from "next/link";
import React from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import FooterBar from "./FooterBar";
import Image from 'next/image'

const menuItems = [
  {
    label: "Raccordement définitif",
    href: "/raccordement-electrique",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Viabilisation terrain",
    href: "/raccordement-electrique",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Branchement provisoire",
    href: "/raccordement-electrique",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Compteur de chantier",
    href: "/raccordement-electrique",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Mettre un coffret électrique",
    href: "/raccordement-electrique",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Nouveau branchement",
    href: "/raccordement-electrique",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  }
];

const menuItems2 = [
  {
    label: "Déplacement de compteur",
    href: "/modification-de-branchement",
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
    label: "Panneaux solaires",
    href: "/mise-en-service",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Compteur Linky",
    href: "/mise-en-service",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Modification de puissance",
    href: "/mise-en-service",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Suppression d'un compteur",
    href: "/mise-en-service",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
];

const menuItems3 = [
  {
    label: "Condition générales",
    href: "/condition-general",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Qui sommes-nous ?",
    href: "/apropos-nous",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Contactez-nous",
    href: "/contact",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Mentions légales",
    href: "/mentions-legales",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Paiment sécurisés",
    href: "/paiment-securises",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  },
  {
    label: "Trouver votre parcelle",
    href: "https://cadastre.data.gouv.fr/",
    icon: (
      <MdOutlineChevronRight className="size-6 relative -top-[1px] inline-block text-[#18a974]" />
    ),
  }
];

const Footer = () => {
  return ( 
    <>
      <FooterBar />
      <div className="py-10 bg-[#283136] pb-5 px-5 lg:px-0">
        <div className="max-w-7xl lg:max-w-7xl mx-auto">
          
          <div className="lg:w-12/12">
              <Link href="/">
                <Image
                  src="/assets/logo1.png"
                  alt="Logo"
                  className="w-[160px] mb-5"
                  width={160}
                  height={100}
                />
              </Link>
          </div>

          <div className="lg:flex gap-6">

            <div className="lg:w-4/12">
              <p className="text-white text-xs mb-1 text-justify leading-6">
              Raccoelec est une solution 100% dédiée à l&apos;accompagnement des clients dans leurs démarches de raccordement électrique : nouveau raccordement, installation de compteur de chantier, déplacement de compteur, et toutes les demandes auprès d&apos;Enedis, EDF ou ENGIE. Grâce à notre expertise, nous offrons un service complet, fiable et rassurant, pour simplifier vos démarches au meilleur prix.
              </p>
              <div className="flex justify-start mt-6">
                  <a className="col-auto col-xl px-1">
                      <Image data-toggle="popover" data-content="" className="img-fluid" src="/assets/footer/1-svg.png" alt="PCI compliant" width="89" height="30" />
                  </a>
                  <a className="col-auto col-xl px-1">
                      <Image data-toggle="popover" data-content="" className="img-fluid" src="/assets/footer/2-svg.png" alt="GDPR compliant" width="89" height="30" />
                  </a>
                  <a className="col-auto col-xl px-1">
                      <Image data-toggle="popover" data-content="" className="img-fluid" src="/assets/footer/3-svg.png" alt="GDPR compliant" width="89" height="30" />
                  </a>
              </div>
            </div>

            

            <div className="lg:w-3/12">
              <ul className="mt-10 lg:mt-0 lg:ml-8 space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index} className="flex justify-start items-center">
                    <Link
                      href={item.href}
                      className="text-white text-[11px] hover:text-[#18a974] transition-all"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="my-6"/>

            <div className="lg:w-3/12">
              <ul className="space-y-2 mt-2 lg:mt-0">
                {menuItems2.map((item, index) => (
                  <li key={index} className="flex justify-start items-center">
                    <Link
                      href={item.href}
                      className="text-white text-[11px]  hover:text-[#18a974] transition-all"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="my-6"/>

            <div className="lg:w-3/12">
              <ul className="space-y-2 mt-2 lg:mt-0">
                {menuItems3.map((item, index) => (
                  <li key={index} className="flex justify-start items-center">
                    <Link
                      href={item!.href}
                      className="text-white text-[11px]  hover:text-[#18a974] transition-all"
                    >
                      {item!.icon}
                      {item!.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="my-6"/>

            <div className="lg:w-2/12 mt-2 lg:mt-0">
              <a href="tel:0970707070">
                <button className="bg-white rounded-full font-semibold px-3 flex justify-center items-center">
                  <p className="inline-block text-lg">
                    {" "}
                    <span className=" text-[14px]"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="inline-block size-4 relative -top-[2px]" height=".9em" width=".9em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>  0970707070</span>
                  </p>
                </button>
              </a>
              <p className="text-gray-300 text-sm  mt-8">
                Du lundi au vendredi De 9h à 19h
              </p>
             
              <ul className="flex mb-1 mt-6">
                  <li className=" bg-[#b2b6b9] mr-3">
                    <a href="#" target="_blank" rel="nofollow noreferrer" className="text-secondary-lighter" aria-label="facebook" title="facebook">
                      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="#0F0F0F"/>
                      </svg>
                    </a>
                  </li>
                  <li className="bg-[#b2b6b9] mr-3">
                    <a href="https://x.com/raccoelec?s=21" target="_blank" rel="nofollow noreferrer" className="text-secondary-lighter" aria-label="facebook" title="facebook">
                      <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                      </svg>
                    </a>
                  </li>
                  <li className="bg-[#b2b6b9] mr-3">
                    <a href="https://www.instagram.com/raccoelec.fr?igsh=bmwwazY4aHRsODhn&utm_source=qr" target="_blank" rel="nofollow noreferrer" className="text-secondary-lighter" aria-label="facebook" title="facebook">
                      <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                      </svg>
                    </a>
                  </li>
                  <li className="bg-[#b2b6b9] mr-3">
                    <a href="#" target="_blank" rel="nofollow noreferrer" className="text-secondary-lighter" aria-label="facebook" title="facebook">
                      <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/>
                      </svg>
                    </a>
                  </li>
              </ul>
              <ul className="flex mb-1 mt-3">
                  <li className=" bg-[#b2b6b9] mr-3">
                    <a href="#" target="_blank" rel="nofollow noreferrer" className="text-secondary-lighter" aria-label="facebook" title="facebook">
                      <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2 .3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4 .2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2 .2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2 .1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z"/></svg>
                    </a>
                  </li>
                  <li className="bg-[#b2b6b9] mr-3">
                    <a href="#" target="_blank" rel="nofollow noreferrer" className="text-secondary-lighter" aria-label="facebook" title="facebook">
                      <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7 0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2 5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8 .3c-6.8 0-10.9 5.2-10.9 11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7 0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3 .3 .5 .3 1.1 0 .3-.3 .5-.3 1.1-.3 .3-.3 .5-.5 .8-.3 .3-.5 .5-1.1 .5-.3 .3-.5 .3-1.1 .3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8 .3-1.1 0-.5 .3-.8 .5-1.1 .3-.3 .5-.3 .8-.5 .5-.3 .8-.3 1.1-.3 .5 0 .8 0 1.1 .3 .5 .3 .8 .3 1.1 .5s.2 .6 .5 1.1zm-2.2 1.4c.5 0 .5-.3 .8-.3 .3-.3 .3-.5 .3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V426h.3l1.1 1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zm-142.3 76.3c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4V392h-8.2v36.7h8.2c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2h7.9c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2h8.2v-23zm44.9-13.7h-7.9v4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4v4.6h7.9V392zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7 .8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1v-16.6h13.1V392h-13.1v-11.2h-8.2V392h-7.6v7.3h7.6V416c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4h27.5c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zm59.1-21.5c-4.6-2-11.6-1.8-15.2 4.4V392h-8.2v36.7h8.2V408c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zm66.7-18.3H408v4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9v4.6h8.2V392zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4V392h-7.9v36.7h7.9V408c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9h-7.9v19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9v4.6h7.9v-51.7zm7.6-75.1v4.6h.8V302h1.9v-.8h-4.6v.8h1.9zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1-.3-.3-.8-.5-1.1-.8-.5 0-1.1-.3-1.6-.3-.3 0-.8 .3-1.4 .3-.5 .3-.8 .5-1.1 .8-.5 .3-.8 .8-.8 1.1-.3 .5-.3 1.1-.3 1.6 0 .3 0 .8 .3 1.4 0 .3 .3 .8 .8 1.1 .3 .3 .5 .5 1.1 .8 .5 .3 1.1 .3 1.4 .3 .5 0 1.1 0 1.6-.3 .3-.3 .8-.5 1.1-.8 .3-.3 .5-.8 .8-1.1 .3-.6 .3-1.1 .3-1.4zm3.2-124.7h-1.4l-1.6 3.5-1.6-3.5h-1.4v5.4h.8v-4.1l1.6 3.5h1.1l1.4-3.5v4.1h1.1v-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4 .1 138.5-61.9 138.5-138.4z"/></svg>
                    </a>
                  </li>
                  <li className="bg-[#b2b6b9] mr-3">
                    <a href="#" target="_blank" rel="nofollow noreferrer" className="text-secondary-lighter" aria-label="facebook" title="facebook">
                      <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 432c0 26.5 21.5 48 48 48H528c26.5 0 48-21.5 48-48v-1.1H514.3l-31.9-35.1-31.9 35.1H246.8V267.1H181L262.7 82.4h78.6l28.1 63.2V82.4h97.2L483.5 130l17-47.6H576V80c0-26.5-21.5-48-48-48H48C21.5 32 0 53.5 0 80V432zm440.4-21.7L482.6 364l42 46.3H576l-68-72.1 68-72.1H525.4l-42 46.7-41.5-46.7H390.5L458 338.6l-67.4 71.6V377.1h-83V354.9h80.9V322.6H307.6V300.2h83V267.1h-122V410.3H440.4zm96.3-72L576 380.2V296.9l-39.3 41.4zm-36.3-92l36.9-100.6V246.3H576V103H515.8l-32.2 89.3L451.7 103H390.5V246.1L327.3 103H276.1L213.7 246.3h43l11.9-28.7h65.9l12 28.7h82.7V146L466 246.3h34.4zM282 185.4l19.5-46.9 19.4 46.9H282z"/></svg>
                    </a>
                  </li>
                  <li className="bg-[#b2b6b9] mr-3">
                    <a href="#" target="_blank" rel="nofollow noreferrer" className="text-secondary-lighter" aria-label="facebook" title="facebook">
                      <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"> <path d="M239.7 79.9c-96.9 0-175.8 78.6-175.8 175.8 0 96.9 78.9 175.8 175.8 175.8 97.2 0 175.8-78.9 175.8-175.8 0-97.2-78.6-175.8-175.8-175.8zm-39.9 279.6c-41.7-15.9-71.4-56.4-71.4-103.8s29.7-87.9 71.4-104.1v207.9zm79.8 .3V151.6c41.7 16.2 71.4 56.7 71.4 104.1s-29.7 87.9-71.4 104.1zM528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM329.7 448h-90.3c-106.2 0-193.8-85.5-193.8-190.2C45.6 143.2 133.2 64 239.4 64h90.3c105 0 200.7 79.2 200.7 193.8 0 104.7-95.7 190.2-200.7 190.2z"/></svg>
                    </a>
                  </li>
              </ul>
            </div>

          </div>
        </div>
        <div className="text-zinc-50 text-[10px] text-center mt-8">
          Copyright © 2024 - Raccoelec -  Tous droits réservés.
        </div>
      </div>
    </>
  );
};

export default Footer;
