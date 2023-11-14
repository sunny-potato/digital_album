import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login as login } from "../Types/Login";
import { validateLoginInfo } from "../Axios";
import { UserContext } from "../AppContext";
import s from "../Styles/Login.module.css";
import hideEyeIcon from "../Images/hide.png";
import viewEyeIcon from "../Images/view.png";
import welcomeImage from "../Images/welcome.svg";
import ConfettiEffect from "../Components/ConfettiEffect";

function Login({ setUsername }: { setUsername: (value: string) => void }) {
  // const confettiRef = useRef(0);
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<login>({
    username: "",
    password: "",
  });
  const [isLoginInfoValid, setIsLoginInfoValid] = useState<boolean>(true);
  const [isLoginValidated, setIsLoginValidated] = useState<boolean>(true);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(confettiRef.current.offsetWidth);
  // }, []);

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
      setUsername(validation.username);
      setUserId(validation.userId);
      navigate("/");
    } else {
      setIsLoginValidated(false);
    }
  }

  return (
    <div className={s.pageContainer}>
      <div className={s.imageContainer}>
        <ConfettiEffect />
        <img
          className={s.welcomeImage}
          src={welcomeImage}
          alt="welcome image"
        />
      </div>
      <div className={s.contentContainer}>
        <div className={s.loginContainer}>
          <div className={s.loginTitle}>Welcome to Digital Album</div>
          <form
            className={s.loginInput}
            onSubmit={(event) => submitLoginInfo(event)}
          >
            <div className={s.usernameInput}>
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                name="userName"
                onChange={(event) =>
                  loginInputHandler("username", event.currentTarget.value)
                }
              />
            </div>
            <div className={s.passwordInput}>
              <label htmlFor="passWord">Password</label>
              <input
                type={isPasswordHidden ? "password" : "text"}
                name="passWord"
                onChange={(event) =>
                  loginInputHandler("password", event.currentTarget.value)
                }
              ></input>
              <div className={s.eyeIcon}>
                <img
                  className={s.hideEyeIcon}
                  src={hideEyeIcon}
                  alt="hide password icon"
                  style={{
                    display: isPasswordHidden ? "block" : "none",
                  }}
                  onClick={() => setIsPasswordHidden(false)}
                ></img>
                <img
                  className={s.viewEyeIcon}
                  src={viewEyeIcon}
                  alt="view password icon"
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
              Username and password should not be empty
            </div>
            <div
              className={s.failedValidationMessage}
              style={{ visibility: isLoginValidated ? "hidden" : "visible" }}
            >
              Incorrect username or password
            </div>
          </form>
          <div>
            <div className={s.linkInformation}>
              <Link to={"/"}>Forgotten password?</Link>
            </div>
            <div className={s.linkInformation}>
              <Link to={"/signup"}>Sign up?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
