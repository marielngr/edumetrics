import React from "react";
import styles from "./page.module.scss";

export default function UvpS1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className={styles.h1}>Unterrichtsverteilungsplanung Sek I</h1>
      {children}
      <nav>Hier können Steuerelemente hin</nav>
    </>
  );
}
