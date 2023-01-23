import { Children, ReactNode } from "react";

interface Props{
  children: ReactNode
}

export function Main({children}:Props){
  return (
    <main className="flex lg:flex-row flex-col gap-5 ">
      {children}
    </main>
  )
}