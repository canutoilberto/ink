"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (content && content.children) {
      gsap.fromTo(
        content.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white py-12">
      <div ref={contentRef} className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-display">
              Ink Steellers
            </h3>
            <p className="font-serif">
              Where art meets skin, and stories come to life.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 font-sans">Quick Links</h4>
            <ul className="space-y-2 font-serif">
              <li>
                <a
                  href="#home"
                  className="hover:text-gray-300 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-gray-300 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#artists"
                  className="hover:text-gray-300 transition-colors"
                >
                  Artists
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-gray-300 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 font-sans">Contact Us</h4>
            <address className="not-italic font-serif">
              <p>123 Ink Street</p>
              <p>Tattoo City, TC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@inksteellers.com</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center font-sans">
          <p>
            &copy; {new Date().getFullYear()} Ink Steellers Studio. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
