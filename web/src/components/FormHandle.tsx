import { ReactNode } from "react"
import { Button } from "./Button"
import { useForm } from "react-hook-form"

interface Props {
  children: ReactNode
  handleSubmit: Function 
}

export function FormHandle({ children, handleSubmit }: Props) {

  const { reset } = useForm()

  async function handleCreate(data:any){
    console.log('vai datos', data)
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleCreate)}>
      {children}
      <footer className="flex justify-end gap-3">
        <Button value={'Cadastrar'} />
        <Button
          type="reset"
          value={'Cancelar'}
          secondary 
          onClick={reset}
          
          />
      </footer>
    </form>
  )
}