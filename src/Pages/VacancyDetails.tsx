import React from "react";
import { useParams } from "react-router-dom";
import { useGetVacanciesQuery } from "../processes/vacancies/vacancyApi";
import { SkeletonDetails } from "../shared/SkeletonList";
import { setSave } from "../processes/vacancies/vacancySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app";
import { IVacancyDetails } from "../entities/vacancy";
type IVacancyPartial = Partial<IVacancyDetails>;
export const VacancyDetails: React.FC<IVacancyPartial> = () => {
  const dispatch = useDispatch()
  const { save } = useSelector(( state:RootState ) => state.vacancies)
  // const [save, setSave] = React.useState(false);
  const [respond, setRespond] = React.useState(false);
  const { pageId } = useParams<{ pageId: string }>();
  const { data: vacancies = [], isLoading } = useGetVacanciesQuery();
  // Находим вакансию по id
  const vacancy = vacancies.find((v) => v.id === pageId);

  if (isLoading) {
    return (
      <div className="SkeletonDetails">
        <div>
          <SkeletonDetails />
        </div>
      </div>
    );
  }
  if (!vacancy) {
    return <div>Вакансия не найдена</div>;
  }
  return (
    <>
      <div className="vacancyDetails">
        <div className="backDet">
          <div className="backContainer">
            <div className="divDetails">
              <img src={vacancy.photo_Company} alt="" />
              <h1 className="nameCompanyDetails">{vacancy.job_title}</h1>
            </div>
            <div className="contentWithButtons">
              <div className="contentDetails">
                <div className="priceDetails">
                  <h2>Зарплата:</h2>
                  <p>{vacancy.price}</p>
                </div>
                <div className="skillsDetails">
                  <h2>Требования:</h2>
                  {vacancy.YourSkills?.map((skill, index) => (
                    <p key={index}>{skill}</p>
                  ))}
                </div>
                <div className="typeDetails">
                  <h2>Тип занятости:</h2>
                  <p>{vacancy.addition_Job}</p>
                </div>
              </div>
              <div className="VacancyInfo">
                <h1 className="VacDet">Описание вакансии:</h1>
                <div className="firstInfo">
                  <h2>О компании и команде</h2>
                  <p>{vacancy.firstDetails}</p>
                </div>
                <div className="secondInfo">
                  <h2>Ожидания от кандидата</h2>
                  {vacancy.secondDetails?.map((detail) => (
                    <p>-{detail}</p>
                  ))}
                </div>
                <div className="threeInfo">
                  <h2>Чем предстоит заниматься</h2>
                  {vacancy.threeDetails?.map((obj) => (
                    <p>-{obj}</p>
                  ))}
                  <div className="saveOnSave">
                    <button
                      onClick={() => setRespond(true)}
                      className="responds"
                    >
                      <span className={`open ${respond ? "noOpen" : ""}`}>
                        Откликнуться
                      </span>
                      <span className={`close ${respond ? "noClose" : ""}`}>
                        Вы откликнулись
                      </span>
                    </button>
                    <div className="saved">
                      {save ? (
                        <img
                          onClick={() => dispatch(setSave(false))}
                          src={vacancy.photo_Save}
                          alt=""
                          className="saveVacancy"
                        />
                      ) : (
                        <img
                          onClick={() => dispatch(setSave(true))}
                          src={vacancy.photo_OnSave}
                          alt=""
                          className="saveVacancy"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};