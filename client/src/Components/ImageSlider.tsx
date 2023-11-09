import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../Styles/ImageSlider.module.css";
import { ImageSlider as ImageSliderProps } from "../Types/Folder";

function ImageSlider({
  currentImageIndex,
  imageList,
  defaultURL,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  console.log(imageList[currentIndex]);

  useEffect(() => {
    if (imageList.length !== 0 && currentImageIndex) {
      setCurrentIndex(currentImageIndex);
    }
  }, []);

  const nextImage = () => {
    if (currentIndex === imageList.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className={s.sliderContainer}>
      <div className={s.sliderWrapper}>
        <img
          src={`${defaultURL}${imageList[currentIndex].uuid}`}
          className={s.testimage}
        ></img>
      </div>
      <button className={s.buttonBack}>Prev</button>
      <button className={s.buttonNext} onClick={() => nextImage()}>
        Next
      </button>
    </div>
  );
}

export default ImageSlider;
