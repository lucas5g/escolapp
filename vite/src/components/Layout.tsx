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
      <main className="flex flex-1">
        <Aside />
        <section className="w-full  flex flex-col gap-5 px-5 py-5 lg:ml-[12em] ">
          <Title />
          {children}
        </section>
      </main>
      <Footer />
    </div>

  )
}