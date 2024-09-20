"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, src: "/tattoo-1.avif", alt: "Colorful sleeve tattoo" },
  {
    id: 2,
    src: "/tattoo-2.avif",
    alt: "Black and grey realistic portrait tattoo",
  },
  { id: 3, src: "/tattoo-3.avif", alt: "Traditional style anchor tattoo" },
  { id: 4, src: "/tattoo-4.avif", alt: "Watercolor style flower tattoo" },
  { id: 5, src: "/tattoo-5.avif", alt: "Geometric mandala tattoo" },
  { id: 6, src: "/tattoo-6.avif", alt: "Japanese style dragon tattoo" },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const gallery = galleryRef.current;

    if (!gallery) return; // Verifica se 'gallery' não é null antes de tentar acessar 'children'

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

    gsap.fromTo(
      gallery.children,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gallery,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-20 bg-gray-900 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent"></div>
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-12 font-display text-center"
        >
          Our Gallery
        </h2>
        <div
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {galleryItems.map((item) => (
            <div key={item.id} className="relative overflow-hidden group">
              <Image
                width={1000}
                height={1000}
                src={item.src}
                alt={item.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-center font-serif">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}
