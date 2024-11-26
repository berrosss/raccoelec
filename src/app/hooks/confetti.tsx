import { useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// Use forwardRef to pass the ref to the parent component
const Confetti = forwardRef((_, ref) => {
  // This will be the function we want to expose
  const launchConfetti = () => {
    const colors = ["#FF4081", "#3F51B5", "#4CAF50", "#FFC107", "#00BCD4"];
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none";
    document.body.appendChild(container); 

    for (let i = 0; i < 100; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = "10px";
      particle.style.height = "10px";
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = "50%";
      particle.style.opacity = Math.random().toString();
      container.appendChild(particle);

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      gsap.fromTo(
        particle,
        {
          x: window.innerWidth / 2,
          y: window.innerHeight,
          scale: Math.random() * 1.5 + 0.5,
          opacity: 1,
          rotation: Math.random() * 360,
        },
        {
          x: x,
          y: y,
          rotation: "+=360",
          scale: 0.5,
          opacity: 0,
          duration: Math.random() * 2 + 1,
          ease: "power1.out",
          onComplete: () => {
            container.removeChild(particle);
          },
        }
      );
    }

    setTimeout(() => {
      document.body.removeChild(container);
    }, 3000); // Remove the container after animation
  };

  // Expose the launchConfetti function to the parent component
  useImperativeHandle(ref, () => ({
    launchConfetti,
  }));

  return null; // This component only triggers the confetti animation
});

export default Confetti;
