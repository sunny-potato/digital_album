import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBeforeLogin from "./Components/NavigationBeforeLogin";
import NavigationAfterLogin from "./Components/NavigationAfterLogin";
import Home from "./Pages/Home";
import AlbumFolder from "./Pages/AlbumFolder";
import MyAlbum from "./Pages/MyAlbum";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import NotFoundPage from "./Pages/NotFound";
import { UserData } from "./Types/Login";
import EachImage from "./Pages/EachImage";
// import ImageSlider from "./Components/ImageSlider";

function App() {
  const [userData, setUserData] = useState<UserData>();
  return (
    <>
      <BrowserRouter>
        {userData ? (
          <NavigationAfterLogin userData={userData} />
        ) : (
          <NavigationBeforeLogin />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myAlbum/:userId" element={<MyAlbum />} />
          <Route path="/albumFolder/:folderId" element={<AlbumFolder />}>
            <Route path="image/:imageId" element={<EachImage />} />
          </Route>
          <Route path="/login" element={<Login setUserData={setUserData} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
