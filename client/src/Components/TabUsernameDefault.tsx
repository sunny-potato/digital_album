import { useNavigate } from "react-router-dom";
import s from "../Styles/TabCommon.module.css";
import { useState } from "react";
import emailValidation from "../Utils/emailValidation";
import { findUserAccount, getUsernameWithEmail } from "../Services/user";
import { userInput } from "../Types/Commonness";

type TabUsernameDefault = {
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
  getUserInput: (value: userInput) => void;
};

function TabUsernameDefault({
  activeTab,
  setActiveTabStatus,
  getUserInput,
}: TabUsernameDefault) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<userInput>({
    username: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>();

  return (
    <div
      className={`${s.tabInner}  ${activeTab.isActive ? "" : s.tabInActive} `}
    >
      <div className={s.pageDescription}>
        Please enter email to search your account
      </div>
      <input
        placeholder={"Enter email address"}
        onChange={(event) =>
          setUserInput({ ...userInput, ["email"]: event.currentTarget.value })
        }
      ></input>
      {errorMessage && <div className={s.warningMessage}>{errorMessage}</div>}
      <div className={s.buttonContainer}>
        <button className={s.cancelButton} onClick={() => navigate("/login")}>
          Cancel
        </button>
        <button
          className={s.searchButton}
          onClick={async () => {
            if (!emailValidation(userInput.email)) {
              setErrorMessage("Please enter en valid email");
            } else {
              setErrorMessage("");
              const isUserAccountFound = await getUsernameWithEmail(
                userInput.email
              );
              if (!isUserAccountFound) {
                setActiveTabStatus({ ...activeTab, ["status"]: "noMatch" });
              } else {
                setActiveTabStatus({
                  ...activeTab,
                  ["status"]: "confirmUsername",
                });
                getUserInput(userInput);
              }
            }
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default TabUsernameDefault;
