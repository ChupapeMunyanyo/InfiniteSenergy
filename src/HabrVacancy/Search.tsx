import React from "react";
import krest from "../image/icons8-крестик-78-Photoroom.png";
import { setInput } from "../ReduxState/vacancySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../ReduxState/store";
interface SearchProps {
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
export const Search = ({
  search,
  setSearch,
  sortCollection,
  setSortCollection,
  amountVacancy,
  setAllVacancy,
  allVacancy,
  setGrade,
  developer,
  setDeveloper,
  setAdditionJob,
  remotely,
  setRemotely,
  YourSkills,
  setYourSkills,
}: SearchProps) => {
  const dispatch = useDispatch()
  const { input } = useSelector((state:RootState) => state.vacancies)
  const qualification = [
    "Любая",
    "Intern",
    "Junior",
    "Middle",
    "Senior",
    "Lead",
  ];
  const skills = [
    "React",
    "NodeJS",
    "TypeScript",
    "Python",
    "Java",
    "Аналитик данных",
    "Swift",
    "Git",
    "SQL",
    "PostgreSQL",
    "MySQL",
    "Базы данных",
    "JavaScript",
  ];
  // const [input, setInput] = React.useState(false);
  const developers = ["Любая", "Frontend Developer", "Backend Developer"];
  const addition = ["Любой", "Полный рабочий день", "Неполный рабочий день"];
  React.useEffect(() => {
    setGrade([qualification[0]]); // Устанавливаем первый элемент при загрузке
  }, []);

  // Обработчик выбора навыка
  const handleSkillClick = (skill: string) => {
    if (!YourSkills.includes(skill)) {
      setYourSkills([...YourSkills, skill]); // Добавляем навык в список
    }
    setSearch(""); // Очищаем поле ввода
    dispatch(setInput(false)); // Скрываем список навыков
  };

  // Обработчик удаления навыка
  const handleRemoveSkill = (skill: string) => {
    setYourSkills(YourSkills.filter((s) => s !== skill)); // Удаляем навык из списка
  };
  // Обработчик очистки всех навыков
  const handleClearSkills = () => {
    setYourSkills([]); // Сбрасываем YourSkills в пустой массив
  };
  return (
    <div className="searchCenter">
      <div className="main_search">
        <h1>Работа и вакансии</h1>
        <div className="buttons">
          <button onClick={() => setAllVacancy(!allVacancy)} className="all">
            <span className={allVacancy ? "nostandart" : "standart"}>
              ВСЕ ВАКАНСИИ
            </span>
            <span className={allVacancy ? "allvac" : "noallvac"}>
              ФИЛЬТРАЦИЯ ПО СТРАНИЦАМ
            </span>
          </button>
          <button className="suitable">ПОДХОДЯЩИЕ</button>
        </div>
        <div className="inputs">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="searchText"
            placeholder="Поиск"
          />
          <select
            value={sortCollection}
            onChange={(e) => setSortCollection(e.target.value)}
            className="searchVariants"
            name=""
            id=""
          >
            <option className="searchVariants" value="По дате размещения">
              По дате размещения
            </option>
            <option value="По убыванию зарплаты">По убыванию зарплаты</option>
            <option value="По возрастанию зарплаты">
              По возрастанию зарплаты
            </option>
          </select>
        </div>
        <p className="found">Найдено {amountVacancy} вакансий</p>
      </div>
      <div className="sideBar">
        <div className="professionalSkills">
          <p className="qualificationP">Специализация</p>
          <select
            defaultValue={developer[0]}
            className="qualificationInput"
            onChange={(e) => {
              const selectedDeveloper = Array.from(
                e.target.selectedOptions, //Свойство selectedOptions возвращает коллекцию выбранных элементов (<option>) в выпадающем списке.
                (option) => option.value
              ); // selectedDeveloper преобразует коллекцию selectedOptions в массив строк, где каждая строка — это значение (value) выбранного элемента <option>.
              if (selectedDeveloper.includes("Любая")) {
                setDeveloper(["Любая"]); // Если выбрана "Любая", то сбрасываем остальные
              } else {
                //Если "Любая" не выбрана, то обновляем состояние developer в Redux, устанавливая его в массив выбранных значений
                setDeveloper(selectedDeveloper);
              }
            }}
          >
            {developers.map((obj, index) => (
              <option key={index} value={obj}>
                {obj}
              </option>
            ))}
          </select>
        </div>
        <div className="qual">
          <p className="qualificationP">Квалификация</p>
          <select
            defaultValue={qualification[0]}
            className="qualificationSelect"
            onChange={(e) => {
              const selectedValues = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              if (selectedValues.includes("Любая")) {
                setGrade(["Любая"]); // Если выбрана "Любая", то сбрасываем остальные
              } else {
                setGrade(selectedValues);
              }
            }}
          >
            {qualification.map((obj, index) => (
              <option key={index} value={obj}>
                {obj}
              </option>
            ))}
          </select>
        </div>
        <div className="qual">
          <p className="qualificationP">Тип занятости</p>
          <select
            defaultValue={addition[0]}
            className="qualificationType"
            onChange={(e) => {
              const selectedValues = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              if (selectedValues.includes("Любой")) {
                setAdditionJob(["Любой"]); // Если выбрана "Любая", то сбрасываем остальные
              } else {
                setAdditionJob(selectedValues);
              }
            }}
          >
            {addition.map((obj, index) => (
              <option key={index} value={obj}>
                {obj}
              </option>
            ))}
          </select>
          <div className="remotely">
            <input
              type="checkbox"
              checked={remotely}
              onChange={(e) => setRemotely(e.target.checked)}
            />
            <p>Можно удалённо</p>
          </div>
          <div className="qual">
            <p className="qualificationP">Профессиональные навыки</p>
            <div className="searchContainer">
              <div className="row">
                <button
                  className="iinput"
                  value={search}
                  onClick={() => dispatch(setInput(!input))}
                >
                  Выберите навык
                </button>
                {input && (
                  <select multiple className="ulList">
                    {skills.map((skill) => (
                      <option
                        className="skillLi"
                        key={skill}
                        onClick={() => handleSkillClick(skill)}
                      >
                        {skill}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="skillsContainer">
                {YourSkills.map((skill) => (
                  <div key={skill} className="skillС">
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="removeSkill"
                    >
                      <img className="krest" src={krest} alt="" />
                    </button>
                  </div>
                ))}
              </div>
              {YourSkills.length > 0 && (
                <button
                  onClick={handleClearSkills}
                  className="clearSkillsButton"
                >
                  Очистить
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// "React", "NodeJS", "TypeScript", "Python", "Java","Аналитик данных","Swift","Git","SQL","PostgreSQL","MySQL","Базы данных","JavaScript"
// "Intern", "Junior", "Middle", "Senior", "Lead"
