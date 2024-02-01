import { userInput } from "../Types/Commonness";

export type TabUsernameDefault = {
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
  getUserInput: (value: userInput) => void;
};

export type TabUsernameConfirm = {
  activeTab: { name: string; isActive: boolean; status: string };
  userData: userInput;
};

export type TabNoMatchContent = {
  tabDescription: string;
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
};

export type TabPasswordDefault = {
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
  getUserInput: (value: userInput) => void;
};

export type TabPasswordConfirm = {
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
  userData: userInput;
  getUserInput: (value: userInput) => void;
};

export type TabPasswordSecurityCode = {
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
  userData: userInput;
};

export type TabPasswordReset = {
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
  userData: userInput;
};

export type TabPasswordDone = {
  activeTab: { name: string; isActive: boolean; status: string };
};
