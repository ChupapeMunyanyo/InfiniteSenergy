import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonSearch: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={800}
    height={200}
    viewBox="0 0 800 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Заголовок "Работа и вакансии" */}
    <rect x="20" y="20" rx="5" ry="5" width="200" height="30" />

    {/* Кнопки "ВСЕ ВАКАНСИИ" и "ПОДХОДЯЩИЕ" */}
    <rect x="20" y="70" rx="5" ry="5" width="130" height="35" />
    <rect x="160" y="70" rx="5" ry="5" width="120" height="35" />

    {/* Поле ввода для поиска */}
    <rect x="20" y="130" rx="5" ry="5" width="440" height="35" />

    {/* Выпадающий список */}
    <rect x="480" y="130" rx="5" ry="5" width="140" height="35" />

    {/* Текст "Найдено 2346 вакансий" */}
    <rect x="20" y="180" rx="5" ry="5" width="300" height="20" />

  </ContentLoader>
);

export default SkeletonSearch