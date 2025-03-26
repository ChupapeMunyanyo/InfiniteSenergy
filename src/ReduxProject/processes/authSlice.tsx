import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, Credentials } from '../entities/types';

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Асинхронный thunk для авторизации
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    // Имитация API-запроса
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const validUsers = [
      { login: 'Mikail', password: '12345678' },
      { login: 'AkalayMakalay', password: '12141618' },
    ];
    
    const user = validUsers.find(
      u => u.login === credentials.login && u.password === credentials.password
    );
    
    if (!user) {
      return rejectWithValue('Неверные учетные данные');
    }
    
    localStorage.setItem('isAuthenticated', 'true');
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
    },
    checkAuth(state) {
      state.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;