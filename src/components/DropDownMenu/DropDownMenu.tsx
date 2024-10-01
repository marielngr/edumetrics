"use client";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import styles from "./DropDownMenu.module.css";
import { useState } from "react";

export type DropDownMenuProps = {
  eintraege: DropDownMenuEintrag[];
  onSelectedChange?: (id: string, selected: boolean) => void;
};

export type DropDownMenuEintrag = {
  id: string;
  label: string;
  selected: boolean;
};

export default function DropDownMenu({
  eintraege,
  onSelectedChange,
}: DropDownMenuProps) {
  const [showMenu, setShowMenu] = useState(false);

  function handleClick() {
    setShowMenu(!showMenu);
  }

  function handleOnChange(id: string, selected: boolean) {
    if (onSelectedChange) {
      onSelectedChange(id, selected);
    }
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
                    onChange={(e) =>
                      handleOnChange(eintrag.id, e.target.checked)
                    }
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
