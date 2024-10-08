import styles from "./SidebarLeft.module.scss";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { Lehrer, LehrerId } from "@/model";

export type SidebarLeftProps = {
  lehrer: Lehrer[];
  selectedLehrer: LehrerId[];
};

export default function SidebarLeft({ lehrer }: SidebarLeftProps) {
  //in Monitoring Lehrer filtern

  //1. Darstellung: alle Lehrer in der Sidebar unterhalb des Fachfilter DropDown anzeigen -> map pro Lehrer button returnen
  // 2. Darstellung: Lehrerbutton -> onClick -> LehrerId als Filter für Liste setzen
  //3. onChangeSelectedLehrer hochbubblen mit State in MonitoringTable
  //4. buttons sichtbar machen, welche ausgewählt sind -> Farbwechsel

  console.log(lehrer);
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
          lehrer.map((lehrer) => (
            <button key={lehrer.id} className={styles.sidebarLeft__content}>
              {lehrer.kuerzel}
            </button>
          ))}
      </div>
    </section>
  );
}
