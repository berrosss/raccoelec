import Hero from "./components/Static/Sections/Hero";
import Features from "./components/Static/Sections/Features";
import Timeline from "./components/Static/Sections/Timeline";
import About from "./components/Static/Sections/About";
import Carousel from "./components/Static/Sections/Carousel";
import Table from "./components/Static/Sections/Table";
import Marquees from "./components/Static/Sections/Marquees";
import Blog from "./components/Dynamic/Home/Blog";
import BackToTopButton from "./components/Static/back-to-top-button/page";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Timeline />
      <About />
      <Carousel />
      <Table />
      <Marquees />
      <Blog />
      <BackToTopButton />
    </>
  );
}
