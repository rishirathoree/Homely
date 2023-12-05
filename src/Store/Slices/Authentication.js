import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../Api/Api";

const initialState = {
  Auth: { pending: false, success: false, error: null },
  IsAuth : {pending:false,data:null,error:null}
};

export const SignUp = createAsyncThunk("signup", async (data) => {
  try {
    const response = await Api.post("/auth/register", data);
    return response.success === 1 ? { data: response } : { error: response }
  } catch (error) {
    throw error;
  }
})

export const AuthenticateLogUser = createAsyncThunk('login',async(data)=>{
  try {
    const response = await Api.post('/auth/login',data)
    return response.success === 1 ? { data: response } : { error: response }
  } catch (error) {
    throw error
  }
})

const AuthenticateSlice = createSlice({
  name: "Authenticate",
  initialState,
  reducers: {
    // add reducers
    ClearSignUpErros:(state,action)=>{
      state.Auth.pending = false
      state.Auth.success = false
      state.Auth.error = null
    },
    ClearLogingErros:(state,action)=>{
      state.IsAuth.pending = false
      state.IsAuth.data = null
      state.IsAuth.error = null
    },
    Logout:(state,action)=>{
      state.IsAuth.data = null
      state.IsAuth.error = null
      state.IsAuth.pending = false 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.Auth.pending = true
        state.Auth.success = null
        state.Auth.error = null
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.Auth.pending = false;
        if (action.payload.data) {
          state.Auth.success = true
          state.Auth.error = null
        }
        if(action.payload.error){
          state.Auth.success = false
          state.Auth.error = action.payload
        }
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.Auth.pending = false
        state.Auth.success = false
        state.Auth.error = action.payload;
      })


      // for login
      .addCase(AuthenticateLogUser.pending, (state) => {
        state.IsAuth.pending = true;
        state.IsAuth.data = null;
        state.IsAuth.error = null;
      })
      .addCase(AuthenticateLogUser.fulfilled, (state, action) => {
        state.IsAuth.pending = false;
        if (action.payload.data) {
          state.IsAuth.data = action.payload.data;
          state.IsAuth.error = null;
          localStorage.setItem('token',action.payload.data.token)
        }
        if (action.payload.error) {
          state.IsAuth.data = null;
          state.IsAuth.error = action.payload;
        }
      })
      .addCase(AuthenticateLogUser.rejected, (state, action) => {
        state.IsAuth.pending = false;
        state.IsAuth.data = null;
        state.IsAuth.error = action.payload;
      });
  },
});


export const {ClearSignUpErros,ClearLogingErros,Logout} = AuthenticateSlice.actions;
export default AuthenticateSlice.reducer;
