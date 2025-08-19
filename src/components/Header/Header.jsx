"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header({ theme, setTheme, lang, setLang, sakura, setSakura }) {
  const i18nRefs = useRef([]); // giữ ref cho từng i18nWrap

  // set data-theme / data-lang cho body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.body.setAttribute("data-lang", lang);
  }, [theme, lang]);

  // Đo width lớn nhất giữa EN/VI rồi KHÓA width bằng --i18n-w
  useLayoutEffect(() => {
    const measure = () => {
      i18nRefs.current.forEach((el) => {
        if (!el) return;
        const en = el.querySelector(".lang-en");
        const vi = el.querySelector(".lang-vi");
        if (!en || !vi) return;

        // tạm bật để đo chính xác
        const prevStyleEn = en.getAttribute("style") || "";
        const prevStyleVi = vi.getAttribute("style") || "";
        en.style.visibility = "visible";
        en.style.opacity = "1";
        vi.style.visibility = "visible";
        vi.style.opacity = "1";

        // lấy width tối đa (dùng scrollWidth/bounding để chắc ăn)
        const w = Math.ceil(
          Math.max(
            en.scrollWidth || en.getBoundingClientRect().width,
            vi.scrollWidth || vi.getBoundingClientRect().width
          )
        );

        el.style.setProperty("--i18n-w", `${w}px`);

        // trả lại style cũ (ẩn/hiện sẽ do CSS [data-lang] quyết định)
        en.setAttribute("style", prevStyleEn);
        vi.setAttribute("style", prevStyleVi);
      });
    };

    measure();
    // đo lại khi resize hoặc font load
    window.addEventListener("resize", measure);
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    return () => window.removeEventListener("resize", measure);
  // re-measure khi theme đổi vì nút Dark/Light đổi chữ => độ dài khác
  }, [theme]);

  // helper gán ref
  const setI18nRef = (el, idx) => (i18nRefs.current[idx] = el);

  function handleNavClick(e, id) {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
                <Link className={styles.navLink} href="/">
                  <span className="material-symbols-rounded" style={{ fontSize: "1.2em", marginRight: 8 }}>home</span>
                  <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 0)}>
                    <span className="lang-en">Home</span>
                    <span className="lang-vi">Trang chủ</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} href="/staff">
                  <span className="material-symbols-rounded" style={{ fontSize: "1.2em", marginRight: 8 }}>groups</span>
                  <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 1)}>
                    <span className="lang-en">Staff</span>
                    <span className="lang-vi">Staff</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} href="/recharge">
                  <span className="material-symbols-rounded" style={{ fontSize: "1.2em", marginRight: 8 }}>paid</span>
                  <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 2)}>
                    <span className="lang-en">Recharge</span>
                    <span className="lang-vi">Nạp tiền</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} href="/rules">
                  <span className="material-symbols-rounded" style={{ fontSize: "1.2em", marginRight: 8 }}>gavel</span>
                  <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 3)}>
                    <span className="lang-en">Rules</span>
                    <span className="lang-vi">Quy tắc</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Toggles */}
          <div className={styles.navRight + " " + styles.toggleContainer}>
            <button
              className={
                styles.toggleBtn + (theme !== "dark" ? ` ${styles.toggleBtnActive}` : "")
              }
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <span className="material-symbols-rounded" style={{ fontSize: "1.1em", marginRight: 4 }}>
                {theme === "dark" ? "dark_mode" : "light_mode"}
              </span>
              <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 4)}>
                <span className="lang-en">{theme === "dark" ? "Dark" : "Light"}</span>
                <span className="lang-vi">{theme === "dark" ? "Tối" : "Sáng"}</span>
              </span>
            </button>

            <button
              className={
                styles.toggleBtn + (lang !== "en" ? ` ${styles.toggleBtnActive}` : "")
              }
              onClick={() => setLang(lang === "en" ? "vi" : "en")}
            >
              <span className="material-symbols-rounded" style={{ fontSize: "1.1em", marginRight: 4 }}>language</span>
              <span className={styles.i18nWrap} ref={(el) => setI18nRef(el, 5)}>
                <span className="lang-en">EN</span>
                <span className="lang-vi">VI</span>
              </span>
            </button>

            <button
              className={
                styles.toggleBtn + (sakura ? ` ${styles.toggleBtnActive}` : "")
              }
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
