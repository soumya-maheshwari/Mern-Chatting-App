import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../config/BaseURL";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  user: {},
};

export const registerUserThunk = createAsyncThunk(
  "auth/signup",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.post(`auth/signup`, data, config)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }
);

export const loginUserThunk = createAsyncThunk("auth/login", async (data) => {
  console.log(Api);
  return await Api.post(`auth/login`, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      return err.response;
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.profile = action.payload.data;
          state.user = action.payload.data.user;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // LOGIN USER
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.data.success) {
          state.isSuccess = true;
          state.user = action.payload.data.user;
          state.profile = action.payload.data;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default authSlice.reducer;
