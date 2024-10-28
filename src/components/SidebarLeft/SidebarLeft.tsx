import styles from "./SidebarLeft.module.scss";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { Lehrer, LehrerId } from "@/model";

export type SidebarLeftProps = {
  lehrer: Lehrer[];
  onChangeSelectedLehrer: (id: LehrerId) => void;
  selectedLehrer: LehrerId[];
};

export default function SidebarLeft({
  lehrer,
  onChangeSelectedLehrer,
  selectedLehrer,
}: SidebarLeftProps) {
  // Lehrer alphabetisch sortieren
  const lehrerSortiert = lehrer.sort((a, b) =>
    a.kuerzel.localeCompare(b.kuerzel, "de", { sensitivity: "base" })
  );

  function handleLehrerClick(id: LehrerId) {
    onChangeSelectedLehrer(id);
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
          eintraege={[
            { id: "M", label: "M", selected: false },
            { id: "D", label: "D", selected: false },
          ]}
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
