import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../Styles/TabCommon.module.css";
import { checkVerificationCode } from "../Services/user";
import { TabPasswordSecurityCode as TabPasswordSecurityCodeProps } from "../Services/tab";

function TabPasswordSecurityCode({
  activeTab,
  setActiveTabStatus,
  userData,
}: TabPasswordSecurityCodeProps) {
  const navigate = useNavigate();
  const [securityCode, setSecurityCode] = useState<number | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div
      className={`${s.tabInner}  ${activeTab.isActive ? "" : s.tabInActive} `}
    >
      <div className={s.pageDescription}>
        Please check your email for the security code that we sent.
        <div>The code is 6 numbers</div>
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
            setErrorMessage("");
            setIsLoading(true);
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
            setIsLoading(false);
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default TabPasswordSecurityCode;
