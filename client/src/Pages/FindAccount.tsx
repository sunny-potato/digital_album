import { useNavigate } from "react-router-dom";
import s from "../Styles/FindAccount.module.css";
import { useState } from "react";
import TabNoMatchContent from "../Components/TabNoMatchContent";
import TabConfirmEmail from "../Components/TabUsernameConfirm";
import TabConfirmUsername from "../Components/TabUsernameConfirm";
import TabUsernameDefault from "../Components/TabUsernameDefault";
import TabPasswordDefault from "../Components/TabPasswordDefault";
import TabPasswordConfirm from "../Components/TabPasswordConfirm";
import { userInput } from "../Types/Commonness";

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
  const [userInputData, setUserInputData] = useState<userInput>({
    username: "",
    email: "",
  });
  const getUserInput = ({ username, email }: userInput) => {
    setUserInputData({ username, email });
  };
  console.log(userInputData);
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
                  "We can't find any account registered with given username or email"
                }
                activeTab={passwordStatus}
                setActiveTabStatus={setPasswordStatus}
              />
            )}
            {passwordStatus.isActive &&
              passwordStatus.status === "confirmPassword" && (
                <TabPasswordConfirm
                  activeTab={passwordStatus}
                  userData={userInputData}
                />
              )}
          </div>
        </div>
      }
    </div>
  );
}

export default FindAccount;
