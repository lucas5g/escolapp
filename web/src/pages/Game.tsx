import { useState } from "react";
import { Layout } from "../components/Layout";
import { Main } from "../components/Main";
import { GameInterface, ModalityInterface, PlaceInterface, StudentInterface, TeamInterface, UserInterface } from "../interfaces";
import { FormGame } from "../components/Game/FormGame";
import { swr } from "../utils/swr";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { Form } from "../components/Form";
import { Info } from "../components/Game/Info";
import { Table } from "../components/Game/Table";

const fields = [
  { key: 'date', value: 'Data', },
  { key: 'hours', value: 'Horas', },
  { key: 'place', value: 'Local' },

  // { key: 'modality', value: 'Modalidade' },
  { key: 'user', value: 'Juíz' },
  { key: 'action', value: 'Ação' }
]

export function Game() {
  const [game, setGame] = useState({} as GameInterface)

  const { data, error }: { data: GameInterface[], error: any } = swr('games')
  const { data: teams }: { data: TeamInterface[] } = swr('teams')
  const { data: students }: { data: StudentInterface[] } = swr('students')

  if (error) return <Error error={error} />
  if (!data || !teams || !students) return <Loading />

  // console.log(students)
  const games = data.map(game => {
    return {
      ...game,
      teamsStudents: game.teams.map(team => {
        const gameTeam = teams.find(row => row.id === team)
        return {
          ...gameTeam,
          students: gameTeam?.students
            .map(ra => students.find(student => student.ra === ra))

        }
      })
    }
  })

  return (
    <Layout>
      <Main>
        <Table
          

        />
        {/* <Table
          fields={fields}
          items={games}
          item={game}
          setItem={setGame}
          placeholderInputFilter="Pesquisar por Data"
        /> */}
        <Main position="col">
          <Info
            game={game}
          />
          <FormGame
            game={game}
            setGame={setGame}

          />
        </Main >
      </Main>

    </Layout>
  )
}