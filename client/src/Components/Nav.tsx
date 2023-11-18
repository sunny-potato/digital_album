import { Link } from "react-router-dom";
import s from "../Styles/Nav.module.css";
import { useContext } from "react";
import { UserContext } from "../AppContext";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function Nav({ username }: { username: string | undefined }) {
  const { userId } = useContext(UserContext);

  return (
    <div className={s.navContainer}>
      <div className={s.navLeft}>
        <Link to={"/"} className={s.home}>
          <HomeOutlinedIcon />
          Home
        </Link>
        <Link to={"/about"} className={s.about}>
          About
        </Link>
        {userId ? <Link to={`/myAlbum/${userId}`}>My album</Link> : <div></div>}
      </div>
      <div className={s.navCenter}>
        <Link to={"/"} className={s.pageTitle}>
          Digital Album
        </Link>
      </div>
      {userId ? (
        <div className={s.navRight}>
          <Link to={`/myPage/${userId}`} className={s.user}>
            <PersonOutlineIcon />
            {username}
          </Link>
          <Link to={"/login"} className={s.logout}>
            <LogoutIcon />
            Log out
          </Link>
        </div>
      ) : (
        <div className={s.navRight}>
          <Link to={"/login"} className={s.login}>
            <LoginIcon />
            Log in
          </Link>
          <div className={s.signup}>
            <Link to={"/signup"}>Sign up</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
