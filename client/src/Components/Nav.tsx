import { Link } from "react-router-dom";
import s from "../Styles/Nav.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../AppContext";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { getUsername } from "../Services/user";
import { removeLocalStorageData } from "../Utils/localstorage";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Nav() {
  const { userId, setUserId } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("start");
    if (userId) {
      const retrieveUserName = async () => {
        const username = await getUsername(userId);
        if (username) {
          setUsername(username);
        } else {
          console.error("no username");
        }
      };
      retrieveUserName().catch(console.error);
    }
  }, [userId]);

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      const currentRef = ref.current?.contains(event.target as Node);
      if (currentRef === undefined) {
        setIsMenuClicked(false);
      } else {
        setIsMenuClicked(currentRef);
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);

  return (
    <div className={s.navContainer}>
      <div className={s.navHome}>
        <Link to={"/"} className={`${s.pageTitle}`}>
          Digital Album
        </Link>
      </div>
      <div className={`${s.navMenu}`} ref={ref}>
        <Link
          to={"/about"}
          className={s.menuTitle}
          style={{ display: isMenuClicked ? "block" : "none" }}
        >
          About
        </Link>
        {userId ? (
          <Link
            to={`/myAlbum/${userId}`}
            className={s.menuTitle}
            style={{ display: isMenuClicked ? "block" : "none" }}
          >
            My album
          </Link>
        ) : (
          <div></div>
        )}
        {userId ? (
          <div className={s.navRight}>
            <Link
              to={`/myPage/${userId}`}
              className={s.menuTitle}
              style={{ display: isMenuClicked ? "block" : "none" }}
            >
              <div className={s.username}>
                <PersonOutlineIcon />
                {username}
              </div>
            </Link>
            <Link
              to={"/login"}
              className={s.menuTitle}
              style={{ display: isMenuClicked ? "block" : "none" }}
              onClick={() => (
                setUserId(null), removeLocalStorageData("myAlbumDropDownList")
              )}
            >
              Log out
            </Link>
          </div>
        ) : (
          <div className={s.navRight}>
            <Link
              to={"/signup"}
              className={s.menuTitle}
              style={{ display: isMenuClicked ? "block" : "none" }}
            >
              Sign up
            </Link>
            <Link
              to={"/login"}
              className={s.menuTitle}
              style={{ display: isMenuClicked ? "block" : "none" }}
            >
              Log in
            </Link>
          </div>
        )}
      </div>
      <div
        className={s.menuIcon}
        onClick={() =>
          isMenuClicked ? setIsMenuClicked(false) : setIsMenuClicked(true)
        }
      >
        {!isMenuClicked && <MenuIcon />}
        {isMenuClicked && <CloseIcon />}
      </div>
    </div>
  );
}

export default Nav;
