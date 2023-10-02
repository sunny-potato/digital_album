import { useLocation } from "react-router-dom";
import s from "../Styles/Home.module.css";
function Home() {
  const location = useLocation();
  // location.state =null -> no logined user
  console.log(location);
  const userData = location.state;
  // console.log(userData);
  if (userData === null) {
    return;
  }
  return (
    <>
      {userData === null ? (
        <div>shasfasfasfasfow?</div>
      ) : (
        <div className={s.test}>logined user</div>
      )}
    </>
  );
}

export default Home;
