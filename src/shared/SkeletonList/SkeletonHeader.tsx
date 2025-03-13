import React from "react";
import ContentLoader from "react-content-loader";

export const SkeletonHeader: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={1600}
    height={80}
    viewBox="0 0 1390 80"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Логотип "MiJob" */}
    <rect x="0" y="20" rx="5" ry="5" width="100" height="40" />

    {/* Список меню (Вакансии, Страница вакансии, Добавить вакансию) */}
    <rect x="340" y="30" rx="5" ry="5" width="80" height="20" />
    <rect x="535" y="30" rx="5" ry="5" width="170" height="20" />
    <rect x="800" y="30" rx="5" ry="5" width="170" height="20" />

    {/* Иконки (колокольчик, сообщение, меню пользователя) */}
    <circle cx="1200" cy="40" r="15" />
    <circle cx="1250" cy="40" r="15" />
    <circle cx="1300" cy="40" r="15" />
  </ContentLoader>
);

export default SkeletonHeader;