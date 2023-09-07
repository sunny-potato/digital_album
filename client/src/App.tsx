import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./Styles/App.css";
import NavigationBeforeLogin from "./Components/NavigationBeforeLogin";
import NavigationAfterLogin from "./Components/NavigationAfterLogin";
import Home from "./Pages/Home";
import AlbumFolder from "./Pages/AlbumFolder";
import MyAlbum from "./Pages/MyAlbum";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import NotFoundPage from "./Pages/NotFound";

function App() {
  const [userData, setUserData] = useState<{ username: string }>();
  // console.log({ userData });
  // console.log(userData ? true : false);

  // useEffect(() => {}, [userData]);
  return (
    <>
      <BrowserRouter>
        {userData ? <NavigationAfterLogin /> : <NavigationBeforeLogin />}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
            path="/myAlbum/:userId/albumFolder/*"
            element={<AlbumFolder />}
          /> */}
          <Route path="/myAlbum/:userId" element={<MyAlbum />} />
          <Route path="/albumFolder/:folderId" element={<AlbumFolder />} />
          <Route path="/login" element={<Login setUserData={setUserData} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
