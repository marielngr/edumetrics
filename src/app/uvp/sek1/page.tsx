import styles from "./page.module.scss";
import { klassen, faecher, lehrerListe } from "@/initial_data";
import { Klasse, Fach, FachId, Lehrer } from "@/model";

type TableHeaderProps = {
  klassen: Klasse[];
};

function TableHeader({ klassen }: TableHeaderProps) {
  const klassenliste = klassen.map((klasse) => {
    return (
      <div key={klasse.id} className={styles.tableHeader__item}>
        {klasse.name}
      </div>
    );
  });

  return (
    <div className={styles.tableHeader}>
      <div className={styles.tableHeader__item_first}>
        <p>Klassen / Fächer</p>
      </div>
      {klassenliste}
    </div>
  );
}

type TableRowProps = {
  faecher: Fach[];
  lehrer: Lehrer[];
};

function TableRow({ faecher, lehrer }: TableRowProps) {
  //To do:
  //map über faecher und return für jedes Fach eine Reihe mit folgendem Aufbau:
  //Containerdiv mit Klasse tableContentRow
  //Innerhalb des Containers:
  //- ein div mit Namen des Faches,
  //für jede weitere Klassenspalte den Lehrernamen

  // function findeFachlehrer (fachId: string) => {

  const fachliste = faecher.map((fach) => {
    return (
      <div key={fach.id} className={styles.tableContentRow}>
        <div className={styles.tableContentRow__item_first}>{fach.name}</div>
        <div className={styles.tableContentRow__item}>Lehrername</div>
      </div>
    );
  });

  return <div className={styles.tableContentRow__Container}>{fachliste}</div>;
}

export default function VerteilungsplanS1() {
  console.log("klassen:", klassen);

  return (
    <div className={styles.container}>
      <section className={styles.sidebarLeft}>
        <div className={styles.sidebarLeft__content}>hallo</div>
        <div className={styles.sidebarLeft__content}>hallo</div>
      </section>
      <section className={styles.tablesheet}>
        <h2 className={styles.tablesheet__h2}>Überschrift whatever</h2>
        <div className={styles.tablesheet__Wrapper}>
          <TableHeader klassen={klassen} />
          <TableRow faecher={faecher} lehrer={lehrerListe} />
        </div>
      </section>
    </div>
  );
}
