import { TextField } from "@mui/material";
import moment from "moment";
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
  { key: 'startHours', value: 'Início' },
  { key: 'endHours', value: 'Final' },
  { key: 'place', value: 'Lugar' },
  { key: 'modality', value: 'Modalidade' },
  { key: 'user', value: 'Juíz' }
]

interface GameInterface {
  id: number
  date: string,
  startHours: string
  endHours: string
  placeId: number
  modalityId: number
  userId: number
}

interface User {
  name: string
}

export function Game() {

  const [game, setGame] = useState({} as GameInterface)
  const { data, error }: { data: GameInterface[], error: any } = swr('games')
  const { data: places, error: errorPlaces } = swr('places')
  const { data: modalities, error: errorModalities } = swr('modalities')
  const { data: users, error: errorUsers }: { data: User[], error: any } = swr('users')

  if (error) return <Error error={error} />
  if (!data || !places || !modalities || !users) return <Loading />

  const fieldsForm = [
    { key: 'placeId', value: 'Local', options: places },
    { key: 'modalityId', value: 'Modalidade', options: modalities },
    { key: 'userId', value: 'Juíz', options: users },
  ]

  const games = data.map(game => {
    return {
      ...game,
      modality: modalities.find((modality:any) => modality.id === game.id).name,
      place: places.find((place:any) => place.id === game.placeId).name,
      user: users.find((user:any) => user.id === game.userId)?.name
    }
  })
  console.log(game)
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
          fields={fieldsForm}
          item={{
            ...game,
            modality:undefined,
            place:undefined,
            user:undefined
          }}
          setItem={setGame}
          uri={'games'}
        >
          <TextField
            name='date'
            label='Data'
            type='date'
            // value={moment(game?.date).format('YYYY-MM-DD')}
            value={game?.date || moment().format('YYYY-MM-DD')}
            onChange={event => setGame({ ...game, date: moment(event.target.value).format('YYYY-MM-DD') })}
          />
          <div className="flex gap-4">
            <TextField
              name='startHours'
              label='Início'
              type='time'
              value={game?.startHours || moment().format('HH:mm')}
              onChange={event => setGame({
                ...game,
                startHours: event.target.value,
                endHours: event.target.value
              })}
              fullWidth

            />
            <TextField
              name='endHours'
              label='Fim'
              type='time'
              value={game?.endHours || moment().add(1, 'hours').format('HH:mm')}
              onChange={event => setGame({ ...game, endHours: event.target.value })}

              fullWidth

            />
          </div>
        </Form>
      </Main>
    </Layout>
  )
}