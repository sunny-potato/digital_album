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
// 1) save data when save button clicked (seperated data)
// 2) sort & filter in my album
// 3) sort & filter in folder
// 4) show info on pic -> pic name, saved data, dimention? size?
// 5) share image to social media
// 6) move to another file

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
