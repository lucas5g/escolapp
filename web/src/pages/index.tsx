import { Error } from "@/components/Error";
import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { Title } from "@/components/Title";
import { useFetch } from "@/utils/useFetch";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  const { data, error } = useFetch('/me')

  if(error) return <Error error={error} />
  if (!data) return <Loading full />
  return (
    <Layout>
      <Title title='Aplicação do JISA' />
      <div className="container">
        <Link
          href={'/jogos'}
          className="border-b border-blue-300 hover:text-blue-400"
        >
          Veja a lista dos jogos
        </Link>
      </div>
    </Layout>
  )
}
