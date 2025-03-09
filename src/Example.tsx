import React, { useEffect, useState } from "react"
import { VacancyHeader } from "./HabrVacancy/VacancyHeader"
import { VacancyMain } from "./HabrVacancy/VacancyMain"
import { Search } from "./HabrVacancy/Search";
import SkeletonSearch from "./SkeletonList/SkeletonSearch";
import SkeletonHeader from "./SkeletonList/SkeletonHeader";
import SkeletonMain from "./SkeletonList/SkeletonMain";
interface IVacancy {
  id: string;
  nameCompany: string;
  date: string;
  job_title: string;
  price: number;
  addition_Job: string;
  YourSkills: string;
  photo_Company: string;
  photo_OnSave: string;
  photo_Save: string;
  photo_Modal: string;
}
export const App:React.FC = () => {
      const [ vacancy, setVacancy ] = useState<IVacancy[]>([]) 
      const [ isLoading, setLoading ] = useState(true)
      const [ search, setSearch ] = useState('')
      const [ sortSelection, setSortSelection] = useState('По дате размещения')
      const [ page, setPage ] = useState(0) 

      const searchVacancy = vacancy.filter((obj)=>{
        return obj.job_title.toLowerCase().includes(search.toLowerCase())
      }).sort((a,b)=>{
        if (sortSelection==='По дате размещения'){
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortSelection==='По убыванию зарплаты'){
          return b.price-a.price
        } else if(sortSelection==='По возрастанию зарплаты'){
          return a.price-b.price
        } 
        return 0
      })
      useEffect(() => {
        fetch(`https://67bb99dbed4861e07b37d20a.mockapi.io/ExampleFrontend`)
          .then((res) => res.json())
          .then((json) => {
            setVacancy(json);
          })
          .catch((err) => {
            console.warn(err);
            alert('Ошибка при загрузке данных');
          })
          .finally(() => setLoading(false));
      }, []);

      // ВСЁ ЭТО ДЛЯ ПАГИНАЦИИ
      const amountPage = 10; //Здесь создается константа amountPage, которая определяет количество вакансий, которые будут отображаться на одной странице.
      const firstPageIndex = page * amountPage;//Эта строка вычисляет индекс первой вакансии, которая должна отображаться на текущей странице. Индекс первой вакансии всегда будет равен текущей странице умноженной на количество вакансий на странице.
      const lastPageIndex = firstPageIndex + amountPage;//Эта строка вычисляет индекс последней вакансии, которая должна отображаться на текущей странице.Индекс последней вакансии всегда будет на 1 больше, чем индекс первой вакансии для текущей страницы.
      const currentVacancy = searchVacancy.slice(firstPageIndex,lastPageIndex);//Эта строка использует метод массива slice(), чтобы создать новый массив с вакансиями, которые должны отображаться на текущей странице. 
      // currentVacancy теперь будет содержать только те вакансии, которые нужно показать на текущей странице.
      const totalPages = Math.ceil(searchVacancy.length / amountPage);//Эта строка вычисляет общее количество страниц, которое нужно для отображения всех вакансий.(обязательно ceil)
      const shouldShowPagination = searchVacancy.length > amountPage;//Эта строка проверяет, нужно ли отображать пагинацию. Пагинация нужна только в том случае, если количество вакансий больше, чем количество вакансий на одной странице.
  return (
    <div>
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
          <Search search={search} setSearch={setSearch} sortSelection={sortSelection} setSortSelection={setSortSelection} amountVacancy={searchVacancy.length}/>
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
          currentVacancy.map((obj:IVacancy, index) => (
            <VacancyMain
              key={obj.id || index}
              nameCompany={obj.nameCompany}
              date={obj.date}
              job_title={obj.job_title}
              price={obj.price}
              addition_Job={obj.addition_Job}
              YourSkills={obj.YourSkills}
              photo_Company={obj.photo_Company}
              photo_OnSave={obj.photo_OnSave}
              photo_Save={obj.photo_Save}
              photo_Modal={obj.photo_Modal}
            />
          ))
        )
      }{
        shouldShowPagination &&(//Это условный рендеринг. Пагинация отображается только в том случае, если переменная shouldShowPagination равна true.
          <ul className="pagination">
          <img onClick={() => setPage((page) => Math.max(page - 1, 0))} src="https://cdn-icons-png.flaticon.com/128/54/54321.png" alt="" />
          {
            [...Array(totalPages)].map((_,index)=><li key={index} onClick={()=>setPage(index)} className={page===index?'pagactive':''}>{index+1}</li>)
          }
          <img onClick={() => setPage((page) => Math.min(page + 1, totalPages - 1))} src="https://cdn-icons-png.flaticon.com/128/54/54833.png" alt="" />
        </ul>
        )
      }
    </div>
  )
}