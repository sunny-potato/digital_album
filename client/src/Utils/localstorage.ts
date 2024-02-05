import { DropDownList } from "../Types/Commonness";

export const setLocalStorageData = (
  dataKey: string,
  dataValue: DropDownList
) => {
  return localStorage.setItem(`${dataKey}`, JSON.stringify(dataValue));
};

export const getLocalStorageData = (dataKey: string) => {
  return JSON.parse(localStorage.getItem(`${dataKey}`) as string) as string;
};

export const removeLocalStorageData = (dataKey: string) => {
  return localStorage.removeItem(`${dataKey}`);
};
