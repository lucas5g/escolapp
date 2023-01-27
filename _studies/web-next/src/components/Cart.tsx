import { Paper } from "@mui/material"
import { ReactNode } from "react"

interface Props{
  children: ReactNode
}
export function Card({children}: Props){
  return (
    <Paper className="p-4  min-h-10">
      {children}
    </Paper>
  )
}