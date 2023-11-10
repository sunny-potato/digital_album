import { Link } from "react-router-dom";
import s from "../Styles/Navigation.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../AppContext";

function Nav({ username }: { username: string | undefined }) {
  const { userId } = useContext(UserContext);
  console.log({ userId });
  return (
    <div className={s.navContainer}>
      <div className={s.navHome}>
        <Link to={`/`}>Home</Link>
      </div>
      {userId ? (
        <div className={s.navRight}>
          <Link to={`/myAlbum/${userId}`}>My album</Link>
          <Link to={`/myPage/${userId}`}>Hello, {username}</Link>
        </div>
      ) : (
        <div className={s.navRight}>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Sign up</Link>
        </div>
      )}
    </div>
  );
}

export default Nav;
