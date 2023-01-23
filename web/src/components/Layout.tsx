import Link from "next/link";
import cx from 'classnames'

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFetch } from "@/utils/useFetch";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { sleep } from "../utils";

interface LayoutProps {
  children?: ReactNode
}

export function Layout({ children }: LayoutProps) {

  const router = useRouter()
  const [routerActive, setRouterActive] = useState('')

  useEffect(() => {
    setRouterActive(router.asPath)
  }, [router.asPath])

  return (
    <div className="h-screen flex flex-col justify-between">
      <header className="py-4 px-5 bg-blue-500 font-bold text-white text-xl flex justify-between">
        <Link href={'/'}>
          JISA
        </Link>
  
      </header>
      <main className="flex-auto flex bg-blue-50">
        <aside className="w-60 text-sm border-r">
          <ul>
            {['Turmas', 'Modalidades', 'Locais', 'Usuários'].map(menu => (
              <Link href={menu.toLocaleLowerCase().replace('á', 'a')} key={menu}>
                <li
                  className={cx('hover:bg-blue-100 pl-5 py-2 font-semibold text-gray-500 active:bg-blue-200', {
                    'bg-blue-200 text-gray-600': routerActive.includes(menu.toLocaleLowerCase().replace('á', 'a'))
                  })}

                >
                  {menu}
                </li>
              </Link>
            ))}
            <li
              className='hover:bg-blue-100 pl-5 py-2 font-semibold text-gray-500 active:bg-blue-200 cursor-pointer'
              title="Sair"
              onClick={() => {
                if (!confirm('Deseja sair?')) return
                localStorage.clear()
                window.location.href = '/login'
              }}
            >
              Sair
            </li>
          </ul>
        </aside>

        <section className="w-full  p-5">
          {children}
        </section>
      </main>
      {/* {!session &&
        <Login />
      } */}
      <footer className="bg-gradient-to-r from-blue-500 to-red-400 p-5 text-center text-zinc-200 text-sm">
        &copy; JISA 2022
      </footer>
    </div >
  )
}

