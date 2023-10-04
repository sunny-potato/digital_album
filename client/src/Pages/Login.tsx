import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login as login, UserData } from "../Types/Login";
import { validateLoginInfo } from "../Axios";
import hideEyeIcon from "../Images/hide.png";
import viewEyeIcon from "../Images/view.png";
import "../Styles/Login.css";

function Login({ setUserData }: { setUserData: (userData: UserData) => void }) {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<login>({
    username: "",
    password: "",
  });
  // console.log(loginInfo);
  const [isLoginInfoValid, setIsLoginInfoValid] = useState<boolean>(true);
  const [isLoginValidated, setIsLoginValidated] = useState<boolean>(true);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  function loginInputHandler(key: string, value: string) {
    setLoginInfo({ ...loginInfo, [key]: value });
  }

  async function checkValidation(loginInfo: login) {
    if (loginInfo.username !== "" && loginInfo.password !== "") {
      const isLoginValidated = await validateLoginInfo(loginInfo);
      // console.log(isLoginValidated.data.result);
      displayValidationResult(isLoginValidated.data);
      setIsLoginInfoValid(true);
    } else {
      setIsLoginInfoValid(false);
    }
  }
  function displayValidationResult(validation: {
    result: boolean;
    username: string;
    userId: number;
  }) {
    if (validation.result) {
      setIsLoginValidated(true);
      const userData = {
        username: validation.username,
        userId: validation.userId,
      };
      setUserData(userData);
      navigate("/");
    } else {
      setIsLoginValidated(false);
    }
  }

  function submitLoginInfo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    checkValidation(loginInfo);
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
                type={isPasswordHidden ? "password" : "text"}
                name="passWord"
                onChange={(event) =>
                  loginInputHandler("password", event.currentTarget.value)
                }
              />
              <div className="eyeIcon">
                <img
                  className="hideEyeIcon"
                  src={hideEyeIcon}
                  style={{
                    display: isPasswordHidden ? "block" : "none",
                  }}
                  onClick={() => setIsPasswordHidden(false)}
                ></img>
                <img
                  className="viewEyeIcon"
                  src={viewEyeIcon}
                  style={{
                    display: isPasswordHidden ? "none" : "block",
                  }}
                  onClick={() => setIsPasswordHidden(true)}
                ></img>
              </div>
            </div>
            <button className="loginButton">Log in</button>
            <div
              className="invalidMessage"
              style={{ visibility: isLoginInfoValid ? "hidden" : "visible" }}
            >
              username and password should not be empty
            </div>
            <div
              className="failedValidationMessage"
              style={{ visibility: isLoginValidated ? "hidden" : "visible" }}
            >
              Incorrect username or password
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
