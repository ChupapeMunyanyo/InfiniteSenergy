export interface IVacancy {
    id:string;
    company_name: string;
    developer:string[];
    date: string;
    job_title: string;
    price: number;
    addition_Job: string[];
    YourSkills: string[];
    Grade:string[];
    photo_Company: string;
    photo_OnSave: string;
    photo_Save: string;
    photo_Modal: string;
}

export interface SearchProps {
    search: string;
    setSearch: (value: string) => void;
    sortCollection: string;
    setSortCollection: (value: string) => void;
    amountVacancy: number;
    setAllVacancy: (value: boolean) => void;
    allVacancy: boolean;
    Grade: string[];
    setGrade: (value: string[]) => void;
    YourSkills: string[];
    setYourSkills: (value: string[]) => void;
    developer: string[];
    setDeveloper: (value: string[]) => void;
    addition_Job: string[];
    setAdditionJob: (value: string[]) => void;
    remotely: boolean;
    setRemotely: (value: boolean) => void;
    todoList: string[];
}
export interface IVacancyDetails {
    job_title: string;
    price: number;
    addition_Job: string;
    YourSkills: string[];
    photo_Company: string;
    photo_OnSave: string;
    photo_Save: string;
    firstDetails: string;
    secondDetails: string[];
    threeDetails: string[];
}
export interface IVacancyMain {
    id:string;
    nameCompany: string;
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
}

export interface IVacancySlice {
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

export interface ISavedVacancy {
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

export interface IVacancyInitialState {
    vacancies: IVacancySlice[];
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