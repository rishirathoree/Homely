import React, { useEffect, useState } from "react";

const Cards = () => {

    const [nums, setNums] = useState(0);
const finalNum = 2947;

useEffect(() => {
  const increment = () => {
    if(nums >= finalNum){return null}
    setNums((p) => Math.min(p + 20, finalNum));
  };

  const intervalID = setInterval(increment, 0.1);

  return () => {
    clearInterval(intervalID);
  };
}, [nums, finalNum]);

  return (
    <div className="grid grid-cols-5 gap-4">

      <div className="border-[1px] col-span-2 border-black/5 bg-white rounded-md">
        
        <span className="flex items-center gap-2 p-4 border-b-[1px]">
          <p className="font-medium text-[12px]">Recent Settlements</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-exclamation-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
          </svg>
        </span>

        <div className="grid grid-cols-2 p-8">
          <span className="block relative space-y-4">
            <p className="font-medium text-[10px] tabular-nums">Amount</p>
    <p className='font-semibold text-6xl tracking-tighter'>${nums}</p>

          </span>

        </div>
      </div>    
      </div>
  );
};

export default Cards;
