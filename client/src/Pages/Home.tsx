import { useLocation, useNavigate } from "react-router-dom";
import s from "../Styles/Home.module.css";
import { UserContext } from "../AppContext";
import { useContext } from "react";
import MemoryImages from "../Components/Animation/MemoryImages";

function Home() {
  // const { userId } = useContext(UserContext);

  return (
    <div className={s.pageContainer}>
      <div className={s.contentContainer}>
        <div className={s.pageTitle}>
          <div>Keep</div>
          <div>your memories</div>
          <div>alive</div>
        </div>
        <div className={s.pageImage}>
          <MemoryImages />
        </div>
      </div>
    </div>
  );
}

export default Home;
