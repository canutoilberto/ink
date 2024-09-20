"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    gsap.fromTo(
      title,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );

    // Verifica se 'content' não é null antes de acessar suas propriedades
    if (content) {
      gsap.fromTo(
        content.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }

    gsap.fromTo(
      image,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );

    // Parallax effect
    gsap.to(image, {
      y: () => -ScrollTrigger.maxScroll(window) * 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
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
      id="about"
      ref={sectionRef}
      className="relative py-20 bg-black text-white overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent"></div>
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-[5rem] font-display text-center"
        >
          About Ink Steellers
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div ref={contentRef} className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <p className="text-lg mb-6 font-serif">
              At Ink Steellers, we believe that tattoos are more than just ink
              on skin. They&apos;re stories, memories, and expressions of
              individuality. Our studio is a sanctuary for creativity and
              self-expression.
            </p>
            <p className="text-lg mb-6 font-serif">
              Founded in 2010, we&apos;ve been pushing the boundaries of tattoo
              artistry for over a decade. Our team of skilled artists
              specializes in a wide range of styles, from traditional to
              contemporary, ensuring that every client finds their perfect
              match.
            </p>
            <p className="text-lg font-serif">
              We pride ourselves on our commitment to safety, hygiene, and
              client satisfaction. Every tattoo is a collaboration between
              artist and client, resulting in a unique piece of art that
              you&apos;ll wear with pride for a lifetime.
            </p>
            <a
              href="#"
              className="inline-block mt-8 bg-white text-black px-8 py-3 rounded-full text-lg font-bold hover:bg-opacity-90 transition-colors font-sans"
            >
              Meet Our Artists
            </a>
          </div>
          <div ref={imageRef} className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
            <Image
              width={500}
              height={100}
              src="/tattoo2.avif"
              alt="Ink Masters Tattoo Artist at Work"
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
}
