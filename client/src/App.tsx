import { useState } from "react";
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

// to do list
//1) delete album image - myalbumeidt
//2) scroll folder list when it is long - myalbumdisplay
//3) drag and drop - folder
//4) brighten of x button
//5) cancel button for album edit

function App() {
  const [username, setUsername] = useState<string | undefined>();
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Nav username={username} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/myAlbum/:userId" element={<MyAlbum />} />
            <Route path="/albumFolder/:folderId" element={<AlbumFolder />}>
              <Route path="image/:imageId" element={<EachImage />} />
            </Route>
            <Route
              path="/login"
              element={<Login setUsername={setUsername} />}
            />
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
