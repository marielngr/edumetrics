"use client";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import styles from "./DropDownMenu.module.css";
import { useState } from "react";

export type DropDownMenuProps = {
  eintraege: DropDownMenuEintrag[];
};

export type DropDownMenuEintrag = {
  id: string;
  label: string;
  selected: boolean;
};

export default function DropDownMenu({ eintraege }: DropDownMenuProps) {
  const [showMenu, setShowMenu] = useState(true);

  function handleClick() {
    setShowMenu(!showMenu);
  }

  return (
    <div className={styles.DropDownWrapper}>
      <button
        type="button"
        className={styles.DropDownButton}
        onClick={handleClick}
      >
        <IoIosArrowDropdownCircle />
      </button>
      {showMenu && (
        <div className={styles.DropDownMenu}>
          {eintraege.map((eintrag) => {
            return (
              <div key={eintrag.id}>
                <label
                  htmlFor={eintrag.id}
                  className={styles.DropDownMenu_item}
                >
                  <input
                    type="checkbox"
                    id={eintrag.id}
                    name={eintrag.id}
                    defaultChecked={eintrag.selected}
                    className={styles.DropDownMenu_itemInput}
                  />
                  {eintrag.label}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
