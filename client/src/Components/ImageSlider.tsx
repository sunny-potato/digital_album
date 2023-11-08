import React, { useRef, useEffect, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import s from "../Styles/ImageSlider.module.css";
import { ImageSlider as ImageSliderProps } from "../Types/Folder";

// to do list
// fit image by keeping aspect-ratio
// change url without reload

function ImageSlider({
  currentImageIndex,
  imageList,
  defaultURL,
}: ImageSliderProps) {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={imageList.length}
      className={s.sliderContainer}
    >
      <Slider className={s.sliderWrapper}>
        {imageList.length !== 0 &&
          imageList.map((image, index) => (
            <Slide key={index} index={index} innerClassName={s.sliderInner}>
              <img
                src={`${defaultURL}${image.uuid}`}
                className={s.currentImg}
              />
            </Slide>
          ))}
      </Slider>
      <ButtonBack className={s.buttonBack}>Back</ButtonBack>
      <ButtonNext className={s.buttonNext}>Next</ButtonNext>
    </CarouselProvider>
  );
}

export default ImageSlider;
