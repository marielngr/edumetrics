import styles from "./TableHeader.module.css";
import { Fach, Klasse, Schuljahr } from "@/model";
import DropDownMenu, {
  DropDownMenuEintrag,
} from "@/components/DropDownMenu/DropDownMenu";

type TableHeaderProps = {
  klassen: Klasse[];
  schuljahre: Schuljahr[];
  jahrgaenge: number[];
  faecher: Fach[];
};

export default function TableHeader({
  klassen,
  schuljahre,
  jahrgaenge,
  faecher,
}: TableHeaderProps) {
  const klasseneintraege: DropDownMenuEintrag[] = klassen.map((klasse) => ({
    id: klasse.id,
    label: klasse.id,
    selected: false,
  }));

  const schuljahreintraege: DropDownMenuEintrag[] = schuljahre.map(
    (schuljahr) => ({
      id: schuljahr.id,
      label: schuljahr.id,
      selected: false,
    })
  );

  const jahrgangseintraege: DropDownMenuEintrag[] = jahrgaenge.map(
    (jahrgang) => ({
      id: jahrgang.toString(),
      label: jahrgang.toString(),
      selected: false,
    })
  );

  const facheintraege: DropDownMenuEintrag[] = faecher.map((fach) => ({
    id: fach.id,
    label: fach.id,
    selected: false,
  }));

  return (
    <div className={styles.tableHeader}>
      <div className={styles.tableCell}>
        <p>Zeile</p>
      </div>
      <div className={styles.tableCell}>
        <p>Klassen-ID</p>
        <DropDownMenu eintraege={klasseneintraege} />
      </div>
      <div className={styles.tableCell}>
        <p>Schuljahr</p>
        <DropDownMenu eintraege={schuljahreintraege} />
      </div>
      <div className={styles.tableCell}>
        <p>Klasse</p>
        <DropDownMenu eintraege={jahrgangseintraege} />
      </div>
      <div className={styles.tableCell}>
        <p>Fach</p>
        <DropDownMenu eintraege={facheintraege} />
      </div>
      <div className={styles.tableCell}>
        <p>KA 1.1</p>
      </div>
      <div className={styles.tableCell}>
        <p>KA 1.2</p>
      </div>
      <div className={styles.tableCell}>
        <p>KA 1.3</p>
      </div>
      <div className={styles.tableCell}>
        <p>KA 2.1</p>
      </div>
      <div className={styles.tableCell}>
        <p>KA 2.2</p>
      </div>
      <div className={styles.tableCell}>
        <p>KA 2.3</p>
      </div>
      <div className={styles.tableCell}>
        <p>Ø 1.HJ</p>
      </div>
      <div className={styles.tableCell}>
        <p>Ø 2.HJ</p>
      </div>
    </div>
  );
}
