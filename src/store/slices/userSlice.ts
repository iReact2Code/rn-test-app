import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Address = {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  country: string;
};

export type UserState = {
  isAuthenticated: boolean;
  token?: string | null;
  profile?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  } | null;
  addresses: Address[];
  loading: boolean;
  error?: string | null;
};

const initialState: UserState = {
  isAuthenticated: false,
  token: null,
  profile: null,
  addresses: [],
  loading: false,
  error: null,
};

// Thunks (implementation will call mock API)
export const login = createAsyncThunk(
  'user/login',
  async (payload: {
    email: string;
    password: string;
  }): Promise<{
    token: string;
    profile: { id: string; name: string; email: string };
  }> => {
    // Will be implemented in services/api.ts and imported here later
    const { email } = payload;
    // Simple mock inline for now
    await new Promise((r) => setTimeout(r, 400));
    return {
      token: 'mock-token',
      profile: { id: 'u1', name: email.split('@')[0] || 'User', email },
    };
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (payload: {
    name: string;
    email: string;
    password: string;
  }): Promise<{
    token: string;
    profile: { id: string; name: string; email: string };
  }> => {
    await new Promise((r) => setTimeout(r, 600));
    return {
      token: 'mock-token',
      profile: { id: 'u1', name: payload.name, email: payload.email },
    };
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  await new Promise((r) => setTimeout(r, 200));
  return true;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
    },
    updateProfile: (
      state,
      action: PayloadAction<{ name?: string; phone?: string }>,
    ) => {
      if (!state.profile) {
        return;
      }
      state.profile = {
        ...state.profile,
        ...action.payload,
      } as UserState['profile'];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.profile = action.payload.profile;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.profile = action.payload.profile;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Register failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.profile = null;
      });
  },
});

export const { addAddress, removeAddress, updateProfile } = userSlice.actions;
export default userSlice.reducer;
