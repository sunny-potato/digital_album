import { Link } from "react-router-dom";
import s from "../Styles/Nav.module.css";
import { useContext } from "react";
import { UserContext } from "../AppContext";

function Nav({ username }: { username: string | undefined }) {
  const { userId } = useContext(UserContext);
  // console.log({ userId });
  return (
    <div className={s.navContainer}>
      <div className={s.navLeft}>
        <Link to={`/`}>Home</Link>
      </div>
      <div className={s.navCenter}>
        <Link to={"/"} className={s.pageTitle}>
          Digital Album
        </Link>
      </div>
      {userId ? (
        <div className={s.navRight}>
          <Link to={`/myAlbum/${userId}`}>My album</Link>
          <Link to={`/myPage/${userId}`}>Hello, {username}</Link>
        </div>
      ) : (
        <div className={s.navRight}>
          <Link to={"/login"} className={s.login}>
            Login
          </Link>
          <Link to={"/signup"} className={s.signup}>
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Nav;
