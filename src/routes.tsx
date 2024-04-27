import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { CreateRecipes } from './pages/CreateRecipes'
import { RecipePage } from './pages/RecipePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create',
    element: <CreateRecipes />,
  },
  {
    path: '/recipe',
    element: <RecipePage />,
  },
])
