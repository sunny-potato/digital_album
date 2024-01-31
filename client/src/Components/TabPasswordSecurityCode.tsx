import { userInput } from "../Types/Commonness";
import { useNavigate } from "react-router-dom";
import s from "../Styles/TabDefaultContent.module.css";
import { useState } from "react";
import { checkVerificationCode } from "../Services/user";

type TabPasswordSecurityCode = {
  activeTab: { name: string; isActive: boolean; status: string };
  setActiveTabStatus: (value: {
    name: string;
    isActive: boolean;
    status: string;
  }) => void;
  userData: userInput;
  getUserInput: (value: userInput) => void;
};

function TabPasswordSecurityCode({
  activeTab,
  setActiveTabStatus,
  userData,
  getUserInput,
}: TabPasswordSecurityCode) {
  const navigate = useNavigate();
  // const [userInput, setUserInput] = useState<userInput>({
  //   username: "",
  //   email: "",
  // });
  const [securityCode, setSecurityCode] = useState<number | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>();
  console.log(securityCode);
  return (
    <div
      className={`${s.tabInner}  ${activeTab.isActive ? "" : s.tabInActive} `}
    >
      <div className={s.pageDescription}>
        Please check your email for the security code that we sent.
      </div>
      <input
        type="number"
        placeholder={"Enter code"}
        min={0}
        onChange={(event) =>
          setSecurityCode(event.currentTarget.value as unknown as number)
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
            const isCodeVerified = await checkVerificationCode(
              userData,
              securityCode as number
            );
            if (isCodeVerified) {
              setActiveTabStatus({
                ...activeTab,
                ["status"]: "resetPassword",
              });
            } else {
              setErrorMessage("The verification code is invalid");
              // how to handle when it is not valid????????????
            }
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default TabPasswordSecurityCode;
