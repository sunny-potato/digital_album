// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import AlbumFolder from "./Pages/AlbumFolder";
import MyAlbum from "./Pages/MyAlbum";

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
          <Route path="/albumFolder/*" element={<AlbumFolder />} />
          {/* <Route path="/*" element={<div>no found page</div>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
