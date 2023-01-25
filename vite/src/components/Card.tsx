import clsx from "clsx"
import { ReactNode } from "react"

export type Width = 0 | 10 | 20 | 30 | 40 | 45 | 55 | 60 | 70 | 100
interface Props {
  children: ReactNode,
  fixed?: boolean
  width?: Width
  
}
export function Card({ children, fixed = false, width = 100 }: Props) {
  return (
    <div className={clsx(`bg-white p-5 rounded shadow h-min lg:w-[${width}%]`, {
      'fixed w-1/2 float-right': fixed,
    })}>
      {children}
    </div>
  )
}