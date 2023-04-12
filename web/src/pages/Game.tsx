import moment from "moment";
moment.locale('br')
import { useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { FormGame } from "../components/Game/FormGame";

const fields = [
  { key: 'date', value: 'Data' },
  { key: 'startHours', value: 'Início' },
  { key: 'endHours', value: 'Final' },
  { key: 'place', value: 'Lugar' },
  { key: 'modality', value: 'Modalidade' },
  { key: 'user', value: 'Juíz' }
]

export interface GameInterface {
  id: number
  date: Date,
  startHours: string
  endHours: string
  placeId: number
  modalityId: number
  userId: number
}

interface User {
  name: string
}

interface Team{
  name:string 
}
export function Game() {

  const [game, setGame] = useState({} as GameInterface)
  const { data, error }: { data: GameInterface[], error: any } = swr('games')
  const { data: modalities, error: errorModalities } = swr('modalities')
  const { data: teams, error: errorTeams }:{data:Team[], error:any} = swr(`teams`)

  if (error) return <Error error={error} />
  if (!data ) return <Loading />

  const games = data

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
        <FormGame
          game={game}
          setGame={setGame}
          />
      </Main>
    </Layout>
  )
}