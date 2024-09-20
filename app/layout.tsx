import Navbar from "@/components/Navbar";
import "./globals.css";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import Affix from "@/components/Affix";

export const metadata: Metadata = {
  title: "InK Steellers Tattoo",
  description: "Where the skin meets art",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <Affix />
      </body>
    </html>
  );
}
