import React from 'react'
import Sidebar from './AdminComponents/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Overview from './App/Dashboard/Overview/Overview'
import Navbar from './AdminComponents/Navbar'
import Analytics from './App/Dashboard/Analytics/Analytics'
import Products from './App/Products/Products'
import Categories from './App/Manage Production/Categories/Categories'
import { SubCategoryPage } from './App/Manage Production/Sub Categories/SubcatgeoriesComponetns/SubcategoriesIndex'
import Breadcrumb from './AdminComponents/Breadcrumb'
import { BrandPage } from './App/Manage Production/Brands/BrandComponents/BrandIndex'

const AdminPageRoutes = () => {
  return (
    <>
    <div className='flex'>
    <Sidebar />
    <div className='absolute space-y-4 bg-gray-50/80 top-0 right-0 mt-[82px] w-4/5 p-8 overflow-y-auto overflow-hidden '>
    <Navbar />
    <Breadcrumb />
    <Routes>
      <Route path='/overview' Component={Overview}></Route>
      <Route path='/analytics' Component={Analytics}></Route>
      <Route path='/products' Component={Products}></Route>
      <Route path='/Categories' Component={Categories}></Route>
      <Route path='/subcategories' Component={SubCategoryPage}></Route>
      <Route path='/brand' Component={BrandPage}></Route>
    </Routes>
    </div>
    </div>
    </>
  )
}

export default AdminPageRoutes