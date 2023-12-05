import React, { useRef, useState } from "react";

const Notifications = () => {
    const overlay = useRef()
    const [showState,setShowState] = useState(false)
    const toggleOverlayClose = (e) => {
        if(e.target === overlay.current){setShowState(false)}
    }
  return (
    <div className="">
      <svg
      onClick={()=>{setShowState(p=>!p)}}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-menu-up"
        viewBox="0 0 16 16"
      >
        <path d="M7.646 15.854a.5.5 0 0 0 .708 0L10.207 14H14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3.793l1.853 1.854zM1 9V6h14v3H1zm14 1v2a1 1 0 0 1-1 1h-3.793a1 1 0 0 0-.707.293l-1.5 1.5-1.5-1.5A1 1 0 0 0 5.793 13H2a1 1 0 0 1-1-1v-2h14zm0-5H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2zM2 11.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 0-1h-8a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0-.5.5z" />
      </svg>
      <div ref={overlay} onClick={toggleOverlayClose} className={`duration-200 w-full bg-black/10 fixed top-0 right-0 z-50 h-screen ${showState ? 'visible opacity-100' : 'invisible opacity-100'}`}>
        <div className={`float-right bg-white w-2/6 h-full duration-300 ${showState ? 'translate-x-0' : 'translate-x-full'}`}>
            <span className=" border-black/5 border-b-[1px] p-4 flex items-center justify-between">
                <p className="font-semibold text-sm">Notifications</p>
                <i><svg onClick={()=>{setShowState(p=>!p)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
               <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></i>
            </span>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
