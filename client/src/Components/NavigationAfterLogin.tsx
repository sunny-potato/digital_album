import { Link } from "react-router-dom";
import styles from "../Styles/Navigation.module.css";
// import "../Styles/Navigation.module.css";

function NavigationAfterLogin() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navHome}>
        <Link to={"/"}>Home</Link>
      </div>
      {/* <Link to={"/about"}>About</Link> */}
      {/* <Link to={"/albumFolder"}>Folder</Link> */}
      <div className={styles.navRight}>
        <Link to={"/myAlbum"}>My album</Link>
        <Link to={"/myPage"}>My page</Link>
        <span>USERNAME</span>
      </div>
    </div>
  );
}
export default NavigationAfterLogin;
