import React from 'react'

const Filter = ({setSearchVal,searchVal}) => {

  return (
    <>
    <div className='flex items-center justify-between'>
            <input value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)}} type="text" id="" className="w-2/4 bg-gray-50 border focus:outline-none outline-none border-gray-300 text-gray-900 font-normal tracking-wide text-[12px] rounded-lg block p-2" placeholder="Search Product By Name,Brand,Category" />
            
    </div>
    </>
  )
}

export default Filter