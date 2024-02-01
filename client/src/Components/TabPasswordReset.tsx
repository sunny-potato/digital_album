import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../Styles/TabCommon.module.css";
import { Input } from "./Input";
import { PasswordStrength } from "./PasswordStrength";
import { PasswordMatch } from "./PasswordMatch";
import { checkPasswordStrength } from "../Utils/checkPasswordStrength";
import { updatePassword } from "../Services/user";
import { TabPasswordReset as TabPasswordResetProps } from "../Services/tab";

function TabPasswordReset({
  activeTab,
  setActiveTabStatus,
  userData,
}: TabPasswordResetProps) {
  const navigate = useNavigate();
  const [password, setPassword] = useState<{
    newPassword: string;
    confirmedPassword: string;
  }>({
    newPassword: "",
    confirmedPassword: "",
  });
  const [isPasswordsMatched, setIsPasswordsMatched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function passwordHandler(currentPassword: string) {
    setPassword({
      ...password,
      ["newPassword"]: currentPassword,
    });
  }

  function matchPasswordsHandler(confirmPassword: string) {
    setPassword({
      ...password,
      ["confirmedPassword"]: confirmPassword,
    });
    if (confirmPassword === password.newPassword) {
      setIsPasswordsMatched(true);
    } else {
      setIsPasswordsMatched(false);
    }
  }

  const {
    isPasswordValid,
    isNumberIncluded,
    isLowercaseIncluded,
    isUppercaseIncluded,
    isSpecialcharacterIncluded,
    isLengthValid,
  } = checkPasswordStrength(password.newPassword);

  function checkRequirements() {
    if (isPasswordValid && isPasswordsMatched) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div
      className={`${s.tabInner}  ${activeTab.isActive ? "" : s.tabInActive} `}
    >
      <div className={s.pageDescription}>
        Please enter a new password to update your password
      </div>
      <Input
        label={"Password"}
        type={"text"}
        name="password"
        required={true}
        value={password.newPassword}
        style={s}
        onChange={(event) => passwordHandler(event)}
        valueAvailability={
          <PasswordStrength
            isNumberIncluded={isNumberIncluded}
            isLowercaseIncluded={isLowercaseIncluded}
            isUppercaseIncluded={isUppercaseIncluded}
            isSpecialcharacterIncluded={isSpecialcharacterIncluded}
            isLengthValid={isLengthValid}
            style={s}
          />
        }
      />

      <Input
        label={"Confirm Password"}
        type={"password"}
        name="confirmedPassword"
        required={true}
        value={password.confirmedPassword}
        onChange={(event) => matchPasswordsHandler(event)}
        style={s}
        valueAvailability={
          <PasswordMatch
            passwordLength={password.confirmedPassword.length}
            isPasswordsMatched={isPasswordsMatched}
          />
        }
      />
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
            setIsLoading(true);
            const isAllRequirementsMet = checkRequirements();
            if (isAllRequirementsMet) {
              const updatedData = {
                username: userData.username,
                newPassword: password.newPassword,
              };
              const isPasswordUpdated = await updatePassword(updatedData);
              if (isPasswordUpdated) {
                setActiveTabStatus({
                  ...activeTab,
                  ["status"]: "donePassword",
                });
              }
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

export default TabPasswordReset;
