import styles from "./SidebarLeft.module.scss";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

export default function SidebarLeft() {
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
        <div className={styles.sidebarLeft__content}>Kne</div>
        <div className={styles.sidebarLeft__content}>Fu</div>
      </div>
    </section>
  );
}
