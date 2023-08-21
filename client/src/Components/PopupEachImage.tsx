"use client";
import { useEffect, useRef } from "react";
import styles from "../Styles/PopupEachImage.module.css";
import { Image } from "../Types/Folder";
import { register } from "swiper/element/bundle";
register();

type Props = {
  clickedImage: Image;
};

function PopupEachImage(props: Props) {
  const imageInfo = props.clickedImage;
  console.log(imageInfo);
  // const swiperElRef = useRef(null);

  useEffect(() => {
    register();
  }, []);

  return (
    <>
      <div className={styles.popupBackgoundContainer}>
        <div className={styles.popupContainer}>
          <swiper-container
            slides-per-view="3"
            grid-rows="3"
            mousewheel-force-to-axis="true"
          >
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
          </swiper-container>
          <button>X</button>
        </div>
      </div>
    </>
  );
}

export default PopupEachImage;
