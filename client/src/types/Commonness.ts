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
