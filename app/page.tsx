import AboutSection from "@/components/AboutSection";
import ArtistsSection from "@/components/ArtistsSection";
import ContactSection from "@/components/ContactSection";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ArtistsSection />
      <ContactSection />
      {/* Outros componentes da página inicial */}
    </main>
  );
}
