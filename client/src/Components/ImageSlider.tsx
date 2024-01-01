import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../Styles/ImageSlider.module.css";
import { ImageSlider as ImageSliderProps } from "../Types/Folder";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { pink } from "@mui/material/colors";
import shadows from "@mui/material/styles/shadows";

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

  return (
    <div className={s.sliderContainer}>
      <div className={s.sliderWrapper}>
        <img
          src={`${defaultURL}${imageList[currentImageIndex].uuid}`}
          alt={`${imageList[currentImageIndex].original_name}`}
          className={s.displayedImage}
        ></img>
      </div>
      <ArrowBackIosNewIcon
        fontSize="medium"
        sx={[
          {
            "&:hover": {
              opacity: 0.5,
            },
          },
          {
            "&:active": {
              opacity: 0.8,
            },
          },
        ]}
        className={s.backButton}
        onClick={() => showPrevImage()}
      />
      <ArrowForwardIosSharpIcon
        fontSize="medium"
        sx={[
          {
            "&:hover": {
              opacity: 0.5,
            },
          },
          {
            "&:active": {
              opacity: 0.8,
            },
          },
        ]}
        className={s.nextButton}
        onClick={() => showNextImage()}
      />
    </div>
  );
}

export default ImageSlider;
