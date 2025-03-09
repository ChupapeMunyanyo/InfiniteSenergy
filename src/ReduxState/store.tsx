import { configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from './vacancySlice'
import { vacancyApi } from "./vacancyApi";
export const store = configureStore ({
    reducer: {
        vacancies:vacanciesReducer,
        [vacancyApi.reducerPath]: vacancyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(vacancyApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch