import { E164Number } from "libphonenumber-js/min";

export type PopupMessage = {
  isRequirementFulfilled: boolean;
  setIsRequirementFulfilled: (value: boolean) => void;
  popupMessage: string;
  buttonMessage: string;
};

export type DropDownList = {
  sortBy: string;
  orderBy: string;
};

export type DropDown = {
  dropDownList: DropDownList;
  setDropDownList: (value: DropDownList) => void;
  dropDownContent: Record<string, string>[];
};

export type userInput = {
  username: string;
  email: string;
};

export type ProfileInfo = {
  id: number | undefined;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  telephon: E164Number;
  address: string;
};
