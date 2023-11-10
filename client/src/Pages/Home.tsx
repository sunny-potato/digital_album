import { useLocation, useNavigate } from "react-router-dom";
import s from "../Styles/Home.module.css";
import { UserContext } from "../AppContext";
import { useContext } from "react";

function Home() {
  const { userId } = useContext(UserContext);
  return (
    <>
      {userId ? (
        <div style={{ padding: "100px" }}>Homew with logined user</div>
      ) : (
        <div style={{ padding: "100px" }}>Homew without logined user</div>
      )}
    </>
  );
}

export default Home;
