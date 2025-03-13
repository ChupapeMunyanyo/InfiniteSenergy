import { VacancyDetails } from '../features/VacancyDetails/VacancyDetails'
import { VacancyHeader } from '../widgets/VacancyHeader'
import { AddVacancy } from '../features/AddVacancy/AddVacancy'
import { VacancySave } from '../features/VacancySave/VacancySave'
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