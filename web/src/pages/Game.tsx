import { useState } from "react";
import { Layout } from "../components/Layout";
import { Main } from "../components/Main";
import { GameInterface, ModalityInterface, PlaceInterface, StudentInterface, TeamInterface, UserInterface } from "../interfaces";
import { FormGame } from "../components/Game/FormGame";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { Card } from "../components/Card";
import moment from "moment";

const fields = [
  { key: 'date', value: 'Data', },
  { key: 'hours', value: 'Horas', },
  { key: 'place', value: 'Local' },
  { key: 'modality', value: 'Modalidade' },
  { key: 'user', value: 'Juíz' },

]

export function Game() {
  const [game, setGame] = useState({} as GameInterface)

  const { data, error }: { data: GameInterface[], error: any } = swr('games')
  const { data: teams }: { data: TeamInterface[] } = swr('teams')
  const { data: students }: { data: StudentInterface[] } = swr('students')

  if (error) return <Error error={error} />
  if (!data || !teams || !students) return <Loading />

  const games = data.map( game => {
    return {
      ...game,
      teams: game.teams.map(team => {
        const gameTeams =  teams.find(row => row.id === team)
        return {
          ...gameTeams,
          // students: students.filter(student => gameTeams.)
        }
      })
    }
  })

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={games}
          item={game}
          setItem={setGame}

        />
        <Main position="col">

          <Card>
            {moment(game.date).format('DD/MM')}
            {game.hours}
            {game.userId}
            <pre>
              {JSON.stringify(game, null, 2)}
            </pre>
          </Card>
          <FormGame
            game={game}
            setGame={setGame}

          />
        </Main >
      </Main>

    </Layout>
  )
}