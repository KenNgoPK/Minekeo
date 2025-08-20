"use client";
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Left: Logo + copyright */}
        <div className={styles.brand}>
          <img
            src="/img/minekeoLogo.png"
            alt="MineKeo"
            className={styles.logo}
          />
          <p className={styles.copy}>
            All rights reserved. © {year}
          </p>
        </div>

        {/* Right: Socials */}
        <nav className={styles.socials} aria-label="Social links">
          <Link
            href="https://facebook.com/"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
          >
            {/* Facebook SVG */}
            <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.04 5.66 21.1 10.44 22v-7.01H7.9v-2.93h2.54V9.83c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.93h-2.34V22C18.34 21.1 22 17.04 22 12.06z" />
            </svg>
          </Link>

          <Link
            href="https://youtube.com/"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
          >
            {/* YouTube SVG */}
            <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
              <path d="M23.5 7.2a4 4 0 0 0-2.8-2.8C18.6 3.8 12 3.8 12 3.8s-6.6 0-8.7.6A4 4 0 0 0 .5 7.2 41.1 41.1 0 0 0 0 12c0 1.6.1 3.2.5 4.8a4 4 0 0 0 2.8 2.8c2.1.6 8.7.6 8.7.6s6.6 0 8.7-.6a4 4 0 0 0 2.8-2.8c.4-1.6.5-3.2.5-4.8 0-1.6-.1-3.2-.5-4.8zM9.6 15.5V8.5l6.2 3.5-6.2 3.5z"/>
            </svg>
          </Link>

          <Link
            href="https://discord.gg/"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            title="Discord"
          >
            {/* Discord SVG */}
            <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
              <path d="M20.3 4.3A17.2 17.2 0 0 0 15.9 3c-.2.3-.4.7-.6 1.1-1.8-.3-3.6-.3-5.4 0-.2-.4-.4-.8-.6-1.1A17.2 17.2 0 0 0 3.7 4.3C1.9 7.4 1.2 10.4 1.4 13.4a17.7 17.7 0 0 0 5.7 2.9c.5-.6.9-1.2 1.2-1.9-2-.6-2.8-1.8-2.8-1.8.2.1 1 .6 2.7 1a9.7 9.7 0 0 0 5.1 0c1.7-.4 2.5-.9 2.7-1 0 0-.8 1.2-2.8 1.8.3.7.7 1.3 1.2 1.9a17.7 17.7 0 0 0 5.7-2.9c.3-3 .1-6-1.7-9.1zM8.9 12.7c-.8 0-1.5-.7-1.5-1.5S8.1 9.7 8.9 9.7s1.5.7 1.5 1.5-.6 1.5-1.5 1.5zm6.2 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"/>
            </svg>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
