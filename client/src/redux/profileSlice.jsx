import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../config/BaseURL";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const searchUserThunk = createAsyncThunk("auth/search", async (data) => {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return await Api.get(`auth/searchUser?search=${data}`, config)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

export const viewProfileThunk = createAsyncThunk(
  "profile/view",
  async (data) => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await Api.get(`profile/view`, config)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);

export const editProfileThunk = createAsyncThunk(
  "profile/edit",
  async (data) => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    return await Api.put(`profile/edit`, data, config)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(searchUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(searchUserThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })
      .addCase(viewProfileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(viewProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(viewProfileThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      .addCase(editProfileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(editProfileThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default profileSlice.reducer;
