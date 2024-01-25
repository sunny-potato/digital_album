import { useEffect, useState } from "react";
import s from "../Styles/TabDefaultContent.module.css";
import { getUsernameWithEmail } from "../Services/user";
import { useNavigate } from "react-router-dom";
import { userInput } from "../Types/Commonness";

type TabPasswordConfirm = {
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
  userData: userInput;
  getUserInput: (value: userInput) => void;
};

function TabPasswordConfirm({
  activeTab,
  setActiveTabStatus,
  userData,
  getUserInput,
}: TabPasswordConfirm) {
  return (
    <div
      className={`${s.tabPassword}  ${
        activeTab.isActive ? "" : s.tabInActive
      } `}
    >
      {userData.username && userData.email && (
        <div>
          We will send a security code to :<div>{userData.email}</div>
        </div>
      )}
      <div className={s.buttonContainer}>
        <button
          className={s.cancelButton}
          onClick={() => {
            getUserInput({ username: "", email: "" });
            setActiveTabStatus({
              ...activeTab,
              ["status"]: "default",
            });
          }}
        >
          Cancel
        </button>
        <button
          className={s.searchButton}
          onClick={() =>
            setActiveTabStatus({
              ...activeTab,
              ["status"]: "securityCode",
            })
          }
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default TabPasswordConfirm;
