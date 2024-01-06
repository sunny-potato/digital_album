import { useLocation, useNavigate } from "react-router-dom";
import s from "../Styles/Home.module.css";
import { UserContext } from "../AppContext";
import { useContext } from "react";
import MemoryImages from "../Components/Animation/MemoryImages";

function Home() {
  const { userId } = useContext(UserContext);
  return (
    <>
      {userId ? (
        <div style={{ padding: "100px" }}>Home with logined user</div>
      ) : (
        <div className={s.pageContainer}>
          <MemoryImages />
        </div>
      )}
    </>
  );
}

export default Home;
