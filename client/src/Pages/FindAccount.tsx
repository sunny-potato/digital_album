import { useNavigate } from "react-router-dom";
import s from "../Styles/FindAccount.module.css";
import { useState } from "react";
import { findUserAccount } from "../Services/user";

function FindAccount() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("findAccount");
  const [securityCode, setSecurityCode] = useState<number>();
  // const [acitveTab, setActiveTab] = useState<string>("username");
  // console.log(acitveTab);
  return (
    <div className={s.pageContainer}>
      {currentStatus === "findAccount" && (
        <div className={s.contentContainer}>
          <div className={s.tabLinks}>
            <button className={(s.tabTitle, s.tabActive)}>Find username</button>
            <button className={s.tabTitle}>Find password</button>
          </div>
          <div className={s.tabContent}>
            <div className={s.pageDescription}>
              Please enter your username or email address to search your account
            </div>
            <input
              placeholder="username or email address"
              onChange={(event) => setUserInput(event.currentTarget.value)}
            ></input>
            <div className={s.buttonContainer}>
              <button
                className={s.cancelButton}
                onClick={() => navigate("/login")}
              >
                Cancel
              </button>
              <button
                className={s.searchButton}
                onClick={async () => {
                  const isUserAccountFound = await findUserAccount(userInput);
                  console.log(isUserAccountFound);
                  if (isUserAccountFound === 0) {
                    setCurrentStatus("noMatch");
                  } else {
                    if (userInput.includes("@")) {
                      setCurrentStatus("matchEmail");
                    } else {
                      setCurrentStatus("matchUsername");
                    }
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {currentStatus === "matchEmail" && (
        <div className={s.contentContainer}>
          <div className={s.pageTitle}>Send a code to your email address</div>
          <div className={s.pageDescription}>We can send a login code to :</div>
          <div>{userInput}</div>
          <div className={s.buttonContainer}>
            <button
              className={s.cancelButton}
              onClick={() => navigate("/login")}
            >
              Cancel
            </button>
            <button
              className={s.continueButton}
              onClick={() => setCurrentStatus("securityCode")}
            >
              Continue
            </button>
          </div>
        </div>
      )} */}
      {/* {currentStatus === "securityCode" && (
        <div className={s.contentContainer}>
          <div className={s.pageTitle}>Enter security code</div>
          <div className={s.pageDescription}>
            Please check your email for a message with your code. Your code is 6
            numbers long
          </div>
          <input
            placeholder="Enter code"
            onChange={(event) => setSecurityCode(event.currentTarget.value)}
          />
          <div className={s.buttonContainer}>
            <button
              className={s.cancelButton}
              onClick={() => navigate("/login")}
            >
              Cancel
            </button>
            <button
              className={s.continueButton}
              onClick={() => setCurrentStatus("newPassword")}
            >
              Continue
            </button>
          </div>
        </div>
      )} */}
      {/* {currentStatus === "matchUsername" && (
        <div className={s.contentContainer}>
          <div className={s.pageTitle}>
            Send a code to registered email address for your account
          </div>
          <div className={s.pageDescription}>
            We can send a login code to the registered email address for
            {userInput}
          </div>
          <div className={s.buttonContainer}>
            <button
              className={s.goToLoginButton}
              onClick={() => navigate("/login")}
            >
              Go to login
            </button>
          </div>
        </div>
      )} */}
      {/* {currentStatus === "noMatch" && (
        <div className={s.contentContainer}>
          <div className={s.pageTitle}>No found username or email</div>
          <div className={s.pageDescription}>
            We can't find any useraccount matching to given username or email.
          </div>
          <div className={s.buttonContainer}>
            <button
              className={s.goToLoginButton}
              onClick={() => navigate("/login")}
            >
              Go to login
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default FindAccount;
