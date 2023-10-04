import { Link } from "react-router-dom";
import styles from "../Styles/Navigation.module.css";
import { UserData } from "../Types/Login";
// import "../Styles/Navigation.module.css";
// type UserData = { username: string };

function NavigationAfterLogin({ userData }: { userData: UserData }) {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navHome}>
        <Link to={`/`}>Home</Link>
      </div>
      {/* <Link to={"/about"}>About</Link> */}
      {/* <Link to={"/albumFolder"}>Folder</Link> */}
      <div className={styles.navRight}>
        <Link to={`/myAlbum/${userData.userId}`}>My album</Link>
        <Link to={"/myPage"}>User:{userData.username}</Link>
      </div>
    </div>
  );
}
export default NavigationAfterLogin;
