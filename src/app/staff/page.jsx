"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./StaffPage.module.css";
import Cookies from "js-cookie";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SakuraEffect from "@/components/SakuraEffect";

/* ====== DATA ====== */
const staffData = [
  {
    group: "Owner",
    members: [
      {
        name: "TKen",
        role: "Owner",
        avatar: "/img/avatars/max.png",
        joined: "2023-08-01",
        discord: "tken#0001",
        discordLink: "https://discord.com/users/000000000000000001",
        personality: "Quyết đoán, nhiệt huyết và thích tối ưu hiệu năng.",
      },
    ],
  },
  {
    group: "Admin",
    members: [
      {
        name: "Sunday",
        role: "Admin",
        avatar: "/img/avatars/arly.png",
        joined: "2024-02-14",
        discord: "sunday#2024",
        discordLink: "https://discord.com/users/000000000000000002",
        personality: "Điềm tĩnh, kỷ luật, thích tự động hoá.",
      },
      {
        name: "Vịt Ra Đảo",
        role: "Admin",
        avatar: "/img/avatars/arly.png",
        joined: "2024-03-20",
        discord: "vit#0315",
        discordLink: "https://discord.com/users/000000000000000003",
        personality: "Hoà đồng, hỗ trợ nhanh, gu thẩm mỹ tốt.",
      },
    ],
  },
  {
    group: "Staff",
    members: [
      {
        name: "Thanhhdepchai",
        role: "Staff",
        avatar: "/img/avatars/a1.png",
        joined: "2024-04-02",
        discord: "thanh#1010",
        discordLink: "https://discord.com/users/000000000000000010",
        personality: "Vui tính, chịu khó, ham học hỏi.",
      },
      {
        name: "Wein",
        role: "Staff/Tiktoker",
        avatar: "/img/avatars/a2.png",
        joined: "2024-06-10",
        discord: "wein#7777",
        discordLink: "https://discord.com/users/000000000000000011",
        personality: "Năng động, sáng tạo nội dung tốt.",
      },
      {
        name: "Blacktom",
        role: "Staff",
        avatar: "/img/avatars/a2.png",
        joined: "2024-05-12",
        discord: "blacktom#8888",
        discordLink: "https://discord.com/users/000000000000000012",
        personality: "Chắc tay, xử lý tình huống bình tĩnh.",
      },
      {
        name: "giaphuuuu",
        role: "Discord Developer",
        avatar: "/img/avatars/a3.png",
        joined: "2024-02-20",
        discord: "giaphu#0420",
        discordLink: "https://discord.com/users/000000000000000013",
        personality: "Cẩn thận, code gọn gàng, chăm log & monitor.",
      },
      {
        name: "NguyenTuanAnh",
        role: "Staff/Java Developer",
        avatar: "/img/avatars/a2.png",
        joined: "2024-07-03",
        discord: "tuananh#2025",
        discordLink: "https://discord.com/users/000000000000000014",
        personality: "Tập trung, thích tối ưu logic & TPS.",
      },
      {
        name: "Ken Út",
        role: "Staff/Web Developer",
        avatar: "/img/avatars/a2.png",
        joined: "2024-08-18",
        discord: "kenut#6969",
        discordLink: "https://discord.com/users/000000000000000015",
        personality: "Tỉ mỉ UI/UX, thích làm pixel-perfect.",
      },
    ],
  },
];

/* ====== UI ====== */
function StaffCard({ member, onClick }) {
  return (
    <button className={styles.card} onClick={() => onClick(member)}>
      <img className={styles.avatar} src={member.avatar} alt={member.name} />
      <div className={styles.meta}>
        <div className={styles.name}>{member.name}</div>
        <div className={styles.role}>{member.role}</div>
      </div>
    </button>
  );
}

function StaffSection({ group, members, onCardClick }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{group}</h2>
      <div className={styles.grid}>
        {members.map((m, idx) => (
          <StaffCard
            key={`${group}-${m.name}-${idx}`}
            member={m}
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
}

function StaffModal({ member, onClose }) {
  if (!member) return null;

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={onOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Đóng">
          ×
        </button>

        <div className={styles.modalHeader}>
          <img className={styles.modalAvatar} src={member.avatar} alt={member.name} />
          <div>
            <h3 className={styles.modalName}>{member.name}</h3>
            <p className={styles.modalRole}>{member.role}</p>
          </div>
        </div>

        <div className={styles.modalInfo}>
          <p><b>Ngày tham gia:</b> {member.joined}</p>
          <p>
            <b>Discord:</b>{" "}
            <a href={member.discordLink} target="_blank" rel="noopener noreferrer">
              {member.discord}
            </a>
          </p>
          <p><b>Tính cách:</b> {member.personality}</p>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.modalActionBtn} onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
}

/* ====== PAGE ====== */
export default function StaffPage() {
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

  const [selected, setSelected] = useState(null);

  const escHandler = useCallback((e) => {
    if (e.key === "Escape") setSelected(null);
  }, []);
  useEffect(() => {
    if (!selected) return;
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [selected, escHandler]);

  return (
    <div className={styles.page}>
        <Header
          lang={lang}
          setLang={setLang}
          sakura={sakura}
          setSakura={setSakura}
        />
      {/* Header + nền giống các trang khác */}
      <div className="header-hero-bg relative">

        {sakura && <SakuraEffect enabled={sakura} />}
      </div>

      {/* Nội dung: Dùng main co giãn + container chuẩn */}
      <main className={styles.main}>
        <div className={styles.container}>
          {staffData.map((g) => (
            <StaffSection
              key={g.group}
              group={g.group}
              members={g.members}
              onCardClick={setSelected}
            />
          ))}
        </div>
      </main>

      {/* Footer dính đáy */}
      <Footer />

      {/* Modal chi tiết */}
      <StaffModal member={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
