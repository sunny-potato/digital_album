import { useEffect, useRef } from "react";
import { getLocalStorageData } from "./localstorage";

export const dropDownContent = [
  { type: "sortBy", name: "Date" },
  { type: "sortBy", name: "Name" },
  { type: "sortBy", name: "Size" },
  { type: "orderBy", name: "A-Z" },
  { type: "orderBy", name: "Z-A" },
];

export const convertDropDownDataForm = (dataType: string, dataName: string) => {
  let newDataName;
  if (dataType === "sortBy") {
    newDataName = dataName.toLocaleLowerCase();
  } else {
    if (dataName === "A-Z") {
      newDataName = "asc";
    } else {
      newDataName = "desc";
    }
  }
  return newDataName;
};

export const getDropDownDefaultValue = (dropDownListName: string) => {
  let sortValue = getLocalStorageData(`${dropDownListName}`);
  if (!sortValue) {
    const defaultValue = { sortBy: "date", orderBy: "asc" };
    sortValue = defaultValue;
  }
  return sortValue;
};

export const detectClickOutsideDropDwon = (setIsItDropDown: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const isItDropDown = ref.current?.contains(event.target as Node);
      if (isItDropDown === undefined || !isItDropDown) {
        setIsItDropDown(false);
      } else {
        setIsItDropDown(true);
      }
    };
    document.addEventListener("click", clickHandler);
  }, []);
  return ref;
};
