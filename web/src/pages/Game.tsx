import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { InputDate } from "../components/InputDate";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";

const fields = [
  { key: 'date', value: 'Data' },
  { key: 'startHours', value: 'Início' },
  { key: 'endHours', value: 'Final' },
  { key: 'placeId', value: 'Lugar' },
  { key: 'modalityId', value: 'Modalidade' },
  { key: 'userId', value: 'Juíz' }

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

  const [game, setGame] = useState({
    date: moment().format('yyyy-MM-DD'),
    startHours: moment().format('hh:mm'),
    endHours: moment().add(1, 'hours').format('hh:mm')
  } as GameInterface)
  const { data, error } = swr('games')
  const { data: places, error: errorPlaces } = swr('places')
  const { data: modalities, error: errorModalities } = swr('modalities')
  const { data: users, error: errorUsers }: { data: User[], error: any } = swr('users')

  if (error) return <Error error={error} />
  if (!data || !places) return <Loading />

  const fieldsForm = [
    // { key: 'date', value: 'Data', type: 'date' },
    // { key: 'startHours', value: 'Início', type:'time' },
    // { key: 'endHours', value: 'Final', type:'time' },
    { key: 'placeId', value: 'Local', options: places },
    { key: 'modalityId', value: 'Modalidade', options: modalities },
    { key: 'userId', value: 'Juíz', options: users },
  ]

  const games = data
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
          item={game}
          setItem={setGame}
          uri={'games'}
        >
          <TextField
            name='date'
            label='Início'
            type='date'
            value={game?.date}
            onChange={event => setGame({ ...game, date: event.target.value })}
          // value={game?.date || moment().format('yyyy-MM-DD')}
          />
          <div className="flex gap-3">
            <TextField
              name='startHours'
              label='Início'
              type='time'
              value={game?.startHours}
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
              value={game?.endHours}
              onChange={event => setGame({ ...game, endHours: event.target.value })}

              fullWidth

            />
          </div>
        </Form>
      </Main>
    </Layout>
  )
}