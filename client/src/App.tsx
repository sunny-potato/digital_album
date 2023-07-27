// import { useEffect, useState } from "react";
import Navigation from "./Components/Navigation";
import DigitalAlbum from "./Pages/DigitalAlbum";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/digitalAlbum" element={<DigitalAlbum />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
