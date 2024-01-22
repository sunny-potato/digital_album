import { useNavigate } from "react-router-dom";
import s from "../Styles/FindAccount.module.css";
import { useState } from "react";
import TabDefaultContent from "../Components/TabDefaultContent";
import TabNoMatchContent from "../Components/TabNoMatchContent";
import TabConfirmEmail from "../Components/TabConfirmUsername";
import TabConfirmUsername from "../Components/TabConfirmUsername";

function FindAccount() {
  // const navigate = useNavigate();
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
  const [userInputData, setUserInputData] = useState<string>();
  const getUserInput = (userData: string) => {
    setUserInputData(userData);
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
              <TabDefaultContent
                tabDescription={"Please enter email to search your account"}
                // tabInputPlaceholder={"Enter your email address"}
                activeTab={usernameStatus}
                setActiveTabStatus={setUsernameStatus}
                incorrectFormatMessage={"Please enter a valid email address"}
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
                  // setActiveTabStatus={setUsernameStatus}
                  userData={userInputData}
                />
              )}
            {passwordStatus.isActive && passwordStatus.status === "default" && (
              <TabDefaultContent
                tabDescription={
                  "Please enter your username or email to search your account"
                }
                // tabInputPlaceholder={"Enter your username or email address"}
                activeTab={passwordStatus}
                setActiveTabStatus={setPasswordStatus}
                incorrectFormatMessage={"Please enter a valid email address"}
                getUserInput={getUserInput}
              />
            )}
            {passwordStatus.isActive && passwordStatus.status === "noMatch" && (
              <TabNoMatchContent
                tabDescription={
                  "We can't find any account registered with given username or email"
                }
                activeTab={passwordStatus}
                setActiveTabStatus={setPasswordStatus}
              />
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default FindAccount;
