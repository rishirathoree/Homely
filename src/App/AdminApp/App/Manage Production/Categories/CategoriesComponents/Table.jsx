import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  DltCategory,
  UpdateCatgeoriesStatus,
} from "../../../../../../Store/Slices/Categories";
import { ModifyCategoriesPopup } from "./CategoryIndex";

const Table = ({ Category }) => {
  const dispatch = useDispatch();

  const { pending, data, error } = Category;

  const [AllCategory, setAllCategory] = useState([]);

  useEffect(() => {
    setAllCategory(data);
  }, [data]);

  const toggleActivation = (idx, itemId) => {
    setAllCategory((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[idx] = {
        ...updatedProducts[idx],
        active: updatedProducts[idx].active === 1 ? 0 : 1,
      };
      return updatedProducts;
    });

    const formData = new FormData();
    formData.append("action", "update_category_status");
    formData.append("id", itemId);
    dispatch(UpdateCatgeoriesStatus(formData));
  };

  const handleDeleteCategory = (CtgId) => {
    
    const findCategory = AllCategory.findIndex((item) => item.id === CtgId);

    const newUpdatedArray = [...AllCategory];

    newUpdatedArray.splice(findCategory, 1);

    setAllCategory(newUpdatedArray);

    dispatch(DltCategory(CtgId));
    
  };

  const [toModifyCategoriesVal,setToModifyCategoryVal] = useState(null)

  return (
    <>
      {pending ? (
        <div className="h-screen flex items-center justify-center bg-gray-100">
          {/* <img src={developments} className='mix-blend-multiply' alt='' /> */}
        </div>
      ) : (
        <div className="relative overflow-x-auto ring-[1px] ring-black/5 bg-white">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr className="border-b-[1px]">
                <th className="px-6 py-3 text-[10px]">id</th>
                <th className="px-6 w-40 py-3 text-[10px]">Catgeory Name</th>
                <th className="px-6 py-3 text-[10px]">Description</th>
                <th className='px-6 py-3 text-[10px]'>Status</th>
                <th className="px-6 py-3 text-[10px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {AllCategory?.map((item, idx) => (
                <tr
                  key={idx}
                  className={`border-b last:border-b-0 border-gray-200 dark:border-gray-700 font-medium text-[10px] ${
                    idx % 2 === 0 ? "bg-gray-100/90" : ""
                  }`}
                >
                  <td
                    scope="row"
                    className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white dark:bg-gray-800"
                  >
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">
                    {item.description.slice(0, 150)}...
                  </td>
                  <td className={`px-6 py-4`}>
                  <span className={`  text-[8px] duration-700 font-medium  rounded-md block w-16 text-center
                  ${item.active === 1 ? ' rounded-full  bg-blue-100/50 text-blue-800' : 'bg-red-500/10 text-red-800'}`}>
                    {item.active === 1 ? 'Active' : 'Deactivated'}
                  </span>
                    </td>
                  <td className="px-6 py-4 flex items-end mt-2 justify-center gap-2">
                  <div className='flex'>
                    <div className='flex items-center gap-4 justify-center'>
                    <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type="checkbox"
                            value=""
                            checked={parseInt(item.active) === 1}
                            onChange={() => toggleActivation(idx, item.id)}
                            className="sr-only peer"
                          />
                          <div className='w-11 h-6 after:duration-500 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600'></div>
                        </label>

                      <svg onClick={()=>{setToModifyCategoryVal(item)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>

                        <svg
                          onClick={() => {
                            handleDeleteCategory(item.id);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ModifyCategoriesPopup toModifyCategoriesVal={toModifyCategoriesVal} setState={setToModifyCategoryVal} />
    </>
  );
};

export default Table;
