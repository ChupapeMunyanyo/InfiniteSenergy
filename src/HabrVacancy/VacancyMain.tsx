import React from "react";
import { useNavigate } from "react-router-dom";
interface IVacancyMain {
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
export const VacancyMain: React.FC<IVacancyMain> = ({
  id,
  nameCompany,
  date,
  job_title,
  price,
  addition_Job,
  YourSkills,
  photo_Company,
  photo_OnSave,
  photo_Save,
  photo_Modal,
}) => {
  const navigateVacancy = useNavigate()
  const [save, setSave] = React.useState(true);
  return (
    <main className="main">
      <div className="main_vacancy">
        <div className="main_vacancy_dop">
          <img className="avatar" src={photo_Company} alt="" />
          <div>
            <div className="data">
              <p className="compP">{nameCompany}</p>
              <p className="dataP">{date}</p>
            </div>
            <div className="allVacancy">
              <h2>{job_title}</h2>
              <p className="p1">{addition_Job}</p>
              <p className="p2">{price}</p>
              <div className="p3">
                {YourSkills?.map((skill, index) => (
                      <p key={index}>{skill}</p>
                    ))}
              </div>
            </div>
            <div className="remaining">
              <div className="pageVacancy">
              <button onClick={() => navigateVacancy(`/vacancypage/${id}`)} className="moreDetails">Подробнее...</button>
              </div>
              <div className="modalwindow">
              <img src={photo_Modal} alt="" className="saveModal" />
              {save ? (
                <img onClick={() => setSave(false)} src={photo_OnSave} alt="" className="saveVacancy"/>
              ) : (
                <img onClick={() => setSave(true)} src={photo_Save} alt="" className="saveVacancy"/>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
