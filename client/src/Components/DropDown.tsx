import { useEffect, useRef, useState } from "react";
import s from "../Styles/DropDown.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckIcon from "@mui/icons-material/Check";
import { DropDown as DropDownProps } from "../Types/Commonness";
import { convertDropDownDataForm } from "../Utils/dropDown";

function DropDown({
  dropDownList,
  setDropDownList,
  dropDownContent,
}: DropDownProps) {
  const [isDropDownClicked, setIsDropDownClicked] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const isItClicked = (currentType: string, currentValue: string) => {
    const convertedCurrentValue = convertDropDownDataForm(
      currentType,
      currentValue
    );
    if (dropDownList.sortBy === convertedCurrentValue) {
      return true;
    }
    if (dropDownList.orderBy === convertedCurrentValue) {
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
      [newType]: convertDropDownDataForm(newType, newName),
    });
  };

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      const currentRef = ref.current?.contains(event.target as Node);
      if (currentRef === undefined) {
        setIsDropDownClicked(false);
      } else {
        setIsDropDownClicked(currentRef);
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);

  return (
    <div ref={ref} className={s.folderListSort}>
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
                <div className={s.dropDownContentName}>{eachContent.name}</div>
                <div
                  style={{
                    visibility:
                      isItClicked(eachContent.type, eachContent.name) &&
                      isDropDownClicked
                        ? "visible"
                        : "hidden",
                  }}
                >
                  <CheckIcon style={{ fontSize: "0.7rem" }} />
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
