import { useState } from "react";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";

const fields = [
  { key: 'date', value: 'Data' },
  { key: 'startHours', value: 'Horas' },
  { key: 'placeId', value: 'Lugar' },
  { key: 'modalityId', value: 'Modalidade' },
  { key: 'userId', value: 'Juíz' }

]

interface Game {

}

export function Game() {

  const [game, setGame] = useState({} as Game)
  const { data, error } = swr('games')

  if (error) return <Error error={error} />
  if (!data) return <Loading />

  const games: Game[] = data


  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={games}
          item={game}
          setItem={setGame}
        />
        <Form
          fields={fields}
          item={game}
          setItem={setGame}
          uri={'games'}
        />
      </Main>
    </Layout>
  )
}