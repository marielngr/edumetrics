import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <p className={styles.description}>EduMetrics - Unterrichtsmonitoring</p>
      </div>
    </main>
  );
}
