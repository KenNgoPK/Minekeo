"use client";
import { useEffect } from "react";
import Link from "next/link"; // Next.js Link
import styles from "./Header.module.css";

export default function Header({ theme, setTheme, lang, setLang, sakura, setSakura }) {
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.body.setAttribute("data-lang", lang);
  }, [theme, lang]);

  // Nếu cần scroll đến section cùng trang
  function handleNavClick(e, id) {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          {/* Logo bên trái */}
          <div className={styles.navLeft}>
            <img className={styles.logo} src="/img/minekeoLogo.png" alt="MineKeo logo" />
          </div>
          {/* Menu giữa */}
          <div className={styles.navCenter}>
            <ul className={styles.navLinks}>
              <li>
                {/* Chuyển đến trang chủ ("/") */}
                <Link className={styles.navLink} href="/">
                  <span className="material-symbols-rounded" style={{fontSize: "1.2em", marginRight: 8}}>home</span>
                  <span className="lang-en">Home</span>
                  <span className="lang-vi">Trang chủ</span>
                </Link>
              </li>
              <li>
                {/* Chuyển sang trang staff */}
                <Link className={styles.navLink} href="/staff">
                  <span className="material-symbols-rounded" style={{fontSize: "1.2em", marginRight: 8}}>groups</span>
                  <span className="lang-en">Staff</span>
                  <span className="lang-vi">Staff</span>
                </Link>
              </li>
              <li>
                {/* Nếu muốn chuyển trang recharge */}
                <Link className={styles.navLink} href="/recharge">
                  <span className="material-symbols-rounded" style={{fontSize: "1.2em", marginRight: 8}}>paid</span>
                  <span className="lang-en">Recharge</span>
                  <span className="lang-vi">Nạp tiền</span>
                </Link>
                {/* Nếu muốn chỉ cuộn trong trang, đổi thành:
                <a className={styles.navLink} href="#recharge" onClick={e => handleNavClick(e, "#recharge")}> ... </a>
                */}
              </li>
              <li>
                {/* Chuyển sang trang rules */}
                <Link className={styles.navLink} href="/rules">
                  <span className="material-symbols-rounded" style={{fontSize: "1.2em", marginRight: 8}}>gavel</span>
                  <span className="lang-en">Rules</span>
                  <span className="lang-vi">Quy tắc</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* Toggle phải */}
          <div className={styles.navRight + " " + styles.toggleContainer}>
            <button
              className={
                styles.toggleBtn +
                (theme !== "dark" ? ` ${styles.toggleBtnActive}` : "")
              }
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <span className="material-symbols-rounded" style={{fontSize: "1.1em", marginRight: 4}}>
                {theme === "dark" ? "dark_mode" : "light_mode"}
              </span>
              <span className="lang-en">{theme === "dark" ? "Dark" : "Light"}</span>
              <span className="lang-vi">{theme === "dark" ? "Tối" : "Sáng"}</span>
            </button>
            <button
              className={
                styles.toggleBtn +
                (lang !== "en" ? ` ${styles.toggleBtnActive}` : "")
              }
              onClick={() => setLang(lang === "en" ? "vi" : "en")}
            >
              <span className="material-symbols-rounded" style={{fontSize: "1.1em", marginRight: 4}}>language</span>
              <span className="lang-en">EN</span>
              <span className="lang-vi">VI</span>
            </button>
            <button
              className={
                styles.toggleBtn +
                (sakura ? ` ${styles.toggleBtnActive}` : "")
              }
              onClick={() => setSakura((v) => !v)}
              title="Tắt/Bật hiệu ứng hoa anh đào"
            >
              <span className="material-symbols-rounded" style={{fontSize: "1.1em", marginRight: 4}}>local_florist</span>
              <span className="lang-en">Sakura</span>
              <span className="lang-vi">Hoa</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
