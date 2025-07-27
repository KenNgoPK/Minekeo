"use client";
import { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [playerCount, setPlayerCount] = useState(123);
  const [copied, setCopied] = useState(false);

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

  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroContent}>
        <div className={styles.playerCount}>
          <span className="material-symbols-rounded" style={{fontSize: "1.18em", marginRight: 7}}>whatshot</span>
          <span className="lang-en">{playerCount} Players Online</span>
          <span className="lang-vi">{playerCount} Người chơi</span>
        </div>
        <img
          className={styles.heroLogo}
          src="/img/minekeoLogo.png"
          alt="MineKeo server logo"
        />
        <div className={styles.serverIpContainer} onClick={handleCopyIP}>
          <div className={styles.serverIp}>MINEKEO.COM</div>
          <button className={styles.copyBtn}>
            {copied ? (
              <>
                <span className="material-symbols-rounded" style={{fontSize: "1.1em", marginRight: 4}}>check_circle</span>
                <span className="lang-en">COPIED!</span>
                <span className="lang-vi">ĐÃ SAO CHÉP!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-rounded" style={{fontSize: "1.1em", marginRight: 4}}>content_copy</span>
                <span className="lang-en">CLICK TO COPY</span>
                <span className="lang-vi">CLICK ĐỂ SAO CHÉP</span>
              </>
            )}
          </button>
        </div>
        <a href="https://discord.gg/minekeo" target="_blank" className={styles.discordBtn}>
          <span className="material-symbols-rounded" style={{fontSize: "1.18em", marginRight: 7}}>chat</span>
          <span className="lang-en">JOIN DISCORD</span>
          <span className="lang-vi">THAM GIA DISCORD</span>
        </a>
      </div>
    </section>
  );
}
