import moment from "moment";
moment.locale('br')
import { useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { z } from "zod";
import { Form } from "../components/Game/Form";

const fields = [
  { key: 'date', value: 'Data' },
  { key: 'startHours', value: 'Início' },
  { key: 'endHours', value: 'Final' },
  { key: 'place', value: 'Lugar' },
  { key: 'modality', value: 'Modalidade' },
  { key: 'user', value: 'Juíz' }
]

export const gameSchema = z.object({
  startHours: z.string({})
    .nonempty('Início é obrigatório.'),    
  date: z.string().refine(string => new Date(string))
  
    
  

    // z.string().datetime()
  //   .date
    //   offset:true,
    
    // })
    
    
  // endHours: z.string(),
  // placeId: z.number(),
  // modalityId: z.number(),
  // userId: z.number()
})

export type GameType = z.infer<typeof gameSchema>
interface User {
  name: string
}

interface Team{
  name:string 
}
export function Game() {

  const [game, setGame] = useState({} as GameType)
  const { data: games, error }: { data: GameType[], error: any } = swr('games')
 
  if (error) return <Error error={error} />
  if (!games ) return <Loading />

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
          />
      </Main>
    </Layout>
  )
}