import { useState } from "react";
import s from "../Styles/TabCommon.module.css";
import { sendEmailVerificationCode } from "../Services/user";
import { TabPasswordConfirm as TabPasswordConfirmProps } from "../Services/tab";

function TabPasswordConfirm({
  activeTab,
  setActiveTabStatus,
  userData,
  getUserInput,
}: TabPasswordConfirmProps) {
  const [isCodeSendingSuccess, setIsCodeSendingSuccess] =
    useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>();

  return (
    <div
      className={`${s.tabPassword}  ${
        activeTab.isActive ? "" : s.tabInActive
      } `}
    >
      {userData.username && userData.email && isCodeSendingSuccess && (
        <div>
          We will send a security code to :<div>{userData.email}</div>
        </div>
      )}
      {!isCodeSendingSuccess && (
        <div>
          Sorry, the security code couldn't send due to technical problem.
          <div>Please try it again.</div>
        </div>
      )}
      <div className={s.buttonContainer}>
        <button
          className={s.cancelButton}
          disabled={isLoading ? true : false}
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
          disabled={isLoading ? true : false}
          onClick={async () => {
            setIsLoading(true);
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
            setIsLoading(false);
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default TabPasswordConfirm;
