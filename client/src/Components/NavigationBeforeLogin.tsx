import { Link } from "react-router-dom";
import styles from "../Styles/Navigation.module.css";
// import "../Styles/Navigation.module.css";

function NavigationBeforeLogin() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navHome}>
        <Link to={"/"}>Home</Link>
      </div>
      {/* <Link to={"/about"}>About</Link> */}
      {/* <Link to={"/albumFolder"}>Folder</Link> */}
      <div className={styles.navRight}>
        {/* <Link to={"/myAlbum"}>My album</Link> */}
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Sign up</Link>
      </div>
    </div>
  );
}

export default NavigationBeforeLogin;
