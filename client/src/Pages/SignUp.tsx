import { useState, useEffect } from "react";
import { Signup, Login } from "../Types/Login";
import { checkUsernameAvailability } from "../Axios";
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
  const [isPasswordsMatched, setIsPasswordsMatched] = useState<boolean>(false);
  const [nationalNumber, setNationalNumber] = useState<E164Number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // console.log(signupInfo);
  // console.log(loginInfo);
  // console.log(confirmPassword);
  // console.log(nationalNumber);

  // const usernameInput = useFormInput("");
  // console.log(usernameInput);

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
      return <div></div>;
    }
    if (loginInfo.username.length < 5 || loginInfo.username.length >= 15) {
      return <div>username must be 5 to 15 characters </div>;
    }
    if (loginInfo.username.length !== 0 && isUsernameValid) {
      return <div className={s.successNote}> valid username</div>;
    }
    if (loginInfo.username.length !== 0 && !isUsernameValid) {
      return <div className={s.warningNote}> invalid username</div>;
    }
  }

  function passwordHandler(currentPassword: string) {
    setLoginInfo({
      ...loginInfo,
      ["password"]: currentPassword,
    });
    checkPasswordStrength(currentPassword);
  }

  function checkPasswordStrength(currentPassword: string) {
    [...currentPassword].map((e) => console.log(e)); ////////////////////////
  }

  function matchPasswords(confirmPassword: string) {
    setConfirmPassword(confirmPassword);
    console.log(confirmPassword === loginInfo.password ? true : false);
    if (confirmPassword === loginInfo.password) {
      setIsPasswordsMatched(true);
    } else {
      setIsPasswordsMatched(false);
    }
    displaypasswordsmatch();
  }

  function displaypasswordsmatch() {
    if (confirmPassword.length === 0) {
      return <div></div>;
    }
    if (confirmPassword.length !== 0 && isPasswordsMatched) {
      return <div className={s.successNote}>passwords are matching</div>;
    }
    if (confirmPassword.length !== 0 && !isPasswordsMatched) {
      return <div className={s.warningNote}>passwords are not matching</div>;
    }
  }
  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLoading) {
      setIsLoading(true);
      const isAllRequirementsMet = checkRequirements();
      if (isAllRequirementsMet) {
        //send all the data to server
        console.log("Submit");
      } else {
        console.log("all requirements is not met");
      }
    } else {
      setIsLoading(false);
    }
  }

  function checkRequirements() {
    if (isUsernameValid && isPasswordsMatched) {
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
          <div className={s.inputLabel}> Username*</div>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              required
              value={loginInfo.username}
              onChange={(event) => usernameHandler(event.currentTarget.value)}
            />
          </label>
          {displayUsernameAvailability()}
        </div>
        <div className={s.signupInput}>
          <div className={s.inputLabel}> Password*</div>
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
          <div className={s.inputLabel}> Confirm Password*</div>
          <label htmlFor="confirmPassword">
            <input
              type="password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(event) => matchPasswords(event.currentTarget.value)}
            />
          </label>
          {displaypasswordsmatch()}
        </div>
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
