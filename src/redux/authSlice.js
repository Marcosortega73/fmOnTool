import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/api/auth/authService";

import { Navigate } from "react-router-dom";
// import userAdminService from "../services/api/entity/userAdminService";

const user = JSON.parse(localStorage.getItem("user"));
const permission = user? JSON.parse(localStorage.getItem("credentials")):null;

//SIN USAR AUN
export const register = createAsyncThunk(
  "/register",
  async ({ email, password }, thunkAPI) => {

    try {
      const response = await AuthService.registerAdmin( email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

//LOGIN

export const login = createAsyncThunk(
  "/login",
  async (dataUser, thunkAPI) => {
    try {
      const data = await AuthService.login(dataUser);
      const userPermission = await AuthService.getDataUserService(data);
      console.log("LLEGE AL USER PERMISSION",userPermission)
      //navigate to dashboard
      
      return { user: data,
        userPermission:userPermission};
    } 
    catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const logout = createAsyncThunk("/logout", async () => {
  await AuthService.logout();
});

// export const getDataUser = createAsyncThunk("/getDataUser", async (thunkAPI) => {
//   try {
//     let user =  JSON.parse(localStorage.getItem("user"));
//     console.log("LLEGE AL GETDATAUSER",user)
//     if (user) {
//       const data = await userAdminService()
//       console.log("LLEGE AL LA DATA USERADMI222",data)
//       return { credentials: data};
//     }
//     return { credentials: null};
//   } 
//   catch (error) {
//     const message =
//       (error.response &&
//         error.response.data &&
//         error.response.data.message) ||
//       error.message ||
//       error.toString();
//     thunkAPI.dispatch(setMessage(message));
//     return thunkAPI.rejectWithValue();
//   }
// }
// );

const initialState =
  user
  ? { isLoggedIn: true, user, permission}
  : { isLoggedIn: false, user: null,permission}
  


const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },

    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },

    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.permission = action.payload.userPermission;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },


    // [getDataUser.fulfilled]: (state, action) => {
    //   console.log("PAYLOAD",action.payload)
    //   state.credentials = action.payload.credentials;
    // },


  },
});
const { reducer } = authSlice;
export default reducer;