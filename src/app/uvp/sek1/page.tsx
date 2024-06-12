import styles from "./page.module.scss";

export default function VerteilungsplanS1() {
  return (
    <div className={styles.container}>
      <section className={styles.sidebarLeft}>
        <div className={styles.sidebarLeft__content}>hallo</div>
        <div className={styles.sidebarLeft__content}>hallo</div>
      </section>
      <section className={styles.tablesheet}>
        <h2 className={styles.tablesheet__headline}>Überschrift whatever</h2>
        <div className={styles.tablesheet__wrapper}>
          <div className={styles.tableContent}>hallo </div>
          <div className={styles.tableContent}>hallo</div>
        </div>
      </section>
    </div>
  );
}
