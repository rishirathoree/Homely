import React, { useEffect } from 'react'
import Tables from '../Overview/Components/Tables'
import BarChart from '../Overview/Components/BarChart'
import { GetProducts } from '../../../../../Store/Slices/Products'
import { useDispatch, useSelector } from 'react-redux'
import { AnalyticsCards, AnalyticsCardsYearly } from './Components/Index'

const Analytics = () => {

    const dispatch = useDispatch()

    useEffect(()=>{dispatch(GetProducts({ROW_COUNT:10,PAGE:1}))},[dispatch])
    
    const Products = useSelector(state=>state.Products.Getproducts)

  return (
    <div className='space-y-6'>
        <AnalyticsCards />
        <AnalyticsCardsYearly />
        {/* <BarChart /> */}
        {/* <Tables Products={Products} /> */}
    </div>
  )
}

export default Analytics