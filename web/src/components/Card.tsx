import clsx from "clsx"
import { ReactNode } from "react"

export type Width = 0 | 10 | 20 | 30 | 40 | 45 | 55 | 60 | 70 | 75 | 80 | 90 | 100
interface Props {
  children: ReactNode,
  fixed?: boolean
  width?: Width
  
}
export function Card({ children, fixed = false, width = 100 }: Props) {
  return (
    <div className={clsx(`bg-white p-5 rounded shadow h-min lg:w-full`, {
      'fixed w-1/2 float-right': fixed,
      'lg:w-[40%]': width === 40,
      'lg:w-[45%]': width === 45,
      'lg:w-[55%]': width === 55,
      'lg:w-[60%]': width === 60,      
      'lg:w-[70%]': width === 70,      
      'lg:w-[75%]': width === 75,      
      'lg:w-[80%]': width === 80,      
      'lg:w-[90%]': width === 90,      
      
    })}>
      {children}
    </div>
  )
}