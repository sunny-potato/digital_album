import { useEffect, useRef, useState } from "react";
import s from "../Styles/DropDown.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckIcon from "@mui/icons-material/Check";
import { DropDownProps } from "../Types/Commonness";

function DropDown({
  dropDownList,
  setDropDownList,
  dropDownContent,
}: DropDownProps) {
  const [isDropDownClicked, setIsDropDownClicked] = useState<boolean>(false);

  const isItClicked = (currentValue: string) => {
    if (dropDownList.sortBy === currentValue) {
      return true;
    }
    if (dropDownList.orderBy === currentValue) {
      return true;
    }
    return false;
  };

  const updateDropDownList = (newType: string, newName: string) => {
    if (
      (newType === "sortBy" && newName === dropDownList.sortBy) ||
      (newType === "orderBy" && newName === dropDownList.orderBy)
    ) {
      return;
    }
    setDropDownList({
      ...dropDownList,
      [newType]: newName,
    });
  };

  return (
    <div
      className={s.folderListSort}
      onClick={() => {
        isDropDownClicked
          ? setIsDropDownClicked(false)
          : setIsDropDownClicked(true);
      }}
    >
      <div className={s.sortText}>Sort by</div>
      <ExpandMoreIcon
        fontSize="small"
        className={s.expandIcon}
        style={{ display: isDropDownClicked ? "none" : "block" }}
      />
      <ExpandLessIcon
        fontSize="small"
        className={s.expandIcon}
        style={{ display: isDropDownClicked ? "block" : "none" }}
      />
      <div
        className={s.sortByList}
        style={{ visibility: isDropDownClicked ? "visible" : "hidden" }}
      >
        {dropDownContent.map(
          (eachContent: Record<string, string>, index: number) => {
            return (
              <li
                key={index}
                onClick={() =>
                  updateDropDownList(eachContent.type, eachContent.name)
                }
              >
                {eachContent.name}
                <div
                  className={s.checkIconBox}
                  style={{
                    visibility:
                      isItClicked(eachContent.name) && isDropDownClicked
                        ? "visible"
                        : "hidden",
                  }}
                >
                  <CheckIcon
                    className={s.checkIcon}
                    style={{ fontSize: "0.7rem" }}
                  />
                </div>
              </li>
            );
          }
        )}
      </div>
    </div>
  );
}

export default DropDown;