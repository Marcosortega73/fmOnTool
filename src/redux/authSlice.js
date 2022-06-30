import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/api/auth/authService";
import { Navigate } from "react-router-dom";
// import userAdminService from "../services/api/entity/userAdminService";

const user = JSON.parse(localStorage.getItem("user"));
// const credenttials = user? JSON.parse(localStorage.getItem("credenttials")):null;

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
      console.log( data.token)
      console.log("LLEGE AL LOGIN",data)

      return { user: data};
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
//       return { credenttials: data};
//     }
//     return { credenttials: null};
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
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null}
  


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
    //   state.credenttials = action.payload.credenttials;
    // },


  },
});
const { reducer } = authSlice;
export default reducer;