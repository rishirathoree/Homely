import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticateLogUser, ClearLogingErros } from "../../../../../Store/Slices/Authentication";
import homelyLogo from '../../../../../assets/images/homely.png'
const Login = () => {
  
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [AuthState,setAuthState] = useState({
    Email:'',
    Password:'',
  })

  const handleChange = (e) => {
    const { name,value } = e.target
    setAuthState((p)=>({
      ...p,
      [name]:value
    }))
  }

  const handleSubmit = () => {
    dispatch(AuthenticateLogUser(AuthState))
  }

  const HandleLoginActions = useSelector((state) => state.Authenticate.IsAuth)

  useEffect(()=>{
    const intervalId = setTimeout(()=>{HandleLoginActions.error?.error && dispatch(ClearLogingErros())},2000)
    return()=>{clearTimeout(intervalId)}
  },[HandleLoginActions.error?.error])

  useEffect(()=>{if(HandleLoginActions.data){navigate('/')}},[HandleLoginActions.data])

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100/50 min-h-screen max-h-full">
        <div className="w-1/3 h-3/4 bg-white rounded-2xl p-12 flex flex-col justify-between">
          <span className="flex flex-col items-center justify-center space-y-4">
            <img src={homelyLogo} className="w-20" alt="" />
            <p className="font-medium text-gray-500 text-sm text-center">
              Enter your email and password here, and we'll go from here
            </p>
          </span>

          <span className="block space-y-6">
            <label htmlFor="email" className="block">
              <p className="font-semibold text-gray-500 uppercase text-[12px]">
                Email
              </p>
              <input
                name="Email"
                onChange={handleChange}
                value={AuthState.Email}
                required
                type="text"
                className="p-3 rounded border-[1px] w-full outline-none"
              />
              {HandleLoginActions.error && HandleLoginActions.error.error &&
                HandleLoginActions.error.error.EmailRequired && (
                  <p className="font-semibold text-right text-red-500 mt-2 uppercase text-[10px]">
                    Email Required
                  </p>
                )}
            </label>

            <label htmlFor="email" className="block">
              <p className="font-semibold text-gray-500 uppercase text-[12px]">
                Password
              </p>
              <input
                name="Password"
                onChange={handleChange}
                value={AuthState.Password}
                type="text"
                required
                className="p-3 rounded border-[1px] w-full outline-none"
              />
              {HandleLoginActions.error && HandleLoginActions.error.error &&
                HandleLoginActions.error.error.PasswordRequired && (
                  <p className="font-semibold text-right text-red-500 mt-2 uppercase text-[10px]">
                    Password Required
                  </p>
                )}
            </label>

            {HandleLoginActions.error && HandleLoginActions.error.error &&
              HandleLoginActions.error.error.PasswordIncorrect && (
                <p className="font-semibold text-right text-red-500 mt-2 uppercase text-[10px]">
                  Password Incorrect
                </p>
              )}

            {HandleLoginActions.error && HandleLoginActions.error.error &&
              HandleLoginActions.error.error.ExistEmail && (
                <p className="font-semibold text-right text-red-500 mt-2 uppercase text-[10px]">
                  Email Incorrect
                </p>
              )}

            <button
              onClick={handleSubmit}
              className="text-[14px] bg-black font-semibold text-white w-full p-4 rounded"
            >
              Login
            </button>
          </span>

          <p className="font-medium text-gray-500 text-sm mt-4">
            No Account?
            <Link to={"/signup"}>
              <span className="text-gray-700 underline pl-1">Create One</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
