// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import DigitalAlbum from "./Pages/DigitalAlbum";
import MyAlbum from "./Pages/MyAlbum";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/digitalAlbum" element={<DigitalAlbum />}></Route>
          <Route path="/myAlbum" element={<MyAlbum />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
