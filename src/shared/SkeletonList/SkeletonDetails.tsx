import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonDetails: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={1200}
    height={1200}
    viewBox="0 0 1200 1200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
        {/* Аватар компании */}
        <circle cx="60" cy="60" r="50" />

{/* Название компании */}
<rect x="180" y="40" rx="5" ry="5" width="300" height="40" />


{/* Требования (навыки) */}
<rect x="20" y="210" rx="5" ry="5" width="200" height="20" /> {/* y="230" */}
<rect x="20" y="240" rx="5" ry="5" width="200" height="20" /> {/* y="260" */}
<rect x="20" y="270" rx="5" ry="5" width="200" height="20" /> {/* y="290" */}

<rect x="20" y="330" rx="5" ry="5" width="200" height="20" /> {/* y="160" */}
{/* Тип занятости */}
<rect x="20" y="370" rx="5" ry="5" width="200" height="20" /> {/* y="370" */}

{/* Описание вакансии */}
<rect x="20" y="450" rx="5" ry="5" width="800" height="20" /> {/* y="450" */}
<rect x="20" y="480" rx="5" ry="5" width="750" height="20" /> {/* y="480" */}
<rect x="20" y="510" rx="5" ry="5" width="700" height="20" /> {/* y="510" */}
<rect x="20" y="540" rx="5" ry="5" width="800" height="20" /> {/* y="450" */}
<rect x="20" y="570" rx="5" ry="5" width="750" height="20" /> {/* y="480" */}
<rect x="20" y="600" rx="5" ry="5" width="700" height="20" /> {/* y="510" */}

{/* Ожидания от кандидата */}
<rect x="20" y="650" rx="5" ry="5" width="800" height="20" /> {/* y="590" */}
<rect x="20" y="680" rx="5" ry="5" width="750" height="20" /> {/* y="620" */}
<rect x="20" y="710" rx="5" ry="5" width="700" height="20" /> {/* y="650" */}

{/* Чем предстоит заниматься */}
<rect x="20" y="740" rx="5" ry="5" width="800" height="20" /> {/* y="730" */}
<rect x="20" y="770" rx="5" ry="5" width="750" height="20" /> {/* y="760" */}
<rect x="20" y="800" rx="5" ry="5" width="700" height="20" /> {/* y="790" */}

{/* Кнопка "Откликнуться" */}
<rect x="20" y="870" rx="10" ry="10" width="150" height="40" /> {/* y="870" */}
<rect x="740" y="870" rx="5" ry="5" width="25" height="25" /> 
  </ContentLoader>
);

export default SkeletonDetails;

