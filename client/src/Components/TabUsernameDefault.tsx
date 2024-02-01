import { useNavigate } from "react-router-dom";
import s from "../Styles/TabCommon.module.css";
import { useState } from "react";
import emailValidation from "../Utils/emailValidation";
import { getUsernameWithEmail } from "../Services/user";
import { userInput } from "../Types/Commonness";
import { TabUsernameDefault as TabUsernameDefaultProps } from "../Services/tab";

function TabUsernameDefault({
  activeTab,
  setActiveTabStatus,
  getUserInput,
}: TabUsernameDefaultProps) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<userInput>({
    username: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
            if (!emailValidation(userInput.email)) {
              setErrorMessage("Please enter en valid email");
            } else {
              setIsLoading(true);
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
            setIsLoading(false);
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default TabUsernameDefault;
