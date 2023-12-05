import axios from "axios";
import React, { useEffect, useState } from "react";

const Cards = () => {

  const [totalNumbersAll,setTotalNumbersAll] = useState(null)
  useEffect(()=>{
    axios.get('http://localhost:8000/Dashboard').then((res)=>{setTotalNumbersAll(res.data.totals)}).catch((err)=>{console.log(err)})
  },[])
  
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="text-[12px] p-4 rounded-xl bg-white space-y-4 col-span-3 shadow-sm">
        <p className="font-semibold text-2xl tracking-tighter">Total Products</p>
        <p className="font-semibold text-6xl tracking-tighter">{totalNumbersAll ? totalNumbersAll.productTotal : 0}</p>
      </div>
      <div className="text-[12px] p-4 rounded-xl bg-white space-y-4 col-span-2 shadow-sm">
        <p className="font-semibold text-2xl tracking-tighter">Total Orders</p>
        <p className="font-semibold text-6xl tracking-tighter">0</p>
      </div>
      <div className="text-[12px] p-4 rounded-xl bg-white space-y-4 col-span-2 shadow-sm">
        <p className="font-semibold text-2xl tracking-tighter">Total Users</p>
        <p className="font-semibold text-6xl tracking-tighter">{totalNumbersAll ? totalNumbersAll.UsersTotal : 0}</p>
      </div>
      <div className="text-[12px] p-4 rounded-xl bg-white space-y-4 col-span-3 shadow-sm">
        <p className="font-semibold text-2xl tracking-tighter">Total Categories</p>
        <p className="font-semibold text-6xl tracking-tighter">{totalNumbersAll ? totalNumbersAll.catgeoriesTotal : 0}</p>
      </div>
    </div>
  );
};

export default Cards;
