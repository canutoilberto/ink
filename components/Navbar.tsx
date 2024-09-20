"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // Controle de abertura do drawer

  useEffect(() => {
    const nav = navRef.current;

    gsap.fromTo(
      nav,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    // Bloqueia o scroll da página ao abrir o drawer
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 p-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold font-serif text-white">IS</h1>

        {/* Ícone de menu hambúrguer visível apenas em dispositivos móveis */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Menu de navegação - visível em telas maiores */}
        <ul className="hidden lg:flex space-x-4">
          <li>
            <a
              href="#home"
              className="text-white hover:text-gray-300 transition-colors font-serif"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className="text-white hover:text-gray-300 transition-colors font-serif"
            >
              Galeria
            </a>
          </li>
          <li>
            <a
              href="#artists"
              className="text-white hover:text-gray-300 transition-colors font-serif"
            >
              Artistas
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-white hover:text-gray-300 transition-colors font-serif"
            >
              Contato
            </a>
          </li>
        </ul>

        {/* Backdrop escuro para cobrir o conteúdo da página quando o drawer estiver aberto */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
            onClick={toggleMenu}
          />
        )}

        {/* Drawer do menu - aparece ao clicar no ícone */}
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-black text-white transition-transform transform ${
            isOpen ? "translate-x-0 z-[9999]" : "translate-x-full"
          } lg:hidden`}
        >
          <button
            onClick={toggleMenu}
            className="text-white absolute top-4 right-4 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <ul className="mt-12 space-y-4 p-4">
            <li>
              <a
                href="#home"
                onClick={toggleMenu}
                className="block hover:text-gray-300 transition-colors font-serif"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                onClick={toggleMenu}
                className="block hover:text-gray-300 transition-colors font-serif"
              >
                Galeria
              </a>
            </li>
            <li>
              <a
                href="#artists"
                onClick={toggleMenu}
                className="block hover:text-gray-300 transition-colors font-serif"
              >
                Artistas
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={toggleMenu}
                className="block hover:text-gray-300 transition-colors font-serif"
              >
                Contato
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
