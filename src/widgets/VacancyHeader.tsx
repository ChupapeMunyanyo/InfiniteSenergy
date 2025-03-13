import { useNavigate } from "react-router-dom";
export const VacancyHeader = () => {
  const navigateVacancy = useNavigate()
  const navigateAddVacancy = useNavigate()
  const navigateSaveVacancy = useNavigate()
    return (
      <header className="header">
        <div className="header_menu">
          <h1>MiJob</h1>
          <ul className="header_list">
            <li onClick={() => navigateVacancy('/')} className="BackOnPageVacancies">Вакансии</li>
            <li onClick={() => navigateAddVacancy('/vacancypage/addVacancy')} >Добавить вакансию</li>
            <li onClick={() => navigateSaveVacancy('/vacancypage/saveVacancy')} >Ваши вакансии</li>
          </ul>
          <div className="header_image">
            <img src="https://cdn-icons-png.flaticon.com/128/3239/3239952.png" alt="" className="bell" />
            <img src="https://cdn-icons-png.flaticon.com/128/7769/7769888.png" alt="" className="message" />
            <img src="https://cdn-icons-png.flaticon.com/128/149/149071.png" alt="" className="personalmenu" />
          </div>
        </div>
      </header>
    );
  };
  