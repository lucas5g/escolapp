import { Error } from "@/components/Error";
import { Form } from "@/components/Form";
import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { Table } from "@/components/Table";
import { Title } from "@/components/Title";
import { useFetch } from "@/utils/useFetch";
import { useState } from "react";
import { filter } from "../utils";

interface Game{
  data: string 
  place: string
}

export default function Game() {

  const { data, error } = useFetch('/games')
  const [game, setGame] = useState({} as Game)
  const [search, setSearch] = useState('')

  const fields = [
    {key: 'date', value: 'Data'},
    {key: 'place', value: 'Local'}
  ]

  if (error) return <Error error={error} />
  if (!data) return <Loading />

  const games = filter(data, search, 'place')


  return (
    <Layout>
      <Title title="Jogos" />
      <div className="container">

        <Table
          fields={fields}
          items={games}
          setItem={setGame}
          search={search}
          setSearch={setSearch}
        />
{/*         
        <Form

        /> */}
      </div>
    </Layout>
  )
}