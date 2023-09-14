import { useState, useEffect } from "react";
import { Signup, Login } from "../Types/Login";
import { checkUsernameAvailability, createNewAccount } from "../Axios";
import s from "../Styles/Signup.module.css";
import { useFormInput } from "../Hooks/useFormInput";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/min";
import "react-phone-number-input/style.css";

function SignUp() {
  const [signupInfo, setSignupInfo] = useState<Signup>({
    id: undefined,
    firstname: "",
    lastname: "",
    birthday: "",
    email: "",
    telephone: "",
    address: "",
  });
  const [loginInfo, setLoginInfo] = useState<Login>({
    username: "",
    password: "",
  });
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [passwordStrengthStatus, setPasswordStrengthStatus] = useState<
    Record<string, boolean>
  >({
    number: false,
    uppercase: false,
    lowercase: false,
    symbol: false,
    length: false,
  });
  const [isPasswordsMatched, setIsPasswordsMatched] = useState<boolean>(false);
  const [nationalNumber, setNationalNumber] = useState<E164Number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setSignupInfo({
      ...signupInfo,
      ["telephone"]: nationalNumber as E164Number,
    });
  }, [nationalNumber]);

  async function usernameHandler(currentUsername: string) {
    setLoginInfo({
      ...loginInfo,
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
  function displayUsernameAvailability() {
    if (loginInfo.username.length === 0) {
      return <span>{""}</span>;
    }
    if (loginInfo.username.length < 5 || loginInfo.username.length >= 15) {
      return <span className={s.warningNote}>must be 5 to 15 characters </span>;
    }
    if (loginInfo.username.length !== 0 && isUsernameValid) {
      return <span className={s.successNote}> valid username</span>;
    }
    if (loginInfo.username.length !== 0 && !isUsernameValid) {
      return <span className={s.warningNote}> invalid username</span>;
    }
    return <span></span>;
  }

  function passwordHandler(currentPassword: string) {
    setLoginInfo({
      ...loginInfo,
      ["password"]: currentPassword,
    });
    checkPasswordStrength(currentPassword);
  }

  function checkPasswordStrength(currentPassword: string) {
    const numberRegex = new RegExp("(?=.*[0-9])");
    const uppercaseRegex = new RegExp("(?=.*[A-Z])");
    const lowercaseRegex = new RegExp("(?=.*[a-z])");
    const specialcharacterRegex = new RegExp("(?=.*[$&+,:;=?@#|'<>.^*()%!-/])");
    const lengthRegex = new RegExp("(?=\\S+$).{8,20}");
    const isNumberIncluded = numberRegex.test(currentPassword);
    const isUppercaseIncluded = uppercaseRegex.test(currentPassword);
    const isLowercaseIncluded = lowercaseRegex.test(currentPassword);
    const isSpecialcharacterIncluded =
      specialcharacterRegex.test(currentPassword);
    const isLengthValid = lengthRegex.test(currentPassword);
    setPasswordStrengthStatus({
      ...passwordStrengthStatus,
      ["number"]: isNumberIncluded,
      ["uppercase"]: isUppercaseIncluded,
      ["lowercase"]: isLowercaseIncluded,
      ["symbol"]: isSpecialcharacterIncluded,
      ["length"]: isLengthValid,
    });
    if (
      isNumberIncluded &&
      isUppercaseIncluded &&
      isLowercaseIncluded &&
      isSpecialcharacterIncluded &&
      isLengthValid
    ) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }
  function displayPasswordStrength() {
    return (
      <span className={s.passwordCheckList}>
        <span
          style={{
            color: passwordStrengthStatus.number ? "green" : "red",
          }}
        >
          Number
        </span>
        <span
          style={{
            color: passwordStrengthStatus.lowercase ? "green" : "red",
          }}
        >
          Lowercase
        </span>
        <span
          style={{
            color: passwordStrengthStatus.uppercase ? "green" : "red",
          }}
        >
          Uppercase
        </span>
        <span
          style={{
            color: passwordStrengthStatus.symbol ? "green" : "red",
          }}
        >
          Symbol
        </span>
        <span
          style={{
            color: passwordStrengthStatus.length ? "green" : "red",
          }}
        >
          Length(8-20)
        </span>
      </span>
    );
  }

  function matchPasswords(confirmPassword: string) {
    setConfirmPassword(confirmPassword);
    if (confirmPassword === loginInfo.password) {
      setIsPasswordsMatched(true);
    } else {
      setIsPasswordsMatched(false);
    }
    displaypasswordsmatch();
  }

  function displaypasswordsmatch() {
    if (confirmPassword.length === 0) {
      return <span></span>;
    }
    if (confirmPassword.length !== 0 && isPasswordsMatched) {
      return <span className={s.successNote}>passwords are matching</span>;
    }
    if (confirmPassword.length !== 0 && !isPasswordsMatched) {
      return <span className={s.warningNote}>passwords are not matching</span>;
    }
  }
  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLoading) {
      setIsLoading(true);
      const isAllRequirementsMet = checkRequirements();
      if (isAllRequirementsMet) {
        // const userInfo =;
        createNewAccount({ loginInfo, signupInfo });
        console.log("Submit");
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
      <form className={s.formContainer} onSubmit={(event) => submitForm(event)}>
        <div>Sign up</div>
        <div className={s.signupInput}>
          <div className={s.inputLabel}>
            {" "}
            Username* {displayUsernameAvailability()}
          </div>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              required
              value={loginInfo.username}
              onChange={(event) => usernameHandler(event.currentTarget.value)}
            />
          </label>
        </div>
        <div className={s.signupInput}>
          <div className={s.inputLabel}>
            Password*
            {displayPasswordStrength()}
          </div>
          <label htmlFor="password">
            <input
              type="text"
              name="password"
              required
              value={loginInfo.password}
              onChange={(event) => passwordHandler(event.currentTarget.value)}
            />
          </label>
        </div>
        <div className={s.signupInput}>
          <div className={s.inputLabel}>
            {" "}
            Confirm Password* {displaypasswordsmatch()}
          </div>
          <label htmlFor="confirmPassword">
            <input
              type="password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(event) => matchPasswords(event.currentTarget.value)}
            />
          </label>
        </div>
        <div className={s.signupWrapperContainer}>
          <div className={s.signupInput}>
            <div className={s.inputLabel}> First name*</div>
            <label htmlFor="firstName">
              <input
                type="text"
                name="firstName"
                required
                value={signupInfo.firstname}
                onChange={(event) =>
                  setSignupInfo({
                    ...signupInfo,
                    ["firstname"]: event.currentTarget.value,
                  })
                }
              />
            </label>
          </div>
          <div className={s.signupInput}>
            <div className={s.inputLabel}> Last name*</div>
            <label className={s.inputNameForm} htmlFor="lastname">
              <input
                type="text"
                name="lastname"
                required
                value={signupInfo.lastname}
                onChange={(event) =>
                  setSignupInfo({
                    ...signupInfo,
                    ["lastname"]: event.currentTarget.value,
                  })
                }
              />
            </label>
          </div>
        </div>
        <div className={s.signupWrapperContainer}>
          <div className={s.signupInput}>
            <div className={s.inputLabel}> Birthday*</div>
            <label className={s.inputNameForm} htmlFor="birthday">
              <input
                type="date"
                name="birthday"
                required
                value={signupInfo.birthday}
                onChange={(event) =>
                  setSignupInfo({
                    ...signupInfo,
                    ["birthday"]: event.currentTarget.value,
                  })
                }
              />
            </label>
          </div>
          <div className={s.signupInput}>
            <div className={s.inputLabel}> Email*</div>
            <label className={s.inputNameForm} htmlFor="email">
              <input
                type="email"
                name="email"
                required
                value={signupInfo.email}
                onChange={(event) =>
                  setSignupInfo({
                    ...signupInfo,
                    ["email"]: event.currentTarget.value,
                  })
                }
              />
            </label>
          </div>
        </div>
        <div className={s.signupInput}>
          <div className={s.inputLabel}> Telephone*</div>
          <PhoneInput
            placeholder="Enter phone number"
            required
            value={nationalNumber}
            onChange={setNationalNumber}
          />
        </div>
        <div className={s.signupInput}>
          <div className={s.inputLabel}> Address</div>
          <label className={s.inputNameForm} htmlFor="address">
            <input
              type="text"
              name="address"
              value={signupInfo.address}
              onChange={(event) =>
                setSignupInfo({
                  ...signupInfo,
                  ["address"]: event.currentTarget.value,
                })
              }
            />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SignUp;
