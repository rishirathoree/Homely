import React, { useEffect, useState } from "react";
import SelecteDropdown from "../../../Components/SelecteDropdown";
import perfumeImg from "../../../../../assets/images/perfume.webp";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleProduct } from "../../../../../Store/Slices/Products";
import HomeCards from '../../Home/HomeComponents/HomeCards'

const ProductsDetails = () => {
  const [selectedSize, setSelectedSize] = useState("");

  const [selectedQuality, setSelectedQuality] = useState("");

  const qualities = ["Low Quality", "Medium Quality", "High Quality"];

  const Sizes = ["Low ", "Medium ", "High "];

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetSingleProduct(id));
  }, [dispatch, id]);

  const { pending, data, error } = useSelector(
    (state) => state.Products.GetSingleProduct
  );

  return (
    <>
      {pending
      ?
      <div className="grid grid-cols-2 gap-4 w-full h-screen">
        <div className="p-12 flex gap-8 w-full">
          <div className="space-y-4">
          {Array(4)
              .fill(1)
              .map((_, idx) => {
                return (
                  <span key={idx} className="w-32 bg-gray-300 animate-pulse block h-32"></span>
                );
              })}
          </div>
          <div className="h-full bg-gray-300 animate-pulse w-full"></div>
        </div>
        <div className="p-12 w-full space-y-4 overflow-hidden">
        {Array(6)
              .fill(1)
              .map((_, idx) => {
                return (
                  <span key={idx} className={`w-full bg-gray-300 animate-pulse block ${idx % 2 === 0 ? 'h-12' : 'h-40'}`}></span>
                );
              })}
        </div>
      </div>
      :
      <div className="p-12 grid grid-cols-2 gap-4">
        <div className="flex gap-4 h-screen">
          <div className="gap-4 space-y-4 flex item space-between flex-col">
            {Array(4)
              .fill(1)
              .map((item, idx) => {
                return (
                  <span key={idx} className="w-32 bg-gray-300 block h-full">
                    <img
                      src={perfumeImg}
                      alt={perfumeImg}
                      className="w-full h-full object-cover"
                    />
                  </span>
                );
              })}
          </div>
          <div className="w-full bg-gray-300 ">
            <img
              src={perfumeImg}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>

        <div className="space-y-6 p-8">
          <p className="font-bold text-lg">{data?.productName}</p>

          <p className="font-bold text-[12px]">Type : {data?.perfumeType}</p>

          <p className="font-bold text-[12px] space-x-1">
            <span>Price : </span> <span className="line-through text-gray-500">${(data?.price / 2).toFixed(2)} </span>
            <span> ${data?.price}</span>
          </p>

          <p className="font-medium text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. Libero quasi
            obcaecati id dolore, vel quis voluptates quos dolorum aperiam quas
            ipsa ipsam voluptatibus voluptas eveniet deserunt ad consequatur
            officia. Vel!
          </p>
          <SelecteDropdown
            Dropfor={"Select Quality"}
            data={qualities}
            setState={setSelectedQuality}
            state={selectedQuality}
          />

          <SelecteDropdown
            Dropfor={"Select Size"}
            data={Sizes}
            setState={setSelectedSize}
            state={selectedSize}
          />

          <span className="block space-y-4">
            <p className="text-[12px] font-semibold">Specifications</p>
            <ul className="space-y-2">
              <li className="text-[10px] font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </li>
              <li className="text-[10px] font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </li>
              <li className="text-[10px] font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </li>
              <li className="text-[10px] font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </li>
              <li className="text-[10px] font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </li>
            </ul>
          </span>

          <button className="p-3 bg-black text-[12px] rounded font-semibold w-full text-white">Buy Now</button>

        </div>
      </div>
      }
    </>
  );
};

export default ProductsDetails;
