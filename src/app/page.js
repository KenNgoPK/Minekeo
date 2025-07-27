"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import HeroSection from "@/components/Hero/HeroSection";
import SakuraEffect from "@/components/SakuraEffect"; 
import BlogSection from "@/components/BLocksection/BlogSection";

export default function Home() {
  // State ở page.js để truyền xuống header
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");
  const [sakura, setSakura] = useState(true);

  return (
    <div>
      <div className="header-hero-bg min-h-screen relative">
      <Header theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} sakura={sakura} setSakura={setSakura} />
      <HeroSection />
      <SakuraEffect enabled={sakura} />
    </div>
      <div style={{ background: "#f5f5f5", minHeight: "100vh" }}> 
        <BlogSection />
      </div>
    </div>
    
    
  );
}
