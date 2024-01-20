import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../config/BaseURL";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  chatList: [],
};

export const accessChatThunk = createAsyncThunk("chat/access", async (data) => {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return await Api.post(`chat/create`, data, config)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

export const allChatsThunk = createAsyncThunk("chat/all", async (data) => {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.accessToken;
  console.log(token);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(config);
  return await Api.get(`chat/all`, config)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      return err.response;
    });
});

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(accessChatThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(accessChatThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(accessChatThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      .addCase(allChatsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allChatsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.chatList = action.payload.data.chats;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(allChatsThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default chatSlice.reducer;
