// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import BaseUrl from "../config/BaseURL";

// const initialState = {
//   user: {},
//   isLoading: false,
//   error: null,
// };

// export const registerUserThunk = createAsyncThunk(
//   "auth/signup",
//   async (data) => {
//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };
//     return await BaseUrl.post(`auth/signup`, data, config)
//       .then((res) => {
//         return res;
//       })
//       .catch((err) => {
//         return err.response;
//       });
//   }
// );

// export const loginUserThunk = createAsyncThunk("auth/login", async (data) => {
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//     },
//   };

//   return await BaseUrl.post(`auth/login`, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       return err.response;
//     });
// });

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder

//       .addCase(registerUserThunk.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(registerUserThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         console.log(action.payload);
//         if (action.payload.data.success) {
//           state.isLoading = false;
//           state.user = action.payload.data.user;
//         } else {
//           state.error = null;
//         }
//       })
//       .addCase(registerUserThunk.rejected, (state) => {
//         state.isLoading = true;
//         state.error = action.error.message;
//       })

//       .addCase(loginUserThunk.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUserThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         console.log(action, "action");
//         console.log(action.payload);
//         if (action.payload.data.success) {
//           state.isLoading = false;
//           state.user = action.payload.data.user;
//         } else {
//           state.error = null;
//         }
//       })
//       .addCase(loginUserThunk.rejected, (state) => {
//         state.isLoading = true;
//         state.error = action.error.message;
//       });
//   },
// });

// export default authSlice.reducer;

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
  return await Api.post(`auth/login`, data)
    .then((res) => {
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
