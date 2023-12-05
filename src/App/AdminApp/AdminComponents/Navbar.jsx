import React, { useEffect, useRef } from "react";
import Notifications from "./Notifications";

const Navbar = () => {
  return (
    <>
    <div
    className={`p-8 flex-col fixed w-4/5 top-0 right-0 justify-end items-end flex bg-white z-50 border-black/5`}>
    <Notifications />
    </div>
    </>
  );
};

// const side = useRef()
// useEffect(()=>{console.log(side.current.offsetHeight)},[])
export default Navbar;
