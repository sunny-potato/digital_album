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
  const [screenSize, setScreenSize] = useState<number>();

  console.log("window.innerWidth : ", window.innerWidth);
  console.log("isMenuClicked : ", isMenuClicked);
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

  useEffect(() => {
    const screenSizeHandler = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", screenSizeHandler);
    return () => {
      window.removeEventListener("resize", screenSizeHandler);
    };
    // const screenSize = window.innerWidth;
    // if (screenSize >= 1000) {
    //   setIsMenuClicked(true);
    // }
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
          onClick={() => setIsMenuClicked(false)}
        >
          About
        </Link>
        {userId ? (
          <Link
            to={`/myAlbum/${userId}`}
            className={s.menuTitle}
            style={{ display: isMenuClicked ? "block" : "none" }}
            onClick={() => setIsMenuClicked(false)}
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
              onClick={() => setIsMenuClicked(false)}
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
                setUserId(null),
                removeLocalStorageData("myAlbumDropDownList"),
                setIsMenuClicked(false)
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
              onClick={() => setIsMenuClicked(false)}
            >
              Sign up
            </Link>
            <Link
              to={"/login"}
              className={s.menuTitle}
              style={{ display: isMenuClicked ? "block" : "none" }}
              onClick={() => setIsMenuClicked(false)}
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
