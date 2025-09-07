"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Header from "@/components/Header/Header";
import HeroSection from "@/components/Hero/HeroSection";
import SakuraEffect from "@/components/SakuraEffect";
import BlogSection from "@/components/BLocksection/BlogSection";
import WaveDivider from "@/components/WaveDivider";
import Footer from "@/components/Footer/Footer";   // ← footer
import "./globals.css";

export default function Home() {
  // Khởi tạo state từ cookie
  const [lang, setLang] = useState(() => Cookies.get("lang") || "vi");
  const [sakura, setSakura] = useState(() => {
    const s = Cookies.get("sakura");
    if (s === undefined) return true;
    return s === "true";
  });

  // Sync lang
  useEffect(() => {
    Cookies.set("lang", lang, { expires: 365, path: "/" });
    document.body.setAttribute("data-lang", lang);
  }, [lang]);

  // Sync sakura
  useEffect(() => {
    Cookies.set("sakura", sakura ? "true" : "false", { expires: 365, path: "/" });
  }, [sakura]);

  return (
    <div>
       <Header
          lang={lang}
          setLang={setLang}
          sakura={sakura}
          setSakura={setSakura}
        />
      <div className="header-hero-bg min-h-screen relative">
        <HeroSection />
        {sakura && <SakuraEffect enabled={sakura} />}
        <WaveDivider
          fill="#f5f5f5"
          position="bottom"
          dropShadow={true}
          className="wave-divider"
        />
      </div>

      <div className="blog-section-bg">
        <BlogSection lang={lang} />
      </div>
      <Footer />
        
    </div>
  );
}