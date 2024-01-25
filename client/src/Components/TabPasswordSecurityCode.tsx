import { userInput } from "../Types/Commonness";
import { useNavigate } from "react-router-dom";
import s from "../Styles/TabDefaultContent.module.css";
import { useState } from "react";

type TabPasswordSecurityCode = {
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
  getUserInput: (value: userInput) => void;
};

function TabPasswordSecurityCode({
  activeTab,
  setActiveTabStatus,
  getUserInput,
}: TabPasswordSecurityCode) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<userInput>({
    username: "",
    email: "",
  });
  const [securityCode, setSecurityCode] = useState<number | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>();

  return (
    <div
      className={`${s.tabInner}  ${activeTab.isActive ? "" : s.tabInActive} `}
    >
      <div className={s.pageDescription}>
        Please check your email for the security code that we sent.
      </div>
      <input
        type="text"
        inputMode="numeric"
        placeholder={"Enter code"}
        onChange={
          (event) => console.log(typeof event.currentTarget.value)
          // setSecurityCode(event.currentTarget.value as number | undefined)
          //   setUserInput({ ...userInput, ["email"]: event.currentTarget.value })
        }
      ></input>
      {errorMessage && <div className={s.warningMessage}>{errorMessage}</div>}
      <div className={s.buttonContainer}>
        <button className={s.cancelButton} onClick={() => navigate("/login")}>
          Cancel
        </button>
        <button
          className={s.searchButton}
          onClick={() => {
            console.log("clicked");
            // if (!emailValidation(userInput.email)) {
            //   setErrorMessage("Please enter en valid email");
            // } else {
            //   setErrorMessage("");
            //   const isUserAccountFound = await getUsernameWithEmail(
            //     userInput.email
            //   );
            //   if (!isUserAccountFound) {
            //     setActiveTabStatus({ ...activeTab, ["status"]: "noMatch" });
            //   } else {
            //     setActiveTabStatus({
            //       ...activeTab,
            //       ["status"]: "confirmUsername",
            //     });
            //     getUserInput(userInput);
            //   }
            // }
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default TabPasswordSecurityCode;
