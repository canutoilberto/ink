"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const artists = [
  { name: "Alex Ink", specialty: "Traditional", image: "/artist-1.avif" },
  { name: "Sam Sketch", specialty: "Realism", image: "/artist-2.avif" },
  { name: "Jordan Color", specialty: "Watercolor", image: "/artist-3.avif" },
  { name: "Taylor Lines", specialty: "Minimalist", image: "/artist-4.avif" },
];

export default function ArtistsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const artistsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const artistElements = artistsRef.current;

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

    artistElements.forEach((artist, index) => {
      if (!artist) return; // Verifica se o artista não é null antes de animar
      gsap.fromTo(
        artist,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: `top ${70 - index * 10}%`,
            end: `top ${30 - index * 10}%`,
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="artists"
      ref={sectionRef}
      className="py-20 bg-gray-900 text-white"
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-12 font-display text-center"
        >
          Our Artists
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {artists.map((artist, index) => (
            <div
              key={artist.name}
              ref={(el) => {
                artistsRef.current[index] = el;
              }} // Sem retorno de el
              className="bg-black bg-opacity-50 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <Image
                width={1000}
                height={1000}
                src={artist.image}
                alt={artist.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 font-sans">
                  {artist.name}
                </h3>
                <p className="text-gray-400 font-serif">{artist.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
}
