import React from "react";
import bannerImage from "../../../../../assets/images/bannerIMage.avif";

const Blogs = () => {
  const menusBlogs = [
    {
      id: 1,
      name: "Spacewood",
      img: bannerImage,
      description: "Lorem ipsum dolor sit amet.",
    },
    {
      id: 2,
      name: "Spacewood",
      img: bannerImage,
      description: "Lorem ipsum dolor sit amet.",
    },
    {
      id: 3,
      name: "Spacewood",
      img: bannerImage,
      description: "Lorem ipsum dolor sit amet.",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-4 ">
        {menusBlogs.map((item, i) => {
          return (
            <div key={i} className="relative ">
              <img src={bannerImage} alt="" />
              <div className="absolute bg-gradient-to-r from-black/20 to-black/0 h-full flex flex-col justify-end p-4 w-full top-0  right-0 left-0">
                <p className="font-semibold text-sm text-white">{item.name}</p>
                <p className="font-semibold text-[8px] text-white">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Blogs;
