"use client";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { PiPassword, PiUsersThreeLight } from "react-icons/pi";
import { IoFolderOpenOutline, IoMailOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { FaRegSquare } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { LuFileCheck2 } from "react-icons/lu";
import { IoMdPaper } from "react-icons/io";
import { FaRegPenToSquare } from "react-icons/fa6";
import Swal from "sweetalert2";

const Branchement = () => {
  const [currentForm, setCurrentForm] = useState("first_form");
  const [activeSteps, setActiveSteps] = useState<string[]>(["sp1"]);
  const router = useRouter();
  const [formData, setFormData] = useState({
    step1: {
      radio: "",
      beneficiary: "",
      last_name: "",
      first_name: "",
      email: "",
      phone: "",
    },
    step2: {
      DeliveryOption: "",
      otherSpecification: "",
    },
    step3: {
      codePostal: "",
      Commune: "",
      facultatif: "",
      Voie: "",
      cadastral: "",
      referenceBranchement: Array(14).fill(""),
    },
    step4: {
      portesFenetres: "",
      echeance: "",
      autorisation: "",
    },
    step5: {},
  });
  const [errors, setErrors] = useState({
    radio: "",
    beneficiary: "",
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    DeliveryOption: "",
    codePostal: "",
    Commune: "",
    Voie: "",
    echeance: "",
    autorisation: "",
    referenceBranchement: "", // Add this line for the 14 inputs validation
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Ensure referenceBranchement is always an array of 14 empty strings
      if (!Array.isArray(parsedData.step3.referenceBranchement)) {
        parsedData.step3.referenceBranchement = Array(14).fill("");
      }
      setFormData(parsedData);
    }
  }, []);

  const handleFormSwitch = (
    targetForm: string,
    activateStep: string,
    deactivateStep: string
  ) => {
    if (validateForm()) {
      setCurrentForm(targetForm);
      setActiveSteps((prev) =>
        prev.filter((step) => step !== deactivateStep).concat(activateStep)
      );
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [currentForm === "first_form"
        ? "step1"
        : currentForm === "second_form"
        ? "step2"
        : currentForm === "three_form"
        ? "step3"
        : "step4"]: {
        ...formData[
          currentForm === "first_form"
            ? "step1"
            : currentForm === "second_form"
            ? "step2"
            : currentForm === "three_form"
            ? "step3"
            : "step4"
        ],
        [name]: newValue,
      },
    });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [currentForm === "first_form"
        ? "step1"
        : currentForm === "second_form"
        ? "step2"
        : currentForm === "three_form"
        ? "step3"
        : "step4"]: {
        ...formData[
          currentForm === "first_form"
            ? "step1"
            : currentForm === "second_form"
            ? "step2"
            : currentForm === "three_form"
            ? "step3"
            : "step4"
        ],
        [name]: value,
      },
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      radio: "",
      beneficiary: "",
      last_name: "",
      first_name: "",
      email: "",
      phone: "",
      DeliveryOption: "",
      codePostal: "",
      Commune: "",
      Voie: "",
      echeance: "",
      autorisation: "",
      referenceBranchement: "", // Add this line for the 14 inputs validation
    };

    if (currentForm === "first_form") {
      if (!formData.step1.radio) {
        newErrors.radio = "Please select an option";
        valid = false;
      }
      if (!formData.step1.beneficiary) {
        newErrors.beneficiary = "Please select an option";
        valid = false;
      }
      if (!formData.step1.last_name) {
        newErrors.last_name = "Please enter your last name";
        valid = false;
      }
      if (!formData.step1.first_name) {
        newErrors.first_name = "Please enter your first name";
        valid = false;
      }
      if (!formData.step1.email) {
        newErrors.email = "Please enter your email";
        valid = false;
      }
      if (!formData.step1.phone) {
        newErrors.phone = "Please enter your phone number";
        valid = false;
      }
    } else if (currentForm === "second_form") {
      if (!formData.step2.DeliveryOption) {
        newErrors.DeliveryOption = "Please select an option";
        valid = false;
      }
      // Add validation for "Autre" option
      if (
        formData.step2.DeliveryOption === "Autre" &&
        !formData.step2.otherSpecification
      ) {
        newErrors.DeliveryOption = "Please specify other type";
        valid = false;
      }
    } else if (currentForm === "three_form") {
      if (!formData.step3.codePostal) {
        newErrors.codePostal = "Please enter your postal code";
        valid = false;
      }
      if (!formData.step3.Commune) {
        newErrors.Commune = "Please enter your commune";
        valid = false;
      }
      if (!formData.step3.Voie) {
        newErrors.Voie = "Please enter your voie";
        valid = false;
      }
      if (formData.step3.referenceBranchement.some((value) => value === "")) {
        newErrors.referenceBranchement =
          "Please fill all the reference branchement fields";
        valid = false;
      }
    } else if (currentForm === "four_form") {
      if (!formData.step4.echeance) {
        newErrors.echeance = "Please select an option";
        valid = false;
      }
      if (!formData.step4.autorisation) {
        newErrors.autorisation = "Please select an option";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const sendEmail = () => {
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");

    if (!formData || Object.keys(formData).length === 0) {
      alert("No form data found. Please fill out the form before submitting.");
      return;
    }

    const templateParams = {
      from_name: `${formData.step1.first_name} ${formData.step1.last_name}`,
      from_email: formData.step1.email,
      phone: formData.step1.phone,
      radio_option: formData.step1.radio,
      beneficiary: formData.step1.beneficiary,
      delivery_option: formData.step2.DeliveryOption,
      code_postal: formData.step3.codePostal,
      commune: formData.step3.Commune,
      facultatif: formData.step3.facultatif || "",
      voie: formData.step3.Voie || "",
      cadastral: formData.step3.cadastral || "",
      reference_branchement: formData.step3.referenceBranchement.join(""),
    };

    emailjs
    .send(
      "service_spv48fj", // Your EmailJS service ID
      "template_u1o86yk", // Your EmailJS template ID
      templateParams,
      "A3yWY43a_6C3o-SDF" // Your EmailJS user ID
    )
    .then(() => {
     
      Swal.fire({
        title: 'Success!',
        text: 'Email Bien Envoyer',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/")
          localStorage.removeItem("formData"); // Optionally clear form data after submission
        }
      });
     
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      alert("Failed to submit form. Please try again later.");
    });
  };

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const newReferenceBranchement = [...formData.step3.referenceBranchement];
    newReferenceBranchement[index] = value;
    setFormData({
      ...formData,
      step3: {
        ...formData.step3,
        referenceBranchement: newReferenceBranchement,
      },
    });

    if (value.length === 1 && index < inputsRef.current.length - 1) {
      // Move to the next input
      inputsRef.current[index + 1]?.focus();
    } else if (value.length === 0 && index > 0) {
      // Move to the previous input on backspace
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center items-center w-full mb-20 mt-20">
      <div className="max-w-[900px] w-full">
      <div className="mb-8 mt-5">
          <div className="flex items-center justify-center mt-10">
            <div className="flex items-center text-blue-700 space-x-7">
              <div
                className={`step ${
                  activeSteps.includes("sp1") ? "active" : ""
                }`}
                id="sp1"
              >
                <IoMdPaper
                  className={`size-5 inline-block lg:hidden ${
                    activeSteps.includes("sp1") ? "active" : ""
                  }`}
                />{" "}
                <span className="hidden lg:inline-block">Pour commencer</span>
              </div>
              <span>&gt;</span>
              <div
                className={`step ${
                  activeSteps.includes("sp2") ? "active" : ""
                }`}
                id="sp2"
              >
                <IoFolderOpenOutline
                  className={`size-5 inline-block lg:hidden ${
                    activeSteps.includes("sp2") ? "active" : ""
                  }`}
                />{" "}
                <span className="hidden lg:inline-block">Mon Project</span>
              </div>
              <span>&gt;</span>
              <div
                className={`step ${
                  activeSteps.includes("sp3") ? "active" : ""
                }`}
                id="sp3"
              >
                <FaRegPenToSquare
                  className={`size-5 inline-block lg:hidden ${
                    activeSteps.includes("sp2") ? "active" : ""
                  }`}
                />{" "}
                <span className="hidden lg:inline-block">Mon planning</span>
              </div>
              <span>&gt;</span>
              <div
                className={`step ${
                  activeSteps.includes("sp4") ? "active" : ""
                }`}
                id="sp4"
              >
                <LuFileCheck2
                  className={`size-5 inline-block lg:hidden ${
                    activeSteps.includes("sp1") ? "active" : ""
                  }`}
                />{" "}
                <span className="hidden lg:inline-block">Récapitulatif</span>
              </div>
            </div>
          </div>
        </div>

        {currentForm === "first_form" && (
          <div
            id="first_form"
            className="w-full p-[40px] rounded"
            style={{ boxShadow: "0 10px 30px 0 rgba(62, 87, 111, 0.2)" }}
          >
            <h2 className="stepper-title text-[16px] leading-[24px] font-light text-left text-[#212529] mb-6">
              Quel est votre besoin ?
            </h2>
            <form>
              <ul className="flex justify-start items-start flex-col md:flex-row w-full gap-2 text-center md:grid-cols-3 mb-[80px]">
                <li>
                  <input
                    type="radio"
                    id="radio1"
                    name="radio"
                    value="Déplacement de compteur"
                    className="hidden peer"
                    onChange={handleRadioChange}
                    required
                  />
                  <label
                    htmlFor="radio1"
                    className="viab transition-all duration-300 hover:border-[#1623dc] hover:text-[#1623dc] inline-flex items-center justify-between w-auto p-3 text-gray-500 rounded bg-white border-[1px] border-gray-400 cursor-pointer peer-checked:text-black peer-checked:border-[#005EB8] peer-checked:bg-[#bfd7ed]"
                  >
                    <div className="block text-center">
                      <div className="w-full text-center">
                        Déplacement de compteur
                      </div>
                    </div>
                  </label>
                  {errors.radio && (
                    <p className="text-red-500">{errors.radio}</p>
                  )}
                </li>
                <li>
                  <input
                    type="radio"
                    id="radio2"
                    name="radio"
                    value="Modification de branchement"
                    className="hidden peer"
                    onChange={handleRadioChange}
                  />
                  <label
                    htmlFor="radio2"
                    className="viab transition-all duration-300 hover:border-[#1623dc] hover:text-[#1623dc] inline-flex items-center justify-between w-auto p-3 text-gray-500 rounded bg-white border-[1px] border-gray-400 cursor-pointer peer-checked:text-black peer-checked:border-[#005EB8] peer-checked:bg-[#bfd7ed]"
                  >
                    <div className="block">
                      <div className="w-full">Modification de branchement</div>
                    </div>
                  </label>
                  {errors.radio && (
                    <p className="text-red-500">{errors.radio}</p>
                  )}
                </li>
                <li>
                  <input
                    type="radio"
                    id="radio3"
                    name="radio"
                    value="Suppression de branchement électrique"
                    className="hidden peer"
                    onChange={handleRadioChange}
                  />
                  <label
                    htmlFor="radio3"
                    className="viab transition-all duration-300 hover:border-[#1623dc] hover:text-[#1623dc] inline-flex items-center justify-between w-auto p-3 text-gray-500 rounded bg-white border-[1px] border-gray-400 cursor-pointer peer-checked:text-black peer-checked:border-[#005EB8] peer-checked:bg-[#bfd7ed]"
                  >
                    <div className="block">
                      <div className="w-full">
                        Suppression de branchement électrique
                      </div>
                    </div>
                  </label>
                  {errors.radio && (
                    <p className="text-red-500">{errors.radio}</p>
                  )}
                </li>
              </ul>
            </form>
            <h3 className="stepper-title text-[16px] leading-[24px] font-light text-left text-[#212529] mb-6">
              Le bénéficiaire est...
            </h3>
            <form>
              <ul className="flex justify-start items-start flex-col md:flex-row w-full gap-2 text-center md:grid-cols-3 mb-[80px]">
                <li>
                  <input
                    type="radio"
                    id="radio4"
                    name="beneficiary"
                    value="Un particulier"
                    className="hidden peer"
                    onChange={handleRadioChange}
                    required
                  />
                  <label
                    htmlFor="radio4"
                    className="viab transition-all duration-300 hover:border-[#1623dc] hover:text-[#1623dc] inline-flex items-center justify-between w-auto p-3 text-gray-500 rounded bg-white border-[1px] border-gray-400 cursor-pointer peer-checked:text-black peer-checked:border-[#005EB8] peer-checked:bg-[#bfd7ed]"
                  >
                    <div className="block text-center">
                      <div className="w-full text-center flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6 inline-block mr-[6px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                          />
                        </svg>
                        Un particulier
                      </div>
                    </div>
                  </label>
                  {errors.beneficiary && (
                    <p className="text-red-500">{errors.beneficiary}</p>
                  )}
                </li>
                <li>
                  <input
                    type="radio"
                    id="radio5"
                    name="beneficiary"
                    value="Une Entreprise"
                    className="hidden peer"
                    onChange={handleRadioChange}
                  />
                  <label
                    htmlFor="radio5"
                    className="viab transition-all duration-300 hover:border-[#1623dc] hover:text-[#1623dc] inline-flex items-center justify-between w-auto p-3 text-gray-500 rounded bg-white border-[1px] border-gray-400 cursor-pointer peer-checked:text-black peer-checked:border-[#005EB8] peer-checked:bg-[#bfd7ed]"
                  >
                    <div className="w-full text-center flex justify-start items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 inline-block mr-[6px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                        />
                      </svg>
                      Une Entreprise
                    </div>
                  </label>
                  {errors.beneficiary && (
                    <p className="text-red-500">{errors.beneficiary}</p>
                  )}
                </li>
              </ul>
            </form>
            <div className="w-full mt-5 border-t-[1px] border-slate-200 pt-10">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="stepper-title text-black text-md"
                    >
                      Nom:
                    </label>
                    <input
                      type="text"
                      placeholder="Nom"
                      id="first_name"
                      name="last_name"
                      className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={handleChange}
                    />
                    {errors.last_name && (
                      <p className="text-red-500">{errors.last_name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="stepper-title text-black text-md"
                    >
                      Prénom:
                    </label>
                    <input
                      type="text"
                      placeholder="Prénom"
                      id="last_name"
                      name="first_name"
                      className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={handleChange}
                    />
                    {errors.first_name && (
                      <p className="text-red-500">{errors.first_name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="stepper-title text-black text-md"
                    >
                      Email:
                    </label>
                    <input
                      type="text"
                      placeholder="Email"
                      id="email"
                      name="email"
                      className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="stepper-title text-black text-md"
                    >
                      Téléphone:
                    </label>
                    <input
                      type="text"
                      placeholder="Téléphone"
                      id="phone"
                      name="phone"
                      className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center w-full mt-12">
                  <button
                    id="submit_first_button"
                    onClick={() =>
                      handleFormSwitch("second_form", "sp2", "sp1")
                    }
                    type="button"
                    className="stepper-title rounded-full py-3 px-20 text-white bg-[#16a974]"
                  >
                    Continuer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {currentForm === "second_form" && (
          <div
            id="second_form"
            className="w-full p-[40px] rounded"
            style={{ boxShadow: "0 10px 30px 0 rgba(62, 87, 111, 0.2)" }}
          >
            <h2 className="stepper-title text-[16px] leading-[24px] font-light text-left text-[#212529] mb-10">
              Quel type de site souhaitez-vous raccorder / réseau électrique ?
            </h2>
            <div className="max-w-[600px] mx-auto">
              <fieldset className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="DeliveryPriority1"
                      className="viab2 transition-all duration-300 flex cursor-pointer h-[120px] items-center justify-center flex-col gap-4 rounded-xl border border-slate-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-[#005EB8] has-[:checked]:ring-1 has-[:checked]:ring-[#005EB8] has-[:checked]:bg-[#bfd7ed]"
                    >
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-12 text-slate-500 -mb-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                          />
                        </svg>
                      </p>
                      <p className="text-slate-800 font-semibold text-[17px] text-center">
                        Maison
                      </p>
                      <input
                        type="radio"
                        name="DeliveryOption"
                        value="Maison"
                        id="DeliveryPriority1"
                        className="sr-only"
                        onChange={handleRadioChange}
                      />
                    </label>
                    {errors.DeliveryOption && (
                      <p className="text-red-500">{errors.DeliveryOption}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="DeliveryPriority2"
                      className="viab2 transition-all duration-300 flex cursor-pointer h-[120px] items-center justify-center flex-col gap-4 rounded-xl border border-slate-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-[#005EB8] has-[:checked]:ring-1 has-[:checked]:ring-[#005EB8] has-[:checked]:bg-[#bfd7ed]"
                    >
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-12 text-slate-500 -mb-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                          />
                        </svg>
                      </p>
                      <p className="text-slate-800 font-semibold text-[17px] text-center">
                        Appartement ou local en immeuble
                      </p>
                      <input
                        type="radio"
                        name="DeliveryOption"
                        value="Appartement ou local en immeuble"
                        id="DeliveryPriority2"
                        className="sr-only"
                        onChange={handleRadioChange}
                      />
                    </label>
                    {errors.DeliveryOption && (
                      <p className="text-red-500">{errors.DeliveryOption}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="DeliveryPriority3"
                      className="viab2 transition-all duration-300 flex cursor-pointer h-[120px] items-center justify-center flex-col gap-4 rounded-xl border border-slate-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-[#005EB8] has-[:checked]:ring-1 has-[:checked]:ring-[#005EB8] has-[:checked]:bg-[#bfd7ed]"
                    >
                      <p>
                        <svg
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-12 text-slate-500 -mb-2"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9 18H11V28H37V18H39V28H40.5C40.7761 28 41 28.2239 41 28.5V29.5C41 29.7761 40.7761 30 40.5 30H7.5C7.22386 30 7 29.7761 7 29.5V28.5C7 28.2239 7.22386 28 7.5 28H9V18ZM10 33V40H38V33H10ZM9 31C8.44772 31 8 31.4477 8 32V41C8 41.5523 8.44772 42 9 42H39C39.5523 42 40 41.5523 40 41V32C40 31.4477 39.5523 31 39 31H9Z"
                              fill="#64748b"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.1888 8L8.04354 13.9129C8.01478 13.9922 8 14.0761 8 14.1609V16.551C8 17.3592 8.64747 18 9.42857 18C10.2097 18 10.8571 17.3592 10.8571 16.551C10.8571 15.9987 11.3049 15.551 11.8571 15.551C12.4094 15.551 12.8571 15.9987 12.8571 16.551C12.8571 17.3592 13.5046 18 14.2857 18C15.0668 18 15.7143 17.3592 15.7143 16.551C15.7143 15.9987 16.162 15.551 16.7143 15.551C17.2666 15.551 17.7143 15.9987 17.7143 16.551C17.7143 17.3592 18.3618 18 19.1429 18C19.9236 18 20.5708 17.3598 20.5714 16.5522C20.5719 16.0003 21.0195 15.553 21.5714 15.553C22.1234 15.553 22.571 16.0003 22.5714 16.5522C22.5721 17.3598 23.2193 18 24 18C24.7811 18 25.4286 17.3592 25.4286 16.551C25.4286 15.9987 25.8763 15.551 26.4286 15.551C26.9809 15.551 27.4286 15.9987 27.4286 16.551C27.4286 17.3592 28.076 18 28.8571 18C29.6379 18 30.2851 17.3598 30.2857 16.5522C30.2862 16.0003 30.7337 15.553 31.2857 15.553C31.8377 15.553 32.2853 16.0003 32.2857 16.5522C32.2864 17.3598 32.9336 18 33.7143 18C34.4954 18 35.1429 17.3592 35.1429 16.551C35.1429 15.9987 35.5906 15.551 36.1429 15.551C36.6951 15.551 37.1429 15.9987 37.1429 16.551C37.1429 17.3592 37.7903 18 38.5714 18C39.3525 18 40 17.3592 40 16.551V14.1609C40 14.0761 39.9852 13.9922 39.9565 13.9129L37.8112 8H10.1888ZM37.7764 7.90395L37.7763 7.9037L37.9181 7.85225L37.7763 7.90369C37.7763 7.90378 37.7763 7.90387 37.7764 7.90395ZM36.1429 18.9856C35.5233 19.6115 34.6656 20 33.7143 20C32.7629 20 31.9053 19.6115 31.2857 18.9856C30.6662 19.6115 29.8085 20 28.8571 20C27.9058 20 27.0481 19.6115 26.4286 18.9856C25.809 19.6115 24.9514 20 24 20C23.0486 20 22.191 19.6115 21.5714 18.9856C20.9519 19.6115 20.0942 20 19.1429 20C18.1915 20 17.3338 19.6115 16.7143 18.9856C16.0947 19.6115 15.2371 20 14.2857 20C13.3344 20 12.4767 19.6115 11.8571 18.9856C11.2376 19.6115 10.3799 20 9.42857 20C7.52715 20 6 18.4479 6 16.551V14.1609C6 13.8438 6.05528 13.529 6.16345 13.2308L8.34363 7.22159C8.60829 6.4921 9.30012 6 10.0819 6H37.9181C38.6999 6 39.3917 6.4921 39.6564 7.2216L41.8366 13.2308C41.9447 13.529 42 13.8438 42 14.1609V16.551C42 18.4479 40.4728 20 38.5714 20C37.6201 20 36.7624 19.6115 36.1429 18.9856Z"
                              fill="#64748b"
                            />
                            <path
                              d="M12 25.5C12 25.2239 12.2239 25 12.5 25H15.5C15.7761 25 16 25.2239 16 25.5V27.5C16 27.7761 15.7761 28 15.5 28H12.5C12.2239 28 12 27.7761 12 27.5V25.5Z"
                              fill="#64748b"
                            />
                            <path
                              d="M14 26.5C14 26.2239 14.2239 26 14.5 26H17.5C17.7761 26 18 26.2239 18 26.5V27.5C18 27.7761 17.7761 28 17.5 28H14.5C14.2239 28 14 27.7761 14 27.5V26.5Z"
                              fill="#64748b"
                            />
                            <path
                              d="M22 26.5C22 27.3284 21.3284 28 20.5 28C19.6716 28 19 27.3284 19 26.5C19 25.6716 19.6716 25 20.5 25C21.3284 25 22 25.6716 22 26.5Z"
                              fill="#64748b"
                            />
                          </g>
                        </svg>
                      </p>
                      <p className="text-slate-800 font-semibold text-[17px] text-center">
                        Local horse immeuble
                      </p>
                      <input
                        type="radio"
                        name="DeliveryOption"
                        value="Local horse immeuble"
                        id="DeliveryPriority3"
                        className="sr-only"
                        onChange={handleRadioChange}
                      />
                    </label>
                    {errors.DeliveryOption && (
                      <p className="text-red-500">{errors.DeliveryOption}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="DeliveryPriority5"
                      className="viab2 transition-all duration-300 flex cursor-pointer h-[120px] items-center justify-center flex-col gap-4 rounded-xl border border-slate-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-[#005EB8] has-[:checked]:ring-1 has-[:checked]:ring-[#005EB8] has-[:checked]:bg-[#bfd7ed]"
                    >
                      <p>
                        <svg
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#000000"
                          className="size-12 text-slate-500 -mb-2"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <g id="SVGRepo_iconCarrier">
                            <polygon
                              fill="var(--ci-primary-color, #64748b)"
                              points="40.841 312 144.493 199.12 216.397 271.024 216.397 271.024 292.687 347.313 315.313 324.687 238.244 247.617 327.738 151.73 470.836 312 496 312 496 292.136 328.262 104.27 215.603 224.976 143.507 152.88 16 291.741 16 312 40.841 312"
                              className="ci-primary"
                            />
                            <rect
                              width={480}
                              height={32}
                              x={16}
                              y={392}
                              fill="var(--ci-primary-color, #64748b)"
                              className="ci-primary"
                            />
                          </g>
                        </svg>
                      </p>
                      <p className="text-slate-800 font-semibold text-[17px] text-center">
                        Immeuble ou batiment
                      </p>
                      <input
                        type="radio"
                        name="DeliveryOption"
                        value="Immeuble ou batiment"
                        id="DeliveryPriority5"
                        className="sr-only"
                        onChange={handleRadioChange}
                      />
                    </label>
                    {errors.DeliveryOption && (
                      <p className="text-red-500">{errors.DeliveryOption}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="DeliveryPriority6"
                      className="viab2 transition-all duration-300 flex cursor-pointer h-[120px] items-center justify-center flex-col gap-4 rounded-xl border border-slate-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-[#005EB8] has-[:checked]:ring-1 has-[:checked]:ring-[#005EB8] has-[:checked]:bg-[#bfd7ed]"
                    >
                      <p>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="size-12 text-slate-500 -mb-2"
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
                              d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z"
                              stroke="#64748b"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              opacity="0.5"
                              d="M21 7.5L12 12M12 12L3 7.5M12 12V21.5"
                              stroke="#64748b"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </g>
                        </svg>
                      </p>
                      <p className="text-slate-800 font-semibold text-[17px] text-center">
                        Autre
                      </p>
                      <input
                        type="radio"
                        name="DeliveryOption"
                        value="Autre"
                        id="DeliveryPriority6"
                        className="sr-only"
                        onChange={handleRadioChange}
                      />
                    </label>
                    {errors.DeliveryOption && (
                      <p className="text-red-500">{errors.DeliveryOption}</p>
                    )}
                  </div>
                </div>
                {formData.step2.DeliveryOption === "Autre" && (
                  <textarea
                    className="mt-4 w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005EB8] focus:border-[#005EB8]"
                    placeholder="Please specify other type..."
                    rows={4}
                    name="otherSpecification"
                    value={formData.step2.otherSpecification || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        step2: {
                          ...formData.step2,
                          otherSpecification: e.target.value,
                        },
                      });
                    }}
                  />
                )}
                <div className="flex justify-center items-center gap-6 !mt-10">
                  <button
                    id="prev1"
                    onClick={() => handleFormSwitch("first_form", "sp1", "sp2")}
                    type="button"
                    className="bg-white border-[1px] border-[#16a974] rounded-full text-[#16a974] py-2.5 px-10 text-md font-semibold"
                  >
                    Precedent
                  </button>
                  <button
                    id="next1"
                    onClick={() => handleFormSwitch("three_form", "sp3", "sp2")}
                    type="button"
                    className="bg-[#16a974] border-[1px] border-[#16a974] rounded-full text-white py-2.5 px-10 text-md font-semibold"
                  >
                    Continuer
                  </button>
                </div>
              </fieldset>
            </div>
          </div>
        )}

        {currentForm === "three_form" && (
          <div
            id="three_form"
            className="w-full p-[40px] rounded"
            style={{ boxShadow: "0 10px 30px 0 rgba(62, 87, 111, 0.2)" }}
          >
            <h2 className="stepper-title text-[16px] leading-[24px] font-light text-left text-[#212529] mb-10">
              Où se situe votre projet ?
            </h2>
            <form className="mb-14">
              <div className="lg:flex gap-x-6 gap-y-8 mb-6">
                <div className="lg:w-4/12 mb-6">
                  <div>
                    <label
                      htmlFor="codePostal"
                      className="relative block overflow-hidden border-b-2 border-gray-200 bg-transparent pt-3 focus-within:border-b-2 focus-within:border-[#16a974]"
                    >
                      <input
                        type="tel"
                        id="codePostal"
                        name="codePostal"
                        placeholder="Code Postal"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-lg"
                        onChange={handleChange}
                      />
                      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Code Postal
                      </span>
                    </label>
                    {errors.codePostal && (
                      <p className="text-red-500">{errors.codePostal}</p>
                    )}
                  </div>
                </div>
                <div className="lg:w-8/12">
                  <div>
                    <label
                      htmlFor="Commune"
                      className="relative block overflow-hidden border-b-2 border-gray-200 bg-transparent pt-3 focus-within:border-b-2 focus-within:border-[#16a974]"
                    >
                      <input
                        type="text"
                        id="Commune"
                        name="Commune"
                        placeholder="Commune"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-lg"
                        onChange={handleChange}
                      />
                      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Commune
                      </span>
                    </label>
                    {errors.Commune && (
                      <p className="text-red-500">{errors.Commune}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:flex gap-6 mb-6">
                <div className="lg:w-4/12 mb-6">
                  <div>
                    <label
                      htmlFor="facultatif"
                      className="relative block overflow-hidden border-b-2 border-gray-200 bg-transparent pt-3 focus-within:border-b-2 focus-within:border-[#16a974]"
                    >
                      <input
                        type="tel"
                        id="facultatif"
                        name="facultatif"
                        placeholder="N° (facultatif)"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-lg"
                        onChange={handleChange}
                      />
                      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        N° (facultatif)
                      </span>
                    </label>
                  </div>
                </div>
                <div className="lg:w-8/12">
                  <div>
                    <label
                      htmlFor="Voie"
                      className="relative block overflow-hidden border-b-2 border-gray-200 bg-transparent pt-3 focus-within:border-b-2 focus-within:border-[#16a974]"
                    >
                      <input
                        type="text"
                        id="Voie"
                        name="Voie"
                        placeholder="Voie"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-lg"
                        onChange={handleChange}
                      />
                      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Voie
                      </span>
                    </label>
                    {errors.Voie && (
                      <p className="text-red-500">{errors.Voie}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:flex">
                <div className="w-full">
                  <div>
                    <label
                      htmlFor="cadastral"
                      className="relative block overflow-hidden border-b-2 border-gray-200 bg-transparent pt-3 focus-within:border-b-2 focus-within:border-[#16a974]"
                    >
                      <input
                        type="tel"
                        id="cadastral"
                        name="cadastral"
                        placeholder="Complément d'adresse / N° cadastral (facultatif)"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-lg"
                        onChange={handleChange}
                      />
                      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Complément d&lsquo;adresse / N° cadastral (facultatif)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </form>
            {/* <h2 className="stepper-title text-[16px] leading-[24px] font-light text-left text-[#212529] mb-10">
              Votre terrain possède-t-il déjà un coffret électrique en limite de
              propriété ? (La présence d&lsquo;un coffret signifie que le
              terrain est viabilisé)?
            </h2>
            <div className="flex space-x-4 mb-14">
              <label className="flex flex-col items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="terrain"
                    value="Oui, mon terrain est viabilisé"
                    className="sr-only peer"
                    onChange={handleRadioChange}
                  />
                  <div className="viab2 transition-all duration-300 w-64 h-74 rounded-lg p-3 border-2 border-gray-300 peer-checked:border-[#16a974] overflow-hidden">
                    <div className="text-black text-sm text-center mb-0.5">
                      Oui, mon terrain est viabilisé
                    </div>
                    <img
                      src="https://www.bhg.com/thmb/rpSF7vUHwTf0FF-6JAIC_m7gAW0=/1280x0/filters:no_upscale():strip_icc()/unpainted-garden-shed-with-window-boxes-038b8742-c10f66637cee44f1b6d081180423ed79.jpg"
                      alt="Terrain viabilisé"
                      className="w-full h-full object-cover"
                    />
                    <div className="text-black text-xs text-center">
                      Exemple de terrain viabilisé
                    </div>
                  </div>
                </div>
              </label>
              <label className="flex flex-col items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="terrain"
                    value="Non, mon terrain n‘est pas"
                    className="sr-only peer"
                    onChange={handleRadioChange}
                  />
                  <div className="viab2 transition-all duration-300 w-64 h-74 rounded-lg p-3 border-2 border-gray-300 peer-checked:border-[#16a974] overflow-hidden">
                    <div className="text-black text-sm text-center mb-0.5">
                      Non, mon terrain n&lsquo;est pas
                    </div>
                    <img
                      src="https://www.bhg.com/thmb/rpSF7vUHwTf0FF-6JAIC_m7gAW0=/1280x0/filters:no_upscale():strip_icc()/unpainted-garden-shed-with-window-boxes-038b8742-c10f66637cee44f1b6d081180423ed79.jpg"
                      alt="Terrain viabilisé"
                      className="w-full h-full object-cover"
                    />
                    <div className="text-black text-xs text-center">
                      Exemple de terrain non viabilisé
                    </div>
                  </div>
                </div>
              </label>
            </div> */}

            <div className="p-6 bg-white rounded-lg shadow-md w-full mb-10 flex justify-center items-center flex-col">
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-800">
                  Si vous en disposez, quelle est la référence de votre
                  branchement (PDL) ?
                </p>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  Sinon, merci de préciser le numéro cadastral de la parcelle
                  dans le complément d&lsquo;adresse à la question suivante.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
                {Array.from({ length: 14 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-full h-12 border rounded-lg text-center text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ref={(el) => {
                      inputsRef.current[index] = el!;
                    }}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ))}
              </div>
              {errors.referenceBranchement && (
                <p className="text-red-500">{errors.referenceBranchement}</p>
              )}
            </div>

            <div className="flex justify-end items-center gap-3 mt-10">
              <button
                id="prev2"
                onClick={() => handleFormSwitch("second_form", "sp2", "sp3")}
                type="button"
                className="bg-white border-[1px] border-[#16a974] rounded text-[#16a974] py-2.5 px-10 text-md font-semibold"
              >
                Précédent
              </button>
              <button
                id="next2"
                onClick={() => handleFormSwitch("four_form", "sp4", "sp3")}
                type="button"
                className="bg-blue-600 border-[1px] border-blue-600 rounded text-white py-2.5 px-10 text-md font-semibold"
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {currentForm === "four_form" && (
          <div
            id="five_form"
            className="w-full p-[40px] rounded"
            style={{ boxShadow: "0 10px 30px 0 rgba(62, 87, 111, 0.2)" }}
          >
            <div className="mb-10">
              <h4 className="stepper-title text-[#1523dc] font-semibold text-md mb-4 pb-2 border-b-2 border-[#1523dc]">
                Ma demande
              </h4>
              <ul className="mb-8">
                <li className="mb-3 flex justify-start items-center gap-3">
                  <PiUsersThreeLight className="size-7 inline-block text-slate-500" />
                  Votre Besoin: {formData.step1.radio}
                </li>
                <li className="flex justify-start items-center gap-3 mb-3">
                  <AiOutlineUserSwitch className="size-7 inline-block text-slate-500" />
                  Bénéficiaire: {formData.step1.beneficiary}
                </li>
                <li className="mb-3 flex justify-start items-center gap-3">
                  <FiUser className="size-7 inline-block text-slate-500" />
                  {formData.step1.first_name} {formData.step1.last_name}
                </li>
                <li className="mb-3 flex justify-start items-center gap-3">
                  <IoMailOutline className="size-7 inline-block text-slate-500" />
                  {formData.step1.email} - {formData.step1.phone}
                </li>
              </ul>
            </div>
            <div className="mb-10">
              <h4 className="stepper-title text-[#1523dc] font-semibold text-md mb-4 pb-2 border-b-2 border-[#1523dc]">
                Mon Project
              </h4>
              <ul className="mb-8">
                <li className="mb-3 flex justify-start items-center gap-3">
                  <FaRegSquare className="size-7 inline-block text-slate-500" />
                  Le type de site souhaitez-vous raccorder:{" "}
                  {formData.step2.DeliveryOption}
                </li>
                <li className="mb-3 pb-2 border-b-[1px] border-slate-200">
                  {formData.step2.otherSpecification}
                </li>
              </ul>
            </div>
            <div className="mb-10">
              <h4 className="stepper-title text-[#1523dc] font-semibold text-md mb-4 pb-2 border-b-2 border-[#1523dc]">
                Mon Planning
              </h4>
              <ul className="mb-8">
                <li className="flex justify-start items-center gap-3 mb-3">
                  <SlLocationPin className="size-9 inline-block text-slate-500" />
                  Où se situe votre projet: {formData.step3.codePostal},{" "}
                  {formData.step3.Commune}, {formData.step3.cadastral},{" "}
                  {formData.step3.Voie}, {formData.step3.facultatif}.
                </li>
                <li className="flex justify-start items-center gap-3 mb-3">
                  <PiPassword className="size-9 inline-block text-slate-500" />
                  Référence de branchement:{" "}
                  <span className="capitalize font-bold text-[#1523dc]">
                    {formData.step3.referenceBranchement}
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex justify-end items-center gap-3 mt-10">
              <button
                id="prev4"
                onClick={() => handleFormSwitch("three_form", "sp3", "sp4")}
                type="button"
                className="bg-white border-[1px] border-[#16a974] rounded text-[#16a974] py-2.5 px-10 text-md font-semibold"
              >
                Précédent
              </button>
              <button
                id="submit"
                type="button"
                onClick={sendEmail}
                className="bg-blue-600 border-[1px] border-blue-600 rounded text-white py-2.5 px-10 text-md font-semibold"
              >
                Transmettre ma demande
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Branchement;
