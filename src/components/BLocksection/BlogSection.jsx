// BlogSection.jsx
'use client';
import Link from 'next/link';
import styles from './BlogSection.module.css';

const blogData = {
  vi: [
    {
      blogId: 1,
      title: "Lời giới thiệu về MinekeoVN",
      desc: "MinekeoVN là một máy chủ Minecraft Việt Nam với nhiều tính năng hấp dẫn...",
      author: "Ken Út",
      date: "28/07/2025",
      readTime: "2 phút đọc",
      link: "/blog/pixelmon-mod"
    },
    {
      blogId: 2,
      title: "Hướng dẫn tham gia server",
      desc: "Bài viết chi tiết cách tải Minecraft và tham gia server MinekeoVN...",
      author: "Admin",
      date: "01/08/2025",
      readTime: "3 phút đọc",
      link: "/blog/join-guide"
    }

  ],
  en: [
    {
      blogId: 1,
      title: "Introduction to MinekeoVN",
      desc: "MinekeoVN is a Vietnamese Minecraft server with many attractive features...",
      author: "Ken Ut",
      date: "Jul 28th, 2025",
      readTime: "2 min read",
      link: "/blog/pixelmon-mod"
    },
    {
      blogId: 2,
      title: "How to join the server",
      desc: "Step-by-step guide to download Minecraft and join MinekeoVN server...",
      author: "Admin",
      date: "Aug 1st, 2025",
      readTime: "3 min read",
      link: "/blog/join-guide"
    }
  ]
};

export default function BlogSection({ lang = "vi" }) {
  const posts = blogData[lang] || blogData["vi"];

  return (
    <section className={styles.blogContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <span className="lang-en">Blog</span>
          <span className="lang-vi">Blog</span>
        </h2>
        <span className={styles.sectionUnderline} />
      </div>

      <div className={styles.blogList}>
        {posts.map((post) => (
          <Link key={post.blogId} href={post.link} className={styles.blogCardLink}>
            <div className={styles.blogCard}>
              <div className={styles.coverImg}>
                <img src="/img/minekeoLogo.png" alt={post.title} />
              </div>
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
        ))}
      </div>
    </section>
  );
}
