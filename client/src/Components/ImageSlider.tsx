import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../Styles/ImageSlider.module.css";
import { ImageSlider as ImageSliderProps } from "../Types/Folder";

function ImageSlider({
  currentImageIndex,
  imageList,
  defaultURL,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>();

  console.log("imageSlider", { currentImageIndex, currentIndex, imageList });

  useEffect(() => {
    setCurrentIndex(currentImageIndex);
  }, [currentImageIndex]);

  const showPrevImage = () => {
    if (currentIndex === 0) {
      return setCurrentIndex(imageList.length - 1);
    }
    return setCurrentIndex((currentIndex as number) - 1);
  };

  const showNextImage = () => {
    if (currentIndex === imageList.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex((currentIndex as number) + 1);
  };

  if (!currentImageIndex) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.sliderContainer}>
      <div className={s.sliderWrapper}>
        <img
          src={`${defaultURL}${imageList[currentIndex as number].uuid}`}
          className={s.testimage}
        ></img>
      </div>
      <button className={s.buttonBack} onClick={() => showPrevImage()}>
        Prev
      </button>
      <button className={s.buttonNext} onClick={() => showNextImage()}>
        Next
      </button>
    </div>
  );
}

export default ImageSlider;
