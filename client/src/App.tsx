import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./AppContext";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import AlbumFolder from "./Pages/AlbumFolder";
import MyAlbum from "./Pages/MyAlbum";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import NotFoundPage from "./Pages/NotFound";
import EachImage from "./Pages/EachImage";
import MyPage from "./Pages/MyPage";
import About from "./Pages/About";

// things to do
// 2) update code of calculateFolderSize
// 3) show info on pic -> pic name, saved data, dimention? size?
// 4) tool tip using mui
// 5) move image to another file
// 6) share image to social media
// 7) fetch images from database quickly by using google CDN
// 8) loading ui while uploading images

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/myAlbum/:userId" element={<MyAlbum />} />
            <Route path="/albumFolder/:folderId" element={<AlbumFolder />}>
              <Route path="image/:imageId" element={<EachImage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/myPage/:userId" element={<MyPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
