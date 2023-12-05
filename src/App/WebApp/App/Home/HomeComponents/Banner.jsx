import React from "react";
import bannerImage from "../../../../../assets/images/bannerIMage.avif";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  DotGroup,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
const Banner = () => {
    const item = Array(10).fill(1);
    const totalSlides = item.length
  return (
    <>
      <div className="">
        <CarouselProvider
          totalSlides={totalSlides} // Make it large to simulate an infinite loop
          naturalSlideWidth={100} // Set the width of your slides
          naturalSlideHeight={100} // Set the height of your slides
          isPlaying={true}
          interval={4000}
          visibleSlides={1}
        >
          <Slider className="box h-screen overflow-hidden -mb-40">
            {item.map((item, i) => {
              return (
                <Slide className="box " key={i} index={0}>
                        <img src={bannerImage} alt="" />
                </Slide>
              );
            })}
          </Slider>
        </CarouselProvider>
      </div>
    </>
  );
};

export default Banner;
