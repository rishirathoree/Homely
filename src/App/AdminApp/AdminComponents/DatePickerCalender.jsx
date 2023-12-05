import React, { useEffect, useState } from 'react';

const DatePickerCalender = () => {
  const [showDatesPop, setShowDatesPop] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [getCounts, setGetCounts] = useState([]);
  const [dates, setDates] = useState({
    from: null,
    to: null,
  });

  const getDatesArrayForCurrentMonth = () => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const datesArray = [];

    for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
      datesArray.push(new Date(date));
    }
    return datesArray;
  };

  const monthsDates = getDatesArrayForCurrentMonth();

  const handleSelectDt = (item) => {
    if (dates.from && dates.to) {
      setDates({ from: null, to: null });
    } else if (dates.from && item >= new Date(dates.from)) {
      setDates((prevDates) => ({ ...prevDates, to: item.toISOString().split('T')[0] }));
      setShowDatesPop(false)
    } else {
      setDates((prevDates) => ({ ...prevDates, from: item.toISOString().split('T')[0] }));
    }
  };
  const monthName = new Date().toLocaleString('default', { month: 'long' });
  console.log(monthName);
  

  return (
    <>
      <div className='relative'>
        <button onClick={() => setShowDatesPop((prev) => !prev)} className='text-[10px] text-white bg-gradient-to-t from-black to-black/90 p-2'>
          Pick Date
        </button>
        <div
          className={`font-semibold text-sm w-80 h-min rounded-xl shadow-new top-10 absolute z-50 duration-200 
          ${
            showDatesPop ? 'visible opacity-100 translate-y-0 scale-100 origin-top translate-x-0' : 'invisible opacity-0 -translate-y-8 origin-top scale-50 -translate-x-20'
          }
          `}>
            <p className='p-4 text-[12px] font-semibold'>{monthName}</p>
            <p className='p-4 text-[12px] font-semibold'>{dates.to && dates.from && dates.to - dates.from}</p>
          <div className='grid grid-cols-7 h-full justify-between items-center gap-4 p-4'>
            {monthsDates.map((item, idx) => (
              <p
              onClick={()=>{handleSelectDt(item)}}
                className={`select-none font-semibold text-[10px] flex duration-300 items-center justify-center hover:bg-black hover:text-white rounded-full w-8 h-8
                ${item.getDate() === new Date().getDate() ? 'ring-1 bg-gray-100 ring-black/10' : ''}
                ${item.getDate() < new Date().getDate() ? 'text-gray-100' : ''}
                 ${dates.from === item.toISOString().split('T')[0] ? 'bg-blue-500/40' : ''}
                 ${dates.to === item.toISOString().split('T')[0] ? 'bg-red-500/40' : ''}
                 `}
                key={idx}>
                {item.getDate()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DatePickerCalender;
