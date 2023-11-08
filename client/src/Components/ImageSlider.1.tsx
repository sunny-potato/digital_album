import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import s from "../Styles/ImageSlider.module.css";

export function ImageSlider() {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={3}
      className={s.test}
    >
      <Slider>
        <Slide index={0} className={s.slide}>
          <Image />
        </Slide>
        <Slide index={1}>I am the second Slide.</Slide>
        <Slide index={2}>I am the third Slide.</Slide>
      </Slider>
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
    </CarouselProvider>
  );
}
