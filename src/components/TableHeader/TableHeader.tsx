import styles from "./TableHeader.module.css";
import {
  Fach,
  Klasse,
  KlasseId,
  Schuljahr,
  FachId,
  SchuljahrId,
} from "@/model";
import DropDownMenu, {
  DropDownMenuEintrag,
} from "@/components/DropDownMenu/DropDownMenu";

type TableHeaderProps = {
  klassen: Klasse[];
  schuljahre: Schuljahr[];
  jahrgaenge: number[];
  faecher: Fach[];
  selectedKlassen: KlasseId[];
  onSelectedKlassenChange?: (id: KlasseId, selected: boolean) => void;
  selectedFaecher: FachId[];
  onSelectedFaecherChange?: (id: FachId, selected: boolean) => void;
  selectedSchuljahre: SchuljahrId[];
  onSelectedSchuljahrChange?: (id: SchuljahrId, selected: boolean) => void;
};

export default function TableHeader({
  klassen,
  schuljahre,
  jahrgaenge,
  faecher,
  selectedKlassen,
  onSelectedKlassenChange,
  selectedFaecher,
  onSelectedFaecherChange,
  selectedSchuljahre,
  onSelectedSchuljahrChange,
}: TableHeaderProps) {
  const klasseneintraege: DropDownMenuEintrag[] = klassen.map((klasse) => ({
    id: klasse.id,
    label: klasse.id,
    selected: selectedKlassen.includes(klasse.id),
  }));

  const schuljahreintraege: DropDownMenuEintrag[] = schuljahre.map(
    (schuljahr) => ({
      id: schuljahr.id,
      label: schuljahr.id,
      selected: selectedSchuljahre.includes(schuljahr.id),
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
    selected: selectedFaecher.includes(fach.id),
  }));

  function handleSelectedKlasse(id: string, selected: boolean) {
    if (onSelectedKlassenChange) {
      onSelectedKlassenChange(id, selected);
    }
  }

  function handleSelectedFach(id: string, selected: boolean) {
    if (onSelectedFaecherChange) {
      onSelectedFaecherChange(id, selected);
    }
  }

  function handleSelectedSchuljahr(id: string, selected: boolean) {
    if (onSelectedSchuljahrChange) {
      onSelectedSchuljahrChange(id, selected);
    }
  }

  return (
    <div className={styles.tableHeader}>
      <div className={styles.tableCell}>
        <p>Zeile</p>
      </div>
      <div className={styles.tableCell}>
        <p>Klassen-ID</p>
        <DropDownMenu
          eintraege={klasseneintraege}
          onSelectedChange={handleSelectedKlasse}
        />
      </div>
      <div className={styles.tableCell}>
        <p>Schuljahr</p>
        <DropDownMenu
          eintraege={schuljahreintraege}
          onSelectedChange={handleSelectedSchuljahr}
        />
      </div>
      <div className={styles.tableCell}>
        <p>Klasse</p>
        <DropDownMenu eintraege={jahrgangseintraege} />
      </div>
      <div className={styles.tableCell}>
        <p>Fach</p>
        <DropDownMenu
          eintraege={facheintraege}
          onSelectedChange={handleSelectedFach}
        />
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
