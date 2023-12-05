import React, { useEffect } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  DotGroup,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import sofaImage from "../../../../../assets/images/sofaCtg.avif";
import { useDispatch, useSelector } from "react-redux";
import { GetCategories } from "../../../../../Store/Slices/Categories";

const Categories = () => {

  const dispatch = useDispatch()

  useEffect(()=>{dispatch(GetCategories({action:'GET_CATEGORIES'}))},[dispatch])

  const CategoriesState = useSelector(state=>state.Category.Categories)

  const {pending,data,error} = CategoriesState

  const totalSlides = data?.length;

  return (
    <CarouselProvider
      totalSlides={totalSlides}
      naturalSlideWidth={100}
      naturalSlideHeight={100}
      isPlaying={true}
      interval={1000}
      visibleSlides={5}
    >
      <Slider className="box">
        {data.map((item, i) => {
          return (
            <Slide className="box" key={i} index={0}>
              <div className="space-y-4  mx-1 flex items-center flex-col text-center">
              <div className="w-40 h-40 overflow-hidden flex items-center justify-center backdrop-blur-lg"><img src={item.images[0]?.originalname} className="mix-blend-multiply w-3/5 h-3/5 object-cover" alt="" /></div>
              <p className="font-medium text-[12px] text-center">{item.name}</p>
              </div>
            </Slide>
          );
        })}
      </Slider>
    </CarouselProvider>
  );
};

export default Categories;
