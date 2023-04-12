import { ReactNode } from "react"
import { Button } from "./Button"

interface Props {
  children: ReactNode
}
export function FormHandle({ children }: Props) {
  return (
    <form className="flex flex-col gap-5">
      {children}
      <footer className="flex justify-end gap-3">
        <Button value={'Cadastrar'} />
        <Button
          type="reset"
          value={'Cancelar'}
          secondary 
          
          />
      </footer>
    </form>
  )
}