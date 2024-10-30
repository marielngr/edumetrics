import styles from "./SidebarLeft.module.scss";
import DropDownMenu, {
  DropDownMenuEintrag,
} from "../DropDownMenu/DropDownMenu";
import { Fach, FachId, Lehrer, LehrerId } from "@/model";

export type SidebarLeftProps = {
  lehrer: Lehrer[];
  onChangeSelectedLehrer: (id: LehrerId) => void;
  selectedLehrer: LehrerId[];
  faecher: Fach[];
  selectedFaecherLehrerfilter: FachId[];
  onChangeSelectedFaecherLehrerfilter?: (id: FachId, selected: boolean) => void;
};

export default function SidebarLeft({
  lehrer,
  onChangeSelectedLehrer,
  selectedLehrer,
  faecher,
  selectedFaecherLehrerfilter,
  onChangeSelectedFaecherLehrerfilter,
}: SidebarLeftProps) {
  // angezeigte Lehrer alphabetisch sortieren
  const lehrerSortiert = lehrer.sort((a, b) =>
    a.kuerzel.localeCompare(b.kuerzel, "de", { sensitivity: "base" })
  );

  function handleLehrerClick(id: LehrerId) {
    onChangeSelectedLehrer(id);
  }

  const faechereintraege: DropDownMenuEintrag[] = faecher.map((fach) => ({
    id: fach.id,
    label: fach.id,
    selected: selectedFaecherLehrerfilter.includes(fach.id),
  }));

  function handleSelectedFaecherLehrerfilter(id: FachId, selected: boolean) {
    if (onChangeSelectedFaecherLehrerfilter) {
      onChangeSelectedFaecherLehrerfilter(id, selected);
    }
  }

  return (
    <section className={styles.sidebarLeft}>
      <label
        htmlFor="Lehrerkuerzel"
        className={styles.sidebarLeft__labelSearchBar}
      >
        Lehrerkürzel
        <input
          type="text"
          id="Lehrerkuerzel"
          placeholder="Suche..."
          className={styles.sidebarLeft__searchBar}
        />
      </label>
      <div className={styles.sidebarLeft__filterContainer}>
        <p className={styles.sidebarLeft__filterContainerText}>Fachfilter</p>
        <DropDownMenu
          eintraege={faechereintraege}
          onSelectedChange={handleSelectedFaecherLehrerfilter}
        ></DropDownMenu>
      </div>

      <div className={styles.sidebarLeft__lehrerContainer}>
        {lehrer &&
          lehrerSortiert.map((lehrer) => (
            <button
              key={lehrer.id}
              className={
                styles.sidebarLeft__content +
                " " +
                (selectedLehrer.includes(lehrer.id)
                  ? styles["sidebarLeft__content--selected"]
                  : "")
              }
              onClick={() => handleLehrerClick(lehrer.id)}
            >
              {lehrer.kuerzel}
            </button>
          ))}
      </div>
    </section>
  );
}
