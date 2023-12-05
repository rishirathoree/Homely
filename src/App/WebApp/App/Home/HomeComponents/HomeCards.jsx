import React from 'react'

const HomeCards = () => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {Array(10).fill(1).map((item,i)=>{
        return(
          <div key={i} className='space-y-2'>
            <div className='h-80 bg-gray-100'></div>
            <span className='block'>
              <p className='font-medium text-gray-600 text-[12px]'>Product Name</p>
              <p className='font-medium text-gray-600 text-[12px]'>Product Price</p>
              <p className='font-medium text-gray-600 text-[12px]'>Product Colors</p>
              <p className='font-medium text-green-600 text-[12px]'>Shipping In 2 Days</p>
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default HomeCards