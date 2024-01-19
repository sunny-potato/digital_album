import { useNavigate } from "react-router-dom";
import s from "../Styles/FindAccount.module.css";
import { useState } from "react";
import TabDefaultContent from "../Components/TabDefaultContent";
import TabNoMatchContent from "../Components/TabNoMatchContent";

function FindAccount() {
  // const navigate = useNavigate();
  const [usernameStatus, setUsernameStatus] = useState<{
    isActive: boolean;
    status: string;
  }>({ isActive: true, status: "default" });
  const [passwordStatus, setPasswordStatus] = useState<{
    isActive: boolean;
    status: string;
  }>({ isActive: false, status: "default" });
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
                isTabActive={usernameStatus.isActive}
                tabDescription={"Please enter email to search your account"}
                tabInputPlaceholder={"Enter your email address"}
                activeTabStatus={usernameStatus}
                setActiveTabStatus={setUsernameStatus}
              />
            )}
            {usernameStatus.isActive && usernameStatus.status === "noMatch" && (
              <TabNoMatchContent
                isTabActive={usernameStatus.isActive}
                tabDescription={
                  "We can't find any username registered with given email"
                }
                activeTabStatus={usernameStatus}
                setActiveTabStatus={setUsernameStatus}
              />
            )}
            {passwordStatus.isActive && passwordStatus.status === "default" && (
              <TabDefaultContent
                isTabActive={passwordStatus.isActive}
                tabDescription={
                  "Please enter your username or email to search your account"
                }
                tabInputPlaceholder={"Enter your username or email address"}
                activeTabStatus={passwordStatus}
                setActiveTabStatus={setPasswordStatus}
              />
            )}
            {passwordStatus.isActive && passwordStatus.status === "noMatch" && (
              <TabNoMatchContent
                isTabActive={passwordStatus.isActive}
                tabDescription={
                  "We can't find any account registered with given username or email"
                }
                activeTabStatus={passwordStatus}
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
