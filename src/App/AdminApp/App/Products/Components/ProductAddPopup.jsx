import React, { useRef, useState } from 'react'

const ProductAddPopup = () => {

  const [showPopup,setShowPopup] = useState(false)

  const overlay = useRef()

  const [images,setImages]= useState([])

  const [productValues,setProductValues] = useState({
    name: "",
    description: "",
    active: 0,
    images,
  })

  const overlayClick = (e) => {
    if (e.target === overlay.current) {
      
      setImages([]);

      setProductValues({
        name: "",
        description: "",
        active: 0,
        images,
      });

      setShowPopup(false);
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          setShowPopup(true);
        }}
        className="text-[10px] bg-blue-500 text-white p-2"
      >
        Add Products
      </button>
      <div
        onClick={overlayClick}
        ref={overlay}
        className={` w-full duration-500 h-screen z-50 fixed top-0 right-0 bg-black/10 flex items-center justify-center ${
          showPopup ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="w-2/3 h-5/6 bg-white overflow-y-auto custom-scrollbar">

        </div>
        </div>
    </div>
  )
}

export default ProductAddPopup