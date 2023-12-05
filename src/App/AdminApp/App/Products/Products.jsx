import React, { useEffect, useState } from 'react'
import Tables from '../Dashboard/Overview/Components/Tables'
import { useDispatch, useSelector } from 'react-redux'
import { GetProducts } from '../../../../Store/Slices/Products'
import DatePickerDropdown from '../../AdminComponents/DatePickerDropdown'

const Products = () => {

    const dispatch = useDispatch()

    const [searchVal,setSearchVal] = useState('')

    
    const Products = useSelector(state=>state.Products.Getproducts)
    
    const [dates,setDates] = useState(null)

    useEffect(()=>{dispatch(GetProducts({
      ROW_COUNT:10,
      PAGE:1,
      IS_SEARCH:searchVal,
      'date-from':dates?.from,
      'date-to':dates?.to
    }))},[dispatch,searchVal,dates])
    

  return (
    <>
    <div className='space-y-6'>

      {/* filter */}
    <div className='flex items-center justify-between'>
      <input value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)}} type="text" id="" className="w-2/4 bg-gray-50 border focus:outline-none outline-none border-gray-300 text-gray-900 font-normal tracking-wide text-[8px] rounded-lg block p-2" placeholder="Search Product By Name,Brand,Category" />
      <DatePickerDropdown state={dates} setState={setDates} />      
    </div>
    <Tables Products={Products} />
    </div>
    </>
  )
}

export default Products