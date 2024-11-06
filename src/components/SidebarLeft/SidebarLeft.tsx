import styles from "./SidebarLeft.module.scss";
import DropDownMenu, {
  DropDownMenuEintrag,
} from "../DropDownMenu/DropDownMenu";
import { Fach, FachId, Lehrer, LehrerId } from "@/model";
import { useState } from "react";

export type SidebarLeftProps = {
  lehrer: Lehrer[];
  onChangeSelectedLehrer: (id: LehrerId) => void;
  selectedLehrer: LehrerId[];
  faecher: Fach[];
};

export default function SidebarLeft({
  lehrer,
  onChangeSelectedLehrer,
  selectedLehrer,
  faecher,
}: SidebarLeftProps) {
  const [selectedFaecher, setSelectedFaecher] = useState<FachId[]>([]);

  const gefilterteLehrer =
    selectedFaecher.length === 0
      ? lehrer
      : lehrer.filter((l) =>
          // Mind. ein Fach des Lehrers (some) ist in selectedFaecher enthalten
          l.faecherIds.some((f) => selectedFaecher.includes(f))
        );

  const faechereintraege: DropDownMenuEintrag[] = faecher.map((fach) => ({
    id: fach.id,
    label: fach.id,
    selected: selectedFaecher.includes(fach.id),
  }));

  function handleSelectedFach(id: FachId, selected: boolean) {
    console.log("selectedFaecher", selectedFaecher, id, selected);
    setSelectedFaecher(
      selected
        ? [...selectedFaecher, id]
        : selectedFaecher.filter((fachId) => fachId !== id)
    );
  }

  //  Lehrerkürzel alphabetisch sortieren
  const lehrerSortiert = gefilterteLehrer.sort((a, b) =>
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
          eintraege={faechereintraege}
          onSelectedChange={handleSelectedFach}
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
