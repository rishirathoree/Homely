import React, { useEffect, useState } from 'react'

const YearlyChart = () => {
  const yearlyChartData = [
    { month: 'January', value: 120 },
    { month: 'February', value: 87 },
    { month: 'March', value: 105 },
    { month: 'April', value: 125 },
    { month: 'May', value: 130 },
    { month: 'June', value: 113 },
    { month: 'July', value: 122 },
    { month: 'August', value: 95 },
    { month: 'September', value: 110 },
    { month: 'October', value: 95 },
    { month: 'November', value: 80 },
    { month: 'December', value: 105 },
  ];
  
    
    const calculatePercentage = (value) => {
      return (value / 40) * 100 + 'px';
    };
    const yearGrowthTotal = yearlyChartData.reduce((acc,item)=>{
      return acc + item.value
    },0)

    const [total,setTotal] = useState(0)
    
    useEffect(() => {
      const increment = () => {
        if(total >= yearGrowthTotal){return null}
        setTotal((p) => Math.min(p + 12, yearGrowthTotal));
      };
    
      const intervalID = setInterval(increment, 1);
    
      return () => {
        clearInterval(intervalID);
      };
    }, [total, yearGrowthTotal]);

return (
  <>
    <div className="space-y-4 bg-white ring-1 ring-black/5 p-6 rounded-lg">
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-white capitalize">Sales<span className="text-violet-600 dark:text-blue-500 mx-1 ">Growth</span>Throughout year</h1>
    <p className='font-semibold text-6xl tracking-tighter'>${total}</p>

      <div className={`flex items-end justify-between relative gap-[8px]`}>
      {yearlyChartData.map((item,i)=>{
          return(
            <>
            <div
            key={i}
            style={{ height: `${calculatePercentage(item.value)}` }}
            className={`rounded-t-md relative drop-shadow-sm ring-1 ring-black/5 w-full ${item.value > 100 ? 'bg-gradient-to-t from-violet-500 to-violet-300' : 'bg-gradient-to-t from-violet-200 to-violet-300' } `}></div>
            </>
          )
        })}
        
        </div>

      <div className="space-x-2">
        <span className="text-[8px] relative before:w-2 before:h-2 before:rounded-full before:absolute before:bg-gradient-to-t from-violet-500 to-violet-300 before:left-0 before:top-[1px] pl-4">Good Months</span>
        <span className="text-[8px] relative before:w-2 before:h-2 before:rounded-full before:absolute before:bg-gradient-to-t from-violet-200 to-violet-300 before:left-0 before:top-[1px] pl-4">Weak Months</span>
      </div>

      <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
    </div>
  </>
);
};
export default YearlyChart