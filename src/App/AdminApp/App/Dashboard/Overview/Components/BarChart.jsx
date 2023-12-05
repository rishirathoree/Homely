import React from "react";

const BarChart = () => {
    const weeklyChartData = [
        { day: 'Sunday', value: 20 },
        { day: 'Monday', value: 7 },
        { day: 'Tuesday', value: 15 },
        { day: 'Wednesday', value: 25 },
        { day: 'Thursday', value: 30 },
        { day: 'Friday', value: 13 },
        { day: 'Saturday', value: 22 },
      ];
      
      const calculatePercentage = (value) => {
        return (value / 15) * 100 + 'px';
      };
      
  return (
    <>
      <div className="space-y-4 bg-white ring-1 ring-black/5 w-1/2 p-6 rounded-lg">
      <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-xl dark:text-white">Get back to growth with  CRM.</h1>

        <div className={`grid pl-4 grid-cols-7 relative items-end gap-4 `}>
        {weeklyChartData.map((item,i)=>{
            return(
                <div
                key={i}
                style={{ height: `${calculatePercentage(item.value)}` }}
                className={` drop-shadow-sm ring-1 ring-black/5 w-12 rounded-t-sm ${item.value > 15 ? 'bg-gradient-to-t from-violet-500 to-violet-300' : 'bg-gradient-to-t from-violet-200 to-violet-300' } `}></div>
            )
        })}
        </div>

        <div className="space-x-2">
          <span className="text-[8px] relative before:w-2 before:h-2 before:rounded-full before:absolute before:bg-gradient-to-t from-violet-500 to-violet-300 before:left-0 before:top-[1px] pl-4">Good Days</span>
          <span className="text-[8px] relative before:w-2 before:h-2 before:rounded-full before:absolute before:bg-gradient-to-t from-violet-200 to-violet-300 before:left-0 before:top-[1px] pl-4">Weak Days</span>
        </div>

        <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
      </div>
    </>
  );
};

export default BarChart;
