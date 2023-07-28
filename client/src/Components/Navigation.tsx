import { Link } from "react-router-dom";
import styles from "../Styles/Navigation.module.css";
// import "../Styles/Navigation.module.css";

function Navigation() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navHome}>
        <Link to={"/"}>Home</Link>
      </div>
      {/* <Link to={"/about"}>About</Link> */}
      <Link to={"/digitalAlbum"}>Digital album</Link>
      <Link to={"/myAlbum"}>My album</Link>
      {/* <Link to={"/login"}>Login</Link> */}
      {/* <Link to={"signup"}>Sign up</Link> */}
    </div>
  );
}

export default Navigation;
