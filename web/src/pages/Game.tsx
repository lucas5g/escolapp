import { TextField } from "@mui/material";
import moment from "moment";
moment.locale('br')
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
  const { data: places, error: errorPlaces } = swr('places')
  const { data: modalities, error: errorModalities } = swr('modalities')
  const { data: users, error: errorUsers }: { data: User[], error: any } = swr('users')
  const { data: teams, error: errorTeams }:{data:Team[], error:any} = swr(`teams`)

  if (error) return <Error error={error} />
  if (!data || !places || !modalities || !users) return <Loading />

  const fieldsForm = [
    { key: 'userId', value: 'Juíz', options: users },
    { key: 'placeId', value: 'Local', options: places },
    { key: 'modalityId', value: 'Modalidade', options: modalities },
    { key: 'teamId', value:'Team', options:teams}
  ]

  const games = data.map(game => {
    return {
      ...game,
      modality: modalities.find((modality: any) => modality.id === game.id).name,
      place: places.find((place: any) => place.id === game.placeId).name,
      user: users.find((user: any) => user.id === game.userId)?.name
        .split(' ')
        .slice(0,3)
        .join(' ')

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
          positionBottom={games.length * 100}
        />
        <Form
          fields={fieldsForm}
          item={{
            ...game,
            modality: undefined,
            place: undefined,
            user: undefined
          }}
          setItem={setGame}
          uri={'games'}
        >
          <TextField
            name='date'
            label='Data'
            type='date'
            InputLabelProps={{ shrink: true }}
            value={game?.date ? moment(game.date).format('YYYY-MM-DD') : ''}
            // onChange={event => setGame({ ...game, date: moment(event.target.value).format() })}
            onChange={event => setGame({ ...game, date: moment(event.target.value).toDate() })}

          />
          <div className="flex gap-4">
            <TextField
              name='startHours'
              label='Início'
              type='time'
              value={game?.startHours ?? ''}
              onChange={event => setGame({
                ...game,
                startHours: event.target.value,
                endHours: moment(event.target.value, 'HH:mm').add(1, 'hours').format('HH:mm')
              })}
              fullWidth
              InputLabelProps={{ shrink: true }}

            />
            <TextField
              name='endHours'
              label='Fim'
              type='time'
              value={game?.endHours || ''}
              onChange={event => setGame({ ...game, endHours: event.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}

            />
          </div>
        </Form>
      </Main>
    </Layout>
  )
}