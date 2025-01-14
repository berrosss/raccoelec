import Image from "next/image";

export default function LogoCarousel() {
  const logos = [
    { src: "/assets/brands/1.png", alt: "Facebook" },
    { src: "/assets/brands/2.png", alt: "Disney" },
    { src: "/assets/brands/3.png", alt: "Airbnb" },
    { src: "/assets/brands/4.png", alt: "Apple" },
    { src: "/assets/brands/5.png", alt: "Spark" },
    { src: "/assets/brands/6.png", alt: "Samsung" },
    { src: "/assets/brands/7.png", alt: "Quora" },
    { src: "/assets/brands/8.png", alt: "Sass" },
    { src: "/assets/brands/9.png", alt: "Sass" },
  ];

  return (
    <div className="carousel max-w-7xl mx-auto mb-16">
      <div className=" inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul className="flex infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-4">
          {logos.map((logo, index) => (
            <li key={index} className="carousel-item bg-[#f9fafb] rounded-md py-4 px-3 flex justify-center items-center hover:bg-[#dae1e7]">
              <Image src={logo.src} alt={logo.alt} width={170} height={160} />
            </li>
          ))}
        </ul>
        <ul
          className="flex infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-4"
          aria-hidden="true"
        >
          {logos.map((logo, index) => (
            <li key={index} className="carousel-item bg-[#f9fafb] rounded-md py-2 px-3 flex justify-center items-center hover:bg-[#dae1e7]">
              <Image src={logo.src} alt={logo.alt} width={170} height={160}/>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}
