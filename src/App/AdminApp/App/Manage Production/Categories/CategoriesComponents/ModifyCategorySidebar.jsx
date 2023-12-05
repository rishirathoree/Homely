import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateWholeCategory } from "../../../../../../Store/Slices/Categories";

const ModifyCategorySidebar = ({ toModifyCategoriesVal, setState }) => {

  const dispatch = useDispatch()
  
  const overlay = useRef();

  const handleOverlayClick = (e) => {
    if (e.target === overlay.current) {
      setState(null);
      console.log(toModifyCategoriesVal);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setState((p) => ({ ...p, images: [file] }));
  };

  const handleToggle = (e) => {
    setState((p) => ({ ...p, active: p.active === 1 ? 0 : 1 }));
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setState((p) => ({
      ...p,
      [name]: value,
    }));
  };
  
  const handleChangeSubmit = (e) => {
    e.preventDefault()
    const forms = new FormData()
    for (const [key,value] of Object.entries({...toModifyCategoriesVal,action:'update_category'})) {
      // if(key === 'images'){
      //   // forms.append(key,JSON.stringify(value))
        
      // }
      // else{
      //   forms.append(key,value)
      // }
      forms.append('action','update_category')
      forms.append('images',toModifyCategoriesVal.images[0])
    }
    dispatch(UpdateWholeCategory(forms))
  }
  
  console.log(toModifyCategoriesVal)
  return (
    <div
      onClick={handleOverlayClick}
      ref={overlay}
      className={`w-full duration-500 h-screen z-50 fixed -top-4 right-0 bg-black/10 flex justify-end ${
        toModifyCategoriesVal ? "opacity-100 visible" : "invisible opacity-0"
      }`}
    >
      <div
        className={`w-1/3 duration-700 overflow-y-auto custom-scrollbar bg-white h-full  ${
          toModifyCategoriesVal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <span className="block p-4 border-b-[1px] border-black/5">
          <p className="font-semibold text-[10px]">Modify Category</p>
        </span>
        <div className="p-4 space-y-4">
          <div className="h-80 overflow-hidden rounded-lg">
            {toModifyCategoriesVal?.images.map((item, idx) => {
              if (item && typeof item === "object" && item.filename) {
                return (
                  <img
                    key={idx}
                    className="object-cover w-full h-full"
                    src={item.originalname}
                    alt=""
                  />
                );
              } else if (item instanceof File || item instanceof Blob) {
                // Handle the case when item is a File or Blob
                return (
                  <img
                    key={idx}
                    className="object-cover w-full h-full"
                    src={URL.createObjectURL(item)}
                    alt=""
                  />
                );
              } else {
                return null;
              }
            })}
          </div>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full p-6 border-[1px] space-y-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-cloud-upload"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z"
                  />
                </svg>
                <p className="mb-2 text-[10px] text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                onChange={handleImageChange}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          </div>

          <label htmlFor="name" className="space-y-2 block ">
            <p className="font-medium text-[10px]">Category Name</p>
            <input
              name="name"
              type="text"
              onChange={handleChangeInput}
              value={toModifyCategoriesVal?.name}
              placeholder="Enter Category Name"
              className="duration-500 text-[10px] w-full ring-1 ring-black/5 focus:placeholder:invisible rounded p-3 outline-none focus:outline-none"
            />
            <p className="font-semibold text-[10px] text-red-500">
              Name Field Required
            </p>
          </label>

          <label className="relative items-center cursor-pointer space-y-2 block  w-min">
            <input
              name="active"
              // value={catgeoryValues.active}
              // onChange={() => {
              //   setCategoryValue((p) => ({
              //     ...p,
              //     active: p.active === 1 ? 0 : 1,
              //   }));
              // }}
              onChange={handleToggle}
              checked={toModifyCategoriesVal?.active === 1}
              type="checkbox"
              className="sr-only peer"
            />
            <p className="font-medium text-[10px]">Active</p>
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>

          <label htmlFor="name" className="space-y-2 block  col-span-3">
            <p className="font-medium text-[10px]">Description</p>
            <textarea
              name="description"
              onChange={handleChangeInput}
              value={toModifyCategoriesVal?.description}
              type="text"
              placeholder="Enter Category Description"
              className="h-40 resize-none apperance-none duration-500 text-[10px] w-full ring-1 ring-black/5 focus:placeholder:invisible rounded p-3 outline-none focus:outline-none"
            />
            <p className="font-semibold text-[10px] text-red-500">
              Description Field Required
            </p>
          </label>

          <button onClick={handleChangeSubmit} className="p-3 rounded bg-black text-white text-[8px]">
            Update Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyCategorySidebar;
