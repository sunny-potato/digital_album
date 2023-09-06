import { useState } from "react";
import { Signup, Login } from "../Types/Login";
import "../Styles/Signup.css";

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
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  console.log(signupInfo);
  console.log(loginInfo);
  console.log(confirmPassword);

  // what to check befor button clicked
  // same username found?
  //what to check when button clicked
  //1. password = confirm password
  //2. all necessary infomation is given
  //3.

  return (
    <div className="signupContainer">
      <div className="formContainer">
        {" "}
        <div>Sign up</div>
        <div className="username signupInput">
          <div className="inputLabel"> Username</div>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              value={loginInfo.username}
              onChange={(event) =>
                setLoginInfo({
                  ...loginInfo,
                  ["username"]: event.currentTarget.value,
                })
              }
            />
          </label>
        </div>
        <div className="password signupInput">
          <div className="inputLabel"> Password</div>
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
          <div className="inputLabel"> Confirm Password</div>
          <label htmlFor="confirmPassword">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.currentTarget.value)
              }
            />
          </label>
        </div>
        <div className="firstName signupInput">
          <div className="inputLabel"> First name</div>
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
          <div className="inputLabel"> Last name</div>
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
          <div className="inputLabel"> Birthday</div>
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
          <div className="inputLabel"> Email</div>
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
          <div className="inputLabel"> Telephone</div>
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
