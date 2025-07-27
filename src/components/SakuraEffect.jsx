"use client";
import { useEffect, useRef } from "react";

/**
 * Hiệu ứng hoa anh đào rơi (giữ nguyên dùng CSS toàn cục)
 */
export default function SakuraEffect({ enabled = true }) {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (containerRef.current) containerRef.current.innerHTML = "";
      return;
    }

    function createPetal() {
      if (!containerRef.current) return;
      const petal = document.createElement("div");
      petal.classList.add("cherry-petal");
      petal.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 18 18">
          <ellipse cx="9" cy="13" rx="4" ry="6" fill="#ffb6d9" opacity="0.93"/>
          <ellipse cx="10" cy="10" rx="2.6" ry="5" fill="#ff69b4" opacity="0.34"/>
        </svg>
      `;
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.top = "-32px";
      containerRef.current.appendChild(petal);

      const duration = 2500 + Math.random() * 2000;
      const translateX = (Math.random() - 0.5) * 220;
      const translateY = window.innerHeight + 80;
      const rotate = Math.random() * 270 + 90;

      petal.animate(
        [
          { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: 1 },
          { transform: `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotate}deg)`, opacity: 0.55 }
        ],
        { duration, easing: "ease-in", fill: "forwards" }
      );

      setTimeout(() => petal.remove(), duration);
    }

    intervalRef.current = setInterval(createPetal, 150);

    function handleResize() {
      if (containerRef.current) {
        containerRef.current.style.width = window.innerWidth + "px";
        containerRef.current.style.height = window.innerHeight + "px";
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [enabled]);

  return <div id="cherry-blossom" ref={containerRef} />;
}
