import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IVacancy {
    id: string;
    company_name: string;
    developer:string[];
    date: string;
    job_title: string;
    price: number;
    addition_Job: string[];
    YourSkills: string[];
    Grade:string[];
    moreDetails:string;
    photo_Company: string;
    photo_OnSave: string; 
    photo_Save: string;
    photo_Modal: string;
    remotely:boolean;
    todoList:string[];
    firstDetails:string;
    secondDetails:string[];
    threeDetails:string[];
    sex:boolean
}

export const vacancyApi = createApi ({
    reducerPath:'vacancyApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://67bb99dbed4861e07b37d20a.mockapi.io/ExampleFrontend'}),
    endpoints:(builder) => ({
        getVacancies:builder.query<IVacancy[], void>({
            query:() =>''
        }) 
    })
})
export const { useGetVacanciesQuery } = vacancyApi
