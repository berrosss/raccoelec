import Image from "next/image";

const aproposnous = () => {
    return (<>
        {/* <section className="max-w-6xl mx-auto ">
            <nav className="text-sm text-slate-500 mb-10 mt-10">
            <a href="#" className="hover:underline text-[#203edc]">
                Accueil
            </a>{" "}
            &gt; <span>Mentions légales</span>
            </nav>
        </section> */}
        <section className="bg-[#f0f8ff]">
            <div className="container mx-auto px-4 py-20">
                <div className="text-center">
                    <h1 className="text-5xl font-black text-gray-800">
                        Quand la transparence <span className="text-[#203edc]"><br></br>éclaire la performance</span>
                    </h1>
                    <p className="mt-6 text-gray-600">
                    Chez Raccoelec, nous sommes convaincus qu&apos;un client bien informé réduit les risques et optimise ses démarches.
                    </p>
                </div>
            </div>
        </section>

        <section className="max-w-7xl mx-auto my-16 p-8">
            <div className="left-[15px] mb-8 text-black text-2xl font-extrabold font-['Open Sans'] leading-relaxed">
                Équipe <span className="text-[#203edc]">Raccoelec</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex justify-center items-center text-center">

                <div className="bg-[#ffffff] p-4 rounded-[5px]">
                    <div className="flex flex-1 flex-col p-2">
                        <Image className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="/assets/avatar/7.png" alt="" width={100} height={100} />
                        <h3 className="mt-6 text-sm text-[#203edc] text-xl font-semibold text-center">Berros B</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between text-center">
                            <dd className="text-sm text-gray-600">Développeur</dd>
                        </dl>
                    </div>
                </div>

                <div className="bg-[#ffffff] p-4 rounded-[5px]">
                    <div className="flex flex-1 flex-col p-2">
                        <Image className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="/assets/avatar/5.png" alt="" width={100} height={100} />
                        <h3 className="mt-6 text-sm text-[#203edc] text-xl font-semibold text-center">Julien L.</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between text-center">
                            <dd className="text-sm text-gray-600">Infographiste</dd>
                        </dl>
                    </div>
                </div>

                <div className="bg-[#ffffff] p-4 rounded-[5px]">
                    <div className="flex flex-1 flex-col p-2">
                        <Image className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="/assets/avatar/6.png" alt="" width={100} height={100} />
                        <h3 className="mt-6 text-sm text-[#203edc] text-xl font-semibold text-center">Laura A.</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between text-center">
                            <dd className="text-sm text-gray-600">Responsable du contenu</dd>
                        </dl>
                    </div>
                </div>

                <div className="bg-[#ffffff] p-4 rounded-[5px]">
                    <div className="flex flex-1 flex-col p-2">
                        <Image className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="/assets/avatar/1.png" alt="" width={100} height={100} />
                        <h3 className="mt-6 text-sm text-[#203edc] text-xl font-semibold text-center">Victor M.</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between text-center">
                            <dd className="text-sm text-gray-600">Expert Raccoelec</dd>
                        </dl>
                    </div>
                </div>

                <div className="bg-[#ffffff] p-4  rounded-[5px]">
                    <div className="flex flex-1 flex-col p-2">
                        <Image className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="/assets/avatar/2.png" alt="" width={100} height={100} />
                        <h3 className="mt-6 text-sm text-[#203edc] text-xl font-semibold text-center">Lucie A.</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between text-center">
                            <dd className="text-sm text-gray-600">Expert Raccoelec</dd>
                        </dl>
                    </div>
                </div>

                <div className="bg-[#ffffff] p-4  rounded-[5px]">
                    <div className="flex flex-1 flex-col p-2">
                        <Image className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="/assets/avatar/3.png" alt="" width={100} height={100} />
                        <h3 className="mt-6 text-sm text-[#203edc] text-xl font-semibold text-center">Matthieu D.</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between text-center">
                            <dd className="text-sm text-gray-600">Expert Raccoelec</dd>
                        </dl>
                    </div>
                </div>

                <div className="bg-[#ffffff] p-4 rounded-[5px]">
                    <div className="flex flex-1 flex-col p-2">
                        <Image className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="/assets/avatar/4.png" alt="" width={100} height={100} />
                        <h3 className="mt-6 text-sm text-[#203edc] text-xl font-semibold text-center">Floriane T.</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between text-center">
                            <dd className="text-sm text-gray-600">Rédactrice</dd>
                        </dl>
                    </div>
                </div>


                <div className="bg-[#ffffff] p-4 rounded-[5px]">
                    <div className="flex flex-1 flex-col p-2">
                        <Image className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="/assets/avatar/8.png" alt="" width={100} height={100} />
                        <h3 className="mt-6 text-sm text-[#203edc] text-xl font-semibold text-center">Claire M.</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between text-center">
                            <dd className="text-sm text-gray-600">Support client</dd>
                        </dl>
                    </div>
                </div>

                <div className="bg-[#ffffff] p-4 rounded-[5px]">
                    <div className="flex flex-1 flex-col p-2">
                        <Image className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="/assets/avatar/9.png" alt="" width={100} height={100} />
                        <h3 className="mt-6 text-sm text-[#203edc] text-xl font-semibold text-center">Louis G.</h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between text-center">
                            <dd className="text-sm text-gray-600">Support technique</dd>
                        </dl>
                    </div>
                </div>

            </div>
        </section>

        <section className="text-gray-600 body-font my-16 mx-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                    className="bg-gray-200 p-4 h-60 sm:h-80 bg-cover bg-center bg-no-repeat rounded-md"
                    style={{ backgroundImage: 'url("/assets/equipe/1.jpeg")' }}
                >
                </div>
                <div
                    className="bg-gray-500 p-4 h-60 sm:h-80 bg-cover bg-center bg-no-repeat rounded-md"
                    style={{ backgroundImage: 'url("/assets/equipe/7.jpg")' }}
                >
                </div>
              
                <div
                    className="bg-gray-400 p-4 h-60 sm:h-80 bg-cover bg-center bg-no-repeat rounded-md"
                    style={{ backgroundImage: 'url("/assets/equipe/3.jpeg")' }}
                >
                </div>
                <div
                    className="bg-gray-300 p-4 h-60 sm:h-80 bg-cover bg-center bg-no-repeat rounded-md"
                    style={{ backgroundImage: 'url("/assets/equipe/2.png")' }}
                >
                </div>
               
            </div>
        </section>


        <section className="max-w-7xl mx-auto mt-16 p-8">
            <div className="left-[15px] mb-8 text-[#283136] text-2xl font-extrabold font-['Open Sans'] leading-relaxed">
                Raccoelec en chiffres
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-5 gap-2 flex justify-center items-center text-center">

                <div className="!bg-[#dadff9] rounded-[5px] pl-12 pr-12 pt-20 pb-10">
                    <svg className="mb-8" fill="#000000" width="50px" height="50px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.553 27.602c-0.628 1.306-1.025 2.177-4.522 2.304 0.1-3.374 0.744-3.736 2.031-4.378 0.54-0.27 1.213-0.605 1.941-1.164l-1.218-1.555c-0.575 0.442-1.104 0.674-1.615 0.928-2.145 1.070-3.156 2.123-3.156 7.145l0.017 1.022 0.983-0.022c5.301 0 6.292-1.198 7.285-3.26 0.217-0.452 0.338-0.758 0.705-1.367l-1.483-1.347c-0.444 0.607-0.722 1.183-0.968 1.692zM22.030 5.896c-2.212 0-4.011 1.799-4.011 4.010s1.8 4.011 4.011 4.011 4.011-1.8 4.011-4.011c0-2.211-1.8-4.011-4.011-4.011zM22.030 11.909c-1.104 0-2.003-0.899-2.003-2.002s0.898-2.002 2.003-2.002 2.003 0.899 2.003 2.002c-0 1.104-0.898 2.002-2.003 2.002zM31.993 0.916c-0.030-0.499-0.426-0.899-0.925-0.936 0 0-5.596-0.408-10.98 1.603-1.967 0.735-3.586 1.898-5.097 3.661-1.26 1.47-2.512 4.126-3.617 6.332-0.427 0.851-0.835 1.666-1.181 2.288h-5.563c-0.286 0-0.558 0.123-0.748 0.336l-3.666 3.973c-0.234 0.265-0.312 0.633-0.204 0.969s0.385 0.592 0.729 0.67l5.967 1.364c0.407 0.502 1.084 1.253 2.168 2.456l2.261 2.506 1.217 5.148c0.080 0.339 0.331 0.613 0.663 0.72 0.101 0.032 0.206 0.049 0.309 0.049 0.236 0 0.467-0.083 0.651-0.241l3.705-3.686c0.221-0.189 0.349-0.467 0.349-0.759v-5.16c0.498-0.309 1.381-0.786 2.212-1.251 2.264-1.265 5.645-2.841 7.046-4.087 1.974-1.754 2.692-3.040 3.398-4.941 1.678-4.521 1.322-10.751 1.305-11.014zM28.813 11.233c-0.616 1.659-1.174 2.651-2.852 4.142-1.239 1.101-4.629 2.682-6.694 3.837-1.541 0.861-2.464 1.364-2.869 1.695-0.233 0.189-0.368 0.474-0.368 0.774v5.227l-2.11 2.319-0.899-3.8c-0.039-0.163-0.118-0.314-0.231-0.439-1.839-2.038-4.617-5.119-4.83-5.364-0.139-0.169-0.332-0.289-0.549-0.339l-4.581-1.048 2.247-2.375h5.689c0.348 0 0.671-0.181 0.852-0.476 0.44-0.716 0.95-1.736 1.542-2.915 1.002-1.998 2.248-4.642 3.348-5.926 1.3-1.516 2.619-2.469 4.278-3.089 3.691-1.379 7.499-1.524 9.24-1.511 0.032 1.844-0.037 6.119-1.214 9.289z"></path>
                    </svg>
                    <div className="text-start text-[#283136] text-[28px] font-extrabold font-['Open Sans'] leading-10">2024</div>
                    <div className="text-start text-[#283136] text-[17px] font-normal font-['Open Sans'] leading-normal">Lancement</div>
                    <div className="text-start text-[#283136] text-[17px] font-normal font-['Open Sans'] leading-normal">de Raccoelec</div>
                </div>

                <div className="!bg-[#dadff9] rounded-[5px] pl-12 pr-12 pt-20 pb-10">
                    <svg className="mb-8" width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 12H15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16H15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="9" cy="12" r="1" fill="#000000"/>
                        <circle cx="9" cy="16" r="1" fill="#000000"/>
                    </svg>
                    <div className="text-start text-[#283136] text-[28px] font-extrabold font-['Open Sans'] leading-10">+ 25.9 K</div>
                    <div className="text-start text-[#283136] text-[17px] font-normal font-['Open Sans'] leading-normal">Mise en</div>
                    <div className="text-start text-[#283136] text-[17px] font-normal font-['Open Sans'] leading-normal">Service</div>
                </div>

                <div className="!bg-[#dadff9] rounded-[5px] pl-12 pr-12 pt-20 pb-10">
                    <svg className="mb-8" height="50px" width="50px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"  >
                        <style type="text/css">

                        </style>
                        <g>
                            <path className="st0" d="M459.991,82.262c-5.818-13.388-15.866-24.916-28.61-34.854c-19.179-14.896-44.758-26.522-74.674-34.691
                                C326.789,4.575,292.498,0,256,0c-55.622,0.036-106.071,10.548-143.848,28.374c-18.889,8.959-34.692,19.76-46.31,32.713
                                c-5.791,6.48-10.52,13.542-13.832,21.176c-3.304,7.634-5.146,15.866-5.138,24.29V405.44c-0.008,8.423,1.834,16.665,5.138,24.29
                                c5.818,13.388,15.866,24.915,28.61,34.863c19.18,14.896,44.757,26.523,74.675,34.692C185.211,507.425,219.503,511.992,256,512
                                c55.632-0.046,106.07-10.546,143.848-28.383c18.888-8.958,34.691-19.751,46.309-32.712c5.792-6.472,10.52-13.534,13.833-21.176
                                c3.304-7.624,5.146-15.867,5.137-24.29V106.552C465.137,98.128,463.295,89.896,459.991,82.262z M436.282,405.44
                                c-0.009,4.293-0.889,8.478-2.768,12.843c-3.268,7.597-9.849,15.766-19.861,23.545c-14.967,11.7-37.369,22.257-64.526,29.626
                                c-27.158,7.388-59.054,11.709-93.128,11.7c-51.909,0.046-98.818-10.084-131.503-25.606c-16.357-7.715-29.064-16.774-37.142-25.86
                                c-4.066-4.538-6.989-9.058-8.868-13.406c-1.88-4.366-2.76-8.55-2.769-12.843v-49.36c16.684,15.25,40.111,27.43,68.13,36.435
                                c32.304,10.32,70.789,16.247,112.152,16.256c55.16-0.027,105.164-10.493,142.306-28.029c14.931-7.08,27.693-15.368,37.976-24.798
                                V405.44z M436.282,321.198c-2.051,4.402-4.983,8.814-8.94,13.27c-12.78,14.396-35.917,27.948-65.77,37.442
                                c-29.844,9.548-66.287,15.23-105.572,15.222c-52.372,0.027-99.726-10.14-133.046-25.95c-16.674-7.87-29.763-17.137-38.294-26.714
                                c-3.958-4.456-6.89-8.868-8.942-13.26v-64.754c16.684,15.249,40.111,27.43,68.13,36.434
                                c32.304,10.311,70.789,16.238,112.152,16.248c55.16-0.028,105.164-10.492,142.306-28.03c14.931-7.08,27.693-15.357,37.976-24.788
                                V321.198z M436.282,221.572c-2.051,4.402-4.983,8.813-8.94,13.261c-12.78,14.395-35.917,27.956-65.77,37.441
                                c-29.844,9.549-66.287,15.231-105.572,15.222c-52.372,0.028-99.726-10.138-133.046-25.941
                                c-16.674-7.87-29.763-17.146-38.294-26.722c-3.958-4.448-6.89-8.859-8.942-13.261v-64.754c16.684,15.258,40.111,27.43,68.13,36.443
                                c32.304,10.32,70.789,16.247,112.152,16.247c55.16-0.027,105.164-10.484,142.306-28.029c14.931-7.08,27.693-15.358,37.976-24.789
                                V221.572z M436.282,121.936c-2.051,4.403-4.983,8.823-8.94,13.271c-12.78,14.405-35.917,27.956-65.77,37.451
                                c-29.844,9.548-66.287,15.23-105.572,15.222c-52.372,0.027-99.726-10.14-133.046-25.95c-16.674-7.879-29.763-17.147-38.294-26.722
                                c-3.958-4.448-6.89-8.868-8.942-13.262v-15.394c0.01-4.294,0.89-8.469,2.769-12.835c3.268-7.607,9.848-15.766,19.86-23.554
                                c14.968-11.7,37.369-22.256,64.526-29.617c27.158-7.398,59.053-11.709,93.127-11.7c51.91-0.046,98.819,10.085,131.504,25.606
                                c16.356,7.706,29.054,16.765,37.142,25.86c4.066,4.538,6.988,9.05,8.868,13.406c1.878,4.366,2.758,8.541,2.768,12.835V121.936z"/>
                        </g>
                    </svg>
                    <div className="text-start text-[#283136] text-[28px] font-extrabold font-['Open Sans'] leading-10">+ 20.8 K</div>
                    <div className="text-start text-[#283136] text-[17px] font-normal font-['Open Sans'] leading-normal">Devis</div>
                    <div className="text-start text-[#283136] text-[17px] font-normal font-['Open Sans'] leading-normal">Confirmé</div>
                </div>

                <div className="!bg-[#dadff9] rounded-[5px] pl-12 pr-12 pt-20 pb-10">
                <svg className="mb-8" fill="#000000" width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5,22H19a3,3,0,0,0,3-3V9a3,3,0,0,0-3-3H17V4a2,2,0,0,0-2-2H9A2,2,0,0,0,7,4V6H5A3,3,0,0,0,2,9V19A3,3,0,0,0,5,22ZM18,8h1a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H18ZM9,4h6V6H9ZM8,8h8V20H8ZM4,9A1,1,0,0,1,5,8H6V20H5a1,1,0,0,1-1-1Z"/></svg>
                    <div className="text-start text-[#283136] text-[28px] font-extrabold font-['Open Sans'] leading-10">30 K</div>
                    <div className="text-start text-[#283136] text-[17px] font-normal font-['Open Sans'] leading-normal">Nos</div>
                    <div className="text-start text-[#283136] text-[17px] font-normal font-['Open Sans'] leading-normal">Clients</div>
                </div>

                <div className="!bg-[#dadff9] rounded-[5px] pl-12 pr-12 pt-20 pb-10">
                    <svg className="mb-8" width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.2A10.8 10.8 0 1 0 22.8 12 10.8 10.8 0 0 0 12 1.2zm0 20.6a9.8 9.8 0 1 1 9.8-9.8 9.811 9.811 0 0 1-9.8 9.8zm0-2.826a6.961 6.961 0 0 1-6.57-4.47l.928-.371a6.064 6.064 0 0 0 11.284 0l.928.37a6.96 6.96 0 0 1-6.57 4.47zM15.5 11a1.074 1.074 0 0 1-.518-.135 1.293 1.293 0 0 1-.405-.353 1.575 1.575 0 0 1-.246-.479 1.79 1.79 0 0 1 0-1.066 1.575 1.575 0 0 1 .246-.479 1.293 1.293 0 0 1 .405-.353 1.065 1.065 0 0 1 1.036 0 1.293 1.293 0 0 1 .405.353 1.575 1.575 0 0 1 .246.48 1.79 1.79 0 0 1 0 1.065 1.575 1.575 0 0 1-.246.479 1.293 1.293 0 0 1-.405.353A1.074 1.074 0 0 1 15.5 11zm-7 0a1.074 1.074 0 0 1-.518-.135 1.293 1.293 0 0 1-.405-.353 1.575 1.575 0 0 1-.246-.479 1.79 1.79 0 0 1 0-1.066 1.575 1.575 0 0 1 .246-.479 1.293 1.293 0 0 1 .405-.353 1.065 1.065 0 0 1 1.036 0 1.293 1.293 0 0 1 .405.353 1.575 1.575 0 0 1 .246.48 1.79 1.79 0 0 1 0 1.065 1.575 1.575 0 0 1-.246.479 1.293 1.293 0 0 1-.405.353A1.074 1.074 0 0 1 8.5 11z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                    <div className="text-start text-[#283136] text-[28px] font-extrabold font-['Open Sans'] leading-10">97 %</div>
                    <div className="text-start text-[#283136] text-[17px] font-normal font-['Open Sans'] leading-normal">De clients</div>
                    <div className="text-start text-[#283136] text-[17px] font-normal font-['Open Sans'] leading-normal">satisfaits</div>
                </div>

            </div>
        </section>

        <section className="max-w-7xl mx-auto mt-10 p-8">
            <div className="left-[15px] mb-8 text-[#283136] text-2xl font-extrabold font-['Open Sans'] leading-relaxed">
                Nos missions
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4 flex justify-center items-center text-center">

                <div className="w-full">
                    <div className="h-64 w-full bg-gray-200 mb-6 w-1/2 bg-cover bg-center bg-no-repeat rounded-md" style={{ backgroundImage: 'url("/assets/mission/1.webp")' }}>

                    </div>
                    <h3 className="text-start text-lg text-gray-900 font-medium leading-6 mb-4 group-hover:text-indigo-600">Faciliter vos démarches de raccordement électrique</h3>
                    <p className="text-start text-gray-500 leading-6 transition-all duration-500 mb-8">
                    Notre plateforme facilite vos demandes de raccordement électrique, qu&apos;il s&apos;agisse d&apos;Enedis ou d'une ELD. 
                    </p>
                    <p className="text-start text-gray-500 leading-6 transition-all duration-500 mb-8">
                    Nous vous accompagnons à chaque étape, de la constitution du dossier jusqu&apos;à la mise en service. Grâce à notre expertise, nous assurons un suivi rigoureux pour un traitement rapide et efficace. En collaboration avec les gestionnaires de réseau et fournisseurs d&apos;énergie, nous garantissons une transition fluide. Bénéficiez d&apos;une assistance complète pour le raccordement et la signature de votre contrat, en toute simplicité.
                    </p>
                   
                </div>

                <div className="w-full">
                    <div className="h-64 w-full bg-gray-200 mb-6 w-1/2 bg-cover bg-center bg-no-repeat rounded-md" style={{ backgroundImage: 'url("/assets/mission/2.jpg")' }}>

                    </div>
                    <h3 className="text-start text-lg text-gray-900 font-medium leading-6 mb-4 group-hover:text-indigo-600">Offrir une plateforme intuitive et complète pour vos démarches de raccordement</h3>
                    <p className="text-start text-gray-500 leading-6 transition-all duration-500 mb-8">
                        Grâce à une interface ergonomique et intuitive, Raccoelec simplifie la gestion de vos demandes de raccordement électrique. Notre plateforme met à votre disposition des outils performants pour suivre et gérer chaque étape du processus, de l&apos;étude technique à la signature de votre contrat d&apos;énergie.
                    </p>
                    <p className="text-start text-gray-500 leading-6 transition-all duration-500 mb-8">
                    En vous proposant des informations claires et des fonctionnalités avancées, Raccoelec vous permet d&apos;optimiser vos démarches et de prendre des décisions éclairées, tout en vous adaptant aux exigences du réseau électrique et aux évolutions réglementaires.
                    </p>
                </div>

                <div className="w-full">
                    <div className="h-64 w-full bg-gray-200 mb-6 w-1/2 bg-cover bg-center bg-no-repeat rounded-md" style={{ backgroundImage: 'url("/assets/mission/3.webp")' }}>
                       
                    </div>
                    <h3 className="text-start text-lg text-gray-900 font-medium leading-6 mb-4 group-hover:text-indigo-600">Promouvoir la transparence et l&apos;éthique dans les démarches de raccordement</h3>
                    <p className="text-start text-gray-500 leading-6 transition-all duration-500 mb-8">
                        En centralisant toutes les informations nécessaires en un seul point et en rendant la majorité de nos services accessibles gratuitement, Raccoelec renforce la transparence dans les démarches de raccordement électrique.
                    </p>
                    <p className="text-start text-gray-500 leading-6 transition-all duration-500 mb-8">
                        Notre plateforme soutient un environnement responsable et éthique en offrant un accompagnement clair, précis et conforme aux réglementations en vigueur. Cela permet aux utilisateurs de mieux comprendre les processus et de prendre des décisions en toute confiance, dans un esprit de collaboration avec les acteurs du secteur énergétique.
                    </p>
                </div>
                        
            </div>
        </section>  

        <section className="max-w-7xl mx-auto mt-10 p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 gap-4 flex justify-center items-center text-center">
                <div className="h-96 w-full bg-gray-200 mb-6 w-1/2 bg-cover bg-center bg-no-repeat rounded-md" style={{ backgroundImage: 'url("/assets/mission/4.jpg")' }}> </div>
                <div className="w-full h-full flex flex-col justify-center">
                    <h2 className="text-[#203edc] text-lg font-semibold text-start">
                        NOTRE ENGAGEMENT
                    </h2>
                    <h1 className="text-gray-800 text-2xl font-bold mt-2  text-start">
                        Dire la vérité, rien que la vérité sur le raccordement électrique
                    </h1>
                    <p className="text-gray-600 mt-4  text-start">
                        Nous sommes convaincus que la transparence est essentielle pour garantir la confiance et la pérennité dans vos démarches de raccordement électrique.
                    </p>
                    <p className="text-gray-600 mt-4  text-start">
                        Chez Raccoelec, nous favorisons un environnement plus éthique et responsable en vous offrant une visibilité complète sur les étapes du processus, les acteurs impliqués et les délais à prévoir. Notre objectif est de vous fournir une transparence totale, afin que vous puissiez avancer en toute confiance et en toute sérénité dans vos projets énergétiques.
                    </p>
                </div>
            </div>
        </section>



    </>);
}

export default aproposnous