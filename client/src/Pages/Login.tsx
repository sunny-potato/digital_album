import { Link } from "react-router-dom";
import "../Styles/Login.css";

function Login() {
  return (
    <div className="pageContainer">
      <div className="pageContents">
        <div className="loginPageTitle">Sign in</div>
        <div className="loginPageContents">
          <form className="loginInformation">
            <div className="userName login">
              <label htmlFor="userName">Username</label>
              <input type="text" name="userName" />
            </div>
            <div className="passWord login">
              <label htmlFor="passWord">Password</label>
              <input type="text" name="passWord" />
            </div>
            <button className="loginButton">Log in</button>
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
