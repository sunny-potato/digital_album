import { useState } from "react";
import { Signup, Login } from "../Types/Login";
import { checkUsernameAvailability } from "../Axios";
import "../Styles/Signup.css";
import { useFormInput } from "../Hooks/useFormInput";

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

  // console.log(signupInfo);
  // console.log(loginInfo);
  // console.log(confirmPassword);

  //what to check when button clicked
  //1. password = confirm password
  //2. all necessary infomation is given

  // const usernameInput = useFormInput("");
  // console.log(usernameInput);

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
      return <div> valid username</div>;
    }
    if (loginInfo.username.length !== 0 && !isUsernameValid) {
      return <div> invalid username</div>;
    }
  }

  function matchPasswords(confirmPassword: string) {
    setConfirmPassword(confirmPassword);
    // console.log(confirmPassword === loginInfo.password ? true : false);
    if (confirmPassword === loginInfo.password) {
      setIsPasswordsMatched(true);
    }
    setIsPasswordsMatched(false);
    displaypasswordsmatch(); ////////////???????????????
  }

  function displaypasswordsmatch() {
    if (confirmPassword.length === 0) {
      return <div></div>;
    }
    if (confirmPassword.length !== 0 && isPasswordsMatched) {
      return <div>passwords are matching</div>;
    }
    if (confirmPassword.length !== 0 && !isPasswordsMatched) {
      return <div>passwords are not matching</div>;
    }
  }

  return (
    <div className="signupContainer">
      <div className="formContainer">
        <div>Sign up</div>
        <div className="username signupInput">
          <div className="inputLabel"> Username*</div>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              value={loginInfo.username}
              onChange={(event) => usernameHandler(event.currentTarget.value)}
            />
          </label>
          {displayUsernameAvailability()}
        </div>
        <div className="password signupInput">
          <div className="inputLabel"> Password*</div>
          <label htmlFor="password">
            <input
              type="text"
              name="password"
              value={loginInfo.password}
              onChange={(event) =>
                setLoginInfo({
                  ...loginInfo,
                  ["password"]: event.currentTarget.value,
                })
              }
            />
          </label>
        </div>
        <div className="confirmPassword signupInput">
          <div className="inputLabel"> Confirm Password*</div>
          <label htmlFor="confirmPassword">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => matchPasswords(event.currentTarget.value)}
            />
          </label>
          {displaypasswordsmatch()}
        </div>
        <div className="firstName signupInput">
          <div className="inputLabel"> First name*</div>
          <label htmlFor="firstName">
            <input
              type="text"
              name="firstName"
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
        <div className="lastname signupInput">
          <div className="inputLabel"> Last name*</div>
          <label className="inputNameForm" htmlFor="lastname">
            <input
              type="text"
              name="lastname"
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
        <div className="birthday signupInput">
          <div className="inputLabel"> Birthday*</div>
          <label className="inputNameForm" htmlFor="birthday">
            <input
              type="date"
              name="birthday"
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
        <div className="email signupInput">
          <div className="inputLabel"> Email*</div>
          <label className="inputNameForm" htmlFor="email">
            <input
              type="email"
              name="email"
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
        <div className="telephone signupInput">
          <div className="inputLabel"> Telephone*</div>
          <label className="inputNameForm" htmlFor="telephone">
            <input
              type="number"
              name="telephone"
              value={signupInfo.telephone}
              onChange={(event) =>
                setSignupInfo({
                  ...signupInfo,
                  ["telephone"]: event.currentTarget.value,
                })
              }
            />
          </label>
        </div>
        <div className="address signupInput">
          <div className="inputLabel"> Address</div>
          <label className="inputNameForm" htmlFor="address">
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
        <button>Sign up</button>
      </div>
    </div>
  );
}

export default SignUp;
