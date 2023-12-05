import React, { useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import homely from "../../../assets/images/homely.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../../Store/Slices/Authentication";
import ProfilePoup from "./ProfilePoup";

const Navbar = () => {

  const location = useLocation();

  const menusNavbar = [
    {
      id: 1,
      name: 'Furniture',
      menus: [
        {
          id: 1,
          name: 'Sofas',
          link: '/Sofas',
          types: [
            '3 Seater Sofas',
          ],
        },
        {
          id: 2,
          name: 'Chairs',
          link: '/Chairs',
          types: [
            'Arm Chairs',
            'Rocking Chairs',
            'Folding Chairs',
            'Iconic Chairs',
            'Cafe Chairs',
            'Gaming Chairs',
          ],
        },
        {
          id: 3,
          name: 'Stools & Pouffes',
          link: '/StoolsPouffes',
          types: [
            'Foot Stools',
            'Seating Stools',
            'Pouffes',
          ],
        },
        {
          id: 1,
          name: 'Sofas',
          link: '/Sofas',
          types: [
            '3 Seater Sofas',
          ],
        },
        {
          id: 2,
          name: 'Chairs',
          link: '/Chairs',
          types: [
            'Arm Chairs',
            'Rocking Chairs',
            'Folding Chairs',
            'Iconic Chairs',
            'Cafe Chairs',
            'Gaming Chairs',
          ],
        },
        {
          id: 3,
          name: 'Stools & Pouffes',
          link: '/StoolsPouffes',
          types: [
            'Foot Stools',
            'Seating Stools',
            'Pouffes',
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'About',
      link: '/about',
    },
  ];
  

  const [profileDropdown, setProfileDropdown] = useState(false);

  const profileDropdownRef = useRef();
  useEffect(() => {
    const toggle = (e) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target)
      ) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", toggle);
    return () => {
      document.removeEventListener("mousedown", toggle);
    };
  }, []);

  const toggleDropdown = () => {
    setProfileDropdown((state) => !state);
  };

  const restrictNav = ["/login", "/signup"];

  const dispatch = useDispatch();

  const Auth = useSelector((state) => state.Authenticate.IsAuth.data);
  
  return (
    <>
      <div className={`flex items-center justify-between py-4 px-12 ${restrictNav.includes(location.pathname) ? 'hidden' : 'block'}`}>
        <div className="flex items-center justify-center gap-12">
          <div>
            <img src={homely} className="w-20 h-20 object-contain" alt="" />
          </div>
            <ul className="flex items-center gap-4">
              {menusNavbar.map((item, i) => {
                return (
                  <li key={i} className="group relative flex items-center gap-4">
                    <span className="flex items-center gap-2">
                      <p className="font-medium select-none text-[12px]">{item.name}</p>
                      {item.menus && <i className="group-hover:rotate-180 duration-500 bx bx-chevron-down"></i>}
                    </span>
                    {item.menus && (
                      <div className="group-hover:visible rounded-xl opacity-0 before:w-20 before:opacity-0 z-50 bg-white before:left-0 before:-z-50 before:-top-8 before:absolute before:h-40 before:bg-black invisible group-hover:opacity-100 duration-500 scale-y-0 group-hover:scale-y-100 origin-top p-8 w-max absolute left-0 grid grid-cols-3 gap-2 shadow-new top-8">
                        {item.menus.map((menus, i) => {
                          return (
                            <span key={i} className="group text-center block p-2">
                              <p className="font-semibold text-[12px] text-center select-none w-max text-red-400">
                                {menus.name}
                              </p>
                              {menus.types.map((item, i) => {
                                return (
                                  <div key={i} className="types">
                                    <p className="font-light hover:underline cursor-pointer text-[10px] text-left">{item}</p>
                                  </div>
                                );
                              })}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
        </div>

        <div>
        <ProfilePoup />
        </div>
      </div>
    </>
  );
};

export default Navbar;
