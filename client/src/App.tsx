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
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import FindAccount from "./Pages/FindAccount";

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
            <Route path="/myPage/:userId" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/findAccount" element={<FindAccount />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
