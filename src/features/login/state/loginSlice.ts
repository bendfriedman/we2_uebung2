import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticate } from "./loginService";

interface LoginState {
  token: string | null;
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

export interface IUser {
  userID: string;
  firstName?: string;
  lastName?: string;
  isAdministrator?: boolean;
}

const initialState: LoginState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export async function fetchUser(userID: string, token: string): Promise<IUser> {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${userID}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("User not found");
  }

  return response.json();
}

export const loginThunk = createAsyncThunk(
  "login/authenticate",
  async ({ userID, password }: { userID: string; password: string }, { rejectWithValue }) => {
    try {
      const authResult = await authenticate(userID, password);
      const user = await fetchUser(authResult.userID, authResult.token);
      console.log("Fetched user:", user);
      const result = { ...authResult, user };
      return result;
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
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
