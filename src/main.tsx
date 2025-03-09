import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { store } from './ReduxState/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { VacancyDetails } from './HabrVacancy/VacancyDetails'
import { VacancyHeader } from './HabrVacancy/VacancyHeader'
import { AddVacancy } from './HabrVacancy/AddVacancy'
import { VacancySave } from './HabrVacancy/VacancySave'
const router = createBrowserRouter([
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
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
