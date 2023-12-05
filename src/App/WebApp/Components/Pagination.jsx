import React from "react";

const Pagination = ({ value, state, setState }) => {
  const numPages = Math.ceil(value / 10);

  const GetPageNum = (index) => {
    setState(index);
  };

  const NextPage = () => {
    if (state < numPages) {
      setState((state) => state + 1);
    }
  };

  const PrevPage = () => {
    if (state > 1) {
      setState((state) => state - 1);
    }
  };

  return (
    <>
      

      {value ? (
        
        <div className="flex items-center justify-center py-4 ">
          <p
            onClick={PrevPage}
            className={`flex items-center justify-center leading-tight text-gray-500 bg-white  cursor-pointer hover-text-white dark-hover-text-white rounded-l-xl text-sm duration-700 p-2 ${
              state === 1 ? "invisible opacity-0" : "visible opacity-100"
            }`}
          >
            Prev
          </p>

          {Array.from({ length: numPages }).map((_, idx) => {
            return (
              <p
                key={idx}
                onClick={() => {
                  GetPageNum(idx + 1);
                }}
                className={`flex  items-center justify-center  text-sm py-2 px-4 leading-tight text-gray-500 hover-bg-black/90 cursor-pointer hover-text-white dark-hover-text-white ${
                  state === idx + 1 ? "bg-black text-white duration-500" : ""
                }`}
              >
                {idx + 1}
              </p>
            );
          })}
          <p
            onClick={NextPage}
            aria-disabled={state === numPages}
            className={`flex items-center justify-center leading-tight text-gray-500 bg-white hover-bg-black/90 cursor-pointer hover-text-white dark-hover-text-white rounded-r-xl  text-sm p-2 ${state === numPages ? "invisible opacity-0" : "visible opacity-100"}`}
          >
            Next
          </p>
        </div>
      ) : (
        <div>
          <div className="animate-pulse bg-gray-200">loading</div>
        </div>
      )}
    </>
  );
};

export default Pagination;
