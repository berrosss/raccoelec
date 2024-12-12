"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";

const Estimation = () => {
  useEffect(() => {
    // const mainForm = document.getElementById("mainForm") as HTMLFormElement | null;
    const subFormContainer = document.getElementById(
      "subFormContainer"
    ) as HTMLElement | null;
    const finalFormContainer = document.getElementById(
      "finalFormContainer"
    ) as HTMLElement | null;
    const validateBtn = document.getElementById(
      "validateBtn"
    ) as HTMLButtonElement | null;
    const resetBtn = document.getElementById(
      "resetBtn"
    ) as HTMLButtonElement | null;
    const simplePageContent = document.getElementById(
      "simplePageContent"
    ) as HTMLElement | null;
    const rue1Content = document.getElementById(
      "rue1Content"
    ) as HTMLElement | null;
    const rue2Content = document.getElementById(
      "rue2Content"
    ) as HTMLElement | null;
    const rue3Content = document.getElementById(
      "rue3Content"
    ) as HTMLElement | null;
    const helloContent = document.getElementById(
      "helloContent"
    ) as HTMLElement | null;

    // Function to hide all content
    const hideAllContent = () => {
      [
        subFormContainer,
        finalFormContainer,
        simplePageContent,
        rue1Content,
        rue2Content,
        rue3Content,
        helloContent,
      ].forEach((element) => element?.classList.add("hidden"));
    };

    // Event listener for the Validate button
    const handleValidate = () => {
      const selectedMainOption = document.querySelector<HTMLInputElement>(
        'input[name="mainOption"]:checked'
      );
      const selectedSubOption = document.querySelector<HTMLInputElement>(
        'input[name="subOption"]:checked'
      );
      const selectedFinalOption = document.querySelector<HTMLInputElement>(
        'input[name="finalOption"]:checked'
      );

      hideAllContent();

      if (selectedMainOption) {
        if (selectedMainOption.value === "Inférieure ou égale 36 kVA") {
          subFormContainer?.classList.remove("hidden");
          if (selectedSubOption) {
            if (selectedSubOption.value === "Oui") {
              helloContent?.classList.remove("hidden");
            } else {
              finalFormContainer?.classList.remove("hidden");
              if (selectedFinalOption) {
                if (selectedFinalOption.value === "Ma rue 1") {
                  rue1Content?.classList.remove("hidden");
                } else if (selectedFinalOption.value === "Ma rue 2") {
                  rue2Content?.classList.remove("hidden");
                } else if (selectedFinalOption.value === "Ma rue 3") {
                  rue3Content?.classList.remove("hidden");
                }
              }
            }
          }
        } else if (selectedMainOption.value === "Supérieure 36 kVA") {
          simplePageContent?.classList.remove("hidden");
        }
      }
    };

    // Event listener for the Reset button
    const handleReset = () => {
      hideAllContent();
      document
        .querySelectorAll<HTMLInputElement>('input[type="radio"]')
        .forEach((input) => {
          input.checked = false;
        });
    };

    validateBtn?.addEventListener("click", handleValidate);
    resetBtn?.addEventListener("click", handleReset);

    // Cleanup event listeners on unmount
    return () => {
      validateBtn?.removeEventListener("click", handleValidate);
      resetBtn?.removeEventListener("click", handleReset);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-20 mt-16 px-5 lg:px-0">
      <div className="flex justify-center items-center flex-col mb-20">
        <h2 className="text-3xl leading-tight font-bold text-[#96cd32] text-center mb-6 max-w-[600px]">
          Informations générales sur le prix et les délais d’un raccordement
        </h2>
      </div>
      <div>
        <p className="text-zinc-950">
          Le <strong>prix</strong> et les <strong>délais</strong> d’un
          raccordement en consommation dépendent de la solution technique qui
          est fonction de :
        </p>
        <ul className="tempslist mt-5 mb-16">
          <li>
            la distance entre l&lsquo;installation électrique de votre local et
            le réseau de distribution d’électricité ;
          </li>
          <li>la puissance électrique demandée.</li>
        </ul>
        <h3 className="text-2xl leading-tight font-bold text-[#1523dc] mb-4">
          Votre estimation en moins de 3 questions
        </h3>
        <p className="text-zinc-950 font-semibold mb-3">
          Les informations mentionnées visent à vous fournir des repères
          simplifiés et préalables à une demande raccordement en consommation.
          Elles n’ont pas valeur d’engagement.
        </p>
      </div>
      <div className="p-10 bg-[#e5ebed]" id="step1">
        <h4 className="text-zinc-950 text-lg leading-tight mb-8">
          1- Quelle est la puissance électrique maximale souhaitée ?
        </h4>
        <form
          id="mainForm"
          className="flex justify-start items-center gap-10 mb-16 pl-5"
        >
          <label className="flex justify-start items-center font-medium text-xl text-black">
            <input
              type="radio"
              name="mainOption"
              defaultValue="Inférieure ou égale 36 kVA"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2"
            />
            <div className="flex justify-start items-start flex-col">
              <p>Inférieure ou égale 36 kVA</p>
              <p className="text-sm">(residential, small businesses)</p>
            </div>
          </label>
          <label className="flex justify-start items-center font-medium text-xl text-black">
            <input
              type="radio"
              name="mainOption"
              defaultValue="Supérieure 36 kVA"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2"
            />
            <div className="flex justify-start items-start flex-col">
              <p>Supérieure 36 kVA</p>
              <p className="text-sm">(large businesses, industrial)</p>
            </div>
          </label>
        </form>
        <div id="subFormContainer" className="hidden">
          <h4 className="text-zinc-950 text-lg leading-tight mb-0.5">
            2- Votre terrain est-il déjà viabilisé ?
          </h4>
          <p className="text-xs text-zinc-900 mb-3">
            (Présence d’un coffret électrique en limite de votre terrain)
          </p>
          <form
            id="subForm"
            className="flex justify-start items-center mb-16 gap-10"
          >
            <label>
              <input
                type="radio"
                name="subOption"
                defaultValue="Oui"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2"
              />
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="subOption"
                defaultValue="Non"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2"
              />
              Non
            </label>
          </form>
        </div>
        <div id="finalFormContainer" className="hidden">
          <h4 className="text-zinc-950 text-lg leading-tight mb-0.5">
            3- Le réseau de distribution d&lsquo;électricité est-il proche de
            votre terrain ?
          </h4>
          <p className="text-xs mb-5 text-zinc-800">
            (si votre terrain a un caractère spécifique, tel qu’un terrain sans
            accès direct à la voie publique, sachez que l’estimation proposée
            ici n’est pas adaptée. Une étude précise par raccoelec sera
            nécessaire)
          </p>
          <form
            id="finalForm"
            className="flex justify-start items-start flex-col mb-16 gap-y-5"
          >
            <label className="flex justify-start items-start">
              <input
                type="radio"
                name="finalOption"
                defaultValue="Ma rue 1"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2"
              />
              <div className="flex justify-start items-start flex-col">
                <p className="font-medium text-xl text-black">
                  Ma rue est totalement desservie en électricité
                </p>
                <p className="!text-sm">
                  (vous êtes encadré par des voisins disposant de
                  l&lsquo;électricité, le réseau passe a priori devant votre
                  terrain)
                </p>
              </div>
            </label>
            <label className="flex justify-start items-start">
              <input
                type="radio"
                name="finalOption"
                defaultValue="Ma rue 2"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2"
              />
              <div className="flex justify-start items-start flex-col">
                <p className="font-medium text-xl text-black">
                  Ma rue est partiellement desservie en électricité
                </p>
                <p className="!text-sm">
                  (j’ai un seul voisin qui dispose de l’électricité, le réseau
                  est présent dans ma rue mais à priori il ne vient pas jusqu’à
                  mon terrain)
                </p>
              </div>
            </label>
            <label className="flex justify-start items-start">
              <input
                type="radio"
                name="finalOption"
                defaultValue="Ma rue 3"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2"
              />
              <div className="flex justify-start items-start flex-col">
                <p className="font-medium text-xl text-black">
                  Ma rue n’est pas desservie en électricité
                </p>
              </div>
            </label>
          </form>
        </div>
        <div className="flex justify-between items-center mt-10">
          <button
            type="button"
            id="resetBtn"
            className="back_button py-2.5 px-8 rounded-md text-md font-bold bg-[#7a7d7e] text-white border border-[#7a7d7e] hover:bg-white hover:text-[#7a7d7e] hover:border-[#7a7d7e] hover:border-[1px] transition-all"
          >
            Reset
          </button>
          <button
            type="button"
            id="validateBtn"
            className="next_button py-2.5 px-8 rounded-md text-md font-bold bg-[#1523dc] text-white border border-[#1523dc] hover:bg-white hover:text-[#1523dc] hover:border-[#1523dc] hover:border-[1px] transition-all"
          >
            Valider
          </button>
        </div>
        {/* START OF INPUTS CONTENTS */}
        <div id="helloContent" className="hidden mt-8">
          <div className="max-w-[500px] mx-auto">
            <div className="flex justify-center items-center mt-14 mb-14">
              <Image src="https://www.enedis.fr/sites/default/files/pictos/2023-11/couts-delais-situation-2.svg" alt="alt" fill />
            </div>
          </div>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Solution technique
          </h3>
          <p className="text-zinc-950 mb-6">
            La solution technique est un branchement raccordant l’installation
            électrique de votre local au coffret électrique de votre terrain
            déjà viabilisé.
          </p>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Prix moyen
          </h3>
          <p className="text-zinc-950 mb-4">
            Le prix moyen est de 410 € TTC, sous condition de confirmation de la
            solution technique décrite ci-dessus.
          </p>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Délai prévisionnel
          </h3>
          <p className="text-zinc-950 mb-4">
            Le délai minimum est estimé à 2 mois.
          </p>
          <p className="text-zinc-950 mb-6">
            Il prend en compte, sous condition de réalisation de vos démarches
            et travaux dans des délais compatibles :
          </p>
          <ul className="tempslist mt-5 mb-10">
            <li className="mb-4">
              l’établissement du devis (estimé à 2 semaines) ;
            </li>
            <li>
              la réalisation des travaux (estimée entre 4 et 6 semaines) ;
            </li>
            <li>
              la mise en service de votre installation électrique (estimée entre
              1 et 2 semaines).
            </li>
          </ul>
          <p className="text-zinc-950 mb-6">
            Vous voulez aller plus loin dans votre estimation, sachez que nous
            mettons à votre disposition un outil de simulation vous permettant
            de réaliser une estimation plus précise adaptée à votre situation.
          </p>
          <div className="flex justify-end items-end mt-10">
            <Link href="/raccordement-electrique" target="_blank">
              <button className="next_button py-2.5 px-8 rounded-md text-md font-bold bg-[#1523dc] text-white border border-[#1523dc] hover:bg-white hover:text-[#1523dc] hover:border-[#1523dc] hover:border-[1px] transition-all">
                Faire ma demande
              </button>
            </Link>
          </div>
        </div>
        {/* SIMPLE PAGE CONTENT // */}
        <div id="simplePageContent" className="hidden mt-8">
          <div className="max-w-[500px] mx-auto">
            <div className="flex justify-center items-center mt-14 mb-14">
              <Image src="https://www.enedis.fr/sites/default/files/pictos/2023-11/couts-delais-situation-2.svg" alt="alt" fill />
            </div>
          </div>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Solution technique
          </h3>
          <p className="text-zinc-950">
            Au préalable, Enedis doit réaliser une étude pour vérifier que la
            puissance souhaitée est disponible sur le réseau :
          </p>
          <ul className="tempslist mt-5 mb-10">
            <li className="mb-4">
              Si la puissance souhaitée est disponible :
              <br />
              la solution technique est un branchement, voire une extension du
              réseau de distribution d’électricité en complément du branchement,
              en fonction de la distance entre l&lsquo;installation électrique
              de votre local et le réseau de distribution d’électricité.
            </li>
            <li>
              Si la puissance souhaitée n’est pas disponible :
              <br />
              la solution technique est le renforcement du réseau ou
              l’implantation d’un nouveau poste de distribution d’électricité
              pour augmenter la puissance disponible sur le réseau. Il s’agit de
              travaux significatifs impliquant des études approfondies.
            </li>
          </ul>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Prix moyen
          </h3>
          <p className="text-zinc-950 max-w-[550px] mb-10">
            Le prix est variable en fonction de l’ampleur des travaux à
            réaliser. Une étude technique et financière par Enedis est
            nécessaire.
          </p>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Délai prévisionnel
          </h3>
          <p className="text-zinc-950">
            Si la puissance souhaitée est disponible sur le réseau, le délai
            minimum est estimé entre 4 et 6 mois (selon la solution technique
            retenue).
            <br />
            Il prend en compte, sous condition de réalisation de vos démarches
            et travaux dans des délais compatibles :
          </p>
          <ul className="tempslist mt-5 mb-10">
            <li>l’établissement du devis (estimé à 6 semaines) ;</li>
            <li>
              la réalisation des travaux (estimée entre 8 et 16 semaines) ;
            </li>
            <li>
              a mise en service de votre installation électrique (estimée entre
              1 et 2 semaines).
            </li>
          </ul>
          <p className="text-zinc-950">
            Si la puissance souhaitée n’est pas disponible sur le réseau, le
            délai minimum est estimé entre 6 et 9 mois (selon la solution
            technique retenue).
            <br />
            Il prend en compte, sous condition de réalisation de vos démarches
            et travaux dans des délais compatibles :
          </p>
          <ul className="tempslist mt-5 mb-10">
            <li>l’établissement du devis (estimé à 6 semaines) ;</li>
            <li>
              la réalisation des travaux (estimée entre 8 et 16 semaines) ;
            </li>
            <li>
              a mise en service de votre installation électrique (estimée entre
              1 et 2 semaines).
            </li>
          </ul>
          <p className="text-zinc-950 mb-19">
            Vous voulez aller plus loin dans votre estimation, sachez que nous
            mettons à votre disposition un outil de simulation vous permettant
            de réaliser une estimation plus précise adaptée à votre situation.
          </p>
          <div className="flex justify-end items-end mt-10">
            <Link href="/raccordement-electrique" target="_blank">
              <button className="next_button py-2.5 px-8 rounded-md text-md font-bold bg-[#1523dc] text-white border border-[#1523dc] hover:bg-white hover:text-[#1523dc] hover:border-[#1523dc] hover:border-[1px] transition-all">
                Faire ma demande
              </button>
            </Link>
          </div>
        </div>
        {/* RUE 1 CONTENT // */}
        <div id="rue1Content" className="hidden mt-8">
          <div className="max-w-[500px] mx-auto">
            <div className="flex justify-center items-center mt-14 mb-14">
              <Image src="https://www.enedis.fr/sites/default/files/pictos/2023-11/couts-delais-situation-2.svg" alt="alt" fill />
            </div>
          </div>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Solution technique
          </h3>
          <p className="text-zinc-950 mb-6">
            La solution technique est un branchement raccordant l’installation
            électrique de votre local au réseau de distribution d’électricité
            avec implantation d’un coffret électrique en limite de votre
            terrain.
          </p>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Prix moyen
          </h3>
          <p className="text-zinc-950 mb-4">
            Le prix moyen est de 1600 € TTC, sous condition de confirmation de
            la solution technique décrite ci-dessus.
          </p>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Délai prévisionnel
          </h3>
          <p className="text-zinc-950 mb-4">
            Le délai minimum est estimé à 3 mois.
          </p>
          <p className="text-zinc-950 mb-6">
            Il prend en compte, sous condition de réalisation de vos démarches
            et travaux dans des délais compatibles :
          </p>
          <ul className="tempslist mt-5 mb-10">
            <li className="mb-4">
              l’établissement du devis (estimé à 2 semaines) ;
            </li>
            <li>
              la réalisation des travaux (estimée entre 6 et 8 semaines) ;
            </li>
            <li>
              la mise en service de votre installation électrique (estimée entre
              1 et 2 semaines).
            </li>
          </ul>
          <p className="text-zinc-950 mb-6">
            Vous voulez aller plus loin dans votre estimation, sachez que nous
            mettons à votre disposition un outil de simulation vous permettant
            de réaliser une estimation plus précise adaptée à votre situation.
          </p>
          <div className="flex justify-end items-end mt-10">
            <Link href="/raccordement-electrique" target="_blank">
              <button className="next_button py-2.5 px-8 rounded-md text-md font-bold bg-[#1523dc] text-white border border-[#1523dc] hover:bg-white hover:text-[#1523dc] hover:border-[#1523dc] hover:border-[1px] transition-all">
                Faire ma demande
              </button>
            </Link>
          </div>
        </div>
        {/* RUE 2 CONTENT // */}
        <div id="rue2Content" className="hidden mt-8">
          <div className="max-w-[500px] mx-auto">
            <div className="flex justify-center items-center mt-14 mb-14">
              <Image src="https://www.enedis.fr/sites/default/files/pictos/2023-11/couts-delais-situation-2.svg" alt="alt" fill />
            </div>
          </div>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Solution technique
          </h3>
          <p className="text-zinc-950 mb-3">
            Si votre futur local est proche du réseau de distribution
            d&lsquo;électricité, la solution technique est un branchement
            raccordant l’installation électrique de votre local au réseau de
            distribution d’électricité.
          </p>
          <p className="text-zinc-950 mb-3">
            Si votre futur local est éloigné du réseau de distribution
            d&lsquo;électricité, la solution technique nécessite la construction
            d’une extension du réseau de distribution d’électricité, en
            complément de votre branchement.
          </p>
          <p className="text-zinc-950 mb-3">
            Dans les deux situations, un coffret électrique sera implanté en
            limite de votre terrain.
          </p>
          <p className="text-zinc-950 mb-6">
            Pour connaitre la solution technique correspondante à votre
            situation, sachez que nous mettons à votre disposition un outil de
            simulation.
          </p>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Prix moyen
          </h3>
          <p className="text-zinc-950 mb-4">
            Le prix est variable et comprend :
          </p>
          <ul className="tempslist mt-5 mb-10">
            <li className="mb-2">
              une part forfaitaire relative au branchement électrique, estimée
              en moyenne à 1600 € TTC ;
            </li>
            <li>
              une part variable qui est fonction de la longueur de l’extension
              du réseau de distribution d’électricité à construire (selon le
              barème de facturation en vigueur). En général, cette part peut
              être prise en charge par votre mairie dans le cadre de la
              délivrance de votre autorisation d’urbanisme.
            </li>
          </ul>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Délai prévisionnel
          </h3>
          <p className="text-zinc-950 mb-4">
            Le délai minimum est estimé à 3 mois pour un branchement, ou à 6
            mois pour une extension du réseau de distribution d’électricité.
          </p>
          <p className="text-zinc-950 mb-6">
            Il prend en compte, sous condition de réalisation de vos démarches
            et travaux dans des délais compatibles :
          </p>
          <ul className="tempslist mt-5 mb-10">
            <li className="mb-4">
              l’établissement du devis (estimé entre 2 et 6 semaines) ;
            </li>
            <li>
              la réalisation des travaux (estimée entre 6 et 18 semaines) ;
            </li>
            <li>
              la mise en service de votre installation électrique (estimée entre
              1 et 2 semaines).
            </li>
          </ul>
          <p className="text-zinc-950 mb-6">
            Vous voulez aller plus loin dans votre estimation, sachez que nous
            mettons à votre disposition un outil de simulation vous permettant
            de réaliser une estimation plus précise adaptée à votre situation.
          </p>
          <div className="flex justify-end items-end mt-10">
            <Link href="/raccordement-electrique" target="_blank">
              <button className="next_button py-2.5 px-8 rounded-md text-md font-bold bg-[#1523dc] text-white border border-[#1523dc] hover:bg-white hover:text-[#1523dc] hover:border-[#1523dc] hover:border-[1px] transition-all">
                Faire ma demande
              </button>
            </Link>
          </div>
        </div>
        {/* RUE 3 CONTENT // */}
        <div id="rue3Content" className="hidden mt-8">
          <div className="max-w-[500px] mx-auto">
            <div className="flex justify-center items-center mt-14 mb-14">
              <Image src="/assets/enedis.svg" alt="" width={800} height={800} />
            </div>
          </div>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Solution technique
          </h3>
          <p className="text-zinc-950 mb-3">
            La solution technique nécessite la construction d’une extension du
            réseau de distribution d’électricité en complément de votre
            branchement raccordant l’installation électrique de votre local au
            réseau de distribution d’électricité. Un coffret électrique sera
            implanté en limite de votre terrain.
          </p>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Prix moyen
          </h3>
          <p className="text-zinc-950 mb-4">
            Le prix est variable et comprend :
          </p>
          <ul className="tempslist mt-5 mb-10">
            <li className="mb-2">
              une part forfaitaire relative au branchement électrique, estimée
              en moyenne à 1600 € TTC ;
            </li>
            <li>
              une part variable qui est fonction de la longueur de l’extension
              du réseau de distribution d’électricité à construire (selon le
              barème de facturation en vigueur). En général, cette part peut
              être prise en charge par votre mairie dans le cadre de la
              délivrance de votre autorisation d’urbanisme.
            </li>
          </ul>
          <h3 className="text-2xl leading-tight font-bold text-[#96cd32] text-left mb-4">
            Délai prévisionnel
          </h3>
          <p className="text-zinc-950 mb-4">
            Le délai minimum est estimé à 6 mois.
          </p>
          <p className="text-zinc-950 mb-6">
            Il prend en compte, sous condition de réalisation de vos démarches
            et travaux dans des délais compatibles :
          </p>
          <ul className="tempslist mt-5 mb-10">
            <li className="mb-4">
              l’établissement du devis (estimé à 6 semaines) ;
            </li>
            <li>
              la réalisation des travaux (estimée entre 14 et 18 semaines) ;
            </li>
            <li>
              la mise en service de votre installation électrique (estimée entre
              1 et 2 semaines).
            </li>
          </ul>
          <p className="text-zinc-950 mb-6">
            Vous voulez aller plus loin dans votre estimation, sachez que nous
            mettons à votre disposition un outil de simulation vous permettant
            de réaliser une estimation plus précise adaptée à votre situation.
          </p>
          <div className="flex justify-end items-end mt-10">
            <Link href="/raccordement-electrique" target="_blank">
              <button className="next_button py-2.5 px-8 rounded-md text-md font-bold bg-[#1523dc] text-white border border-[#1523dc] hover:bg-white hover:text-[#1523dc] hover:border-[#1523dc] hover:border-[1px] transition-all">
                Faire ma demande
              </button>
            </Link>
          </div>
        </div>
        {/* // END OF INPUTS CONTENTS */}
      </div>
    </div>
  );
};

export default Estimation;
