"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SakuraEffect from "@/components/SakuraEffect";

import styles from "./VotePage.module.css";

const voteLinks = [
  { title: "Vote Link #1", url: "https://best-minecraft-servers.co/server-minekeo.16078/vote" },
  { title: "Vote Link #2", url: "https://servers-minecraft.net/server-minekeo.25217" },
  { title: "Vote Link #3", url: "https://minecraftservers.page/servers/minekeo/vote" },
  { title: "Vote Link #4", url: "https://minecraft-mp.com/server/345158/vote/" },
  { title: "Vote Link #5", url: "https://vote.pika-network.net/5" },
  { title: "Vote Link #6", url: "https://vote.pika-network.net/6" },
  { title: "Vote Link #7", url: "https://vote.pika-network.net/7" },
];

export default function VotePage() {
  // Khởi tạo & đồng bộ cookie (giống page.jsx)
  const [lang, setLang] = useState(() => Cookies.get("lang") || "vi");
  const [sakura, setSakura] = useState(() => {
    const s = Cookies.get("sakura");
    return s === undefined ? true : s === "true";
  });

  useEffect(() => {
    Cookies.set("lang", lang, { expires: 365, path: "/" });
    document.body.setAttribute("data-lang", lang);
  }, [lang]);

  useEffect(() => {
    Cookies.set("sakura", sakura ? "true" : "false", { expires: 365, path: "/" });
  }, [sakura]);

  return (
    <div className={styles.page}>
      {/* Header + Sakura */}
      <Header
          lang={lang}
          setLang={setLang}
          sakura={sakura}
          setSakura={setSakura}
        />
      <div className="header-hero-bg relative">
        {sakura && <SakuraEffect enabled={sakura} />}
      </div>

      {/* Container nội dung */}
      <div className={styles.container}>
        <main className={styles.content}>
          <h1 className={styles.title}>
            Vote cho MineKeo: Ủng hộ server mỗi ngày!
          </h1>

          <ul className={styles.list} role="list">
            {voteLinks.map((v, i) => (
              <li key={v.url} className={styles.item}>
                <div className={styles.badge}>#{i + 1}</div>

                <div className={styles.card}>
                  <div className={styles.meta}>
                    <div className={styles.linkTitle}>{v.title}</div>
                    <a
                      href={v.url}
                      className={styles.smallLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {v.url}
                    </a>
                  </div>

                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnVote}
                    aria-label={`Mở ${v.title}`}
                  >
                    Click to vote
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.note}>
            Mẹo: bạn có thể vote tất cả liên kết mỗi 24 giờ để nhận thưởng xịn!
          </p>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
