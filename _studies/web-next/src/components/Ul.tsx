import { ReactNode } from "react"

interface UlProps{
  children: ReactNode
  title: string
}

export function Ul({ children, title }: UlProps){
  return (
    <ul className="text-slate-900">
    <li className="mt-7">
      <h5 className="mb-3 font-semibold">{title}</h5>
      <ul className="space-y-2 border-l border-slate-200 ml-1">
        {children}
      </ul>
    </li>
  </ul>
  )
}