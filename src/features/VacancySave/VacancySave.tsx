import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { clearSavedVacancies, removeSavedVacancies } from "../../processes/vacancies/vacancySlice";
import { addSavedVacancy } from "../../processes/vacancies/vacancySlice";

export const VacancySave: React.FC = () => {
    const dispatch = useDispatch();
    const { savedVacancies } = useSelector((state: RootState) => state.vacancies);

    // Загрузка данных из localStorage при монтировании компонента

    React.useEffect(() => {
        const savedData = localStorage.getItem('savedVacancies');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            // Проверяем, чтобы не добавлять дубликаты
            if (parsedData.length > 0 && savedVacancies.length === 0) {
                parsedData.forEach((vacancy: any) => {
                    dispatch(addSavedVacancy(vacancy));
                });
            }
        }
    }, [dispatch, savedVacancies.length]); // Зависимость от длины savedVacancies

    // Сохранение данных в localStorage при каждом изменении savedVacancies
    React.useEffect(() => {
        localStorage.setItem('savedVacancies', JSON.stringify(savedVacancies));
    }, [savedVacancies]);

    
    const handleClearAll = () => {
        dispatch(clearSavedVacancies());
        localStorage.removeItem('savedVacancies'); // Очищаем localStorage
    };

    const handleRemoveIndexVacancies = (id:number) => {
        dispatch(removeSavedVacancies(id))
    }
    return (
        <div className="vacancySaveWrapper">
            <div className="vacancySave">
                <h1>Сохраненные вакансии</h1>
                {savedVacancies.length > 0 && (
                    <button onClick={handleClearAll} className="clearVacancy">
                        Очистить все
                    </button>
                )}
            </div>
            {savedVacancies.length === 0 ? (
                <p className="noSaveVacancy">Нет сохраненных вакансий</p>
            ) : (
                <div className="vacancy-list">
                    {savedVacancies.map((vacancy, index) => (
                        <div key={index} className="savedVacancy">
                            <h2>{vacancy.companyName} - {vacancy.name} {vacancy.surname}</h2>
                            <p>Пол: {vacancy.sex === true ? "Мужской" : vacancy.sex === false ? "Женский" : "Не указан"}</p>
                            <p>Дата рождения: {vacancy.dayBorn} {vacancy.monthBorn} {vacancy.yearBorn}</p>
                            <p>Телефон: {vacancy.phone}</p>
                            <p>Стек технологий: {vacancy.techStack}</p>
                            <p>Уровень: {vacancy.grade}</p>
                            <p>Тип занятости: {vacancy.workType}</p>
                            <p>Описание: {vacancy.description}</p>
                            {
                                savedVacancies.length > 1?(
                                    <button className="removeButton" onClick={() => handleRemoveIndexVacancies(vacancy.id)}>Удалить вакансию</button>
                                ):(
                                    <button className="removeButton" onClick={handleClearAll}>Удалить вакансию</button>
                                )
                            }
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};