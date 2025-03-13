import { createRoot } from 'react-dom/client'
import "./app/styles/index.css"
import { store } from './app/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
