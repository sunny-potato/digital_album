import { Link } from "react-router-dom";
import { useState } from "react";
import { Login as login } from "../Types/Login";
import { validateLoginInfo } from "../Axios";
import "../Styles/Login.css";

function Login() {
  const [loginInfo, setLoginInfo] = useState<login>({
    username: "",
    password: "",
  });
  // console.log(loginInfo);
  const [isLoginInfoValid, setIsLoginInfoValid] = useState<boolean>(true);

  function loginInputHandler(key: string, value: string) {
    setLoginInfo({ ...loginInfo, [key]: value });
  }
  async function checkValidation(loginInfo: login) {
    // console.log(typeof loginInfo.username, typeof loginInfo.password);
    if (loginInfo.username !== "" && loginInfo.password !== "") {
      setIsLoginInfoValid(true);
      console.log("check validation");
      const test = await validateLoginInfo(loginInfo);
      console.log(test); //////////////////////////////////////
    } else {
      setIsLoginInfoValid(false);
    }
  }

  function submitLoginInfo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    checkValidation(loginInfo);
    console.log("submit");
  }
  return (
    <div className="pageContainer">
      <div className="pageContents">
        <div className="loginPageTitle">Sign in</div>
        <div className="loginPageContents">
          <form
            className="loginInformation"
            onSubmit={(event) => submitLoginInfo(event)}
          >
            <div className="userName loginList">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                name="userName"
                onChange={(event) =>
                  loginInputHandler("username", event.currentTarget.value)
                }
              />
            </div>
            <div className="passWord loginList">
              <label htmlFor="passWord">Password</label>
              <input
                type="text"
                name="passWord"
                onChange={(event) =>
                  loginInputHandler("password", event.currentTarget.value)
                }
              />
            </div>
            <button className="loginButton">Log in</button>
            <div
              className="invalidMessage"
              style={{ visibility: isLoginInfoValid ? "hidden" : "visible" }}
            >
              username and password should not be empty
            </div>
            <div>
              <Link to={"/"}>Forgotten password?</Link>
            </div>
            <div>
              <Link to={"/signup"}>Sign up?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
