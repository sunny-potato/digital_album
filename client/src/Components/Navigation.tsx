import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <Link to={"/"}>Home</Link>
      {/* <Link to={"/about"}>About</Link> */}
      <Link to={"/digitalAlbum"}>Digital album</Link>
      {/* <Link to={"/login"}>Login</Link> */}
      {/* <Link to={"signup"}>Sign up</Link> */}
    </>
  );
}

export default Navigation;
