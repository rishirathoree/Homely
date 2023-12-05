import React from 'react'
import { BlogsHome,BannerHome,HomeCards,HomeCategories } from './HomeComponents/HomeIndex'
const Home = () => {
  return (
    <>
    <div className='space-y-8 px-12 pb-4'>
    <BannerHome />
    <BlogsHome />
    <HomeCategories />
    <HomeCards />
    </div>
    </>
  )
}

export default Home