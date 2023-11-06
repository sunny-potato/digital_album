import { useEffect, useRef } from "react";
// import styles from "../Styles/PopupEachImage.module.css";
import { Image } from "../Types/Folder";
import { register } from "swiper/element/bundle";
import { useParams } from "react-router-dom";
import s from "../Styles/ImageSlider.module.css";

type Props = {
  clickedImage: Image;
};

function ImageSlider() {
  console.log(useParams());
  console.log("image is clicked");

  return (
    <>
      <div className={s.test}>ImageSlider page</div>
    </>
  );
}

export default ImageSlider;
