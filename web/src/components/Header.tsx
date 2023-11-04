import clsx from "clsx"
import { List, X } from "phosphor-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import logo from '../assets/logo.png'
import { menus } from "../utils/menus"
import { menuToUri } from "../utils/menu-to-uri"
import { storageLogged } from "../utils/storage-logged"



export function Header() {

  const [showMenu, setShowMenu] = useState(false)
  const logged = storageLogged()
  return (
    <header className="z-10">
      <nav className="bg-blue-500 fixed  w-full lg:py-2 px-5 py-4 flex items-center justify-between">
        <Link to='/' className="">
          <img src={logo} alt="Logo" className="md:h-16 h-14" />
        </Link>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="lg:hidden h-11 w-12 rounded text-white bg-blue-400 flex items-center justify-center transition-all border border-blue-300"
        >
          {!showMenu && <List size={40} />}
          {showMenu && <X size={40} />}

        </button>
        {/* {user?.name && */}
        <button
          title={logged?.email}
          className="hidden lg:block text-white bg-blue-300 rounded-full px-3 py-[.54em]">
          {logged?.email.slice(0, 2).toUpperCase()}
        </button>
        {/* } */}
      </nav>

      <nav className={clsx("lg:hidden md:mt-[5em] mt-[4em] fixed w-full flex flex-col bg-blue-50  text-gray-800 text-xl transition-all duration-500 ", {
        'hidden': !showMenu
      })}>
        {menus().map(menu => {
          return (
            <Link
              key={menu}
              to={`/${menuToUri(menu)}`}
              className={clsx('py-3 pl-5 text-gray-900 hover:text-gray-800 hover:bg-blue-100 transition-colors rounded ', {
                'text-gray-800 font-bold border-b-4 border-b-blue-300 rounded-none transition-colors': menuToUri(menu) === location.pathname.replace('/', '') || menu === 'Home' && location.pathname === '/',
              })}>
              {menu}
            </Link>
          )
        })}
      </nav>

    </header>
  )
}
