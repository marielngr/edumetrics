"use client";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import styles from "./DropDownMenu.module.css";
import { useState } from "react";

type DropDownMenu = {
  eintraege: DropDownMenuEintrag[];
};

export type DropDownMenuEintrag = {
  id: string;
  label: string;
  selected: boolean;
};

export default function DropDownMenu({ eintraege }: DropDownMenu) {
  const [showMenu, setShowMenu] = useState(true);

  function handleClick() {
    setShowMenu(!showMenu);
  }

  return (
    <div className={styles.DropDownButtonWrapper}>
      <button
        type="button"
        className={styles.DropDownButton}
        onClick={handleClick}
      >
        <IoIosArrowDropdownCircle />
      </button>
      {showMenu &&
        eintraege.map((eintrag) => {
          return (
            <div key={eintrag.id} className={styles.DropDownMenu}>
              <label htmlFor={eintrag.id}>
                <input
                  type="checkbox"
                  id={eintrag.id}
                  name={eintrag.id}
                  defaultChecked={eintrag.selected}
                />
                {eintrag.label}
              </label>
            </div>
          );
        })}
    </div>
  );
}
