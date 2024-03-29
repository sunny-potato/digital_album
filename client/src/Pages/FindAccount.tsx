import { useState } from "react";
import TabNoMatchContent from "../Components/TabNoMatchContent";
import TabConfirmUsername from "../Components/TabUsernameConfirm";
import TabUsernameDefault from "../Components/TabUsernameDefault";
import TabPasswordDefault from "../Components/TabPasswordDefault";
import TabPasswordConfirm from "../Components/TabPasswordConfirm";
import TabPasswordSecurityCode from "../Components/TabPasswordSecurityCode";
import TabPasswordReset from "../Components/TabPasswordReset";
import TabPasswordDone from "../Components/TabPasswordDone";
import { userInput } from "../Types/Commonness";
import s from "../Styles/FindAccount.module.css";

function FindAccount() {
  const [usernameStatus, setUsernameStatus] = useState<{
    name: string;
    isActive: boolean;
    status: string;
  }>({ name: "username", isActive: true, status: "default" });
  const [passwordStatus, setPasswordStatus] = useState<{
    name: string;
    isActive: boolean;
    status: string;
  }>({ name: "password", isActive: false, status: "default" });
  const [userInputData, setUserInputData] = useState<userInput>({
    username: "",
    email: "",
  });
  const getUserInput = ({ username, email }: userInput) => {
    setUserInputData({ username, email });
  };

  return (
    <div className={s.pageContainer}>
      {
        <div className={s.contentContainer}>
          <div className={s.tabLinks}>
            <button
              className={`${s.tabTitle} ${
                usernameStatus.isActive ? s.tabActive : ""
              } `}
              id="username"
              onClick={() => {
                setUsernameStatus({ ...usernameStatus, ["isActive"]: true }),
                  setPasswordStatus({ ...passwordStatus, ["isActive"]: false });
              }}
            >
              Find username
            </button>
            <button
              className={`${s.tabTitle} ${
                passwordStatus.isActive ? s.tabActive : ""
              } `}
              id="password"
              onClick={() => {
                setUsernameStatus({ ...usernameStatus, ["isActive"]: false }),
                  setPasswordStatus({ ...passwordStatus, ["isActive"]: true });
              }}
            >
              Find password
            </button>
          </div>
          <div className={s.tabContent}>
            {usernameStatus.isActive && usernameStatus.status === "default" && (
              <TabUsernameDefault
                activeTab={usernameStatus}
                setActiveTabStatus={setUsernameStatus}
                getUserInput={getUserInput}
              />
            )}
            {usernameStatus.isActive && usernameStatus.status === "noMatch" && (
              <TabNoMatchContent
                tabDescription={
                  "We can't find any username registered with given email"
                }
                activeTab={usernameStatus}
                setActiveTabStatus={setUsernameStatus}
              />
            )}
            {usernameStatus.isActive &&
              usernameStatus.status === "confirmUsername" && (
                <TabConfirmUsername
                  activeTab={usernameStatus}
                  userData={userInputData}
                />
              )}
            {passwordStatus.isActive && passwordStatus.status === "default" && (
              <TabPasswordDefault
                activeTab={passwordStatus}
                setActiveTabStatus={setPasswordStatus}
                getUserInput={getUserInput}
              />
            )}
            {passwordStatus.isActive && passwordStatus.status === "noMatch" && (
              <TabNoMatchContent
                tabDescription={
                  "We can't find any account with given username or email"
                }
                activeTab={passwordStatus}
                setActiveTabStatus={setPasswordStatus}
              />
            )}
            {passwordStatus.isActive &&
              passwordStatus.status === "confirmPassword" && (
                <TabPasswordConfirm
                  activeTab={passwordStatus}
                  setActiveTabStatus={setPasswordStatus}
                  userData={userInputData}
                  getUserInput={getUserInput}
                />
              )}
            {passwordStatus.isActive &&
              passwordStatus.status === "securityCode" && (
                <TabPasswordSecurityCode
                  activeTab={passwordStatus}
                  setActiveTabStatus={setPasswordStatus}
                  userData={userInputData}
                />
              )}
            {passwordStatus.isActive &&
              passwordStatus.status === "resetPassword" && (
                <TabPasswordReset
                  activeTab={passwordStatus}
                  setActiveTabStatus={setPasswordStatus}
                  userData={userInputData}
                />
              )}
            {passwordStatus.isActive &&
              passwordStatus.status === "donePassword" && (
                <TabPasswordDone activeTab={passwordStatus} />
              )}
          </div>
        </div>
      }
    </div>
  );
}

export default FindAccount;
