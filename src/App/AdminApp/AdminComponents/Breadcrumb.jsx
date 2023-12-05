import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AddSubcategoriesPopup } from '../App/Manage Production/Sub Categories/SubcatgeoriesComponetns/SubcategoriesIndex'
import { AddCategoriesPopup } from '../App/Manage Production/Categories/CategoriesComponents/CategoryIndex'
import { ProductAddDialogBox } from '../App/Products/Components/ProductIndex'

const Breadcrumb = () => {

    const location = useLocation()

    const routes = location.pathname.split('/').filter((item)=>item !== '')

    const restrictedBreadOnRoute = ['/analytics']

  return (
    <div className={`flex items-center justify-between ${restrictedBreadOnRoute.includes(location.pathname) ? 'hidden' : 'block'}`}>
    <div className='flex items-center'>
        
        {routes.length > 0 &&
        <Link to='/overview'>
        <span className='flex items-center gap-1'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>
        <p className='text-[10px]'>Home</p>
        </span>
        </Link>
        
        }
        {routes.map((item,i)=>{
            return(
        <span key={i} className='flex items-center gap-1'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" fill="currentColor" className="bi bi-chevron-compact-right" viewBox="0 0 16 16"><path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/></svg>
        <p className={`text-[10px] first-letter:capitalize ${item === routes[routes.length - 1] ? 'text-gray-500/80' : ''}`}>{item}</p>
        </span>
            )
        })}
    </div>

    {location.pathname === '/categories' && <AddCategoriesPopup />}
    {location.pathname === '/subcategories' && <AddSubcategoriesPopup />}
    {location.pathname === '/products' && <ProductAddDialogBox />}

    </div>
  )
}

export default Breadcrumb