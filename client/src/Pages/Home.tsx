import { useLocation } from "react-router-dom";
function Home() {
  const location = useLocation();
  // location.state =null -> no logined user
  const userData = location.state;
  console.log(userData);
  if (userData === null) {
    return;
  }
  return (
    <>
      {userData === null ? (
        <div>shasfasfasfasfow?</div>
      ) : (
        <div>logined user</div>
      )}
    </>
  );
}

export default Home;
