import { useNavigate } from "react-router-dom";
import s from "../Styles/TabDefaultContent.module.css";
import { useState } from "react";
import { findUserAccount } from "../Services/user";

type TabDefaultContent = {
  isTabActive: boolean;
  tabDescription: string;
  tabInputPlaceholder: string;
  activeTabStatus: { isActive: boolean; status: string };
  setActiveTabStatus: (value: { isActive: boolean; status: string }) => void;
};
function TabDefaultContent({
  isTabActive,
  tabDescription,
  tabInputPlaceholder,
  activeTabStatus,
  setActiveTabStatus,
}: TabDefaultContent) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<string>("");
  return (
    <div className={`${s.tabInner}  ${isTabActive ? "" : s.tabInActive} `}>
      <div className={s.pageDescription}>{tabDescription}</div>
      <input
        placeholder={tabInputPlaceholder}
        onChange={(event) => setUserInput(event.currentTarget.value)}
      ></input>
      <div className={s.buttonContainer}>
        <button className={s.cancelButton} onClick={() => navigate("/login")}>
          Cancel
        </button>
        <button
          className={s.searchButton}
          onClick={async () => {
            if (!userInput.includes("@")) {
              // message
            }
            const isUserAccountFound = await findUserAccount(userInput);
            if (isUserAccountFound === 0) {
              setActiveTabStatus({ ...activeTabStatus, ["status"]: "noMatch" });
            } else {
              setActiveTabStatus({
                ...activeTabStatus,
                ["status"]: "noMatch",
              });
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
