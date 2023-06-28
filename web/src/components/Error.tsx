import { Children, ReactNode } from "react";
import { Layout } from "./Layout";
// import { Loading } from "./Loading";

interface Props {
  error: any
}

export function Error({ error }: Props) {

  console.log('Mensagem de error', error.message)

  if (error?.response?.data?.message === 'Without permission') {
    return (
      <LayoutError title="Sem permissão!" />
    )
  }

  if (error?.response?.data?.message === 'Token inválido!') {
  
    localStorage.clear()
    window.location.href = '/login'
    return <LayoutError title="Fim da sessão!" />
  }

  if(error.response?.data.message) return <LayoutError title={error.response.data.message}/>
  

  return <LayoutError title='Erro ao conectar com servidor :(' />

}

interface LayoutErrorProps {
  title: string
}

function LayoutError({ title }: LayoutErrorProps) {

  document.title = title

  return (
    <Layout>
      <div className="h-full flex items-center justify-center">
        <p className="bg-white text-4xl px-7 py-3 rounded shadow">
          {title}
        </p>
      </div>
    </Layout>
  )
}