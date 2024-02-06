import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Signup, Login } from "../Types/Login";
import { checkUsernameAvailability, createNewAccount } from "../Services/user";
import s from "../Styles/Signup.module.css";
import { UsernameAvailability } from "../Components/UsernameAvailability";
import { Input } from "../Components/Input";
import { PasswordStrength } from "../Components/PasswordStrength";
import { PasswordMatch } from "../Components/PasswordMatch";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/min";
import "react-phone-number-input/style.css";
import { checkPasswordStrength } from "../Utils/checkPasswordStrength";

function SignUp() {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState<Signup>({
    id: undefined,
    firstname: "",
    lastname: "",
    birthdate: "",
    email: "",
    telephon: "",
    address: "",
    username: "",
    password: "",
    confirmedPassword: "",
  });
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [isPasswordsMatched, setIsPasswordsMatched] = useState<boolean>(false);
  const [nationalNumber, setNationalNumber] = useState<E164Number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignupSucceeded, setIsSignupSucceeded] = useState<boolean>(false);

  useEffect(() => {
    setSignupInfo({
      ...signupInfo,
      ["telephon"]: nationalNumber as E164Number,
    });
  }, [nationalNumber]);

  async function usernameHandler(currentUsername: string) {
    setSignupInfo({
      ...signupInfo,
      ["username"]: currentUsername,
    });
    const checkedUsernameAvailability = await checkUsernameAvailability(
      currentUsername
    );
    const isUsernameValid = checkedUsernameAvailability.data;
    if (isUsernameValid) {
      setIsUsernameValid(true);
    } else {
      setIsUsernameValid(false);
    }
  }

  function passwordHandler(currentPassword: string) {
    setSignupInfo({
      ...signupInfo,
      ["password"]: currentPassword,
    });
  }

  const {
    isPasswordValid,
    isNumberIncluded,
    isLowercaseIncluded,
    isUppercaseIncluded,
    isSpecialcharacterIncluded,
    isLengthValid,
  } = checkPasswordStrength(signupInfo.password);

  function matchPasswordsHandler(confirmPassword: string) {
    setSignupInfo({
      ...signupInfo,
      ["confirmedPassword"]: confirmPassword,
    });
    if (confirmPassword === signupInfo.password) {
      setIsPasswordsMatched(true);
    } else {
      setIsPasswordsMatched(false);
    }
  }

  function inputHanlder(currentName: string, valueName: string) {
    setSignupInfo({
      ...signupInfo,
      [`${valueName}`]: currentName,
    });
  }

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLoading) {
      setIsLoading(true);
      const isAllRequirementsMet = checkRequirements();
      if (isAllRequirementsMet) {
        const result = await createNewAccount(signupInfo);
        if (result.status === 200) {
          setIsSignupSucceeded(true);
        }
      }
    } else {
      setIsLoading(false);
    }
  }

  function checkRequirements() {
    if (isUsernameValid && isPasswordValid && isPasswordsMatched) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className={s.signupContainer}>
      <div
        className={s.popupContainer}
        style={{ visibility: isSignupSucceeded ? "visible" : "hidden" }}
      >
        <div className={s.popupInner}>
          <div className={s.popupTitle}>Thanks for signing up!</div>
          <div className={s.popupSubtitle}>
            Please login with the created account
          </div>
          <button onClick={() => navigate("/login")}>Go to login</button>
        </div>
      </div>
      <form className={s.formContainer} onSubmit={(event) => submitForm(event)}>
        <div className={s.pageTitle}>Sign up</div>
        <Input
          label={"Username*"}
          type={"text"}
          name="username"
          required={true}
          value={signupInfo.username}
          onChange={(event) => usernameHandler(event)}
          style={s}
          valueAvailability={
            <UsernameAvailability
              usernameLength={signupInfo.username.length}
              isUsernameValid={isUsernameValid}
              style={s}
            />
          }
        />
        <Input
          label={"Password*"}
          type={"text"}
          name="password"
          required={true}
          value={signupInfo.password}
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
          label={"Confirm Password*"}
          type={"password"}
          name="confirmedPassword"
          required={true}
          value={signupInfo.confirmedPassword}
          onChange={(event) => matchPasswordsHandler(event)}
          style={s}
          valueAvailability={
            <PasswordMatch
              passwordLength={signupInfo.confirmedPassword.length}
              isPasswordsMatched={isPasswordsMatched}
            />
          }
        />
        <div className={s.signupWrapperContainer}>
          <Input
            label={"First name*"}
            type={"text"}
            name="firstname"
            required={true}
            value={signupInfo.firstname}
            onChange={(event) => inputHanlder(event, "firstname")}
            style={s}
          />
          <Input
            label={"Last name*"}
            type={"text"}
            name="lastname"
            required={true}
            value={signupInfo.lastname}
            onChange={(event) => inputHanlder(event, "lastname")}
            style={s}
          />
        </div>
        <div className={s.signupWrapperContainer}>
          <Input
            label={"Birthday*"}
            type={"date"}
            name="birthdate"
            required={true}
            value={signupInfo.birthdate}
            onChange={(event) => inputHanlder(event, "birthdate")}
            style={s}
          />
          <Input
            label={"Email*"}
            type={"email"}
            name="email"
            required={true}
            value={signupInfo.email}
            onChange={(event) => inputHanlder(event, "email")}
            style={s}
          />
        </div>
        <div className={s.signupInput}>
          <div> Telephone*</div>
          <PhoneInput
            placeholder="Enter phone number"
            required
            value={nationalNumber}
            onChange={setNationalNumber}
          />
        </div>
        <Input
          label={"Address"}
          type={"text"}
          name="address"
          required={false}
          value={signupInfo.address}
          onChange={(event) => inputHanlder(event, "address")}
          style={s}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SignUp;
