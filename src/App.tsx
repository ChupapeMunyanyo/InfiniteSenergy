import React from "react"

import { VacancyHeader } from "./HabrVacancy/VacancyHeader"
import { VacancyMain } from "./HabrVacancy/VacancyMain"
import { Search } from "./HabrVacancy/Search";
import SkeletonSearch from "./SkeletonList/SkeletonSearch";
import SkeletonHeader from "./SkeletonList/SkeletonHeader";
import SkeletonMain from "./SkeletonList/SkeletonMain";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setSortCollection, setAllVacancy, setCurrentPage, setGrade, setYourSkills, setDeveloper, setAdditionJob, setRemotely } from './ReduxState/vacancySlice'
import { RootState, AppDispatch } from "./ReduxState/store";
import { useGetVacanciesQuery } from './ReduxState/vacancyApi'
interface IVacancy {
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
export const App:React.FC = () => {
      const dispatch = useDispatch<AppDispatch>()
      const { data:vacancies=[], isLoading } = useGetVacanciesQuery()  
      const { search, sortCollection, allVacancy, currentPage, Grade, YourSkills, developer, addition_Job, remotely } = useSelector((state:RootState)=>state.vacancies)
      
      const searchVacancy = vacancies
        .filter((obj)=>{
        return obj.job_title.toLowerCase().includes(search.toLowerCase())
      }).filter((obj) => {
        return Grade.includes("Любая") || Grade.some((level) => obj.Grade.includes(level))
      }).filter((obj) => { // Если выбрана "Любая", то сбрасываем остальные
        return developer.includes("Любая") || developer.some((level) => obj.developer.includes(level))//Если "Любая" не выбрана, то проверяется,
        //соответствует ли хотя бы одно выбранное направление разработки (level) направлению разработки вакансии (obj.developer).
        //Метод some возвращает true, если хотя бы один элемент массива developer удовлетворяет условию
      }).filter((obj) => {
        return addition_Job.includes("Любой") || addition_Job.some((level) => obj.addition_Job.includes(level))
      }).filter((obj) => {
        return !remotely || obj.remotely // Если remotely === true, то оставляем только вакансии удалённо
      }).filter((obj) => {
          // Фильтрация по навыкам (YourSkills)
        if (YourSkills.length === 0) return true; // Если навыки не выбраны, пропускаем фильтрацию
        return YourSkills.every((skill) => obj.YourSkills.includes(skill)); // Проверяем, что все выбранные навыки есть в вакансии
      })
      .sort(( a, b ) => {
        if (sortCollection==='По дате размещения') {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        } else if (sortCollection==='По убыванию зарплаты') {
          return b.price - a.price
        } else if (sortCollection ==='По возрастанию зарплаты') {
          return a.price - b.price
        } return 0
      })
      const amountPage = 10;
      const firstPageIndex = currentPage * amountPage;
      const lastPageIndex = firstPageIndex + amountPage;
      const currentVacancy = searchVacancy.slice(firstPageIndex, lastPageIndex);      
      const totalPages = Math.ceil(searchVacancy.length / amountPage);
      const shouldShowPagination = !allVacancy && searchVacancy.length > amountPage; 
  return (
    <div className="wrapper">
      {
        isLoading?(
          <ul className="skeleton-header">
            <SkeletonHeader/>
          </ul>
        ):(
          <VacancyHeader/>
        )
      }
      {
        isLoading?(
          <ul className="skeleton-search">
            <SkeletonSearch/>
          </ul>
        ):(
          <Search 
          search={search} 
          setSearch={ ( value: string ) => {
            dispatch( setSearch ( value ))
            dispatch( setCurrentPage(0))}}
          sortCollection={sortCollection} 
          setSortCollection={( value: string ) => {
            dispatch( setSortCollection ( value ))}}
          allVacancy={allVacancy} 
          setAllVacancy={( value: boolean ) => {
            dispatch( setAllVacancy (value))}} 
          amountVacancy={searchVacancy.length}
          Grade={Grade}
          setGrade={ (value: string[] ) => {
            dispatch( setGrade ( value ))
            dispatch( setCurrentPage(0))}}
          YourSkills={YourSkills}
          setYourSkills={ (value:string[] ) => {
            dispatch( setYourSkills( value ))
            dispatch( setCurrentPage(0))}}
          developer={developer}
          setDeveloper={ (value:string[]) => {
            dispatch( setDeveloper( value))
            dispatch( setCurrentPage(0))}}
          addition_Job={addition_Job}
          setAdditionJob={ (value:string[]) => {
            dispatch( setAdditionJob( value))
            dispatch( setCurrentPage(0))}}
          remotely={remotely}
          setRemotely={ (value: boolean) =>{
            dispatch( setRemotely( value ))
            dispatch( setCurrentPage(0))}}
          todoList={YourSkills}/>
        )
      }
      {
        isLoading?(
          <ul className="skeleton-list">
            <SkeletonMain/>
            <SkeletonMain/>
            <SkeletonMain/>
            <SkeletonMain/>
          </ul>
        ):(
          ( allVacancy? searchVacancy: currentVacancy).map((obj:IVacancy) => (
              <VacancyMain
                id={obj.id}
                key={obj.id}
                nameCompany={obj.company_name}
                developer={obj.developer}
                date={obj.date}
                job_title={obj.job_title}
                price={obj.price}
                addition_Job={obj.addition_Job}
                YourSkills={obj.YourSkills}
                Grade={obj.Grade}
                photo_Company={obj.photo_Company}
                photo_OnSave={obj.photo_OnSave}
                photo_Save={obj.photo_Save}
                photo_Modal={obj.photo_Modal}
              />
            ))
          )
      }
      {
        shouldShowPagination &&(
          <ul className="pagination">
            {
              [...Array(totalPages)].map((_,index)=><li key={index} onClick={()=>dispatch(setCurrentPage(index))} className={currentPage===index?'pagactive':''}>{index+1}</li>)
            }
          </ul>
        )
      }
    </div>
  )
}
