// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./Styles/App.css";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import AlbumFolder from "./Pages/AlbumFolder";
import MyAlbum from "./Pages/MyAlbum";
import NotFoundPage from "./Pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
            path="/myAlbum/:userId/albumFolder/*"
            element={<AlbumFolder />}
          /> */}
          <Route path="/myAlbum/:userId" element={<MyAlbum />} />
          <Route path="/albumFolder/:folderId" element={<AlbumFolder />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
