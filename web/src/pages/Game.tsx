import moment from "moment";
moment.locale('br')
import { useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { Form } from "../components/Game/Form";

const fields = [
  { key: 'date', value: 'Data' },
  { key: 'startHours', value: 'Início' },
  { key: 'endHours', value: 'Final' },
  { key: 'place', value: 'Lugar' },
  { key: 'modality', value: 'Modalidade' },
  { key: 'user', value: 'Juíz' }
]

interface User {
  name: string
}

interface Team{
  name:string 
}

export interface GameInterface{
  id:number
  date: string
  startHours: string
  endHours: string
  comments: null,
  errors?:{
    date?:string
    startHours?:string
  }
  // "placeId": 1,
  // "modalityId": 1,
  // "userId": 1,
  // "createdAt": "2023-04-11T01:57:36.397Z",
  // "updatedAt": "2023-04-11T01:57:36.397Z",
}
export function Game() {

  const [game, setGame] = useState({} as GameInterface)
  const { data: games, error }: { data: GameInterface[], error: any } = swr('games')
 
  if (error) return <Error error={error} />
  if (!games ) return <Loading />

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={games}
          item={game}
          setItem={setGame}
          positionBottom={games.length * 100}
        />
        <Form
          game={game}
          setGame={setGame}
          />
      </Main>
    </Layout>
  )
}