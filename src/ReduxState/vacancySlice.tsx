import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IVacancy {
    id: number;
    company_name: string;
    developer: string[];
    date: string;
    job_title: string;
    price: number;
    addition_Job: string[];
    YourSkills: string[];
    Grade: string[];
    photo_Company: string;
    photo_OnSave: string;
    photo_Save: string;
    photo_Modal: string;
    remotely: boolean;
    todoList: string[];
    firstDetails: string;
    secondDetails: string[];
    threeDetails: string[];
}

interface ISavedVacancy {
    id:number;
    surname: string;
    name: string;
    companyName: string;
    sex: boolean | null;
    dayBorn: string;
    monthBorn: string;
    yearBorn: string;
    phone: string;
    techStack: string;
    grade: string;
    workType: string;
    description: string;
}

interface IVacancyInitialState {
    vacancies: IVacancy[];
    savedVacancies: ISavedVacancy[];
    search: string;
    sortCollection: string;
    currentPage: number;
    allVacancy: boolean;
    YourSkills: string[];
    Grade: string[];
    moreDetails: string;
    developer: string[];
    addition_Job: string[];
    remotely: boolean;
    todoList: string[];
    firstDetails: string;
    secondDetails: string[];
    threeDetails: string[];
    sex: boolean | null;
    textarea: string;
    save: boolean;
    input: boolean;
}

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
        addVacancy: (state, action: PayloadAction<IVacancy>) => {
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