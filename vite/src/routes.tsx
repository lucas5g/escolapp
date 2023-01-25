import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { Game } from './pages/Game'
import { Group } from './pages/Group'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Modality } from './pages/Modality'
import { Place } from './pages/Place'
import { Team } from './pages/Team'


const routesPrivate = createBrowserRouter([
  { path: '/', element: <Home />},
  { path: '/home', element: <Home /> },
  { path: '/turmas', element: <Group /> },
  { path: '/modalidades', element: <Modality /> },
  { path: '/equipes', element: <Team /> },
  { path: '/locais', element: <Place /> },
  { path: '/jogos', element: <Game /> },
  { path: '*', element: <Home /> }, 
  {
  
  }
])

const routesPublic = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '*', element: <Login /> },
  
])


export function Routes() {

  const accessToken = localStorage.getItem('accessToken')

  // if(!accessToken) return redirect('/login')

  return <RouterProvider router={ accessToken ? routesPrivate : routesPublic} />



}