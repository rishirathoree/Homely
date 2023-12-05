import React, { useState } from 'react'

const SelectDropDown = ({selectedValue,selectOptions,setState,defaultText}) => {

    const selectValChange = (item) => {
        setState(item)
    }

    const [showSelectValContainer,setShowSelectValContainer] = useState(false)

  return (
    <div className='relative'>
        <span onClick={()=>{setShowSelectValContainer(p=>!p)}} className='peer p-3 flex items-center justify-between'>
        <p className='font-semibold text-[8px]'>{selectedValue ? selectedValue.value : defaultText}</p>
        <i className={`bx bx-chevron-down duration-500 ${showSelectValContainer ? 'rotate-180' : ''}`}></i>
        </span>

        <div className={`absolute z-[1000] bg-white max-h-40 overflow-y-auto top-12 left-0 ring-1 duration-300 ring-black/5 w-full 
        ${showSelectValContainer ? ' translate-y-0 visible opacity-100' : '-translate-y-4 invisible opacity-0'}
        `}
        >
            {selectOptions && selectOptions.map((item,idx)=>{
                return(
                    <p key={item.id} onClick={()=>{selectValChange(item)}} className='font-semibold text-[8px] p-3 hover:bg-blue-500/10'>{item.value}</p>
                )
            })}
        </div>
    </div>
  )
}

export default SelectDropDown