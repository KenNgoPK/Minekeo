'use client';
import Link from 'next/link';
import styles from './BlogSection.module.css';

const blogData = {
  vi: {
    title: "Lời giới thiệu về MinekeoVN",
    desc: "MinekeoVN là một máy chủ Minecraft Việt Nam với nhiều tính năng hấp dẫn, bao gồm chế độ KitKat, Sugus, và nhiều hoạt động thú vị khác...",
    author: "Ken Út",
    date: "28/07/2025",
    readTime: "2 phút đọc",
    link: "/blog/pixelmon-mod"
  },
  en: {
    title: "Introduction to MinekeoVN",
    desc: "MinekeoVN is a Vietnamese Minecraft server with many attractive features, including KitKat mode, Sugus, and many other interesting activities...",
    author: "Ken Ut",
    date: "Jul 28th, 2025",
    readTime: "2 min read",
    link: "/blog/pixelmon-mod"
  }
};

export default function BlogSection({ lang = "vi" }) {
  const post = blogData[lang] || blogData["vi"];

  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogList}>
        <Link href={post.link} className={styles.blogCardLink}>
          <div className={styles.blogCard}>
            <div
              className={styles.coverImg}
              style={{ backgroundImage: `url(/img/minekeoLogo.png)` }}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.desc}>{post.desc}</p>
              <div className={styles.cardFooter}>
                <div className={styles.author}>
                  <img src="/img/minekeoLogo.png" alt="" />
                  <span>{post.author}</span>
                  <span className={styles.dot}>•</span>
                  <span>{post.date}</span>
                </div>
                <span className={styles.readTime}>{post.readTime}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
