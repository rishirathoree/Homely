import React, { useEffect, useRef, useState } from "react";

const DatePickerDropdown = ({ state, setState }) => {

  const poppedUpBox = useRef();

  const [toggle, setToggle] = useState(false);

  const [selectedVal,setSelectedVal] = useState(null)
  
  useEffect(() => {
    const toggler = (e) => {
      if (poppedUpBox.current && !poppedUpBox.current.contains(e.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", toggler);

    return () => {
      document.removeEventListener("mousedown", toggler);
    };
  }, []);

  function formatDateOnly(till) {
    const daysAgo = new Date(new Date());
    daysAgo.setDate(new Date().getDate() - till);
    const isoString = daysAgo.toISOString().split("T")[0];
    return isoString;
  }

  const dates = [
    { name: "today", date: 0 },
    { name: "Yesterday", date: 1 },
    { name: "7 Days Ago", date: 7 },
    { name: "30 Days Ago", date: 30 },
  ];

  console.log(state)
  return (
    <div className="relative flex items-center gap-2">
      <p className="select-none font-normal text-[10px]">{state && `${state.from} to ${state.to}`}</p>
      <i onClick={()=>{
        setState(null)
        setSelectedVal(null)
        }} className={`bx bx-x absolute duration-700 p-[1px] rounded-full ring-black shadow-new -top-2 -right-2 ${state ? 'visible opacity-100' : 'invisible opacity-0'}`}></i>
      <p
        onClick={() => {
          setToggle((p) => !p);
        }}
        className="overflow-hidden cursor-pointer capitalize select-none font-semibold text-[10px] px-3 py-2 rounded-md  shadow-new"
      >
        {selectedVal ? selectedVal : 'Select Value'}
      </p>
      <div
        ref={poppedUpBox}
        className={`bg-white w-28  rounded-md absolute shadow-new shadow-md top-[38px] z-50 right-0 space-y-1 duration-100  
        ${toggle ? "visible opacity-100 scale-100 translate-y-0 translate-x-0" : "-translate-y-8 translate-x-8 scale-75 invisible opacity-0"}`}
      >
        {dates.map((item, i) => {
          return (
            <p
              key={i}
              className="font-medium  hover:bg-gray-100/80 px-3 py-2 text-[10px] capitalize select-none cursor-pointer"
              onClick={() => {
                const from = formatDateOnly(item.date);
                const to = new Date().toISOString().split("T")[0];
                setSelectedVal(item.name)
                setState({ from, to });
                setToggle(false);
              }}
            >
              {item.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default DatePickerDropdown;
