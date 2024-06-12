import styles from "./page.module.scss";
import { klassen } from "@/initial_data";
import { Klasse } from "@/model";

type TableHeaderProps = {
  klassen: Klasse[];
};

function TableHeader({ klassen }: TableHeaderProps) {
  //für jede Klasse ein div (Spalte) erstellen und darin den Namen anzeigen
  const liste = klassen.map((klasse) => {
    return (
      <div key={klasse.id} className={styles.tableContent}>
        {klasse.name}
      </div>
    );
  });

  return <h3 className={styles.tableContent}>{liste}</h3>;
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
          <div className={styles.tableContent}>hallo </div>
          <div className={styles.tableContent}>hallo</div>
        </div>
      </section>
    </div>
  );
}
