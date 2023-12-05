import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Createcategories, ResetCreateCategoryState } from "../../../../../../Store/Slices/Categories";
import { useNavigate } from "react-router-dom";

const AddCategoriesPopup = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [showPopup, setShowPopup] = useState(false);

  const overlay = useRef();

  const overlayClick = (e) => {
    if (e.target === overlay.current) {

      setImages([])
  
      setCategoryValue({
        name: "",
        description: "",
        active: 0,
        images,
      })

      setShowPopup(false);
    }
  };

  const [images, setImages] = useState([]);

  const handleSelectImages = (e) => {
    if (images.length === 0) {
      const files = e.target.files[0];
      setImages([files]);
      setCategoryValue((p) => ({ ...p, images: files }));
    }
  };

  const [catgeoryValues, setCategoryValue] = useState({
    name: "",
    description: "",
    active: 0,
    images,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryValue((p) => ({ ...p, [name]: value }));
  };

  const handleCreateCategorySubmit = (e) => {

    const form = new FormData();

    form.append('action','add_category')

    for (const [key, value] of Object.entries(catgeoryValues)) {
      form.append(key, value);
    }

    for (const [key, value] of form.entries()) {
      console.log(key, value);
    }
    
    dispatch(Createcategories(form))
  };

  // error handling through redux / success stories
  const Operations = useSelector(state=>state.Category.CreateCategory)

  // if successfully category created then make a operation
  useEffect(()=>{if(Operations.success){
    navigate('/categories')

    setImages([])

    setCategoryValue({
      name: "",
      description: "",
      active: 0,
      images,
    })

    setShowPopup(false)

    dispatch(ResetCreateCategoryState())
  }},[Operations.success])

  // if any error comes dispaly it for like a second and then change it to null
  useEffect(()=>{if(Operations.error){
    setTimeout(() => {
    dispatch(ResetCreateCategoryState())
  }, 4000)
  }},[Operations.error])

  return (
    <div>
      <button
        onClick={() => {
          setShowPopup(true);
        }}
        className="text-[10px] bg-blue-500 text-white p-2"
      >
        Add Categories
      </button>
      <div
        onClick={overlayClick}
        ref={overlay}
        className={` w-full duration-500 h-screen z-50 fixed top-0 right-0 bg-black/10 flex items-center justify-center ${
          showPopup ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="w-2/3 h-5/6 bg-white overflow-y-auto custom-scrollbar">
          <span className="block ">
            <p className="font-semibold p-4 text-[10px] border-b-[1px]">
              General Information
            </p>
          </span>

          <div className="grid grid-cols-3 gap-4 px-12 py-8">
            <label htmlFor="name" className="space-y-2">
              <p className="font-medium text-[10px]">Name</p>
              <input
                value={catgeoryValues.name}
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Enter Category Name"
                className="duration-500 text-[10px] w-full ring-1 ring-black/5 focus:placeholder:invisible rounded p-3 outline-none focus:outline-none"
              />
              {Operations.error && Operations.error.errors && Operations.error.errors.name && <p className="font-semibold text-[10px] text-red-500">Name Field Required</p>}
            </label>

            <label className="relative items-center cursor-pointer col-span-3 flex-col space-y-2 w-min">
              <input
                name="active"
                value={catgeoryValues.active}
                onChange={() => {
                  setCategoryValue((p) => ({
                    ...p,
                    active: p.active === 1 ? 0 : 1,
                  }));
                }}
                type="checkbox"
                className="sr-only peer"
              />
              <p className="font-medium text-[10px]">Active</p>
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>

            <label htmlFor="name" className="space-y-2 col-span-3">
              <p className="font-medium text-[10px]">Description</p>
              <textarea
                name="description"
                value={catgeoryValues.description}
                onChange={handleChange}
                type="text"
                placeholder="Enter Category Description"
                className="h-40 resize-none apperance-none duration-500 text-[10px] w-full ring-1 ring-black/5 focus:placeholder:invisible rounded p-3 outline-none focus:outline-none"
              />
              {Operations.error && Operations.error.errors && Operations.error.errors.description && <p className="font-semibold text-[10px] text-red-500">Description Field Required</p>}
            </label>

            <label
              htmlFor="images"
              className={`space-y-4 col-span-2 ${
                images.length > 0 ? "hidden" : "block"
              }`}
            >
              <p className="font-semibold text-[10px]">Upload Images</p>
              <div className="h-80 ring-1 ring-black/5 flex items-center flex-col justify-center space-y-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  fill="currentColor"
                  className="bi bi-files"
                  viewBox="0 0 16 16"
                >
                  <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                </svg>
                <input
                  onChange={handleSelectImages}
                  type="file"
                  className="hidden"
                  id="images"
                />
                <p className="font-semibold text-[10px]">
                  Image size should be more than 50MB
                </p>
              </div>
              {Operations.error && Operations.error.imageError && <p className="font-semibold text-[10px] text-red-500">Images Required</p>}
            </label>

            {images.length > 0 && (
              <div className="col-span-3 grid grid-cols-3 gap-4">
                {images.map((item, idx) => {
                  return (
                    <div key={idx} className="w-60  h-60 ring-1 ring-black/5 relative rounded-md overflow-hidden">
                      <div className="-top-0 w-full h-full bg-black/50 flex gap-2 flex-col items-center justify-center absolute z-50 -right-0">
                        <span className="w-min bg-white flex items-center gap-2 rounded-md">
                          <p className="w-max p-2 text-[10px]">Remove Image</p>
                          <i
                            onClick={() => {
                              setImages([]);
                              setCategoryValue((p) => ({ ...p, images: [] }));
                            }}
                            className="relative after:top-0 after:left-0 after:h-full after:w-[1px] after:bg-black/5 after:absolute bx bx-x shadow-new rounded-full p-2"
                          ></i>
                        </span>
                      </div>
                      <img
                        className="object-cover w-full h-full"
                        src={URL.createObjectURL(item)}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <span className="block border-t-[1px] py-8 pl-12">
            <button
              onClick={handleCreateCategorySubmit}
              className="font-semibold py-4 px-8 text-[10px] bg-blue-500 text-white"
            >
              Add Category
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddCategoriesPopup;
