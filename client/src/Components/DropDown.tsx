import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CheckIcon from "@mui/icons-material/Check";
import { DropDownContent, DropDownList } from "../Types/MyAlbum";
import s from "../Styles/DropDown.module.css";

type DropDownProps = {
  dropDownList: DropDownList;
  setDropDownList: (value: DropDownList) => void;
  dropDownContent: Record<string, string>[];
};
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

  return (
    <div
      className={s.folderListSort}
      onClick={() =>
        isDropDownClicked
          ? setIsDropDownClicked(false)
          : setIsDropDownClicked(true)
      }
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
        {dropDownContent.map((eachContent: Record<string, string>) => {
          return (
            <li
              onClick={() =>
                setDropDownList({
                  ...dropDownList,
                  [eachContent.type]: eachContent.name,
                })
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
        })}
      </div>
    </div>
  );
}

export default DropDown;
