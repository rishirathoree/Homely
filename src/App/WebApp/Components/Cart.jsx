import React, { useEffect, useRef, useState } from 'react'

const Cart = () => {
    const [showCartSideOver,setShowCartSideOver] = useState(false)

    const toggleSideOver = () => {
        setShowCartSideOver(p=>!p)
    }
    useEffect(()=>{
        const openByCtrlC = (e) => {
            if(e.ctrlKey && e.key === 'c'){
                setShowCartSideOver(p=>!p)
            }
        }
        document.addEventListener('keydown',openByCtrlC)
        return()=>{
            
        document.removeEventListener('keydown',openByCtrlC)
        }
    },[])

    const closeOnOverlayClick = (e) => {
        if(e.target === sideOverPop.current){
            setShowCartSideOver(false)
        }
    }

    const sideOverPop = useRef()
    

  return (
    <>
    <div>
    <span onClick={toggleSideOver}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-minecart-loaded" viewBox="0 0 16 16"><path d="M4 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM.115 3.18A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 14 12H2a.5.5 0 0 1-.491-.408l-1.5-8a.5.5 0 0 1 .106-.411zm.987.82 1.313 7h11.17l1.313-7H1.102z"/><path fillRule="evenodd" d="M6 1a2.498 2.498 0 0 1 4 0c.818 0 1.545.394 2 1 .67 0 1.552.57 2 1h-2c-.314 0-.611-.15-.8-.4-.274-.365-.71-.6-1.2-.6-.314 0-.611-.15-.8-.4a1.497 1.497 0 0 0-2.4 0c-.189.25-.486.4-.8.4-.507 0-.955.251-1.228.638-.09.13-.194.25-.308.362H3c.13-.147.401-.432.562-.545a1.63 1.63 0 0 0 .393-.393A2.498 2.498 0 0 1 6 1z"/></svg></span>
    <div onClick={closeOnOverlayClick} ref={sideOverPop} className={`fixed top-0 left-0 bg-black/5 w-full h-screen z-50 bg-opacity-5 duration-200 ${showCartSideOver ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className={`w-1/3 bg-white float-right duration-500 h-full ${showCartSideOver ? 'translate-x-0' : 'translate-x-full'}`}></div>
    </div>
    </div>
    </>
  )
}

export default Cart