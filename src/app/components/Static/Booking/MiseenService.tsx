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
                    value=""
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
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                          <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="8" r="2.5" stroke="#6b7280" strokeLinecap="round"/> <path d="M13.7679 6.5C13.9657 6.15743 14.2607 5.88121 14.6154 5.70625C14.9702 5.5313 15.3689 5.46548 15.7611 5.51711C16.1532 5.56874 16.5213 5.73551 16.8187 5.99632C17.1161 6.25713 17.3295 6.60028 17.4319 6.98236C17.5342 7.36445 17.521 7.76831 17.3939 8.14288C17.2667 8.51745 17.0313 8.8459 16.7175 9.08671C16.4037 9.32751 16.0255 9.46985 15.6308 9.49572C15.2361 9.52159 14.8426 9.42983 14.5 9.23205" stroke="#6b7280"/> <path d="M10.2321 6.5C10.0343 6.15743 9.73935 5.88121 9.38458 5.70625C9.02981 5.5313 8.63113 5.46548 8.23895 5.51711C7.84677 5.56874 7.47871 5.73551 7.18131 5.99632C6.88391 6.25713 6.67053 6.60028 6.56815 6.98236C6.46577 7.36445 6.47899 7.76831 6.60614 8.14288C6.73329 8.51745 6.96866 8.8459 7.28248 9.08671C7.5963 9.32751 7.97448 9.46985 8.36919 9.49572C8.76391 9.52159 9.15743 9.42983 9.5 9.23205" stroke="#6b7280"/> <path d="M12 12.5C16.0802 12.5 17.1335 15.8022 17.4054 17.507C17.4924 18.0524 17.0523 18.5 16.5 18.5H7.5C6.94771 18.5 6.50763 18.0524 6.59461 17.507C6.86649 15.8022 7.91976 12.5 12 12.5Z" stroke="#6b7280" strokeLinecap="round"/> <path d="M19.2965 15.4162L18.8115 15.5377L19.2965 15.4162ZM13.0871 12.5859L12.7179 12.2488L12.0974 12.9283L13.0051 13.0791L13.0871 12.5859ZM17.1813 16.5L16.701 16.639L16.8055 17H17.1813V16.5ZM15.5 12C16.5277 12 17.2495 12.5027 17.7783 13.2069C18.3177 13.9253 18.6344 14.8306 18.8115 15.5377L19.7816 15.2948C19.5904 14.5315 19.2329 13.4787 18.578 12.6065C17.9126 11.7203 16.9202 11 15.5 11V12ZM13.4563 12.923C13.9567 12.375 14.6107 12 15.5 12V11C14.2828 11 13.3736 11.5306 12.7179 12.2488L13.4563 12.923ZM13.0051 13.0791C15.3056 13.4614 16.279 15.1801 16.701 16.639L17.6616 16.361C17.1905 14.7326 16.019 12.5663 13.1691 12.0927L13.0051 13.0791ZM18.395 16H17.1813V17H18.395V16ZM18.8115 15.5377C18.8653 15.7526 18.7075 16 18.395 16V17C19.2657 17 20.0152 16.2277 19.7816 15.2948L18.8115 15.5377Z" fill="#6b7280"/> <path d="M10.9129 12.5859L10.9949 13.0791L11.9026 12.9283L11.2821 12.2488L10.9129 12.5859ZM4.70343 15.4162L5.18845 15.5377L4.70343 15.4162ZM6.81868 16.5V17H7.19453L7.29898 16.639L6.81868 16.5ZM8.49999 12C9.38931 12 10.0433 12.375 10.5436 12.923L11.2821 12.2488C10.6264 11.5306 9.71723 11 8.49999 11V12ZM5.18845 15.5377C5.36554 14.8306 5.68228 13.9253 6.22167 13.2069C6.75048 12.5027 7.47226 12 8.49999 12V11C7.0798 11 6.08743 11.7203 5.42199 12.6065C4.76713 13.4787 4.40955 14.5315 4.21841 15.2948L5.18845 15.5377ZM5.60498 16C5.29247 16 5.13465 15.7526 5.18845 15.5377L4.21841 15.2948C3.98477 16.2277 4.73424 17 5.60498 17V16ZM6.81868 16H5.60498V17H6.81868V16ZM7.29898 16.639C7.72104 15.1801 8.69435 13.4614 10.9949 13.0791L10.8309 12.0927C7.98101 12.5663 6.8095 14.7326 6.33838 16.361L7.29898 16.639Z" fill="#6b7280"/> </g>
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
                    className="viab transition-all duration-300 hover:border-[#1623dc] hover:text-[#1623dc] inline-flex items-center justify-between w-auto p-[15px] text-gray-500 rounded bg-white border-[1px] border-gray-400 cursor-pointer peer-checked:text-black peer-checked:border-[#005EB8] peer-checked:bg-[#bfd7ed]"
                  >
                    <div className="w-full text-center flex justify-start items-center">
                       <svg width="24px" height="24px" viewBox="0 0 1024 1024" fill="#6b7280" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M276 1004.8c-34.4-8-158.4-57.6-168.8-126.4-7.2-44.8 10.4-88.8 48.8-120.8 28.8-24 100.8-69.6 130.4-84.8 11.2-5.6 27.2-12 41.6-18.4 40.8-17.6 56.8-25.6 60.8-32.8 4.8-11.2 4.8-19.2 0.8-40.8v-1.6l-1.6-1.6C371.2 560 330.4 510.4 320 480c-10.4-30.4-21.6-92-22.4-120v-6.4H214.4c1.6-12.8 7.2-40 16-55.2 12.8-22.4 32.8-41.6 36-43.2l3.2-1.6V248c0-18.4 10.4-82.4 56.8-128.8 56-56 134.4-96 185.6-96h3.2c51.2 0 129.6 40.8 185.6 96 46.4 46.4 56.8 110.4 56.8 128.8v4l3.2 1.6c3.2 1.6 23.2 20.8 36 43.2 8.8 15.2 13.6 42.4 16 55.2H728.8v6.4c0 28-12 89.6-22.4 120-10.4 30.4-51.2 80-68 97.6l-1.6 1.6v1.6c-4 21.6-4.8 29.6 0.8 40.8 3.2 8 19.2 15.2 60.8 32.8 14.4 6.4 29.6 12.8 41.6 18.4 30.4 15.2 101.6 60.8 130.4 84.8 38.4 32 56 76 48.8 120.8-11.2 68.8-134.4 118.4-168.8 126.4-25.6-8.8-163.2-20.8-212-20.8h-14.4c-3.2 0-6.4 0.8-11.2 0.8-4 0-8-0.8-11.2-0.8h-14.4c-48 1.6-185.6 13.6-211.2 22.4z m467.2-39.2l2.4-0.8c12-2.4 120.8-27.2 136-104.8 8-44-43.2-82.4-68-100-16.8-12.8-31.2-21.6-49.6-31.2l-8-4-41.6 234.4 6.4 0.8c10.4 1.6 17.6 3.2 20 4l2.4 1.6zM262.4 728.8c-21.6 11.2-35.2 20.8-49.6 31.2-24.8 18.4-76 56.8-68 100 15.2 77.6 123.2 102.4 136 104.8l2.4 0.8 1.6-1.6c2.4-0.8 10.4-2.4 20-4l6.4-0.8-41.6-234.4-7.2 4z m265.6 216c45.6 0.8 87.2 3.2 119.2 6.4l6.4 0.8 36.8-257.6-8-4c-6.4-3.2-13.6-5.6-20.8-8.8-27.2-11.2-55.2-22.4-66.4-61.6-1.6-7.2-2.4-14.4-1.6-22.4 0.8-9.6 4-17.6 7.2-28 0.8-4 2.4-7.2 4-12 18.4-16 44.8-54.4 58.4-80.8l8.8-18.4c6.4-16.8 12-56 15.2-85.6l0.8-7.2H338.4l0.8 7.2c4.8 43.2 10.4 72 15.2 85.6l8.8 18.4c14.4 27.2 40.8 65.6 59.2 81.6 1.6 4 2.4 8 4 11.2 3.2 9.6 6.4 18.4 7.2 28 0.8 8 0.8 15.2-1.6 22.4-11.2 39.2-39.2 50.4-66.4 61.6-7.2 3.2-14.4 5.6-20.8 8.8l-8 4 36.8 257.6 6.4-0.8c32.8-3.2 73.6-5.6 119.2-6.4H528zM308.8 261.6c-6.4 3.2-16 8.8-26.4 26.4-5.6 8.8-6.4 16-7.2 20.8l-0.8 7.2H751.2l-0.8-7.2c0-4.8-1.6-11.2-6.4-20.8-10.4-17.6-20.8-23.2-26.4-26.4 0-23.2 0.8-69.6-41.6-112-55.2-56-116.8-88.8-162.4-88.8-60.8 0-122.4 48.8-162.4 88.8-42.4 42.4-42.4 89.6-42.4 112z" fill="" /></svg>
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
                      className="w-full mt-1 px-4 py-3 border-2 border-[#acabab] focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                      className="w-full mt-1 px-4 py-3 border-2 border-[#acabab] focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                      className="w-full mt-1 px-4 py-3 border-2 border-[#acabab] focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                      className="w-full mt-1 px-4 py-3 border-2 border-[#acabab] focus:outline-none focus:ring-1 focus:ring-blue-600"
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
