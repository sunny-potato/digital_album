import { DropDownList } from "../Types/Commonness";
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
