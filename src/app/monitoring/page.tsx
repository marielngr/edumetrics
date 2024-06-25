import { ladeDaten } from "@/data";
import { Benotung, Fach, Klasse, Schuljahr } from "@/model";
import styles from "./page.module.scss";

function TableHeader() {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.tableHeader__item}>
        <p>Klassen-ID</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>Schuljahr</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>Klasse</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>Fach</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>Fachlehrer</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>KA 1.1</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>KA 1.2</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>KA 1.3</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>KA 2.1</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>KA 2.2</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>KA 2.3</p>
      </div>
    </div>
  );
}

type TableRowProps = {
  klasse: Klasse;
  schuljahr: Schuljahr;
  fach: Fach;
  noteneinträge: Benotung[];
};

export default async function Monitoring() {
  const data = await ladeDaten();

  // console.log("Schuljahre: ", data.schuljahre);
  // console.log("klassen: ", data.klassen);
  // console.log("faecher: ", data.faecher);
  // console.log("lehrer: ", data.lehrer);
  console.log("benotung: ", data.benotung);

  return (
    <>
      <div className={styles.container}>
        <section className={styles.sidebarLeft}>
          <div className={styles.sidebarLeft__content}>hallo</div>
          <div className={styles.sidebarLeft__content}>hallo</div>
        </section>
        <section className={styles.tablesheet}>
          <h2 className={styles.tablesheet__headline}>Überschrift whatever</h2>
          <div className={styles.tablesheet__Wrapper}>
            <TableHeader />
          </div>
        </section>
      </div>
    </>
  );
}
