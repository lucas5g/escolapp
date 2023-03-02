import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Aside } from "./Aside";
import { Card } from "./Card";
import { Footer } from "./Footer";
import { Header, menus } from "./Header";
import { Title } from "./Title";

interface Props {
  children: ReactNode
}
export function Layout({ children }: Props) {


  return (
    <div className="h-screen flex flex-col justify-between bg-blue-50">
      <Header />
      <main className="flex flex-1 lg:mt-[5.7em] mt-[6.3em] pb-4">
        <Aside />
        <section className="w-full  flex flex-col gap-3 px-3 lg:ml-[10em]">
          <Title />
          {children}
        </section>
      </main>
      {/* <Footer /> */}
    </div>

  )
}