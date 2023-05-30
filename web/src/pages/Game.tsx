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
  const { data: places }: { data: PlaceInterface[] } = swr('places')
  const { data: modalities }: { data: ModalityInterface[] } = swr('modalities')
  const { data: users }: { data: UserInterface[] } = swr('users?profile=judge')
  const { data: teams }: { data: TeamInterface[] } = swr('teams')
  const { data: students }: { data: StudentInterface[] } = swr('students')

  if (error) return <Error error={error} />
  if (!data || !places || !modalities || !users || !teams) return <Loading />

  const games = data.map(game => {
    return {
      ...game,
      place: places.find(place => place.id === game.placeId)?.name,
      modality: modalities.find(modality => modality.id === game.modalityId)?.name,
      user: users.find(user => user.id === game.userId)?.name,

    }
  })
  console.log(games[0])
  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={games}
          item={game}
          setItem={setGame}

        // game={game}
        // setGame={setGame}
        />
        <Card>
          {moment(game.date).format('DD/MM')}
          {game.hours}
          {game.userId}
        </Card>
        {/* <FormGame
          game={game}
          setGame={setGame}
          teams={teams}
        /> */}
      </Main>

    </Layout>
  )
}