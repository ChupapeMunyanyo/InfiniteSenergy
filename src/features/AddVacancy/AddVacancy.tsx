import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setSex, setTextarea, addSavedVacancy } from "../../processes/vacancies/vacancySlice";

export const AddVacancy = () => {
    const dispatch = useDispatch();
    const { textarea, sex } = useSelector((state: RootState) => state.vacancies);
    const maxLength = 800;

    const [surname, setSurname] = React.useState("");
    const [name, setName] = React.useState("");
    const [companyName, setCompanyName] = React.useState("");
    const [dayBorn, setDayBorn] = React.useState("");
    const [monthBorn, setMonthBorn] = React.useState("Не указан");
    const [yearBorn, setYearBorn] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [techStack, setTechStack] = React.useState("");
    const [grade, setGrade] = React.useState("Любая");
    const [workType, setWorkType] = React.useState("Любой");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        if (newText.length <= maxLength) {
            dispatch(setTextarea(newText));
        }
    };

    const isFormValid = () => {
        return (
            surname.trim() !== "" &&
            name.trim() !== "" &&
            companyName.trim() !== "" &&
            sex !== null &&
            phone.trim() !== "" &&
            techStack.trim() !== "" &&
            textarea.trim() !== ""
        );
    };

    const handleSave = () => {
        const vacancyData = {
            id:Date.now(),
            surname,
            name,
            companyName,
            sex,
            dayBorn,
            monthBorn,
            yearBorn,
            phone,
            techStack,
            grade,
            workType,
            description: textarea
        };

        dispatch(addSavedVacancy(vacancyData));

        // Это используется для очистки формы после её сохранения
        setSurname("");
        setName("");
        setCompanyName("");
        setDayBorn("");
        setYearBorn("");
        setPhone("");
        setTechStack("");
        setGrade("Любая");
        setWorkType("Любой");
        dispatch(setTextarea(""));
        dispatch(setSex(null));
    };

    const remainingChars = maxLength - textarea.length;

    const monthBornOptions = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ];
    const qualification = [ "Любая", "Intern", "Junior", "Middle", "Senior", "Lead" ];
    const typeWork = [ "Любой", "Полный рабочий день", "Неполный рабочий день" ];

    return (
        <div className="addVacancyWrapper">
            <div className="addVacancy">
                <div className="addVacancyBorder">
                    <h1>Заполните основную информацию</h1>
                    <div className="FIO">
                        <div className="surname">
                            <h3>Фамилия</h3>
                            <input
                                type="text"
                                placeholder="Фамилия"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>
                        <div className="name">
                            <h3>Имя</h3>
                            <input
                                type="text"
                                placeholder="Имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="nameCompany">
                            <h3>Название компании</h3>
                            <input
                                type="text"
                                placeholder="Название компании"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="sex">
                        <h3>Пол</h3>
                        <div className="buttons">
                            <button
                                onClick={() => dispatch(setSex(true))}
                                className={`man ${sex ? "noMan" : ""}`}
                            >
                                Мужской
                            </button>
                            <button
                                onClick={() => dispatch(setSex(false))}
                                className={`woman ${sex === false ? "noWoman" : ""}`}
                            >
                                Женский
                            </button>
                        </div>
                    </div>
                    <div className="dateBorn">
                        <div className="borns">
                            <div className="dayBorn">
                                <input
                                    type="tel"
                                    placeholder="День рождения"
                                    value={dayBorn}
                                    onChange={(e) => setDayBorn(e.target.value)}
                                />
                            </div>
                            <div className="monthBorn">
                                <select
                                    value={monthBorn}
                                    onChange={(e) => setMonthBorn(e.target.value)}
                                >
                                    {monthBornOptions.map((obj, index) => (
                                        <option key={index}>{obj}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="yearBorn">
                                <input
                                    type="tel"
                                    placeholder="Год рождения"
                                    value={yearBorn}
                                    onChange={(e) => setYearBorn(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="numberPhone">
                            <h3>Номер телефона</h3>
                            <input
                                type="tel"
                                placeholder="+7"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="stekTehnology">
                            <h3>Стек технологий</h3>
                            <input
                                type="text"
                                placeholder="Стек технологий"
                                value={techStack}
                                onChange={(e) => setTechStack(e.target.value)}
                            />
                        </div>
                        <div className="classGrade">
                            <h3>Уровень</h3>
                            <select
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                            >
                                {qualification.map((obj) => (
                                    <option key={obj}>{obj}</option>
                                ))}
                            </select>
                        </div>
                        <div className="typeWork">
                            <h3>Тип занятости</h3>
                            <select
                                value={workType}
                                onChange={(e) => setWorkType(e.target.value)}
                            >
                                {typeWork.map((obj) => (
                                    <option key={obj}>{obj}</option>
                                ))}
                            </select>
                        </div>
                        <div className="textVacancy">
                            <h3>Описание</h3>
                            <textarea
                                value={textarea}
                                maxLength={maxLength}
                                onChange={handleChange}
                                className="textarea"
                                placeholder="Что вы можете рассказать"
                            ></textarea>
                            <div className="savevac">
                                <div className="ost">
                                    Осталось символов:{""}
                                    <span style={{ color: remainingChars < 150 ? "red" : "black" }}>
                                        {remainingChars}
                                    </span>
                                </div>
                                <div className="buttonSave">
                                    <button onClick={handleSave} disabled={!isFormValid()}>Сохранить вакансию</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
