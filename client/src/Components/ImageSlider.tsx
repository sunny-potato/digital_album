import React, { useRef, useEffect } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import s from "../Styles/ImageSlider.module.css";
import upload from "../Images/upload.png";

type ImageSlider = {
  currentImageIndex: number | undefined;
  imageList: Image[];
  defaultURL: string;
};

function ImageSlider({
  currentImageIndex,
  imageList,
  defaultURL,
}: ImageSlider) {
  // console.log(currentImage);
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={3}
      className={s.sliderContainer}
    >
      <Slider className={s.sliderWrapper}>
        <Slide index={0} innerClassName={s.sliderInner}>
          <img src={currentImage} className={s.currentImg} />
        </Slide>
        <Slide index={1}>I am the second Slide.</Slide>
        <Slide index={2}>I am the third Slide.</Slide>
      </Slider>
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
    </CarouselProvider>
  );
}

export default ImageSlider;
