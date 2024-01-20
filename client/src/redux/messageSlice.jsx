import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../config/BaseURL";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  messages: [],
};

export const sendMessageThunk = createAsyncThunk(
  "chat/access",
  async (data) => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await Api.post(`message/send`, data, config)
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

export const allMessagesThunk = createAsyncThunk(
  "message/all",
  async (data) => {
    const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;
    console.log(token);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await Api.get(`message/all/${data}`, config)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(sendMessageThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(sendMessageThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      .addCase(allMessagesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allMessagesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          // state.messages = action.payload.data.messages;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(allMessagesThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default messageSlice.reducer;
