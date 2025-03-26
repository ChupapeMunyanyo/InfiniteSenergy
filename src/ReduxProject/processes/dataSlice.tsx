import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { DataItem, DataState } from '../entities/types';
import { PayloadAction } from '@reduxjs/toolkit';


// Ключ для localStorage
const LOCAL_STORAGE_KEY = 'appData';

// Начальное состояние (загружаем из localStorage если есть данные)
const loadInitialState = (): DataItem[] => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : [];
    } catch (err) {
      console.error('Ошибка загрузки из localStorage:', err);
      return [];
    }
  };

  const initialState: DataState = {
    items: loadInitialState(),
    loading: false,
    saving: false,
    error: null,
  };

  export const fetchData = createAsyncThunk(
    'data/fetchData', 
    async (_, { rejectWithValue }) => {
      try {
        // Загружаем ТОЛЬКО из localStorage
        const data = loadInitialState();
        if (!data) {
          throw new Error('Нет сохраненных данных');
        }
        return data;
      } catch (err) {
        return rejectWithValue((err as Error).message);
      }
    }
  );
  
  export const saveData = createAsyncThunk(
    'data/saveData',
    async (data: DataItem[], { rejectWithValue }) => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        return data;
      } catch (err) {
        return rejectWithValue((err as Error).message);
      }
    }
  );

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Синхронные редьюсеры можно добавить здесь при необходимости
     // Синхронное добавление элемента
     addItem: (state, action: PayloadAction<DataItem>) => {
        state.items.push(action.payload);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items));
      },
      // Синхронное обновление элемента
      updateItem: (state, action: PayloadAction<DataItem>) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items));
        }
      },
      // Синхронное удаление элемента
      removeItem: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items));
      },
  },
  extraReducers: (builder) => {
    builder
      // Обработчики для fetchData
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Обработчики для saveData
      .addCase(saveData.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(saveData.fulfilled, (state) => {
        state.saving = false;
        // Можно обновить данные в state если нужно
      })
      .addCase(saveData.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload as string;
      });
  },
});

export const { addItem, updateItem, removeItem } = dataSlice.actions
export const selectAllData = (state: RootState) => state.data.items;
export const selectDataLoading = (state: RootState) => state.data.loading;
export const selectDataSaving = (state: RootState) => state.data.saving;
export const selectDataError = (state: RootState) => state.data.error;

export default dataSlice.reducer;