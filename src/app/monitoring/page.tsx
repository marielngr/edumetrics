import { ladeDaten } from "@/data";
import { Benotung, Fach, Klasse, Schuljahr } from "@/model";
import styles from "./page.module.scss";
import { entferneDuplikate } from "@/data";

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

function TableRow({ klasse, schuljahr, fach, noteneinträge }: TableRowProps) {
  //To do:
}

export default async function Monitoring() {
  const data = await ladeDaten();

  // console.log("Schuljahre: ", data.schuljahre);
  // console.log("klassen: ", data.klassen);
  // console.log("faecher: ", data.faecher);
  // console.log("lehrer: ", data.lehrer);
  // console.log("benotung: ", data.benotung);

  let zeilenIds = data.benotung.map((benotung) => ({
    klasseId: benotung.klasseId,
    fachId: benotung.fachId,
    schuljahrId: benotung.schuljahrId,
  }));

  function sindGleich(
    zeile1: { klasseId: string; fachId: string; schuljahrId: string },
    zeile2: { klasseId: string; fachId: string; schuljahrId: string }
  ): boolean {
    return (
      zeile1.klasseId === zeile2.klasseId &&
      zeile1.fachId === zeile2.fachId &&
      zeile1.schuljahrId === zeile2.schuljahrId
    );
  }
  zeilenIds = entferneDuplikate(zeilenIds, sindGleich);

  //für die Darstellung sortieren
  //zuerst nach Schuljahr, dann nach Klasse, dann nach Fach
  zeilenIds = zeilenIds.sort((a, b) => {
    if (a.schuljahrId < b.schuljahrId) return -1;
    if (a.schuljahrId > b.schuljahrId) return 1;

    if (a.klasseId < b.klasseId) return -1;
    if (a.klasseId > b.klasseId) return 1;

    if (a.fachId < b.fachId) return -1;
    if (a.fachId > b.fachId) return 1;

    return 0;
  });

  const rows = zeilenIds.map((zeile) => {
    const uniqueRowIds = `${zeile.schuljahrId}-${zeile.klasseId}-${zeile.fachId}`;
    return (
      <div className={styles.tableRow} key={uniqueRowIds}>
        <div>{zeile.klasseId}</div>
        <div>{zeile.schuljahrId}</div>
        <div>{zeile.fachId}</div>
      </div>
    );
  });

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
          <div className={styles.tablesheet__Wrapper}>{rows}</div>
        </section>
      </div>
    </>
  );
}
