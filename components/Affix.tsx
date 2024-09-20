"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function Affix() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-2 rounded-full shadow-lg transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-6 w-6" />
          <span className="sr-only">Voltar ao topo</span>
        </button>
      )}
    </>
  );
}
