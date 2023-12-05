import React, { useEffect, useState } from 'react';
import developments from '../../../../../../assets/images/development.gif';
import { ToggleStatus } from '../../../../../../Store/Slices/Products';
import { useDispatch } from 'react-redux';

const Tables = ({ Products }) => {

  const dispatch = useDispatch()

  const { pending } = Products;

  const [AllProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setAllProducts(Products.data?.products);
  }, [Products]);

  const toggleActivation = (idx,itemId) => {
    setAllProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[idx] = {
        ...updatedProducts[idx],
        active: updatedProducts[idx].active === 1 ? 0 : 1,
      };
      return updatedProducts;
    });

    const form = new FormData()

    form.append('action_type','update_status')

    form.append('Product_Id',itemId)

    dispatch(ToggleStatus(form))
  }

  return (
    <>
      {pending ? (
        <div className='h-screen flex items-center justify-center bg-gray-100'>
          {/* <img src={developments} className='mix-blend-multiply' alt='' /> */}
        </div>
      ) : (
        <div className='relative overflow-x-auto ring-[1px] ring-black/5 bg-white rounded'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:text-gray-400'>
              <tr className='border-b-[1px]'>
                <th className='px-6 py-3 text-[10px]'>ID</th>
                <th className='px-6 py-3 text-[10px]'>Product Name</th>
                <th className='px-6 py-3 text-[10px]'>Brand name</th>
                <th className='px-6 py-3 text-[10px]'>Category name</th>
                <th className='px-6 py-3 text-[10px]'>Description</th>
                <th className='px-6 py-3 text-[10px]'>Action</th>
              </tr>
            </thead>
            <tbody>
              {AllProducts?.map((item, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-200 dark:border-gray-700 font-medium text-[10px] ${
                    idx % 2 === 0 ? 'bg-gray-50/50' : ''
                  }`}
                >
                  <th
                    scope='row'
                    className='px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white dark:bg-gray-800'
                  >
                    {item.id}
                  </th>
                  <td className='px-6 py-4'>{item.name}</td>
                  <td className='px-6 py-4'>{item.brand_name}</td>
                  <td className='px-6 py-4'>{item.category_Name}</td>
                  <td className='px-6 py-4'>{item.description}</td>
                  <td className='px-6 py-4'>
                    <div>
                    <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          value=''
                          checked={item.active === 1}
                          onChange={() => toggleActivation(idx,item.id)}
                          className='sr-only peer'
                        />
                        <div className='w-11 h-6 after:duration-500 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600'></div>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Tables;
  