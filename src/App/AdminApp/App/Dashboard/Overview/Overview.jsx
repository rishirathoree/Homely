import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../../../../../Store/Slices/Products";
import { OverViewCards } from "./Components/OverviewIndex";

const Overview = () => {

    const dispatch = useDispatch()

    useEffect(()=>{dispatch(GetProducts({ROW_COUNT:10,PAGE:1}))},[dispatch])
    
    const Products = useSelector(state=>state.Products.Getproducts)

    return (
        <div className="space-y-4 max-h-full min-h-screen">
            <OverViewCards />
        </div>
  );
};

export default Overview;
