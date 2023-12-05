import React, { useEffect } from 'react'
import { CatgeoryTable } from './CategoriesComponents/CategoryIndex'
import { useDispatch, useSelector } from 'react-redux'
import { GetCategories } from '../../../../../Store/Slices/Categories'

const Categories = () => {

    const dispatch = useDispatch()

    useEffect(()=>{dispatch(GetCategories({action:'GET_CATEGORIES'}))},[])

    const ctg = useSelector(state=>state.Category.Categories)

  return (
    <>
    <CatgeoryTable Category={ctg} />
    </>
  )
}

export default Categories