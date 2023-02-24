import clsx from "clsx"
import { Link } from "react-router-dom"
import { menus } from "./Header"


export function Aside() {
  return (
    <aside className={'hidden lg:flex fixed hover:flex  w-[10em]  flex-col pb-10' }>
      {menus.map(menu => {
        return (
          <Link
            key={menu}
            onClick={() => scrollTo({top:0, behavior:'smooth'})}
            to={`/${menu.toLowerCase()}`}
            className={clsx('py-3 pl-5 text-gray-900 hover:text-gray-800 hover:bg-blue-100 transition-colors rounded ', {
              'text-gray-800 font-bold border-b-4 border-b-blue-300 rounded-none transition-colors': menu.toLocaleLowerCase() === location.pathname.replace('/', '') || menu === 'Home' && location.pathname === '/',
 
            })}>
            {menu}
          </Link>
        )
      })}
      <button 
        className="text-left pl-5 hover:bg-blue-100 py-3 rounded" 
        title="Sair da Plataforma"
        onClick={() => {
          localStorage.clear()
          location.href = '/login'
        }}
        >
        Sair
      </button>
    </aside>
  )
}