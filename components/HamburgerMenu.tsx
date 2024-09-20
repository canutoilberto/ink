"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface HamburgerMenuProps {
  links: { href: string; label: string }[];
}

export default function HamburgerMenu({ links }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    tl.current = gsap
      .timeline({ paused: true })
      .to(menuRef.current, { right: 0, duration: 0.3, ease: "power2.inOut" })
      .from(
        ".menu-item",
        { opacity: 0, y: 20, stagger: 0.1, ease: "power2.out" },
        "-=0.1"
      );

    return () => {
      tl.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white bg-opacity-10 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div
          className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
            isOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-white transition-all ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></div>
      </button>
      <nav
        ref={menuRef}
        className="fixed top-0 right-[-100%] w-64 h-full bg-black bg-opacity-95 z-40 flex flex-col justify-center items-center"
      >
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="menu-item text-white text-2xl mb-6 hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
