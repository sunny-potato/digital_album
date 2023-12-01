export type PopupMessage = {
  isRequirementFulfilled: boolean;
  setIsRequirementFulfilled: (value: boolean) => void;
  popupMessage: string;
  buttonMessage: string;
};
