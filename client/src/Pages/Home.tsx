import { useLocation, useNavigate } from "react-router-dom";
import s from "../Styles/Home.module.css";
import MemoryImages from "../Components/Animation/MemoryImages";

function Home() {
  return (
    <div className={s.pageContainer}>
      <div className={s.contentContainer}>
        <div className={s.pageTitle}>
          <div>Keep</div>
          <div>Your memories</div>
          <div>Alive</div>
        </div>
        <div className={s.pageImage}>
          <MemoryImages />
        </div>
      </div>
    </div>
  );
}

export default Home;
