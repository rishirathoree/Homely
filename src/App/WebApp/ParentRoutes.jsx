import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./App/Home/Home";
import Login from "./App/Auths/Login/Login";
import Signup from "./App/Auths/Signup/Signup";
import ProductsDetails from "./App/Products/ProductsDetails/ProductsDetails";

const ParentRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/products/:id" element={<ProductsDetails />} />
      </Routes>
    </>
  );
};

export default ParentRoutes;
