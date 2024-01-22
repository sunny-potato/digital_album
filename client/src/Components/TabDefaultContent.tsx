import { useNavigate } from "react-router-dom";
import s from "../Styles/TabDefaultContent.module.css";
import { useState } from "react";
import { findUserAccount } from "../Services/user";

type TabDefaultContent = {
  tabDescription: string;
  // tabInputPlaceholder: string;
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
  incorrectFormatMessage: string;
  getUserInput: (value: string) => void;
};
function TabDefaultContent({
  tabDescription,
  // tabInputPlaceholder,
  activeTab,
  setActiveTabStatus,
  incorrectFormatMessage,
  getUserInput,
}: TabDefaultContent) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<string>("");
  const [isInputCorrectFormat, setIsInputCorrectFormat] =
    useState<boolean>(true);
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(false);
  return (
    <div
      className={`${s.tabInner}  ${activeTab.isActive ? "" : s.tabInActive} `}
    >
      <div className={s.pageDescription}>{tabDescription}</div>
      {activeTab.name === "password" && (
        <input
          placeholder={"Enter username"}
          onChange={(event) => setUserInput(event.currentTarget.value)}
        ></input>
      )}
      <input
        placeholder={"Enter email address"}
        onChange={(event) => setUserInput(event.currentTarget.value)}
      ></input>
      {isInputEmpty && (
        <div className={s.warningMessage}>It should not be empty</div>
      )}
      {!isInputCorrectFormat && (
        <div className={s.warningMessage}>{incorrectFormatMessage}</div>
      )}
      <div className={s.buttonContainer}>
        <button className={s.cancelButton} onClick={() => navigate("/login")}>
          Cancel
        </button>
        <button
          className={s.searchButton}
          onClick={async () => {
            console.log(isInputEmpty);
            if (userInput === "") {
              setIsInputEmpty(true);
            } else {
              setIsInputEmpty(false);
              if (activeTab.name === "username") {
                if (!userInput.includes("@") || !userInput.includes(".")) {
                  setIsInputCorrectFormat(false);
                } else {
                  setIsInputCorrectFormat(true);
                  const isUserAccountFound = await findUserAccount(userInput);
                  if (isUserAccountFound === 0) {
                    setActiveTabStatus({ ...activeTab, ["status"]: "noMatch" });
                  } else {
                    setActiveTabStatus({
                      ...activeTab,
                      ["status"]: "confirmUsername",
                    });
                    getUserInput(userInput);
                  }
                }
              }
              if (activeTab.name === "password") {
                const isUserAccountFound = await findUserAccount(userInput);
                console.log(isUserAccountFound);
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
export default TabDefaultContent;
