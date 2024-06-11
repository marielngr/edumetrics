import styles from "./page.module.scss";

export default function UvpS1() {
  console.log(styles);
  console.log("___");
  return (
    <div className={styles.container}>
      <section className={styles.sidebarLeft}>
        <div className={styles.sidebarLeft__content}>hallo</div>
        <div className={styles.sidebarLeft__content}>hallo</div>
      </section>
      <section className={styles.tablesheet}>
        <h2 className={styles.tablesheet__h2}>Überschrift whatever</h2>
        <div className={styles.tablesheet__Wrapper}>
          <div className={styles.tableContent}>hallo </div>
          <div className={styles.tableContent}>hallo</div>
        </div>
      </section>
    </div>
  );
}
