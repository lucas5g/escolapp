import clsx from "clsx"
import { ReactNode } from "react"

interface Props{
  children: ReactNode,
  fixed?:boolean
}
export function Card({children, fixed = false}: Props){
  return (
    <div className={clsx("bg-white p-5 rounded shadow w-full h-min", {
      'fixed w-1/2 float-right': fixed
    })}>
      {children}
    </div>
  )
}