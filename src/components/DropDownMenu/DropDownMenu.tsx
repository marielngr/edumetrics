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

  console.log("die eintraege sind", eintraege, showMenu);

  return (
    <div className={styles.DropDownButtonWrapper}>
      <button
        type="button"
        className={styles.DropDownButton}
        onClick={handleClick}
      >
        <IoIosArrowDropdownCircle />
      </button>
      {showMenu && (
        <div className={styles.DropDownMenu}>
          {eintraege.map((eintrag, index) => {
            console.log(eintrag, index);
            return (
              <div key={eintrag.id}>
                <label htmlFor={eintrag.id}>
                  <input
                    type="checkbox"
                    id={eintrag.id}
                    name={eintrag.id}
                    defaultChecked={eintrag.selected}
                  />
                  {eintrag.label}sfsdfsd
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
