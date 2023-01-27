import { Paper } from "@mui/material";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Children, ReactNode } from "react";
import { Layout } from "./Layout";
import { Loading } from "./Loading";

interface Props {
  error: any
}

export function Error({ error }: Props) {

  console.log('error fetch', error.response)
  const router = useRouter()

  if (error?.response?.data === 'Without permission') {
    return (
      <LayoutError title="Sem permissão!" />
    )
  }

  if (error?.response?.data === 'Token inválido!') {
    // const accessToken = localStorage.getItem('accessToken')
    // console.log('token na tela error', accessToken)
    localStorage.clear()
    window.location.href = '/login'
    // router.push('/login')

    return <LayoutError title="Fim da sessão!" />
  }

  return <LayoutError title='Erro ao conectar com servidor :(' />

}

interface LayoutErrorProps {
  title: string
}

function LayoutError({ title }: LayoutErrorProps) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="h-full flex items-center justify-center">
        <p className="bg-white text-4xl px-7 py-3 rounded shadow">
          {title}
        </p>
      </div>
    </Layout>
  )
}