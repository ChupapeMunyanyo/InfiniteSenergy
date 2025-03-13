import React from "react";
import ContentLoader from "react-content-loader";

export const SkeletonMain: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={800}
    height={200}
    viewBox="0 0 800 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >

    {/* Аватар компании */}
    <circle cx="30" cy="30" r="30" />

    {/* Название компании и дата */}
    <rect x="80" y="10" rx="3" ry="3" width="150" height="10" />
    <rect x="80" y="30" rx="3" ry="3" width="100" height="10" />

    {/* Название вакансии */}
    <rect x="80" y="70" rx="3" ry="3" width="300" height="15" />

    {/* Дополнительная информация о вакансии */}
    <rect x="80" y="100" rx="3" ry="3" width="250" height="10" />

    {/* Зарплата */}
    <rect x="80" y="120" rx="3" ry="3" width="100" height="10" />

    {/* Навыки */}
    <rect x="80" y="140" rx="3" ry="3" width="500" height="10" />

    {/* Иконки (сохранение, модальное окно) */}
    <rect x="100" y="170" rx="3" ry="3" width="24" height="24" />
    <rect x="700" y="170" rx="3" ry="3" width="24" height="24" />
  </ContentLoader>
);

export default SkeletonMain;