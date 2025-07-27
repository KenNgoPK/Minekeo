'use client';
import Link from 'next/link';
import styles from './BlogSection.module.css';

export default function BlogSection() {
  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogList}>
        <Link href="/blog/pixelmon-mod" className={styles.blogCardLink}>
          <div className={styles.blogCard}>
            <div
              className={styles.coverImg}
              style={{ backgroundImage: `url(/img/minekeoLogo.png)` }}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.title}>Tải Minecraft Pixelmon Mod Cho PE và PC Mới Nhất</h3>
              <p className={styles.desc}>
                Pixelmon Mod for Minecraft là 1 bản mod khá đặc biệt và được thiết kế riêng cho người chơi yêu thích cả siêu phẩm Pokemon GO nói riêng và dòng game, phim Pokemon nói chung...
              </p>
              <div className={styles.cardFooter}>
                <div className={styles.author}>
                  <img src="/img/minekeoLogo.png" alt="" />
                  <span>Ken Út</span>
                  <span className={styles.dot}>•</span>
                  <span>Jul 28th, 2025</span>
                </div>
                <span className={styles.readTime}>2 phút đọc</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
