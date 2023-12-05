import React, { useEffect } from 'react'
import { SubcategoriesTable } from './SubcatgeoriesComponetns/SubcategoriesIndex'
import { useDispatch, useSelector } from 'react-redux'
import { GetCategories } from '../../../../../Store/Slices/Subcategories'

const Subcategories = () => {

  const dispatch = useDispatch()

  useEffect(()=>{dispatch(GetCategories({action:'GET_SUBCATEGORIES'}))},[])

  const subctg = useSelector(state=>state.Subcategory.Categories)
  
  return (
    <>
    <SubcategoriesTable subCategory={subctg} />
    </>
  )
}

export default Subcategories