"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "@/components/Header/Header";
import HeroSection from "@/components/Hero/HeroSection";
import SakuraEffect from "@/components/SakuraEffect";
import BlogSection from "@/components/BLocksection/BlogSection";

export default function Home() {
  // Khởi tạo state từ cookie (có kiểm tra chuỗi "true"/"false")
  const [lang, setLang] = useState(() => Cookies.get("lang") || "vi");
  const [theme, setTheme] = useState(() => Cookies.get("theme") || "dark");
  const [sakura, setSakura] = useState(() => {
    const sakuraCookie = Cookies.get("sakura");
    // Nếu chưa có thì mặc định là true
    if (sakuraCookie === undefined) return true;
    // Trả về true/false dựa vào chuỗi lưu trong cookie
    return sakuraCookie === "true";
  });

  useEffect(() => {
    Cookies.set("lang", lang, { expires: 365, path: "/" });
  }, [lang]);

  useEffect(() => {
    Cookies.set("theme", theme, { expires: 365, path: "/" });
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    Cookies.set("sakura", sakura ? "true" : "false", { expires: 365, path: "/" });
  }, [sakura]);

  return (
    <div>
      <div className="header-hero-bg min-h-screen relative">
        <Header
          theme={theme}
          setTheme={setTheme}
          lang={lang}
          setLang={setLang}
          sakura={sakura}
          setSakura={setSakura}
        />
        <HeroSection />
        <SakuraEffect enabled={sakura} />
      </div>
      <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
        <BlogSection lang={lang} />
      </div>
    </div>
  );
}
