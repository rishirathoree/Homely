import React, { useEffect, useRef, useState } from 'react'

const SelecteDropdown = ({ Dropfor, data, state, setState }) => {

  const [dropDown, setDropdown] = useState(false)

  const overlay = useRef()
  const selectBlock = useRef()

  const selectValue = (selectedVal) => {
    setState(selectedVal);
    setDropdown(false);
  }

  const toggleDropdown = (e) => {
    setDropdown(prevState => !prevState);
  }

  // useEffect(() => {
  //   const overlayToggle = (e) => {
  //     if (overlay.current && !overlay.current.contains(e.target) && dropDown && !overlay.current.contains(e.target)) {
  //       setDropdown(false);
  //     }
  //   }
  //   document.addEventListener('mousedown', overlayToggle);

  //   return () => {
  //     document.removeEventListener('mousedown', overlayToggle);
  //   }
  // }, []);

  return (
    <>
      <div className='block space-y-4'>
          <p className=' text-[12px] font-semibold'>{Dropfor}</p>
        <div onClick={toggleDropdown} className='shadow-new p-4 cursor-pointer flex items-center justify-between' >
          <p className='font-semibold text-[12px]'>{state.length > 0 ? state : Dropfor}</p>
          <i ref={selectBlock} className={`bx bx-chevron-down duration-500 ${dropDown ? 'rotate-180' : ''}`}></i>
        </div>
          {/* <div ref={overlay} className={`font-semibold text-[12px] border-1 shadow-new border-black/20 rounded w-full ${dropDown ? 'visible opacity-100 relative' : 'invisible opacity-0 absolute ' }`}>
            <div className={`z-50 bg-white w-full top-8`}>
              {data.map((item, i) => {
                return (
                  <p key={i} onClick={() => selectValue(item)} className='p-4 cursor-pointer hover:bg-gray-100'>{item}</p>
                );
              })}
            </div>
        </div> */}
      </div>
    </>
  )
}

export default SelecteDropdown;
