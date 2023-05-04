import moment from "moment";
moment.locale('br')
import { useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { Form } from "../components/Form";
// import { Form } from "../components/Game/Form";

const fields = [
  { key: 'date', value: 'Data', type:'date' },
  { key: 'startHours', value: 'Início', type:'time'},
  // { key: 'endHours', value: 'Final' },
  // { key: 'place', value: 'Lugar' },
  // { key: 'modality', value: 'Modalidade' },
  // { key: 'user', value: 'Juíz' }
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
}
export function Game() {

  const [game, setGame] = useState({} as GameInterface)
  const uri = 'games'
  const { data: games, error }: { data: GameInterface[], error: any } = swr(uri)
 
  if (error) return <Error error={error} />
  if (!games ) return <Loading />

  console.log(game)
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
          fields={fields}
          item={game}
          setItem={setGame}
          uri={uri}
        />
      </Main>
    </Layout>
  )
}