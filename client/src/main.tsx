import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./Styles/Main.css";
import { register } from "swiper/element/bundle";

register();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
