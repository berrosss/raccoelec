"use client";
import React, { useState } from "react";
import { IoFolderOpenOutline, IoMailOutline, IoStopwatchOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import {  LuFileCheck2 } from "react-icons/lu";
import { IoMdPaper } from "react-icons/io";
import { FaRegPenToSquare } from "react-icons/fa6";
import Swal from "sweetalert2";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdOutlineHomeWork } from "react-icons/md";


interface FormData {
  need?: string;
  beneficiare?: string;
  name?: string;
  prenom?: string;
  email?: string;
  phone?: string;
  type?: string;
  autreType?:string,
  codePostal?:string,
  commune?:string,
  cadastral?:string,
  voie?:string,
  facultatif?:string,
  echeance?:string
}


const Branchement = () => {
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [autreType, setAutreType] = useState(false);
  const router = useRouter();

  type Field = {
    label: "name" | "prenom" | "email" | "phone";
    placeholder: string;
  };
  
  const fields: Field[] = [
    { label: "name", placeholder: "Nom" },
    { label: "prenom", placeholder: "Prénom" },
    { label: "email", placeholder: "Email" },
    { label: "phone", placeholder: "Téléphone" },
  ];


  const validationSchemaForm1 = yup.object().shape({
    need: yup.string().required("Veuillez choisir un besoin."),
    beneficiare: yup.string().required("Veuillez choisir un bénéficiaire."),
    name: yup.string().required("Le champ Nom est requis.").min(3, "Le nom doit comporter au moins 3 caractères."),
    prenom: yup.string().required("Le champ Prenom est requis.").min(3, "Le nom doit comporter au moins 3 caractères."),
    email: yup.string().required("Le champ Email est requis.").email("S'il vous plaît, mettez une adresse email valide."),
    phone: yup.string().required("Le champ téléphone est requis.").matches(/^\d{10}$/, "Le numéro de téléphone doit comporter exactement 10 chiffres."),
  });
  
  const validationSchemaForm2 = () => yup.object().shape({
    type: yup.string().required("Veuillez choisir le type de site souhaité."),
    autreType: yup.string().when('type', {
    is: 'Autre',
      then: (schema) => schema.required("Veuillez remplir ce champ."),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
  
  const validationSchemaForm3 = yup.object().shape({
    codePostal: yup.string().required("Veuillez remplire ce champ."),
    commune: yup.string().required("Veuillez remplire ce champ."),
    cadastral: yup.string().notRequired(),
    voie: yup.string().required("Veuillez remplire ce champ."),
    facultatif: yup.string().notRequired(),
    echeance: yup.string().required("Veuillez remplire ce champ."),
  });
  

  const methods = useForm<FormData>({
    resolver: yupResolver(
      currentStep === 1 ? validationSchemaForm1 : 
      currentStep === 2 ? validationSchemaForm2() : 
      currentStep === 3 ? validationSchemaForm3 : 
      yup.object().shape({})
    ),
  });

  const onSubmit = (data: FormData) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
    setFormData((prev) => ({ ...prev, ...data }));
    if(validationSchemaForm1.isValidSync(data)) {
      sendEmail(data);
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      sendEmail(formData);
      router.push('/');
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Votre demande envoyé avec succès',
      })
    }
  };

  const sendEmail = async (data: FormData | { need: string; beneficiare: string; prenom: string; email: string; phone: string; name: string; }) => {
    try {
      await axios.post('https://raccoelec.fr/wp-json/custom/v1/send-email-2', data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `Error ${error}`,
        text: 'Error sending email',
      });
    }
  }



  return (
        <div className="flex justify-center items-center w-full mb-10 mt-4">
          <div className="max-w-[900px] w-full">
                <FormProvider {...methods}>

                  <div className="mb-8 mt-10">
                    <div className="flex items-center justify-center mt-10">
                      <div className="flex items-center text-blue-700 space-x-7">
                        <div className={`step ${currentStep == 1 ? "active" : "" }`} id="step-1">
                          <IoMdPaper className={`size-5 inline-block lg:hidden ${currentStep == 1 ? "active" : "" }`}/> {" "}
                          <span className="hidden lg:inline-block">Pour commencer</span>
                        </div>
                        <span>&gt;</span>
                        <div className={`step ${currentStep == 2 ? "active" : "" }`} id="step-2">
                          <IoFolderOpenOutline className={`size-5 inline-block lg:hidden ${ currentStep == 2 ? "active" : "" }`} />{" "}
                          <span className="hidden lg:inline-block">Mon Project</span>
                        </div>
                        <span>&gt;</span>
                        <div className={`step ${ (currentStep === 3) ? "active" : "" }`} id="step-3">
                          <FaRegPenToSquare className={`size-5 inline-block lg:hidden ${ currentStep == 3 ? "active" : "" }`} />{" "}
                          <span className="hidden lg:inline-block">Mon planning</span>
                        </div>
                        <span>&gt;</span>
                        <div className={`step ${ currentStep == 4 ? "active" : "" }`} id="step-4">
                          <LuFileCheck2 className={`size-5 inline-block lg:hidden ${ currentStep == 4 ? "active" : "" }`}/>{" "}
                          <span className="hidden lg:inline-block">Récapitulatif</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full p-[40px] rounded" style={{ boxShadow: "0 10px 30px 0 rgba(62, 87, 111, 0.2)" }}>
                     
                      {currentStep === 1 && (
                          <div>
                            <div className="mb-[60px]">
                              <h2 className="stepper-title text-[16px] leading-[24px] font-light text-left text-[#212529] mb-6">
                                Quel est votre besoin ?
                              </h2>
                              <div className="flex justify-start items-start flex-col md:flex-row w-full gap-2 text-center">
                                {['Déplacement de compteur', 'Modification de branchement', 'Suppression de branchement électrique'].map((option, index) => (
                                  <div key={index} className="w-full lg:w-auto">
                                    <input
                                      type="radio"
                                      {...methods.register("need")}
                                      id={`need${index}`}
                                      value={option}
                                      className="hidden peer"
                                    />
                                    <label
                                      htmlFor={`need${index}`}
                                      className="viab transition-all duration-300 hover:border-[#1623dc] hover:text-[#1623dc] inline-flex items-center justify-between w-full lg:w-auto p-3 text-gray-500 rounded bg-white border-[1px] border-gray-400 cursor-pointer peer-checked:text-black peer-checked:border-[#005EB8] peer-checked:bg-[#bfd7ed]">
                                      <div className="block !text-center w-full">
                                        <div className="w-full !text-center w-full">
                                          {option}
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <div>
                                {methods.formState.errors.need && <p className="text-red-500 text-sm">{methods.formState.errors.need.message}</p>}
                              </div>
                            </div>
    
                            <div className="mb-[60px]">
                              <h2 className="stepper-title text-[16px] leading-[24px] font-light text-left text-[#212529] mb-6">
                                Le bénéficiaire est...
                              </h2>
                              <div className="flex justify-start items-start flex-col md:flex-row w-full gap-2 text-center md:grid-cols-3">
                                {['Un particulier', 'Une Entreprise'].map((option, index) => (
                                  <div key={index} className="w-full lg:w-auto">
                                    <input
                                      type="radio"
                                      {...methods.register("beneficiare")}
                                      id={`beneficiare${index}`}
                                      value={option}
                                      className="hidden peer"
                                    />
                                    <label htmlFor={`beneficiare${index}`}
                                      className="viab transition-all duration-300 hover:border-[#1623dc] hover:text-[#1623dc] inline-flex items-center justify-center w-full p-3 text-gray-500 rounded bg-white border-[1px] border-gray-400 cursor-pointer peer-checked:text-black peer-checked:border-[#005EB8] peer-checked:bg-[#bfd7ed]">
                                      {index === 0 ? (
                                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"><circle cx="12" cy="8" r="2.5" stroke="#6b7280" strokeLinecap="round"/><path d="M13.7679 6.5C13.9657 6.15743 14.2607 5.88121 14.6154 5.70625C14.9702 5.5313 15.3689 5.46548 15.7611 5.51711C16.1532 5.56874 16.5213 5.73551 16.8187 5.99632C17.1161 6.25713 17.3295 6.60028 17.4319 6.98236C17.5342 7.36445 17.521 7.76831 17.3939 8.14288C17.2667 8.51745 17.0313 8.8459 16.7175 9.08671C16.4037 9.32751 16.0255 9.46985 15.6308 9.49572C15.2361 9.52159 14.8426 9.42983 14.5 9.23205" stroke="#6b7280"/><path d="M10.2321 6.5C10.0343 6.15743 9.73935 5.88121 9.38458 5.70625C9.02981 5.5313 8.63113 5.46548 8.23895 5.51711C7.84677 5.56874 7.47871 5.73551 7.18131 5.99632C6.88391 6.25713 6.67053 6.60028 6.56815 6.98236C6.46577 7.36445 6.47899 7.76831 6.60614 8.14288C6.73329 8.51745 6.96866 8.8459 7.28248 9.08671C7.5963 9.32751 7.97448 9.46985 8.36919 9.49572C8.76391 9.52159 9.15743 9.42983 9.5 9.23205" stroke="#6b7280"/><path d="M12 12.5C16.0802 12.5 17.1335 15.8022 17.4054 17.507C17.4924 18.0524 17.0523 18.5 16.5 18.5H7.5C6.94771 18.5 6.50763 18.0524 6.59461 17.507C6.86649 15.8022 7.91976 12.5 12 12.5Z" stroke="#6b7280" strokeLinecap="round"/><path d="M19.2965 15.4162L18.8115 15.5377L19.2965 15.4162ZM13.0871 12.5859L12.7179 12.2488L12.0974 12.9283L13.0051 13.0791L13.0871 12.5859ZM17.1813 16.5L16.701 16.639L16.8055 17H17.1813V16.5ZM15.5 12C16.5277 12 17.2495 12.5027 17.7783 13.2069C18.3177 13.9253 18.6344 14.8306 18.8115 15.5377L19.7816 15.2948C19.5904 14.5315 19.2329 13.4787 18.578 12.6065C17.9126 11.7203 16.9202 11 15.5 11V12ZM13.4563 12.923C13.9567 12.375 14.6107 12 15.5 12V11C14.2828 11 13.3736 11.5306 12.7179 12.2488L13.4563 12.923ZM13.0051 13.0791C15.3056 13.4614 16.279 15.1801 16.701 16.639L17.6616 16.361C17.1905 14.7326 16.019 12.5663 13.1691 12.0927L13.0051 13.0791ZM18.395 16H17.1813V17H18.395V16ZM18.8115 15.5377C18.8653 15.7526 18.7075 16 18.395 16V17C19.2657 17 20.0152 16.2277 19.7816 15.2948L18.8115 15.5377Z" fill="#6b7280"/><path d="M10.9129 12.5859L10.9949 13.0791L11.9026 12.9283L11.2821 12.2488L10.9129 12.5859ZM4.70343 15.4162L5.18845 15.5377L4.70343 15.4162ZM6.81868 16.5V17H7.19453L7.29898 16.639L6.81868 16.5ZM8.49999 12C9.38931 12 10.0433 12.375 10.5436 12.923L11.2821 12.2488C10.6264 11.5306 9.71723 11 8.49999 11V12ZM5.18845 15.5377C5.36554 14.8306 5.68228 13.9253 6.22167 13.2069C6.75048 12.5027 7.47226 12 8.49999 12V11C7.0798 11 6.08743 11.7203 5.42199 12.6065C4.76713 13.4787 4.40955 14.5315 4.21841 15.2948L5.18845 15.5377ZM5.60498 16C5.29247 16 5.13465 15.7526 5.18845 15.5377L4.21841 15.2948C3.98477 16.2277 4.73424 17 5.60498 17V16ZM6.81868 16H5.60498V17H6.81868V16ZM7.29898 16.639C7.72104 15.1801 8.69435 13.4614 10.9949 13.0791L10.8309 12.0927C7.98101 12.5663 6.8095 14.7326 6.33838 16.361L7.29898 16.639Z" fill="#6b7280"/></g></svg>
                                      ) : (
                                        <svg width="24px" height="30px" viewBox="0 0 1024 1024" fill="#6b7280" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"> <path d="M276 1004.8c-34.4-8-158.4-57.6-168.8-126.4-7.2-44.8 10.4-88.8 48.8-120.8 28.8-24 100.8-69.6 130.4-84.8 11.2-5.6 27.2-12 41.6-18.4 40.8-17.6 56.8-25.6 60.8-32.8 4.8-11.2 4.8-19.2 0.8-40.8v-1.6l-1.6-1.6C371.2 560 330.4 510.4 320 480c-10.4-30.4-21.6-92-22.4-120v-6.4H214.4c1.6-12.8 7.2-40 16-55.2 12.8-22.4 32.8-41.6 36-43.2l3.2-1.6V248c0-18.4 10.4-82.4 56.8-128.8 56-56 134.4-96 185.6-96h3.2c51.2 0 129.6 40.8 185.6 96 46.4 46.4 56.8 110.4 56.8 128.8v4l3.2 1.6c3.2 1.6 23.2 20.8 36 43.2 8.8 15.2 13.6 42.4 16 55.2H728.8v6.4c0 28-12 89.6-22.4 120-10.4 30.4-51.2 80-68 97.6l-1.6 1.6v1.6c-4 21.6-4.8 29.6 0.8 40.8 3.2 8 19.2 15.2 60.8 32.8 14.4 6.4 29.6 12.8 41.6 18.4 30.4 15.2 101.6 60.8 130.4 84.8 38.4 32 56 76 48.8 120.8-11.2 68.8-134.4 118.4-168.8 126.4-25.6-8.8-163.2-20.8-212-20.8h-14.4c-3.2 0-6.4 0.8-11.2 0.8-4 0-8-0.8-11.2-0.8h-14.4c-48 1.6-185.6 13.6-211.2 22.4z m467.2-39.2l2.4-0.8c12-2.4 120.8-27.2 136-104.8 8-44-43.2-82.4-68-100-16.8-12.8-31.2-21.6-49.6-31.2l-8-4-41.6 234.4 6.4 0.8c10.4 1.6 17.6 3.2 20 4l2.4 1.6zM262.4 728.8c-21.6 11.2-35.2 20.8-49.6 31.2-24.8 18.4-76 56.8-68 100 15.2 77.6 123.2 102.4 136 104.8l2.4 0.8 1.6-1.6c2.4-0.8 10.4-2.4 20-4l6.4-0.8-41.6-234.4-7.2 4z m265.6 216c45.6 0.8 87.2 3.2 119.2 6.4l6.4 0.8 36.8-257.6-8-4c-6.4-3.2-13.6-5.6-20.8-8.8-27.2-11.2-55.2-22.4-66.4-61.6-1.6-7.2-2.4-14.4-1.6-22.4 0.8-9.6 4-17.6 7.2-28 0.8-4 2.4-7.2 4-12 18.4-16 44.8-54.4 58.4-80.8l8.8-18.4c6.4-16.8 12-56 15.2-85.6l0.8-7.2H338.4l0.8 7.2c4.8 43.2 10.4 72 15.2 85.6l8.8 18.4c14.4 27.2 40.8 65.6 59.2 81.6 1.6 4 2.4 8 4 11.2 3.2 9.6 6.4 18.4 7.2 28 0.8 8 0.8 15.2-1.6 22.4-11.2 39.2-39.2 50.4-66.4 61.6-7.2 3.2-14.4 5.6-20.8 8.8l-8 4 36.8 257.6 6.4-0.8c32.8-3.2 73.6-5.6 119.2-6.4H528zM308.8 261.6c-6.4 3.2-16 8.8-26.4 26.4-5.6 8.8-6.4 16-7.2 20.8l-0.8 7.2H751.2l-0.8-7.2c0-4.8-1.6-11.2-6.4-20.8-10.4-17.6-20.8-23.2-26.4-26.4 0-23.2 0.8-69.6-41.6-112-55.2-56-116.8-88.8-162.4-88.8-60.8 0-122.4 48.8-162.4 88.8-42.4 42.4-42.4 89.6-42.4 112z" fill="" /></svg>
                                      )}
                                      {option}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <div>
                                  {methods.formState.errors.beneficiare && <p className="text-red-500 text-sm">{methods.formState.errors.beneficiare.message}</p>}
                              </div>
                            </div>
    
                            <div className="mb-[60px] w-full mt-5 border-t-[1px] border-slate-200 pt-10">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                {fields.map((field, index) => (
                                  <div key={index} className="w-full">
                                    <label htmlFor={field.placeholder} className="block text-sm capitalize">
                                      {field.placeholder}:
                                    </label>
                                    <input
                                      {...methods.register(field.label)}
                                      id={field.label}
                                      name={field.label}
                                      placeholder={field.placeholder}
                                      type="text"
                                      className="w-full mt-1 px-4 py-3 border-2 border-[#acabab] focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    />
                                     {methods.formState.errors[field.label] && <p className="text-red-500 text-sm">{methods.formState.errors[field.label]?.message}</p>}
                                  </div>
                                ))}
                              </div>
                            </div>
    
                            <div className="flex justify-center items-center w-full mt-12">
                              <button type="submit" className="stepper-title rounded-full py-3 px-20 text-white bg-[#16a974]">
                                Suivant
                              </button>
                            </div>
                          </div>
                      )}
    
                      {currentStep === 2 && (
                        <div>
                            <h2 className="stepper-title text-[16px] leading-[24px] font-light text-left text-[#212529] mb-10">
                              Quel type de site souhaitez-vous raccorder au réseau électrique ?
                            </h2>
                            <div className="max-w-[600px] mx-auto">
                              <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                  {'label':'Maison', 'icon': '<svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 text-slate-500 -mb-2"> <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>'},
                                  {'label':'Appartement ou local en immeuble', 'icon': '<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#64748b" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M18 21V22C18.5523 22 19 21.5523 19 21H18ZM6 21H5C5 21.5523 5.44772 22 6 22V21ZM17.454 3.10899L17 4L17.454 3.10899ZM17.891 3.54601L17 4L17.891 3.54601ZM6.54601 3.10899L7 4L6.54601 3.10899ZM6.10899 3.54601L7 4L6.10899 3.54601ZM9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8V6ZM10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6V8ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V9ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9V11ZM14 9C13.4477 9 13 9.44772 13 10C13 10.5523 13.4477 11 14 11V9ZM15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9V11ZM14 12C13.4477 12 13 12.4477 13 13C13 13.5523 13.4477 14 14 14V12ZM15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12V14ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14V12ZM10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12V14ZM14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8V6ZM15 8C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6V8ZM7.6 4H16.4V2H7.6V4ZM17 4.6V21H19V4.6H17ZM18 20H6V22H18V20ZM7 21V4.6H5V21H7ZM16.4 4C16.6965 4 16.8588 4.00078 16.9754 4.0103C17.0803 4.01887 17.0575 4.0293 17 4L17.908 2.21799C17.6366 2.07969 17.3668 2.03562 17.1382 2.01695C16.9213 1.99922 16.6635 2 16.4 2V4ZM19 4.6C19 4.33647 19.0008 4.07869 18.9831 3.86177C18.9644 3.63318 18.9203 3.36344 18.782 3.09202L17 4C16.9707 3.94249 16.9811 3.91972 16.9897 4.02463C16.9992 4.14122 17 4.30347 17 4.6H19ZM17 4L18.782 3.09202C18.5903 2.7157 18.2843 2.40973 17.908 2.21799L17 4ZM7.6 2C7.33647 2 7.07869 1.99922 6.86177 2.01695C6.63318 2.03562 6.36344 2.07969 6.09202 2.21799L7 4C6.94249 4.0293 6.91972 4.01887 7.02463 4.0103C7.14122 4.00078 7.30347 4 7.6 4V2ZM7 4.6C7 4.30347 7.00078 4.14122 7.0103 4.02463C7.01887 3.91972 7.0293 3.94249 7 4L5.21799 3.09202C5.07969 3.36344 5.03562 3.63318 5.01695 3.86177C4.99922 4.07869 5 4.33647 5 4.6H7ZM6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202L7 4L6.09202 2.21799ZM9 8H10V6H9V8ZM9 11H10V9H9V11ZM14 11H15V9H14V11ZM14 14H15V12H14V14ZM9 14H10V12H9V14ZM14 8H15V6H14V8ZM13 18V21H15V18H13ZM11 21V18H9V21H11ZM12 17C12.5523 17 13 17.4477 13 18H15C15 16.3431 13.6569 15 12 15V17ZM12 15C10.3431 15 9 16.3431 9 18H11C11 17.4477 11.4477 17 12 17V15Z" fill="#64748b"></path> </g></svg>'},
                                  {'label':'Local hors immeuble', 'icon':'<svg width="40px" height="40px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-12 text-slate-500 -mb-2"> <g id="SVGRepo_bgCarrier" strokeWidth={0} /> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /> <g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M9 18H11V28H37V18H39V28H40.5C40.7761 28 41 28.2239 41 28.5V29.5C41 29.7761 40.7761 30 40.5 30H7.5C7.22386 30 7 29.7761 7 29.5V28.5C7 28.2239 7.22386 28 7.5 28H9V18ZM10 33V40H38V33H10ZM9 31C8.44772 31 8 31.4477 8 32V41C8 41.5523 8.44772 42 9 42H39C39.5523 42 40 41.5523 40 41V32C40 31.4477 39.5523 31 39 31H9Z" fill="#64748b" /> <path fillRule="evenodd" clipRule="evenodd" d="M10.1888 8L8.04354 13.9129C8.01478 13.9922 8 14.0761 8 14.1609V16.551C8 17.3592 8.64747 18 9.42857 18C10.2097 18 10.8571 17.3592 10.8571 16.551C10.8571 15.9987 11.3049 15.551 11.8571 15.551C12.4094 15.551 12.8571 15.9987 12.8571 16.551C12.8571 17.3592 13.5046 18 14.2857 18C15.0668 18 15.7143 17.3592 15.7143 16.551C15.7143 15.9987 16.162 15.551 16.7143 15.551C17.2666 15.551 17.7143 15.9987 17.7143 16.551C17.7143 17.3592 18.3618 18 19.1429 18C19.9236 18 20.5708 17.3598 20.5714 16.5522C20.5719 16.0003 21.0195 15.553 21.5714 15.553C22.1234 15.553 22.571 16.0003 22.5714 16.5522C22.5721 17.3598 23.2193 18 24 18C24.7811 18 25.4286 17.3592 25.4286 16.551C25.4286 15.9987 25.8763 15.551 26.4286 15.551C26.9809 15.551 27.4286 15.9987 27.4286 16.551C27.4286 17.3592 28.076 18 28.8571 18C29.6379 18 30.2851 17.3598 30.2857 16.5522C30.2862 16.0003 30.7337 15.553 31.2857 15.553C31.8377 15.553 32.2853 16.0003 32.2857 16.5522C32.2864 17.3598 32.9336 18 33.7143 18C34.4954 18 35.1429 17.3592 35.1429 16.551C35.1429 15.9987 35.5906 15.551 36.1429 15.551C36.6951 15.551 37.1429 15.9987 37.1429 16.551C37.1429 17.3592 37.7903 18 38.5714 18C39.3525 18 40 17.3592 40 16.551V14.1609C40 14.0761 39.9852 13.9922 39.9565 13.9129L37.8112 8H10.1888ZM37.7764 7.90395L37.7763 7.9037L37.9181 7.85225L37.7763 7.90369C37.7763 7.90378 37.7763 7.90387 37.7764 7.90395ZM36.1429 18.9856C35.5233 19.6115 34.6656 20 33.7143 20C32.7629 20 31.9053 19.6115 31.2857 18.9856C30.6662 19.6115 29.8085 20 28.8571 20C27.9058 20 27.0481 19.6115 26.4286 18.9856C25.809 19.6115 24.9514 20 24 20C23.0486 20 22.191 19.6115 21.5714 18.9856C20.9519 19.6115 20.0942 20 19.1429 20C18.1915 20 17.3338 19.6115 16.7143 18.9856C16.0947 19.6115 15.2371 20 14.2857 20C13.3344 20 12.4767 19.6115 11.8571 18.9856C11.2376 19.6115 10.3799 20 9.42857 20C7.52715 20 6 18.4479 6 16.551V14.1609C6 13.8438 6.05528 13.529 6.16345 13.2308L8.34363 7.22159C8.60829 6.4921 9.30012 6 10.0819 6H37.9181C38.6999 6 39.3917 6.4921 39.6564 7.2216L41.8366 13.2308C41.9447 13.529 42 13.8438 42 14.1609V16.551C42 18.4479 40.4728 20 38.5714 20C37.6201 20 36.7624 19.6115 36.1429 18.9856Z" fill="#64748b" /> <path d="M12 25.5C12 25.2239 12.2239 25 12.5 25H15.5C15.7761 25 16 25.2239 16 25.5V27.5C16 27.7761 15.7761 28 15.5 28H12.5C12.2239 28 12 27.7761 12 27.5V25.5Z" fill="#64748b" /> <path d="M14 26.5C14 26.2239 14.2239 26 14.5 26H17.5C17.7761 26 18 26.2239 18 26.5V27.5C18 27.7761 17.7761 28 17.5 28H14.5C14.2239 28 14 27.7761 14 27.5V26.5Z" fill="#64748b" /> <path d="M22 26.5C22 27.3284 21.3284 28 20.5 28C19.6716 28 19 27.3284 19 26.5C19 25.6716 19.6716 25 20.5 25C21.3284 25 22 25.6716 22 26.5Z" fill="#64748b" /> </g> </svg>'},
                                  {'label':'Immeuble ou batiment', 'icon':' <svg width="40" height="40" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#64748b" stroke-width="3.3920000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="8" y="8" width="48" height="48"></rect><line x1="8" y1="40" x2="56" y2="40"></line><line x1="24" y1="40" x2="24" y2="56"></line><polyline points="32 40 32 20 8 20"></polyline><line x1="56" y1="28" x2="32" y2="28"></line><line x1="20" y1="8" x2="20" y2="20"></line></g></svg>'},
                                  {'label':'Autre', 'icon':'<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" className="size-12 text-slate-500 -mb-2" xmlns="http://www.w3.org/2000/svg" > <g id="SVGRepo_bgCarrier" strokeWidth={0} /> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /> <g id="SVGRepo_iconCarrier"> <path d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" /> <path opacity="0.5" d="M21 7.5L12 12M12 12L3 7.5M12 12V21.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" /> </g> </svg>'},
                                ].map(
                                  (option, index) => (
                                    <div key={index}>
                                      <input
                                        type="radio"
                                        {...methods.register("type")}
                                        id={`type${index}`}
                                        value={option.label}
                                        onClick={() => (option.label === "Autre" ? setAutreType(true) : setAutreType(false))}
                                        className="hidden peer w-full viab2 transition-all duration-300 flex cursor-pointer h-[120px] items-center justify-center flex-col gap-4 rounded-xl border border-slate-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-[#005EB8] has-[:checked]:ring-1 has-[:checked]:ring-[#005EB8] has-[:checked]:bg-[#bfd7ed]  bg-white"
                                      />
                                      <label htmlFor={`type${index}`} className="rounded-xl border border-slate-300 text-center w-full h-full viab transition-all duration-300 hover:border-[#1623dc] hover:text-[#1623dc] inline-flex flex-col items-center justify-center p-3 text-gray-500 rounded bg-white border-[1px] border-gray-400 cursor-pointer peer-checked:text-black peer-checked:border-[#005EB8] peer-checked:bg-[#bfd7ed]">
                                        <div className="w-full text-center">
                                          <div dangerouslySetInnerHTML={{ __html: option.icon }} className="flex justify-center"/>
                                          <p className="text-slate-800 font-semibold text-[17px] text-center"> {option.label}</p>
                                        </div>  
                                      </label>  
                                    </div>
                                  )
                                )}
                              </div>
                              <div>
                                {autreType && (
                                  <div>
                                    <textarea
                                        {...methods.register("autreType")}
                                        id="autreType"
                                        className="mt-4 w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005EB8] focus:border-[#005EB8]"
                                        placeholder="Préciser votre besoin..."
                                        rows={4}
                                        name="autreType"
                                      />
                                      <div>
                                          {methods.formState.errors.autreType && <p className="text-red-500 text-sm">{methods.formState.errors.autreType.message}</p>}
                                      </div>
                                  </div>
                                )}
                              </div>
    
                              <div>
                                {methods.formState.errors.type && <p className="text-red-500 text-sm">{methods.formState.errors.type.message}</p>}
                              </div>
    
                              <div className="flex justify-center items-center gap-6 !mt-10">
                                <button id="prev1" type="button" className="bg-white border-[1px] border-[#16a974] rounded-full text-[#16a974] py-2.5 px-10 text-md font-semibold"
                                onClick={() => {
                                  window.scrollTo({top: 0,behavior: "smooth"});
                                  setCurrentStep(currentStep - 1);
                               }}>
                                  Precedent
                                </button>
                                <button  type="submit" className="bg-[#16a974] border-[1px] border-[#16a974] rounded-full text-white py-2.5 px-10 text-md font-semibold">
                                  Suivant
                                </button>
                              </div>
    
                            </div>
                        </div>
                      )}
    
                      {currentStep === 3 && (
                        <div>
                            <h2 className="stepper-title text-[16px] leading-[24px] font-light text-left text-[#212529] mb-10">
                              Où se situe votre projet ?
                            </h2>
    
                            <div className="lg:flex gap-x-6 gap-y-8 mb-6">
                              <div className="lg:w-4/12 mb-6">
                                <div>
                                  <label htmlFor="codePostal" className="relative block overflow-hidden border-b-2 border-gray-200 bg-transparent pt-3 focus-within:border-b-2 focus-within:border-[#16a974]">
                                    <input
                                      {...methods.register("codePostal")}
                                      type="tel"
                                      id="codePostal"
                                      name="codePostal"
                                      placeholder="Code Postal"
                                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-lg"
                                    />
                                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                      Code Postal
                                    </span>
                                  </label>
                                  <div>
                                    {methods.formState.errors.codePostal && <p className="text-red-500 text-sm">{methods.formState.errors.codePostal.message}</p>}
                                  </div>
                                </div>
                              </div>
                              <div className="lg:w-8/12">
                                <div>
                                  <label htmlFor="commune" className="relative block overflow-hidden border-b-2 border-gray-200 bg-transparent pt-3 focus-within:border-b-2 focus-within:border-[#16a974]">
                                    <input
                                      type="text"
                                      {...methods.register("commune")}
                                      id="commune"
                                      name="commune"
                                      placeholder="Commune"
                                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-lg"
                                    />
                                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                      Commune
                                    </span>
                                  </label>
                                  <div>
                                    {methods.formState.errors.commune && <p className="text-red-500 text-sm">{methods.formState.errors.commune.message}</p>}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="lg:flex gap-6 mb-6">
                              <div className="lg:w-4/12 mb-6">
                                <div>
                                  <label htmlFor="facultatif" className="relative block overflow-hidden border-b-2 border-gray-200 bg-transparent pt-3 focus-within:border-b-2 focus-within:border-[#16a974]">
                                    <input
                                      type="tel"
                                      {...methods.register("facultatif")}
                                      id="facultatif"
                                      name="facultatif"
                                      placeholder="N° (facultatif)"
                                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-lg"
                                    />
                                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                      N° (facultatif)
                                    </span>
                                  </label>
                                  <div>
                                    {methods.formState.errors.facultatif && <p className="text-red-500 text-sm">{methods.formState.errors.facultatif.message}</p>}
                                  </div>
                                </div>
                              </div>
                              <div className="lg:w-8/12">
                                <div>
                                  <label htmlFor="voie" className="relative block overflow-hidden border-b-2 border-gray-200 bg-transparent pt-3 focus-within:border-b-2 focus-within:border-[#16a974]">
                                    <input
                                      type="text"
                                      id="voie"
                                      {...methods.register("voie")}
                                      name="voie"
                                      placeholder="voie"
                                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-lg"
                                    />
                                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                      Voie
                                    </span>
                                  </label>
                                  <div>
                                    {methods.formState.errors.voie && <p className="text-red-500 text-sm">{methods.formState.errors.voie.message}</p>}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="lg:flex">
                              <div className="w-full">
                                <div>
                                  <label htmlFor="cadastral" className="relative block overflow-hidden border-b-2 border-gray-200 bg-transparent pt-3 focus-within:border-b-2 focus-within:border-[#16a974]">
                                    <input
                                      type="tel"
                                      id="cadastral"
                                      {...methods.register("cadastral")}
                                      name="cadastral"
                                      placeholder="Complément d'adresse / N° cadastral (facultatif)"
                                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-lg"
                                    />
                                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                      Complément d&lsquo;adresse / N° cadastral (facultatif)
                                    </span>
                                  </label>
                                  <div>
                                    {methods.formState.errors.cadastral && <p className="text-red-500 text-sm">{methods.formState.errors.cadastral.message}</p>}
                                  </div>
                                </div>
                              </div>
                            </div>
    

                            <h2 className="stepper-title text-[16px] leading-[24px] font-light text-left text-[#212529] mt-14">
                              À quelle échéance souhaitez-vous que le raccordement soit effectué ?
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                  {'label' : "Moins d'1,5 mois", 'color': '#f29d88' },
                                  {'label' : 'Entre 1,5 et 3 mois', 'color': '#f4d47f' },
                                  {'label' : 'Entre 3 et 6 mois', 'color': '#cae486' },
                                  {'label' : 'Plus de 6 mois', 'color': '#d9dfe5' },
                                  ].map((option, index) => (
                                  <label key={index} htmlFor={`echeance${index}`} className={`viab transition-all duration-300 flex cursor-pointer items-center justify-start gap-4 rounded border border-slate-400 border-l-[8px] border-l-[${option.color}] bg-white p-4 text-sm font-medium shadow-sm hover:border-slate-500 has-[:checked]:border-[#005EB8] has-[:checked]:ring-1 has-[:checked]:ring-[#005EB8] has-[:checked]:bg-[#bfd7ed]`}>
                                    <p className="text-gray-700">{option.label}</p>
                                    <input
                                      type="radio"
                                      {...methods.register("echeance")}
                                      name="echeance"
                                      value={option.label}
                                      id={`echeance${index}`}
                                      className="sr-only"
                                    />
                                  </label>
                                ))}
                            </div>
                            <div>
                                {methods.formState.errors.echeance && <p className="text-red-500 text-sm">{methods.formState.errors.echeance.message}</p>}
                            </div>
    
                            <div className="flex justify-end items-center gap-3 mt-10">
                              <button id="prev2" onClick={() => {
                             window.scrollTo({top: 0,behavior: "smooth"});
                             setCurrentStep(currentStep - 1);
                          }} type="button" className="bg-white border-[1px] border-[#16a974] rounded text-[#16a974] py-2.5 px-10 text-md font-semibold">
                                Précédent
                              </button>
                              <button type="submit" className="bg-blue-600 border-[1px] border-blue-600 rounded text-white py-2.5 px-10 text-md font-semibold">
                                Suivant
                              </button>
                            </div>
                        </div>
                      )} 
    
                      {currentStep === 4 && (
                        <div>
                          <div className="mb-10">
                            <h4 className="stepper-title text-[#1523dc] font-semibold text-md mb-4 pb-2 border-b-2 border-[#1523dc]">
                              Ma demande
                            </h4>
                            <ul className="mb-8">
                              <li className="mb-3 flex justify-start items-center gap-3">
                                <svg className="size-7 inline-block text-slate-500" width="40px" height="40px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                  <g id="SVGRepo_iconCarrier"> <title>note-text</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" > <g id="Icon-Set"  transform="translate(-308.000000, -99.000000)" fill="#64748b"> <path d="M332,107 L316,107 C315.447,107 315,107.448 315,108 C315,108.553 315.447,109 316,109 L332,109 C332.553,109 333,108.553 333,108 C333,107.448 332.553,107 332,107 L332,107 Z M338,127 C338,128.099 336.914,129.012 335.817,129.012 L311.974,129.012 C310.877,129.012 309.987,128.122 309.987,127.023 L309.987,103.165 C309.987,102.066 310.902,101 312,101 L336,101 C337.098,101 338,101.902 338,103 L338,127 L338,127 Z M336,99 L312,99 C309.806,99 308,100.969 308,103.165 L308,127.023 C308,129.22 309.779,131 311.974,131 L335.817,131 C338.012,131 340,129.196 340,127 L340,103 C340,100.804 338.194,99 336,99 L336,99 Z M332,119 L316,119 C315.447,119 315,119.448 315,120 C315,120.553 315.447,121 316,121 L332,121 C332.553,121 333,120.553 333,120 C333,119.448 332.553,119 332,119 L332,119 Z M332,113 L316,113 C315.447,113 315,113.448 315,114 C315,114.553 315.447,115 316,115 L332,115 C332.553,115 333,114.553 333,114 C333,113.448 332.553,113 332,113 L332,113 Z" id="note-text"> </path> </g> </g> </g>
                                </svg>
                                Votre Besoin: <strong>{formData.need}</strong>
                              </li>
                              <li className="flex justify-start items-center gap-3 mb-3">
                                <AiOutlineUserSwitch className="size-7 inline-block text-slate-500" />
                                Bénéficiaire: <strong>{formData.beneficiare}</strong>
                              </li>
                              <li className="mb-3 flex justify-start items-center gap-3">
                                <FiUser className="size-7 inline-block text-slate-500" />
                                Nom & Prenom: <strong>{formData.name} {formData.prenom}</strong>
                              </li>
                              <li className="mb-3 flex justify-start items-center gap-3">
                                <IoMailOutline className="size-7 inline-block text-slate-500" />
                                Email: <strong>{formData.email}</strong>
                              </li>
                              <li className="mb-3 flex justify-start items-center gap-3">
                                <svg className="size-7 inline-block text-slate-500" width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                  <g id="SVGRepo_iconCarrier"> <path d="M5.13641 12.764L8.15456 9.08664C8.46255 8.69065 8.61655 8.49264 8.69726 8.27058C8.76867 8.07409 8.79821 7.86484 8.784 7.65625C8.76793 7.42053 8.67477 7.18763 8.48846 6.72184L7.77776 4.9451C7.50204 4.25579 7.36417 3.91113 7.12635 3.68522C6.91678 3.48615 6.65417 3.35188 6.37009 3.29854C6.0477 3.238 5.68758 3.32804 4.96733 3.5081L3 4C3 14 9.99969 21 20 21L20.4916 19.0324C20.6717 18.3121 20.7617 17.952 20.7012 17.6296C20.6478 17.3456 20.5136 17.0829 20.3145 16.8734C20.0886 16.6355 19.7439 16.4977 19.0546 16.222L17.4691 15.5877C16.9377 15.3752 16.672 15.2689 16.4071 15.2608C16.1729 15.2536 15.9404 15.3013 15.728 15.4001C15.4877 15.512 15.2854 15.7143 14.8807 16.119L11.8274 19.1733M12.9997 7C13.9765 7.19057 14.8741 7.66826 15.5778 8.37194C16.2815 9.07561 16.7592 9.97326 16.9497 10.95M12.9997 3C15.029 3.22544 16.9213 4.13417 18.366 5.57701C19.8106 7.01984 20.7217 8.91101 20.9497 10.94" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </g>
                                </svg>
                                Téléphone:  <strong>{formData.phone}</strong>
                              </li>
                            </ul>
                          </div>
                          <div className="mb-10">
                            <h4 className="stepper-title text-[#1523dc] font-semibold text-md mb-4 pb-2 border-b-2 border-[#1523dc]">
                              Mon Project
                            </h4>
                            <ul className="mb-8">
                              <li className="mb-3 flex justify-start items-center gap-3">
                              <MdOutlineHomeWork className="size-8 inline-block text-slate-500" />
                                Le type de site souhaitez-vous raccorder:{" "}
                                <strong>{formData.type}</strong>
                              </li>
                              <li className="mb-3 pb-2 border-b-[1px] border-slate-200">
                                {formData.autreType}
                              </li>
                            </ul>
                          </div>
                          <div className="mb-10">
                            <h4 className="stepper-title text-[#1523dc] font-semibold text-md mb-4 pb-2 border-b-2 border-[#1523dc]">
                              Mon Planning
                            </h4>
                            <ul className="mb-8">
                              <li className="flex justify-start items-center gap-3 mb-3">
                                <SlLocationPin className="size-8 inline-block text-slate-500" />
                                Où se situe votre projet: <strong>{formData.codePostal},{" "}
                                {formData.commune}, {formData.cadastral},{" "}
                                {formData.voie}, {formData.facultatif}.</strong>
                              </li>
                              <li className="flex justify-start items-center gap-3 mb-3">
                                <IoStopwatchOutline className="size-7 inline-block text-slate-500" />
                                Echéance souhaiter que le raccordement soit effectué:{" "}
                                <strong>{formData.echeance}</strong>
                              </li>

                            </ul>
                          </div>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 gap-3 mt-10 justify-end items-center">
                            <button onClick={() => {
                             window.scrollTo({top: 0,behavior: "smooth"});
                             setCurrentStep(currentStep - 1);
                          }}  id="prev4" type="button" className=" order-2 sm:order-1 bg-white border-[1px] w-full lg:w-auto border-[#16a974] rounded text-[#16a974] py-2.5 px-10 text-md font-semibold">
                              Précédent
                            </button>
                            <button id="submit" type="submit" className="order-1 sm:order-2  bg-blue-600 border-[1px] w-full lg:w-auto border-blue-600 rounded text-white py-2.5 px-10 text-md font-semibold">
                              Transmettre ma demande
                            </button>
                          </div>
                        </div>
                      )}

                  </form>
                </FormProvider>
          </div>
        </div>
  );
};

export default Branchement;
