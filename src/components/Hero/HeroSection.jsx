"use client";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [playerCount, setPlayerCount] = useState(123);
  const [copied, setCopied] = useState(false);

  // refs cho các cụm chữ cần khóa width
  const i18nRefs = useRef([]);

  // Copy IP
  const handleCopyIP = () => {
    navigator.clipboard.writeText("MINEKEO.COM");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Fetch player count real-time
  useEffect(() => {
    async function fetchPlayer() {
      try {
        const res = await fetch("https://api.mcstatus.io/v2/status/java/minekeo.com");
        const data = await res.json();
        setPlayerCount(data.players?.online ?? 0);
      } catch {
        setPlayerCount("???");
      }
    }
    fetchPlayer();
    const interval = setInterval(fetchPlayer, 10000);
    return () => clearInterval(interval);
  }, []);

  // Đo max width cho từng cụm chữ & KHÓA bằng --i18n-w (giống header)
  useLayoutEffect(() => {
    const probe = document.createElement("span");
    probe.className = styles.i18nMeasureProbe;
    document.body.appendChild(probe);

    const measure = () => {
      i18nRefs.current.forEach((el) => {
        if (!el) return;
        const en = el.querySelector(".lang-en");
        const vi = el.querySelector(".lang-vi");
        if (!en || !vi) return;

        // width từ 2 label hiện tại
        let maxW = Math.max(
          en.scrollWidth || en.getBoundingClientRect().width,
          vi.scrollWidth || vi.getBoundingClientRect().width
        );

        // nếu có data-samples (vd: copy button có 4 mẫu)
        const samplesAttr = el.getAttribute("data-samples");
        if (samplesAttr) {
          const samples = samplesAttr.split(",").map(s => s.trim()).filter(Boolean);
          const comp = window.getComputedStyle(el);
          probe.style.fontFamily = comp.fontFamily;
          probe.style.fontSize = comp.fontSize;
          probe.style.fontWeight = comp.fontWeight;
          probe.style.letterSpacing = comp.letterSpacing;
          probe.style.textTransform = comp.textTransform;
          probe.style.textShadow = "none";

          samples.forEach(txt => {
            probe.textContent = txt;
            const w = probe.scrollWidth || probe.getBoundingClientRect().width;
            if (w > maxW) maxW = w;
          });
        }

        el.style.setProperty("--i18n-w", `${Math.ceil(maxW)}px`);
      });
    };

    measure();
    window.addEventListener("resize", measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    return () => {
      window.removeEventListener("resize", measure);
      probe.remove();
    };
  }, []); // đo 1 lần là đủ vì samples đã cover mọi trường hợp

  const setI18nRef = (el, idx) => (i18nRefs.current[idx] = el);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroContent}>
        <div className={styles.playerCount}>
          <span className="material-symbols-rounded" style={{fontSize: "1.18em", marginRight: 7}}>whatshot</span>

          {/* Tách số ra riêng để số thay đổi không ảnh hưởng phần nhãn */}
          <span className={styles.countNumber}>{playerCount}</span>&nbsp;

          {/* Khóa width cho nhãn “Players Online / Người chơi” */}
          <span
            className={styles.i18nWrap}
            data-samples="Players Online,Người chơi"
            ref={(el) => setI18nRef(el, 0)}
          >
            <span className="lang-en">Players Online</span>
            <span className="lang-vi">Người chơi</span>
          </span>
        </div>

        <img
          className={styles.heroLogo}
          src="/img/minekeoLogo.png"
          alt="MineKeo server logo"
        />

        <div className={styles.serverIpContainer} onClick={handleCopyIP}>
          <div className={styles.serverIp}>MINEKEO.COM</div>

          <button className={styles.copyBtn} type="button">
            <span className="material-symbols-rounded" style={{fontSize: "1.1em", marginRight: 4}}>
              {copied ? "check_circle" : "content_copy"}
            </span>

            {/* Khóa width cho text của nút copy (4 mẫu: EN/VI x Copied/Not) */}
            <span
              className={styles.i18nWrap}
              data-samples="CLICK TO COPY,COPIED!,CLICK ĐỂ SAO CHÉP,ĐÃ SAO CHÉP!"
              ref={(el) => setI18nRef(el, 1)}
            >
              <span className="lang-en">{copied ? "COPIED!" : "CLICK TO COPY"}</span>
              <span className="lang-vi">{copied ? "ĐÃ SAO CHÉP!" : "CLICK ĐỂ SAO CHÉP"}</span>
            </span>
          </button>
        </div>

        <a href="https://discord.gg/minekeo" target="_blank" className={styles.discordBtn} rel="noreferrer">
          <span className="material-symbols-rounded" style={{fontSize: "1.18em", marginRight: 7}}>chat</span>

          {/* Khóa width cho text Discord */}
          <span
            className={styles.i18nWrap}
            data-samples="JOIN DISCORD,THAM GIA DISCORD"
            ref={(el) => setI18nRef(el, 2)}
          >
            <span className="lang-en">JOIN DISCORD</span>
            <span className="lang-vi">THAM GIA DISCORD</span>
          </span>
        </a>
      </div>
    </section>
  );
}
