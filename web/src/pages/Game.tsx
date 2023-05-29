import { useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { GameInterface, ModalityInterface, PlaceInterface, TeamInterface, UserInterface } from "../interfaces";
import { Form } from "../components/Game/Form";

const fields = [
  { key: 'date', value: 'Data', type: 'date' },
  { key: 'startHours', value: 'Início', type: 'time' },
  { key: 'endHours', value: 'Final', type: 'time' },
  { key: 'place', value: 'Lugar' },
  { key: 'modality', value: 'Modalidade' },
  { key: 'user', value: 'Juíz' },

]

export function Game() {

  const [game, setGame] = useState({} as GameInterface)
  const uri = 'games'

  const { data, error }: { data: GameInterface[], error: any } = swr(uri)
  const { data: places }: { data: PlaceInterface[] } = swr('places')
  const { data: modalities }: { data: ModalityInterface[] } = swr('modalities')
  const { data: users }: { data: UserInterface[] } = swr('users?profile=judge')
  const { data: teams }: { data: TeamInterface[] } = swr('teams')

  if (error) return <Error error={error} />
  if (!data || !places || !modalities || !users || !teams) return <Loading />
  
  const games = data.map(game => {
    return {
      ...game,
      place: places.find(place => place.id === game.placeId)?.name,
      modality: modalities.find(modality => modality.id === game.modalityId)?.name,
      user: users.find(user => user.id === game.userId)?.name
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
          positionBottom={games.length * 100}
        />
        <Form
          game={game}
          setGame={setGame}
          places={places}
          modalities={modalities}
          users={users}
          teams={teams}
          />
      </Main>
    </Layout>
  )
}