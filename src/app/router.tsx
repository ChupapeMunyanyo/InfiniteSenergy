import { VacancyDetails } from '../Pages/VacancyDetails'
import { VacancyHeader } from '../widgets/VacancyHeader'
import { AddVacancy } from '../Pages/AddVacancy'
import { VacancySave } from '../Pages/VacancySave'
import { createBrowserRouter } from 'react-router-dom'
import { App } from '../app/App'
export const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:`/vacancypage/:pageId`,
    element:(
      <>
        <VacancyHeader/>
        <VacancyDetails/>
      </>
    )
  },
  {
    path:`/vacancypage/saveVacancy`,
    element:(
      <>
      <VacancyHeader/>
      <VacancySave/>
      </>
    )
  },
  {
    path:`/vacancypage/addVacancy`,
    element:(
      <>
      <VacancyHeader/>
      <AddVacancy/>
      </>
    )
  }
])