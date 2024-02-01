import { useEffect, useState } from "react";
import s from "../Styles/TabCommon.module.css";
import { userInput } from "../Types/Commonness";
import { sendEmailVerificationCode } from "../Services/user";

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
  const [isCodeSendingSuccess, setIsCodeSendingSuccess] =
    useState<boolean>(true);

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
      {!isCodeSendingSuccess && (
        <div>
          Sorry, the security code couldn't send due to technical problem.
          Please try it again.
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
          onClick={async () => {
            setIsCodeSendingSuccess(true);
            const isCodeSendt = await sendEmailVerificationCode(userData);
            if (isCodeSendt) {
              setActiveTabStatus({
                ...activeTab,
                ["status"]: "securityCode",
              });
            } else {
              setIsCodeSendingSuccess(false);
            }
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default TabPasswordConfirm;
