import s from "../Styles/Home.module.css";
import MemoryImages from "../Components/Animation/MemoryImages";

function Home() {
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
