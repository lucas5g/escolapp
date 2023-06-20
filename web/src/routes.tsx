import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { Game } from './pages/Schedule'
import { Group } from './pages/Group'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Modality } from './pages/Modality'
import { Place } from './pages/Place'
import { Team } from './pages/Team'
import { User } from './pages/User'
import { Point } from './pages/Point'
import { Game } from './pages/Game'
import { Account } from './pages/Account'
import { Logout } from './pages/Logout'


const routesPrivate = createBrowserRouter([
  { path: '/', element: <Home />},
  { path: '/home', element: <Home /> },
  { path: '/turmas', element: <Group /> },
  { path: '/modalidades', element: <Modality /> },
  { path: '/equipes', element: <Team /> },
  { path: '/locais', element: <Place /> },
  { path: '/jogos', element: <Game /> },
  { path: '/pontos', element:<Point />},
  { path: '/usuarios', element: <User /> },
  { path: '/conta', element: <Account />},
  { path: '/sair', element: <Logout />},
  { path: '*', element: <Home /> }, 

])

const routesPublic = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '*', element: <Login /> },
  
])


export function Routes() {

  const accessToken = localStorage.getItem('accessToken')

  return <RouterProvider router={ accessToken ? routesPrivate : routesPublic   } />

}