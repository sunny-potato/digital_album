import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../Styles/TabCommon.module.css";
import emailValidation from "../Utils/emailValidation";
import { findUserAccount } from "../Services/user";
import { TabPasswordDefault as TabPasswordDefaultProps } from "../Services/tab";

function TabPasswordDefault({
  activeTab,
  setActiveTabStatus,
  getUserInput,
}: TabPasswordDefaultProps) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<{
    username: string;
    email: string;
  }>({ username: "", email: "" });
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isUsernameValid = () => {
    if (userInput.username === "") {
      setUsernameErrorMessage("It should not be empty");
      return false;
    } else if (userInput.username.includes(" ")) {
      setUsernameErrorMessage("It should not have space");
      return false;
    } else {
      setUsernameErrorMessage("");
      return true;
    }
  };
  const isEmailValid = () => {
    if (!emailValidation(userInput.email)) {
      setEmailErrorMessage("Please enter en valid email");
      return false;
    } else {
      setEmailErrorMessage("");
      return true;
    }
  };
  return (
    <div
      className={`${s.tabInner}  ${activeTab.isActive ? "" : s.tabInActive} `}
    >
      <div className={s.pageDescription}>
        Please enter your username or email to search your account
      </div>
      <input
        placeholder={"Enter username"}
        onChange={(event) =>
          setUserInput({
            ...userInput,
            ["username"]: event.currentTarget.value,
          })
        }
      ></input>
      {usernameErrorMessage && (
        <div className={s.warningMessage}>{usernameErrorMessage}</div>
      )}
      <input
        placeholder={"Enter email address"}
        onChange={(event) =>
          setUserInput({
            ...userInput,
            ["email"]: event.currentTarget.value,
          })
        }
      ></input>
      {emailErrorMessage && (
        <div className={s.warningMessage}>{emailErrorMessage}</div>
      )}
      <div className={s.buttonContainer}>
        <button
          className={s.cancelButton}
          disabled={isLoading ? true : false}
          onClick={() => navigate("/login")}
        >
          Cancel
        </button>
        <button
          className={s.searchButton}
          disabled={isLoading ? true : false}
          onClick={async () => {
            if (isUsernameValid() && isEmailValid()) {
              setIsLoading(true);
              const isUserAccountFound = await findUserAccount(userInput);
              if (isUserAccountFound) {
                setActiveTabStatus({
                  ...activeTab,
                  ["status"]: "confirmPassword",
                });
                getUserInput(userInput);
              } else {
                setActiveTabStatus({ ...activeTab, ["status"]: "noMatch" });
              }
            }
            setIsLoading(false);
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
export default TabPasswordDefault;
