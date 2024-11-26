"use client";
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { PiUsersThreeLight } from "react-icons/pi";
import { IoFolderOpenOutline, IoMailOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { LuDoorOpen, LuFileCheck2 } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { FaRegSquare } from "react-icons/fa";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoMdPaper } from "react-icons/io";
import Swal from "sweetalert2";

const Raccordement = () => {
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
      number: "",
      Option1: false,
    },
    step4: {
      portesFenetres: "",
      additionalInfo: "",
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
    number: "",
    portesFenetres: "",
  });
  const numbers = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 36, "Plus de 36"];
  const [selectedNumber, setSelectedNumber] = useState<string | number | null>(
    null
  );
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setIsCheckboxChecked(parsedData.step3.Option1);
      setSelectedNumber(parsedData.step3.number);
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
    setSelectedNumber(value);
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsCheckboxChecked(checked);
    setFormData({
      ...formData,
      step3: {
        ...formData.step3,
        number: checked ? "Je ne connais pas mon besoin" : String(selectedNumber), // Set the number field to the checkbox value if checked
        Option1: checked, // Update Option1 in form data
      },
    });
    setSelectedNumber(null); // Reset selected number when checkbox is checked
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      step4: {
        ...formData.step4,
        additionalInfo: value,
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
      number: "",
      portesFenetres: "",
      echeance: "",
      autorisation: "",
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
      if (!isCheckboxChecked && !formData.step3.number) {
        newErrors.number = "Please select a number";
        valid = false;
      }
    } else if (currentForm === "four_form") {
      if (!formData.step4.portesFenetres) {
        newErrors.portesFenetres = "Please select an option";
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
      number: formData.step3.number || "",
      option1: formData.step3.Option1 ? "Yes" : "No",
      portes_fenetres: formData.step4.portesFenetres || "",
      echeance: formData.step4.echeance || "",
      autorisation: formData.step4.autorisation || "",
      additional_info: formData.step4.additionalInfo || "", // Include additional info
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
                    value="Déclarer mes panneaux solaire"
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
                        Déclarer mes panneaux solaire
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
                    value="Souscrire contrat EDF / ENGIE"
                    className="hidden peer"
                    onChange={handleRadioChange}
                  />
                  <label
                    htmlFor="radio2"
                    className="viab transition-all duration-300 hover:border-[#1623dc] hover:text-[#1623dc] inline-flex items-center justify-between w-auto p-3 text-gray-500 rounded bg-white border-[1px] border-gray-400 cursor-pointer peer-checked:text-black peer-checked:border-[#005EB8] peer-checked:bg-[#bfd7ed]"
                  >
                    <div className="block">
                      <div className="w-full">
                        Souscrire Contrat EDF / ENGIE
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
                    id="radio3"
                    name="radio"
                    value="Modification de puissance"
                    className="hidden peer"
                    onChange={handleRadioChange}
                  />
                  <label
                    htmlFor="radio3"
                    className="viab transition-all duration-300 hover:border-[#1623dc] hover:text-[#1623dc] inline-flex items-center justify-between w-auto p-3 text-gray-500 rounded bg-white border-[1px] border-gray-400 cursor-pointer peer-checked:text-black peer-checked:border-[#005EB8] peer-checked:bg-[#bfd7ed]"
                  >
                    <div className="block">
                      <div className="w-full">Modification de Puissance</div>
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
            <h2 className="stepper-title text-[16px] leading-[24px] font-light text-left text-[#212529] mb-5">
              De quelle puissance maximale (en kVA) aurez-vous besoin pour votre
              projet?
            </h2>
            <div className="flex items-center justify-start space-x-7 border-2 border-slate-200 rounded py-1 px-2 overflow-scroll lg:overflow-none">
              {numbers.map((number, index) => (
                <label
                  key={index}
                  className={`relative ${
                    isCheckboxChecked
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  } ${number === "Plus de 36" ? "ml-5" : ""}`}
                >
                  <input
                    type="radio"
                    name="number"
                    value={String(number)}
                    className="hidden"
                    onChange={handleRadioChange}
                    disabled={isCheckboxChecked}
                    checked={selectedNumber === String(number)}
                  />
                  <span
                    className={`inline-flex justify-center items-center h-8 
                    ${number === "Plus de 36" ? "px-4" : "w-8"} 
                    rounded-full transition-all duration-200 
                    ${
                      selectedNumber === String(number)
                        ? "bg-blue-500 text-white"
                        : "text-black"
                    }
                    ${isCheckboxChecked ? "pointer-events-none" : ""}
                    ${
                      !isCheckboxChecked && selectedNumber !== String(number)
                        ? "hover:bg-gray-100"
                        : ""
                    }
                `}
                  >
                    {number}
                    {selectedNumber === String(number) && (
                      <span
                        className="absolute left-1/2 -bottom-2 -translate-x-1/2 
                            w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] 
                            border-t-blue-500 border-l-transparent border-r-transparent"
                      />
                    )}
                  </span>
                </label>
              ))}
            </div>
            <fieldset>
              <div className="mt-4 space-y-2">
                <label
                  htmlFor="Option1"
                  className="flex cursor-pointer items-start gap-2"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="Option1"
                      name="Option1"
                      onChange={handleCheckboxChange}
                      checked={isCheckboxChecked}
                    />
                  </div>
                  <div>
                    <strong className="font-medium text-gray-900">
                      Je ne connais pas mon besoin
                    </strong>
                  </div>
                </label>
              </div>
            </fieldset>
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
                onClick={() => handleFormSwitch("four_form", "sp3", "sp2")}
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
            id="four_form"
            className="w-full p-[40px] rounded"
            style={{ boxShadow: "0 10px 30px 0 rgba(62, 87, 111, 0.2)" }}
          >
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800 mb-8">
                Avez-vous d&apos;autres informations utiles à nous communiquer
                concernant votre projet de raccordement ?
              </h1>
              <div className="flex justify-center space-x-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="DeliveryPriority1"
                      className="viab2 transition-all duration-300 flex cursor-pointer h-[80px] items-center justify-center flex-col gap-4 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-[#005EB8] has-[:checked]:ring-1 has-[:checked]:ring-[#005EB8] has-[:checked]:bg-[#bfd7ed]"
                    >
                      <p className="text-slate-800 font-semibold text-[17px] text-center">
                        Oui je souhaite préciser quelques informations.
                      </p>
                      <input
                        type="radio"
                        name="portesFenetres"
                        value="Oui je souhaite préciser quelques informations."
                        id="DeliveryPriority1"
                        className="sr-only"
                        onChange={handleRadioChange}
                      />
                    </label>
                    {errors.portesFenetres && (
                      <p className="text-red-500">{errors.portesFenetres}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="DeliveryPriority2"
                      className="viab2 transition-all duration-300 flex cursor-pointer h-[80px] items-center justify-center flex-col gap-4 rounded-xl border border-slate-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-[#005EB8] has-[:checked]:ring-1 has-[:checked]:ring-[#005EB8] has-[:checked]:bg-[#bfd7ed]"
                    >
                      <p className="text-slate-800 font-semibold text-[17px] text-center">
                        Non. Je souhaite maintenant finaliser ma demande.
                      </p>
                      <input
                        type="radio"
                        name="portesFenetres"
                        value="Non. Je souhaite maintenant finaliser ma demande."
                        id="DeliveryPriority2"
                        className="sr-only"
                        onChange={handleRadioChange}
                      />
                    </label>
                    {errors.portesFenetres && (
                      <p className="text-red-500">{errors.portesFenetres}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Display additional info textarea if specific radio option is selected */}
              {formData.step4.portesFenetres ===
                "Oui je souhaite préciser quelques informations." && (
                <div className="mb-8">
                  <label
                    htmlFor="additionalInfo"
                    className="mb-2 block text-sm font-medium text-gray-900 text-left"
                  >
                    Veuillez nous fournir toutes informations nécessaires à une
                    meilleure compréhension de votre projet :
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.step4.additionalInfo}
                    onChange={handleTextareaChange}
                    className="w-full p-4 border border-gray-300 rounded-md"
                    placeholder="Entrez vos informations supplémentaires ici..."
                  />
                  {/* {errors.additionalInfo && (
            <p className="text-red-500">{errors?.additionalInfo}</p>
          )} */}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-center space-x-4">
              <button
                id="prev3"
                type="button"
                onClick={() => handleFormSwitch("three_form", "sp3", "sp2")}
                className="bg-white border-[1px] border-[#16a974] rounded text-[#16a974] py-2.5 px-10 text-md font-semibold"
              >
                Précédent
              </button>

                <button
                id="next3"
                onClick={() => handleFormSwitch("five_form", "sp4", "sp3")}
                type="button"
                className="bg-blue-600 border-[1px] border-blue-600 rounded text-white py-2.5 px-10 text-md font-semibold"
              >
                Suivant
              </button>
              </div>
            </div>
          </div>
        )}

        {currentForm === "five_form" && (
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
                {/* <li className="flex justify-start items-center gap-3 mb-3">
                  <MdOutlineHomeWork className="size-9 inline-block text-slate-500" />
                  Votre terrain est viabilisé?:{" "}
                  <span className="capitalize">{formData.step3.terrain}</span>
                </li> */}
                <li className="flex justify-start items-center gap-3 mb-3">
                  <LiaCompressArrowsAltSolid className="size-9 inline-block text-slate-500" />
                  Puissance maximale (en kVA)?:{" "}
                  <span className="capitalize">{formData.step3.number}</span>
                </li>
                <li className="flex justify-start items-center gap-3 mb-3">
                  <LuDoorOpen className="size-7 inline-block text-slate-500" />
                  {formData.step4.portesFenetres}{" "}
                  {`:${formData.step4.additionalInfo}`}
                </li>
                <span className="text-[#1523dc]"></span>
              </ul>
            </div>
            <div className="flex justify-end items-center gap-3 mt-10">
            <button
                id="prev4"
                onClick={() => handleFormSwitch("four_form", "sp4", "sp5")}
                type="button"
                className="bg-white border-[1px] w-full lg:w-auto border-[#16a974] rounded text-[#16a974] py-2.5 px-10 text-md font-semibold"
              >
                Précédent
              </button>
              <button
                id="submit"
                type="button"
                onClick={sendEmail}
                className="bg-blue-600 border-[1px] w-full lg:w-auto border-blue-600 rounded text-white py-2.5 px-10 text-md font-semibold"
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

export default Raccordement;
