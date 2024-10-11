import styles from "./SidebarLeft.module.scss";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { Lehrer, LehrerId } from "@/model";

export type SidebarLeftProps = {
  lehrer: Lehrer[];
  selectedLehrer: LehrerId[];
  onChangeSelectedLehrer: (id: LehrerId) => void;
};

export default function SidebarLeft({
  lehrer,
  selectedLehrer,
  onChangeSelectedLehrer,
}: SidebarLeftProps) {
  // Lehrer alphabetisch sortieren
  const lehrerSortiert = lehrer.sort((a, b) =>
    a.kuerzel.localeCompare(b.kuerzel, "de", { sensitivity: "base" })
  );

  function handleLehrerClick(
    event: React.MouseEvent<HTMLButtonElement>,
    id: LehrerId
  ) {
    onChangeSelectedLehrer(id);

    const button = event.currentTarget;
    // Toggle Hintergrundfarbe
    if (button.style.backgroundColor === "orange") {
      button.style.backgroundColor = "";
    } else {
      button.style.backgroundColor = "orange";
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
              className={styles.sidebarLeft__content}
              onClick={(event) => handleLehrerClick(event, lehrer.id)}
            >
              {lehrer.kuerzel}
            </button>
          ))}
      </div>
    </section>
  );
}
