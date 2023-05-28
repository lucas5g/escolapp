import { ReactNode } from "react"

interface Props{
  children: ReactNode
}
export function Row({children}:Props){
  return (
    <div className="flex  gap-3">
      {children}
    </div>
  )
}