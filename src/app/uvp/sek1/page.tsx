import styles from "./page.module.scss";
import { klassen } from "@/initial_data";
import { Klasse } from "@/model";

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
          <div className={styles.tableContentRow}>
            <div className={styles.tableContentRow__item}>hallo</div>
            <div className={styles.tableContentRow__item}>hallo</div>
          </div>
          <div className={styles.tableContentRow}>
            <div className={styles.tableContentRow__item}>hallo</div>
          </div>
        </div>
      </section>
    </div>
  );
}
