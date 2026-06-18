import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticate } from "./loginService";

interface LoginState {
  token: string | null;
  userID: string | null;
  isAdministrator: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  token: null,
  userID: null,
  isAdministrator: false,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "login/authenticate",
  async (
    { userID, password }: { userID: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      return await authenticate(userID, password);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.userID = null;
      state.isAdministrator = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userID = action.payload.userID;
        state.isAdministrator = action.payload.isAdministrator;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
