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
import clsx from "clsx";
import { renameLowerCase } from "../utils/rename-lowercase";
import { Form } from "../components/Form";

const fields = [
  { key: 'date', value: 'Data', },
  { key: 'hours', value: 'Horas', },
  { key: 'place', value: 'Local' },
  // { key: 'modality', value: 'Modalidade' },
  { key: 'user', value: 'Juíz' },

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
          fields={fields}
          items={games}
          item={game}
          setItem={setGame}

        />
        <Main position="col">

          <Card>
            <div className="flex justify-between">
              <span>
                <strong>Data:</strong> {moment(game.date).format('DD/MM')} - {game.hours}
              </span>
              <span>
                <strong>Juíz:</strong> {game.user?.name}
              </span>
              <span className="italic">
                <strong>{game.teams?.length}</strong> Equipes
              </span>
            </div>
            <div className="grid grid-cols-2 ml-auto text-sm gap-2">

              {game.teamsStudents?.map((team, i) => {
                return (
                  <div
                    key={team.name}
                    className={clsx('mt-3', {
                      // 'text-end': (i + 1) % 2 === 0
                    })}
                  >
                    <strong className="text-zinc-700">
                      {team.name}
                    </strong>
                    <ul className="flex flex-col gap-1">
                      {team.students
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(student => {
                          return (
                            <li className="border rounded pl-1 py-1">
                              {renameLowerCase(student.name, 33)}
                            </li>
                          )
                        })}

                    </ul>
                  </div>
                )
              })}

            </div>


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