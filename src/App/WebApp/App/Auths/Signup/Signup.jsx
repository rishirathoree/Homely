import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ClearLogingErros,
  ClearSignUpErros,
  SignUp,
} from "../../../../../Store/Slices/Authentication";
import homelyLogo from "../../../../../assets/images/homely.png";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [AuthState, setAuthState] = useState({
    FullName: "",
    UserName: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthState((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    dispatch(SignUp(AuthState));
  };

  const HandleSignUpActions = useSelector((state) => state.Authenticate.Auth);
  const SignUpErrors = HandleSignUpActions.error;

  useEffect(() => {
    const intervalId = setTimeout(() => {
      dispatch(SignUpErrors && ClearSignUpErros());
    }, 4000);
    return () => {
      clearTimeout(intervalId);
    };
  }, [SignUpErrors]);

  useEffect(() => {
    if (HandleSignUpActions.success) {
      navigate("/login");
      dispatch(ClearSignUpErros())
    }
  }, [HandleSignUpActions.success]);
  return (
    <>
      <div className="flex items-center justify-center bg-gray-100/50 h-screen">
        <div className="w-3/5 h-min bg-white rounded-2xl p-12 flex flex-col justify-between space-y-4">
          <span className="flex flex-col items-center justify-center space-y-4">
            <img src={homelyLogo} className="w-20" alt="" />
            <p className="font-medium text-gray-500 text-sm text-center">
              Enter your credentials here, and we'll go from here
            </p>
          </span>

          <span className="grid grid-cols-2 gap-4">
            <label htmlFor="Fullname" className="block">
              <p className="font-semibold text-gray-500 uppercase text-[12px]">
                Fullname
              </p>
              <input
                value={AuthState.FullName}
                name="FullName"
                onChange={handleChange}
                type="text"
                className="p-3 rounded border-[1px] w-full outline-none"
              />
              {SignUpErrors &&
                SignUpErrors.error.errors &&
                SignUpErrors.error.errors.FullName && (
                  <p className="font-semibold text-right text-red-500 mt-2 uppercase text-[10px]">
                    FullName Required
                  </p>
                )}
            </label>

            <label htmlFor="Username" className="block">
              <p className="font-semibold text-gray-500 uppercase text-[12px]">
                Username
              </p>
              <input
                value={AuthState.UserName}
                name="UserName"
                onChange={handleChange}
                type="text"
                className="p-3 rounded border-[1px] w-full outline-none"
              />
              {SignUpErrors &&
                SignUpErrors.error.errors &&
                SignUpErrors.error.errors.UserName && (
                  <p className="font-semibold text-right text-red-500 mt-2 uppercase text-[10px]">
                    UserName Is Required
                  </p>
                )}
            </label>

            <label htmlFor="email" className="block">
              <p className="font-semibold text-gray-500 uppercase text-[12px]">
                Email
              </p>
              <input
                value={AuthState.Email}
                name="Email"
                onChange={handleChange}
                type="text"
                className="p-3 rounded border-[1px] w-full outline-none"
              />
              {SignUpErrors &&
                SignUpErrors.error.errors &&
                SignUpErrors.error.errors.Email && (
                  <p className="font-semibold text-right text-red-500 mt-2 uppercase text-[10px]">
                    Email Required
                  </p>
                )}
            </label>

            <label htmlFor="Password" className="block">
              <p className="font-semibold text-gray-500 uppercase text-[12px]">
                Password
              </p>
              <input
                value={AuthState.Password}
                name="Password"
                onChange={handleChange}
                type="text"
                className="p-3 rounded border-[1px] w-full outline-none"
              />
              {SignUpErrors &&
                SignUpErrors.error.errors &&
                SignUpErrors.error.errors.Password && (
                  <p className="font-semibold text-right text-red-500 mt-2 uppercase text-[10px]">
                    Password Required
                  </p>
                )}
            </label>

            {HandleSignUpActions.error &&
              HandleSignUpActions.error.error.UsernameExist && (
                <p className="font-semibold text-right text-red-500 mt-2 uppercase text-[10px]">
                  Username already exist
                </p>
              )}

            {HandleSignUpActions.error &&
              HandleSignUpActions.error.error.EmailExist && (
                <p className="font-semibold text-right text-red-500 mt-2 uppercase text-[10px]">
                  Email already exist
                </p>
              )}

            <button
              onClick={handleSubmit}
              className="text-[12px] bg-black font-semibold text-white w-full p-4 rounded"
            >
              Create One Account
            </button>
          </span>

          <p className="block font-medium text-gray-500 text-sm ">
            Having Account?
            <Link to={"/login"}>
              <span className="text-gray-700 underline pl-1">
                Leave from here!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
