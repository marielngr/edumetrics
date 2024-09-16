import React from "react";
import styles from "./page.module.scss";

export default function MonitoringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className={styles.ueberschrift}>Monitoring Sek I</h1>
      {children}
    </>
  );
}
