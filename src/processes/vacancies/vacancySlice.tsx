import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVacancySlice } from "../../entities/vacancy/types";
import { ISavedVacancy } from "../../entities/vacancy/types";
import { IVacancyInitialState } from "../../entities/vacancy/types";

const initialState: IVacancyInitialState = {
    vacancies: [],
    savedVacancies: [],
    search: '',
    sortCollection: 'По дате размещения',
    currentPage: 0,
    allVacancy: false,
    YourSkills: [],
    Grade: [],
    moreDetails: '',
    developer: ['Любая'],
    addition_Job: ['Любой'],
    remotely: false,
    todoList: [],
    firstDetails: '',
    secondDetails: [],
    threeDetails: [],
    sex: null,
    textarea: '',
    save: false,
    input: false
}

export const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSortCollection: (state, action: PayloadAction<string>) => {
            state.sortCollection = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setAllVacancy: (state, action: PayloadAction<boolean>) => {
            state.allVacancy = action.payload;
        },
        setGrade: (state, action: PayloadAction<string[]>) => {
            state.Grade = action.payload;
        },
        setYourSkills: (state, action: PayloadAction<string[]>) => {
            state.YourSkills = action.payload;
        },
        setDeveloper: (state, action: PayloadAction<string[]>) => {
            state.developer = action.payload;
        },
        setAdditionJob: (state, action: PayloadAction<string[]>) => {
            state.addition_Job = action.payload;
        },
        setRemotely: (state, action: PayloadAction<boolean>) => {
            state.remotely = action.payload;
        },
        addVacancy: (state, action: PayloadAction<IVacancySlice>) => {
            state.vacancies.push(action.payload);
        },
        setSex: (state, action: PayloadAction<boolean | null>) => {
            state.sex = action.payload;
        },
        setTextarea: (state, action: PayloadAction<string>) => {
            state.textarea = action.payload;
        },
        setSave: (state, action: PayloadAction<boolean>) => {
            state.save = action.payload;
        },
        setInput: (state, action: PayloadAction<boolean>) => {
            state.input = action.payload;
        },
        addSavedVacancy: (state, action: PayloadAction<ISavedVacancy>) => {
            state.savedVacancies.push(action.payload);
        },
        clearSavedVacancies: (state) => {
            state.savedVacancies = [];
        },
        removeSavedVacancies: (state, action: PayloadAction<number>) => {
            state.savedVacancies = state.savedVacancies.filter(vacancy => vacancy.id !== action.payload);
        }
    },
});

export const { 
    setSearch, setSortCollection, setAllVacancy, setCurrentPage, 
    setGrade, setYourSkills, setDeveloper, setAdditionJob, 
    setRemotely, addVacancy, setSex, setTextarea, setSave, 
    setInput, addSavedVacancy, clearSavedVacancies, removeSavedVacancies
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;