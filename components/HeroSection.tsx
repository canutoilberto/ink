"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;

    // Verifica se textRef.current não é null antes de acessar suas propriedades
    if (!textRef.current) return;

    const textElements = textRef.current.children;

    const tl = gsap.timeline();

    // Animate the background
    tl.fromTo(
      section,
      { backgroundPosition: "50% 100%" },
      {
        backgroundPosition: "50% 0%",
        ease: "none",
        duration: 10,
        repeat: -1,
        yoyo: true,
      }
    );

    // Animate text elements
    gsap.fromTo(
      textElements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      }
    );

    // Animate cursor
    gsap.to(cursor, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
    });

    // Parallax effect on scroll
    gsap.to(textElements, {
      y: (i, el) =>
        (1 - parseFloat(el.getAttribute("data-speed") || "0")) *
        ScrollTrigger.maxScroll(window) *
        0.1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen bg-black bg-[url('/tattoo-bg.webp')] bg-cover bg-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative container mx-auto px-4 flex flex-col justify-center items-center min-h-screen">
        <div ref={textRef} className="text-center">
          <h1
            className="text-6xl md:text-8xl font-bold mb-4 text-white font-display"
            data-speed="0.1"
          >
            Ink Steellers
          </h1>
          <p
            className="text-2xl md:text-4xl mb-8 text-white font-serif"
            data-speed="0.2"
          >
            Where Art Meets Skin
          </p>
          <div
            className="flex justify-center items-center space-x-4"
            data-speed="0.3"
          >
            <a
              href="#"
              className="bg-white text-black px-8 py-3 rounded-full text-lg font-bold hover:bg-opacity-90 transition-colors font-sans"
            >
              Book Now
            </a>
            <span ref={cursorRef} className="text-white text-4xl">
              |
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}
