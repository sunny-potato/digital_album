import { Link } from "react-router-dom";
import s from "../Styles/Nav.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../AppContext";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LoginIcon from "@mui/icons-material/Login";
// import LogoutIcon from "@mui/icons-material/Logout";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { getUsername } from "../Services/user";
import { removeLocalStorageData } from "../Utils/localstorage";

function Nav() {
  const { userId, setUserId } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (userId) {
      const retrieveUserName = async () => {
        const username = await getUsername(userId);
        if (username) {
          setUsername(username);
        } else {
          console.error("no username");
        }
      };
      retrieveUserName();
    }
  }, [userId]);

  return (
    <div className={s.navContainer}>
      <div className={s.navLeft}>
        <Link to={"/"} className={s.home}>
          {/* <HomeOutlinedIcon /> */}
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
          <Link
            to={"/login"}
            className={s.logout}
            onClick={() => (
              setUserId(null), removeLocalStorageData("myAlbumDropDownList")
            )}
          >
            {/* <LogoutIcon /> */}
            Log out
          </Link>
        </div>
      ) : (
        <div className={s.navRight}>
          <div className={s.signup}>
            <Link to={"/signup"}>Sign up</Link>
          </div>
          <Link to={"/login"} className={s.login}>
            {/* <LoginIcon /> */}
            Log in
          </Link>
        </div>
      )}
    </div>
  );
}

export default Nav;
