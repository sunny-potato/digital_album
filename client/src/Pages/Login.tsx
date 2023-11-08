import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login as login, UserData } from "../Types/Login";
import { validateLoginInfo } from "../Axios";
import hideEyeIcon from "../Images/hide.png";
import viewEyeIcon from "../Images/view.png";
import s from "../Styles/Login.module.css";

function Login({ setUserData }: { setUserData: (userData: UserData) => void }) {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<login>({
    username: "",
    password: "",
  });
  const [isLoginInfoValid, setIsLoginInfoValid] = useState<boolean>(true);
  const [isLoginValidated, setIsLoginValidated] = useState<boolean>(true);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function loginInputHandler(key: string, value: string) {
    setLoginInfo({ ...loginInfo, [key]: value });
  }

  function submitLoginInfo(event: React.FormEvent<HTMLFormElement>) {
    //????????????????????????
    if (!isLoading) {
      setIsLoading(true);
      event.preventDefault();
      checkValidation(loginInfo);
    } else {
      setIsLoading(false);
    }
  }

  async function checkValidation(loginInfo: login) {
    if (loginInfo.username !== "" && loginInfo.password !== "") {
      const isLoginValidated = await validateLoginInfo(loginInfo);
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

  return (
    <div className={s.pageContainer}>
      <div>
        <div className={s.loginPageTitle}>Sign in</div>
        <div className={s.loginPageContents}>
          <form
            className={s.loginInformation}
            onSubmit={(event) => submitLoginInfo(event)}
          >
            <div className={s.userName}>
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                name="userName"
                onChange={(event) =>
                  loginInputHandler("username", event.currentTarget.value)
                }
              />
            </div>
            <div className={s.passWord}>
              <label htmlFor="passWord">Password</label>
              <input
                type={isPasswordHidden ? "password" : "text"}
                name="passWord"
                onChange={(event) =>
                  loginInputHandler("password", event.currentTarget.value)
                }
              />
              <div className={s.eyeIcon}>
                <img
                  className={s.hideEyeIcon}
                  src={hideEyeIcon}
                  style={{
                    display: isPasswordHidden ? "block" : "none",
                  }}
                  onClick={() => setIsPasswordHidden(false)}
                ></img>
                <img
                  className={s.viewEyeIcon}
                  src={viewEyeIcon}
                  style={{
                    display: isPasswordHidden ? "none" : "block",
                  }}
                  onClick={() => setIsPasswordHidden(true)}
                ></img>
              </div>
            </div>
            <button
              className={s.loginButton}
              disabled={isLoading ? true : false}
            >
              Log in
            </button>
            <div
              className={s.invalidMessage}
              style={{ visibility: isLoginInfoValid ? "hidden" : "visible" }}
            >
              username and password should not be empty
            </div>
            <div
              className={s.failedValidationMessage}
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
