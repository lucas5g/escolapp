import { ReactNode} from "react";
import { Aside } from "./Aside";
import { Header } from "./Header";
import { Title } from "./Title";
import { swr } from "../utils/swr";

interface Props {
  children: ReactNode
}
export function Layout({ children }: Props) {

  const { data } = swr('/')
  if(localStorage.getItem('release') !== data?.api && data){
    localStorage.setItem('release', data.api)
    window.location.href = '/login'

  }

  return (
    <div className="h-screen flex flex-col justify-between bg-blue-50">
      <Header />
      <main className="flex flex-1 lg:mt-[5.7em] mt-[6.3em] pb-4">
        <Aside />
        <section className="w-full  flex flex-col gap-3 px-3 lg:ml-[9em]">
          <Title />
          {children}
        </section>
      </main>
      {/* <Footer /> */}
    </div>

  )
}