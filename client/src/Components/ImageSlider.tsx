import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../Styles/ImageSlider.module.css";
import { ImageSlider as ImageSliderProps } from "../Types/Folder";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

function ImageSlider({
  currentImageIndex,
  setCurrentImageIndex,
  imageList,
  defaultURL,
}: ImageSliderProps) {
  const showPrevImage = () => {
    if (currentImageIndex === 0) {
      return setCurrentImageIndex(imageList.length - 1);
    }
    return setCurrentImageIndex((currentImageIndex as number) - 1);
  };

  const showNextImage = () => {
    if (currentImageIndex === imageList.length - 1) {
      return setCurrentImageIndex(0);
    }
    return setCurrentImageIndex((currentImageIndex as number) + 1);
  };

  if (currentImageIndex === undefined) {
    return <div>Loading...</div>;
  }
  // console.log({ imageList });

  return (
    <div className={s.sliderContainer}>
      <div className={s.sliderWrapper}>
        <img
          src={`${defaultURL}${imageList[currentImageIndex].uuid}`}
          alt={`${imageList[currentImageIndex].original_name}`}
          className={s.displayedImage}
        ></img>
      </div>
      <button className={s.backButton} onClick={() => showPrevImage()}>
        <ArrowBackIosNewIcon fontSize="medium" />
      </button>
      <button className={s.nextButton} onClick={() => showNextImage()}>
        <ArrowForwardIosSharpIcon fontSize="medium" />
      </button>
    </div>
  );
}

export default ImageSlider;
