"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header({ lang, setLang, sakura, setSakura }) {
  const pathname = usePathname();
  const i18nRefs = useRef([]);

  // route active helper
  const isActive = (href) =>
    pathname === href ||
    (href !== "/" && pathname?.startsWith(href + "/")) ||
    (href === "/" && pathname === "/");

  // chỉ còn sync data-lang
  useEffect(() => {
    document.body.setAttribute("data-lang", lang);
  }, [lang]);

  // đo width lớn nhất EN/VI để khoá
  useLayoutEffect(() => {
    const measure = () => {
      i18nRefs.current.forEach((el) => {
        if (!el) return;
        const en = el.querySelector(".lang-en");
        const vi = el.querySelector(".lang-vi");
        if (!en || !vi) return;

        const prevEn = en.getAttribute("style") || "";
        const prevVi = vi.getAttribute("style") || "";
        en.style.visibility = "visible";
        en.style.opacity = "1";
        vi.style.visibility = "visible";
        vi.style.opacity = "1";

        const w = Math.ceil(
          Math.max(
            en.scrollWidth || en.getBoundingClientRect().width,
            vi.scrollWidth || vi.getBoundingClientRect().width
          )
        );
        el.style.setProperty("--i18n-w", `${w}px`);

        en.setAttribute("style", prevEn);
        vi.setAttribute("style", prevVi);
      });
    };

    measure();
    window.addEventListener("resize", measure);
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    return () => window.removeEventListener("resize", measure);
  }, []);

  const setI18nRef = (el, idx) => (i18nRefs.current[idx] = el);

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          {/* Logo */}
          <div className={styles.navLeft}>
            <img className={styles.logo} src="/img/minekeoLogo.png" alt="MineKeo logo" />
          </div>

          {/* Menu */}
          <div className={styles.navCenter}>
            <ul className={styles.navLinks}>
              <li>
                <Link
                  href="/"
                  className={`${styles.navLink} ${isActive("/") ? styles.navLinkActive : ""}`}
                  aria-current={isActive("/") ? "page" : undefined}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: "1.2em", marginRight: 8 }}>home</span>
                  <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 0)}>
                    <span className="lang-en">Home</span>
                    <span className="lang-vi">Trang chủ</span>
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/staff"
                  className={`${styles.navLink} ${isActive("/staff") ? styles.navLinkActive : ""}`}
                  aria-current={isActive("/staff") ? "page" : undefined}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: "1.2em", marginRight: 8 }}>groups</span>
                  <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 1)}>
                    <span className="lang-en">Staff</span>
                    <span className="lang-vi">Staff</span>
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/vote"
                  className={`${styles.navLink} ${isActive("/recharge") ? styles.navLinkActive : ""}`}
                  aria-current={isActive("/recharge") ? "page" : undefined}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: "1.2em", marginRight: 8 }}>paid</span>
                  <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 2)}>
                    <span className="lang-en">Recharge</span>
                    <span className="lang-vi">Nạp tiền</span>
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/vote"
                  className={`${styles.navLink} ${isActive("/vote") ? styles.navLinkActive : ""}`}
                  aria-current={isActive("/vote") ? "page" : undefined}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: "1.2em", marginRight: 8 }}>gavel</span>
                  <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 3)}>
                    <span className="lang-en">Votes</span>
                    <span className="lang-vi">Votes</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Toggles chỉ còn EN/VI + Sakura */}
          <div className={styles.navRight + " " + styles.toggleContainer}>
            <button
              className={styles.toggleBtn + (lang !== "en" ? ` ${styles.toggleBtnActive}` : "")}
              onClick={() => setLang(lang === "en" ? "vi" : "en")}
            >
              <span className="material-symbols-rounded" style={{ fontSize: "1.1em", marginRight: 4 }}>language</span>
              <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 5)}>
                <span className="lang-en">EN</span>
                <span className="lang-vi">VI</span>
              </span>
            </button>

            <button
              className={styles.toggleBtn + (sakura ? ` ${styles.toggleBtnActive}` : "")}
              onClick={() => setSakura((v) => !v)}
              title="Tắt/Bật hiệu ứng hoa anh đào"
            >
              <span className="material-symbols-rounded" style={{ fontSize: "1.1em", marginRight: 4 }}>local_florist</span>
              <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 6)}>
                <span className="lang-en">Sakura</span>
                <span className="lang-vi">Hoa</span>
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
