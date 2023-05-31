import clsx from "clsx";
import { Children, ReactNode } from "react";

interface Props{
  children: ReactNode
  position?: 'col'
}

export function Main({children, position}:Props){
  return (
    <main className={clsx("flex lg:flex-row flex-col gap-3 w-full", {
      'lg:flex-col':position === 'col'
    })} >
      {children}
    </main>
  )
}